'use client';

import React, { useState } from 'react';
import { useBooking } from '@/lib/booking-store';
import { 
  Sparkles, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Award, 
  Check, 
  ArrowRight, 
  Globe 
} from 'lucide-react';

export const Footer = () => {
  const { currency, setCurrency, setAiConciergeOpen } = useBooking();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-amber-500/20 pt-16 pb-24 sm:pb-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Concierge Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-white/10">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-2xl tracking-[0.25em] font-light text-white">
                AURA
              </span>
              <span className="text-[10px] font-mono text-amber-300 border border-amber-400/40 px-2 py-0.5 rounded uppercase">
                Private Escapes
              </span>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed max-w-md">
              Receive private invitation releases for off-market cliffside villas, private island buyouts, and seasonal Michelin chef residencies.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your VIP email address..."
                  className="flex-1 bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                  required
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-neutral-950 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Join Guild
                </button>
              </div>
              {subscribed && (
                <span className="text-[11px] text-emerald-400 font-mono block mt-2">
                  ✓ Welcome to the AURA Privé Dispatch. Your invitation will arrive shortly.
                </span>
              )}
            </form>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row justify-between gap-6 bg-neutral-900/60 p-6 rounded-2xl border border-white/5">
            <div>
              <span className="text-xs font-mono uppercase text-amber-300 block mb-2">
                24/7 Global Private Concierge
              </span>
              <div className="space-y-1.5 text-xs text-neutral-300 font-mono">
                <p>Zurich: +41 44 220 8800</p>
                <p>London: +44 20 7946 0991</p>
                <p>New York: +1 212 555 0199</p>
                <p>Tokyo: +81 3 5555 0143</p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono uppercase text-amber-300 block mb-2">
                  Currency Selector
                </span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="bg-neutral-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-mono focus:outline-none focus:border-amber-400"
                >
                  <option value="USD">USD ($ United States)</option>
                  <option value="EUR">EUR (€ European Union)</option>
                  <option value="GBP">GBP (£ United Kingdom)</option>
                  <option value="CHF">CHF (Swiss Franc)</option>
                  <option value="JPY">JPY (¥ Japanese Yen)</option>
                  <option value="AED">AED (د.إ UAE Dirham)</option>
                </select>
              </div>

              <button
                onClick={() => setAiConciergeOpen(true)}
                className="mt-4 sm:mt-0 text-xs text-amber-300 hover:text-white font-mono flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Open AURA AI Concierge</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Accreditations */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-light">
          <div className="flex items-center gap-4">
            <span>© 2026 AURA Luxury Resorts & Bespoke Escapes Ltd.</span>
            <span>All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-mono">
            <span className="hover:text-neutral-300 cursor-pointer">Discreet Privacy Charter</span>
            <span className="hover:text-neutral-300 cursor-pointer">Butler Guild Standards</span>
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Bespoke Escapes</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
