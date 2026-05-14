'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { m } from 'framer-motion'
import { photos } from '@/data/photos'

const INTERVAL_MS = 4000

export default function PhotoCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' })
  }, [])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      const el = scrollRef.current
      if (!el) return
      const current = Math.round(el.scrollLeft / el.clientWidth)
      const next = (current + 1) % photos.length
      el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' })
    }, INTERVAL_MS)
  }, [])

  useEffect(() => {
    startTimer()
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [startTimer])

  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setActiveIndex(Math.round(el.scrollLeft / el.clientWidth))
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const goTo = (index: number) => {
    scrollTo(index)
    startTimer() // reset auto-advance timer on manual tap
  }

  if (photos.length === 0) {
    return (
      <div className="w-full aspect-[2/3] bg-[var(--muted)] flex flex-col items-center justify-center gap-3">
        <p className="font-display italic text-5xl text-[var(--bg)] opacity-40">M &amp; J</p>
        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-[var(--bg)] opacity-30">
          Add photos to public/assets/
        </p>
      </div>
    )
  }

  return (
    <m.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      aria-roledescription="carousel"
      aria-label="Wedding photos"
    >
      {/* Scroll track */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none"
      >
        {photos.map((src, i) => (
          <div
            key={src}
            className="relative flex-none w-full snap-start"
            style={{ aspectRatio: '2/3' }}
            aria-roledescription="slide"
            aria-label={`Photo ${i + 1} of ${photos.length}`}
          >
            <Image
              src={src}
              alt={`Michelle and Jose, photo ${i + 1}`}
              fill
              className="object-cover object-center"
              priority={i === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Dot indicators — keyed by photo path */}
      {photos.length > 1 && (
        <div
          className="flex justify-center items-center gap-0 py-1 bg-[var(--bg)]"
          role="tablist"
          aria-label="Photo navigation"
        >
          {photos.map((src, i) => (
            <button
              key={src}
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => goTo(i)}
              className="w-10 h-10 flex items-center justify-center"
            >
              <span
                className="block transition-all duration-300"
                style={{
                  width: i === activeIndex ? '16px' : '5px',
                  height: '5px',
                  background: i === activeIndex ? 'var(--accent)' : 'var(--muted)',
                  borderRadius: '999px',
                }}
              />
            </button>
          ))}
        </div>
      )}
    </m.section>
  )
}
