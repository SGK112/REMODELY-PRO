import './globals.css'
import { Inter } from 'next/font/google'
import { Navbar } from '@/components/layout/Navbar-clean'
import { Footer } from '@/components/layout/Footer'
import { Providers } from './providers'
import ScrollToTop from '@/components/ScrollToTop'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'REMODELY AI PRO - Professional Construction Marketplace',
  description: 'North America\'s premier AI-powered construction marketplace. Connect with verified professional contractors for commercial and residential projects. Intelligent matching, competitive pricing, guaranteed quality.',
  keywords: 'professional contractors, construction marketplace, AI contractors, commercial construction, residential renovation, kitchen remodel, bathroom renovation, countertops, flooring, REMODELY AI PRO',
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
          <ScrollToTop />
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
