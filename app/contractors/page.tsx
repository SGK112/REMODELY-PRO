'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Star, Filter, Grid, List, Phone, Mail, ExternalLink, Navigation, Clock, Target } from 'lucide-react'
import Image from 'next/image'
import { ImageService } from '@/lib/imageService'
import AdvancedLocationService, { LocationCoordinates } from '@/lib/advancedLocationService'
import AIAgentService from '@/lib/aiAgentService'
import ContractorTools from '@/components/ContractorTools'

interface Contractor {
  id: string
  companyName: string
  contactName: string | null
  email: string | null
  phone: string | null
  website: string | null
  specialties: string | string[]
  rating: number
  reviewCount: number
  description: string | null
  address: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  profileImage: string | null
  verified: boolean
  yearsInBusiness: number | null
  latitude?: number
  longitude?: number
  distance?: number
  drivingTime?: string
  aiScore?: number
  aiReasons?: string[]
}

interface LocationInfo {
  lat: number
  lng: number
  address: string
  city: string
  state: string
  zipCode: string
}

export default function ContractorsPage() {
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([])
  const [loading, setLoading] = useState(true)
  const [locationLoading, setLocationLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [locationFilter, setLocationFilter] = useState('')
  const [minRating, setMinRating] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [maxDistance, setMaxDistance] = useState(25) // miles
  const [userLocation, setUserLocation] = useState<LocationInfo | null>(null)
  const [locationService] = useState(() => AdvancedLocationService.getInstance())
  const [aiAgentService] = useState(() => AIAgentService.getInstance())
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'name'>('rating')

  // Fetch contractors on component mount
  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await fetch('/api/contractors')
        if (response.ok) {
          const data = await response.json()
          setContractors(data)
          setFilteredContractors(data)
        }
      } catch (error) {
        console.error('Failed to fetch contractors:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContractors()
  }, [])

  // Get user's current location
  const getCurrentLocation = async () => {
    setLocationLoading(true)
    try {
      const position = await locationService.getCurrentLocation()
      const locationDetails = await locationService.reverseGeocode(position)
      
      setUserLocation({
        lat: position.lat,
        lng: position.lng,
        address: locationDetails.formatted,
        city: locationDetails.city,
        state: locationDetails.state,
        zipCode: locationDetails.zipCode
      })

      // Calculate distances and driving times for all contractors
      await calculateContractorDistances(position)
    } catch (error) {
      console.error('Failed to get location:', error)
      alert('Unable to get your location. Please enter your address manually.')
    } finally {
      setLocationLoading(false)
    }
  }

  // Calculate distances and driving times for contractors
  const calculateContractorDistances = async (userPos: LocationCoordinates) => {
    const updatedContractors = await Promise.all(
      (contractors || []).map(async (contractor): Promise<Contractor> => {
        if (contractor.latitude && contractor.longitude) {
          const distance = locationService.calculateDistance(
            userPos,
            { lat: contractor.latitude, lng: contractor.longitude }
          )

          // Get driving time for contractors within reasonable distance
          let drivingTime: string | undefined = undefined
          if (distance <= 100) { // Only get driving time for contractors within 100 miles
            try {
              const drivingInfo = await locationService.getDrivingInfo(
                userPos,
                { lat: contractor.latitude, lng: contractor.longitude }
              )
              drivingTime = `${drivingInfo.duration} min`
            } catch (error) {
              console.warn(`Failed to get driving time for contractor ${contractor.id}:`, error)
            }
          }

          return {
            ...contractor,
            distance: Math.round(distance * 10) / 10, // Round to 1 decimal
            drivingTime
          }
        }
        return contractor
      })
    )

    setContractors(updatedContractors)
    setFilteredContractors(updatedContractors)
  }

  // Search by address
  const searchByAddress = async (address: string) => {
    if (!address.trim()) return

    setLocationLoading(true)
    try {
      const locationData = await locationService.geocodeAddress(address)
      
      setUserLocation({
        lat: locationData.coordinates.lat,
        lng: locationData.coordinates.lng,
        address: locationData.formatted,
        city: locationData.city,
        state: locationData.state,
        zipCode: locationData.zipCode
      })

      await calculateContractorDistances(locationData.coordinates)
    } catch (error) {
      console.error('Failed to geocode address:', error)
      alert('Unable to find that address. Please try a different location.')
    } finally {
      setLocationLoading(false)
    }
  }

  // AI-powered contractor matching
  const getAIRecommendations = async () => {
    if (!userLocation) {
      alert('Please set your location first')
      return
    }

    try {
      const projectDetails = {
        type: selectedSpecialty === 'all' ? 'general contracting' : selectedSpecialty,
        location: { lat: userLocation.lat, lng: userLocation.lng },
        requirements: []
      }

      const recommendations = await aiAgentService.matchContractorsToProject(
        projectDetails,
        contractors || []
      )

      // Update contractors with AI scores
      const contractorsWithScores = (contractors || []).map(contractor => {
        const recommendation = recommendations.find(r => r.contractorId === contractor.id)
        return {
          ...contractor,
          aiScore: recommendation?.score || 0,
          aiReasons: recommendation?.reasons || []
        }
      })

      setFilteredContractors(contractorsWithScores.sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0)))
    } catch (error) {
      console.error('AI matching failed:', error)
    }
  }

  // Filter and sort contractors
  useEffect(() => {
    let filtered = (contractors || []).filter(contractor => {
      // Search term filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch = 
          contractor.companyName?.toLowerCase().includes(searchLower) ||
          contractor.contactName?.toLowerCase().includes(searchLower) ||
          (Array.isArray(contractor.specialties) 
            ? contractor.specialties.some(s => s.toLowerCase().includes(searchLower))
            : contractor.specialties?.toLowerCase().includes(searchLower)) ||
          contractor.city?.toLowerCase().includes(searchLower)
        
        if (!matchesSearch) return false
      }

      // Specialty filter
      if (selectedSpecialty !== 'all') {
        const specialties = Array.isArray(contractor.specialties) 
          ? contractor.specialties 
          : JSON.parse(contractor.specialties || '[]')
        
        const hasSpecialty = specialties.some((s: string) => 
          s.toLowerCase().includes(selectedSpecialty.toLowerCase())
        )
        
        if (!hasSpecialty) return false
      }

      // Location filter
      if (locationFilter) {
        const locationLower = locationFilter.toLowerCase()
        const matchesLocation = 
          contractor.city?.toLowerCase().includes(locationLower) ||
          contractor.state?.toLowerCase().includes(locationLower) ||
          contractor.address?.toLowerCase().includes(locationLower)
        
        if (!matchesLocation) return false
      }

      // Rating filter
      if (contractor.rating < minRating) return false

      // Distance filter
      if (userLocation && contractor.distance && contractor.distance > maxDistance) {
        return false
      }

      return true
    })

    // Sort contractors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'distance':
          if (!a.distance && !b.distance) return 0
          if (!a.distance) return 1
          if (!b.distance) return -1
          return a.distance - b.distance
        case 'name':
          return (a.companyName || '').localeCompare(b.companyName || '')
        case 'rating':
        default:
          return b.rating - a.rating
      }
    })

    setFilteredContractors(filtered)
  }, [contractors, searchTerm, selectedSpecialty, locationFilter, minRating, maxDistance, sortBy, userLocation])

  // Get unique specialties for filter
  const allSpecialties = Array.from(new Set(
    (contractors || []).flatMap(contractor => 
      Array.isArray(contractor.specialties) 
        ? contractor.specialties 
        : JSON.parse(contractor.specialties || '[]')
    )
  )).sort()

  const formatRating = (rating: number) => {
    return rating % 1 === 0 ? rating.toString() : rating.toFixed(1)
  }

  const getContractorImage = (contractor: Contractor) => {
    if (contractor.profileImage) {
      return contractor.profileImage
    }
    return ImageService.getContractorProfileImage()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Loading contractors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Contractors</h1>
              <p className="mt-1 text-sm text-gray-500">
                {filteredContractors.length} verified contractors found
                {userLocation && ` in ${userLocation.city}, ${userLocation.state}`}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                <Navigation className="w-4 h-4 mr-2" />
                {locationLoading ? 'Getting Location...' : 'Use My Location'}
              </button>
              <button
                onClick={getAIRecommendations}
                disabled={!userLocation}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                <Target className="w-4 h-4 mr-2" />
                AI Match
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* AI Contractor Tools Demo */}
        <div className="mb-8">
          <ContractorTools 
            contractorId="demo-contractor-1"
            contractorName="Demo Contractor"
            contractorPhone="+15125551234"
          />
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Search</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search contractors..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter address or city..."
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && searchByAddress(locationFilter)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  {userLocation && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Distance: {maxDistance} miles
                      </label>
                      <input
                        type="range"
                        min="5"
                        max="100"
                        value={maxDistance}
                        onChange={(e) => setMaxDistance(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Specialty</h3>
                <select
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Specialties</option>
                  {allSpecialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Minimum Rating</h3>
                <select
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={0}>Any Rating</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={4.5}>4.5+ Stars</option>
                </select>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'rating' | 'distance' | 'name')}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Highest Rated</option>
                  {userLocation && <option value="distance">Nearest First</option>}
                  <option value="name">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 mt-8 lg:mt-0">
            {/* View Mode Toggle */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-500">
                Showing {filteredContractors.length} of {(contractors || []).length} contractors
              </p>
              <div className="flex rounded-lg border border-gray-300">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' 
                    ? 'bg-blue-50 text-blue-600' 
                    : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Contractors Grid/List */}
            {filteredContractors.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No contractors found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or location</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {filteredContractors.map((contractor) => (
                  <div
                    key={contractor.id}
                    className={`bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow ${
                      viewMode === 'list' ? 'flex p-4' : 'p-6'
                    }`}
                  >
                    {/* Profile Image */}
                    <div className={viewMode === 'list' ? 'flex-shrink-0 mr-4' : 'mb-4'}>
                      <div className={`relative ${viewMode === 'list' ? 'w-16 h-16' : 'w-20 h-20'} mx-auto`}>
                        <Image
                          src={getContractorImage(contractor)}
                          alt={contractor.companyName}
                          fill
                          className="rounded-full object-cover"
                          sizes={viewMode === 'list' ? '64px' : '80px'}
                        />
                        {contractor.verified && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <div className={viewMode === 'list' ? 'flex justify-between items-start' : 'text-center'}>
                        <div className={viewMode === 'list' ? 'flex-1' : ''}>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {contractor.companyName}
                          </h3>
                          {contractor.contactName && (
                            <p className="text-sm text-gray-600">{contractor.contactName}</p>
                          )}

                          {/* Rating */}
                          <div className={`flex items-center ${viewMode === 'list' ? 'mt-1' : 'justify-center mt-2'}`}>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(contractor.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">
                              {formatRating(contractor.rating)} ({contractor.reviewCount})
                            </span>
                          </div>

                          {/* Location & Distance */}
                          <div className={`flex items-center ${viewMode === 'list' ? 'mt-2' : 'justify-center mt-3'} text-sm text-gray-500`}>
                            <MapPin className="w-4 h-4 mr-1" />
                            <span>
                              {contractor.city}, {contractor.state}
                              {contractor.distance && ` • ${contractor.distance} miles`}
                            </span>
                          </div>

                          {/* Driving Time */}
                          {contractor.drivingTime && (
                            <div className={`flex items-center ${viewMode === 'list' ? 'mt-1' : 'justify-center mt-2'} text-sm text-blue-600`}>
                              <Clock className="w-4 h-4 mr-1" />
                              <span>{contractor.drivingTime} drive</span>
                            </div>
                          )}

                          {/* Specialties */}
                          <div className={`${viewMode === 'list' ? 'mt-3' : 'mt-4'}`}>
                            <div className="flex flex-wrap gap-1">
                              {(Array.isArray(contractor.specialties) 
                                ? contractor.specialties.slice(0, 3)
                                : JSON.parse(contractor.specialties || '[]').slice(0, 3)
                              ).map((specialty: string) => (
                                <span
                                  key={specialty}
                                  className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className={`${viewMode === 'list' ? 'ml-4 flex flex-col space-y-2' : 'mt-6 flex justify-center space-x-2'}`}>
                          {contractor.phone && (
                            <a
                              href={`tel:${contractor.phone}`}
                              className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                            >
                              <Phone className="w-4 h-4 mr-1" />
                              Call
                            </a>
                          )}
                          {contractor.website && (
                            <a
                              href={contractor.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Website
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
