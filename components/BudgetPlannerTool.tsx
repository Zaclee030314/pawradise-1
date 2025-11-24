
import React, { useState } from 'react';
import { DollarSign, TrendingUp, Wallet, Info, Dog, Cat } from 'lucide-react';
import { generateBudgetPlan } from '../services/geminiService';
import { BudgetPlanResponse } from '../types';
import Button from './Button';

const BudgetPlannerTool: React.FC = () => {
  const [budget, setBudget] = useState<number>(500);
  const [lifestyle, setLifestyle] = useState('Balanced');
  const [type, setType] = useState('Dog');
  const [age, setAge] = useState<number>(2);
  const [weight, setWeight] = useState<number>(5);
  const [result, setResult] = useState<BudgetPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlan = async () => {
    setLoading(true);
    const data = await generateBudgetPlan(budget, type, lifestyle, age, weight);
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 md:p-8 bg-white overflow-y-auto scrollbar-hide">
      {/* Header with padding top to avoid Modal Close Button overlap */}
      <div className="text-center mb-8 pt-10 md:pt-2">
        <div className="inline-block bg-green-100 p-3 rounded-2xl mb-4"><Wallet className="text-green-600 w-8 h-8"/></div>
        <h2 className="text-2xl font-bold text-brand-brown">Pawrents Budget Planner</h2>
        <p className="text-gray-500 text-sm">Monthly expenses calculator.</p>
      </div>

      {!result ? (
        <div className="space-y-6 max-w-md mx-auto w-full pb-10">
           {/* Pet Type */}
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Pet Type</label>
             <div className="flex gap-2">
               {['Dog', 'Cat'].map(t => (
                 <button key={t} onClick={() => setType(t)} className={`flex-1 py-3 rounded-xl font-bold border-2 transition ${type === t ? 'border-green-500 bg-green-50 text-green-700 shadow-sm' : 'border-gray-100 text-gray-400'}`}>{t}</button>
               ))}
             </div>
           </div>

           {/* Details Grid */}
           <div className="grid grid-cols-2 gap-4">
               <div>
                   <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Age (yrs)</label>
                   <input type="number" value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none font-bold text-brand-brown text-center"/>
               </div>
               <div>
                   <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Weight (kg)</label>
                   <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none font-bold text-brand-brown text-center"/>
               </div>
           </div>

           {/* Budget Input */}
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Monthly Budget (RM)</label>
             <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-green-600" size={20}/>
                <input 
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full p-4 pl-12 bg-gray-50 rounded-2xl border border-gray-200 outline-none font-black text-brand-brown text-2xl"
                />
             </div>
           </div>

           {/* Lifestyle Selector */}
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Spending Style</label>
             <select value={lifestyle} onChange={(e) => setLifestyle(e.target.value)} className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none font-bold text-brand-brown">
                 <option value="Balanced">Balanced (Mix of everything)</option>
                 <option value="Thrifty">Thrifty (Budget conscious)</option>
                 <option value="Premium">Premium (Only the best)</option>
             </select>
           </div>

           <Button onClick={handlePlan} disabled={loading} className="w-full py-4 bg-green-600 border-green-800 hover:bg-green-700 shadow-green-200 shadow-lg">
             {loading ? 'Calculating...' : 'Generate Budget'}
           </Button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-6 pb-12">
           <div className="text-center">
             {/* Price Hero */}
             <h3 className="text-5xl font-black text-brand-brown mb-4 tracking-tight">
                RM {result.totalEstimated} <span className="text-lg text-gray-400 font-medium">/mo</span>
             </h3>
             
             {/* Verdict Summary Card */}
             <div className="bg-green-50 text-green-900 p-5 rounded-2xl text-sm font-medium leading-relaxed border border-green-100 shadow-sm mx-auto max-w-lg text-left md:text-center">
                 {result.verdict}
             </div>
           </div>

           <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <h4 className="font-bold text-gray-400 text-xs uppercase mb-4 flex items-center gap-2"><Info size={14}/> Cost Breakdown</h4>
              <div className="space-y-5">
                 {result.breakdown.map((item, idx) => (
                    <div key={idx} className="relative">
                        <div className="flex justify-between text-sm font-bold text-brand-brown mb-1">
                            <span>{item.category}</span>
                            <span>RM {item.estimatedCost}</span>
                        </div>
                        <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                            <div className="bg-green-500 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min(100, (item.estimatedCost / result.totalEstimated) * 100)}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5 italic flex gap-1"><Info size={10} className="mt-0.5"/> {item.tip}</p>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-yellow-50 p-5 rounded-2xl border border-yellow-100">
              <h4 className="font-bold text-yellow-700 text-xs uppercase tracking-wider mb-3 flex items-center gap-2"><TrendingUp size={14}/> Smart Saving Tips</h4>
              <ul className="space-y-2">
                  {result.savingTips.map((tip, i) => (
                      <li key={i} className="text-sm text-yellow-900 flex gap-2">
                          <span className="text-yellow-500 font-bold">•</span> {tip}
                      </li>
                  ))}
              </ul>
           </div>

           <Button variant="outline" className="w-full py-3" onClick={() => setResult(null)}>Recalculate</Button>
        </div>
      )}
    </div>
  );
};

export default BudgetPlannerTool;
