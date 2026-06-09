import Hero from '@/app/components/Hero'
import PhotoCarousel from '@/app/components/PhotoCarousel'
import CountdownTimer from '@/app/components/CountdownTimer'
import DetailsSoon from '@/app/components/DetailsSoon'
import VenueSection from '@/app/components/VenueSection'
import EasterEgg from '@/app/components/EasterEgg'
import PenguinSection from '@/app/components/PenguinSection'
import DietaryForm from '@/app/components/DietaryForm'
import MusicPlayer from '@/app/components/MusicPlayer'

export default function Home() {
  return (
    <main>
      <MusicPlayer />
      <Hero />
      <PhotoCarousel />
      <CountdownTimer />
      <DetailsSoon />
      <VenueSection />
      <DietaryForm />
      <PenguinSection />
      <footer className="py-10 text-center bg-[#F7F2EA]/85 backdrop-blur-[2px]">
        <EasterEgg />
        <p className="font-body text-[11px] tracking-[0.32em] uppercase text-[var(--text)] font-medium mt-2">
          16 de enero · 2027
        </p>
      </footer>
    </main>
  )
}
