
import React, { useState } from 'react';
import { Trophy, Play, Star } from 'lucide-react';
import { generateTrainingPlan } from '../services/geminiService';
import { TrainingPlanResponse } from '../types';
import Button from './Button';

const TrainingCoachTool: React.FC = () => {
  const [trick, setTrick] = useState('');
  const [result, setResult] = useState<TrainingPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrain = async () => {
    if (!trick) return;
    setLoading(true);
    const data = await generateTrainingPlan(trick, 'Buddy', 'Dog');
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white overflow-y-auto scrollbar-hide">
       <div className="text-center mb-8">
        <div className="inline-block bg-blue-100 p-3 rounded-2xl mb-4"><Trophy className="text-blue-600 w-8 h-8"/></div>
        <h2 className="text-2xl font-bold text-brand-brown">Training Coach</h2>
        <p className="text-gray-500 text-sm">Teach your pet new tricks step-by-step.</p>
      </div>

      {!result ? (
        <div className="space-y-6 max-w-md mx-auto w-full">
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">What do you want to teach?</label>
             <input 
               value={trick}
               onChange={(e) => setTrick(e.target.value)}
               className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none font-bold text-brand-brown"
               placeholder="e.g. Sit, Spin, High Five"
             />
           </div>
           <div className="grid grid-cols-3 gap-2">
              {['Sit', 'Stay', 'Roll Over'].map(t => (
                <button key={t} onClick={() => setTrick(t)} className="p-2 bg-gray-50 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-100">{t}</button>
              ))}
           </div>
           <Button onClick={handleTrain} disabled={loading} className="w-full py-4 bg-blue-600 border-blue-800 hover:bg-blue-700">
             {loading ? 'Planning...' : 'Start Training'}
           </Button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-brand-brown">{result.title}</h3>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{result.difficulty}</span>
           </div>
           <div className="space-y-4 mb-8">
              {result.steps.map((step) => (
                <div key={step.step} className="flex gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                   <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">{step.step}</div>
                   <p className="text-gray-700 text-sm pt-1">{step.instruction}</p>
                </div>
              ))}
           </div>
           <div className="bg-yellow-50 p-4 rounded-2xl mb-6">
              <h4 className="font-bold text-yellow-700 text-sm mb-2 flex items-center gap-2"><Star size={16}/> Pro Tips</h4>
              <ul className="list-disc pl-5 text-sm text-yellow-800 space-y-1">
                 {result.tips.map((tip, i) => <li key={i}>{tip}</li>)}
              </ul>
           </div>
           <Button variant="outline" className="w-full" onClick={() => setResult(null)}>Teach Another Trick</Button>
        </div>
      )}
    </div>
  );
};

export default TrainingCoachTool;
