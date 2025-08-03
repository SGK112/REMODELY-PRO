'use client'

import Link from 'next/link'
import { ArrowLeft, Crown, Check, Star } from 'lucide-react'

export default function UpgradePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Crown className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white mb-4">
              Upgrade to <span className="text-amber-400">REMODELY PRO</span>
            </h1>
            <p className="text-xl text-slate-300">
              Unlock premium features and grow your business faster
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="bg-slate-800 rounded-xl p-8 border border-slate-700">
              <h3 className="text-2xl font-bold text-white mb-4">Free Plan</h3>
              <div className="text-3xl font-bold text-white mb-6">
                $0<span className="text-lg text-slate-400">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Basic contractor matching
                </li>
                <li className="flex items-center text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Up to 3 quotes per month
                </li>
                <li className="flex items-center text-slate-300">
                  <Check className="w-5 h-5 text-green-400 mr-3" />
                  Standard support
                </li>
              </ul>
              <Link
                href="/auth/signup"
                className="block w-full bg-slate-700 text-white py-3 px-6 rounded-lg text-center font-semibold hover:bg-slate-600 transition-colors"
              >
                Get Started Free
              </Link>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-xl p-8 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-white text-amber-600 px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Pro Plan</h3>
              <div className="text-3xl font-bold text-white mb-6">
                $29<span className="text-lg text-amber-200">/month</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 text-amber-200 mr-3" />
                  AI-powered smart matching
                </li>
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 text-amber-200 mr-3" />
                  Unlimited quotes
                </li>
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 text-amber-200 mr-3" />
                  Priority support
                </li>
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 text-amber-200 mr-3" />
                  Advanced analytics
                </li>
                <li className="flex items-center text-white">
                  <Check className="w-5 h-5 text-amber-200 mr-3" />
                  Premium contractor network
                </li>
              </ul>
              <button className="block w-full bg-white text-amber-600 py-3 px-6 rounded-lg text-center font-semibold hover:bg-amber-50 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex items-center justify-center mb-4">
              <Star className="w-5 h-5 text-amber-400" />
              <Star className="w-5 h-5 text-amber-400" />
              <Star className="w-5 h-5 text-amber-400" />
              <Star className="w-5 h-5 text-amber-400" />
              <Star className="w-5 h-5 text-amber-400" />
            </div>
            <p className="text-slate-300">
              Trusted by over 10,000+ contractors and homeowners
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
