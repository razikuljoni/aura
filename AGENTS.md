# AGENTS.md

Context for AI agents working on AURA (`ai-studio-applet`).

## Overview
Next.js 15 (App Router) luxury resort booking platform with property search/filtering, dynamic pricing, modal checkout, and a Gemini 3.7 Flash AI travel concierge.

- **Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS v4, Motion, `@google/genai`
- **State**: React Context (`lib/booking-store.tsx`) with `localStorage` persistence (`aura_wishlist`, `aura_bookings`, `aura_currency`)
- **API**: `/api/concierge` powered by `gemini-3.7-flash`

## Essential Commands
- `npm run dev`: Start dev server
- `npm run build`: Production build (`next build`, checks types and builds standalone output)
- `npm run lint`: Run ESLint check (`eslint .`)

## Key Architecture & Entrypoints
- `app/page.tsx`: Single-page dashboard rendering search bar, property grid, curated experiences, and interactive modal dialogs.
- `app/api/concierge/route.ts`: Gemini-powered concierge endpoint. Reads `GEMINI_API_KEY` and handles conversation history + search context.
- `lib/booking-store.tsx`: Core state provider (`BookingProvider` / `useBooking`). Manages property filtering, dynamic pricing math, modal visibility, wishlist, and booking state.
- `lib/data.ts`: Mock database for properties, experiences, user profile, and bookings.
- `lib/types.ts`: TypeScript types (`Property`, `CuratedExperience`, `Booking`, `SearchFilterState`, `UserProfile`).

## Environment & Build Quirks
- **Live Deployment**: `https://aura-self-beta.vercel.app` (Vercel auto-deploy on `main` push)
- **Environment Variables**:
  - `GEMINI_API_KEY`: Required for `/api/concierge`. Falls back to default response if key is missing or invalid.
  - `APP_URL`: Service URL (`https://aura-self-beta.vercel.app` in production).
  - `DISABLE_HMR`: When set to `'true'`, disables HMR watch options in `next.config.ts` (prevents flicker during AI Studio edits).
- **Next.js Config (`next.config.ts`)**:
  - `eslint.ignoreDuringBuilds: true` - ESLint skipped during `npm run build`; run `npm run lint` explicitly.
  - `output: 'standalone'` - Optimized container deployment.
  - `transpilePackages: ['motion']`.
  - Allowed image domains: `picsum.photos`, `images.unsplash.com`, `plus.unsplash.com`.
