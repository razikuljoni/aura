'use client';

import React from 'react';
import { BookingProvider } from '@/lib/booking-store';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { CuratedExperiences } from '@/components/CuratedExperiences';
import { PropertiesGrid } from '@/components/PropertiesGrid';
import { SocialProofSection } from '@/components/SocialProofSection';
import { Footer } from '@/components/Footer';
import { StickyBookCta } from '@/components/StickyBookCta';
import { PropertyDetailModal } from '@/components/PropertyDetailModal';
import { CuratedExperienceDetailModal } from '@/components/CuratedExperienceDetailModal';
import { BookingCheckoutModal } from '@/components/BookingCheckoutModal';
import { AccountPortalModal } from '@/components/AccountPortalModal';
import { AiConciergeModal } from '@/components/AiConciergeModal';

export default function HomePage() {
  return (
    <BookingProvider>
      <main className="min-h-screen bg-neutral-950 text-white selection:bg-amber-400 selection:text-neutral-950">
        {/* Navigation Bar */}
        <Navbar />

        {/* Hero Section with Video Background & Search Bar */}
        <HeroSection />

        {/* Curated Bespoke Experiences Carousel */}
        <CuratedExperiences />

        {/* The Portfolio - Properties & Private Sanctuaries Grid */}
        <PropertiesGrid />

        {/* Social Proof, Verified Press & Global Statistics */}
        <SocialProofSection />

        {/* Footer */}
        <Footer />

        {/* Sticky "Book Now" CTA Following Scroll */}
        <StickyBookCta />

        {/* Modals & Portals */}
        <PropertyDetailModal />
        <CuratedExperienceDetailModal />
        <BookingCheckoutModal />
        <AccountPortalModal />
        <AiConciergeModal />
      </main>
    </BookingProvider>
  );
}
