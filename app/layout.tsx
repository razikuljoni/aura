import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'AURA | Luxury Resorts, Private Villas & Bespoke Escapes',
  description: 'Immerse yourself in world-class 5-star cliffside sanctuaries, overwater villas, and bespoke curated journeys with dedicated 24/7 butler guild attendants.',
  openGraph: {
    title: 'AURA | Luxury Resorts & Bespoke Escapes',
    description: 'Experience ultra-luxury travel, real-time availability, dynamic pricing, and white-glove concierge services.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURA | Luxury Resorts & Bespoke Escapes',
    description: 'Ultra-luxury hotel booking and bespoke experiences.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="bg-neutral-950 text-neutral-100 antialiased font-sans selection:bg-amber-400 selection:text-neutral-950" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

