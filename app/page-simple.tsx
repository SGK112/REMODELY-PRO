import Link from 'next/link'
import { ArrowRight, Users, Search } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            REMODELY <span className="text-blue-400">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            North America's Premier AI-Powered Construction Marketplace
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              href="/contractors"
              className="inline-flex items-center border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Find Contractors
              <Search className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <Users className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Smart Matching</h3>
            <p className="text-slate-300">
              AI-powered contractor matching based on your specific project needs
            </p>
          </div>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <Search className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Verified Professionals</h3>
            <p className="text-slate-300">
              All contractors are verified and rated by real customers
            </p>
          </div>
          <div className="bg-slate-800 p-8 rounded-xl border border-slate-700">
            <ArrowRight className="w-12 h-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-4">Fast Quotes</h3>
            <p className="text-slate-300">
              Get competitive quotes in minutes, not days
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-slate-800 p-12 rounded-xl border border-slate-700">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Join thousands of satisfied customers and contractors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Sign Up Now
            </Link>
            <Link
              href="/quote"
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
