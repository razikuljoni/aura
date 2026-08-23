'use client';

import React from 'react';
import { useBooking } from '@/lib/booking-store';
import { 
  X, 
  Sparkles, 
  Clock, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  Plane, 
  Ship, 
  Compass, 
  ArrowRight,
  Calendar,
  Star
} from 'lucide-react';

export const CuratedExperienceDetailModal = () => {
  const { 
    selectedExperienceForDetail, 
    setSelectedExperienceForDetail, 
    formatPrice,
    startBookingExperience
  } = useBooking();

  if (!selectedExperienceForDetail) return null;

  const exp = selectedExperienceForDetail;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black text-white max-h-[92vh] flex flex-col">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono">
              {exp.category}
            </span>
            <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {exp.destination}
            </span>
          </div>

          <button
            onClick={() => setSelectedExperienceForDetail(null)}
            className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Hero Banner */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10">
            <img src={exp.heroImage} alt={exp.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/40 to-transparent" />
            
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block mb-1">
                  Bespoke All-Inclusive Journey
                </span>
                <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal drop-shadow">
                  {exp.title}
                </h2>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-mono uppercase text-neutral-400 block">Total Journey Price</span>
                <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-300">
                  {formatPrice(exp.priceTotal)}
                </span>
              </div>
            </div>
          </div>

          {/* Daily Itinerary Step Breakdown */}
          <div>
            <h3 className="font-serif text-xl text-white mb-4 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" />
              Daily Bespoke Itinerary
            </h3>

            <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-amber-500/20">
              {exp.dailyItinerary.map((day) => (
                <div key={day.day} className="relative pl-8 space-y-1">
                  <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-amber-400 border-2 border-neutral-950 shadow flex items-center justify-center text-[9px] font-bold text-neutral-950 font-mono">
                    {day.day}
                  </div>
                  <h4 className="font-serif text-base text-white font-medium">
                    Day {day.day}: {day.title}
                  </h4>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    {day.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {day.included.map((inc, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-neutral-900 border border-white/5 text-[10px] text-amber-300/90 font-mono">
                        ✓ {inc}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* All Included Perks */}
          <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10">
            <h4 className="font-serif text-lg text-white mb-3">VIP Package Inclusions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {exp.includedPerks.map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-neutral-200">
                  <CheckCircle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>{perk}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs text-neutral-400 block font-mono">
                Total for 2 Guests • 100% Guaranteed Direct Booking
              </span>
              <span className="font-mono text-2xl font-bold text-amber-300">
                {formatPrice(exp.priceTotal)}
              </span>
            </div>

            <button
              onClick={() => {
                setSelectedExperienceForDetail(null);
                startBookingExperience(exp);
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-semibold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
            >
              <span>Reserve This Journey</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
