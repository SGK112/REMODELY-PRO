'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useLocation } from '@/components/providers/LocationProvider'
import LocationRequest from '@/components/ui/LocationRequest'
import { LocationRequestCompact } from '@/components/ui/LocationRequest'

export function HeroSection() {
  const { currentLocation } = useLocation()
  const [showLocationRequest, setShowLocationRequest] = useState(true)

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white min-h-screen flex items-center">
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find the Perfect{' '}
              <span className="text-gradient">Granite Contractor</span>{' '}
              {currentLocation ? `in ${currentLocation.city}` : 'for Your Dream Kitchen'}
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Connect with verified, experienced contractors{' '}
              {currentLocation ? `in ${currentLocation.formattedAddress}` : 'in your area'}. Get multiple quotes,
              compare portfolios, and transform your space with confidence.
            </p>

            {/* Location Request */}
            {showLocationRequest && !currentLocation && (
              <div className="mb-6">
                <LocationRequest
                  onLocationReceived={() => setShowLocationRequest(false)}
                  onDismiss={() => setShowLocationRequest(false)}
                />
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link href="/quote" className="btn-primary btn-lg">
                Get Free Quotes
              </Link>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contractors" className="btn-outline btn-lg">
                  Browse Contractors
                </Link>
                {!currentLocation && (
                  <LocationRequestCompact
                    onLocationReceived={() => { }}
                    className="btn-lg"
                  />
                )}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Verified Contractors</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl lg:text-3xl font-bold text-blue-600">4.9★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-355b4e88f73b?w=600&h=400&fit=crop"
                alt="Beautiful granite kitchen countertop"
                className="rounded-2xl shadow-2xl"
              />

              {/* Floating cards */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg shadow-lg p-4 max-w-48">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-sm font-bold">✓</span>
                  </div>
                  <span className="font-semibold text-gray-900">Licensed & Insured</span>
                </div>
                <p className="text-sm text-gray-600">All contractors verified</p>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 max-w-48">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-bold">24h</span>
                  </div>
                  <span className="font-semibold text-gray-900">Quick Response</span>
                </div>
                <p className="text-sm text-gray-600">Get quotes within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
