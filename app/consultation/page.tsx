'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

export default function ConsultationRedirect() {
    const router = useRouter()

    useEffect(() => {
        // Redirect to the actual voice consultation page
        router.replace('/voice-consultation')
    }, [router])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
            <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400 mx-auto mb-4" />
                <p className="text-white">Redirecting to consultation...</p>
            </div>
        </div>
    )
}
