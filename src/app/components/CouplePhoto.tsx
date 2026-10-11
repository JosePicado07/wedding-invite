'use client'

import Image from 'next/image'
import { m } from 'framer-motion'
import { ourStory } from '@/data/invitation'

function Divider() {
  return (
    <div className="flex items-center gap-4 my-6">
      <span className="h-px flex-1 bg-[var(--muted)] opacity-40" />
      <span className="w-[6px] h-[6px] border border-[var(--muted)] opacity-60 rotate-45 flex-none" />
      <span className="h-px flex-1 bg-[var(--muted)] opacity-40" />
    </div>
  )
}

export default function CouplePhoto() {
  return (
    <m.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="relative px-6 py-20 bg-[#F7F2EA]/85 backdrop-blur-[2px]"
    >
      <div className="max-w-sm mx-auto">
        <h2 className="sr-only">Michelle y Jose</h2>
        <div className="relative w-full aspect-[4/5] overflow-hidden">
          <Image
            src="/assets/photo-cake.jpg"
            alt="Michelle y Jose"
            fill
            sizes="(max-width: 400px) 90vw, 380px"
            className="object-cover"
            priority={false}
          />
        </div>

        <div className="mt-8">
          <Divider />

          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-[var(--sage)] text-center mb-3">
            {ourStory.wedding.label}
          </p>
          <p className="font-display italic text-[var(--text)] opacity-70 leading-snug text-center max-w-[28ch] mx-auto text-balance">
            {ourStory.wedding.text}
          </p>

          <Divider />

          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-[var(--sage)] text-center mb-3">
            {ourStory.proposal.label}
          </p>
          <p className="font-display italic text-[var(--text)] opacity-70 leading-snug text-center max-w-[28ch] mx-auto text-balance">
            {ourStory.proposal.text}
          </p>

          <div className="relative w-full aspect-[4/5] overflow-hidden mt-8">
            <Image
              src="/assets/photo-proposal.jpg"
              alt="El compromiso"
              fill
              sizes="(max-width: 400px) 90vw, 380px"
              className="object-cover"
              priority={false}
            />
          </div>
        </div>
      </div>
    </m.section>
  )
}
