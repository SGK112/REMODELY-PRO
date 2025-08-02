'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'request',
                    email: email.toLowerCase().trim()
                })
            })

            const data = await response.json()

            if (response.ok) {
                setSent(true)
                // Log token for development (remove in production)
                if (data.resetToken) {
                    console.log('Reset token:', data.resetToken)
                }
            } else {
                setError(data.error || 'Something went wrong')
            }
        } catch (error) {
            setError('Network error. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    if (sent) {
        return (
            <div className="min-h-screen bg-gradient-construction-hero flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow-construction rounded-2xl sm:px-10 border border-stone-200">
                        <div className="text-center">
                            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                            <h2 className="mt-4 text-2xl font-bold text-construction-heading">Check your email</h2>
                            <p className="mt-2 text-stone-600">
                                If an account with that email exists, we've sent a password reset link to:
                            </p>
                            <p className="mt-2 text-sm font-bold text-stone-900 bg-stone-100 px-4 py-2 rounded-lg">{email}</p>
                            <p className="mt-4 text-xs text-stone-500">
                                The link will expire in 15 minutes. Check your spam folder if you don't see it.
                            </p>
                        </div>

                        <div className="mt-8">
                            <Link
                                href="/auth/signin"
                                className="w-full btn-primary flex justify-center items-center py-3"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-construction-hero flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-construction-heading">
                        REMODELY<span className="text-amber-600">.AI</span>
                    </h1>
                    <h2 className="mt-6 text-2xl font-bold text-construction-heading">Forgot your password?</h2>
                    <p className="mt-2 text-stone-600">
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-construction rounded-2xl sm:px-10 border border-stone-200">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <Mail className="absolute left-3 top-3 h-5 w-5 text-stone-400" />
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 appearance-none block w-full px-3 py-3 border border-stone-300 rounded-xl placeholder-stone-400 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm transition-colors"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-xl bg-red-50 p-4 border border-red-200">
                                <p className="text-sm text-red-800">{error}</p>
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full btn-primary py-3 text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </button>
                        </div>

                        <div className="text-center">
                            <Link
                                href="/auth/signin"
                                className="text-sm text-amber-600 hover:text-amber-700 flex items-center justify-center font-medium"
                            >
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                Back to Sign In
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
