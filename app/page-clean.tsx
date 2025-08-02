import Link from 'next/link'
import { Heart, Search, Users, MessageCircle, Star, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-white py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1f2937" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Find Premium <span className="text-blue-600">Stone & Surface</span>
              <br />
              <span className="text-slate-700">Contractors</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              Connect with certified professionals specializing in granite, quartz, marble, and premium countertop installations.
              Get matched with contractors who meet your project requirements and budget.
            </p>

            {/* Main CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link
                href="/matches"
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
              >
                <Heart className="w-6 h-6 mr-2" />
                Find My Contractor
              </Link>
              <Link
                href="/contractors"
                className="border-2 border-slate-300 text-slate-700 hover:border-blue-600 hover:text-blue-600 bg-white font-semibold py-4 px-8 rounded-lg text-lg transition-all flex items-center justify-center shadow-sm"
              >
                <Search className="w-6 h-6 mr-2" />
                Browse All Contractors
              </Link>
            </div>

            {/* Professional Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20">
                <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
                <div className="text-gray-600 font-medium">Verified Contractors</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20">
                <div className="text-4xl font-bold text-green-600 mb-2">98%</div>
                <div className="text-gray-600 font-medium">Customer Satisfaction</div>
              </div>
              <div className="text-center bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/20">
                <div className="text-4xl font-bold text-purple-600 mb-2">$2M+</div>
                <div className="text-gray-600 font-medium">Projects Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trusted Brands Section */}
      <div className="py-20 bg-slate-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Leading Stone & Surface Brands
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our certified contractors are authorized dealers and installers for premium brands,
              ensuring you get authentic materials with professional installation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 items-center justify-items-center">
            <div className="flex justify-center group">
              <img
                src="/brands/silestone-professional.svg"
                alt="Silestone by Cosentino - Premium Quartz Surfaces"
                className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
            <div className="flex justify-center group">
              <img
                src="/brands/caesarstone-professional.svg"
                alt="Caesarstone - Engineered Quartz Surfaces"
                className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
            <div className="flex justify-center group">
              <img
                src="/brands/cambria-professional.svg"
                alt="Cambria - Natural Quartz Surfaces"
                className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
            <div className="flex justify-center group">
              <img
                src="/brands/quartz-master-professional.svg"
                alt="Quartz Master - Engineered Stone"
                className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
            <div className="flex justify-center group">
              <img
                src="/brands/msi-stone-professional.svg"
                alt="MSI Stone - Surfaces & Tile"
                className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-all duration-300 filter grayscale group-hover:grayscale-0"
              />
            </div>
          </div>

          {/* Brand Benefits */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Authorized Dealers</h3>
              <p className="text-gray-600">All contractors are certified dealers with direct access to authentic materials</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Factory Warranties</h3>
              <p className="text-gray-600">Full manufacturer warranties on all materials and professional installation</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-600">Only the highest grade materials from industry-leading manufacturers</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How Our Professional Matching System Works
            </h2>
            <p className="text-xl text-gray-600">
              Connect with verified contractors through our streamlined matching process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Tell Us Your Needs</h3>
              <p className="text-gray-600 mb-4">Share your project details, material preferences, budget, and timeline requirements</p>
              <Link href="/signup" className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center">
                Get Started <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Get Matched</h3>
              <p className="text-gray-600 mb-4">Our algorithm connects you with pre-screened contractors who specialize in your project type</p>
              <Link href="/matches" className="text-green-600 hover:text-green-700 font-medium inline-flex items-center">
                View Matches <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Connect & Compare</h3>
              <p className="text-gray-600 mb-4">Review portfolios, chat with contractors, and request detailed project proposals</p>
              <Link href="/matches/liked" className="text-purple-600 hover:text-purple-700 font-medium inline-flex items-center">
                Start Chatting <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">4. Book Your Project</h3>
              <p className="text-gray-600 mb-4">Choose your contractor, finalize details, and schedule your premium countertop installation</p>
              <Link href="/quote" className="text-orange-600 hover:text-orange-700 font-medium inline-flex items-center">
                Get Quote <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Contractors */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Certified Contractors
            </h2>
            <p className="text-xl text-gray-600">
              Premium stone specialists with verified credentials and outstanding portfolios
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contractor 1 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&crop=face"
                  alt="Carlos Rivera"
                  className="w-14 h-14 rounded-full mr-4 border-2 border-blue-100"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Carlos Rivera</h3>
                  <p className="text-sm text-blue-600 font-medium">Desert Stone Works</p>
                  <p className="text-xs text-gray-500">Licensed • Insured • 15+ Years</p>
                </div>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold text-gray-900">4.9</span>
                  <span className="ml-2 text-gray-600 text-sm">(142 reviews)</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">Granite</span>
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">Outdoor Kitchens</span>
                  <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full">Commercial</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Master craftsman specializing in heat-resistant granite solutions and luxury outdoor kitchen installations. Arizona's premier stone contractor.
                </p>
              </div>
              <Link
                href="/matches"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg text-center block transition-all duration-200 font-medium"
              >
                View Profile & Match
              </Link>
            </div>

            {/* Contractor 2 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=60&h=60&fit=crop&crop=face"
                  alt="Amanda Foster"
                  className="w-14 h-14 rounded-full mr-4 border-2 border-blue-100"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Amanda Foster</h3>
                  <p className="text-sm text-blue-600 font-medium">Scottsdale Granite & Marble</p>
                  <p className="text-xs text-gray-500">Licensed • Insured • 12+ Years</p>
                </div>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold text-gray-900">4.8</span>
                  <span className="ml-2 text-gray-600 text-sm">(96 reviews)</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="bg-pink-100 text-pink-800 text-xs font-medium px-2 py-1 rounded-full">Marble</span>
                  <span className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded-full">Luxury Design</span>
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full">Custom Work</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Award-winning luxury stone fabrication specialist. Expert in Italian marble, exotic granite, and bespoke countertop designs for high-end homes.
                </p>
              </div>
              <Link
                href="/matches"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg text-center block transition-all duration-200 font-medium"
              >
                View Profile & Match
              </Link>
            </div>

            {/* Contractor 3 */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&crop=face"
                  alt="Rachel Kim"
                  className="w-14 h-14 rounded-full mr-4 border-2 border-blue-100"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Rachel Kim</h3>
                  <p className="text-sm text-blue-600 font-medium">Phoenix Premier Surfaces</p>
                  <p className="text-xs text-gray-500">Licensed • Insured • 18+ Years</p>
                </div>
              </div>
              <div className="flex items-center mb-3">
                <div className="flex items-center mr-4">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-semibold text-gray-900">4.9</span>
                  <span className="ml-2 text-gray-600 text-sm">(134 reviews)</span>
                </div>
              </div>
              <div className="mb-4">
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-1 rounded-full">Quartz</span>
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full">Modern Design</span>
                  <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded-full">Eco-Friendly</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Innovative modern kitchen specialist focusing on sustainable quartz installations and cutting-edge design solutions. Multiple industry awards winner.
                </p>
              </div>
              <Link
                href="/matches"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-4 rounded-lg text-center block transition-all duration-200 font-medium"
              >
                View Profile & Match
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Transform Your Space with
            <span className="block text-blue-400">Premium Stone Surfaces?</span>
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Join thousands of homeowners who've found their ideal stone contractor through our professional matching platform.
            Get connected with certified experts who deliver exceptional results.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/signup"
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              Start Your Project Today
            </Link>
            <Link
              href="/signup/contractor"
              className="border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-slate-900 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 backdrop-blur-sm"
            >
              Join as Professional Contractor
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="text-blue-400">
              <div className="text-2xl font-bold">Licensed</div>
              <div className="text-sm text-slate-400">Verified Professionals</div>
            </div>
            <div className="text-green-400">
              <div className="text-2xl font-bold">Insured</div>
              <div className="text-sm text-slate-400">Full Coverage Protection</div>
            </div>
            <div className="text-purple-400">
              <div className="text-2xl font-bold">Bonded</div>
              <div className="text-sm text-slate-400">Quality Guaranteed</div>
            </div>
            <div className="text-yellow-400">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm text-slate-400">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
