'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Property, CuratedExperience, Booking, SearchFilterState, UserProfile, BookingAddon, RoomType } from './types';
import { PROPERTIES, CURATED_EXPERIENCES, DEFAULT_USER_PROFILE, INITIAL_BOOKINGS } from './data';

export type CurrencyType = 'USD' | 'EUR' | 'GBP' | 'JPY';

const CURRENCY_RATES: Record<CurrencyType, { symbol: string; rate: number; prefix: boolean }> = {
  USD: { symbol: '$', rate: 1.0, prefix: true },
  EUR: { symbol: '€', rate: 0.92, prefix: false },
  GBP: { symbol: '£', rate: 0.78, prefix: true },
  JPY: { symbol: '¥', rate: 155.0, prefix: true },
};

interface BookingContextType {
  // Properties & Experiences
  properties: Property[];
  experiences: CuratedExperience[];
  
  // Search & Filter state
  searchState: SearchFilterState;
  setSearchState: React.Dispatch<React.SetStateAction<SearchFilterState>>;
  updateSearchField: <K extends keyof SearchFilterState>(key: K, value: SearchFilterState[K]) => void;
  filteredProperties: Property[];
  resetFilters: () => void;

  // Currency
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  formatPrice: (amountInUSD: number) => string;

  // Modals & UI States
  selectedPropertyForDetail: Property | null;
  setSelectedPropertyForDetail: (p: Property | null) => void;
  selectedExperienceForDetail: CuratedExperience | null;
  setSelectedExperienceForDetail: (e: CuratedExperience | null) => void;

  bookingModalOpen: boolean;
  setBookingModalOpen: (open: boolean) => void;
  activeBookingProperty: Property | null;
  activeBookingRoom: RoomType | null;
  activeBookingExperience: CuratedExperience | null;
  startBookingProperty: (property: Property, room?: RoomType) => void;
  startBookingExperience: (experience: CuratedExperience) => void;

  accountPortalOpen: boolean;
  setAccountPortalOpen: (open: boolean) => void;
  activePortalTab: 'itineraries' | 'wishlist' | 'membership' | 'preferences';
  setActivePortalTab: (tab: 'itineraries' | 'wishlist' | 'membership' | 'preferences') => void;

  aiConciergeOpen: boolean;
  setAiConciergeOpen: (open: boolean) => void;

  // Wishlist / Favorites
  wishlistIds: string[];
  toggleWishlist: (propertyId: string) => void;
  isWishlisted: (propertyId: string) => boolean;

  // User Profile & Bookings
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;

  // Dynamic Price Calculator
  calculateDynamicPrice: (
    basePrice: number,
    checkInDateStr: string,
    checkOutDateStr: string,
    guestCount: number,
    isSurge?: boolean
  ) => {
    nightlyRate: number;
    totalNights: number;
    subtotal: number;
    resortFee: number;
    serviceFee: number;
    taxes: number;
    estimatedTotal: number;
    isHighDemand: boolean;
    surgeMultiplier: number;
  };
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

const DEFAULT_SEARCH_STATE: SearchFilterState = {
  destination: '',
  checkIn: '2026-09-15',
  checkOut: '2026-09-20',
  adults: 2,
  children: 0,
  rooms: 1,
  minPrice: 1000,
  maxPrice: 6000,
  propertyTypes: [],
  amenities: [],
  sortBy: 'recommended',
};

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [properties] = useState<Property[]>(PROPERTIES);
  const [experiences] = useState<CuratedExperience[]>(CURATED_EXPERIENCES);
  const [searchState, setSearchState] = useState<SearchFilterState>(DEFAULT_SEARCH_STATE);
  const [currency, setCurrency] = useState<CurrencyType>('USD');

  // Modals
  const [selectedPropertyForDetail, setSelectedPropertyForDetail] = useState<Property | null>(null);
  const [selectedExperienceForDetail, setSelectedExperienceForDetail] = useState<CuratedExperience | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState<boolean>(false);
  const [activeBookingProperty, setActiveBookingProperty] = useState<Property | null>(null);
  const [activeBookingRoom, setActiveBookingRoom] = useState<RoomType | null>(null);
  const [activeBookingExperience, setActiveBookingExperience] = useState<CuratedExperience | null>(null);

  const [accountPortalOpen, setAccountPortalOpen] = useState<boolean>(false);
  const [activePortalTab, setActivePortalTab] = useState<'itineraries' | 'wishlist' | 'membership' | 'preferences'>('itineraries');
  const [aiConciergeOpen, setAiConciergeOpen] = useState<boolean>(false);

  // Wishlist
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('aura_wishlist');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return ['villa-bellevue-amalfi', 'resort-soneva-maldives'];
  });

  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);

  const [bookings, setBookings] = useState<Booking[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('aura_bookings');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_BOOKINGS;
  });

  const toggleWishlist = (propertyId: string) => {
    setWishlistIds(prev => {
      const next = prev.includes(propertyId) ? prev.filter(id => id !== propertyId) : [...prev, propertyId];
      try {
        localStorage.setItem('aura_wishlist', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  const isWishlisted = (propertyId: string) => wishlistIds.includes(propertyId);

  const addBooking = (newBooking: Booking) => {
    setBookings(prev => {
      const updated = [newBooking, ...prev];
      try {
        localStorage.setItem('aura_bookings', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    // Update user profile points
    setUserProfile(prev => ({
      ...prev,
      tierPoints: prev.tierPoints + Math.round(newBooking.pricing.total * 1.5)
    }));
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => {
      const updated = prev.map(b => b.id === bookingId ? { ...b, status: 'cancelled' as const } : b);
      try {
        localStorage.setItem('aura_bookings', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const updateSearchField = <K extends keyof SearchFilterState>(key: K, value: SearchFilterState[K]) => {
    setSearchState(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setSearchState(prev => ({
      ...DEFAULT_SEARCH_STATE,
      destination: prev.destination,
      checkIn: prev.checkIn,
      checkOut: prev.checkOut,
    }));
  };

  const formatPrice = (amountInUSD: number) => {
    const config = CURRENCY_RATES[currency] || CURRENCY_RATES.USD;
    const converted = Math.round(amountInUSD * config.rate);
    const formatted = new Intl.NumberFormat('en-US').format(converted);
    return config.prefix ? `${config.symbol}${formatted}` : `${formatted} ${config.symbol}`;
  };

  const startBookingProperty = (property: Property, room?: RoomType) => {
    setActiveBookingProperty(property);
    setActiveBookingRoom(room || property.rooms[0] || null);
    setActiveBookingExperience(null);
    setBookingModalOpen(true);
  };

  const startBookingExperience = (experience: CuratedExperience) => {
    const relatedProperty = properties.find(p => p.id === experience.propertyId) || properties[0];
    setActiveBookingProperty(relatedProperty);
    setActiveBookingRoom(relatedProperty.rooms[0]);
    setActiveBookingExperience(experience);
    setBookingModalOpen(true);
  };

  // Dynamic price calculation
  const calculateDynamicPrice = (
    basePrice: number,
    checkInDateStr: string,
    checkOutDateStr: string,
    guestCount: number,
    isSurge?: boolean
  ) => {
    const start = new Date(checkInDateStr);
    const end = new Date(checkOutDateStr);
    const diffTime = Math.max(end.getTime() - start.getTime(), 86400000);
    const totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

    // Surge multiplier based on weekend & high season
    let surgeMultiplier = 1.0;
    const startDay = start.getDay();
    if (startDay === 5 || startDay === 6 || isSurge) {
      surgeMultiplier += 0.12; // 12% weekend/demand adjustment
    }
    if (guestCount > 2) {
      surgeMultiplier += (guestCount - 2) * 0.05;
    }

    const nightlyRate = Math.round(basePrice * surgeMultiplier);
    const subtotal = nightlyRate * totalNights;
    const resortFee = Math.round(75 * totalNights);
    const serviceFee = Math.round(subtotal * 0.06);
    const taxes = Math.round(subtotal * 0.10);
    const estimatedTotal = subtotal + resortFee + serviceFee + taxes;

    return {
      nightlyRate,
      totalNights,
      subtotal,
      resortFee,
      serviceFee,
      taxes,
      estimatedTotal,
      isHighDemand: surgeMultiplier > 1.05,
      surgeMultiplier
    };
  };

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // Destination matching
      if (searchState.destination) {
        const destQuery = searchState.destination.toLowerCase();
        const matchesDest =
          prop.destination.toLowerCase().includes(destQuery) ||
          prop.country.toLowerCase().includes(destQuery) ||
          prop.name.toLowerCase().includes(destQuery) ||
          prop.region.toLowerCase().includes(destQuery);
        if (!matchesDest) return false;
      }

      // Guest capacity matching
      const totalGuests = searchState.adults + searchState.children;
      const maxRoomCapacity = Math.max(...prop.rooms.map(r => r.maxGuests), 2);
      if (totalGuests > maxRoomCapacity * searchState.rooms) {
        return false;
      }

      // Price filter
      if (prop.basePricePerNight < searchState.minPrice || prop.basePricePerNight > searchState.maxPrice) {
        return false;
      }

      // Property type filter
      if (searchState.propertyTypes.length > 0 && !searchState.propertyTypes.includes(prop.propertyType)) {
        return false;
      }

      // Amenities filter
      if (searchState.amenities.length > 0) {
        const hasAll = searchState.amenities.every(amenity => prop.amenities.some(a => a.toLowerCase().includes(amenity.toLowerCase())));
        if (!hasAll) return false;
      }

      return true;
    }).sort((a, b) => {
      if (searchState.sortBy === 'price_low') return a.basePricePerNight - b.basePricePerNight;
      if (searchState.sortBy === 'price_high') return b.basePricePerNight - a.basePricePerNight;
      if (searchState.sortBy === 'rating') return b.reviewScore - a.reviewScore;
      // Recommended: featured first then reviewScore
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.reviewScore - a.reviewScore;
    });
  }, [properties, searchState]);

  return (
    <BookingContext.Provider
      value={{
        properties,
        experiences,
        searchState,
        setSearchState,
        updateSearchField,
        filteredProperties,
        resetFilters,
        currency,
        setCurrency: (c: CurrencyType) => {
          setCurrency(c);
          try {
            localStorage.setItem('aura_currency', c);
          } catch (e) {
            console.error(e);
          }
        },
        formatPrice,
        selectedPropertyForDetail,
        setSelectedPropertyForDetail,
        selectedExperienceForDetail,
        setSelectedExperienceForDetail,
        bookingModalOpen,
        setBookingModalOpen,
        activeBookingProperty,
        activeBookingRoom,
        activeBookingExperience,
        startBookingProperty,
        startBookingExperience,
        accountPortalOpen,
        setAccountPortalOpen,
        activePortalTab,
        setActivePortalTab,
        aiConciergeOpen,
        setAiConciergeOpen,
        wishlistIds,
        toggleWishlist,
        isWishlisted,
        userProfile,
        setUserProfile,
        bookings,
        addBooking,
        cancelBooking,
        calculateDynamicPrice
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
