'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Brain, Eye, EyeOff, Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function SignInPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // TODO: Implement sign-in logic
        console.log('Sign-in data:', formData)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            // Redirect to dashboard or previous page
        }, 2000)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-4">
                        <div className="relative">
                            <div className="absolute inset-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl blur-lg opacity-75"></div>
                            <div className="relative w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-xl">
                                <Brain className="h-6 w-6 text-white" />
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-baseline space-x-1">
                                <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">REMODELY</span>
                                <span className="text-lg font-semibold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">.ai</span>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                    <p className="text-gray-300">Sign in to access your AI construction apps</p>
                </div>

                {/* Sign In Form */}
                <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 pr-10 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    name="rememberMe"
                                    checked={formData.rememberMe}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <span className="text-sm text-gray-300">Remember me</span>
                            </label>
                            <Link href="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none flex items-center justify-center space-x-2"
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-white/20"></div>
                        <span className="px-4 text-sm text-gray-400">or</span>
                        <div className="flex-1 border-t border-white/20"></div>
                    </div>

                    {/* Demo Access */}
                    <Link
                        href="/demo"
                        className="w-full border-2 border-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                        <span>Try Demo Access</span>
                        <ArrowRight className="w-4 h-4" />
                    </Link>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-gray-400">
                            Don't have an account?{' '}
                            <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium">
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div className="mt-8 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">What you get:</h3>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-gray-300">Access to 15+ specialized AI apps</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-gray-300">24/7 AI voice assistants</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-gray-300">Real-time calculations & measurements</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-sm text-gray-300">Enterprise-grade security</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-400">
                    <p>
                        Secure login protected by enterprise encryption
                    </p>
                </div>
            </div>
        </div>
    )
}
