'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { LocationProvider } from '@/components/providers/LocationProvider'
import { useState } from 'react'

export function Providers({
  children,
  session
}: {
  children: React.ReactNode
  session?: any
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
        retry: false, // Disable retries during SSR
      },
    },
  }))

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <LocationProvider>
          {children}
        </LocationProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}
