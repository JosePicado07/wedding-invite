'use client'

import { m } from 'framer-motion'

export default function VenueSection({
  time,
  fadeIn = true,
}: {
  time?: string
  /** `/invitacion` sits this section directly against ScheduleSection, whose
   * curved edge continues this one's — independent scroll-triggered fades on
   * two sections sharing one visual seam can catch one mid-transition while
   * the other's settled, showing a seam. Disabled there; `/` keeps the fade
   * since its neighbor there isn't a shared continuous shape. */
  fadeIn?: boolean
}) {
  return (
    <m.section
      initial={fadeIn ? { opacity: 0 } : undefined}
      whileInView={fadeIn ? { opacity: 1 } : undefined}
      viewport={fadeIn ? { once: true } : undefined}
      transition={fadeIn ? { duration: 0.9 } : undefined}
      className="relative px-6 py-24 overflow-hidden bg-[var(--text)]"
    >
      {/* Organic concave top edge. The cream fill carries the same dimmed
          wallpaper pattern as the rest of the page (see body::before in
          globals.css) — a flat var(--bg) alone reads as a visibly different,
          flatter shade than the textured cream around it. */}
      <div
        className="absolute inset-x-0 -top-px"
        aria-hidden="true"
        style={{
          height: '64px',
          background: 'var(--bg)',
          clipPath: 'ellipse(60% 100% at 50% 0%)',
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

      {/* Bottom edge: rendered by <SectionSeam /> between this section and
          ScheduleSection — see that component for why. */}

      {/* Atmospheric blobs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-8 -right-20 w-72 h-72 rounded-full bg-[var(--terracotta)] opacity-[0.14] blur-[70px]" />
        <div className="absolute bottom-0 -left-16 w-56 h-56 rounded-full bg-[var(--moss)] opacity-[0.10] blur-[50px]" />
      </div>

      <div className="relative z-10 max-w-xs mx-auto text-center">
        <p className="font-body text-[10px] tracking-[0.5em] uppercase text-[var(--muted)] mb-7">
          Únete a nosotros
        </p>

        <h2
          className="font-display font-light leading-tight text-[var(--cream-light)] mb-3"
          style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)' }}
        >
          Woodlands
        </h2>

        <p className="font-body text-sm text-[var(--muted)] mb-2 tracking-wide">
          San Rafael de Heredia
        </p>

        <p className="font-body text-[12px] tracking-[0.28em] uppercase text-[var(--cream-light)] font-medium mb-12">
          16 de enero de 2027{time ? ` · ${time}` : ''}
        </p>

        {/* Button uses cream-light so it's visible on the dark brown background */}
        <a
          href="https://maps.app.goo.gl/A36TP4cLQoBHbngSA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border border-[var(--cream-light)] text-[var(--cream-light)] px-8 min-h-[52px] font-body text-[11px] tracking-[0.2em] uppercase transition-all duration-200 hover:bg-[var(--cream-light)] hover:text-[var(--text)]"
          aria-label="Abrir la ubicación de Woodlands en Google Maps"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Ver en el mapa
        </a>
      </div>
    </m.section>
  )
}
