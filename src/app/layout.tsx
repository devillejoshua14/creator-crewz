import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Creator Crewz - Find & Hire Creative Talent',
  description: 'Connect with talented professionals for your content creation team. Hire editors, designers, writers, and more.',
  keywords: 'content creators, freelancers, video editing, graphic design, writing, creative talent',
  authors: [{ name: 'Creator Crewz' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  )
}
