'use client';

import React, { useState, useEffect } from 'react';
import { useBooking, CurrencyType } from '@/lib/booking-store';
import { 
  Sparkles, 
  Heart, 
  Briefcase, 
  User, 
  Globe, 
  ShieldCheck, 
  Menu, 
  X, 
  ChevronDown, 
  PhoneCall, 
  Search,
  Compass,
  Star
} from 'lucide-react';

export const Navbar = () => {
  const { 
    currency, 
    setCurrency, 
    wishlistIds, 
    bookings, 
    setAccountPortalOpen, 
    setActivePortalTab,
    setAiConciergeOpen,
    userProfile,
    searchState,
    updateSearchField
  } = useBooking();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const upcomingBookingsCount = bookings.filter(b => b.status === 'confirmed' || b.status === 'active').length;

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled 
          ? 'bg-neutral-950/90 backdrop-blur-md border-b border-amber-500/20 py-3 shadow-2xl shadow-black/60' 
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-10 h-10 rounded-full border border-amber-400/40 bg-gradient-to-br from-amber-500/20 to-neutral-900 flex items-center justify-center shadow-inner">
            <span className="font-serif text-xl font-bold tracking-widest text-amber-300">A</span>
          </div>
          <div>
            <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.25em] text-white block uppercase">
              AURA
            </span>
            <span className="text-[9px] tracking-[0.35em] text-amber-300/80 uppercase block font-sans -mt-1">
              Grand Luxe Escapes
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-light tracking-widest uppercase text-neutral-300">
          <button 
            id="nav-sanctuaries"
            onClick={() => scrollToSection('sanctuaries-section')} 
            className="hover:text-amber-300 transition-colors py-1 relative group"
          >
            Sanctuaries
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
          </button>
          <button 
            id="nav-experiences"
            onClick={() => scrollToSection('curated-experiences-section')} 
            className="hover:text-amber-300 transition-colors py-1 relative group"
          >
            Curated Journeys
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
          </button>
          <button 
            id="nav-destinations"
            onClick={() => scrollToSection('destinations-section')} 
            className="hover:text-amber-300 transition-colors py-1 relative group"
          >
            Destinations
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-400 transition-all duration-300 group-hover:w-full" />
          </button>
          <button 
            id="nav-membership"
            onClick={() => {
              setActivePortalTab('membership');
              setAccountPortalOpen(true);
            }} 
            className="hover:text-amber-300 transition-colors py-1 relative group flex items-center gap-1.5 text-amber-200"
          >
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            AURA Privé Club
          </button>
        </nav>

        {/* Right Action Icons & Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* AI Luxury Concierge Button */}
          <button
            id="nav-ai-concierge-btn"
            onClick={() => setAiConciergeOpen(true)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-400/40 text-amber-200 hover:text-white hover:border-amber-300 hover:bg-amber-500/30 transition-all shadow-sm group"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-medium tracking-wider uppercase hidden md:inline">AI Concierge</span>
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              id="currency-selector-btn"
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 bg-neutral-900/60 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-medium">{currency}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            {currencyDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-neutral-900 border border-amber-500/20 rounded-xl shadow-xl py-1.5 z-50 text-xs font-medium">
                {(['USD', 'EUR', 'GBP', 'JPY'] as CurrencyType[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      setCurrency(c);
                      setCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 hover:bg-amber-500/10 hover:text-amber-300 transition-colors flex items-center justify-between ${
                      currency === c ? 'text-amber-300 bg-amber-500/10 font-semibold' : 'text-neutral-300'
                    }`}
                  >
                    <span>{c}</span>
                    <span className="text-[10px] text-neutral-400">
                      {c === 'USD' ? '$' : c === 'EUR' ? '€' : c === 'GBP' ? '£' : '¥'}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            id="nav-wishlist-btn"
            onClick={() => {
              setActivePortalTab('wishlist');
              setAccountPortalOpen(true);
            }}
            className="relative p-2 text-neutral-300 hover:text-amber-300 transition-colors rounded-full hover:bg-white/5"
            title="Saved Sanctuaries"
          >
            <Heart className="w-4 h-4" />
            {wishlistIds.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-500 text-black text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                {wishlistIds.length}
              </span>
            )}
          </button>

          {/* My Trips Button */}
          <button
            id="nav-my-trips-btn"
            onClick={() => {
              setActivePortalTab('itineraries');
              setAccountPortalOpen(true);
            }}
            className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-full border border-white/10 bg-neutral-900/60 hover:border-amber-400/40 text-neutral-200 hover:text-amber-300 transition-all text-xs"
            title="My Itineraries"
          >
            <Briefcase className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline font-light tracking-wider uppercase">My Trips</span>
            {upcomingBookingsCount > 0 && (
              <span className="w-4 h-4 bg-amber-400 text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {upcomingBookingsCount}
              </span>
            )}
          </button>

          {/* Member Profile Avatar */}
          <button
            id="nav-profile-btn"
            onClick={() => {
              setActivePortalTab('preferences');
              setAccountPortalOpen(true);
            }}
            className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-amber-500/30 bg-gradient-to-r from-neutral-900 to-neutral-800 hover:border-amber-400 text-left transition-all"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden border border-amber-400/50">
              <img 
                src={userProfile.avatarUrl} 
                alt={userProfile.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-[11px] leading-tight">
              <span className="text-white font-medium block truncate max-w-[80px]">Lord Harrison</span>
              <span className="text-[9px] text-amber-400 font-serif">Black Elite</span>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/95 border-b border-amber-500/20 px-6 py-6 space-y-4 backdrop-blur-xl animate-fadeIn">
          <nav className="flex flex-col gap-4 text-sm font-light tracking-widest uppercase text-neutral-300">
            <button 
              onClick={() => scrollToSection('sanctuaries-section')}
              className="text-left py-2 hover:text-amber-300 border-b border-white/5"
            >
              Sanctuaries
            </button>
            <button 
              onClick={() => scrollToSection('curated-experiences-section')}
              className="text-left py-2 hover:text-amber-300 border-b border-white/5"
            >
              Curated Journeys
            </button>
            <button 
              onClick={() => scrollToSection('destinations-section')}
              className="text-left py-2 hover:text-amber-300 border-b border-white/5"
            >
              Destinations
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                setActivePortalTab('membership');
                setAccountPortalOpen(true);
              }}
              className="text-left py-2 text-amber-300 flex items-center justify-between border-b border-white/5"
            >
              <span>AURA Privé Club</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300">
                34,250 Pts
              </span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setAiConciergeOpen(true);
              }}
              className="text-left py-2 text-amber-400 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Ask AI Luxury Concierge</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
