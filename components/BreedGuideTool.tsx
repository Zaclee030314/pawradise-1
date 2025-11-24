
import React, { useState } from 'react';
import { Dna, Search, Info, Activity, Scissors, Smile, GraduationCap } from 'lucide-react';
import { getBreedInfo } from '../services/geminiService';
import { BreedInfo } from '../types';
import Button from './Button';

const BreedGuideTool: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [type, setType] = useState('Dog');
    const [info, setInfo] = useState<BreedInfo | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (!searchTerm.trim()) return;
        setLoading(true);
        const data = await getBreedInfo(searchTerm, type);
        setInfo(data);
        setLoading(false);
    };

    const StatBar = ({ label, value, icon: Icon }: { label: string, value: number, icon: any }) => (
        <div className="mb-3">
            <div className="flex justify-between items-center mb-1 text-sm">
                <div className="flex items-center gap-2 text-gray-600 font-bold">
                    <Icon size={14} className="text-indigo-500"/> {label}
                </div>
                <span className="font-bold text-brand-brown">{value}/10</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-indigo-500 rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${value * 10}%` }}
                ></div>
            </div>
        </div>
    );

    return (
        <div className="h-full flex flex-col p-6 md:p-10 bg-white overflow-y-auto scrollbar-hide">
             {!info ? (
                 <div className="flex-1 flex flex-col justify-center text-center">
                     <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                         <Dna className="text-indigo-600 w-8 h-8"/>
                     </div>
                     <h2 className="text-2xl font-bold text-brand-brown mb-2">Breed Encyclopedia</h2>
                     <p className="text-gray-500 mb-8">Discover traits, needs, and fun facts about any breed.</p>

                     <div className="bg-gray-50 p-2 rounded-xl flex gap-2 mb-6 max-w-sm mx-auto w-full">
                        {['Dog', 'Cat'].map(t => (
                             <button key={t} onClick={() => setType(t)} className={`flex-1 py-2 rounded-lg font-bold transition ${type === t ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400'}`}>
                                 {t}
                             </button>
                        ))}
                     </div>

                     <div className="relative max-w-md mx-auto w-full">
                         <input 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full p-4 pl-12 bg-white border-2 border-gray-200 rounded-2xl focus:border-indigo-500 outline-none font-medium text-lg"
                            placeholder={`e.g. ${type === 'Dog' ? 'Golden Retriever' : 'Siamese'}`}
                         />
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
                     </div>

                     <div className="mt-6 max-w-md mx-auto w-full">
                        <Button onClick={handleSearch} disabled={loading} className="w-full py-3 bg-indigo-600 border-indigo-800 hover:bg-indigo-700">
                            {loading ? 'Scanning DNA...' : 'Identify Breed'}
                        </Button>
                     </div>
                 </div>
             ) : (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                     <button onClick={() => setInfo(null)} className="text-gray-400 hover:text-indigo-600 text-sm font-bold mb-4 flex items-center gap-1">
                         ← Search Another
                     </button>

                     <h2 className="text-3xl font-extrabold text-brand-brown mb-2">{info.name}</h2>
                     <p className="text-gray-600 leading-relaxed mb-6">{info.description}</p>

                     <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 mb-8">
                         <p className="text-indigo-800 text-sm font-medium flex gap-2">
                             <Info size={18} className="flex-shrink-0"/>
                             <span className="italic">"{info.funFact}"</span>
                         </p>
                     </div>

                     <div className="grid md:grid-cols-2 gap-8 mb-8">
                         <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-5">
                             <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-4">Breed Stats</h4>
                             <StatBar label="Energy Level" value={info.energy} icon={Activity}/>
                             <StatBar label="Grooming Needs" value={info.grooming} icon={Scissors}/>
                             <StatBar label="Friendliness" value={info.friendliness} icon={Smile}/>
                             <StatBar label="Trainability" value={info.trainability} icon={GraduationCap}/>
                         </div>

                         <div className="bg-gray-50 rounded-2xl p-5">
                             <h4 className="font-bold text-gray-400 text-xs uppercase tracking-wider mb-4">Care Essentials</h4>
                             <ul className="space-y-3">
                                 {info.careTips.map((tip, i) => (
                                     <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                         <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1.5 flex-shrink-0"></div>
                                         {tip}
                                     </li>
                                 ))}
                             </ul>
                         </div>
                     </div>
                 </div>
             )}
        </div>
    );
};

export default BreedGuideTool;
