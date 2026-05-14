# Design System — Michelle & Jose Wedding Invite

## Color Palette

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F7F2EA` | Warm linen — page background |
| `--text` | `#4A3A2A` | Chocolate Brown — headings & body |
| `--accent` | `#6E1F2A` | Deep Burgundy — primary brand, CTAs, "&" |
| `--sage` | `#7A845A` | Olive Green — labels, secondary |
| `--terracotta` | `#A4573A` | Rusty Terracotta — warm accent blob |
| `--moss` | `#556B2F` | Moss Green — cool accent blob |
| `--muted` | `#B7B08A` | Champagne Taupe — dividers, captions |
| `--cream-light` | `#F7F2EA` | Light text on dark sections |

## Typography

### Display: Cormorant Garamond
- Weights: 300, 400, 500, 600 (normal + italic)
- Usage: Names, headings, large date displays, ampersand
- Class: `font-display`

### Body: Nunito
- Weights: 300, 400, 500, 600
- Usage: Labels, captions, uppercase tracking, body text
- Class: `font-body`

## Spacing
Generous breathing room. Sections: 80–96px vertical padding on mobile.

## Motion
- Entrance: fade + upward drift, ease `[0.16, 1, 0.3, 1]`, 0.9–1s
- Stagger: 180ms between children, 400ms delay
- Scroll reveals: `whileInView`, `once: true`, `-80px` margin
- No bounce, no elastic, no layout property animations

## Surfaces
- Grain texture overlay: SVG feTurbulence at 3.5% opacity, multiply blend
- Soft radial blobs (opacity 0.04–0.12) for atmospheric depth
- Dark section: `--text` background with terracotta/sage blobs
- Section dividers: organic `clip-path: ellipse()` top edges
