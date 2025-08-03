'use client'

// Force dynamic rendering for authentication
export const dynamic = 'force-dynamic'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardRedirect() {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status === 'loading') return // Still loading

        if (!session) {
            router.push('/auth/signin')
            return
        }

        // Redirect based on user type
        if (session.user.userType === 'CONTRACTOR') {
            router.push('/dashboard/contractor')
        } else if (session.user.userType === 'CUSTOMER') {
            router.push('/dashboard/customer')
        } else if (session.user.userType === 'ADMIN') {
            router.push('/dashboard/admin')
        } else {
            router.push('/dashboard/customer') // Default fallback
        }
    }, [session, status, router])

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
