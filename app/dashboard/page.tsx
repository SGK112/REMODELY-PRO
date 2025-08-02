'use client'

// Force dynamic rendering for authentication
export const dynamic = 'force-dynamic'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useScrollNavigation } from '@/hooks/useScrollNavigation'

export default function DashboardRedirect() {
    const { data: session, status } = useSession()
    const router = useRouter()
    const { navigateTo } = useScrollNavigation()

    useEffect(() => {
        if (status === 'loading') return // Still loading

        if (!session) {
            navigateTo('/auth/signin')
            return
        }

        // Redirect based on user type
        if (session.user.userType === 'CONTRACTOR') {
            navigateTo('/dashboard/contractor')
        } else if (session.user.userType === 'CUSTOMER') {
            navigateTo('/dashboard/customer')
        } else if (session.user.userType === 'ADMIN') {
            navigateTo('/dashboard/admin')
        } else {
            navigateTo('/dashboard/customer') // Default fallback
        }
    }, [session, status, navigateTo])

    if (status === 'loading') {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Redirecting to your dashboard...</p>
            </div>
        </div>
    )
}
