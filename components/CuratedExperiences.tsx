'use client';

import React, { useState } from 'react';
import { useBooking } from '@/lib/booking-store';
import { CuratedExperience } from '@/lib/types';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Plane, 
  Ship, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';

export const CuratedExperiences = () => {
  const { 
    experiences, 
    formatPrice, 
    setSelectedExperienceForDetail,
    startBookingExperience
  } = useBooking();

  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? experiences.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === experiences.length - 1 ? 0 : prev + 1));
  };

  const currentExp = experiences[activeIndex];

  return (
    <section id="curated-experiences-section" className="py-24 bg-neutral-950 text-white relative overflow-hidden border-t border-amber-500/20">
      
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              Bespoke Escapes & Expeditions
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white">
              Curated <span className="italic text-amber-200">Experiences</span>
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base font-light max-w-xl mt-2">
              All-inclusive private journeys seamlessly combining five-star sanctuaries, Riva yacht charters, private aviation, and Michelin masterchefs.
            </p>
          </div>

          {/* Carousel Navigation Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              id="curated-prev-btn"
              className="w-12 h-12 rounded-full border border-white/15 bg-neutral-900/80 hover:border-amber-400 hover:bg-amber-500/10 text-neutral-300 hover:text-amber-300 flex items-center justify-center transition-all shadow-lg active:scale-95"
              title="Previous Experience"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="text-xs font-mono text-neutral-400 px-2">
              <span className="text-amber-300 font-bold">{activeIndex + 1}</span> / {experiences.length}
            </div>
            <button
              onClick={handleNext}
              id="curated-next-btn"
              className="w-12 h-12 rounded-full border border-white/15 bg-neutral-900/80 hover:border-amber-400 hover:bg-amber-500/10 text-neutral-300 hover:text-amber-300 flex items-center justify-center transition-all shadow-lg active:scale-95"
              title="Next Experience"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Interactive Hero Experience Card */}
        <div className="rounded-3xl border border-amber-500/30 bg-neutral-900/90 overflow-hidden shadow-2xl backdrop-blur-xl mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Image & Overlay Visuals (Cols 7) */}
            <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[520px] overflow-hidden group">
              <img 
                src={currentExp.heroImage} 
                alt={currentExp.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-black/20 to-transparent" />

              {/* Category & Duration Pill */}
              <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-neutral-950/80 border border-amber-400/40 text-amber-300 text-xs font-medium backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <Compass className="w-3.5 h-3.5" />
                  {currentExp.category}
                </span>
                <span className="px-3.5 py-1.5 rounded-full bg-neutral-950/80 border border-white/20 text-white text-xs font-mono backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {currentExp.durationDays} Days / {currentExp.durationDays - 1} Nights
                </span>
              </div>

              {/* Destination Tag */}
              <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white bg-neutral-950/80 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-md text-xs">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentExp.destination}</span>
              </div>
            </div>

            {/* Right Information & Itinerary Highlights (Cols 5) */}
            <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-neutral-900 to-neutral-950">
              <div>
                <span className="text-[11px] font-mono tracking-widest text-amber-300/80 uppercase block mb-1">
                  Bespoke Signature Journey
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal leading-tight mb-3">
                  {currentExp.title}
                </h3>
                <p className="text-neutral-300 text-xs sm:text-sm font-light leading-relaxed mb-6">
                  {currentExp.tagline}
                </p>

                {/* Highlights List */}
                <div className="space-y-2.5 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                    Exclusive Curated Inclusions
                  </span>
                  {currentExp.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                      <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing and Action Buttons */}
              <div className="pt-6 border-t border-white/10">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block">
                      All-Inclusive Package Price
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="font-mono text-2xl sm:text-3xl font-bold text-amber-300">
                        {formatPrice(currentExp.priceTotal)}
                      </span>
                      {currentExp.originalPrice && (
                        <span className="text-xs font-mono text-neutral-500 line-through">
                          {formatPrice(currentExp.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 justify-end">
                      <ShieldCheck className="w-3 h-3" /> 100% Guaranteed
                    </span>
                    <span className="text-[10px] text-neutral-400">for 2 guests total</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5">
                  <button
                    onClick={() => setSelectedExperienceForDetail(currentExp)}
                    id={`exp-details-${currentExp.id}`}
                    className="py-3 px-4 rounded-xl border border-amber-500/40 bg-neutral-800/80 hover:bg-neutral-800 text-amber-200 hover:text-white text-xs font-medium transition-colors text-center"
                  >
                    View Daily Itinerary
                  </button>
                  <button
                    onClick={() => startBookingExperience(currentExp)}
                    id={`exp-book-${currentExp.id}`}
                    className="py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Reserve Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Small Thumbnail Selection Carousel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {experiences.map((exp, idx) => (
            <div
              key={exp.id}
              onClick={() => setActiveIndex(idx)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                activeIndex === idx 
                  ? 'border-amber-400 bg-neutral-900 shadow-xl shadow-amber-500/10' 
                  : 'border-white/10 bg-neutral-950/60 hover:border-amber-500/30 hover:bg-neutral-900/60'
              }`}
            >
              <img 
                src={exp.heroImage} 
                alt={exp.title} 
                className="w-16 h-16 rounded-xl object-cover border border-white/10 shrink-0"
              />
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono text-amber-400 block truncate">
                  {exp.destination.split(',')[0]} • {exp.durationDays}D
                </span>
                <span className="text-xs font-medium text-white block truncate">
                  {exp.title}
                </span>
                <span className="text-xs font-mono font-semibold text-neutral-300 block mt-0.5">
                  {formatPrice(exp.priceTotal)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
