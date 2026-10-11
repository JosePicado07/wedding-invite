'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const HANDLE_SIZE = 44
const TRACK_PADDING = 4
const COMPLETE_THRESHOLD = 0.7
const MOVE_TOLERANCE = 5
const SCROLL_OFFSET = 24 // matches the .scroll-mt-6 anchor offset used elsewhere

function easeOutExpo(t: number) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

// A hand-rolled smooth scroll. Native scrollIntoView({behavior:'smooth'}) is
// inconsistent across browsers/automation contexts — this guarantees the
// same eased motion everywhere and matches the site's own easing curve.
function smoothScrollTo(targetY: number, duration = 700) {
  const startY = window.scrollY
  const diff = targetY - startY
  if (Math.abs(diff) < 1) return
  const startTime = performance.now()
  function step(now: number) {
    const t = Math.min(1, (now - startTime) / duration)
    window.scrollTo(0, startY + diff * easeOutExpo(t))
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export default function SwipeToContinue({
  label,
  targetId,
}: {
  label: string
  targetId: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const handleRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLParagraphElement>(null)
  const [maxDrag, setMaxDrag] = useState(0)
  const [x, setX] = useState(0)
  const [dragging, setDragging] = useState(false)

  const draggingRef = useRef(false)
  const movedRef = useRef(false)
  const startXRef = useRef(0)
  const startOffsetRef = useRef(0)
  const xRef = useRef(0)

  // Writes the gesture's visual feedback straight to the DOM instead of through
  // setX, so a fast drag doesn't force a React re-render on every pointermove.
  const paint = useCallback((next: number) => {
    if (handleRef.current) handleRef.current.style.transform = `translateX(${next}px)`
    if (fillRef.current) fillRef.current.style.width = `${next + HANDLE_SIZE}px`
    if (labelRef.current) {
      const p = maxDrag > 0 ? next / maxDrag : 0
      labelRef.current.style.opacity = String(Math.max(0, 1 - p / 0.6))
    }
  }, [maxDrag])

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    function measure() {
      if (!el) return
      setMaxDrag(Math.max(0, el.offsetWidth - HANDLE_SIZE - TRACK_PADDING * 2))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const goToTarget = useCallback(() => {
    const el = document.getElementById(targetId)
    if (!el) return
    const targetY = el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET
    smoothScrollTo(targetY)
  }, [targetId])

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true
    movedRef.current = false
    startXRef.current = e.clientX
    startOffsetRef.current = xRef.current
    setDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return
      const delta = e.clientX - startXRef.current
      if (Math.abs(delta) > MOVE_TOLERANCE) movedRef.current = true
      const next = Math.min(maxDrag, Math.max(0, startOffsetRef.current + delta))
      xRef.current = next
      paint(next)
    },
    [maxDrag, paint]
  )

  // Reads xRef (updated synchronously in onPointerMove), not the `x` state —
  // on a fast swipe, pointerup can fire before React flushes the render that
  // would make `x` visible to this closure, so state would read stale.
  const finishDrag = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!draggingRef.current) return
      draggingRef.current = false
      setDragging(false)
      e.currentTarget.releasePointerCapture(e.pointerId)

      const current = xRef.current
      if (maxDrag > 0 && current >= maxDrag * COMPLETE_THRESHOLD) {
        xRef.current = maxDrag
        setX(maxDrag)
        window.setTimeout(() => {
          goToTarget()
          window.setTimeout(() => {
            xRef.current = 0
            setX(0)
          }, 700)
        }, 150)
      } else {
        if (!movedRef.current) goToTarget()
        xRef.current = 0
        setX(0)
      }
    },
    [maxDrag, goToTarget]
  )

  const progress = maxDrag > 0 ? x / maxDrag : 0

  return (
    <div
      ref={trackRef}
      className="relative w-full max-w-[260px] h-[52px] rounded-full border border-[var(--muted)] border-opacity-50 bg-[var(--bg)] select-none"
    >
      {/* Clips only the fill/label to the track's corners — kept separate from
          the handle below so the handle's own drag transform never gets clipped. */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <div
          ref={fillRef}
          className="absolute left-0 top-[4px] h-[44px] rounded-full bg-[var(--accent)] opacity-10"
          style={{ width: `${x + HANDLE_SIZE}px` }}
          aria-hidden="true"
        />

        <p
          ref={labelRef}
          className="absolute inset-0 flex items-center justify-center font-body text-[10px] tracking-[0.18em] uppercase text-[var(--text)] pl-12 pr-4 whitespace-nowrap"
          style={{ opacity: Math.max(0, 1 - progress / 0.6) }}
          aria-hidden="true"
        >
          {label}
        </p>
      </div>

      <div
        ref={handleRef}
        role="slider"
        tabIndex={0}
        aria-label={label}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            goToTarget()
          }
        }}
        className="absolute top-[4px] left-[4px] w-[44px] h-[44px] rounded-full bg-[var(--accent)] flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
        style={{
          transform: `translateX(${x}px)`,
          transition: dragging ? 'none' : 'transform 300ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--cream-light)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </div>
    </div>
  )
}
