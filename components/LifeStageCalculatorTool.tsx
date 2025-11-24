
import React, { useState } from 'react';
import { Calculator, RefreshCw, Dog, Cat, HeartPulse, Info } from 'lucide-react';
import { calculateLifeStage } from '../services/geminiService';
import { LifeStageResponse } from '../types';
import Button from './Button';

interface Props {
    petProfile: any;
}

const LifeStageCalculatorTool: React.FC<Props> = ({ petProfile }) => {
    const [age, setAge] = useState<number>(petProfile?.age || 1);
    const [type, setType] = useState<string>(petProfile?.type || 'Dog');
    const [result, setResult] = useState<LifeStageResponse | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCalculate = async () => {
        setLoading(true);
        const data = await calculateLifeStage(age, type);
        setResult(data);
        setLoading(false);
    };

    return (
        <div className="h-full flex flex-col p-6 md:p-10 bg-white overflow-y-auto scrollbar-hide relative">
             <div className="mb-8 text-center">
                <div className="inline-block p-3 rounded-2xl bg-blue-100 mb-4">
                     <Calculator className="text-blue-600 w-8 h-8"/>
                </div>
                <h2 className="text-2xl font-bold text-brand-brown">Life Stage Calculator</h2>
                <p className="text-gray-500 text-sm mt-1">How old is your furkid in human years?</p>
             </div>

             {!result ? (
                 <div className="space-y-8 max-w-md mx-auto w-full">
                     <div className="flex gap-4 bg-gray-50 p-2 rounded-2xl">
                        <button 
                            onClick={() => setType('Dog')}
                            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${type === 'Dog' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-400'}`}
                        >
                            <Dog size={20}/> Dog
                        </button>
                        <button 
                            onClick={() => setType('Cat')}
                            className={`flex-1 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all ${type === 'Cat' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-400'}`}
                        >
                            <Cat size={20}/> Cat
                        </button>
                     </div>

                     <div className="bg-gray-50 p-6 rounded-3xl">
                         <label className="block text-center text-gray-500 font-bold uppercase text-xs tracking-wider mb-4">Current Age</label>
                         <div className="flex items-center justify-center gap-4">
                             <span className="text-5xl font-bold text-brand-brown">{age}</span>
                             <span className="text-gray-400 font-medium">years</span>
                         </div>
                         <input 
                            type="range" 
                            min="0.5" 
                            max="20" 
                            step="0.5" 
                            value={age} 
                            onChange={(e) => setAge(parseFloat(e.target.value))}
                            className="w-full mt-6 accent-blue-500 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                         />
                     </div>

                     <Button onClick={handleCalculate} disabled={loading} className="w-full py-4 text-lg shadow-blue-200 shadow-xl bg-blue-500 border-blue-700 hover:bg-blue-600 hover:border-blue-800">
                         {loading ? 'Calculating...' : 'Convert Age'}
                     </Button>
                 </div>
             ) : (
                 <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                     <div className="bg-blue-600 text-white p-8 rounded-[40px] text-center relative overflow-hidden mb-6 shadow-xl">
                         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                         <p className="text-blue-200 font-bold uppercase tracking-widest text-xs mb-2">Human Equivalent</p>
                         <h3 className="text-7xl font-extrabold mb-2">{result.humanAge}</h3>
                         <p className="text-xl font-medium opacity-90">Years Old</p>
                     </div>

                     <div className="bg-gray-50 rounded-3xl p-6 mb-6 border border-gray-100">
                         <div className="flex items-center gap-3 mb-3">
                             <div className="bg-blue-100 p-2 rounded-full text-blue-600"><HeartPulse size={20}/></div>
                             <h4 className="font-bold text-lg text-brand-brown">{result.stageName}</h4>
                         </div>
                         <p className="text-gray-600 text-sm leading-relaxed">{result.description}</p>
                     </div>

                     <div className="space-y-3">
                         <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-2">Care Tips</h4>
                         {result.careTips.map((tip, idx) => (
                             <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                                 <Info className="text-blue-400 flex-shrink-0 mt-0.5" size={18}/>
                                 <p className="text-sm text-gray-600">{tip}</p>
                             </div>
                         ))}
                     </div>

                     <div className="mt-8 text-center">
                         <Button variant="outline" onClick={() => setResult(null)}>
                             <RefreshCw size={16} className="mr-2"/> Calculate Another
                         </Button>
                     </div>
                 </div>
             )}
        </div>
    );
};

export default LifeStageCalculatorTool;
