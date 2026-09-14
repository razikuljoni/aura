import type { Metadata } from 'next';
import { Cinzel, Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-cinzel',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const baseUrl = process.env.APP_URL ? new URL(process.env.APP_URL) : new URL('https://aura-self-beta.vercel.app');

export const metadata: Metadata = {
  metadataBase: baseUrl,
  title: {
    default: 'AURA | Luxury Resorts, Private Villas & Bespoke Escapes',
    template: '%s | AURA Luxury Resorts',
  },
  description: 'Immerse yourself in world-class 5-star cliffside sanctuaries, overwater villas, and bespoke curated journeys with dedicated 24/7 butler guild attendants and AI concierge.',
  keywords: [
    'luxury resort',
    'private villa',
    'bespoke escapes',
    'overwater villa',
    '5-star hotel',
    'AI travel concierge',
    'Amalfi coast villa',
    'Kyoto onsen retreat',
    'Maldives private atoll',
    'St. Moritz chalet'
  ],
  authors: [{ name: 'AURA Hospitality Group' }],
  creator: 'AURA',
  publisher: 'AURA',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'AURA | Luxury Resorts & Bespoke Escapes',
    description: 'Experience ultra-luxury travel, real-time availability, dynamic pricing, and white-glove concierge services.',
    url: baseUrl.toString(),
    siteName: 'AURA Luxury Resorts',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'AURA Luxury Resorts & Bespoke Escapes',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURA | Luxury Resorts & Bespoke Escapes',
    description: 'Ultra-luxury hotel booking and bespoke experiences.',
    images: ['/og-image.jpg'],
    creator: '@aura_escapes',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`dark scroll-smooth ${cinzel.variable} ${cormorant.variable} ${plusJakarta.variable}`}
    >
      <body 
        className="bg-neutral-950 text-neutral-100 antialiased font-sans selection:bg-amber-400 selection:text-neutral-950" 
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}

