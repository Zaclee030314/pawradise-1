
import React, { useState } from 'react';
import { MessageCircle, Mic, Volume2 } from 'lucide-react';
import { translatePetLanguage } from '../services/geminiService';
import { TranslatorResponse } from '../types';
import Button from './Button';

const TranslatorTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [type, setType] = useState('Dog');
  const [result, setResult] = useState<TranslatorResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!input) return;
    setLoading(true);
    const data = await translatePetLanguage(input, type);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white overflow-y-auto scrollbar-hide">
      <div className="text-center mb-8">
        <div className="inline-block bg-teal-100 p-3 rounded-2xl mb-4"><MessageCircle className="text-teal-600 w-8 h-8"/></div>
        <h2 className="text-2xl font-bold text-brand-brown">Pet Translator</h2>
        <p className="text-gray-500 text-sm">Decode what your furkid is trying to say!</p>
      </div>

      {!result ? (
        <div className="space-y-6 max-w-md mx-auto w-full">
           <div className="flex gap-4">
             {['Dog', 'Cat'].map(t => (
               <button key={t} onClick={() => setType(t)} className={`flex-1 py-2 rounded-xl font-bold border-2 ${type === t ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-gray-100 text-gray-400'}`}>{t}</button>
             ))}
           </div>
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">What did they do/sound like?</label>
             <textarea 
               value={input}
               onChange={(e) => setInput(e.target.value)}
               className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 h-32 focus:border-teal-500 outline-none resize-none"
               placeholder='e.g., "Tail wagging fast but ears back" or "Meowing constantly at 3am"'
             />
           </div>
           <Button onClick={handleTranslate} disabled={loading} className="w-full py-4 bg-teal-500 hover:bg-teal-600 border-teal-700">
             {loading ? 'Decoding...' : 'Translate'}
           </Button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6">
           <div className="bg-teal-50 p-6 rounded-3xl text-center border border-teal-100">
             <h3 className="text-4xl font-extrabold text-teal-700 mb-2">"{result.translation}"</h3>
             <p className="text-teal-600 font-medium uppercase text-xs tracking-widest">Translation</p>
           </div>
           <div className="grid gap-4">
              <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                 <h4 className="font-bold text-gray-400 text-xs uppercase mb-1">Current Mood</h4>
                 <p className="text-lg font-bold text-brand-brown">{result.mood}</p>
              </div>
              <div className="bg-white border border-gray-100 p-4 rounded-2xl shadow-sm">
                 <h4 className="font-bold text-gray-400 text-xs uppercase mb-1">You Should Reply With:</h4>
                 <p className="text-gray-700 italic">"{result.humanResponse}"</p>
              </div>
           </div>
           <Button variant="outline" className="w-full" onClick={() => setResult(null)}>Translate Again</Button>
        </div>
      )}
    </div>
  );
};

export default TranslatorTool;
