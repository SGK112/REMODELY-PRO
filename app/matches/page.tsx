'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Star, MapPin, Phone, Mail, CheckCircle, Clock, User } from 'lucide-react'

interface Contractor {
  id: string
  name: string
  businessName: string
  rating: number
  reviewCount: number
  location: string
  distance: string
  specialties: string[]
  profileImage: string
  portfolioImages: string[]
  description: string
  verified: boolean
  phone: string
  email: string
  priceRange: string
  matchScore: number
  responseTime: string
  completedProjects: number
}

const MOCK_MATCHES: Contractor[] = [
  {
    id: '1',
    name: 'Michael Rodriguez',
    businessName: 'Rodriguez Granite Works',
    rating: 4.9,
    reviewCount: 127,
    location: 'Austin, TX',
    distance: '2.3 miles',
    specialties: ['Kitchen Remodeling', 'Granite Installation', 'Quartz Countertops'],
    profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    portfolioImages: [
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f3bda3dd4b3f?w=300&h=200&fit=crop'
    ],
    description: 'Specializing in premium granite and quartz installations with over 15 years of experience.',
    verified: true,
    phone: '(512) 555-0123',
    email: 'info@rodriguezgranite.com',
    priceRange: '$$$',
    matchScore: 98,
    responseTime: '< 2 hours',
    completedProjects: 340
  },
  {
    id: '2',
    name: 'Sarah Chen',
    businessName: 'Precision Stone Solutions',
    rating: 4.8,
    reviewCount: 89,
    location: 'Austin, TX',
    distance: '3.7 miles',
    specialties: ['Bathroom Remodeling', 'Custom Fabrication', 'Natural Stone'],
    profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b367?w=150&h=150&fit=crop&crop=face',
    portfolioImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=300&h=200&fit=crop'
    ],
    description: 'Award-winning stone fabrication and installation with precise attention to detail.',
    verified: true,
    phone: '(512) 555-0456',
    email: 'sarah@precisionstone.com',
    priceRange: '$$$$',
    matchScore: 95,
    responseTime: '< 1 hour',
    completedProjects: 215
  },
  {
    id: '3',
    name: 'David Thompson',
    businessName: 'Hill Country Granite',
    rating: 4.7,
    reviewCount: 156,
    location: 'Cedar Park, TX',
    distance: '8.1 miles',
    specialties: ['Kitchen Remodeling', 'Granite Installation', 'Marble Work'],
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    portfolioImages: [
      'https://images.unsplash.com/photo-1556909114-4e4fa72bb41c?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1556909011-7309f48f79b6?w=300&h=200&fit=crop'
    ],
    description: 'Two decades of experience in premium stone installation serving the greater Austin area.',
    verified: true,
    phone: '(512) 555-0789',
    email: 'david@hillcountrygranite.com',
    priceRange: '$$$',
    matchScore: 92,
    responseTime: '< 3 hours',
    completedProjects: 445
  }
]

export default function MatchesPage() {
  const [matches, setMatches] = useState(MOCK_MATCHES)
  const [savedContractors, setSavedContractors] = useState<string[]>([])

  const toggleSave = (contractorId: string) => {
    setSavedContractors(prev => 
      prev.includes(contractorId) 
        ? prev.filter(id => id !== contractorId)
        : [...prev, contractorId]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Perfect Contractor Matches
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based on your project requirements, location, and preferences, we've found the best contractors for you
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Match Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{matches.length}</div>
            <div className="text-gray-600">Perfect Matches</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
            <div className="text-gray-600">Average Match Score</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">&lt; 2hrs</div>
            <div className="text-gray-600">Average Response Time</div>
          </div>
        </div>

        {/* Contractor Matches */}
        <div className="space-y-6">
          {matches.map((contractor) => (
            <div key={contractor.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                {/* Match Score Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {contractor.matchScore}% Match
                    </div>
                    {contractor.verified && (
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => toggleSave(contractor.id)}
                    className={`p-2 rounded-full transition-colors ${
                      savedContractors.includes(contractor.id)
                        ? 'bg-red-100 text-red-600'
                        : 'bg-gray-100 text-gray-400 hover:text-red-600'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${savedContractors.includes(contractor.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Contractor Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={contractor.profileImage}
                        alt={contractor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{contractor.businessName}</h3>
                        <p className="text-gray-600">{contractor.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {contractor.location} • {contractor.distance}
                          </div>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                            {contractor.rating} ({contractor.reviewCount} reviews)
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{contractor.description}</p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {contractor.specialties.map(specialty => (
                        <span
                          key={specialty}
                          className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="font-semibold text-gray-900">{contractor.completedProjects}</div>
                        <div className="text-sm text-gray-600">Projects</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="font-semibold text-gray-900">{contractor.responseTime}</div>
                        <div className="text-sm text-gray-600">Response</div>
                      </div>
                      <div className="text-center bg-gray-50 rounded-lg p-3">
                        <div className="font-semibold text-gray-900">{contractor.priceRange}</div>
                        <div className="text-sm text-gray-600">Price Range</div>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Preview */}
                  <div className="md:w-80">
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {contractor.portfolioImages.map((image, idx) => (
                        <img
                          key={idx}
                          src={image}
                          alt="Portfolio"
                          className="w-full h-24 rounded-lg object-cover"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <Link
                    href={`/contractors/${contractor.id}`}
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors text-center font-medium"
                  >
                    View Full Profile
                  </Link>
                  <Link
                    href={`/quote?contractor=${contractor.id}`}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                  >
                    Request Quote
                  </Link>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${contractor.phone}`}
                      className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                    </a>
                    <a
                      href={`mailto:${contractor.email}`}
                      className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Need More Options?</h3>
            <p className="text-gray-600 mb-6">
              Browse our full directory of verified contractors or refine your search criteria
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contractors"
                className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Browse All Contractors
              </Link>
              <Link
                href="/quote"
                className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                Update Preferences
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
