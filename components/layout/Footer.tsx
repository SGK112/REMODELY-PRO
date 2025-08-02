'use client'

import Link from 'next/link'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Star, Shield, Award } from 'lucide-react'
import { useLocation } from '@/components/providers/LocationProvider'

export function Footer() {
  const { getPopularLocations } = useLocation()
  const popularLocations = getPopularLocations()
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              {/* Enhanced Footer Logo */}
              <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center shadow-md">
                {/* Clean "RE" monogram to match navbar */}
                <div className="text-white font-bold text-lg tracking-tight">
                  <span className="text-white">R</span>
                  <span className="text-blue-400">E</span>
                </div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">REMODELY.AI</span>
              </div>
            </div>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed text-lg">
              The AI-powered platform connecting homeowners with verified home remodeling professionals.
              Intelligent matching, quality contractors, guaranteed satisfaction.
            </p>

            {/* Enhanced Trust Indicators */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="text-center bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="flex items-center justify-center text-blue-400 mb-2">
                  <Star className="w-6 h-6 mr-1 fill-current" />
                  <span className="font-bold text-xl">4.9</span>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Average Rating</div>
              </div>
              <div className="text-center bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="flex items-center justify-center text-green-400 mb-2">
                  <Shield className="w-6 h-6 mr-1" />
                  <span className="font-bold text-xl">500+</span>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Certified Pros</div>
              </div>
              <div className="text-center bg-gray-800/50 rounded-xl p-4 backdrop-blur-sm border border-gray-700/50">
                <div className="flex items-center justify-center text-orange-400 mb-2">
                  <Award className="w-6 h-6 mr-1" />
                  <span className="font-bold text-xl">$2M+</span>
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wide">Projects Value</div>
              </div>
            </div>

            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:scale-110">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:scale-110">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-all duration-200 hover:scale-110">
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contractors" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Find Contractors</span>
                </Link>
              </li>
              <li>
                <Link href="/matches" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Smart Matching</span>
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">Get Quotes</span>
                </Link>
              </li>
              <li>
                <Link href="/signup/contractor" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">For Contractors</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors flex items-center group">
                  <span className="group-hover:translate-x-1 transition-transform">About Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-6 text-white">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
                <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="font-semibold">1-800-REMODEL</div>
                  <div className="text-sm text-gray-400">24/7 Support</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 transition-colors">
                <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="font-semibold">hello@remodely.ai</div>
                  <div className="text-sm text-gray-400">Quick Response</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="font-semibold">Nationwide Service</div>
                  <div className="text-sm text-gray-400">All 50 States</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Locations */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <h4 className="text-lg font-semibold mb-4 text-center">Popular Locations</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm">
            {popularLocations.map((location) => (
              <Link
                key={location}
                href={`/contractors?location=${encodeURIComponent(location)}`}
                className="text-gray-400 hover:text-blue-400 transition-colors py-1"
              >
                {location}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 REMODELY.AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
