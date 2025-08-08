import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from '@/components/providers/SessionProvider'
import { Header } from '@/components/navigation/header'
import { Footer } from '@/components/layout/Footer'
import { LocationProvider } from '@/components/providers/LocationProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'REMODELY.ai - AI Brains for your House',
  description: 'AI Brains for your House - Use REMODELY.ai to design, plan, manage, and execute all your remodeling and construction projects with intelligent AI-powered tools.',
  keywords: ['AI house renovation', 'smart home remodeling', 'construction AI', 'intelligent home design', 'AI brains house', 'remodeling AI', 'smart construction'],
  authors: [{ name: 'REMODELY.ai Team' }],
  creator: 'REMODELY.ai',
  publisher: 'REMODELY.ai',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/favicon.ico',
        sizes: '16x16',
        type: 'image/x-icon',
      }
    ],
    apple: [
      {
        url: '/favicon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
      }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://remodely.ai',
    title: 'Remodely.AI - AI-Powered Home Renovation',
    description: 'Transform your home with AI-powered contractor matching and voice consultations.',
    siteName: 'Remodely.AI',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Remodely.AI - AI-Powered Home Renovation',
    description: 'Transform your home with AI-powered contractor matching and voice consultations.',
    creator: '@RemodelyAI',
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="16x16" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          <LocationProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </LocationProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
