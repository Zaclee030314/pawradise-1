
import React, { useState } from 'react';
import { Dog, Cat, ChevronUp, ChevronDown, Utensils, RefreshCw, Beef, Carrot, Wheat } from 'lucide-react';
import { MealPlanResponse } from '../types';
import { generateMealPlan } from '../services/geminiService';
import Button from './Button';

interface Props {
  petProfile: any;
}

const MealPlannerTool: React.FC<Props> = ({ petProfile }) => {
  const [step, setStep] = useState<'input' | 'loading' | 'result'>('input');
  const [formData, setFormData] = useState({
    type: petProfile?.type || 'Dog',
    name: petProfile?.name || '',
    weight: petProfile?.weight || 5,
    age: petProfile?.age || 2,
    activity: petProfile?.activityLevel || 'Normal',
    allergies: petProfile?.healthNotes || ''
  });
  const [plan, setPlan] = useState<MealPlanResponse | null>(null);

  const handleGenerate = async () => {
    setStep('loading');
    const result = await generateMealPlan(
      formData.name,
      formData.type,
      formData.weight,
      formData.age,
      formData.activity,
      formData.allergies
    );
    if (result) {
      setPlan(result);
      setStep('result');
    } else {
      setStep('input'); // Fallback on error
    }
  };

  if (step === 'loading') {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8">
        <div className="relative w-24 h-24 mb-6">
           <div className="absolute inset-0 border-4 border-brand-yellow rounded-full animate-ping opacity-20"></div>
           <div className="absolute inset-0 border-4 border-t-brand-orange border-r-transparent border-b-brand-yellow border-l-transparent rounded-full animate-spin"></div>
           <Utensils className="absolute inset-0 m-auto text-brand-brown" size={32}/>
        </div>
        <h3 className="text-2xl font-bold text-brand-brown animate-pulse">Conjuring Feast...</h3>
        <p className="text-gray-500 mt-2">Calculating macros & sniffing out ingredients.</p>
      </div>
    );
  }

  if (step === 'result' && plan) {
    return (
      <div className="h-full overflow-y-auto p-6 bg-[#1F1D1B] text-[#FFF8E1] scrollbar-hide relative flex flex-col">
         {/* Header */}
         <div className="mb-6 border-l-4 border-brand-orange pl-4 pt-2">
             <h2 className="text-2xl font-bold text-white">Daily Bowl for {formData.name}</h2>
             <p className="text-brand-orange font-bold text-sm flex items-center gap-2">
                 ⚡ Approx. {plan.calories} kcal/day
             </p>
         </div>

         <p className="text-sm italic text-white/80 mb-8 leading-relaxed border-b border-white/10 pb-4">"{plan.advice}"</p>

         <div className="grid gap-4 mb-8">
             {/* Protein Card */}
             <div className="bg-white/10 rounded-2xl p-4 border border-white/5">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 text-red-400 font-bold">
                        <Beef size={18}/> Proteins
                    </div>
                    <span className="text-2xl font-bold text-white">{plan.proteinGrams}g</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {plan.proteinIngredients.map((item, i) => (
                        <span key={i} className="text-xs bg-red-500/20 text-red-200 px-2 py-1 rounded-md border border-red-500/30">{item}</span>
                    ))}
                </div>
             </div>

             {/* Veg Card */}
             <div className="bg-white/10 rounded-2xl p-4 border border-white/5">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 text-green-400 font-bold">
                        <Carrot size={18}/> Veggies
                    </div>
                    <span className="text-2xl font-bold text-white">{plan.carbGrams}g</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {plan.vegIngredients.map((item, i) => (
                        <span key={i} className="text-xs bg-green-500/20 text-green-200 px-2 py-1 rounded-md border border-green-500/30">{item}</span>
                    ))}
                </div>
             </div>

             {/* Carbs/Fats Card */}
             <div className="bg-white/10 rounded-2xl p-4 border border-white/5">
                <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2 text-yellow-400 font-bold">
                        <Wheat size={18}/> Carbs & Fats
                    </div>
                    <div className="text-right">
                        <span className="text-2xl font-bold text-white block">{plan.fatGrams}g <span className="text-xs text-white/50 font-normal">Fats</span></span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {plan.carbIngredients.map((item, i) => (
                        <span key={i} className="text-xs bg-yellow-500/20 text-yellow-200 px-2 py-1 rounded-md border border-yellow-500/30">{item}</span>
                    ))}
                </div>
             </div>
         </div>
         
         <div className="bg-brand-orange/20 p-4 rounded-xl text-center mb-6">
            <p className="text-[10px] text-brand-orange/80 font-bold">
                ⚠️ IMPORTANT: Weigh raw or cooked as per your vet's advice. Introduce new ingredients slowly over 7 days.
            </p>
         </div>

         {/* Restart Button at bottom instead of overlapping top-right */}
         <Button onClick={() => setStep('input')} variant="outline" className="mt-auto border-white/30 text-white hover:bg-white/10 hover:border-white w-full">
            <RefreshCw size={18} className="mr-2"/> Plan Another Meal
         </Button>
         <div className="h-8"></div>
      </div>
    );
  }

  // Input Form
  return (
    <div className="h-full flex flex-col p-6 md:p-8 overflow-y-auto scrollbar-hide bg-white">
      <div className="mb-8 pt-6 md:pt-0">
          <h2 className="text-2xl font-bold text-brand-brown flex items-center gap-2">
            <Utensils className="text-brand-orange"/> The Fresh Feast Planner
          </h2>
          <p className="text-gray-500 text-sm mt-1">Create a custom fresh food plan.</p>
      </div>

      <div className="flex gap-4 mb-6">
         <button 
            onClick={() => setFormData({...formData, type: 'Dog'})}
            className={`flex-1 py-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${formData.type === 'Dog' ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-gray-100 hover:border-brand-orange/30 text-gray-400'}`}
         >
            <Dog size={24}/>
            <span className="font-bold text-sm">Doggo</span>
         </button>
         <button 
            onClick={() => setFormData({...formData, type: 'Cat'})}
            className={`flex-1 py-4 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${formData.type === 'Cat' ? 'border-brand-orange bg-orange-50 text-brand-orange' : 'border-gray-100 hover:border-brand-orange/30 text-gray-400'}`}
         >
            <Cat size={24}/>
            <span className="font-bold text-sm">Kitty</span>
         </button>
      </div>

      <div className="space-y-6 flex-1 pb-10">
         <div>
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Pet's Name</label>
             <input 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-brand-orange outline-none text-brand-brown font-semibold"
                placeholder="e.g. Jojo"
             />
         </div>

         <div className="grid grid-cols-2 gap-4">
             <div>
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Weight (KG)</label>
                 <div className="relative flex items-center">
                     <button onClick={() => setFormData(p => ({...p, weight: Math.max(0.5, p.weight - 0.5)}))} className="absolute left-2 p-1 text-gray-400 hover:text-brand-orange"><ChevronDown size={16}/></button>
                     <input 
                        type="number"
                        value={formData.weight}
                        onChange={(e) => setFormData({...formData, weight: parseFloat(e.target.value)})}
                        className="w-full p-3 text-center bg-gray-50 rounded-xl border border-brand-orange/30 text-brand-orange font-bold text-lg outline-none"
                     />
                     <button onClick={() => setFormData(p => ({...p, weight: p.weight + 0.5}))} className="absolute right-2 p-1 text-gray-400 hover:text-brand-orange"><ChevronUp size={16}/></button>
                 </div>
             </div>
             <div>
                 <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Age (Yrs)</label>
                 <input 
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: parseFloat(e.target.value)})}
                    className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-brand-brown font-semibold"
                 />
             </div>
         </div>

         <div>
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Activity Level</label>
             <div className="flex bg-gray-100 rounded-xl p-1">
                 {['Low', 'Normal', 'High'].map((level) => (
                     <button
                        key={level}
                        onClick={() => setFormData({...formData, activity: level})}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${formData.activity === level ? 'bg-white text-brand-brown shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                     >
                         {level}
                     </button>
                 ))}
             </div>
         </div>

         <div>
             <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 block">Allergies (Optional)</label>
             <input 
                value={formData.allergies}
                onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                className="w-full p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none text-brand-brown text-sm"
                placeholder="Chicken, Grain, etc."
             />
         </div>

         <Button onClick={handleGenerate} className="w-full py-4 text-lg shadow-orange-200 shadow-xl mt-4">
             <SparklesIcon className="mr-2"/> Conjure Meal Plan
         </Button>
      </div>
    </div>
  );
};

const SparklesIcon = ({className}: {className?: string}) => (
    <svg className={`w-5 h-5 inline-block ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
);

export default MealPlannerTool;
