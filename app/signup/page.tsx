'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Mail, Lock, Eye, EyeOff, User, Phone, Building2, Crown, Zap, ArrowRight, Home } from 'lucide-react'

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    userType: 'CUSTOMER' // CUSTOMER or CONTRACTOR
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          userType: formData.userType
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/auth/signin?message=Registration successful! Please sign in.')
        }, 2000)
      } else {
        setError(data.error || 'Registration failed')
      }
    } catch (error) {
      setError('Network error. Please try again.')
      console.error('Registration error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Welcome to Remodely.AI!</h2>
            <p className="text-slate-600 mb-6">
              Your account has been created successfully. Redirecting to sign in...
            </p>
            <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full h-2">
              <div className="bg-white rounded-full h-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Join the Revolution</h1>
          <p className="text-slate-600">AI-powered stone surface connections</p>
        </div>

        {/* User Type Selection */}
        <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-6 mb-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">I am a...</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, userType: 'CUSTOMER' }))}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.userType === 'CUSTOMER'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <Home className="w-6 h-6 mx-auto mb-2" />
              <div className="font-medium">Homeowner</div>
              <div className="text-xs text-slate-500">Find contractors</div>
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, userType: 'CONTRACTOR' }))}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                formData.userType === 'CONTRACTOR'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <Building2 className="w-6 h-6 mx-auto mb-2" />
              <div className="font-medium">Contractor</div>
              <div className="text-xs text-slate-500">Get leads</div>
            </button>
          </div>
        </div>

        {/* Sign Up Form */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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

            {/* Phone Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  placeholder="(555) 123-4567"
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
                  placeholder="Create a password"
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

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
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
                  Create Account
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                </>
              )}
            </button>

            {/* AI Features Highlight */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center text-blue-700 mb-2">
                <Zap className="w-5 h-5 mr-2" />
                <span className="font-semibold">AI-Powered Features</span>
              </div>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Smart contractor matching</li>
                <li>• Instant quote estimates</li>
                <li>• Sarah AI voice assistant</li>
                <li>• Automated project tracking</li>
              </ul>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <span className="text-slate-600">Already have an account? </span>
            <Link href="/auth/signin" className="text-blue-600 hover:text-blue-700 font-semibold">
              Sign In
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-slate-500">
            By creating an account, you agree to our{' '}
            <Link href="/terms" className="text-blue-600 hover:text-blue-700">Terms</Link>
            {' '}&{' '}
            <Link href="/privacy" className="text-blue-600 hover:text-blue-700">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}