'use client';

import React from 'react';
import { Star, ShieldCheck, Award, Sparkles, Quote } from 'lucide-react';

const PRESS_LOGOS = [
  { name: 'Architectural Digest', quote: 'The pinnacle of architectural sanctuaries and discreet privacy.' },
  { name: 'Condé Nast Traveler', quote: 'Ranked Gold Standard #1 Private Villa & Sanctuary Collection.' },
  { name: 'Robb Report', quote: 'The world’s most impeccably orchestrated bespoke travel journeys.' },
  { name: 'Forbes Travel Guide', quote: '100% Verified 5-Star luxury audit across every property.' }
];

const GLOBAL_STATS = [
  { value: '99.8%', label: 'Guest Satisfaction', sub: 'Audited post-stay ratings' },
  { value: '100%', label: 'Direct Villa Guarantee', sub: 'No intermediary brokers' },
  { value: '24 / 7', label: 'Butler Guild Attendants', sub: 'British Guild certified' },
  { value: '14,500+', label: 'Bespoke Escapes Curated', sub: 'Across 42 countries' }
];

export const SocialProofSection = () => {
  return (
    <section className="py-20 bg-neutral-950 text-white border-t border-b border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Press Badges Bar */}
        <div className="text-center mb-16">
          <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] text-amber-300/80 block mb-6 px-2">
            Recognized by the World’s Foremost Luxury Travel Authorities
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRESS_LOGOS.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-neutral-900/60 border border-white/5 flex flex-col justify-between text-left"
              >
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-neutral-300 font-light italic leading-relaxed mb-4">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <span className="font-serif text-sm font-semibold tracking-wider text-white uppercase block pt-2 border-t border-white/10">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Statistics Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 py-6 sm:py-8 px-4 sm:px-6 rounded-3xl bg-gradient-to-r from-neutral-900 via-neutral-900/90 to-neutral-900 border border-amber-500/20">
          {GLOBAL_STATS.map((stat, idx) => (
            <div key={idx} className="text-center sm:text-left">
              <span className="font-mono text-2xl sm:text-4xl font-bold text-amber-300 block mb-1">
                {stat.value}
              </span>
              <span className="font-serif text-sm text-white font-medium block">
                {stat.label}
              </span>
              <span className="text-[11px] text-neutral-400 font-mono block">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
