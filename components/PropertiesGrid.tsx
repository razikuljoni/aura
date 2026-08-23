'use client';

import React, { useState } from 'react';
import { useBooking } from '@/lib/booking-store';
import { Property } from '@/lib/types';
import { 
  Sparkles, 
  Heart, 
  Star, 
  MapPin, 
  ShieldCheck, 
  SlidersHorizontal, 
  Grid, 
  List, 
  Map, 
  Check, 
  Eye, 
  ArrowRight,
  Flame,
  Sun,
  Snowflake,
  CloudSun,
  Zap,
  RotateCcw
} from 'lucide-react';

const PROPERTY_TYPES = [
  'All Sanctuaries',
  'Cliffside Sanctuary',
  'Overwater Resort',
  'Alpine Chalet',
  'Private Villa',
  'Safari Lodge'
];

const AMENITIES_FILTER_OPTIONS = [
  'Private Infinity Pool',
  '24/7 Dedicated Butler',
  'Michelin 3-Star Chef',
  'Helipad Access',
  'Ski-in / Ski-out Access',
  'Spa & Hammam',
  'Private Marina & Yacht'
];

export const PropertiesGrid = () => {
  const { 
    filteredProperties, 
    properties,
    searchState, 
    updateSearchField, 
    resetFilters,
    formatPrice, 
    toggleWishlist, 
    isWishlisted,
    setSelectedPropertyForDetail,
    startBookingProperty,
    calculateDynamicPrice
  } = useBooking();

  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  const handleNextImage = (propId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => ({
      ...prev,
      [propId]: ((prev[propId] || 0) + 1) % max
    }));
  };

  const handlePrevImage = (propId: string, max: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImageIndexes(prev => ({
      ...prev,
      [propId]: ((prev[propId] || 0) - 1 + max) % max
    }));
  };

  const handlePropertyTypeClick = (type: string) => {
    if (type === 'All Sanctuaries') {
      updateSearchField('propertyTypes', []);
    } else {
      updateSearchField('propertyTypes', [type]);
    }
  };

  const toggleAmenityFilter = (amenity: string) => {
    const current = searchState.amenities;
    const next = current.includes(amenity)
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    updateSearchField('amenities', next);
  };

  return (
    <section id="sanctuaries-section" className="py-24 bg-neutral-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            The Portfolio
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white mb-4">
            Private Sanctuaries & <span className="italic text-amber-200">Royal Villas</span>
          </h2>
          <p className="text-neutral-300 text-sm sm:text-base font-light">
            Independently audited five-star estates, secluded island reserves, and alpine palaces reserved exclusively for AURA guests.
          </p>
        </div>

        {/* Category Pills & Interactive Filter Bar */}
        <div className="space-y-4 mb-10">
          
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
            {/* Property Types Pill Nav */}
            <div className="flex flex-wrap items-center gap-2">
              {PROPERTY_TYPES.map((type) => {
                const isActive = (type === 'All Sanctuaries' && searchState.propertyTypes.length === 0) ||
                  searchState.propertyTypes.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => handlePropertyTypeClick(type)}
                    className={`px-4 py-2 rounded-full text-xs transition-all duration-300 font-light tracking-wider uppercase ${
                      isActive
                        ? 'bg-amber-400 text-neutral-950 font-semibold shadow-md shadow-amber-500/20'
                        : 'bg-neutral-950/80 border border-white/10 text-neutral-300 hover:border-amber-400/40 hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                );
              })}
            </div>

            {/* View Mode & Filter Trigger */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
                id="filter-drawer-toggle"
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs border transition-colors ${
                  searchState.amenities.length > 0 || searchState.minPrice > 1000 || searchState.maxPrice < 6000
                    ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                    : 'border-white/10 bg-neutral-950/80 text-neutral-300 hover:border-white/20'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Filters</span>
                {(searchState.amenities.length > 0) && (
                  <span className="w-4 h-4 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-bold flex items-center justify-center">
                    {searchState.amenities.length}
                  </span>
                )}
              </button>

              {/* View Switcher */}
              <div className="flex items-center p-1 rounded-xl bg-neutral-950 border border-white/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-neutral-800 text-amber-300' : 'text-neutral-400 hover:text-white'}`}
                  title="Grid View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-neutral-800 text-amber-300' : 'text-neutral-400 hover:text-white'}`}
                  title="Editorial List View"
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`p-1.5 rounded-lg transition-colors ${viewMode === 'map' ? 'bg-neutral-800 text-amber-300' : 'text-neutral-400 hover:text-white'}`}
                  title="Interactive Map View"
                >
                  <Map className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Expandable Filter Drawer */}
          {filterDrawerOpen && (
            <div className="p-6 rounded-2xl bg-neutral-950 border border-amber-500/30 space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-mono tracking-wider uppercase text-amber-300">
                  Refine Luxury Criteria
                </span>
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All</span>
                </button>
              </div>

              {/* Amenities checkboxes */}
              <div>
                <span className="block text-xs font-mono uppercase text-neutral-400 mb-3">
                  Signature Amenities
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                  {AMENITIES_FILTER_OPTIONS.map((amenity) => {
                    const selected = searchState.amenities.includes(amenity);
                    return (
                      <button
                        key={amenity}
                        onClick={() => toggleAmenityFilter(amenity)}
                        className={`p-2.5 rounded-xl border text-xs text-left flex items-center justify-between transition-colors ${
                          selected
                            ? 'border-amber-400 bg-amber-500/10 text-amber-200'
                            : 'border-white/10 bg-neutral-900/60 text-neutral-300 hover:border-white/20'
                        }`}
                      >
                        <span className="truncate">{amenity}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range & Sorting */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-neutral-400">Nightly Rate Range</span>
                    <span className="font-mono text-amber-300 font-medium">
                      {formatPrice(searchState.minPrice)} – {formatPrice(searchState.maxPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={6000}
                    step={250}
                    value={searchState.maxPrice}
                    onChange={(e) => updateSearchField('maxPrice', Number(e.target.value))}
                    className="w-full accent-amber-400 bg-neutral-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs text-neutral-400 mb-2">Sort Results By</label>
                  <select
                    value={searchState.sortBy}
                    onChange={(e) => updateSearchField('sortBy', e.target.value as any)}
                    className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="recommended">AURA Recommended (Featured & Top Reviews)</option>
                    <option value="rating">Highest Verified Rating (5.0 ★)</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Zero Results State */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-20 px-4 rounded-3xl bg-neutral-950 border border-white/10">
            <Sparkles className="w-10 h-10 text-amber-400/40 mx-auto mb-4" />
            <h3 className="font-serif text-2xl text-white mb-2">No Sanctuaries Match Your Exact Search</h3>
            <p className="text-neutral-400 text-sm max-w-md mx-auto mb-6">
              Please adjust your destination filter or price range to explore our full global portfolio.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-full bg-amber-400 text-neutral-950 font-semibold text-xs tracking-wider uppercase hover:bg-amber-300 transition-colors"
            >
              Show All Sanctuaries
            </button>
          </div>
        )}

        {/* Map View Simulation */}
        {viewMode === 'map' && filteredProperties.length > 0 && (
          <div className="mb-12 rounded-3xl overflow-hidden border border-amber-500/30 bg-neutral-950 p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-amber-300">
                  Global Luxury Sanctuary Radar
                </span>
              </div>
              <span className="text-xs text-neutral-400">Showing {filteredProperties.length} locations</span>
            </div>

            {/* Stylized Dark Luxury Map Canvas Simulation */}
            <div className="relative h-[420px] rounded-2xl bg-neutral-900/90 border border-white/10 overflow-hidden flex items-center justify-center p-6 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]">
              
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent" />
              
              {/* Plot Pins for properties */}
              <div className="relative w-full h-full">
                {filteredProperties.map((prop, idx) => {
                  // Coordinate positions normalized on mock map
                  const leftPos = `${15 + ((idx * 16) % 70)}%`;
                  const topPos = `${20 + ((idx * 22) % 60)}%`;
                  return (
                    <div 
                      key={prop.id}
                      style={{ left: leftPos, top: topPos }}
                      className="absolute group z-20"
                    >
                      <button
                        onClick={() => setSelectedPropertyForDetail(prop)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-950 border border-amber-400 text-amber-300 text-xs font-semibold shadow-xl hover:scale-110 hover:bg-amber-400 hover:text-neutral-950 transition-all font-mono"
                      >
                        <Star className="w-3 h-3 fill-current" />
                        <span>{formatPrice(prop.basePricePerNight)}</span>
                      </button>

                      {/* Tooltip on hover */}
                      <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 bg-neutral-950 border border-amber-500/40 rounded-xl p-2.5 shadow-2xl z-30 pointer-events-none">
                        <img src={prop.heroImage} alt={prop.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                        <span className="block text-xs font-semibold text-white truncate">{prop.name}</span>
                        <span className="block text-[10px] text-neutral-400">{prop.destination}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="absolute bottom-4 left-4 bg-neutral-950/80 px-3 py-1.5 rounded-lg border border-white/10 text-[11px] text-neutral-300 backdrop-blur-md">
                Click any rate marker to view detailed suite specifications.
              </div>
            </div>
          </div>
        )}

        {/* Properties Grid View */}
        {viewMode !== 'map' && (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
          }>
            {filteredProperties.map((property) => {
              const currentImgIdx = activeImageIndexes[property.id] || 0;
              const allImages = [property.heroImage, ...property.galleryImages];
              const wish = isWishlisted(property.id);

              const priceCalc = calculateDynamicPrice(
                property.basePricePerNight,
                searchState.checkIn,
                searchState.checkOut,
                searchState.adults + searchState.children,
                property.surgeStatus === 'high_demand'
              );

              return (
                <div
                  key={property.id}
                  id={`property-card-${property.id}`}
                  className={`rounded-3xl border border-white/10 bg-neutral-950 overflow-hidden hover:border-amber-500/50 transition-all duration-500 group shadow-xl hover:shadow-2xl hover:shadow-black/80 flex flex-col justify-between ${
                    viewMode === 'list' ? 'md:flex-row' : ''
                  }`}
                >
                  
                  {/* Top Image Container */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'md:w-2/5 min-h-[300px]' : 'h-72'}`}>
                    <img
                      src={allImages[currentImgIdx % allImages.length]}
                      alt={property.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Gradient shade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-black/30" />

                    {/* Image navigation dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                      {allImages.slice(0, 4).map((_, imgIdx) => (
                        <span
                          key={imgIdx}
                          className={`w-1.5 h-1.5 rounded-full transition-all ${
                            currentImgIdx % allImages.length === imgIdx
                              ? 'w-4 bg-amber-400'
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Left/Right image switcher buttons */}
                    <button
                      onClick={(e) => handlePrevImage(property.id, allImages.length, e)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                    >
                      ‹
                    </button>
                    <button
                      onClick={(e) => handleNextImage(property.id, allImages.length, e)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white hover:bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs"
                    >
                      ›
                    </button>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                      <span className="px-2.5 py-1 rounded-full bg-neutral-950/80 border border-white/20 text-neutral-200 text-[10px] font-mono backdrop-blur-md">
                        {property.propertyType}
                      </span>
                      {property.surgeStatus === 'high_demand' && (
                        <span className="px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[10px] font-mono backdrop-blur-md flex items-center gap-1">
                          <Flame className="w-3 h-3 fill-amber-400" /> Only 1 Suite Left
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(property.id);
                      }}
                      id={`wishlist-btn-${property.id}`}
                      className="absolute top-3 right-3 w-9 h-9 rounded-full bg-neutral-950/70 border border-white/15 hover:border-amber-400 backdrop-blur-md flex items-center justify-center text-white transition-transform active:scale-90 z-10"
                      title={wish ? "Remove from saved" : "Save to Wishlist"}
                    >
                      <Heart className={`w-4 h-4 transition-colors ${wish ? 'fill-amber-400 text-amber-400' : 'text-white'}`} />
                    </button>

                    {/* Live Weather Indicator */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-neutral-950/80 border border-white/10 text-neutral-300 text-[11px] backdrop-blur-md">
                      {property.weather.icon === 'Snowflake' ? (
                        <Snowflake className="w-3 h-3 text-cyan-400" />
                      ) : property.weather.icon === 'CloudSun' ? (
                        <CloudSun className="w-3 h-3 text-amber-400" />
                      ) : (
                        <Sun className="w-3 h-3 text-amber-400" />
                      )}
                      <span>{property.weather.tempC}°C</span>
                    </div>

                  </div>

                  {/* Property Details Container */}
                  <div className={`p-6 flex-1 flex flex-col justify-between ${viewMode === 'list' ? 'md:w-3/5' : ''}`}>
                    <div>
                      {/* Destination & Verified Score */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-amber-400" />
                          {property.destination}
                        </span>

                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{property.reviewScore.toFixed(2)}</span>
                          <span className="text-[10px] text-neutral-400 font-normal">({property.reviewCount})</span>
                        </div>
                      </div>

                      {/* Property Name */}
                      <h3 
                        onClick={() => setSelectedPropertyForDetail(property)}
                        className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug mb-2 hover:text-amber-200 cursor-pointer transition-colors"
                      >
                        {property.name}
                      </h3>

                      {/* Tagline */}
                      <p className="text-neutral-400 text-xs font-light line-clamp-2 leading-relaxed mb-4">
                        {property.tagline}
                      </p>

                      {/* Amenity Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {property.amenities.slice(0, 3).map((amenity, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded-md bg-neutral-900 border border-white/5 text-neutral-300 text-[10px]"
                          >
                            {amenity}
                          </span>
                        ))}
                        {property.amenities.length > 3 && (
                          <span className="px-2 py-1 rounded-md bg-neutral-900 text-neutral-500 text-[10px]">
                            +{property.amenities.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dynamic Pricing & Action CTAs */}
                    <div className="pt-4 border-t border-white/10 flex items-end justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-neutral-400 block">
                          From (Dynamic Rate)
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-mono text-xl sm:text-2xl font-bold text-amber-300">
                            {formatPrice(priceCalc.nightlyRate)}
                          </span>
                          <span className="text-xs text-neutral-400">/ night</span>
                        </div>
                        {property.originalPricePerNight && (
                          <span className="text-[10px] font-mono text-neutral-500 line-through block -mt-1">
                            {formatPrice(property.originalPricePerNight)} standard
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedPropertyForDetail(property)}
                          id={`prop-explore-${property.id}`}
                          className="p-2.5 rounded-xl border border-white/15 bg-neutral-900 hover:border-amber-400/50 text-neutral-200 hover:text-white transition-colors"
                          title="View Villa Details & 360 Gallery"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => startBookingProperty(property)}
                          id={`prop-reserve-${property.id}`}
                          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-neutral-950 text-xs font-semibold uppercase tracking-wider transition-all shadow-md shadow-amber-500/20 flex items-center gap-1.5"
                        >
                          <span>Reserve</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
