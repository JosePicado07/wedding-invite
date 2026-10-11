/**
 * Shared curved seam between VenueSection and ScheduleSection.
 *
 * Previously each section drew its own 64px clip-path ellipse at the
 * boundary (Venue's bottom edge, Schedule's top edge). Both sections have
 * `overflow-hidden` (needed to contain their own atmospheric blobs), which
 * clips off the 1px overlap meant to prevent a gap — so the two curves end
 * up abutting at an exact sub-pixel line. Each gets anti-aliased
 * independently by the compositor, and two independently-anti-aliased edges
 * meeting at the same line produces a visible seam no matter how well the
 * fill color/pattern matches.
 *
 * Fix: one continuous shape spanning the seam, so there's a single outer
 * edge and no internal boundary. Rendered as a sibling between the two
 * sections (not nested in either), so neither section's overflow-hidden
 * can clip it; `position: relative` + `z-index` lifts it above both
 * sections' own (unpositioned-for-stacking) backgrounds.
 */
export default function SectionSeam() {
  return (
    <div style={{ height: 0 }}>
      <div
        className="relative z-10"
        aria-hidden="true"
        style={{
          top: '-64px',
          height: '128px',
          background: 'var(--bg)',
          clipPath: 'ellipse(60% 50% at 50% 50%)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/assets/bg-pattern.jpg')",
            backgroundRepeat: 'repeat',
            backgroundSize: '420px',
            opacity: 0.05,
          }}
        />
      </div>
    </div>
  )
}
