'use client';

import React, { useState } from 'react';
import { useBooking } from '@/lib/booking-store';
import { RoomType } from '@/lib/types';
import { 
  X, 
  Sparkles, 
  Heart, 
  Star, 
  MapPin, 
  CheckCircle, 
  ShieldCheck, 
  Users, 
  BedDouble, 
  Maximize2, 
  Coffee, 
  Wifi, 
  ChevronRight, 
  ArrowRight,
  Flame,
  Clock,
  Calendar,
  Zap,
  PhoneCall
} from 'lucide-react';

export const PropertyDetailModal = () => {
  const { 
    selectedPropertyForDetail, 
    setSelectedPropertyForDetail, 
    formatPrice, 
    toggleWishlist, 
    isWishlisted,
    startBookingProperty,
    searchState,
    calculateDynamicPrice
  } = useBooking();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(0);

  if (!selectedPropertyForDetail) return null;

  const property = selectedPropertyForDetail;
  const allImages = [property.heroImage, ...property.galleryImages];
  const wish = isWishlisted(property.id);
  const activeRoom: RoomType = property.rooms[selectedRoomIndex] || property.rooms[0];

  const dynamicPricing = calculateDynamicPrice(
    activeRoom.pricePerNight,
    searchState.checkIn,
    searchState.checkOut,
    searchState.adults + searchState.children,
    property.surgeStatus === 'high_demand'
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      
      {/* Modal Card Box */}
      <div className="relative w-full max-w-5xl bg-neutral-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black text-white max-h-[92vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono">
              {property.propertyType}
            </span>
            <span className="text-xs text-neutral-400 flex items-center gap-1 font-mono">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              {property.destination}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(property.id)}
              className="p-2 rounded-full border border-white/10 hover:border-amber-400 text-neutral-300 hover:text-amber-300 transition-colors"
              title={wish ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4 h-4 ${wish ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>
            <button
              onClick={() => setSelectedPropertyForDetail(null)}
              className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Gallery Showcase */}
          <div>
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-white/10 mb-3 group">
              <img
                src={allImages[activeImageIndex]}
                alt={property.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-black/30" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <h1 className="font-serif text-2xl sm:text-4xl text-white font-normal drop-shadow-md">
                    {property.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1 max-w-xl drop-shadow">
                    {property.tagline}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-neutral-950/90 border border-amber-400/40 text-amber-300 text-sm font-mono font-bold shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{property.reviewScore.toFixed(2)}</span>
                  <span className="text-xs text-neutral-400 font-normal">({property.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Gallery Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border transition-all ${
                    activeImageIndex === idx ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-white/10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Key Specs & Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Col (2/3) Overview & Suites */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Description */}
              <div>
                <h3 className="font-serif text-xl text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Sanctuary Overview
                </h3>
                <p className="text-neutral-300 text-sm leading-relaxed font-light">
                  {property.description}
                </p>
              </div>

              {/* Highlights Checklist */}
              <div>
                <h3 className="font-serif text-lg text-white mb-3">White-Glove Highlights</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-900/60 border border-white/5 text-xs text-neutral-200">
                      <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Available Suites / Rooms Selector */}
              <div>
                <h3 className="font-serif text-xl text-white mb-4">
                  Select Your Suite Category
                </h3>
                
                <div className="space-y-4">
                  {property.rooms.map((room, idx) => {
                    const isSelected = selectedRoomIndex === idx;
                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoomIndex(idx)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-amber-400 bg-neutral-900 shadow-xl shadow-amber-500/10'
                            : 'border-white/10 bg-neutral-950 hover:border-amber-500/30'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-4">
                            <img
                              src={room.image}
                              alt={room.name}
                              className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-serif text-base text-white font-medium">
                                  {room.name}
                                </span>
                                {room.availableCount <= 1 && (
                                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                                    Last 1 Available
                                  </span>
                                )}
                              </div>

                              <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-1 font-mono">
                                <span className="flex items-center gap-1">
                                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" /> {room.sizeSqM} m² / {Math.round(room.sizeSqM * 10.76)} sq ft
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3.5 h-3.5 text-amber-400" /> Up to {room.maxGuests} Guests
                                </span>
                                <span className="flex items-center gap-1">
                                  <BedDouble className="w-3.5 h-3.5 text-amber-400" /> {room.bedType}
                                </span>
                              </div>

                              <p className="text-xs text-neutral-300 font-light mt-2 line-clamp-2">
                                {room.description}
                              </p>
                            </div>
                          </div>

                          <div className="text-right sm:shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 flex sm:flex-col items-center sm:items-end justify-between">
                            <span className="text-lg font-mono font-bold text-amber-300">
                              {formatPrice(room.pricePerNight)}
                              <span className="text-xs text-neutral-400 font-normal"> / night</span>
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startBookingProperty(property, room);
                              }}
                              className="px-4 py-1.5 rounded-lg bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors"
                            >
                              Book Suite
                            </button>
                          </div>
                        </div>

                        {/* Room Amenities Pills */}
                        <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/5">
                          {room.amenities.map((amenity, aIdx) => (
                            <span key={aIdx} className="px-2 py-0.5 rounded bg-neutral-950 text-[10px] text-neutral-300 border border-white/5">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Rating Breakdown */}
              <div className="p-6 rounded-2xl bg-neutral-900/70 border border-white/10">
                <h4 className="font-serif text-lg text-white mb-4">Guest Satisfaction Audit</h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  {Object.entries(property.subRatings).map(([key, score]) => (
                    <div key={key} className="text-center p-2 rounded-xl bg-neutral-950 border border-white/5">
                      <span className="block text-sm font-mono font-bold text-amber-300">{score.toFixed(1)}</span>
                      <span className="block text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">
                        {key}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Guest Reviews List */}
              <div>
                <h4 className="font-serif text-lg text-white mb-4">Verified Guest Testimonials</h4>
                <div className="space-y-4">
                  {property.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={rev.avatar} alt={rev.author} className="w-8 h-8 rounded-full object-cover border border-amber-400/40" />
                          <div>
                            <span className="block text-xs font-semibold text-white">{rev.author}</span>
                            <span className="block text-[10px] text-neutral-400">{rev.location} • {rev.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-amber-400">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-current" />
                          ))}
                        </div>
                      </div>
                      <h5 className="text-xs font-semibold text-neutral-200">{rev.title}</h5>
                      <p className="text-xs text-neutral-300 font-light leading-relaxed">&ldquo;{rev.comment}&rdquo;</p>
                      <span className="inline-block text-[10px] text-amber-300/80 font-mono">
                        Stayed in {rev.stayedRoom} • Verified Stay
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Col (1/3) Sticky Booking Summary Box */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-neutral-900 border border-amber-500/30 sticky top-4 shadow-2xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-300/80 block mb-1">
                  Direct Reservation
                </span>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="font-mono text-3xl font-bold text-white">
                    {formatPrice(dynamicPricing.nightlyRate)}
                  </span>
                  <span className="text-xs text-neutral-400">/ night</span>
                </div>

                {/* Stay Summary */}
                <div className="space-y-2.5 p-3.5 rounded-xl bg-neutral-950 border border-white/10 text-xs mb-6 font-mono">
                  <div className="flex justify-between text-neutral-300">
                    <span>Check-in:</span>
                    <span className="text-white">{searchState.checkIn}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Check-out:</span>
                    <span className="text-white">{searchState.checkOut}</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Duration:</span>
                    <span className="text-amber-300 font-semibold">{dynamicPricing.totalNights} Nights</span>
                  </div>
                  <div className="flex justify-between text-neutral-300">
                    <span>Selected Suite:</span>
                    <span className="text-white truncate max-w-[120px]">{activeRoom.name}</span>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs text-neutral-400 border-b border-white/10 pb-4 mb-4">
                  <div className="flex justify-between">
                    <span>{formatPrice(dynamicPricing.nightlyRate)} × {dynamicPricing.totalNights} nights</span>
                    <span className="text-neutral-200 font-mono">{formatPrice(dynamicPricing.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resort & Butler Concierge Fee</span>
                    <span className="text-neutral-200 font-mono">{formatPrice(dynamicPricing.resortFee)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Local Taxes & Tourism Levies</span>
                    <span className="text-neutral-200 font-mono">{formatPrice(dynamicPricing.taxes)}</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-6">
                  <span className="text-xs font-semibold text-white uppercase tracking-wider">Estimated Total</span>
                  <span className="font-mono text-2xl font-bold text-amber-300">
                    {formatPrice(dynamicPricing.estimatedTotal)}
                  </span>
                </div>

                <button
                  onClick={() => startBookingProperty(property, activeRoom)}
                  id="modal-direct-reserve-btn"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-semibold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 mb-3"
                >
                  <span>Proceed to Secure Booking</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center space-y-1 text-[11px] text-neutral-400">
                  <span className="flex items-center justify-center gap-1 text-emerald-400 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" /> Free cancelation up to 7 days prior
                  </span>
                  <span>Instant confirmation with encrypted security</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
