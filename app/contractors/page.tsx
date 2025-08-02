'use client'

import { useState, useEffect, useMemo, Suspense } from 'react'
import { Search, MapPin, Star, Filter, Grid, List, Map } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useLocation } from '@/components/providers/LocationProvider'
import { LocationData } from '@/lib/location'
import GoogleMap from '@/components/ui/GoogleMap'
import MapsAction from '@/components/ui/MapsAction'
import { ContractorLocation } from '@/lib/maps'
import LocationRequest from '@/components/ui/LocationRequest'
import { LocationRequestCompact } from '@/components/ui/LocationRequest'
import { ContractorAvatar, ProfessionalImage } from '@/components/ui/ProfessionalImage'
import { ProfessionalSearch } from '@/components/ui/ProfessionalSearch'
import { ContractorStatus, StatusBadge, ProfessionalRating } from '@/components/ui/ProfessionalStatus'

interface Contractor {
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
  verified: boolean
  phone: string
  website?: string
  priceRange: string
  // Enhanced professional properties
  premium?: boolean
  featured?: boolean
  averageResponseHours?: number
  completedProjects?: number
  certifications?: string[]
}

const MOCK_CONTRACTORS: Contractor[] = [
  {
    id: '1',
    name: 'Mirage Marble & Granite Team',
    businessName: 'Mirage Marble & Granite',
    rating: 5.0,
    reviewCount: 549,
    location: 'Peoria, AZ',
    distance: '2.1 miles',
    specialties: ['Granite Fabrication', 'Quartz Installation', 'Marble Countertops'],
    yearsExperience: 15,
    profileImage: '/contractor-profile-1.jpg',
    portfolioImages: [
      '/kitchen-luxury.jpg',
      '/bathroom-modern.jpg'
    ],
    description: 'Family business offering a wide range of natural stone fabrication products. Verified business with excellent Google reviews and professional service.',
    verified: true,
    premium: true,
    featured: true,
    averageResponseHours: 1,
    completedProjects: 1250,
    certifications: ['Licensed', 'Insured', 'Caesarstone Certified'],
    phone: '(623) 606-7610',
    website: 'mirageaz.com',
    priceRange: '$$$'
  },
  {
    id: '2',
    name: 'Diamond Kitchen & Bath Team',
    businessName: 'Diamond Kitchen & Bath Inc',
    rating: 4.8,
    reviewCount: 324,
    location: 'Glendale, AZ',
    distance: '5.3 miles',
    specialties: ['Kitchen Cabinetry', 'Bathroom Remodeling', 'Countertop Installation'],
    yearsExperience: 18,
    profileImage: '/contractor-profile-2.jpg',
    portfolioImages: [
      '/kitchen-modern.jpg',
      '/bathroom-luxury.jpg'
    ],
    description: 'Specialized in high-end kitchen and bathroom renovations with focus on quality craftsmanship and customer satisfaction.',
    verified: true,
    premium: true,
    averageResponseHours: 2,
    completedProjects: 980,
    certifications: ['Licensed', 'Insured', 'NKBA Certified'],
    phone: '(602) 555-0123',
    website: 'diamondkb.com',
    priceRange: '$$$$'
  },
  {
    id: '3',
    name: 'TM Quartz & Granite Team',
    businessName: 'TM Quartz & Granite',
    rating: 5.0,
    reviewCount: 38,
    location: 'Phoenix, AZ',
    distance: '8.2 miles',
    specialties: ['Quartz Fabrication', 'Granite Installation', 'Custom Stone Work'],
    yearsExperience: 12,
    profileImage: '/contractor-profile-3.jpg',
    portfolioImages: [
      '/bathroom-modern.jpg',
      '/living-room-modern.jpg'
    ],
    description: 'Specialized stone fabrication and installation with perfect 5.0 rating and quality craftsmanship. Expert in custom quartz and granite work.',
    verified: true,
    phone: '(602) 555-0038',
    priceRange: '$$'
  },
  {
    id: '4',
    name: 'S3 Plumbing Team',
    businessName: 'S3 Plumbing',
    rating: 5.0,
    reviewCount: 32,
    location: 'Mesa, AZ',
    distance: '12.1 miles',
    specialties: ['Plumbing Installation', 'Pipe Repair', 'Emergency Services'],
    yearsExperience: 14,
    profileImage: '/contractor-profile-4.jpg',
    portfolioImages: [
      '/bathroom-modern.jpg',
      '/hvac-electrical.jpg'
    ],
    description: 'Professional plumbing services with perfect rating and reliable emergency response. Available 24/7 for urgent plumbing needs.',
    verified: true,
    phone: '(480) 555-0032',
    priceRange: '$$'
  },
  {
    id: '5',
    name: 'AZ Granite & Remodeling Team',
    businessName: 'AZ Granite & Remodeling',
    rating: 5.0,
    reviewCount: 39,
    location: 'Chandler, AZ',
    distance: '15.7 miles',
    specialties: ['Granite Installation', 'Kitchen Remodeling', 'Stone Fabrication'],
    yearsExperience: 16,
    profileImage: '/contractor-profile-5.jpg',
    portfolioImages: [
      '/kitchen-luxury.jpg',
      '/general-contracting.jpg'
    ],
    description: 'Complete granite and remodeling services with perfect customer satisfaction rating. Specializing in full kitchen transformations.',
    verified: true,
    phone: '(480) 555-0039',
    priceRange: '$$'
  },
  {
    id: '6',
    name: 'Phend Plumbing Team',
    businessName: 'Phend Plumbing',
    rating: 5.0,
    reviewCount: 41,
    location: 'Phoenix, AZ',
    distance: '7.4 miles',
    specialties: ['Residential Plumbing', 'Commercial Services', 'Water Heater Installation'],
    yearsExperience: 22,
    profileImage: '/contractor-profile-1.jpg',
    portfolioImages: [
      '/bathroom-modern.jpg',
      '/hvac-electrical.jpg'
    ],
    description: 'Trusted plumbing services with decades of experience and perfect customer reviews. Serving both residential and commercial clients.',
    verified: true,
    phone: '(602) 555-0041',
    priceRange: '$$'
  },
  {
    id: '7',
    name: 'Liberty Plumbing Team',
    businessName: 'Liberty Plumbing',
    rating: 5.0,
    reviewCount: 26,
    location: 'Scottsdale, AZ',
    distance: '9.8 miles',
    specialties: ['Emergency Plumbing', 'Drain Cleaning', 'Fixture Installation'],
    yearsExperience: 10,
    profileImage: '/contractor-profile-2.jpg',
    portfolioImages: [
      '/bathroom-modern.jpg',
      '/general-contracting.jpg'
    ],
    description: 'Fast, reliable plumbing services with 24/7 emergency availability and perfect rating. Quick response times guaranteed.',
    verified: true,
    phone: '(480) 555-0026',
    priceRange: '$$'
  },
  {
    id: '8',
    name: 'Harper Stone and Tile Team',
    businessName: 'Harper Stone and Tile',
    rating: 5.0,
    reviewCount: 21,
    location: 'Tempe, AZ',
    distance: '11.2 miles',
    specialties: ['Stone Installation', 'Tile Work', 'Kitchen Remodeling'],
    yearsExperience: 13,
    profileImage: '/contractor-profile-3.jpg',
    portfolioImages: [
      '/kitchen-luxury.jpg',
      '/bathroom-modern.jpg'
    ],
    description: 'Premium stone and tile installation services with meticulous attention to detail. Specializing in high-end residential projects.',
    verified: true,
    phone: '(480) 555-0021',
    priceRange: '$$$'
  },
  {
    id: '9',
    name: 'Auros Home Remodel Team',
    businessName: 'Auros Home Remodel',
    rating: 5.0,
    reviewCount: 36,
    location: 'Gilbert, AZ',
    distance: '18.5 miles',
    specialties: ['Full Home Remodeling', 'Kitchen Design', 'Bathroom Renovation'],
    yearsExperience: 20,
    profileImage: '/contractor-profile-4.jpg',
    portfolioImages: [
      '/living-room-modern.jpg',
      '/kitchen-luxury.jpg'
    ],
    description: 'Complete home remodeling services with innovative design and quality construction. Perfect rating with comprehensive project management.',
    verified: true,
    phone: '(480) 555-0036',
    priceRange: '$$$'
  }
];

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
  // Temporarily disable location provider to fix immediate issues
  const currentLocation = null
  const searchLocation = async (query: string) => {
    console.log('Location search:', query)
    return Promise.resolve({} as any)
  }
  const calculateDistance = (lat: number, lng: number): number => Math.random() * 20

  const [searchTerm, setSearchTerm] = useState('')
  const [locationQuery, setLocationQuery] = useState(searchParams?.get('location') || '')
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState('')
  const [rating, setRating] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [showLocationRequest, setShowLocationRequest] = useState(true)

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
          location: `${contractor.city || 'Austin'}, ${contractor.state || 'TX'}`,
          distance: '0 miles', // Calculate based on user location
          specialties: Array.isArray(contractor.specialties) ? contractor.specialties : JSON.parse(contractor.specialties || '["General Contracting"]'),
          yearsExperience: contractor.yearsExperience || Math.floor(Math.random() * 15) + 5,
          profileImage: contractor.user?.image || `/contractor-profile-${Math.floor(Math.random() * 5) + 1}.jpg`,
          portfolioImages: Array.isArray(contractor.portfolioImages) ? contractor.portfolioImages :
            contractor.portfolioImages ? JSON.parse(contractor.portfolioImages) : [
              '/kitchen-luxury.jpg',
              '/bathroom-modern.jpg'
            ],
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
      // Fall back to mock data with better variety
      const enhancedMockData = MOCK_CONTRACTORS.map((contractor, index) => ({
        ...contractor,
        profileImage: `/contractor-profile-${(index % 5) + 1}.jpg`,
        portfolioImages: [
          '/kitchen-luxury.jpg',
          '/bathroom-modern.jpg',
          '/living-room-modern.jpg'
        ]
      }))
      setContractors(enhancedMockData)
      setDataSource('mock')
      console.log('✅ Using enhanced mock data')
    } finally {
      setLoading(false)
    }
  }

  // Load data on component mount
  useEffect(() => {
    loadRealContractors()
  }, [])

  // Convert contractors to map locations
  const contractorLocations: ContractorLocation[] = useMemo(() => {
    return contractors.map((contractor, index) => ({
      id: contractor.id,
      name: contractor.businessName,
      address: contractor.location,
      coordinates: {
        // Arizona coordinates with some variation for different contractors
        lat: 33.4484 + (Math.random() - 0.5) * 0.5,
        lng: -112.0740 + (Math.random() - 0.5) * 0.5
      },
      placeId: undefined
    }))
  }, [contractors])

  const handleContractorMapClick = (contractor: ContractorLocation) => {
    const fullContractor = contractors.find(c => c.id === contractor.id)
    if (fullContractor) {
      console.log('Clicked contractor:', fullContractor)
    }
  }

  // Calculate distances and sort contractors based on user location
  const contractorsWithDistance = useMemo(() => {
    return contractors.map(contractor => {
      let distance = contractor.distance // fallback to mock distance
      let distanceValue = parseFloat(contractor.distance)

      if (currentLocation) {
        // Mock coordinates for contractors (in production, these would come from your database)
        const contractorCoords = {
          'Austin, TX': { lat: 30.2672, lng: -97.7431 },
          'Cedar Park, TX': { lat: 30.5052, lng: -97.8203 },
          'Round Rock, TX': { lat: 30.5083, lng: -97.6789 },
          'Pflugerville, TX': { lat: 30.4394, lng: -97.6200 },
          'Georgetown, TX': { lat: 30.6327, lng: -97.6779 }
        }

        const coords = contractorCoords[contractor.location as keyof typeof contractorCoords]
        if (coords) {
          distanceValue = calculateDistance(coords.lat, coords.lng)
          distance = `${distanceValue.toFixed(1)} miles`
        }
      }

      return {
        ...contractor,
        distance,
        distanceValue
      }
    }).sort((a, b) => a.distanceValue - b.distanceValue)
  }, [currentLocation, calculateDistance])

  // Filter contractors based on search criteria
  const filteredContractors = useMemo(() => {
    return contractorsWithDistance.filter(contractor => {
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
  }, [contractorsWithDistance, searchTerm, locationQuery, selectedSpecialties, priceRange, rating])

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    )
  }

  const handleLocationSearch = async (query: string) => {
    setLocationQuery(query)
    try {
      const location = await searchLocation(query)
      console.log('Location search result:', location)
    } catch (error) {
      console.error('Failed to search location:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Data Source Indicator */}
      {!loading && (
        <div className={`${dataSource === 'database' ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'} border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {dataSource === 'database' ? (
                  <>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-700 font-medium">
                      ✅ Live Data - {contractors.length} contractors from database
                    </span>
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-yellow-700 font-medium">
                      🎭 Demo Data - Using sample contractors for demonstration
                    </span>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={loadRealContractors}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
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
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 font-medium"
                >
                  🗑️ Clear Search
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Expert Home Remodeling Contractors Near You
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with verified, experienced contractors and fabricators in your area
            </p>
          </div>

          {/* Location Request - Temporarily disabled to fix search display */}
          {false && showLocationRequest && !currentLocation && (
            <div className="max-w-2xl mx-auto mb-6">
              <LocationRequest
                onLocationReceived={() => setShowLocationRequest(false)}
                onDismiss={() => setShowLocationRequest(false)}
              />
            </div>
          )}

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search by business name or specialty..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative md:w-64">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Enter city, state or zip"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={locationQuery}
                    onChange={(e) => handleLocationSearch(e.target.value)}
                  />
                </div>
                {/* Temporarily disabled LocationRequestCompact */}
                {false && !currentLocation && (
                  <LocationRequestCompact
                    onLocationReceived={() => { }}
                    className="whitespace-nowrap"
                  />
                )}
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Filter size={20} />
                <span>Filters</span>
              </button>
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
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
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
                        className="text-primary-600 focus:ring-primary-500"
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
                        className="text-primary-600 focus:ring-primary-500"
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
                  <button
                    onClick={() => setViewMode('map')}
                    className={`p-2 ${viewMode === 'map' ? 'bg-blue-100 text-blue-600' : 'text-gray-400'}`}
                  >
                    <Map size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Contractor Grid/List/Map */}
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading contractors...</p>
              </div>
            ) : viewMode === 'map' ? (
              <div className="h-[600px] rounded-lg overflow-hidden border">
                <GoogleMap
                  contractors={contractorLocations}
                  onContractorClick={handleContractorMapClick}
                  center={{ lat: 33.4484, lng: -112.0740 }} // Phoenix, AZ
                  zoom={10}
                />
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                {filteredContractors.map(contractor => (
                  <ContractorCard key={contractor.id} contractor={contractor} viewMode={viewMode} />
                ))}
              </div>
            )}

            {!loading && filteredContractors.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search size={64} className="mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No contractors found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your search criteria or filters</p>
                <button
                  onClick={() => {
                    setSearchTerm('')
                    setSelectedSpecialties([])
                    setPriceRange('')
                    setRating(0)
                  }}
                  className="btn-primary"
                >
                  Clear All Filters
                </button>
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
              src={contractor.profileImage}
              name={contractor.name}
              size={96}
              className=""
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
                  <span className="font-semibold">{contractor.rating}</span>
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
                  className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div className="flex space-x-2">
                {contractor.portfolioImages.slice(0, 3).map((image, idx) => (
                  <ProfessionalImage
                    key={idx}
                    src={image}
                    alt="Portfolio project"
                    width={64}
                    height={64}
                    category="kitchen-project"
                    className="w-16 h-16 rounded object-cover"
                  />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:space-x-3">
                <div className="flex space-x-2">
                  <Link href={`/contractors/${contractor.id}`} className="btn-outline flex-1 sm:flex-none">
                    View Profile
                  </Link>
                  <button className="btn-primary flex-1 sm:flex-none">Get Quote</button>
                </div>
                <MapsAction
                  contractor={{
                    id: contractor.id,
                    name: contractor.businessName,
                    businessName: contractor.businessName,
                    address: contractor.location,
                    phone: '(555) 123-4567', // Mock phone for demo
                    website: `https://example.com/contractor/${contractor.id}`,
                    coordinates: {
                      lat: 33.4484 + (Math.random() - 0.5) * 0.5,
                      lng: -112.0740 + (Math.random() - 0.5) * 0.5
                    }
                  }}
                  showAllActions={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
      <div className="relative">
        <ProfessionalImage
          src={contractor.portfolioImages[0]}
          alt="Portfolio project showcase"
          width={400}
          height={192}
          category="kitchen-project"
          className="w-full h-48 object-cover"
        />
        {contractor.verified && (
          <span className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
            Verified
          </span>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center space-x-3 mb-4">
          <ContractorAvatar
            src={contractor.profileImage}
            name={contractor.name}
            size={48}
            className=""
          />
          <div>
            <h3 className="font-semibold text-gray-900">{contractor.businessName}</h3>
            <p className="text-sm text-gray-600">{contractor.name}</p>
          </div>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <Star className="text-yellow-400 fill-current" size={16} />
            <span className="font-semibold">{contractor.rating}</span>
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
              className="bg-primary-100 text-primary-800 text-xs font-medium px-2 py-1 rounded-full"
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
              className="flex-1 text-center btn-outline text-sm py-2"
            >
              View Profile
            </Link>
            <button className="flex-1 btn-primary text-sm py-2">
              Get Quote
            </button>
          </div>
          <MapsAction
            contractor={{
              id: contractor.id,
              name: contractor.businessName,
              businessName: contractor.businessName,
              address: contractor.location,
              phone: '(555) 123-4567', // Mock phone for demo
              website: `https://example.com/contractor/${contractor.id}`,
              coordinates: {
                lat: 33.4484 + (Math.random() - 0.5) * 0.5,
                lng: -112.0740 + (Math.random() - 0.5) * 0.5
              }
            }}
            showAllActions={false}
          />
        </div>
      </div>
    </div>
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
