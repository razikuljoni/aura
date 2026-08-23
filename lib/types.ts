export interface RoomType {
  id: string;
  name: string;
  sizeSqM: number;
  maxGuests: number;
  bedType: string;
  pricePerNight: number;
  originalPricePerNight?: number;
  availableCount: number;
  description: string;
  image: string;
  amenities: string[];
  features: string[];
}

export interface Review {
  id: string;
  author: string;
  avatar: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  stayedRoom: string;
  verified: boolean;
}

export interface Property {
  id: string;
  name: string;
  tagline: string;
  destination: string;
  country: string;
  region: string;
  address: string;
  propertyType: 'Private Villa' | 'Overwater Resort' | 'Historic Palace' | 'Alpine Chalet' | 'Cliffside Sanctuary' | 'Safari Lodge';
  starRating: number;
  reviewScore: number;
  reviewCount: number;
  basePricePerNight: number;
  originalPricePerNight?: number;
  currency: string;
  heroImage: string;
  galleryImages: string[];
  videoUrl?: string;
  description: string;
  highlights: string[];
  amenities: string[];
  features: {
    michelinDining?: boolean;
    butlerService?: boolean;
    helipad?: boolean;
    privatePool?: boolean;
    skiInOut?: boolean;
    spaWellness?: boolean;
    beachfront?: boolean;
    yachtAccess?: boolean;
  };
  subRatings: {
    cleanliness: number;
    location: number;
    service: number;
    gastronomy: number;
    privacy: number;
  };
  rooms: RoomType[];
  reviews: Review[];
  coordinates: { lat: number; lng: number };
  weather: { tempC: number; condition: string; icon: string };
  featured?: boolean;
  surgeStatus?: 'high_demand' | 'limited_availability' | 'best_value' | 'exclusive';
}

export interface CuratedExperience {
  id: string;
  title: string;
  tagline: string;
  destination: string;
  durationDays: number;
  priceTotal: number;
  originalPrice?: number;
  heroImage: string;
  galleryImages: string[];
  category: 'Yacht & Sea' | 'Cultural Heritage' | 'Alpine & Winter' | 'Wildlife & Safari' | 'Wellness & Zen';
  highlights: string[];
  dailyItinerary: {
    day: number;
    title: string;
    description: string;
    included: string[];
  }[];
  includedPerks: string[];
  propertyId: string;
}

export interface BookingAddon {
  id: string;
  name: string;
  description: string;
  price: number;
  priceType: 'per_stay' | 'per_night' | 'per_guest';
  icon: string;
}

export interface Booking {
  id: string;
  bookingReference: string;
  propertyId: string;
  propertyName: string;
  propertyImage: string;
  destination: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  guests: {
    adults: number;
    children: number;
  };
  primaryGuest: {
    fullName: string;
    email: string;
    phone: string;
    specialRequests?: string;
    flightArrival?: string;
  };
  selectedAddons: BookingAddon[];
  pricing: {
    roomSubtotal: number;
    addonsSubtotal: number;
    resortFee: number;
    serviceFee: number;
    taxes: number;
    discountAmount: number;
    promoCodeApplied?: string;
    total: number;
    currency: string;
  };
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  digitalKeyGenerated?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  memberTier: 'Aura Member' | 'Aura Gold Collection' | 'Aura Platinum' | 'Aura Black Elite';
  tierPoints: number;
  upgradesAvailable: number;
  avatarUrl: string;
  preferences: {
    pillowType: string;
    champagnePreference: string;
    dietaryRestrictions: string;
    preferredTransfer: string;
  };
}

export interface SearchFilterState {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  minPrice: number;
  maxPrice: number;
  propertyTypes: string[];
  amenities: string[];
  sortBy: 'recommended' | 'price_low' | 'price_high' | 'rating';
}
