'use client'

import Script from 'next/script'
import { m } from 'framer-motion'

export default function PenguinSection() {
  return (
    <m.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 py-16 text-center bg-[#F7F2EA]/85 backdrop-blur-[2px]"
    >
      <p className="font-body text-[9px] tracking-[0.5em] uppercase text-[var(--sage)] mb-3">
        P.D.
      </p>
      <p
        className="font-display font-light italic text-[var(--text)] leading-snug mb-8"
        style={{ fontSize: 'clamp(1.3rem, 6vw, 1.9rem)' }}
      >
        Así de emocionados estamos.
      </p>

      <div className="mx-auto w-[220px]">
        <div
          className="tenor-gif-embed"
          data-postid="9129166231344863310"
          data-share-method="host"
          data-aspect-ratio="1"
          data-width="220px"
        >
          <a href="https://tenor.com/view/penguin-dance-pengu-penguin-gif-9129166231344863310">
            Penguin Dance
          </a>
        </div>
        <Script src="https://tenor.com/embed.js" strategy="lazyOnload" />
      </div>

      <p className="font-body text-[9px] tracking-[0.35em] uppercase text-[var(--muted-ink)] mt-8">
        Nos vemos el 16 de enero de 2027
      </p>
    </m.section>
  )
}
