import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Erstiwoche 2025 | Hochschule Niederrhein',
  description: 'Willkommen zur Erstiwoche 2025! Melde dich für spannende Veranstaltungen an und lerne deine Kommilitonen kennen.',
  keywords: ['Erstiwoche', 'Hochschule Niederrhein', 'Erstsemester', 'Studium', 'Veranstaltungen'],
  authors: [{ name: 'Hochschule Niederrhein' }],
  creator: 'Hochschule Niederrhein',
  publisher: 'Hochschule Niederrhein',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Erstiwoche 2025 | Hochschule Niederrhein',
    description: 'Willkommen zur Erstiwoche 2025! Melde dich für spannende Veranstaltungen an und lerne deine Kommilitonen kennen.',
    url: '/',
    siteName: 'Erstiwoche 2025',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Erstiwoche 2025',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Erstiwoche 2025 | Hochschule Niederrhein',
    description: 'Willkommen zur Erstiwoche 2025! Melde dich für spannende Veranstaltungen an und lerne deine Kommilitonen kennen.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f97316" />
        <meta name="msapplication-TileColor" content="#f97316" />
        <meta name="theme-color" content="#f97316" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
