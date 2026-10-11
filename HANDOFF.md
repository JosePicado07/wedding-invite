# Handoff — Michelle & Jose Wedding Site

Written for a fresh coding session/tool picking this project up (e.g. opencode) without prior chat history. Read this first, then `PRODUCT.md` and `DESIGN.md` for the full brand/design spec.

## Stack & routes

Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v3 + Framer Motion. Two standalone pages sharing design tokens and some components:

- **`/`** (`src/app/page.tsx`) — the original save-the-date. Playful/teaser tone. Hero, photo carousel, countdown, venue, a dietary-only form (`DietaryForm.tsx`), easter egg.
- **`/invitacion`** (`src/app/invitacion/page.tsx`) — the full formal invitation. Ceremony logistics, illustrated narrative "chapters" (gate → gazebo → firepit), couple photo + "our story" beats, schedule, dress code, menu, accommodations, gifts, a guest-list-aware RSVP (`RsvpForm.tsx`), music player, easter egg.

Both forms POST to the same Formspree endpoint/env var, distinguished by field shape.

## Content data (edit these, not the components, for copy changes)

- `src/data/invitation.ts` — dress code palette, schedule/itinerary, menu, venue, accommodations (Airbnb options list), gifts, "our story" text (proposal + wedding beats — the "how we met" beat was removed per user request, not yet replaced).
- `src/data/guests.ts` — the full guest list (`{name, plusOne}`) and fuzzy-matching logic (`findGuest`) used by `RsvpForm.tsx` to detect +1 eligibility. Matching is exact → token-containment → Levenshtein distance, case/diacritic-insensitive. If ambiguous, falls back to permissive default (never blocks submission).

## Design tokens — IMPORTANT GOTCHA

All color tokens live in `src/app/globals.css` under `:root`. **`--muted` and `--muted-ink` were found completely missing from `:root`** during this session (likely dropped in a manual edit at some point) — this silently broke every "muted" text element sitewide (labels, dividers, captions fell back to inherited dark text, in some cases creating invisible dark-on-dark text). Restored to `#B7B08A` / `#5F5939`. **If any text looks like it's missing/wrong shade with no obvious cause, check `:root` in `globals.css` for a missing custom property before assuming it's a component bug** — `var(--whatever)` silently resolves to nothing (inherited value) rather than erroring, so these bugs are invisible in the code and only show up visually.

## Known open issue (not fixed, out of scope this session)

`CountdownTimer.tsx` on `/` throws a React hydration mismatch in dev (`Recoverable Error` overlay, "Hydration failed because the server rendered text didn't match the client"). Classic countdown-timer SSR/client clock skew. Not touched this session — needs a `useEffect`-gated client-only render or similar fix.

## Dev workflow gotchas

- Running `npm run build` and `npm run dev` against the same `.next` directory back-to-back causes stale-cache 500s / Turbopack errors. Fix: `taskkill //F //IM node.exe //T`, `rm -rf .next`, rebuild, restart.
- Dev server has been run via `run_in_background` with a 2-hour max timeout in this environment; it gets killed when that's hit and needs restarting.
- Local testing on a phone was done via an ngrok tunnel (`ngrok http 3000`) pointed at the dev server — `/invitacion` is a sub-path, not the tunnel root (root serves `/`, the save-the-date).

## Domain

User mentioned a domain has been purchased but hasn't named it yet in this session — confirm with them and wire up deployment (Vercel is implied by the Next.js setup but not yet confirmed/configured) when ready.

## Recent work this session (for context on current diff)

- Added an "Our Story" section inside `CouplePhoto.tsx` (meeting/proposal/wedding beats + two real photos the user supplied — proposal photo, cake-cutting photo as the new hero photo, replacing `photo-06.jpg` which was deleted).
- Added a bunny gif to the `/invitacion` footer (`public/assets/bunny.gif`).
- Fixed a real cross-section "two different beiges" rendering bug at the Venue→Schedule seam: root cause was two independently-clipped `clip-path` ellipses abutting at a sub-pixel boundary inside `overflow-hidden` sections, producing an anti-aliasing seam no color/pattern fix could solve. Fixed by replacing both with one shared continuous shape, `SectionSeam.tsx`, rendered as a sibling between `VenueSection` and `ScheduleSection` in `page.tsx` (see that file's comments for the full diagnosis).
- Removed "Champagne" and "Vainilla" from the dress-code yellow palette (`src/data/invitation.ts`).
- Added 3 real Airbnb links near Woodlands/San Rafael de Heredia to the accommodations block, rendered in `DetailsCard.tsx`.
- Added a "Brindis" (5:30 PM) milestone to the schedule; redesigned `ScheduleSection.tsx`'s itinerary from a hardcoded 2-point left/right layout to a vertical N-item timeline (dot + time + label, scales to any number of milestones).
- Found and fixed the missing `--muted`/`--muted-ink` tokens (see above).

## Verification pattern used this session

Type-check (`npx tsc --noEmit`), then `rm -rf .next && npm run build` for a clean compile check, then visually verify via a headless/real browser at mobile width (390×844) against the running dev server, scrolling to the relevant section. Screenshots and DOM/computed-style inspection (via JS eval) were both useful for diagnosing rendering bugs that weren't obvious from source alone (e.g. the seam bug and the missing-CSS-variable bug above).
