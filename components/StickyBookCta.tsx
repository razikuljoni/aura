'use client';

import React, { useState, useEffect } from 'react';
import { useBooking } from '@/lib/booking-store';
import { 
  Sparkles, 
  Calendar, 
  Users, 
  MapPin, 
  ArrowRight, 
  Zap, 
  ShieldCheck 
} from 'lucide-react';

export const StickyBookCta = () => {
  const { 
    searchState, 
    formatPrice, 
    calculateDynamicPrice,
    properties,
    startBookingProperty
  } = useBooking();

  const [isVisible, setIsVisible] = useState(false);

  // Show sticky bar once user scrolls past the hero section (> 450px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 450) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const baseAvgPrice = 1850;
  const pricing = calculateDynamicPrice(
    baseAvgPrice,
    searchState.checkIn,
    searchState.checkOut,
    searchState.adults + searchState.children
  );

  const handleStickyClick = () => {
    const featuredProperty = properties[0];
    if (featuredProperty) {
      startBookingProperty(featuredProperty);
    }
  };

  const handleScrollToSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 sm:w-auto max-w-full sm:min-w-[500px] md:min-w-[640px] z-40 animate-slideUp">
      <div className="p-3 sm:px-6 sm:py-3.5 rounded-2xl bg-neutral-950/95 border border-amber-500/40 backdrop-blur-2xl shadow-2xl shadow-black flex items-center justify-between gap-4 text-white">
        
        {/* Left summary */}
        <div className="hidden sm:flex items-center gap-4 border-r border-white/10 pr-4">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-300">
                From {formatPrice(pricing.nightlyRate)}
              </span>
              <span className="text-[10px] text-neutral-400">/ night</span>
            </div>
            <span className="text-[10px] text-neutral-400 font-mono block">
              {searchState.destination || 'Global Escapes'} • {pricing.totalNights}N ({searchState.checkIn})
            </span>
          </div>
        </div>

        {/* Mobile rate display */}
        <div className="sm:hidden">
          <span className="text-xs font-mono font-bold text-amber-300 block">
            From {formatPrice(pricing.nightlyRate)}
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">
            {pricing.totalNights}N Stay
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleScrollToSearch}
            className="hidden md:inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 hover:border-amber-400/40 text-xs text-neutral-300 hover:text-white transition-colors"
          >
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Modify Dates</span>
          </button>

          <button
            onClick={handleStickyClick}
            id="sticky-book-now-cta"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-amber-500/25 flex items-center gap-1.5 active:scale-95"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
