'use client'

import { Suspense, useState, useEffect } from 'react'
import { signIn, getSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, Crown, ArrowRight, Zap, Building2, Home } from 'lucide-react'

function SignInForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const message = searchParams?.get('message')
    if (message) {
      // Show success message if coming from registration
      const messageElement = document.createElement('div')
      messageElement.className = 'fixed top-4 right-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl shadow-lg z-50'
      messageElement.textContent = message
      document.body.appendChild(messageElement)
      setTimeout(() => messageElement.remove(), 5000)
    }
  }, [searchParams])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        setError('Invalid email or password')
      } else {
        // Get the session to determine user type and redirect accordingly
        const session = await getSession()
        
        if (session?.user?.userType === 'CONTRACTOR') {
          router.push('/dashboard/contractor')
        } else if (session?.user?.userType === 'ADMIN') {
          router.push('/dashboard/admin')
        } else {
          router.push('/dashboard/customer')
        }
      }
    } catch (error) {
      console.error('Sign in error:', error)
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-2xl font-bold text-slate-800 mb-6">
            <Crown className="w-8 h-8 text-blue-600 mr-2" />
            Remodely.AI
          </Link>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h1>
          <p className="text-slate-600">Sign in to your AI-powered account</p>
        </div>

        {/* Quick Access Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/60 backdrop-blur-lg rounded-xl border border-white/20 p-4 text-center">
            <Home className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-slate-700">Homeowners</div>
            <div className="text-xs text-slate-500">Find contractors</div>
          </div>
          <div className="bg-white/60 backdrop-blur-lg rounded-xl border border-white/20 p-4 text-center">
            <Building2 className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
            <div className="text-sm font-medium text-slate-700">Contractors</div>
            <div className="text-xs text-slate-500">Grow your business</div>
          </div>
        </div>

        {/* Sign In Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-slate-700">
                  Remember me
                </label>
              </div>
              <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </Link>
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>

            {/* AI Features Highlight */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center text-blue-700 mb-2">
                <Zap className="w-5 h-5 mr-2" />
                <span className="font-semibold">Welcome to the Future</span>
              </div>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• AI-powered contractor matching</li>
                <li>• Instant voice quotes with Sarah AI</li>
                <li>• Smart project management</li>
                <li>• Predictive pricing analytics</li>
              </ul>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <span className="text-slate-600">Don't have an account? </span>
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
              Create Account
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">Terms</Link>
            {' '}&{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <SignInForm />
    </Suspense>
  )
}
