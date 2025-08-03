'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ContractorSignupPage() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to the main signup page with contractor tab
        router.replace('/auth/signup?tab=contractor')
    }, [router])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Redirecting to contractor signup...</p>
            </div>
        </div>
    )
}
