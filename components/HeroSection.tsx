'use client';

import React, { useState, useEffect } from 'react';
import { useBooking } from '@/lib/booking-store';
import { 
  Sparkles, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ShieldCheck, 
  Award, 
  Clock, 
  ChevronRight, 
  MapPin,
  Plane
} from 'lucide-react';
import { SearchBar } from './SearchBar';

const HERO_SCENES = [
  {
    id: 'amalfi',
    title: 'Amalfi Coast, Italy',
    tagline: 'Perched cliffside suites and private Riva yacht harbors',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=2000&q=85',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-luxury-villa-with-a-pool-and-ocean-view-41484-large.mp4',
    badge: 'Mediterranean Sanctuary',
    temp: '24°C Sunny',
    rate: '$1,850'
  },
  {
    id: 'maldives',
    title: 'Baa Atoll, Maldives',
    tagline: 'Overwater starlight palaces with private lagoon slides',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=2000&q=85',
    video: 'https://assets.mixkit.co/videos/preview/mixkit-top-aerial-shot-of-seashore-with-clear-water-41527-large.mp4',
    badge: 'UNESCO Biosphere Reserve',
    temp: '29°C Azure Waters',
    rate: '$3,100'
  },
  {
    id: 'st-moritz',
    title: 'St. Moritz, Switzerland',
    tagline: 'Private ski-in chalets, glacier heli-drops & vintage cellars',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=2000&q=85',
    video: '',
    badge: 'Alpine Grand Chalet',
    temp: '-2°C Crisp Powder',
    rate: '$2,750'
  },
  {
    id: 'kyoto',
    title: 'Kyoto Arashiyama, Japan',
    tagline: 'Ancient cedar onsen pavilions & after-hours temple tranquility',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=85',
    video: '',
    badge: 'Imperial Zen Retreat',
    temp: '21°C Bamboo Breeze',
    rate: '$2,150'
  }
];

export const HeroSection = () => {
  const { setAiConciergeOpen, updateSearchField, formatPrice } = useBooking();
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  const activeScene = HERO_SCENES[activeSceneIndex];

  // Auto rotate background scenes every 12 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSceneIndex(prev => (prev + 1) % HERO_SCENES.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  const handleSceneSelect = (index: number) => {
    setActiveSceneIndex(index);
    updateSearchField('destination', HERO_SCENES[index].title);
  };

  return (
    <div className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-neutral-950">
      
      {/* Background Visual Layer */}
      <div className="absolute inset-0 z-0">
        {activeScene.video && isVideoPlaying ? (
          <video
            key={activeScene.video}
            autoPlay
            muted={isAudioMuted}
            loop
            playsInline
            className="w-full h-full object-cover scale-105 transition-transform duration-1000"
            poster={activeScene.image}
          >
            <source src={activeScene.video} type="video/mp4" />
          </video>
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center transition-all duration-1000 scale-105 filter brightness-90"
            style={{ backgroundImage: `url(${activeScene.image})` }}
          />
        )}

        {/* Sophisticated Luxury Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/70" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/40 to-neutral-950/90" />
        <div className="absolute inset-0 bg-neutral-950/30 backdrop-blur-[1px]" />
      </div>

      {/* Top Ambient Controls & Scene Badges */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between pt-4">
        {/* Active Destination Tag */}
        <div className="flex items-center gap-2 bg-neutral-900/80 border border-amber-500/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-light text-amber-200 shadow-lg">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span className="font-medium text-white">{activeScene.title}</span>
          <span className="text-neutral-400">|</span>
          <span className="text-amber-300/90">{activeScene.badge}</span>
        </div>

        {/* Video & Media Controls */}
        <div className="hidden sm:flex items-center gap-2 bg-neutral-900/60 border border-white/10 backdrop-blur-md px-2.5 py-1 rounded-full text-xs text-neutral-300">
          {activeScene.video && (
            <button
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              className="p-1 hover:text-amber-300 transition-colors flex items-center gap-1.5"
              title={isVideoPlaying ? "Pause Ambient Video" : "Play Ambient Video"}
            >
              {isVideoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[10px] tracking-wider uppercase font-mono">{isVideoPlaying ? 'Live Motion' : 'Paused'}</span>
            </button>
          )}
          <button
            onClick={() => setIsAudioMuted(!isAudioMuted)}
            className="p-1 hover:text-amber-300 transition-colors flex items-center gap-1.5 border-l border-white/10 pl-2"
            title={isAudioMuted ? "Enable Ambient Audio" : "Mute Ambient Audio"}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 text-neutral-400" /> : <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
            <span className="text-[10px] tracking-wider uppercase font-mono">{isAudioMuted ? 'Muted' : 'Sound On'}</span>
          </button>
        </div>
      </div>

      {/* Center Hero Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto text-center pt-8 pb-4">
        
        {/* Subtle Luxury Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 backdrop-blur-md mb-6 shadow-xl">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-light tracking-[0.25em] uppercase text-amber-200">
            Exclusive Summer 2026 Collection
          </span>
        </div>

        {/* Grand Headline */}
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-normal tracking-tight text-white max-w-5xl mx-auto leading-[1.1] mb-6 drop-shadow-2xl">
          Where Timeless Luxury Meets <span className="italic font-light text-amber-200">Untold Escapes</span>
        </h1>

        {/* Sub-headline */}
        <p className="text-sm sm:text-lg text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed mb-8 tracking-wide drop-shadow">
          Hand-curated cliffside villas, private island overwater reserves, and royal alpine chalets. Accompanied by dedicated 24-hour British Butler Guild attendants and private Riva charters.
        </p>

        {/* Destination Switcher Carousel Dots */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 max-w-xl mx-auto">
          {HERO_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => handleSceneSelect(idx)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all duration-300 flex items-center gap-1.5 ${
                activeSceneIndex === idx
                  ? 'bg-amber-400 text-neutral-950 font-semibold shadow-lg shadow-amber-500/20 scale-105'
                  : 'bg-neutral-900/70 border border-white/10 text-neutral-300 hover:border-amber-400/40 hover:text-white backdrop-blur-sm'
              }`}
            >
              <span>{scene.title.split(',')[0]}</span>
              <span className={`text-[10px] ${activeSceneIndex === idx ? 'text-neutral-900/80 font-mono' : 'text-amber-400 font-mono'}`}>
                {scene.rate}
              </span>
            </button>
          ))}
        </div>

        {/* Prominent High-Converting Search Bar */}
        <div className="w-full max-w-6xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Bottom Trust & Accreditations Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 px-6 rounded-2xl bg-neutral-950/60 border border-white/10 backdrop-blur-md">
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-semibold text-white">Forbes 5-Star Verified</span>
              <span className="block text-[11px] text-neutral-400">Strictly inspected properties</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-semibold text-white">Best Direct Rate Guarantee</span>
              <span className="block text-[11px] text-neutral-400">Complimentary VIP upgrades</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-semibold text-white">24/7 Dedicated Butler Guild</span>
              <span className="block text-[11px] text-neutral-400">Personalized white-glove care</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Plane className="w-4 h-4" />
            </div>
            <div className="text-left">
              <span className="block text-xs font-semibold text-white">Private Aviation Access</span>
              <span className="block text-[11px] text-neutral-400">Helipads & seaplane docks</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
