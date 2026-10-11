'use client'

import { useRef, useState } from 'react'

export default function InviteMusicNote() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)

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
    <div>
      <audio ref={audioRef} src="/assets/music.mp3" loop preload="auto" />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pausar nuestra canción' : 'Reproducir nuestra canción'}
        className="flex items-center gap-3 text-left group"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--sage)] flex-none"
          aria-hidden="true"
        >
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
        <span className="flex flex-col gap-0.5">
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[var(--sage)] font-medium">
            Nuestra canción
          </span>
          <span className="font-display italic text-[var(--muted-ink)] text-sm leading-none group-hover:text-[var(--accent)] transition-colors duration-200">
            {playing ? 'Sonando — clickea para pausar' : 'Clickea aquí para escucharla'}
          </span>
        </span>
      </button>
    </div>
  )
}
