# Wedding Invite — Michelle Tames & Jose Picado

## Register
brand

## Users
Invited wedding guests, primarily family and close friends receiving a digital save-the-date via WhatsApp or email. Mobile-first users opening the link on their phones.

## Product Purpose
A single-page digital save-the-date for the wedding of Michelle Tames and Jose Picado on January 16th, 2027. Communicates who, when, and where in a warm and memorable way. Acts as a keepsake guests can revisit.

## Tone
Warm, intimate, unhurried. Handcrafted and personal, never corporate. Romantic without being saccharine. Earthy and organic — linen, pressed flowers, warm candlelight.

## Brand
- Aesthetic: Bohemian & organic
- Feeling: Coming home to something beautiful
- Voice: Quiet confidence, warmth, poetry over prose

## Anti-References
- Generic wedding template sites (The Knot, Zola cookie-cutter)
- White-heavy "clean and modern" — too cold
- Purple gradient AI aesthetics
- Over-decorated floral explosion styles
- Anything mass-produced

## Strategic Principles
1. Typography IS the design — Cormorant Garamond does the heavy lifting
2. Less is more — every element earns its place
3. Mobile-first, thumb-zone-aware
4. Performance — opened on mobile data, keep it fast

## Surfaces
- `/` — the original save-the-date. A single-page teaser/announcement and keepsake (Hero, photo carousel, countdown, venue, a dietary-only form, playful extras). Unchanged in scope; not superseded.
- `/invitacion` — the full wedding invitation. A formal, self-contained document: host/request line, full ceremony logistics (date, time, venue), schedule, dress code (with suggested color palette), accommodations note, gift note, and a complete RSVP (attending, guest count, meal choice, dietary notes).
- Both surfaces share the same brand register and design tokens (`DESIGN.md`), but `/invitacion`'s copy is formal/ceremonial while `/` stays playful/anticipatory.
- Both forms (`DietaryForm` on `/`, `RsvpForm` on `/invitacion`) POST to the same Formspree endpoint/env var, distinguishable by field shape (`restriccion`/`detalle` vs. `asiste`/`acompanantes`/`platillo`).
