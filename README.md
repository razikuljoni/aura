# AURA — Luxury Resorts & Bespoke Escapes

[![Live Demo](https://img.shields.io/badge/Live%20Demo-aura--self--beta.vercel.app-gold?style=for-the-badge&logo=vercel)](https://aura-self-beta.vercel.app)
[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-v4.1-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini 3.7 Flash](https://img.shields.io/badge/AI-Gemini%203.7%20Flash-8e44ad)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

AURA is an ultra-luxury hotel and resort booking platform featuring real-time availability search, dynamic pricing calculations, multi-currency conversion, bespoke itineraries, and an AI Luxury Travel Concierge powered by Google Gemini 3.7 Flash.

**🌐 Live Production**: [https://aura-self-beta.vercel.app](https://aura-self-beta.vercel.app)

---

## Key Features

- **Sanctuary Portfolio**: Interactive filterable catalog of luxury cliffside palaces, overwater villas, onsen retreats, ski chalets, and safari lodges.
- **Dynamic Pricing Engine**: Automated seasonal surge, weekend adjustments, guest tier multipliers, and itemized fees (resort, service, taxes).
- **Multi-Currency Support**: Real-time conversion across USD ($), EUR (€), GBP (£), and JPY (¥).
- **AI Luxury Concierge (`AURA Privé`)**: Context-aware 24/7 travel assistant backed by `@google/genai` (`gemini-3.7-flash`).
- **Interactive Modals**: Property detail viewer, curated experience detail viewer, multi-step booking checkout flow, guest account portal, and wishlist manager.
- **Production Optimized**: Server-side image patterns, standalone container build configuration, dynamic OpenGraph image generation, and SEO metadata.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, standalone output)
- **UI & Styling**: React 19, Tailwind CSS v4 (`@tailwindcss/postcss`), Motion
- **State Management**: React Context (`lib/booking-store.tsx`) + `localStorage` persistence
- **AI / LLM**: `@google/genai` v2.4+ (`gemini-3.7-flash`)
- **Fonts**: `Cinzel`, `Cormorant Garamond`, `Plus Jakarta Sans` via `next/font/google`

---

## Getting Started

### Prerequisites

- Node.js 20+ installed
- Google Gemini API key (optional for local testing, required for full AI concierge capabilities)

### Installation

```bash
git clone https://github.com/your-org/aura.git
cd aura
npm install
```

### Environment Setup

Create `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Configure your environment variables:

```env
# Required for Gemini AI Concierge
GEMINI_API_KEY="your_gemini_api_key_here"

# App Deployment Host URL
APP_URL="http://localhost:3000"
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Production Deployment & Verification

### Build & Lint Commands

```bash
# Typecheck & production build
npm run build

# Run ESLint validation
npm run lint

# Start production server
npm run start
```

### Docker / Container Deployment

This repository outputs Next.js in `standalone` mode. To deploy via Docker:

```dockerfile
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

## Project Structure

```
aura/
├── app/
│   ├── api/concierge/     # Gemini 3.7 Flash API route handler
│   ├── error.tsx          # Production error boundary
│   ├── globals.css        # Tailwind v4 theme & font declarations
│   ├── icon.svg           # Brand vector favicon
│   ├── layout.tsx         # Root layout, font optimization & global metadata
│   ├── not-found.tsx      # Custom 404 page
│   ├── opengraph-image.tsx# Dynamic OpenGraph image generator
│   ├── page.tsx           # Main application dashboard
│   ├── robots.ts          # Search engine crawler permissions
│   └── sitemap.ts         # XML sitemap configuration
├── components/            # UI components & interactive modals
├── lib/
│   ├── booking-store.tsx  # Central React Context provider & price calculator
│   ├── data.ts            # Mock database (properties, experiences, itineraries)
│   ├── types.ts           # TypeScript type definitions
│   └── utils.ts           # Utility helpers
├── public/                # Web manifest & static assets
├── AGENTS.md              # AI agent orientation guide
├── next.config.ts         # Next.js build configuration
└── package.json           # Project manifest & scripts
```

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.
