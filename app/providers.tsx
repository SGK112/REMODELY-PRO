'use client'

import { SessionProvider } from 'next-auth/react'
import { LocationProvider } from '@/components/providers/LocationProvider'
import { useState } from 'react'

export function Providers({
  children,
  session
}: {
  children: React.ReactNode
  session?: any
}) {
  return (
    <SessionProvider session={session}>
      <LocationProvider>
        {children}
      </LocationProvider>
    </SessionProvider>
  )
}
