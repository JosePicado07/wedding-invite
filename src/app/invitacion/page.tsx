import type { Metadata } from 'next'
import InviteHero from '@/app/components/InviteHero'
import IllustrationDivider from '@/app/components/IllustrationDivider'
import CouplePhoto from '@/app/components/CouplePhoto'
import VenueSection from '@/app/components/VenueSection'
import SectionSeam from '@/app/components/SectionSeam'
import ScheduleSection from '@/app/components/ScheduleSection'
import DetailsCard from '@/app/components/DetailsCard'
import RsvpForm from '@/app/components/RsvpForm'
import EasterEgg from '@/app/components/EasterEgg'
import { venue } from '@/data/invitation'

export const metadata: Metadata = {
  title: 'Michelle & Jose · Invitación de Boda · 16 de enero, 2027',
  description: 'Nos encantaría que nos acompañes a celebrar el matrimonio de Michelle Tames y Jose Picado.',
  openGraph: {
    title: 'Michelle & Jose · Invitación de Boda',
    description: '16 de enero de 2027 · Woodlands',
    type: 'website',
  },
}

export default function Invitacion() {
  return (
    <main>
      <InviteHero />

      <IllustrationDivider
        src="/assets/illustration-gate.png"
        alt="Ilustración del portón de entrada de Woodlands"
        width={1200}
        height={896}
        eyebrow="La llegada"
        caption="Cruza este portón y sé parte de nuestra historia."
      />

      <CouplePhoto />

      <IllustrationDivider
        src="/assets/illustration-gazebo.png"
        alt="Ilustración de la glorieta donde será la ceremonia"
        width={896}
        height={1200}
        eyebrow="La ceremonia"
        caption="Bajo esta glorieta nos diremos que sí, para siempre."
      />

      <VenueSection time={venue.time} fadeIn={false} />
      <SectionSeam />
      <ScheduleSection />

      <IllustrationDivider
        src="/assets/illustration-firepit.png"
        alt="Ilustración de la fogata para el cierre de la noche"
        width={1200}
        height={896}
        eyebrow="La noche"
        caption="Y cuando caiga la noche, seguiremos celebrando junto al fuego."
      />

      <DetailsCard />
      <RsvpForm />
      <footer className="py-10 text-center bg-[#F7F2EA]/85 backdrop-blur-[2px]">
        <img
          src="/assets/bunny.gif"
          alt=""
          aria-hidden="true"
          className="w-40 h-40 object-contain mx-auto mb-4"
        />
        <EasterEgg />
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-[var(--text)] font-medium mt-2">
          16 de enero · 2027
        </p>
      </footer>
    </main>
  )
}
