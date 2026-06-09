'use client'

import { useEffect, useRef, useState } from 'react'
import { m } from 'framer-motion'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)

  // Try to start on the guest's first interaction (browsers block silent autoplay).
  useEffect(() => {
    const el = audioRef.current
    if (!el) return

    let started = false
    const tryStart = () => {
      if (started) return
      started = true
      el.volume = 0.35
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
      window.removeEventListener('pointerdown', tryStart)
      window.removeEventListener('scroll', tryStart)
    }

    window.addEventListener('pointerdown', tryStart, { once: true })
    window.addEventListener('scroll', tryStart, { once: true, passive: true })
    setReady(true)

    return () => {
      window.removeEventListener('pointerdown', tryStart)
      window.removeEventListener('scroll', tryStart)
    }
  }, [])

  const toggle = () => {
    const el = audioRef.current
    if (!el) return
    if (el.paused) {
      el.volume = 0.35
      el.play().then(() => setPlaying(true)).catch(() => {})
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/assets/music.mp3" loop preload="auto" />

      {ready && (
        <m.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          onClick={toggle}
          aria-label={playing ? 'Pausar música' : 'Reproducir música'}
          className="fixed bottom-5 right-5 z-[60] w-12 h-12 rounded-full flex items-center justify-center bg-[var(--accent)] text-[var(--cream-light)] border border-[var(--cream-light)]/40 shadow-[0_4px_16px_rgba(74,58,42,0.45)] ring-1 ring-[var(--text)]/20 transition-transform duration-200 hover:scale-105 active:scale-95"
        >
          {playing ? (
            // Sound-on icon with animated waves
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M19 5a9 9 0 0 1 0 14" />
            </svg>
          ) : (
            // Muted icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 5 6 9H2v6h4l5 4V5z" />
              <line x1="22" y1="9" x2="16" y2="15" />
              <line x1="16" y1="9" x2="22" y2="15" />
            </svg>
          )}
        </m.button>
      )}
    </>
  )
}
