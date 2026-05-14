import type { Metadata } from 'next'
import { Cormorant_Garamond, Nunito } from 'next/font/google'
import Providers from '@/app/components/Providers'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Michelle & Jose · Save the Date · January 16, 2027',
  description: 'Join us as we celebrate the wedding of Michelle Tames and Jose Picado.',
  openGraph: {
    title: 'Michelle & Jose · Save the Date',
    description: 'January 16th, 2027',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${nunito.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
