'use client'

import { m } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.35,
    },
  },
}

const lineVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.95, ease: [0.16, 1, 0.3, 1] },
  },
}

function DiamondRule() {
  return (
    <div className="flex items-center gap-3 justify-center w-full" aria-hidden="true">
      <span className="h-px flex-1 bg-[var(--muted)] opacity-50" />
      <span
        className="flex-none w-[6px] h-[6px] border border-[var(--muted)] opacity-50 rotate-45"
      />
      <span className="h-px flex-1 bg-[var(--muted)] opacity-50" />
    </div>
  )
}

export default function Hero() {
  return (
    <section
      className="relative isolate min-h-[100svh] flex flex-col items-center justify-center px-8 overflow-hidden"
    >
      {/* Screen-reader heading — full semantic content */}
      <h1 className="sr-only">
        Michelle Tames y Jose Picado se van a casar. Save the date: 16 de enero de 2027.
      </h1>

      {/* Radial vignette: opaque at text center, pattern breathes at margins */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 82% 72% at 50% 46%, ' +
              'rgba(247,242,234,0.97) 0%, ' +
              'rgba(247,242,234,0.91) 35%, ' +
              'rgba(247,242,234,0.74) 62%, ' +
              'rgba(247,242,234,0.46) 100%)',
          }}
        />
        <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-[var(--accent)] opacity-[0.06] blur-[70px]" />
        <div className="absolute -bottom-10 -left-16 w-64 h-64 rounded-full bg-[var(--moss)] opacity-[0.05] blur-[60px]" />
      </div>

      {/* Visual presentation — aria-hidden, screen reader uses the sr-only h1 above */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center text-center w-full max-w-[17rem] mx-auto"
        aria-hidden="true"
      >
        {/* Label */}
        <m.p
          variants={lineVariants}
          className="font-body text-[13px] tracking-[0.5em] uppercase text-[var(--sage)] font-semibold mb-5"
        >
          Save the Date
        </m.p>

        {/* Top rule */}
        <m.div variants={lineVariants} className="w-full mb-8">
          <DiamondRule />
        </m.div>

        {/* ── Michelle Tames ── */}
        <m.span
          variants={lineVariants}
          className="font-display font-light italic text-[var(--text)] leading-none text-balance"
          style={{ fontSize: 'clamp(2.5rem, 11.5vw, 4.6rem)' }}
        >
          Michelle Tames
        </m.span>

        {/* ── and ── */}
        <m.span
          variants={lineVariants}
          className="font-display italic text-[var(--accent)] leading-none my-2"
          style={{ fontSize: 'clamp(1.3rem, 5.5vw, 2.2rem)' }}
        >
          y
        </m.span>

        {/* ── Jose Picado ── */}
        <m.span
          variants={lineVariants}
          className="font-display font-light italic text-[var(--text)] leading-none text-balance"
          style={{ fontSize: 'clamp(2.5rem, 11.5vw, 4.6rem)' }}
        >
          Jose Picado
        </m.span>

        {/* ── are getting married ── */}
        <m.span
          variants={lineVariants}
          className="font-display italic text-[var(--muted-ink)] leading-snug mt-4 text-balance"
          style={{ fontSize: 'clamp(1.1rem, 4.8vw, 1.9rem)' }}
        >
          se van a casar
        </m.span>

        {/* Bottom rule */}
        <m.div variants={lineVariants} className="w-full mt-8 mb-5">
          <DiamondRule />
        </m.div>

        {/* Date */}
        <m.p
          variants={lineVariants}
          className="font-body text-[12px] tracking-[0.32em] uppercase text-[var(--text)] font-medium"
        >
          16 de enero de 2027
        </m.p>
      </m.div>

      {/* Scroll hint */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.9 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden="true"
      >
        <m.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[var(--muted)] to-transparent mx-auto"
        />
      </m.div>
    </section>
  )
}
