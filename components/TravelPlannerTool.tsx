
import React, { useState } from 'react';
import { Map, CheckCircle } from 'lucide-react';
import { generateTravelPlan } from '../services/geminiService';
import { TravelPlanResponse } from '../types';
import Button from './Button';

const TravelPlannerTool: React.FC = () => {
  const [dest, setDest] = useState('');
  const [result, setResult] = useState<TravelPlanResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePlan = async () => {
    if (!dest) return;
    setLoading(true);
    const data = await generateTravelPlan(dest, 'Dog');
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white overflow-y-auto scrollbar-hide">
       <div className="text-center mb-8">
        <div className="inline-block bg-green-100 p-3 rounded-2xl mb-4"><Map className="text-green-600 w-8 h-8"/></div>
        <h2 className="text-2xl font-bold text-brand-brown">Pet Travel Planner</h2>
        <p className="text-gray-500 text-sm">Packing lists & tips for your next adventure.</p>
      </div>

      {!result ? (
        <div className="space-y-6 max-w-md mx-auto w-full">
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Where are you going?</label>
             <input 
               value={dest}
               onChange={(e) => setDest(e.target.value)}
               className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 outline-none font-bold text-brand-brown"
               placeholder="e.g. Penang, Cameron Highlands"
             />
           </div>
           <Button onClick={handlePlan} disabled={loading} className="w-full py-4 bg-green-600 border-green-800 hover:bg-green-700">
             {loading ? 'Planning Trip...' : 'Generate Itinerary'}
           </Button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4">
           <h3 className="text-2xl font-bold text-brand-brown mb-6 text-center">Trip to {result.destination}</h3>
           
           <div className="grid md:grid-cols-2 gap-4 mb-6">
             <div className="bg-green-50 p-4 rounded-2xl">
               <h4 className="font-bold text-green-700 mb-3">🎒 Packing List</h4>
               <ul className="space-y-2">
                 {result.packingList.map((item, i) => (
                   <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                     <CheckCircle size={14} className="text-green-500"/> {item}
                   </li>
                 ))}
               </ul>
             </div>
             <div className="bg-blue-50 p-4 rounded-2xl">
               <h4 className="font-bold text-blue-700 mb-3">📸 Activities</h4>
               <ul className="space-y-2">
                 {result.activities.map((item, i) => (
                   <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                     <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"/> {item}
                   </li>
                 ))}
               </ul>
             </div>
           </div>

           <div className="bg-gray-50 p-4 rounded-2xl mb-6">
              <h4 className="font-bold text-gray-500 text-xs uppercase tracking-wider mb-2">Travel Tips</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                 {result.tips.map((tip, i) => <li key={i}>• {tip}</li>)}
              </ul>
           </div>

           <Button variant="outline" className="w-full" onClick={() => setResult(null)}>Plan New Trip</Button>
        </div>
      )}
    </div>
  );
};

export default TravelPlannerTool;
