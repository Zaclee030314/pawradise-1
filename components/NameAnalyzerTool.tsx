
import React, { useState } from 'react';
import { Sparkles, Star, Zap } from 'lucide-react';
import { analyzeNameVibe } from '../services/geminiService';
import { NameAnalysisResponse } from '../types';
import Button from './Button';

const NameAnalyzerTool: React.FC = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState<NameAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!name.trim()) return;
    setLoading(true);
    const data = await analyzeNameVibe(name);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white overflow-y-auto scrollbar-hide">
      <div className="text-center mb-8">
        <div className="inline-block bg-purple-100 p-3 rounded-2xl mb-4"><Sparkles className="text-purple-600 w-8 h-8"/></div>
        <h2 className="text-2xl font-bold text-brand-brown">Name Vibe Check</h2>
        <p className="text-gray-500 text-sm">What does their name say about them?</p>
      </div>

      {!result ? (
        <div className="space-y-6 max-w-md mx-auto w-full">
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Pet's Name</label>
             <input 
               value={name}
               onChange={(e) => setName(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
               className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none font-bold text-brand-brown text-center text-xl"
               placeholder="e.g. Luna"
             />
           </div>
           <Button onClick={handleAnalyze} disabled={loading} className="w-full py-4 bg-purple-600 border-purple-800 hover:bg-purple-700">
             {loading ? 'Reading Stars...' : 'Analyze Vibe'}
           </Button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 text-center">
           <div className="bg-purple-600 text-white p-6 rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
              <h3 className="text-4xl font-black mb-2">{name}</h3>
              <p className="text-purple-200 font-bold uppercase tracking-widest text-sm">Vibe: {result.vibe}</p>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <div className="bg-purple-50 p-4 rounded-2xl">
                  <span className="block text-4xl font-black text-purple-600 mb-1">{result.numerologyNumber}</span>
                  <span className="text-xs font-bold text-gray-400 uppercase">Numerology</span>
              </div>
              <div className="bg-purple-50 p-4 rounded-2xl flex flex-col justify-center">
                  <Zap className="w-6 h-6 text-purple-600 mx-auto mb-2"/>
                  <span className="text-xs font-bold text-gray-400 uppercase">Energy</span>
              </div>
           </div>

           <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm text-left">
              <h4 className="font-bold text-gray-400 text-xs uppercase mb-2">Personality Traits</h4>
              <div className="flex flex-wrap gap-2">
                  {result.personalityTraits.map((trait, i) => (
                      <span key={i} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm font-bold">{trait}</span>
                  ))}
              </div>
           </div>

           <div className="bg-yellow-50 p-4 rounded-2xl">
              <p className="text-yellow-800 text-sm italic font-medium">
                  <Star size={14} className="inline mr-1"/> "{result.funPrediction}"
              </p>
           </div>

           <Button variant="outline" className="w-full" onClick={() => setResult(null)}>Check Another Name</Button>
        </div>
      )}
    </div>
  );
};

export default NameAnalyzerTool;
