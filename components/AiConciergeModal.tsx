'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useBooking } from '@/lib/booking-store';
import { generateId } from '@/lib/utils';
import { 
  X, 
  Sparkles, 
  Send, 
  Bot, 
  User, 
  Compass, 
  MapPin, 
  Star, 
  ArrowRight,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const SUGGESTED_PROMPTS = [
  'Plan a 5-day romantic getaway in Amalfi Coast with private Riva yachting',
  'Which villa is best for family seclusion with a Michelin-starred private chef?',
  'Recommend an overwater retreat in the Maldives with coral reef diving',
  'What are the private aviation transfer options to St. Moritz?'
];

export const AiConciergeModal = () => {
  const { 
    aiConciergeOpen, 
    setAiConciergeOpen, 
    userProfile,
    searchState,
    setSelectedPropertyForDetail,
    properties
  } = useBooking();

  const [inputPrompt, setInputPrompt] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Good day ${userProfile.name.split(' ')[0]}. I am your **AURA Privé AI Travel Concierge**.\n\nWhether you desire an overwater starlight pavilion in the Maldives, a cliffside palazzo along the Amalfi Coast, or bespoke private aviation arrangements, allow me to tailor your next extraordinary escape. How may I assist you today?`,
      time: 'Just now'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!aiConciergeOpen) return null;

  const handleSendMessage = async (promptToSend?: string) => {
    const prompt = promptToSend || inputPrompt;
    if (!prompt.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: generateId('usr'),
      role: 'user',
      content: prompt,
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      // Build conversation history for context
      const history = messages.map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          conversationHistory: history,
          userContext: {
            destination: searchState.destination,
            checkIn: searchState.checkIn,
            checkOut: searchState.checkOut,
            guests: searchState.adults + searchState.children,
            memberTier: userProfile.memberTier
          }
        })
      });

      if (!res.ok) {
        throw new Error('Failed to reach AURA Privé AI server');
      }

      const data = await res.json();
      const assistantMessage: ChatMessage = {
        id: generateId('ast'),
        role: 'assistant',
        content: data.reply || 'Our luxury concierge service is momentarily indisposed. Please allow us to refresh.',
        time: 'Just now'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      const errorMessage: ChatMessage = {
        id: generateId('err'),
        role: 'assistant',
        content: `I apologize for the brief pause in transmission. Let me personally recommend our **Villa Bella Vista** on the Amalfi Coast or **Soneva Jani Overwater Reserve** in the Maldives. Both offer 24/7 dedicated butler service and private yacht charters.`,
        time: 'Just now'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: generateId('welcome'),
        role: 'assistant',
        content: `Good day ${userProfile.name.split(' ')[0]}. How may I tailor your next sanctuary itinerary today?`,
        time: 'Just now'
      }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-neutral-950 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl shadow-black text-white h-[85vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-neutral-950 shadow-lg shadow-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-base text-white font-medium block flex items-center gap-2">
                AURA Privé AI Concierge
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[9px] font-mono border border-amber-400/30">
                  Gemini 3.7
                </span>
              </span>
              <span className="text-[10px] text-neutral-400 font-mono">
                Discreet 24/7 Ultra-Luxury Travel Designer
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetChat}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setAiConciergeOpen(false)}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="overflow-y-auto p-6 space-y-4 flex-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-amber-400 text-neutral-950 font-medium rounded-br-none shadow-md'
                  : 'bg-neutral-900 border border-white/10 text-neutral-200 rounded-bl-none shadow-md'
              }`}>
                {/* Parse simple markdown like bolding and linebreaks */}
                <div className="whitespace-pre-wrap space-y-2">
                  {msg.content.split('\n\n').map((para, pIdx) => (
                    <p key={pIdx}>
                      {para.split('**').map((chunk, cIdx) => (
                        cIdx % 2 === 1 ? <strong key={cIdx} className={msg.role === 'user' ? 'text-neutral-950 font-bold' : 'text-amber-200 font-semibold'}>{chunk}</strong> : chunk
                      ))}
                    </p>
                  ))}
                </div>

                <span className={`block text-[9px] mt-2 font-mono ${msg.role === 'user' ? 'text-neutral-800' : 'text-neutral-500'}`}>
                  {msg.time}
                </span>
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center text-white shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-neutral-900 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                <span className="text-xs text-neutral-400 font-mono ml-2">Consulting Global Private Estate Registry...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Prompts Pill Carousel */}
        <div className="px-6 py-2 border-t border-white/5 bg-neutral-950/90 flex gap-2 overflow-x-auto shrink-0">
          {SUGGESTED_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-white/10 hover:border-amber-400/40 text-[11px] text-neutral-300 hover:text-white whitespace-nowrap transition-colors flex items-center gap-1 shrink-0"
            >
              <Compass className="w-3 h-3 text-amber-400" />
              <span>{prompt}</span>
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-4 border-t border-white/10 bg-neutral-900/80 backdrop-blur-md shrink-0 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask your travel designer about private villas, yacht charters, custom itineraries..."
            className="flex-1 bg-neutral-950 border border-white/15 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputPrompt.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 disabled:opacity-40 transition-all font-semibold"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
