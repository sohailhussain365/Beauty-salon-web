# Matthew Dillard Hair Salons

A luxury hair salon website for Matthew Dillard Hair Salons — showcasing services, gallery, testimonials, and online booking. Built as a Vite + React SPA with a dark gold luxury aesthetic.

## Run & Operate

- Frontend artifact: `@workspace/matthew-dillard` (runs via workflow, port from `$PORT`)
- `pnpm --filter @workspace/matthew-dillard run dev` — start dev server locally
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 18 + Vite, Tailwind CSS v4, Framer Motion, wouter (routing)
- Fonts: Playfair Display (headings) + Inter (body)
- Theme: dark luxury — gold `#c9a84c` on near-black `hsl(0,0%,4%)`

## Where things live

- `artifacts/matthew-dillard/` — the frontend artifact (React + Vite SPA)
- `artifacts/matthew-dillard/src/pages/` — page components (Home, About, Services, Gallery, Testimonials, Contact, Booking, not-found)
- `artifacts/matthew-dillard/src/components/` — shared components (Navbar, Footer, Hero, SalonElement, Cursor, FloatingBooking, etc.)
- `artifacts/matthew-dillard/src/index.css` — global styles, Tailwind config, CSS 3D gem keyframes

## Architecture decisions

- wouter is used instead of React Router or Next.js file routing — lightweight, hash-free SPA routing
- `import.meta.env.BASE_URL` is stripped of trailing slash and passed as the wouter base for correct Replit path-based proxying
- The 3D decorative element in the hero (SalonElement) is pure CSS — no JavaScript mouse tracking — for smooth mobile performance
- Custom cursor (`Cursor.tsx`) automatically returns `null` on touch/coarse-pointer devices
- All animation keyframes use `will-change: transform` and respect `prefers-reduced-motion`

## Product

Luxury hair salon marketing site with: animated hero with CSS 3D crystal element, services showcase, before/after slider, testimonials carousel, gallery page, about page, contact form, and booking CTA flow. Fully mobile-responsive.

## User preferences

- Source of truth is the GitHub repo `https://github.com/sohailhussain365/Beauty-salon-web` — push improvements there for Vercel to deploy
- Do NOT migrate to Replit hosting — user monitors progress via Vercel deployment
- Push to GitHub via the REST API when git commands are blocked

## Gotchas

- Git commit/push/remote-set-url are blocked in the main agent — use the GitHub REST API (blobs → tree → commit → update ref) to push changes directly
- The frontend artifact path is `/matthew-dillard` in the Replit preview; Vercel deploys the root of `artifacts/matthew-dillard/`
- `artifacts/matthew-dillard/` in this workspace mirrors the GitHub repo's same path — keep them in sync
