
import React, { useState } from 'react';
import { Sparkles, RefreshCw, Wand2 } from 'lucide-react';
import { generatePetNames } from '../services/geminiService';
import { NameSuggestion } from '../types';
import Button from './Button';

const NameGeneratorTool: React.FC = () => {
    const [type, setType] = useState('Dog');
    const [gender, setGender] = useState('Boy');
    const [theme, setTheme] = useState('Foodie');
    const [results, setResults] = useState<NameSuggestion[]>([]);
    const [loading, setLoading] = useState(false);

    const themes = ['Foodie', 'Royal', 'Nature', 'Space', 'Funny', 'Mythical'];

    const handleGenerate = async () => {
        setLoading(true);
        const names = await generatePetNames(type, gender, theme);
        setResults(names);
        setLoading(false);
    };

    return (
        <div className="h-full flex flex-col p-6 md:p-10 bg-white overflow-y-auto scrollbar-hide">
            <div className="mb-8 text-center">
                <div className="inline-block p-3 rounded-2xl bg-purple-100 mb-4">
                     <Sparkles className="text-purple-600 w-8 h-8"/>
                </div>
                <h2 className="text-2xl font-bold text-brand-brown">Name Generator</h2>
                <p className="text-gray-500 text-sm mt-1">Find a name as unique as they are.</p>
             </div>

             {results.length === 0 ? (
                 <div className="space-y-6 max-w-md mx-auto w-full">
                     {/* Type & Gender */}
                     <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-2">
                             <label className="text-xs font-bold text-gray-400 uppercase">Species</label>
                             <div className="flex flex-col gap-2">
                                 {['Dog', 'Cat'].map(t => (
                                     <button key={t} onClick={() => setType(t)} className={`py-2 rounded-xl font-bold border-2 transition ${type === t ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-100 text-gray-400'}`}>
                                         {t}
                                     </button>
                                 ))}
                             </div>
                         </div>
                         <div className="space-y-2">
                             <label className="text-xs font-bold text-gray-400 uppercase">Gender</label>
                             <div className="flex flex-col gap-2">
                                 {['Boy', 'Girl'].map(g => (
                                     <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl font-bold border-2 transition ${gender === g ? 'border-purple-500 bg-purple-50 text-purple-700' : 'border-gray-100 text-gray-400'}`}>
                                         {g}
                                     </button>
                                 ))}
                             </div>
                         </div>
                     </div>

                     {/* Themes */}
                     <div>
                         <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Name Theme</label>
                         <div className="grid grid-cols-3 gap-2">
                             {themes.map(t => (
                                 <button 
                                    key={t} 
                                    onClick={() => setTheme(t)}
                                    className={`py-2 text-sm rounded-xl font-bold transition-all ${theme === t ? 'bg-purple-600 text-white shadow-lg scale-105' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                 >
                                     {t}
                                 </button>
                             ))}
                         </div>
                     </div>

                     <div className="pt-4">
                         <Button onClick={handleGenerate} disabled={loading} className="w-full py-4 text-lg bg-purple-600 border-purple-800 hover:bg-purple-700 shadow-purple-200 shadow-xl">
                             {loading ? 'Conjuring Names...' : 'Generate Names'} <Wand2 className="ml-2 w-5 h-5"/>
                         </Button>
                     </div>
                 </div>
             ) : (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                     <div className="grid gap-4">
                         {results.map((item, idx) => (
                             <div key={idx} className="bg-white rounded-2xl p-4 border border-purple-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group">
                                 <div>
                                     <h3 className="text-xl font-extrabold text-brand-brown group-hover:text-purple-600 transition">{item.name}</h3>
                                     <p className="text-xs text-gray-500 mt-1">{item.meaning}</p>
                                 </div>
                                 <span className="text-[10px] font-bold uppercase bg-purple-50 text-purple-600 px-2 py-1 rounded-lg">
                                     {item.origin}
                                 </span>
                             </div>
                         ))}
                     </div>
                     <div className="mt-8 text-center">
                         <Button variant="outline" onClick={() => setResults([])}>
                             <RefreshCw size={16} className="mr-2"/> Try New Theme
                         </Button>
                     </div>
                 </div>
             )}
        </div>
    );
};

export default NameGeneratorTool;
