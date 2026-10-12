'use client'

import { m } from 'framer-motion'
import { dressCode, accommodations, gifts, menu } from '@/data/invitation'

function DetailBlock({
  index,
  eyebrow,
  first,
  children,
}: {
  index: number
  eyebrow: string
  first?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={`flex gap-5 ${first ? '' : 'mt-14 pt-14 border-t border-[var(--muted)] border-opacity-25'}`}
    >
      <span
        className="font-display italic text-[var(--muted-ink)] leading-none flex-none pt-1"
        style={{ fontSize: '1.6rem' }}
      >
        0{index}
      </span>
      <div className="flex-1 min-w-0 text-left">
        <h2 className="font-body text-[10px] tracking-[0.4em] uppercase text-[var(--sage)] mb-4">
          {eyebrow}
        </h2>
        {children}
      </div>
    </div>
  )
}

const swatchContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const swatchItem = {
  hidden: { opacity: 0, scale: 0.6 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
}

function ColorRow({ colors, forbidden }: { colors: { name: string; hex: string }[]; forbidden?: boolean }) {
  return (
    <m.div
      variants={swatchContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-20px' }}
      className="flex flex-wrap gap-3"
    >
      {colors.map((c) => (
        <m.div variants={swatchItem} key={c.hex} className="flex items-center gap-2">
          <span
            className="relative w-5 h-5 rounded-full border border-[var(--text)]/15 flex-none"
            style={{ backgroundColor: c.hex }}
            aria-hidden="true"
          >
            {forbidden && (
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    'linear-gradient(to top right, transparent 46%, var(--accent) 46%, var(--accent) 54%, transparent 54%)',
                }}
              />
            )}
          </span>
          <span className="font-body text-[11px] text-[var(--text)] opacity-70">{c.name}</span>
        </m.div>
      ))}
    </m.div>
  )
}

export default function DetailsCard() {
  return (
    <m.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className="px-6 py-24 bg-[#F7F2EA]/85 backdrop-blur-[2px]"
    >
      <div className="max-w-sm mx-auto">
        <DetailBlock index={1} eyebrow="Código de vestimenta" first>
          <p
            className="font-display font-light italic text-[var(--text)] leading-snug mb-6"
            style={{ fontSize: 'clamp(1.6rem, 7vw, 2rem)' }}
          >
            {dressCode.headline}
          </p>

          <div className="flex flex-col gap-5">
            {dressCode.groups.map((group) => (
              <div key={group.name}>
                <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[var(--muted-ink)] mb-2">
                  {group.name}
                </p>
                <ColorRow colors={group.colors} />
              </div>
            ))}
          </div>

          <p className="font-body text-[11px] text-[var(--text)] opacity-60 leading-relaxed mt-6">
            {dressCode.note}
          </p>

          <div className="mt-6 pl-3 border-l border-[var(--accent)] border-opacity-40">
            <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
              {dressCode.forbidden.headline}
            </p>
            <ColorRow colors={dressCode.forbidden.colors} forbidden />
          </div>
        </DetailBlock>

        <DetailBlock index={2} eyebrow={menu.headline}>
          <ul className="flex flex-col gap-2 mb-5">
            {menu.dishes.map((dish) => (
              <li
                key={dish}
                className="font-display font-light italic text-[var(--text)] leading-snug"
                style={{ fontSize: 'clamp(1.05rem, 4.2vw, 1.25rem)' }}
              >
                {dish}
              </li>
            ))}
          </ul>

          <div className="mb-5">
            <p className="font-body text-[9px] tracking-[0.2em] uppercase text-[var(--muted-ink)] mb-2">
              {menu.dessert.label}
            </p>
            <p
              className="font-display font-light italic text-[var(--text)] leading-snug"
              style={{ fontSize: 'clamp(1.05rem, 4.2vw, 1.25rem)' }}
            >
              <a
                href={menu.dessert.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-[var(--muted)] decoration-1 underline-offset-4 hover:decoration-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
              >
                {menu.dessert.name}
              </a>
              <span className="font-body not-italic text-sm text-[var(--text)] opacity-60">
                {' '}
                ({menu.dessert.detail})
              </span>
            </p>
          </div>

          <p className="font-body text-[11px] text-[var(--text)] opacity-60 leading-relaxed">
            {menu.note}
          </p>
        </DetailBlock>

        <DetailBlock index={3} eyebrow={accommodations.headline}>
          <p className="font-body text-sm text-[var(--text)] opacity-70 leading-relaxed">
            {accommodations.body}
          </p>

          <ul className="mt-5 flex flex-col gap-4">
            {accommodations.options.map((option) => (
              <li key={option.url}>
                <a
                  href={option.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-[var(--text)] underline decoration-[var(--muted)] decoration-1 underline-offset-4 hover:decoration-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                >
                  {option.name}
                </a>
                <p className="font-body text-[11px] text-[var(--text)] opacity-60 mt-1">
                  {option.detail}
                </p>
              </li>
            ))}
          </ul>
        </DetailBlock>

        <DetailBlock index={4} eyebrow={gifts.headline}>
          <p className="font-body text-sm text-[var(--text)] opacity-70 leading-relaxed">
            {gifts.body}
          </p>
        </DetailBlock>
      </div>
    </m.section>
  )
}
