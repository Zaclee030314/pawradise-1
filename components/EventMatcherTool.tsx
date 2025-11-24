
import React, { useState } from 'react';
import { Heart, Music, Sun, Coffee, Smile, Check, Zap, MapPin, RefreshCw } from 'lucide-react';
import Button from './Button';
import { findEventMatch } from '../services/geminiService';
import { EventSuggestion } from '../types';

interface Props {
  petProfile: any;
}

const EventMatcherTool: React.FC<Props> = ({ petProfile }) => {
  const [mood, setMood] = useState('Social Butterfly');
  const [vibe, setVibe] = useState('Outdoor Fun');
  const [suggestions, setSuggestions] = useState<EventSuggestion[] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    setLoading(true);
    const matches = await findEventMatch(mood, vibe, petProfile?.name || '');
    setSuggestions(matches);
    setLoading(false);
  };

  const moods = [
      { label: 'Social Butterfly', icon: <Smile size={20}/>, color: 'bg-blue-100 text-blue-600' },
      { label: 'Shy & Sweet', icon: <Heart size={20}/>, color: 'bg-pink-100 text-pink-600' },
      { label: 'Energetic Zoomer', icon: <Zap size={20}/>, color: 'bg-yellow-100 text-yellow-600' },
  ];

  const vibes = [
      { label: 'Outdoor Fun', icon: <Sun size={20}/> },
      { label: 'Chill & Indoor', icon: <Coffee size={20}/> },
      { label: 'Party & Loud', icon: <Music size={20}/> },
  ];

  return (
    <div className="h-full flex flex-col p-6 md:p-10 bg-white overflow-y-auto relative scrollbar-hide">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-50 rounded-bl-full -z-0"></div>

        <div className="relative z-10 mb-8 flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold text-brand-brown flex items-center gap-2">
                    <Heart className="text-pink-500 fill-current"/> Event Matcher
                </h2>
                <p className="text-gray-500 text-sm mt-1">Find the purr-fect weekend plan.</p>
            </div>
            {suggestions && (
                <button onClick={() => setSuggestions(null)} className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition">
                    <RefreshCw size={18} className="text-gray-600"/>
                </button>
            )}
        </div>

        {!suggestions ? (
            <div className="flex-1 flex flex-col gap-8">
                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">What's your pet's mood?</label>
                    <div className="grid gap-3">
                        {moods.map((m) => (
                            <button
                                key={m.label}
                                onClick={() => setMood(m.label)}
                                className={`p-4 rounded-2xl border-2 flex items-center gap-4 transition-all text-left group ${mood === m.label ? 'border-brand-orange bg-orange-50' : 'border-gray-100 hover:border-brand-orange/30'}`}
                            >
                                <div className={`p-2 rounded-full ${m.color}`}>{m.icon}</div>
                                <span className={`font-bold ${mood === m.label ? 'text-brand-brown' : 'text-gray-600'}`}>{m.label}</span>
                                {mood === m.label && <Check className="ml-auto text-brand-orange" size={20}/>}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 block">Preferred Vibe?</label>
                    <div className="flex gap-2">
                         {vibes.map((v) => (
                             <button
                                key={v.label}
                                onClick={() => setVibe(v.label)}
                                className={`flex-1 py-3 px-2 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${vibe === v.label ? 'border-brand-orange bg-brand-orange text-white shadow-lg transform scale-105' : 'border-gray-100 text-gray-400 hover:bg-gray-50'}`}
                             >
                                 {v.icon}
                                 <span className="text-[10px] font-bold uppercase">{v.label}</span>
                             </button>
                         ))}
                    </div>
                </div>
                
                <div className="mt-auto">
                    <Button onClick={handleMatch} disabled={loading} className="w-full py-4 text-lg bg-pink-500 border-pink-700 hover:bg-pink-600 hover:border-pink-800 shadow-lg shadow-pink-200">
                        {loading ? 'Sniffing out spots...' : 'Find My Matches'}
                    </Button>
                </div>
            </div>
        ) : (
            <div className="flex-1 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                 <p className="text-sm text-gray-500 text-center bg-pink-50 py-2 rounded-lg border border-pink-100">
                    Top 3 picks for a <b>{mood}</b> pet who loves <b>{vibe}</b> vibes:
                 </p>
                 
                 {suggestions.map((sugg, idx) => (
                     <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-md hover:shadow-lg hover:border-pink-200 transition-all">
                         <div className="flex justify-between items-start mb-2">
                             <h3 className="font-bold text-brand-brown text-lg leading-tight">{sugg.title}</h3>
                             <span className="bg-gray-100 text-gray-600 text-[10px] px-2 py-1 rounded-md font-bold flex items-center gap-1">
                                 <MapPin size={10}/> {sugg.location}
                             </span>
                         </div>
                         <p className="text-gray-600 text-sm mb-3">{sugg.description}</p>
                         <div className="bg-pink-50 p-2 rounded-lg">
                             <p className="text-xs text-pink-700 font-medium">
                                 💖 <span className="font-bold">Why:</span> {sugg.matchReason}
                             </p>
                         </div>
                     </div>
                 ))}
                 
                 <div className="text-center mt-6">
                    <Button variant="outline" onClick={() => setSuggestions(null)} size="sm">
                        Search Again
                    </Button>
                 </div>
            </div>
        )}
    </div>
  );
};

export default EventMatcherTool;
