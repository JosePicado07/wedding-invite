'use client'

import { useState, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import Script from 'next/script'
import { AnimatePresence, m } from 'framer-motion'

export default function EasterEgg() {
  const [open, setOpen] = useState(false)
  const taps = useRef(0)
  const lastTap = useRef(0)

  const handleTap = useCallback(() => {
    const now = Date.now()
    if (now - lastTap.current > 1800) {
      taps.current = 1
    } else {
      taps.current += 1
      if (taps.current >= 5) {
        taps.current = 0
        setOpen(true)
      }
    }
    lastTap.current = now
  }, [])

  const overlay = (
    <AnimatePresence>
      {open && (
        <m.div
          key="easter-egg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'rgba(74, 58, 42, 0.93)' }}
          onClick={() => setOpen(false)}
        >
          <m.div
            initial={{ scale: 0.82, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.88, y: 16, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center px-8 max-w-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <p
              className="font-display italic text-[var(--cream-light)] mb-1 leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 8vw, 2.6rem)' }}
            >
              ¡Nos encontraste!
            </p>
            <p className="font-body text-[9px] tracking-[0.45em] uppercase text-[var(--muted)] mb-8">
              Nos vemos el 16 de enero de 2027
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

            <button
              onClick={() => setOpen(false)}
              className="mt-8 font-body text-[9px] tracking-[0.45em] uppercase text-[var(--muted)] hover:text-[var(--cream-light)] transition-colors duration-200 min-h-[44px] px-4"
            >
              Cerrar
            </button>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )

  return (
    <>
      <button
        onClick={handleTap}
        className="font-display text-2xl text-[var(--muted)] italic select-none cursor-default focus:outline-none"
        aria-label="M and J"
      >
        M &amp; J
      </button>

      {typeof document !== 'undefined' && createPortal(overlay, document.body)}
    </>
  )
}
