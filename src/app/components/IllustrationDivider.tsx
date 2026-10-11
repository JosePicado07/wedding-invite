'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { m, useScroll, useTransform } from 'framer-motion'

export default function IllustrationDivider({
  src,
  alt,
  width,
  height,
  eyebrow,
  caption,
}: {
  src: string
  alt: string
  width: number
  height: number
  eyebrow: string
  caption: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section
      ref={ref}
      className="relative px-6 py-20 overflow-hidden bg-[#F7F2EA]/85 backdrop-blur-[2px]"
    >
      <div className="max-w-sm mx-auto flex flex-col items-center text-center">
        <p className="font-body text-[10px] tracking-[0.5em] uppercase text-[var(--sage)] mb-8">
          {eyebrow}
        </p>

        <div className="relative w-full overflow-hidden rounded-sm">
          <m.div style={{ y }} className="relative bg-[var(--bg)]">
            {/* Replicates body::before's pattern locally — this wrapper's own
                transform isolates it from the page-level pattern, so without
                this the multiply-blended image would sit on a flat, unpatterned
                beige while the section around it shows the textured one.
                Opacity matches what the surrounding section actually shows,
                not body::before's own 0.35 — the section only reveals ~15%
                of that (its own bg is 85% opaque), so the true effective
                strength out there is ~0.35 × 0.15 ≈ 0.05, not 0.35. */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                backgroundImage: "url('/assets/bg-pattern.jpg')",
                backgroundRepeat: 'repeat',
                backgroundSize: '420px',
                opacity: 0.05,
              }}
            />
            <Image
              src={src}
              alt={alt}
              width={width}
              height={height}
              sizes="(max-width: 400px) 90vw, 380px"
              className="w-full h-auto select-none mix-blend-multiply"
              draggable={false}
            />
          </m.div>
        </div>

        <p className="font-display italic text-[var(--text)] opacity-70 leading-snug mt-8 max-w-[26ch] text-balance">
          {caption}
        </p>
      </div>
    </section>
  )
}
