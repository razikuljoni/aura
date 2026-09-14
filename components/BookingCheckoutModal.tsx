'use client';

import React, { useState } from 'react';
import { useBooking } from '@/lib/booking-store';
import { BOOKING_ADDONS } from '@/lib/data';
import { BookingAddon, Booking } from '@/lib/types';
import { generateId, generateRefCode } from '@/lib/utils';
import confetti from 'canvas-confetti';
import { 
  X, 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  CreditCard, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Car, 
  Wine, 
  Plane, 
  Utensils, 
  Calendar, 
  Users, 
  Building, 
  Gift, 
  FileText, 
  Smartphone,
  CheckCircle2,
  Zap,
  Info
} from 'lucide-react';

export const BookingCheckoutModal = () => {
  const { 
    bookingModalOpen, 
    setBookingModalOpen, 
    activeBookingProperty, 
    activeBookingRoom,
    activeBookingExperience,
    searchState,
    formatPrice,
    calculateDynamicPrice,
    addBooking,
    userProfile,
    setAccountPortalOpen,
    setActivePortalTab
  } = useBooking();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedAddons, setSelectedAddons] = useState<BookingAddon[]>([]);
  
  // Guest inputs
  const [guestName, setGuestName] = useState(userProfile.name);
  const [guestEmail, setGuestEmail] = useState(userProfile.email);
  const [guestPhone, setGuestPhone] = useState(userProfile.phone);
  const [flightNumber, setFlightNumber] = useState('BA 2490');
  const [specialRequests, setSpecialRequests] = useState('High floor preferred, vintage champagne chilled on arrival.');

  // Payment inputs
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'wire'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 9842');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardHolder, setCardHolder] = useState(userProfile.name);

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  // Final confirmation state
  const [createdBookingReference, setCreatedBookingReference] = useState('');

  if (!bookingModalOpen || !activeBookingProperty) return null;

  const property = activeBookingProperty;
  const room = activeBookingRoom || property.rooms[0];
  const isExp = !!activeBookingExperience;

  // Calculate pricing
  const baseRate = isExp ? activeBookingExperience.priceTotal : room.pricePerNight;
  const stayPricing = isExp 
    ? {
        nightlyRate: activeBookingExperience.priceTotal,
        totalNights: activeBookingExperience.durationDays,
        subtotal: activeBookingExperience.priceTotal,
        resortFee: 0,
        serviceFee: 0,
        taxes: Math.round(activeBookingExperience.priceTotal * 0.08),
        estimatedTotal: activeBookingExperience.priceTotal + Math.round(activeBookingExperience.priceTotal * 0.08),
        isHighDemand: false,
        surgeMultiplier: 1
      }
    : calculateDynamicPrice(
        room.pricePerNight,
        searchState.checkIn,
        searchState.checkOut,
        searchState.adults + searchState.children,
        property.surgeStatus === 'high_demand'
      );

  const addonsTotal = selectedAddons.reduce((acc, a) => acc + a.price, 0);
  const finalSubtotal = stayPricing.subtotal + addonsTotal;
  const finalDiscount = promoApplied ? promoDiscount : 0;
  const grandTotal = Math.max(0, finalSubtotal + stayPricing.resortFee + stayPricing.taxes - finalDiscount);

  const toggleAddon = (addon: BookingAddon) => {
    setSelectedAddons(prev => 
      prev.some(a => a.id === addon.id) 
        ? prev.filter(a => a.id !== addon.id) 
        : [...prev, addon]
    );
  };

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'LUXURY2026' || code === 'ELITEBLACK') {
      const disc = Math.round(finalSubtotal * 0.10); // 10% luxury discount
      setPromoDiscount(disc);
      setPromoApplied(true);
    } else if (code === 'VILLASUITE') {
      setPromoDiscount(500);
      setPromoApplied(true);
    } else {
      setPromoError('Invalid promotion code. Try "LUXURY2026" or "ELITEBLACK"');
    }
  };

  const handleCompleteBooking = () => {
    const refCode = generateRefCode();
    setCreatedBookingReference(refCode);

    const newBooking: Booking = {
      id: generateId('bk'),
      bookingReference: refCode,
      propertyId: property.id,
      propertyName: property.name,
      propertyImage: property.heroImage,
      destination: property.destination,
      roomName: isExp ? activeBookingExperience.title : room.name,
      checkIn: searchState.checkIn,
      checkOut: searchState.checkOut,
      nights: stayPricing.totalNights,
      guests: {
        adults: searchState.adults,
        children: searchState.children
      },
      primaryGuest: {
        fullName: guestName,
        email: guestEmail,
        phone: guestPhone,
        specialRequests: specialRequests,
        flightArrival: flightNumber
      },
      selectedAddons: selectedAddons,
      pricing: {
        roomSubtotal: stayPricing.subtotal,
        addonsSubtotal: addonsTotal,
        resortFee: stayPricing.resortFee,
        serviceFee: stayPricing.serviceFee,
        taxes: stayPricing.taxes,
        discountAmount: finalDiscount,
        promoCodeApplied: promoApplied ? promoCode : undefined,
        total: grandTotal,
        currency: 'USD'
      },
      status: 'confirmed',
      createdAt: new Date().toISOString().split('T')[0],
      digitalKeyGenerated: true
    };

    addBooking(newBooking);
    setCurrentStep(4);

    // Blast celebratory luxury gold confetti
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#d97706', '#ffffff']
      });
    } catch (e) {
      console.error(e);
    }
  };

  const getAddonIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-4 h-4 text-amber-400" />;
      case 'Wine': return <Wine className="w-4 h-4 text-amber-400" />;
      case 'Plane': return <Plane className="w-4 h-4 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Utensils': return <Utensils className="w-4 h-4 text-amber-400" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-neutral-950 border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl shadow-black text-white max-h-[92vh] flex flex-col">
        
        {/* Header with Step Indicator */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/80 backdrop-blur-md shrink-0">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-amber-300 block">
              Bespoke Booking Gateway
            </span>
            <span className="font-serif text-sm sm:text-base text-white font-medium truncate max-w-md block">
              {isExp ? activeBookingExperience.title : property.name}
            </span>
          </div>

          {currentStep < 4 && (
            <>
              <div className="hidden sm:flex items-center gap-3">
                {[
                  { num: 1, label: 'Customization' },
                  { num: 2, label: 'Guest Details' },
                  { num: 3, label: 'Payment' }
                ].map((step) => (
                  <div key={step.num} className="flex items-center gap-1.5 text-xs font-mono">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      currentStep === step.num 
                        ? 'bg-amber-400 text-neutral-950' 
                        : currentStep > step.num 
                          ? 'bg-emerald-500 text-black' 
                          : 'bg-neutral-800 text-neutral-400'
                    }`}>
                      {currentStep > step.num ? '✓' : step.num}
                    </span>
                    <span className={currentStep === step.num ? 'text-white' : 'text-neutral-500'}>
                      {step.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="sm:hidden text-xs font-mono text-amber-300 font-semibold">
                Step {currentStep}/3
              </div>
            </>
          )}

          <button
            onClick={() => setBookingModalOpen(false)}
            className="p-2 rounded-full border border-white/10 hover:border-white/30 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Step Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
          
          {/* STEP 1: Customize Stay & Add-ons */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Selected Suite Recap Card */}
              <div className="p-4 rounded-2xl bg-neutral-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img 
                    src={room.image || property.heroImage} 
                    alt={room.name} 
                    className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0"
                  />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-amber-300 block">
                      {isExp ? 'Curated Experience' : 'Selected Suite'}
                    </span>
                    <h3 className="font-serif text-lg text-white font-medium">
                      {isExp ? activeBookingExperience.title : room.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-neutral-400 mt-1 font-mono">
                      <span>{searchState.checkIn} → {searchState.checkOut} ({stayPricing.totalNights} Nights)</span>
                      <span>•</span>
                      <span>{searchState.adults + searchState.children} Guests</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-neutral-400 block font-mono">Suite Subtotal</span>
                  <span className="font-mono text-xl font-bold text-amber-300">
                    {formatPrice(stayPricing.subtotal)}
                  </span>
                </div>
              </div>

              {/* Bespoke Add-on Enhancements */}
              <div>
                <h4 className="font-serif text-lg text-white mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  Elevate Your Stay with Bespoke Enhancements
                </h4>
                <p className="text-xs text-neutral-400 mb-4">
                  Select curated white-glove services prepared personally by your dedicated property butler.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BOOKING_ADDONS.map((addon) => {
                    const isSelected = selectedAddons.some(a => a.id === addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddon(addon)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'border-amber-400 bg-neutral-900 shadow-md'
                            : 'border-white/10 bg-neutral-950 hover:border-amber-500/30'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 flex items-center justify-center shrink-0">
                            {getAddonIcon(addon.icon)}
                          </div>
                          <div>
                            <span className="block text-xs font-semibold text-white">
                              {addon.name}
                            </span>
                            <span className="block text-[11px] text-neutral-400 font-light mt-0.5 leading-tight">
                              {addon.description}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="block font-mono text-xs font-bold text-amber-300">
                            +{formatPrice(addon.price)}
                          </span>
                          <span className={`inline-block mt-1 w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                            isSelected ? 'bg-amber-400 border-amber-400 text-black font-bold' : 'border-neutral-700'
                          }`}>
                            {isSelected && '✓'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Price Summary Banner */}
              <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-400 font-mono">Current Selection Estimate:</span>
                  <span className="font-mono text-lg font-bold text-amber-300 ml-2">
                    {formatPrice(finalSubtotal + stayPricing.resortFee + stayPricing.taxes)}
                  </span>
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Continue to Guest Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          )}

          {/* STEP 2: Guest Details */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h3 className="font-serif text-xl text-white mb-1">
                  Primary Guest Credentials
                </h3>
                <p className="text-xs text-neutral-400">
                  Your reservation will be held in our discreet VIP registry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Full Legal / Passport Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">VIP Contact Email</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Phone Number (with country code)</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-1">Flight Arrival Number / Private Tail (Optional)</label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. LH 450 or N842LX"
                    className="w-full bg-neutral-900 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1">
                  Special Butler Requests & Dietary Preferences
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Tell our concierge about pillow preferences, anniversary surprises, or dietary restrictions..."
                  className="w-full bg-neutral-900 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="px-6 py-2.5 rounded-xl bg-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider hover:bg-amber-300 transition-colors flex items-center gap-1.5"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Gateway */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Left: Payment Method & Card (Cols 7) */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono uppercase text-emerald-400">
                      256-Bit Encrypted Luxury Vault
                    </span>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors ${
                        paymentMethod === 'card' 
                          ? 'border-amber-400 bg-amber-500/10 text-amber-300' 
                          : 'border-white/10 bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Credit Card</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('apple_pay')}
                      className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors ${
                        paymentMethod === 'apple_pay' 
                          ? 'border-amber-400 bg-amber-500/10 text-amber-300' 
                          : 'border-white/10 bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      <Smartphone className="w-4 h-4" />
                      <span>Apple Pay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('wire')}
                      className={`p-3 rounded-xl border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors ${
                        paymentMethod === 'wire' 
                          ? 'border-amber-400 bg-amber-500/10 text-amber-300' 
                          : 'border-white/10 bg-neutral-900 text-neutral-400'
                      }`}
                    >
                      <Building className="w-4 h-4" />
                      <span>Concierge Wire</span>
                    </button>
                  </div>

                  {/* 3D Visual Card Preview */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-3">
                      <div className="h-44 rounded-2xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-amber-950/80 p-5 border border-amber-500/40 shadow-xl flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute right-4 top-4 w-12 h-8 rounded-md bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-[10px] font-mono font-bold text-amber-300">
                          AURA VIP
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-6 rounded bg-amber-400/30 border border-amber-400/50" />
                          <span className="text-[10px] font-mono text-neutral-400">Encrypted Chip</span>
                        </div>
                        <div className="font-mono text-lg text-white tracking-[0.2em]">
                          {cardNumber}
                        </div>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <div>
                            <span className="block text-[9px] text-neutral-400 uppercase">Cardholder</span>
                            <span className="text-white uppercase">{cardHolder}</span>
                          </div>
                          <div>
                            <span className="block text-[9px] text-neutral-400 uppercase">Expires</span>
                            <span className="text-white">{cardExpiry}</span>
                          </div>
                        </div>
                      </div>

                      {/* Card Inputs */}
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="block text-[11px] text-neutral-400 mb-1">Card Number</label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[11px] text-neutral-400 mb-1">Expiry (MM/YY)</label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                            />
                          </div>
                          <div>
                            <label className="block text-[11px] text-neutral-400 mb-1">CVC / Security Code</label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardCvc}
                              onChange={(e) => setCardCvc(e.target.value)}
                              className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'apple_pay' && (
                    <div className="p-8 rounded-2xl bg-neutral-900 border border-white/10 text-center space-y-3">
                      <Smartphone className="w-10 h-10 text-amber-400 mx-auto" />
                      <h4 className="font-serif text-lg text-white">Apple Pay Ready</h4>
                      <p className="text-xs text-neutral-400">
                        Authorize instantly with FaceID / TouchID for seamless luxury checkout.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'wire' && (
                    <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10 space-y-2 text-xs text-neutral-300">
                      <span className="text-amber-300 font-semibold block font-serif">Private Bank Wire Instructions</span>
                      <p>
                        A dedicated private banking coordinator will contact you directly within 15 minutes to arrange discreet SWIFT / IBAN settlement.
                      </p>
                      <div className="p-2.5 rounded-lg bg-neutral-950 font-mono text-[11px] text-neutral-400">
                        AURA Escrow Trust LLC • J.P. Morgan Private Bank Zurich
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Transparent Price Breakdown (Cols 5) */}
                <div className="lg:col-span-5 p-5 rounded-2xl bg-neutral-900 border border-white/10 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-serif text-base text-white mb-3">
                      Transparent Price Breakdown
                    </h4>

                    <div className="space-y-2 text-xs text-neutral-300 pb-3 border-b border-white/10 font-mono">
                      <div className="flex justify-between">
                        <span>Stay Subtotal ({stayPricing.totalNights}N)</span>
                        <span>{formatPrice(stayPricing.subtotal)}</span>
                      </div>
                      {addonsTotal > 0 && (
                        <div className="flex justify-between text-amber-300">
                          <span>Bespoke Add-ons ({selectedAddons.length})</span>
                          <span>+{formatPrice(addonsTotal)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-neutral-400">
                        <span>Resort & Butler Fee</span>
                        <span>{formatPrice(stayPricing.resortFee)}</span>
                      </div>
                      <div className="flex justify-between text-neutral-400">
                        <span>Tourism Tax & Levies</span>
                        <span>{formatPrice(stayPricing.taxes)}</span>
                      </div>
                      {promoApplied && (
                        <div className="flex justify-between text-emerald-400 font-semibold">
                          <span>Promo Discount ({promoCode})</span>
                          <span>-{formatPrice(finalDiscount)}</span>
                        </div>
                      )}
                    </div>

                    {/* Promo Code Input */}
                    <form onSubmit={handleApplyPromo} className="pt-3">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Promo code (e.g. LUXURY2026)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 bg-neutral-950 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-mono uppercase focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="submit"
                          className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs text-neutral-200"
                        >
                          Apply
                        </button>
                      </div>
                      {promoApplied && (
                        <span className="text-[10px] text-emerald-400 block mt-1">✓ Promo applied successfully</span>
                      )}
                      {promoError && (
                        <span className="text-[10px] text-rose-400 block mt-1">{promoError}</span>
                      )}
                    </form>
                  </div>

                  <div>
                    <div className="flex items-baseline justify-between mb-4 pt-3 border-t border-white/10">
                      <span className="text-xs font-mono uppercase text-white font-semibold">Total Amount</span>
                      <span className="font-mono text-2xl font-bold text-amber-300">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>

                    <button
                      onClick={handleCompleteBooking}
                      id="confirm-payment-btn"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 font-semibold text-xs uppercase tracking-widest transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
                    >
                      <Lock className="w-3.5 h-3.5" />
                      <span>Confirm & Book Stay</span>
                    </button>
                  </div>

                </div>

              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-xs text-neutral-400 hover:text-white flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: Instant Confirmation & Digital Pass */}
          {currentStep === 4 && (
            <div className="text-center py-6 space-y-6 animate-fadeIn">
              
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-amber-300 tracking-widest block mb-1">
                  Reservation Confirmed • White-Glove Guarantee
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                  We Await Your Arrival, {guestName.split(' ')[0]}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto mt-2 font-light">
                  A formal confirmation voucher has been sent to <span className="text-amber-200 font-mono">{guestEmail}</span>. Your dedicated butler will reach out 48 hours prior to arrival.
                </p>
              </div>

              {/* Digital Boarding Pass Voucher */}
              <div className="max-w-md mx-auto p-6 rounded-3xl bg-neutral-900 border border-amber-500/40 shadow-2xl text-left space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="font-serif text-base font-bold text-white tracking-widest">AURA PASS</span>
                  <span className="font-mono text-xs text-amber-400 font-bold">{createdBookingReference}</span>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Sanctuary:</span>
                    <span className="text-white text-right">{property.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Suite Category:</span>
                    <span className="text-white text-right">{isExp ? activeBookingExperience.title : room.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Dates:</span>
                    <span className="text-amber-300">{searchState.checkIn} → {searchState.checkOut} ({stayPricing.totalNights}N)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Guests:</span>
                    <span className="text-white">{searchState.adults + searchState.children} Guests</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-white/10">
                    <span className="text-neutral-400">Total Settled:</span>
                    <span className="text-amber-300 font-bold text-sm">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                {/* Digital Key Simulated Barcode */}
                <div className="pt-2 text-center">
                  <div className="h-10 bg-white/10 rounded-lg flex items-center justify-center font-mono text-[10px] tracking-[0.4em] text-neutral-300">
                    ||| | |||| || ||| ||||| ||| ||||
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono block mt-1">DIGITAL NFC ROOM KEY ACTIVE</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    setBookingModalOpen(false);
                    setActivePortalTab('itineraries');
                    setAccountPortalOpen(true);
                  }}
                  id="view-in-trips-btn"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-400 text-neutral-950 font-semibold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors"
                >
                  Manage in My Trips Portal
                </button>
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 text-neutral-300 hover:text-white text-xs transition-colors"
                >
                  Return to Exploration
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
