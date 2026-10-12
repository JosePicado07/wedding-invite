'use client'

import { useEffect, useMemo, useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { findGuest } from '@/data/guests'

// Formspree endpoint. The ID ships in the client bundle anyway (NEXT_PUBLIC),
// so we hardcode a default and let an env var override it if ever needed.
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID || 'mqeobarz'
const ENDPOINT = `https://formspree.io/f/${FORMSPREE_ID}`

type Status = 'idle' | 'submitting' | 'success' | 'error'

// Requires at least a first and last name — a single word isn't enough to
// reliably match against the guest list or to know who's actually coming.
function hasFullName(value: string): boolean {
  return value.trim().split(/\s+/).filter(Boolean).length >= 2
}

function YesNoToggle({
  legend,
  value,
  onChange,
}: {
  legend: string
  value: boolean | null
  onChange: (v: boolean) => void
}) {
  return (
    <fieldset className="mb-6">
      <legend className="font-body text-[10px] tracking-[0.3em] uppercase text-[var(--sage)] mb-3">
        {legend}
      </legend>
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Sí', value: true },
          { label: 'No', value: false },
        ].map((opt) => {
          const active = value === opt.value
          return (
            <m.button
              type="button"
              key={opt.label}
              onClick={() => onChange(opt.value)}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15 }}
              className={`min-h-[48px] border font-body text-[11px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                active
                  ? 'border-[var(--accent)] bg-[var(--accent)] text-[var(--cream-light)]'
                  : 'border-[var(--muted)] text-[var(--text)] hover:border-[var(--accent)]'
              }`}
              aria-pressed={active}
            >
              {opt.label}
            </m.button>
          )
        })}
      </div>
    </fieldset>
  )
}

export default function RsvpForm() {
  const [name, setName] = useState('')
  const [attending, setAttending] = useState<boolean | null>(null)
  const [hasCompanion, setHasCompanion] = useState<boolean | null>(null)
  const [companionName, setCompanionName] = useState('')
  const [drinksAlcohol, setDrinksAlcohol] = useState<boolean | null>(null)
  const [companionDrinksAlcohol, setCompanionDrinksAlcohol] = useState<boolean | null>(null)
  const [dietaryNotes, setDietaryNotes] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [showSlowNotice, setShowSlowNotice] = useState(false)

  // Formspree sometimes takes several seconds to respond — only reassure the
  // guest once the wait is actually noticeable, not on every fast submit.
  useEffect(() => {
    if (status !== 'submitting') {
      setShowSlowNotice(false)
      return
    }
    const timer = setTimeout(() => setShowSlowNotice(true), 2500)
    return () => clearTimeout(timer)
  }, [status])

  // Matched against the couple's guest list — unmatched names fall back to the honor system.
  const matchedGuest = useMemo(() => findGuest(name), [name])
  const companionAllowed = matchedGuest ? matchedGuest.plusOne : true

  useEffect(() => {
    if (!companionAllowed && hasCompanion !== false) {
      setHasCompanion(false)
    }
  }, [companionAllowed, hasCompanion])

  // Clearing the name should also clear whatever the guest-list match revealed —
  // otherwise a stale +1 selection can linger after the name that produced it is gone.
  useEffect(() => {
    if (name.trim().length === 0) {
      setHasCompanion(null)
      setCompanionName('')
      setCompanionDrinksAlcohol(null)
    }
  }, [name])

  const canSubmit =
    hasFullName(name) &&
    attending !== null &&
    (attending === false ||
      (hasCompanion !== null &&
        drinksAlcohol !== null &&
        (hasCompanion === false || (hasFullName(companionName) && companionDrinksAlcohol !== null)))) &&
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
          asiste: attending ? 'Sí' : 'No',
          acompanante: attending && hasCompanion ? companionName.trim() : '—',
          alcohol: attending ? (drinksAlcohol ? 'Sí' : 'No') : '—',
          alcoholAcompanante: attending && hasCompanion ? (companionDrinksAlcohol ? 'Sí' : 'No') : '—',
          notasDieteticas: attending ? dietaryNotes.trim() || '—' : '—',
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
      id="rsvp"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 py-20 bg-[#F7F2EA]/85 backdrop-blur-[2px] scroll-mt-6"
    >
      <div className="max-w-sm mx-auto">
        {/* Header, left-aligned to match the details blocks above — border continues
            the same 01→04 divider rhythm from DetailsCard into 05 */}
        <div className="flex gap-5 mb-10 pt-14 border-t border-[var(--muted)] border-opacity-25">
          <span
            className="font-display italic text-[var(--muted-ink)] leading-none flex-none pt-1"
            style={{ fontSize: '1.6rem' }}
          >
            05
          </span>
          <div className="flex-1 min-w-0 text-left">
            <h2 className="font-body text-[10px] tracking-[0.4em] uppercase text-[var(--sage)] mb-4">
              Confirma tu asistencia
            </h2>
            <p
              className="font-display font-light italic text-[var(--text)] leading-snug mb-3"
              style={{ fontSize: 'clamp(1.5rem, 7vw, 2.2rem)' }}
            >
              RSVP
            </p>
            <p className="font-body text-sm text-[var(--text)] opacity-70 leading-relaxed">
              Nos encantaría saber si nos acompañarás en este día tan especial.
            </p>
            <p className="font-body text-[11px] text-[var(--accent)] opacity-80 leading-relaxed mt-3">
              Este es un evento solo para adultos, agradecemos tu comprensión.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <m.div
              key="success"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="py-6 text-center"
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                className="mx-auto mb-4"
                aria-hidden="true"
              >
                <m.circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="var(--sage)"
                  strokeWidth="1.5"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <m.path
                  d="M7.5 12.5l3 3 6-6"
                  stroke="var(--sage)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </svg>
              <p
                className="font-display italic text-[var(--accent)] mb-2"
                style={{ fontSize: 'clamp(1.4rem, 6vw, 1.8rem)' }}
              >
                ¡Gracias!
              </p>
              <p className="font-body text-sm text-[var(--text)] opacity-70">
                Hemos recibido tu confirmación.
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
                {name.trim().length > 0 && !hasFullName(name) && (
                  <span className="font-body text-[11px] text-[var(--accent)] opacity-80 block mt-2">
                    Escribe tu nombre y apellido completos.
                  </span>
                )}
                {hasFullName(name) && !matchedGuest && (
                  <span className="font-body text-[11px] text-[var(--sage)] opacity-90 block mt-2">
                    No encontramos tu nombre en la lista de invitados, pero puedes continuar igual.
                  </span>
                )}
              </label>

              {/* Attending */}
              <YesNoToggle legend="¿Nos acompañas?" value={attending} onChange={setAttending} />

              {/* Conditional panel: companion, alcohol, dietary notes */}
              <AnimatePresence>
                {attending === true && (
                  <m.div
                    key="attending-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    {/* Alcohol — primary guest */}
                    <YesNoToggle
                      legend="¿Consumes alcohol?"
                      value={drinksAlcohol}
                      onChange={setDrinksAlcohol}
                    />

                    {/* Companion (+1) — only offered if the guest list allows it */}
                    {companionAllowed ? (
                      <YesNoToggle
                        legend="¿Asistes con acompañante (+1)?"
                        value={hasCompanion}
                        onChange={setHasCompanion}
                      />
                    ) : (
                      matchedGuest && (
                        <p className="font-body text-[11px] text-[var(--text)] opacity-50 leading-relaxed mb-6">
                          Tu invitación es individual.
                        </p>
                      )
                    )}

                    <AnimatePresence>
                      {companionAllowed && hasCompanion === true && (
                        <m.div
                          key="companion-details"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <label className="block mb-6">
                            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[var(--sage)] block mb-2">
                              Nombre de tu acompañante
                            </span>
                            <input
                              type="text"
                              value={companionName}
                              onChange={(e) => setCompanionName(e.target.value)}
                              className="w-full bg-transparent border-b border-[var(--muted)] focus:border-[var(--accent)] outline-none py-2 font-body text-[var(--text)] text-base transition-colors duration-200"
                              placeholder="Nombre y apellido"
                            />
                            {companionName.trim().length > 0 && !hasFullName(companionName) && (
                              <span className="font-body text-[11px] text-[var(--accent)] opacity-80 block mt-2">
                                Escribe su nombre y apellido completos.
                              </span>
                            )}
                          </label>

                          <YesNoToggle
                            legend="¿Tu acompañante consume alcohol?"
                            value={companionDrinksAlcohol}
                            onChange={setCompanionDrinksAlcohol}
                          />
                        </m.div>
                      )}
                    </AnimatePresence>

                    {/* Dietary notes */}
                    <label className="block mb-6">
                      <span className="font-body text-[10px] tracking-[0.3em] uppercase text-[var(--sage)] block mb-2">
                        Alergias o restricciones (opcional)
                      </span>
                      <textarea
                        value={dietaryNotes}
                        onChange={(e) => setDietaryNotes(e.target.value)}
                        rows={3}
                        className="w-full bg-transparent border border-[var(--muted)] focus:border-[var(--accent)] outline-none p-3 font-body text-[var(--text)] text-base resize-none transition-colors duration-200"
                        placeholder="Ej. alergia a los mariscos, sin gluten…"
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

              <AnimatePresence>
                {showSlowNotice && (
                  <m.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-body text-[11px] text-[var(--text)] opacity-60 mb-4 text-center"
                  >
                    Casi listo, puede tardar unos segundos…
                  </m.p>
                )}
              </AnimatePresence>

              <m.button
                type="submit"
                disabled={!canSubmit}
                whileTap={canSubmit ? { scale: 0.97 } : undefined}
                transition={{ duration: 0.15 }}
                className="w-full min-h-[52px] mt-2 border border-[var(--accent)] bg-[var(--accent)] text-[var(--cream-light)] font-body text-[11px] tracking-[0.25em] uppercase transition-colors duration-200 enabled:hover:bg-transparent enabled:hover:text-[var(--accent)] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? (
                  <m.span
                    animate={{ opacity: [1, 0.4, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    Enviando…
                  </m.span>
                ) : (
                  'Enviar'
                )}
              </m.button>
            </m.form>
          )}
        </AnimatePresence>
      </div>
    </m.section>
  )
}
