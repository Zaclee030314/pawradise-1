
import React, { useState } from 'react';
import { ShieldAlert, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { checkSafety } from '../services/geminiService';
import { SafetyCheckResponse } from '../types';
import Button from './Button';

const SafetyCheckerTool: React.FC = () => {
  const [item, setItem] = useState('');
  const [type, setType] = useState('Dog');
  const [result, setResult] = useState<SafetyCheckResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!item.trim()) return;
    setLoading(true);
    const data = await checkSafety(item, type);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white overflow-y-auto scrollbar-hide">
      <div className="text-center mb-8">
        <div className="inline-block bg-red-100 p-3 rounded-2xl mb-4"><ShieldAlert className="text-red-600 w-8 h-8"/></div>
        <h2 className="text-2xl font-bold text-brand-brown">Safety Checker</h2>
        <p className="text-gray-500 text-sm">Is that plant or food safe for your pet?</p>
      </div>

      {!result ? (
        <div className="space-y-6 max-w-md mx-auto w-full">
           <div className="flex gap-4 bg-gray-50 p-1 rounded-xl">
               {['Dog', 'Cat'].map(t => (
                 <button key={t} onClick={() => setType(t)} className={`flex-1 py-2 rounded-lg font-bold transition ${type === t ? 'bg-white shadow-sm text-red-600' : 'text-gray-400'}`}>{t}</button>
               ))}
           </div>
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Item Name</label>
             <input 
               value={item}
               onChange={(e) => setItem(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleCheck()}
               className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none font-bold text-brand-brown"
               placeholder="e.g. Aloe Vera, Chocolate, Grapes"
             />
           </div>
           <Button onClick={handleCheck} disabled={loading} className="w-full py-4 bg-red-600 border-red-800 hover:bg-red-700">
             {loading ? 'Analyzing Risk...' : 'Check Safety'}
           </Button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 text-center">
           <div className={`p-6 rounded-[2rem] ${result.isSafe ? 'bg-green-100 text-green-800' : result.riskLevel === 'High' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
               {result.isSafe ? <CheckCircle className="w-16 h-16 mx-auto mb-2"/> : result.riskLevel === 'High' ? <XCircle className="w-16 h-16 mx-auto mb-2"/> : <AlertTriangle className="w-16 h-16 mx-auto mb-2"/>}
               <h3 className="text-3xl font-black uppercase">{result.isSafe ? 'Safe' : 'Caution'}</h3>
               <p className="font-bold opacity-80">Risk Level: {result.riskLevel}</p>
           </div>

           <p className="text-gray-600 leading-relaxed px-4">{result.explanation}</p>

           {!result.isSafe && (
             <div className="bg-gray-50 p-4 rounded-2xl text-left">
                <h4 className="font-bold text-gray-400 text-xs uppercase mb-2">Action Steps</h4>
                <ul className="list-disc pl-4 space-y-1 text-sm text-gray-700">
                    {result.actionSteps.map((step, i) => <li key={i}>{step}</li>)}
                </ul>
             </div>
           )}

           <Button variant="outline" className="w-full" onClick={() => {setResult(null); setItem('')}}>Check Another Item</Button>
        </div>
      )}
    </div>
  );
};

export default SafetyCheckerTool;
