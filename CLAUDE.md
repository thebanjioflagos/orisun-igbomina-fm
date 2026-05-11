# Orisun Igbomina FM — Developer Guide

## Tech Stack
- **Framework**: Next.js 16+ (App Router, Turbopack)
- **3D**: Three.js, R3F, Drei
- **Animation**: GSAP, Lenis Smooth Scroll
- **Styling**: Tailwind CSS v4 (Config in `globals.css`)
- **Fonts**: Fraunces (Headlines), Unbounded (Accent), DM Sans (Body)

## Project Structure
- `/app`: Pages and Layouts
- `/components/3d`: HeroScene, AdireParticles, WaveVisualizer
- `/components/sections`: Reusable page sections (Timeline, Schedule)
- `/components/ui`: Navbar, Footer, SmoothScroll
- `/components/audio`: AudioPlayer, Stream controls
- `/lib`: Utilities (cn, sanity, etc.)

## Brand Identity
- **Colors**: See `globals.css` (`--color-orisun-*`)
- **Soul**: Cultural authority, Igbomina heritage, vibrant community voice.

## Commands
- `npm run dev`: Start development server (Port 3001 if 3000 is busy)
- `npm run build`: Production build
- `npm run lint`: Linting

## Coding Standards
- Use `Noto Sans Yoruba` for any Yoruba text.
- Use `Fraunces` for headlines (italicized for a regal feel).
- Use `Unbounded` for accents and technical badges.
- All 3D components should use `Suspense`.
- Maintain accessibility (aria labels on interactive elements).
