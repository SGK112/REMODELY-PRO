import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar-clean'
import { Footer } from '@/components/layout/Footer'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'REMODELY.AI - AI-Powered Home Remodeling Platform',
  description: 'Connect with verified contractors using AI-powered matching. Get quotes, compare prices, and book trusted remodeling professionals.',
  keywords: 'home remodeling, AI contractors, kitchen remodel, bathroom renovation, countertops, flooring',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}
