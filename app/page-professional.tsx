import Link from 'next/link'
import { Hammer, Home, PhoneCall, Award, Shield, Star } from 'lucide-react'

export default function HomeProfessional() {
  return (
    <main className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Header */}
      <header className="w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center text-2xl font-bold text-gray-900">
              <Hammer className="w-7 h-7 text-yellow-600 mr-2" />
              RemodelyPro
            </span>
            <span className="text-base font-medium text-yellow-700">Construction Marketplace</span>
          </div>
          <nav className="flex space-x-6">
            <Link href="/contractors" className="text-gray-700 hover:text-yellow-700 font-semibold">Find Contractors</Link>
            <Link href="/quote" className="text-gray-700 hover:text-yellow-700 font-semibold">Get a Quote</Link>
            <Link href="/signin" className="text-gray-700 hover:text-yellow-700 font-semibold">Sign In</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900">
            Build With Confidence
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            RemodelyPro connects homeowners with top-rated, verified construction professionals. Get instant quotes, compare contractors, and manage your project all in one place.
          </p>
          <div className="flex space-x-4">
            <Link href="/quote" className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-6 py-3 rounded-lg shadow">
              Get a Free Quote
            </Link>
            <Link href="/contractors" className="bg-white border border-yellow-600 text-yellow-700 font-bold px-6 py-3 rounded-lg shadow hover:bg-yellow-50">
              Browse Contractors
            </Link>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <img src="/construction-landing.jpg" alt="Construction site" className="rounded-xl shadow-lg w-full max-w-md object-cover" />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Why RemodelyPro?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center text-center">
              <Shield className="w-10 h-10 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Verified Pros</h3>
              <p className="text-gray-600">All contractors are background-checked and ROC-licensed for your peace of mind.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center text-center">
              <Star className="w-10 h-10 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Top Ratings</h3>
              <p className="text-gray-600">See real reviews and ratings from homeowners. Choose the best for your project.</p>
            </div>
            <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center text-center">
              <Award className="w-10 h-10 text-yellow-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Award-Winning Service</h3>
              <p className="text-gray-600">RemodelyPro is trusted by thousands for fast, reliable construction solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-yellow-600 py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Project?</h2>
          <p className="text-lg text-yellow-100 mb-8">Get matched with the best contractors and manage your remodel with ease.</p>
          <Link href="/quote" className="bg-white text-yellow-700 font-bold px-8 py-4 rounded-lg shadow hover:bg-yellow-50">
            Get Your Free Quote
          </Link>
        </div>
      </section>

      {/* Contact Section */}
      <footer className="bg-gray-900 py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between text-gray-100">
          <div className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-yellow-600" />
            <span className="font-bold text-lg">RemodelyPro</span>
          </div>
          <div className="flex items-center space-x-4">
            <PhoneCall className="w-5 h-5 text-yellow-400" />
            <span>Contact: <a href="tel:+16028337194" className="underline">(602) 833-7194</a></span>
          </div>
          <div className="text-sm text-gray-400">© {new Date().getFullYear()} RemodelyPro. All rights reserved.</div>
        </div>
      </footer>
    </main>
  )
}
