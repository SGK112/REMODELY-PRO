'use client'

import { useState } from 'react'
import { Heart, X, Star, MapPin, Phone, Mail, Calendar, Users, CheckCircle, MessageCircle } from 'lucide-react'
import Link from 'next/link'

interface ContractorMatch {
  id: string
  name: string
  businessName: string
  rating: number
  reviewCount: number
  location: string
  distance: string
  specialties: string[]
  yearsExperience: number
  profileImage: string
  portfolioImages: string[]
  description: string
  priceRange: string
  availability: string
  responseTime: string
  matchScore: number
  isSaved?: boolean
}

const CONTRACTOR_MATCHES: ContractorMatch[] = [
  {
    id: '7',
    name: 'Carlos Rivera',
    businessName: 'Desert Stone Works',
    rating: 4.9,
    reviewCount: 142,
    location: 'Phoenix, AZ',
    distance: '5.2 miles',
    specialties: ['Kitchen Remodeling', 'Granite Installation', 'Outdoor Kitchens'],
    yearsExperience: 14,
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    portfolioImages: [
      'https://images.unsplash.com/photo-1556909114-4e4fa72bb41c?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1556909011-7309f48f79b6?w=300&h=200&fit=crop'
    ],
    description: 'Phoenix premier granite contractor specializing in desert-inspired designs and outdoor kitchen installations. Expert in heat-resistant stone solutions.',
    priceRange: '$$$',
    availability: 'Available in 2 weeks',
    responseTime: '< 2 hours',
    matchScore: 95
  },
  {
    id: '8',
    name: 'Amanda Foster',
    businessName: 'Scottsdale Granite & Marble',
    rating: 4.8,
    reviewCount: 96,
    location: 'Scottsdale, AZ',
    distance: '8.7 miles',
    specialties: ['Luxury Kitchen Design', 'Marble Work', 'Custom Fabrication'],
    yearsExperience: 16,
    profileImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face',
    portfolioImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=300&h=200&fit=crop'
    ],
    description: 'Luxury stone fabrication serving Scottsdale and Phoenix. Specializes in high-end residential projects with Italian marble and exotic granite.',
    priceRange: '$$$$',
    availability: 'Available now',
    responseTime: '< 1 hour',
    matchScore: 88
  },
  {
    id: '10',
    name: 'Rachel Kim',
    businessName: 'Phoenix Premier Surfaces',
    rating: 4.9,
    reviewCount: 134,
    location: 'Phoenix, AZ',
    distance: '3.4 miles',
    specialties: ['Modern Kitchen Design', 'Quartz Countertops', 'Contemporary Styling'],
    yearsExperience: 13,
    profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
    portfolioImages: [
      'https://images.unsplash.com/photo-1556909182-11c1b3d0af01?w=300&h=200&fit=crop',
      'https://images.unsplash.com/photo-1556909114-4f678e4ced90?w=300&h=200&fit=crop'
    ],
    description: 'Award-winning designer and fabricator specializing in modern, sleek kitchen designs. Expert in contemporary quartz installations and minimalist aesthetics.',
    priceRange: '$$$',
    availability: 'Available in 1 week',
    responseTime: '< 30 minutes',
    matchScore: 92
  }
]

export default function SavedContractorsPage() {
  const [contractors, setContractors] = useState(CONTRACTOR_MATCHES)
  const [showFilters, setShowFilters] = useState(false)

  const toggleSave = (id: string) => {
    setContractors(prev =>
      prev.map(contractor =>
        contractor.id === id
          ? { ...contractor, isSaved: !contractor.isSaved }
          : contractor
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Contractors</h1>
          <p className="text-gray-600">Browse contractors you've saved</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {contractors.map((contractor) => (
            <div key={contractor.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <img
                  src={contractor.profileImage}
                  alt={contractor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{contractor.name}</h3>
                  <p className="text-gray-600">{contractor.businessName}</p>
                </div>
              </div>

              <div className="flex items-center mb-2">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-700">{contractor.rating}</span>
                <span className="ml-1 text-gray-500">({contractor.reviewCount} reviews)</span>
              </div>

              <div className="flex items-center mb-4">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="ml-1 text-gray-600">{contractor.location}</span>
              </div>

              <p className="text-gray-700 mb-4 line-clamp-3">{contractor.description}</p>

              <div className="flex justify-between items-center">
                <Link
                  href={`/contractors/${contractor.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Profile
                </Link>
                <button
                  onClick={() => toggleSave(contractor.id)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <Users className="w-5 h-5 text-blue-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
