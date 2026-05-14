'use client'

import { useState, useEffect } from 'react'
import { m } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const target = new Date('2027-01-16T00:00:00')
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

const UNITS: { key: keyof TimeLeft; label: string }[] = [
  { key: 'days', label: 'días' },
  { key: 'hours', label: 'horas' },
  { key: 'minutes', label: 'minutos' },
  { key: 'seconds', label: 'segundos' },
]

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft())

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <m.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 py-20 text-center bg-[#F7F2EA]/85 backdrop-blur-[2px]"
    >
      <p className="font-body text-[10px] tracking-[0.5em] uppercase text-[var(--sage)] mb-10">
        Hasta que digamos Sí
      </p>

      <div className="grid grid-cols-4 gap-3 max-w-[20rem] mx-auto">
        {UNITS.map(({ key, label }) => (
          <div key={key} className="flex flex-col items-center gap-2">
            <m.span
              key={`${key}-${timeLeft[key]}`}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-display font-light leading-none text-[var(--text)] tabular-nums"
              style={{ fontSize: 'clamp(2rem, 10vw, 3.5rem)' }}
            >
              {String(timeLeft[key]).padStart(2, '0')}
            </m.span>
            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-[var(--muted)]">
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 justify-center mt-10">
        <span className="h-px flex-1 max-w-16 bg-[var(--muted)] opacity-50" aria-hidden="true" />
        <p className="font-body text-[12px] tracking-[0.28em] uppercase text-[var(--text)] font-medium">
          16 de enero · 2027
        </p>
        <span className="h-px flex-1 max-w-16 bg-[var(--muted)] opacity-50" aria-hidden="true" />
      </div>
    </m.section>
  )
}
