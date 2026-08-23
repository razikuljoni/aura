'use client';

import React, { useState } from 'react';
import { useBooking } from '@/lib/booking-store';
import { 
  X, 
  Sparkles, 
  Briefcase, 
  Heart, 
  Star, 
  Award, 
  Settings, 
  Calendar, 
  MapPin, 
  Key, 
  MessageSquare, 
  Sun, 
  Plane, 
  CheckCircle, 
  Trash2, 
  ArrowRight, 
  ShieldCheck, 
  Wine, 
  BedDouble, 
  Car,
  UtensilsCrossed
} from 'lucide-react';

export const AccountPortalModal = () => {
  const { 
    accountPortalOpen, 
    setAccountPortalOpen, 
    activePortalTab, 
    setActivePortalTab,
    userProfile,
    setUserProfile,
    bookings,
    cancelBooking,
    properties,
    wishlistIds,
    toggleWishlist,
    formatPrice,
    startBookingProperty,
    setAiConciergeOpen
  } = useBooking();

  const [activeChatBookingId, setActiveChatBookingId] = useState<string | null>(null);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessagesList, setChatMessagesList] = useState<{ sender: 'guest' | 'butler'; text: string; time: string }[]>([
    { sender: 'butler', text: 'Good day Lord Harrison. I am Matteo, your Chief Butler for Villa Bella Vista. We have chilled the Dom Pérignon 2013 as requested. Would you like us to schedule your Riva yacht cruise for 10:00 AM on day two?', time: '10:14 AM' }
  ]);

  if (!accountPortalOpen) return null;

  const wishlistedProperties = properties.filter(p => wishlistIds.includes(p.id));

  const handleSendButlerMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const newMsg = { sender: 'guest' as const, text: chatMessage, time: 'Just now' };
    setChatMessagesList(prev => [...prev, newMsg]);
    setChatMessage('');

    setTimeout(() => {
      setChatMessagesList(prev => [
        ...prev,
        { sender: 'butler', text: 'Certainly, Lord Harrison. It will be our absolute pleasure to arrange that immediately for you.', time: 'Just now' }
      ]);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-neutral-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black text-white max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-amber-400/50">
              <img src={userProfile.avatarUrl} alt={userProfile.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-serif text-base text-white font-medium block">
                {userProfile.name}
              </span>
              <span className="text-[10px] text-amber-300 font-mono flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                {userProfile.memberTier} • {userProfile.tierPoints.toLocaleString()} Points
              </span>
            </div>
          </div>

          <button
            onClick={() => setAccountPortalOpen(false)}
            className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 pb-1 border-b border-white/10 bg-neutral-950 shrink-0 overflow-x-auto">
          {[
            { id: 'itineraries', label: 'My Stays & Itineraries', icon: <Briefcase className="w-4 h-4" /> },
            { id: 'wishlist', label: `Saved Sanctuaries (${wishlistIds.length})`, icon: <Heart className="w-4 h-4" /> },
            { id: 'membership', label: 'AURA Privé Club', icon: <Award className="w-4 h-4" /> },
            { id: 'preferences', label: 'VIP Preferences', icon: <Settings className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePortalTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-mono tracking-wider uppercase transition-colors whitespace-nowrap border-b-2 ${
                activePortalTab === tab.id
                  ? 'border-amber-400 text-amber-300 bg-neutral-900/60 font-semibold'
                  : 'border-transparent text-neutral-400 hover:text-white hover:bg-neutral-900/30'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          
          {/* TAB 1: ITINERARIES */}
          {activePortalTab === 'itineraries' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-white">Upcoming & Past Escapes</h3>
                <span className="text-xs text-neutral-400 font-mono">{bookings.length} Total Bookings</span>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-16 p-6 rounded-2xl bg-neutral-900/40 border border-white/5">
                  <Briefcase className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
                  <p className="text-sm text-neutral-300">No upcoming itineraries scheduled.</p>
                  <p className="text-xs text-neutral-500 mt-1">Explore our portfolio to reserve your next retreat.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map((booking) => (
                    <div 
                      key={booking.id}
                      className="p-6 rounded-3xl bg-neutral-900 border border-amber-500/30 space-y-6 shadow-xl"
                    >
                      {/* Top Booking Bar */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 text-[10px] font-mono font-bold uppercase">
                            ● {booking.status}
                          </span>
                          <span className="text-xs font-mono text-amber-300">
                            Ref: {booking.bookingReference}
                          </span>
                        </div>
                        <span className="text-xs text-neutral-400 font-mono">
                          Booked on {booking.createdAt}
                        </span>
                      </div>

                      {/* Property & Dates Banner */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        <div className="md:col-span-4 h-44 rounded-2xl overflow-hidden border border-white/10 relative">
                          <img src={booking.propertyImage} alt={booking.propertyName} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute bottom-3 left-3 text-xs font-mono text-white flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-amber-400" />
                            <span>{booking.destination}</span>
                          </div>
                        </div>

                        <div className="md:col-span-8 flex flex-col justify-between space-y-3">
                          <div>
                            <h4 className="font-serif text-2xl text-white font-normal">
                              {booking.propertyName}
                            </h4>
                            <span className="text-sm text-amber-200 font-serif block mt-0.5">
                              {booking.roomName}
                            </span>
                            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-300 mt-3 p-3 rounded-xl bg-neutral-950 border border-white/5">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                                {booking.checkIn} → {booking.checkOut} ({booking.nights} Nights)
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Key className="w-3.5 h-3.5 text-amber-400" />
                                Digital Key Ready
                              </span>
                            </div>
                          </div>

                          {/* Quick Interactive Actions */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/5">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setActiveChatBookingId(activeChatBookingId === booking.id ? null : booking.id)}
                                className="px-3.5 py-1.5 rounded-lg border border-amber-400/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 text-xs font-mono flex items-center gap-1.5 transition-colors"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>{activeChatBookingId === booking.id ? 'Close Butler Chat' : 'Chat with Property Butler'}</span>
                              </button>
                            </div>

                            <div className="flex items-center gap-3">
                              <span className="font-mono text-base font-bold text-white">
                                {formatPrice(booking.pricing.total)}
                              </span>
                              {booking.status === 'confirmed' && (
                                <button
                                  onClick={() => cancelBooking(booking.id)}
                                  className="text-xs text-rose-400 hover:text-rose-300 font-mono underline"
                                >
                                  Cancel Stay
                                </button>
                              )}
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Interactive Butler Chat Drawer Simulation */}
                      {activeChatBookingId === booking.id && (
                        <div className="p-4 rounded-2xl bg-neutral-950 border border-amber-500/30 space-y-3 animate-fadeIn">
                          <div className="flex items-center justify-between pb-2 border-b border-white/10">
                            <div className="flex items-center gap-2 text-xs font-mono text-amber-300">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                              <span>24/7 Dedicated Butler Guild Concierge</span>
                            </div>
                            <span className="text-[10px] text-neutral-400">Response time: ~2 mins</span>
                          </div>

                          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                            {chatMessagesList.map((msg, mIdx) => (
                              <div 
                                key={mIdx}
                                className={`flex flex-col ${msg.sender === 'guest' ? 'items-end' : 'items-start'}`}
                              >
                                <div className={`max-w-[80%] p-3 rounded-2xl text-xs ${
                                  msg.sender === 'guest' 
                                    ? 'bg-amber-400 text-neutral-950 font-medium rounded-br-none' 
                                    : 'bg-neutral-800 text-neutral-200 rounded-bl-none border border-white/10'
                                }`}>
                                  {msg.text}
                                </div>
                                <span className="text-[9px] text-neutral-500 mt-0.5">{msg.time}</span>
                              </div>
                            ))}
                          </div>

                          <form onSubmit={handleSendButlerMessage} className="flex gap-2 pt-2 border-t border-white/10">
                            <input
                              type="text"
                              value={chatMessage}
                              onChange={(e) => setChatMessage(e.target.value)}
                              placeholder="Ask for custom airport transfers, dining reservations, or room setup..."
                              className="flex-1 bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                            />
                            <button
                              type="submit"
                              className="px-4 py-2 rounded-xl bg-amber-400 text-neutral-950 text-xs font-semibold hover:bg-amber-300 transition-colors"
                            >
                              Send
                            </button>
                          </form>
                        </div>
                      )}

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activePortalTab === 'wishlist' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-white">Your Saved Sanctuaries</h3>
                <span className="text-xs text-neutral-400 font-mono">{wishlistedProperties.length} Properties</span>
              </div>

              {wishlistedProperties.length === 0 ? (
                <div className="text-center py-16 p-6 rounded-2xl bg-neutral-900/40 border border-white/5">
                  <Heart className="w-10 h-10 text-neutral-500 mx-auto mb-3" />
                  <p className="text-sm text-neutral-300">You haven&apos;t saved any sanctuaries yet.</p>
                  <p className="text-xs text-neutral-500 mt-1">Click the heart icon on any estate to store it here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {wishlistedProperties.map((prop) => (
                    <div
                      key={prop.id}
                      className="rounded-2xl bg-neutral-900 border border-white/10 overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative h-44">
                        <img src={prop.heroImage} alt={prop.name} className="w-full h-full object-cover" />
                        <button
                          onClick={() => toggleWishlist(prop.id)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-neutral-950/80 text-amber-400 hover:text-white"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded bg-neutral-950/80 text-[10px] text-white font-mono">
                          {prop.destination}
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <h4 className="font-serif text-lg text-white truncate">{prop.name}</h4>
                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                          <span className="font-mono text-sm font-bold text-amber-300">
                            {formatPrice(prop.basePricePerNight)} <span className="text-xs font-normal text-neutral-400">/ night</span>
                          </span>
                          <button
                            onClick={() => {
                              setAccountPortalOpen(false);
                              startBookingProperty(prop);
                            }}
                            className="px-4 py-1.5 rounded-lg bg-amber-400 text-neutral-950 text-xs font-semibold hover:bg-amber-300 transition-colors"
                          >
                            Reserve Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: MEMBERSHIP */}
          {activePortalTab === 'membership' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Membership Card */}
              <div className="h-56 rounded-3xl bg-gradient-to-r from-neutral-900 via-amber-950/40 to-neutral-900 border border-amber-400/50 p-6 shadow-2xl relative flex flex-col justify-between overflow-hidden">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-serif text-2xl font-light tracking-[0.2em] text-white">AURA PRIVÉ</span>
                    <span className="text-[10px] font-mono tracking-widest text-amber-300 block uppercase">Black Elite Tier</span>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-amber-400/60 bg-amber-500/20 flex items-center justify-center text-amber-300 font-serif font-bold text-xl">
                    A
                  </div>
                </div>

                <div className="flex items-end justify-between font-mono">
                  <div>
                    <span className="text-[10px] text-neutral-400 block uppercase">Member Identifier</span>
                    <span className="text-white tracking-widest">AUR-ELITE-8842</span>
                    <span className="text-xs text-amber-300 font-bold block mt-1">{userProfile.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-neutral-400 block uppercase">Reward Points</span>
                    <span className="text-xl font-bold text-amber-300">{userProfile.tierPoints.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Elite Tier Perks */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 space-y-1">
                  <span className="text-amber-300 font-mono text-sm font-bold">2 Vouchers Active</span>
                  <span className="block text-xs text-white font-medium">Complimentary Suite Upgrades</span>
                  <p className="text-[11px] text-neutral-400">Guaranteed next-tier suite upgrade upon check-in.</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 space-y-1">
                  <span className="text-amber-300 font-mono text-sm font-bold">Unlimited</span>
                  <span className="block text-xs text-white font-medium">Riva Yacht & Heli Concierge</span>
                  <p className="text-[11px] text-neutral-400">Direct booking privilege with zero broker markups.</p>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 space-y-1">
                  <span className="text-amber-300 font-mono text-sm font-bold">Priority Access</span>
                  <span className="block text-xs text-white font-medium">Private Jet Partner Credits</span>
                  <p className="text-[11px] text-neutral-400">$1,000 flight credit with NetJets & VistaJet.</p>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: PREFERENCES */}
          {activePortalTab === 'preferences' && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-serif text-xl text-white mb-1">VIP Hospitality Profile</h3>
                <p className="text-xs text-neutral-400">
                  Pre-configured hospitality settings synced with all AURA properties globally.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <BedDouble className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="block text-xs font-semibold text-white">Pillow Menu Preference</span>
                      <span className="block text-[11px] text-neutral-400">{userProfile.preferences.pillowType}</span>
                    </div>
                  </div>
                  <span className="text-xs text-amber-300 font-mono">Configured</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wine className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="block text-xs font-semibold text-white">Welcome Champagne on Ice</span>
                      <span className="block text-[11px] text-neutral-400">{userProfile.preferences.champagnePreference}</span>
                    </div>
                  </div>
                  <span className="text-xs text-amber-300 font-mono">Configured</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Car className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="block text-xs font-semibold text-white">Ground Chauffeur Preference</span>
                      <span className="block text-[11px] text-neutral-400">{userProfile.preferences.preferredTransfer}</span>
                    </div>
                  </div>
                  <span className="text-xs text-amber-300 font-mono">Configured</span>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UtensilsCrossed className="w-5 h-5 text-amber-400" />
                    <div>
                      <span className="block text-xs font-semibold text-white">Dietary & Nutrition</span>
                      <span className="block text-[11px] text-neutral-400">{userProfile.preferences.dietaryRestrictions}</span>
                    </div>
                  </div>
                  <span className="text-xs text-amber-300 font-mono">Configured</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
