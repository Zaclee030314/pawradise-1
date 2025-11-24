
import React, { useState } from 'react';
import { HeartHandshake, UserPlus } from 'lucide-react';
import { checkPetCompatibility } from '../services/geminiService';
import { CompatibilityResponse } from '../types';
import Button from './Button';

const CompatibilityTool: React.FC = () => {
  const [pet1, setPet1] = useState('');
  const [pet2, setPet2] = useState('');
  const [result, setResult] = useState<CompatibilityResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!pet1 || !pet2) return;
    setLoading(true);
    const data = await checkPetCompatibility(pet1, pet2);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white overflow-y-auto scrollbar-hide">
       <div className="text-center mb-8">
        <div className="inline-block bg-indigo-100 p-3 rounded-2xl mb-4"><HeartHandshake className="text-indigo-600 w-8 h-8"/></div>
        <h2 className="text-2xl font-bold text-brand-brown">Pet Compatibility</h2>
        <p className="text-gray-500 text-sm">Will they be best friends or rivals?</p>
      </div>

      {!result ? (
        <div className="space-y-6 max-w-md mx-auto w-full">
           <div className="grid gap-4">
             <div>
               <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Pet 1 (Breed/Type)</label>
               <input value={pet1} onChange={(e) => setPet1(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="e.g. Golden Retriever"/>
             </div>
             <div className="text-center text-gray-300 font-bold">+</div>
             <div>
               <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Pet 2 (Breed/Type)</label>
               <input value={pet2} onChange={(e) => setPet2(e.target.value)} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200" placeholder="e.g. Siamese Cat"/>
             </div>
           </div>
           <Button onClick={handleCheck} disabled={loading} className="w-full py-4 bg-indigo-600 border-indigo-800 hover:bg-indigo-700">
             {loading ? 'Analyzing...' : 'Check Match'}
           </Button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 text-center">
           <div className="mb-6">
              <div className="text-6xl font-extrabold text-indigo-600 mb-2">{result.score}%</div>
              <h3 className="text-xl font-bold text-brand-brown">{result.verdict}</h3>
           </div>

           <div className="bg-gray-50 p-5 rounded-2xl text-left mb-6">
              <h4 className="font-bold text-gray-500 text-xs uppercase tracking-wider mb-3">Tips for Success</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                 {result.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
              </ul>
           </div>
           
           {result.warning && (
             <div className="bg-yellow-50 p-4 rounded-xl text-yellow-800 text-xs font-medium mb-6">
               ⚠️ {result.warning}
             </div>
           )}

           <Button variant="outline" className="w-full" onClick={() => setResult(null)}>Check Another Pair</Button>
        </div>
      )}
    </div>
  );
};

export default CompatibilityTool;
