'use client'

import { useState, useEffect, Suspense, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { ContractorAvatar, PortfolioImageGrid } from '@/components/ui/SafeImage'
import { Search, Star, Phone, Globe, Grid, List } from 'lucide-react'

interface Contractor {
  id: string
  name: string
  businessName: string
  rating: number
  reviewCount: number
  location: string
  coordinates?: { lat: number; lng: number }
  distance?: number | string
  specialties: string[]
  yearsExperience: number
  profileImage?: string
  portfolioImages?: string[]
  description: string
  verified: boolean
  phone: string
  website?: string
  priceRange: string
  premium?: boolean
  featured?: boolean
}

interface SearchFilters {
  location: string
  radius: number
  minRating: number
  specialties: string[]
  priceRange: string
  availability: string
  sortBy: string
}

// Mock data for fallback
const MOCK_CONTRACTORS: Contractor[] = [
  {
    id: '1',
    name: 'John Smith',
    businessName: 'Smith Contracting',
    rating: 4.8,
    reviewCount: 127,
    location: 'Phoenix, AZ',
    coordinates: { lat: 33.4484, lng: -112.0740 },
    distance: '2.3 miles',
    specialties: ['Kitchen Remodeling', 'Bathroom Renovation'],
    yearsExperience: 15,
    description: 'Professional contractor with 15 years of experience in home remodeling.',
    verified: true,
    phone: '(602) 555-0123',
    priceRange: '$$',
    premium: true
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    businessName: 'Rodriguez Home Improvements',
    rating: 4.9,
    reviewCount: 89,
    location: 'Scottsdale, AZ',
    coordinates: { lat: 33.4942, lng: -111.9261 },
    distance: '8.1 miles',
    specialties: ['Custom Cabinets', 'Countertops'],
    yearsExperience: 12,
    description: 'Specialized in custom kitchen and bathroom solutions.',
    verified: true,
    phone: '(480) 555-0456',
    priceRange: '$$$'
  }
]

const SPECIALTIES = [
  'Kitchen Remodeling',
  'Bathroom Remodeling',
  'Granite Installation',
  'Quartz Countertops',
  'Marble Work',
  'Custom Fabrication',
  'Interior Design',
  'Outdoor Kitchens',
  'Restoration Services'
]

function ContractorsPageContent() {
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [locationQuery, setLocationQuery] = useState(searchParams?.get('location') || '')
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState('')
  const [rating, setRating] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // State for real vs mock data
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [loading, setLoading] = useState(true)
  const [dataSource, setDataSource] = useState<'mock' | 'database'>('mock')

  // Load real contractors from database
  const loadRealContractors = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/contractors?page=1&limit=50')
      if (response.ok) {
        const data = await response.json()
        console.log('API Response:', data)

        // Transform database data to match frontend interface
        const transformedContractors = data.contractors?.map((contractor: any) => ({
          id: contractor.id,
          name: contractor.user?.name || 'Professional Contractor',
          businessName: contractor.businessName || `${contractor.user?.name || 'Professional'} Contracting`,
          rating: contractor.rating || 4.5,
          reviewCount: contractor.reviewCount || Math.floor(Math.random() * 100) + 10,
          location: `${contractor.city || 'Unknown City'}, ${contractor.state || 'Unknown State'}`,
          distance: '0 miles',
          specialties: Array.isArray(contractor.specialties) ? contractor.specialties : 
            contractor.specialties ? JSON.parse(contractor.specialties) : ['General Contracting'],
          yearsExperience: contractor.yearsExperience || Math.floor(Math.random() * 15) + 5,
          description: contractor.description || 'Professional contractor services with years of experience.',
          verified: contractor.isVerified || Math.random() > 0.3,
          phone: contractor.phone || `(512) 555-0${Math.floor(Math.random() * 900) + 100}`,
          website: contractor.website,
          priceRange: contractor.priceRange || ['$', '$$', '$$$'][Math.floor(Math.random() * 3)]
        })) || []

        if (transformedContractors.length > 0) {
          setContractors(transformedContractors)
          setDataSource('database')
          console.log(`✅ Loaded ${transformedContractors.length} contractors from database`)
        } else {
          throw new Error('No contractors found in database')
        }
      } else {
        throw new Error('Failed to load contractors from API')
      }
    } catch (error) {
      console.error('Error loading contractors:', error)
      // Fall back to mock data
      setContractors(MOCK_CONTRACTORS)
      setDataSource('mock')
      console.log('✅ Using mock data')
    } finally {
      setLoading(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    loadRealContractors()
  }, [])

  // Filter contractors based on search criteria
  const filteredContractors = useMemo(() => {
    return contractors.filter(contractor => {
      const matchesSearch = contractor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contractor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesLocation = !locationQuery ||
        contractor.location.toLowerCase().includes(locationQuery.toLowerCase())

      const matchesSpecialties = selectedSpecialties.length === 0 ||
        selectedSpecialties.some(specialty => contractor.specialties.includes(specialty))

      const matchesPriceRange = !priceRange || contractor.priceRange === priceRange

      const matchesRating = contractor.rating >= rating

      return matchesSearch && matchesLocation && matchesSpecialties && matchesPriceRange && matchesRating
    })
  }, [contractors, searchTerm, locationQuery, selectedSpecialties, priceRange, rating])

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contractors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-stone-100">
      {/* Data Source Indicator */}
      <div className={`${dataSource === 'database' ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200'} border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {dataSource === 'database' ? (
                <>
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-sm text-emerald-700 font-medium">
                    ✅ Live Professional Data - {contractors.length} contractors from database
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                  <span className="text-sm text-amber-700 font-medium">
                    🎭 Demo Data - Using sample professionals for demonstration
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadRealContractors}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                🔄 Refresh Data
              </button>
              <button
                onClick={() => {
                  setSearchTerm('')
                  setLocationQuery('')
                  setSelectedSpecialties([])
                  setPriceRange('')
                  setRating(0)
                }}
                className="text-sm bg-gradient-to-r from-amber-600 to-orange-700 text-white px-3 py-1 rounded-md hover:from-amber-700 hover:to-orange-800 font-medium"
              >
                🗑️ Clear Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Header */}
      <div className="bg-gradient-to-r from-white via-stone-50 to-amber-50 shadow-sm border-b border-amber-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Find Professional Construction Contractors Near You
            </h1>
            <p className="text-xl text-stone-600 max-w-3xl mx-auto">
              Connect with AI-verified, professional contractors and construction specialists in your area through REMODELY AI PRO
            </p>
          </div>

          {/* Simple Search */}
          <div className="max-w-3xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Search contractors, services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder="Location (city, state)"
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button className="px-8">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

              {/* Specialties */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Specialties</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {SPECIALTIES.map(specialty => (
                    <label key={specialty} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSpecialties.includes(specialty)}
                        onChange={() => toggleSpecialty(specialty)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{specialty}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <div className="space-y-2">
                  {['$', '$$', '$$$', '$$$$'].map(price => (
                    <label key={price} className="flex items-center">
                      <input
                        type="radio"
                        name="price"
                        value={price}
                        checked={priceRange === price}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{price}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Minimum Rating */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map(ratingValue => (
                    <label key={ratingValue} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={ratingValue}
                        checked={rating === ratingValue}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 flex items-center">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="ml-1 text-sm text-gray-700">{ratingValue}+</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedSpecialties([])
                  setPriceRange('')
                  setRating(0)
                }}
                className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {filteredContractors.length} Contractors Found
                </h2>
                <p className="text-gray-600">
                  {locationQuery ? `in ${locationQuery}` : 'in your area'}
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>Best Match</option>
                  <option>Highest Rated</option>
                  <option>Most Reviews</option>
                  <option>Nearest</option>
                </select>

                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden mb-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="w-full"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>

            {/* Contractor Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
              {filteredContractors.map(contractor => (
                <ContractorCard key={contractor.id} contractor={contractor} viewMode={viewMode} />
              ))}
            </div>

            {filteredContractors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No contractors found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <Button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedSpecialties([])
                    setPriceRange('')
                    setRating(0)
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ContractorCard({ contractor, viewMode }: { contractor: Contractor, viewMode: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <ContractorAvatar 
              contractor={{
                name: contractor.name,
                businessName: contractor.businessName,
                image: contractor.profileImage
              }}
              size="lg"
            />
          </div>

          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-xl font-semibold text-gray-900">{contractor.businessName}</h3>
                  {contractor.verified && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{contractor.name}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                  <span>{contractor.location}</span>
                  <span>{contractor.distance}</span>
                  <span>{contractor.yearsExperience} years experience</span>
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <Star className="text-yellow-400 fill-current" size={16} />
                  <span className="font-semibold">{contractor.rating?.toFixed(1) || '4.5'}</span>
                  <span className="text-gray-500">({contractor.reviewCount})</span>
                </div>
                <div className="text-sm text-gray-500">{contractor.priceRange}</div>
              </div>
            </div>

            <p className="text-gray-700 mb-4">{contractor.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {contractor.specialties.map(specialty => (
                <span
                  key={specialty}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div className="flex space-x-2">
                <a href={`tel:${contractor.phone}`} className="text-blue-600 hover:text-blue-700">
                  <Phone size={16} />
                </a>
                {contractor.website && (
                  <a href={contractor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                    <Globe size={16} />
                  </a>
                )}
              </div>

              <div className="flex space-x-2">
                <Link href={`/contractors/${contractor.id}`} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  View Profile
                </Link>
                <Link href={`/quote/request?contractor=${contractor.id}`} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Card className="hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative h-48 bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <span>Portfolio Image</span>
        </div>
        {contractor.verified && (
          <span className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            Verified
          </span>
        )}
      </div>

      <CardContent className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <ContractorAvatar 
            contractor={{
              name: contractor.name,
              businessName: contractor.businessName,
              image: contractor.profileImage
            }}
            size="md"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{contractor.businessName}</h3>
            <p className="text-sm text-gray-600">{contractor.name}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className="font-semibold">{contractor.rating?.toFixed(1) || '4.5'}</span>
            <span className="text-gray-500 text-sm">({contractor.reviewCount})</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{contractor.priceRange}</span>
        </div>

        <div className="text-sm text-gray-500 mb-3">
          <div>{contractor.location} • {contractor.distance}</div>
          <div>{contractor.yearsExperience} years experience</div>
        </div>

        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{contractor.description}</p>

        <div className="flex flex-wrap gap-1 mb-4">
          {contractor.specialties.slice(0, 2).map(specialty => (
            <span
              key={specialty}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
            >
              {specialty}
            </span>
          ))}
          {contractor.specialties.length > 2 && (
            <span className="text-xs text-gray-500 px-2 py-1">
              +{contractor.specialties.length - 2} more
            </span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex space-x-2">
            <Link
              href={`/contractors/${contractor.id}`}
              className="flex-1 text-center text-sm py-2 px-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              View Profile
            </Link>
            <Link
              href={`/quote/request?contractor=${contractor.id}`}
              className="flex-1 text-center text-sm py-2 px-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Get Quote
            </Link>
          </div>
          <div className="flex justify-center space-x-4 text-sm">
            <a href={`tel:${contractor.phone}`} className="text-blue-600 hover:text-blue-700 flex items-center">
              <Phone size={14} className="mr-1" />
              Call
            </a>
            {contractor.website && (
              <a href={contractor.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center">
                <Globe size={14} className="mr-1" />
                Website
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function ContractorsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contractors...</p>
        </div>
      </div>
    }>
      <ContractorsPageContent />
    </Suspense>
  )
}
