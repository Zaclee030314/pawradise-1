
import React, { useState, useRef, useEffect } from 'react';
import { PetProfile, ChatMessage } from '../types';
import { generatePetAdvice } from '../services/geminiService';
import Button from './Button';
import { Send, Bot, Sparkles, Utensils, Calendar, AlertCircle } from 'lucide-react';

interface Props {
  petProfile: PetProfile | null;
  onOpenProfile: () => void;
  initialContext?: string;
  placeholder?: string;
  embedded?: boolean;
  initialQuery?: string; // New prop to handle auto-sending a search query
}

const AiAssistant: React.FC<Props> = ({ 
  petProfile, 
  onOpenProfile, 
  initialContext, 
  placeholder,
  embedded = false,
  initialQuery
}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInitialized, setHasInitialized] = useState(false);
  
  // Changed from messagesEndRef to containerRef for better scroll control
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle initial query or context message
  useEffect(() => {
    if (hasInitialized) return;

    const init = async () => {
        if (initialQuery) {
            // If there's a search query, show it as user message and fetch response
            setMessages([
                { role: 'model', text: initialContext || "Woof! Let me look that up for you..." },
                { role: 'user', text: initialQuery }
            ]);
            setIsLoading(true);
            const responseText = await generatePetAdvice(initialQuery, petProfile);
            setMessages(prev => [...prev, { role: 'model', text: responseText }]);
            setIsLoading(false);
        } else {
            // Default greeting
            setMessages([
                { role: 'model', text: initialContext || "Hi Pawrent! I'm your PetzPawradise Assistant. I can help with food portions, event suggestions, or training tips!" }
            ]);
        }
        setHasInitialized(true);
    };
    
    init();
  }, [initialQuery, initialContext, petProfile, hasInitialized]);

  const handleSend = async (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await generatePetAdvice(textToSend, petProfile);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleQuickPrompt = (type: 'food' | 'event' | 'training') => {
    if (!petProfile) {
        setMessages(prev => [...prev, { role: 'model', text: "Please create a Pet Profile first so I can give you accurate recommendations!" }]);
        onOpenProfile();
        return;
    }

    let prompt = "";
    switch(type) {
        case 'food':
            prompt = `Based on my pet ${petProfile.name}'s weight (${petProfile.weight}kg) and activity level (${petProfile.activityLevel}), suggest a daily meal plan with portion sizes (grams) for home-cooked food.`;
            break;
        case 'event':
            prompt = `Suggest suitable pet events or activities in KL/Selangor for a ${petProfile.breed} named ${petProfile.name} who has a personality of: ${petProfile.activityLevel}.`;
            break;
        case 'training':
            prompt = `Give me 3 simple enrichment or training games I can play indoors with my ${petProfile.breed}.`;
            break;
    }
    handleSend(prompt);
  };

  return (
    <div className={`bg-white rounded-3xl overflow-hidden flex flex-col ${embedded ? 'h-full shadow-none border-none' : 'h-[600px] shadow-2xl border border-orange-100'}`}>
      {/* Header - Hide in embedded mode if desired, but usually good to keep context */}
      {!embedded && (
        <div className="bg-brand-yellow p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="bg-white p-2 rounded-full">
                    <Bot className="w-6 h-6 text-brand-orange" />
                </div>
                <div>
                    <h3 className="font-bold text-brand-brown">Ask Pawradise</h3>
                    <p className="text-xs text-brand-brown opacity-80">AI Lifestyle Assistant</p>
                </div>
            </div>
            {!petProfile && (
                <button onClick={onOpenProfile} className="text-xs bg-white/50 px-2 py-1 rounded-lg hover:bg-white/80 text-brand-brown font-semibold">
                    + Add Pet Profile
                </button>
            )}
            {petProfile && (
                <div className="text-xs bg-white/30 px-3 py-1 rounded-full text-brand-brown font-semibold">
                    Chatting about: {petProfile.name}
                </div>
            )}
        </div>
      )}
      
      {/* Embedded Header variant */}
      {embedded && (
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
             <div className="flex items-center gap-2">
                 <Bot className="text-brand-orange" size={20}/>
                 <span className="font-bold text-brand-brown text-sm">AI Assistant</span>
             </div>
             {petProfile ? (
                 <span className="text-xs text-gray-400">Context: {petProfile.name}</span>
             ) : (
                 <button onClick={onOpenProfile} className="text-xs text-brand-orange font-bold hover:underline">+ Add Profile</button>
             )}
        </div>
      )}

      {/* Messages Area */}
      <div 
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-brand-cream/30 scroll-smooth" 
        ref={chatContainerRef}
      >
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm md:text-base ${
              msg.role === 'user' 
                ? 'bg-brand-orange text-white rounded-br-none' 
                : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
            }`}>
              {msg.text.split('\n').map((line, i) => (
                <p key={i} className="mb-1 last:mb-0">{line}</p>
              ))}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 animate-spin text-brand-yellow" />
              <span className="text-sm text-gray-500">Thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-2 bg-white border-t border-gray-100 flex gap-2 overflow-x-auto scrollbar-hide">
         <button onClick={() => handleQuickPrompt('food')} className="flex-shrink-0 flex items-center gap-1 text-xs bg-orange-50 text-orange-600 px-3 py-2 rounded-xl hover:bg-orange-100 transition">
            <Utensils size={14} /> Food Plan
         </button>
         <button onClick={() => handleQuickPrompt('event')} className="flex-shrink-0 flex items-center gap-1 text-xs bg-yellow-50 text-yellow-600 px-3 py-2 rounded-xl hover:bg-yellow-100 transition">
            <Calendar size={14} /> Event Matcher
         </button>
         <button onClick={() => handleQuickPrompt('training')} className="flex-shrink-0 flex items-center gap-1 text-xs bg-blue-50 text-blue-600 px-3 py-2 rounded-xl hover:bg-blue-100 transition">
            <Sparkles size={14} /> Fun Games
         </button>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder={placeholder || "Ask about events, food, or training..."}
          className="flex-1 bg-gray-100 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm"
        />
        <Button 
            onClick={() => handleSend()} 
            disabled={isLoading}
            className="w-10 h-10 !px-0 flex items-center justify-center flex-shrink-0"
        >
          <Send size={16} />
        </Button>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-gray-50 px-4 py-1 text-[10px] text-gray-400 text-center flex items-center justify-center gap-1">
        <AlertCircle size={10} /> AI can make mistakes. Not medical advice.
      </div>
    </div>
  );
};

export default AiAssistant;
