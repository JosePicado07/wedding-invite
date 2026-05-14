'use client'

import { m } from 'framer-motion'

export default function DetailsSoon() {
  return (
    <m.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 py-16 text-center bg-[#F7F2EA]/85 backdrop-blur-[2px]"
    >
      <div className="max-w-xs mx-auto">
        {/* Decorative line */}
        <div className="flex items-center gap-4 justify-center mb-8">
          <span className="h-px flex-1 max-w-12 bg-[var(--sage)] opacity-60" aria-hidden="true" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--sage)] opacity-60"
            aria-hidden="true"
          >
            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span className="h-px flex-1 max-w-12 bg-[var(--sage)] opacity-60" aria-hidden="true" />
        </div>

        <p
          className="font-display font-light italic text-[var(--text)] leading-snug mb-4"
          style={{ fontSize: 'clamp(1.5rem, 7vw, 2.2rem)' }}
        >
          Todos los detalles muy pronto
        </p>

        <p className="font-body text-sm text-[var(--text)] opacity-70 leading-relaxed max-w-[22ch] mx-auto">
          Muy pronto compartiremos todo lo que necesitas saber.
        </p>
      </div>
    </m.section>
  )
}
