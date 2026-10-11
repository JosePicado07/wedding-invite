'use client'

import { m } from 'framer-motion'
import { schedule } from '@/data/invitation'

export default function ScheduleSection() {
  return (
    <m.section
      className="relative px-6 py-24 overflow-hidden bg-[var(--text)]"
    >
      {/* Top edge: rendered by <SectionSeam /> between VenueSection and this
          section — see that component for why. */}

      {/* Mirrored ellipse at the bottom, so the firepit divider arrives smoothly */}
      <div
        className="absolute inset-x-0 -bottom-px"
        aria-hidden="true"
        style={{
          height: '64px',
          background: 'var(--bg)',
          clipPath: 'ellipse(60% 100% at 50% 100%)',
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

      {/* Single soft blob, upper right */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-10 right-0 w-64 h-64 rounded-full bg-[var(--sage)] opacity-[0.1] blur-[70px]" />
      </div>

      <div className="relative z-10 max-w-sm mx-auto">
        <h2 className="font-body text-[10px] tracking-[0.5em] uppercase text-[var(--muted)] mb-12 text-center">
          {schedule.headline}
        </h2>

        <div className="relative flex flex-col gap-9">
          <span
            className="absolute left-[3px] top-2 bottom-2 w-px bg-[var(--muted)] opacity-30"
            aria-hidden="true"
          />
          {schedule.milestones.map((item, i) => {
            const isFirst = i === 0
            const isLast = i === schedule.milestones.length - 1
            return (
              <div key={item.time} className="relative z-10 flex flex-col gap-2 pl-8">
                <span
                  className={`absolute left-0 top-[11px] w-[7px] h-[7px] rounded-full ${
                    isFirst ? 'bg-[var(--terracotta)]' : isLast ? 'bg-[var(--sage)]' : 'bg-[var(--muted)]'
                  }`}
                />
                <span
                  className="font-display font-light italic text-[var(--cream-light)] leading-none"
                  style={{ fontSize: 'clamp(1.7rem, 8vw, 2.4rem)' }}
                >
                  {item.time}
                </span>
                <span className="font-body text-[10px] tracking-[0.18em] uppercase text-[var(--muted)] leading-snug">
                  {item.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </m.section>
  )
}
