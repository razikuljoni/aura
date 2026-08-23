'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useBooking } from '@/lib/booking-store';
import { POPULAR_DESTINATIONS } from '@/lib/data';
import { 
  Search, 
  Calendar, 
  Users, 
  MapPin, 
  ChevronDown, 
  Sparkles, 
  Zap, 
  Check, 
  Minus, 
  Plus, 
  X,
  BedDouble,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export const SearchBar = () => {
  const { 
    searchState, 
    updateSearchField, 
    formatPrice,
    calculateDynamicPrice,
    filteredProperties
  } = useBooking();

  const [destinationOpen, setDestinationOpen] = useState(false);
  const [datesOpen, setDatesOpen] = useState(false);
  const [guestsOpen, setGuestsOpen] = useState(false);

  const destRef = useRef<HTMLDivElement>(null);
  const datesRef = useRef<HTMLDivElement>(null);
  const guestsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destRef.current && !destRef.current.contains(event.target as Node)) {
        setDestinationOpen(false);
      }
      if (datesRef.current && !datesRef.current.contains(event.target as Node)) {
        setDatesOpen(false);
      }
      if (guestsRef.current && !guestsRef.current.contains(event.target as Node)) {
        setGuestsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Calculate nights
  const checkInDate = new Date(searchState.checkIn);
  const checkOutDate = new Date(searchState.checkOut);
  const diffTime = Math.max(checkOutDate.getTime() - checkInDate.getTime(), 86400000);
  const totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  // Dynamic price estimate calculation
  const baseAvgPrice = 1950;
  const pricingCalculation = calculateDynamicPrice(
    baseAvgPrice,
    searchState.checkIn,
    searchState.checkOut,
    searchState.adults + searchState.children
  );

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setDestinationOpen(false);
    setDatesOpen(false);
    setGuestsOpen(false);

    const el = document.getElementById('sanctuaries-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectDestination = (destName: string) => {
    updateSearchField('destination', destName);
    setDestinationOpen(false);
    setDatesOpen(true);
  };

  return (
    <div className="w-full relative z-30">
      
      {/* Real-time Dynamic Availability & Pricing Indicator Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-2.5 mb-2 rounded-t-2xl bg-neutral-900/90 border-t border-x border-amber-500/30 backdrop-blur-md text-xs font-light text-neutral-300">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-amber-200 font-medium tracking-wide">Real-Time Inventory:</span>
          <span className="text-neutral-300">
            {filteredProperties.length} Ultra-Luxury Sanctuaries Available for Selected Dates
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-300">
            <Zap className="w-3.5 h-3.5 fill-amber-400" />
            <span className="font-mono text-xs">Avg. {formatPrice(pricingCalculation.nightlyRate)} / night</span>
          </div>
          {pricingCalculation.isHighDemand && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-mono border border-amber-500/30">
              ⚡ High Season Demand
            </span>
          )}
        </div>
      </div>

      {/* Main High-End Search Container */}
      <form 
        onSubmit={handleSearchSubmit}
        className="bg-neutral-950/95 border border-amber-500/40 rounded-b-2xl md:rounded-2xl p-2 sm:p-3 backdrop-blur-xl shadow-2xl shadow-black/80 grid grid-cols-1 md:grid-cols-12 gap-2"
      >
        
        {/* Destination Field (Cols 4) */}
        <div ref={destRef} className="relative md:col-span-4">
          <button
            type="button"
            id="search-destination-trigger"
            onClick={() => {
              setDestinationOpen(!destinationOpen);
              setDatesOpen(false);
              setGuestsOpen(false);
            }}
            className="w-full h-full min-h-[64px] px-4 py-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-900 border border-white/10 hover:border-amber-400/40 text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="truncate">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-amber-300/80">
                  Where to Escape
                </span>
                <span className="block text-sm font-medium text-white truncate">
                  {searchState.destination || 'All Luxury Destinations'}
                </span>
              </div>
            </div>
            {searchState.destination && (
              <span 
                onClick={(e) => {
                  e.stopPropagation();
                  updateSearchField('destination', '');
                }}
                className="p-1 hover:text-white text-neutral-400"
              >
                <X className="w-3.5 h-3.5" />
              </span>
            )}
          </button>

          {/* Destination Dropdown Popover */}
          {destinationOpen && (
            <div className="absolute top-full left-0 mt-2 w-full sm:w-96 bg-neutral-900 border border-amber-500/30 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-xs font-mono tracking-wider uppercase text-amber-300">
                  Select Luxury Destination
                </span>
                <button 
                  type="button"
                  onClick={() => updateSearchField('destination', '')}
                  className="text-[11px] text-neutral-400 hover:text-white"
                >
                  Clear Selection
                </button>
              </div>

              {/* Custom Destination Input */}
              <div className="relative mb-3">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search city, country, or resort..."
                  value={searchState.destination}
                  onChange={(e) => updateSearchField('destination', e.target.value)}
                  className="w-full bg-neutral-950 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  autoFocus
                />
              </div>

              {/* Popular Destinations Cards */}
              <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                {POPULAR_DESTINATIONS.map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => handleSelectDestination(dest.name)}
                    className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-neutral-800/80 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={dest.image} 
                        alt={dest.name} 
                        className="w-10 h-10 rounded-lg object-cover border border-white/10"
                      />
                      <div>
                        <span className="block text-xs font-medium text-white group-hover:text-amber-300 transition-colors">
                          {dest.name}
                        </span>
                        <span className="block text-[10px] text-neutral-400">
                          {dest.tag}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-amber-400 font-semibold">
                        {formatPrice(dest.averagePrice)}
                      </span>
                      <span className="block text-[9px] text-neutral-400">avg/night</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Check-In / Check-Out Field (Cols 4) */}
        <div ref={datesRef} className="relative md:col-span-4">
          <button
            type="button"
            id="search-dates-trigger"
            onClick={() => {
              setDatesOpen(!datesOpen);
              setDestinationOpen(false);
              setGuestsOpen(false);
            }}
            className="w-full h-full min-h-[64px] px-4 py-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-900 border border-white/10 hover:border-amber-400/40 text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-amber-300/80">
                  Stay Duration ({totalNights} Nights)
                </span>
                <span className="block text-xs font-medium text-white">
                  {searchState.checkIn} → {searchState.checkOut}
                </span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-300 transition-colors" />
          </button>

          {/* Dates Popover */}
          {datesOpen && (
            <div className="absolute top-full left-0 mt-2 w-full sm:w-80 bg-neutral-900 border border-amber-500/30 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <span className="text-xs font-mono tracking-wider uppercase text-amber-300">
                  Select Check-in & Check-out
                </span>
                <span className="text-xs font-semibold text-amber-400 font-mono">
                  {totalNights} {totalNights === 1 ? 'Night' : 'Nights'}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Check-in Date</label>
                  <input
                    type="date"
                    value={searchState.checkIn}
                    onChange={(e) => updateSearchField('checkIn', e.target.value)}
                    className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-neutral-400 mb-1">Check-out Date</label>
                  <input
                    type="date"
                    value={searchState.checkOut}
                    onChange={(e) => updateSearchField('checkOut', e.target.value)}
                    className="w-full bg-neutral-950 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Quick Trip Selectors */}
              <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    updateSearchField('checkIn', '2026-09-10');
                    updateSearchField('checkOut', '2026-09-14');
                    setDatesOpen(false);
                  }}
                  className="px-2 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-[10px] text-neutral-300 hover:text-white transition-colors"
                >
                  Weekend (4N)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateSearchField('checkIn', '2026-09-15');
                    updateSearchField('checkOut', '2026-09-22');
                    setDatesOpen(false);
                  }}
                  className="px-2 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-[10px] text-neutral-300 hover:text-white transition-colors"
                >
                  Full Week (7N)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    updateSearchField('checkIn', '2026-10-01');
                    updateSearchField('checkOut', '2026-10-15');
                    setDatesOpen(false);
                  }}
                  className="px-2 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-800 text-[10px] text-neutral-300 hover:text-white transition-colors"
                >
                  Extended (14N)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Guests & Rooms Field (Cols 2.5) */}
        <div ref={guestsRef} className="relative md:col-span-2.5">
          <button
            type="button"
            id="search-guests-trigger"
            onClick={() => {
              setGuestsOpen(!guestsOpen);
              setDestinationOpen(false);
              setDatesOpen(false);
            }}
            className="w-full h-full min-h-[64px] px-4 py-2.5 rounded-xl bg-neutral-900/80 hover:bg-neutral-900 border border-white/10 hover:border-amber-400/40 text-left transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-amber-300/80">
                  Party & Suites
                </span>
                <span className="block text-xs font-medium text-white truncate">
                  {searchState.adults + searchState.children} Guests, {searchState.rooms} {searchState.rooms === 1 ? 'Suite' : 'Suites'}
                </span>
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-neutral-400 group-hover:text-amber-300 transition-colors" />
          </button>

          {/* Guests Popover */}
          {guestsOpen && (
            <div className="absolute top-full right-0 mt-2 w-72 bg-neutral-900 border border-amber-500/30 rounded-2xl shadow-2xl p-4 z-50 animate-fadeIn backdrop-blur-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                <span className="text-xs font-mono tracking-wider uppercase text-amber-300">
                  Guests & Suites
                </span>
                <span className="text-[11px] text-neutral-400">VIP White-Glove</span>
              </div>

              {/* Adults */}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div>
                  <span className="block text-xs font-medium text-white">Adults</span>
                  <span className="block text-[10px] text-neutral-400">Ages 13+</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => updateSearchField('adults', Math.max(1, searchState.adults - 1))}
                    disabled={searchState.adults <= 1}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white flex items-center justify-center text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-semibold text-white w-4 text-center">{searchState.adults}</span>
                  <button
                    type="button"
                    onClick={() => updateSearchField('adults', searchState.adults + 1)}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div>
                  <span className="block text-xs font-medium text-white">Children</span>
                  <span className="block text-[10px] text-neutral-400">Ages 0-12</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => updateSearchField('children', Math.max(0, searchState.children - 1))}
                    disabled={searchState.children <= 0}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white flex items-center justify-center text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-semibold text-white w-4 text-center">{searchState.children}</span>
                  <button
                    type="button"
                    onClick={() => updateSearchField('children', searchState.children + 1)}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Suites / Villas */}
              <div className="flex items-center justify-between py-2 mb-3">
                <div>
                  <span className="block text-xs font-medium text-white">Suites / Villas</span>
                  <span className="block text-[10px] text-neutral-400">Exclusive Sanctuaries</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => updateSearchField('rooms', Math.max(1, searchState.rooms - 1))}
                    disabled={searchState.rooms <= 1}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 disabled:opacity-30 text-white flex items-center justify-center text-xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-semibold text-white w-4 text-center">{searchState.rooms}</span>
                  <button
                    type="button"
                    onClick={() => updateSearchField('rooms', searchState.rooms + 1)}
                    className="w-7 h-7 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white flex items-center justify-center text-xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setGuestsOpen(false)}
                className="w-full py-2 rounded-xl bg-amber-400 text-neutral-950 text-xs font-semibold hover:bg-amber-300 transition-colors"
              >
                Apply Selection
              </button>
            </div>
          )}
        </div>

        {/* CTA Search Button (Cols 1.5) */}
        <div className="md:col-span-1.5 flex items-center">
          <button
            type="submit"
            id="search-submit-cta"
            className="w-full h-full min-h-[64px] rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-semibold tracking-wider uppercase text-xs transition-all duration-300 flex flex-col md:flex-row items-center justify-center gap-1.5 shadow-lg shadow-amber-500/20 active:scale-[0.98] group"
          >
            <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Search</span>
          </button>
        </div>

      </form>

    </div>
  );
};
