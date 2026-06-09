'use client'

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'

// Formspree endpoint — set NEXT_PUBLIC_FORMSPREE_ID in your Vercel env vars.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID
const ENDPOINT = FORMSPREE_ID ? `https://formspree.io/f/${FORMSPREE_ID}` : ''

type Status = 'idle' | 'submitting' | 'success' | 'error'

export default function DietaryForm() {
  const [name, setName] = useState('')
  const [hasRestriction, setHasRestriction] = useState<boolean | null>(null)
  const [details, setDetails] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const canSubmit =
    name.trim().length > 0 &&
    hasRestriction !== null &&
    (hasRestriction === false || details.trim().length > 0) &&
    status !== 'submitting'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    if (!ENDPOINT) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: name.trim(),
          restriccion: hasRestriction ? 'Sí' : 'No',
          detalle: hasRestriction ? details.trim() : '—',
        }),
      })
      if (res.ok) {
        setStatus('success')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <m.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 py-16 bg-[#F7F2EA]/85 backdrop-blur-[2px]"
    >
      <div className="max-w-sm mx-auto text-center">
        {/* Decorative divider */}
        <div className="flex items-center gap-3 justify-center mb-7" aria-hidden="true">
          <span className="h-px flex-1 max-w-12 bg-[var(--sage)] opacity-50" />
          <span className="w-[6px] h-[6px] border border-[var(--sage)] opacity-60 rotate-45" />
          <span className="h-px flex-1 max-w-12 bg-[var(--sage)] opacity-50" />
        </div>

        <p className="font-body text-[10px] tracking-[0.5em] uppercase text-[var(--sage)] mb-3">
          Antes del gran día
        </p>
        <p
          className="font-display font-light italic text-[var(--text)] leading-snug mb-3"
          style={{ fontSize: 'clamp(1.5rem, 7vw, 2.2rem)' }}
        >
          Restricciones alimentarias
        </p>
        <p className="font-body text-sm text-[var(--text)] opacity-70 leading-relaxed max-w-[26ch] mx-auto mb-9">
          Cuéntanos si tienes alguna alergia o restricción para cuidarte ese día.
        </p>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <m.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="py-6"
            >
              <p
                className="font-display italic text-[var(--accent)] mb-2"
                style={{ fontSize: 'clamp(1.4rem, 6vw, 1.8rem)' }}
              >
                ¡Gracias!
              </p>
              <p className="font-body text-sm text-[var(--text)] opacity-70">
                Hemos recibido tu respuesta.
              </p>
            </m.div>
          ) : (
            <m.form
              key="form"
              onSubmit={handleSubmit}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-left"
            >
              {/* Name */}
              <label className="block mb-6">
                <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[var(--sage)] block mb-2">
                  Tu nombre
                </span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-transparent border-b border-[var(--muted)] focus:border-[var(--accent)] outline-none py-2 font-body text-[var(--text)] text-base transition-colors duration-200"
                  placeholder="Nombre y apellido"
                />
              </label>

              {/* Yes / No */}
              <fieldset className="mb-6">
                <legend className="font-body text-[10px] tracking-[0.3em] uppercase text-[var(--sage)] mb-3">
                  ¿Tienes alguna restricción?
                </legend>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Sí', value: true },
                    { label: 'No', value: false },
                  ].map((opt) => {
                    const active = hasRestriction === opt.value
                    return (
                      <button
                        type="button"
                        key={opt.label}
                        onClick={() => setHasRestriction(opt.value)}
                        className={`min-h-[48px] border font-body text-[11px] tracking-[0.2em] uppercase transition-all duration-200 ${
                          active
                            ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--cream-light)]'
                            : 'border-[var(--muted)] text-[var(--text)] hover:border-[var(--accent)]'
                        }`}
                        aria-pressed={active}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
              </fieldset>

              {/* Details (only when "Sí") */}
              <AnimatePresence>
                {hasRestriction === true && (
                  <m.div
                    key="details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <label className="block mb-6">
                      <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[var(--sage)] block mb-2">
                        ¿Cuál?
                      </span>
                      <textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        rows={3}
                        className="w-full bg-transparent border border-[var(--muted)] focus:border-[var(--accent)] outline-none p-3 font-body text-[var(--text)] text-base resize-none transition-colors duration-200"
                        placeholder="Ej. alergia a los mariscos, vegetariano, sin gluten…"
                      />
                    </label>
                  </m.div>
                )}
              </AnimatePresence>

              {status === 'error' && (
                <p className="font-body text-sm text-[var(--accent)] mb-4 text-center">
                  Algo salió mal. Por favor inténtalo de nuevo.
                </p>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="w-full min-h-[52px] mt-2 border border-[var(--accent)] bg-[var(--accent)] text-[var(--cream-light)] font-body text-[11px] tracking-[0.25em] uppercase transition-all duration-200 enabled:hover:bg-transparent enabled:hover:text-[var(--accent)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Enviando…' : 'Enviar'}
              </button>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </m.section>
  )
}
