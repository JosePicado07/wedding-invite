'use client'

import { m } from 'framer-motion'
import { venue } from '@/data/invitation'
import SwipeToContinue from '@/app/components/SwipeToContinue'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function InviteHero() {
  return (
    <section className="relative isolate min-h-[100svh] flex flex-col justify-center px-8 py-24 overflow-hidden">
      {/* Screen-reader heading — full semantic content */}
      <h1 className="sr-only">
        Con la bendición de sus padres, Michelle Tames y Jose Picado tienen el honor de invitarte
        a celebrar su matrimonio el {venue.date} a las {venue.time} en {venue.name},{' '}
        {venue.location}.
      </h1>

      {/* Ambient backdrop — same dimming treatment as the rest of the page */}
      <div className="absolute inset-0 -z-10 bg-[#F7F2EA]/95 backdrop-blur-[3px]" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-64 h-64 rounded-full bg-[var(--terracotta)] opacity-[0.07] blur-[80px]" />
        <div className="absolute bottom-1/4 -left-10 w-56 h-56 rounded-full bg-[var(--sage)] opacity-[0.06] blur-[70px]" />
      </div>

      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="w-full max-w-sm mx-auto"
        aria-hidden="true"
      >
        {/* Eyebrow + rule, left aligned */}
        <m.div variants={lineVariants} className="flex items-center gap-4 mb-10">
          <p className="font-body text-[11px] tracking-[0.4em] uppercase text-[var(--sage)] font-semibold whitespace-nowrap">
            Nuestra boda
          </p>
          <span className="h-px flex-1 bg-[var(--muted)] opacity-40" />
        </m.div>

        {/* Host line */}
        <m.p
          variants={lineVariants}
          className="font-display italic text-[var(--text)] opacity-60 text-base mb-3"
        >
          Con la bendición de sus padres
        </m.p>

        {/* Cascading names */}
        <m.span
          variants={lineVariants}
          className="block font-display font-light text-[var(--text)] leading-[0.95] text-balance"
          style={{ fontSize: 'clamp(2.6rem, 13vw, 4.4rem)' }}
        >
          Michelle Tames
        </m.span>

        <m.div variants={lineVariants} className="flex items-center gap-3 pl-6 sm:pl-10 my-2">
          <span
            className="font-display italic text-[var(--accent)] leading-none"
            style={{ fontSize: 'clamp(1.4rem, 6vw, 2rem)' }}
          >
            &amp;
          </span>
          <span className="h-px w-10 bg-[var(--accent)] opacity-40" />
        </m.div>

        <m.span
          variants={lineVariants}
          className="block font-display font-light text-[var(--text)] leading-[0.95] text-balance pl-6 sm:pl-10"
          style={{ fontSize: 'clamp(2.6rem, 13vw, 4.4rem)' }}
        >
          Jose Picado
        </m.span>

        {/* Request to attend */}
        <m.p
          variants={lineVariants}
          className="font-display italic text-[var(--muted-ink)] leading-snug mt-6 pl-6 sm:pl-10 text-balance"
          style={{ fontSize: 'clamp(1rem, 4.2vw, 1.4rem)' }}
        >
          tienen el honor de invitarte a celebrar su matrimonio
        </m.p>

        {/* Logistics bar */}
        <m.div
          variants={lineVariants}
          className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-12 pt-6 border-t border-[var(--muted)] border-opacity-30"
        >
          <span className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--text)] font-medium">
            {venue.date}
          </span>
          <span className="w-px h-3 bg-[var(--muted)] opacity-50" />
          <span className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--text)] font-medium">
            {venue.time}
          </span>
          <span className="w-px h-3 bg-[var(--muted)] opacity-50" />
          <span className="font-body text-[11px] tracking-[0.22em] uppercase text-[var(--sage)] font-medium">
            {venue.name}, {venue.location}
          </span>
        </m.div>
      </m.div>

      {/* Swipe gesture — jumps straight to the RSVP form */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.9 }}
        className="absolute bottom-8 left-8 right-8 flex justify-center"
      >
        <SwipeToContinue label="Desliza para confirmar" targetId="rsvp" />
      </m.div>
    </section>
  )
}
