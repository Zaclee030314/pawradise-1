
import React, { useState } from 'react';
import { Stethoscope, ClipboardList, AlertTriangle } from 'lucide-react';
import { prepareVetVisit } from '../services/geminiService';
import { VetPrepResponse } from '../types';
import Button from './Button';

const VetPrepTool: React.FC = () => {
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState<VetPrepResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePrep = async () => {
    if (!symptoms) return;
    setLoading(true);
    const data = await prepareVetVisit(symptoms, 'Dog');
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="h-full flex flex-col p-6 bg-white overflow-y-auto scrollbar-hide">
       <div className="text-center mb-8">
        <div className="inline-block bg-red-100 p-3 rounded-2xl mb-4"><Stethoscope className="text-red-600 w-8 h-8"/></div>
        <h2 className="text-2xl font-bold text-brand-brown">Vet Visit Prep</h2>
        <p className="text-gray-500 text-sm">Get ready for your appointment with confidence.</p>
      </div>

      {!result ? (
        <div className="space-y-6 max-w-md mx-auto w-full">
           <div>
             <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Why are you visiting?</label>
             <textarea 
               value={symptoms}
               onChange={(e) => setSymptoms(e.target.value)}
               className="w-full p-4 bg-gray-50 rounded-2xl border border-gray-200 h-32 outline-none resize-none"
               placeholder="e.g. Limping on left leg, not eating much since yesterday."
             />
           </div>
           <Button onClick={handlePrep} disabled={loading} className="w-full py-4 bg-red-600 border-red-800 hover:bg-red-700">
             {loading ? 'Analyzing...' : 'Prepare Checklist'}
           </Button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4">
           <div className="bg-red-50 p-4 rounded-xl text-red-800 text-xs flex gap-2 mb-6">
              <AlertTriangle className="flex-shrink-0" size={16}/>
              {result.disclaimer}
           </div>

           <div className="space-y-6">
              <div>
                 <h3 className="font-bold text-brand-brown mb-3 flex items-center gap-2"><ClipboardList className="text-red-500"/> Checklist to Bring/Note</h3>
                 <ul className="bg-gray-50 p-4 rounded-2xl space-y-2 text-sm text-gray-700">
                    {result.checklist.map((item, i) => <li key={i}>☐ {item}</li>)}
                 </ul>
              </div>

              <div>
                 <h3 className="font-bold text-brand-brown mb-3">Questions to Ask the Vet</h3>
                 <ul className="bg-blue-50 p-4 rounded-2xl space-y-2 text-sm text-blue-900">
                    {result.questionsToAsk.map((item, i) => <li key={i}>? {item}</li>)}
                 </ul>
              </div>
           </div>
           
           <div className="mt-8">
               <Button variant="outline" className="w-full" onClick={() => setResult(null)}>Start Over</Button>
           </div>
        </div>
      )}
    </div>
  );
};

export default VetPrepTool;
