
import React, { useState } from 'react';
import { ChefHat, Plus, Trash2 } from 'lucide-react';
import { generateTreatRecipe } from '../services/geminiService';
import { TreatRecipeResponse } from '../types';
import Button from './Button';

const TreatChefTool: React.FC = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [result, setResult] = useState<TreatRecipeResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const addIngredient = () => {
    if(input.trim()) {
      setIngredients([...ingredients, input.trim()]);
      setInput('');
    }
  };

  const handleGenerate = async () => {
    if (ingredients.length === 0) return;
    setLoading(true);
    const data = await generateTreatRecipe(ingredients, 'Dog'); // Defaulting to dog for simplicity in UI, can expand
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white overflow-y-auto scrollbar-hide">
       <div className="text-center mb-8">
        <div className="inline-block bg-orange-100 p-3 rounded-2xl mb-4"><ChefHat className="text-orange-600 w-8 h-8"/></div>
        <h2 className="text-2xl font-bold text-brand-brown">DIY Treat Chef</h2>
        <p className="text-gray-500 text-sm">Turn pantry leftovers into paw-some snacks.</p>
      </div>

      {!result ? (
        <div className="space-y-6 max-w-md mx-auto w-full">
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">What ingredients do you have?</label>
             <div className="flex gap-2 mb-4">
               <input 
                 value={input}
                 onChange={(e) => setInput(e.target.value)}
                 onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
                 className="flex-1 p-3 bg-gray-50 rounded-xl border border-gray-200 outline-none"
                 placeholder="e.g. Pumpkin, Oat, Egg"
               />
               <button onClick={addIngredient} className="bg-orange-500 text-white p-3 rounded-xl hover:bg-orange-600"><Plus/></button>
             </div>
             <div className="flex flex-wrap gap-2">
               {ingredients.map((ing, i) => (
                 <span key={i} className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm font-bold flex items-center gap-2">
                   {ing} <button onClick={() => setIngredients(ingredients.filter((_, idx) => idx !== i))}><Trash2 size={14}/></button>
                 </span>
               ))}
             </div>
           </div>
           <Button onClick={handleGenerate} disabled={loading || ingredients.length === 0} className="w-full py-4">
             {loading ? 'Cooking...' : 'Create Recipe'}
           </Button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4">
           <div className="bg-orange-50 p-6 rounded-t-3xl border-b border-orange-100 text-center">
             <h3 className="text-2xl font-bold text-brand-brown">{result.title}</h3>
           </div>
           <div className="bg-white border border-t-0 border-orange-100 p-6 rounded-b-3xl shadow-sm mb-6">
              <h4 className="font-bold text-orange-600 text-sm mb-2">Ingredients</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
                {result.ingredients.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
              <h4 className="font-bold text-orange-600 text-sm mb-2">Instructions</h4>
              <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-1">
                {result.instructions.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
              <div className="mt-4 bg-yellow-50 p-3 rounded-xl text-xs text-yellow-800 font-medium">
                 ⚠️ {result.nutritionNote}
              </div>
           </div>
           <Button variant="outline" className="w-full" onClick={() => setResult(null)}>New Recipe</Button>
        </div>
      )}
    </div>
  );
};

export default TreatChefTool;
