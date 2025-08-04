'use client'

import { useState, useEffect, useMemo } from 'react'
import { Search, MapPin, Star, Navigation, Clock, Phone, ExternalLink, Grid, List } from 'lucide-react'
import Image from 'next/image'
import { ImageService } from '@/lib/imageService'
import AdvancedLocationService, { LocationCoordinates } from '@/lib/advancedLocationService'
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
  const [loading, setLoading] = useState(true)
  const [locationLoading, setLocationLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationSearch, setLocationSearch] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('all')
  const [minRating, setMinRating] = useState(0)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [maxDistance, setMaxDistance] = useState(25)
  const [userLocation, setUserLocation] = useState<LocationInfo | null>(null)
  const [sortBy, setSortBy] = useState<'rating' | 'distance' | 'name'>('rating')

  const locationService = useMemo(() => AdvancedLocationService.getInstance(), [])

  // Helper function to parse specialties
  const getSpecialties = (specialties: string | string[]) => {
    if (Array.isArray(specialties)) return specialties
    if (typeof specialties === 'string') {
      try {
        return JSON.parse(specialties)
      } catch {
        return specialties.split(',').map(s => s.trim()).filter(s => s.length > 0)
      }
    }
    return []
  }

  // Get contractor image helper
  const getContractorImage = (contractor: Contractor) => {
    return contractor.profileImage || ImageService.getContractorProfileImage()
  }

  // Fetch contractors on component mount
  useEffect(() => {
    const fetchContractors = async () => {
      try {
        const response = await fetch('/api/contractors')
        if (response.ok) {
          const data = await response.json()
          const contractorsArray = Array.isArray(data) ? data : []
          setContractors(contractorsArray)
        }
      } catch (error) {
        console.error('Failed to fetch contractors:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchContractors()
  }, [])

  // Enhanced search and filtering
  const filteredContractors = useMemo(() => {
    let filtered = contractors.filter(contractor => {
      // Search term filter
      if (searchTerm.trim()) {
        const search = searchTerm.toLowerCase()
        const specialties = getSpecialties(contractor.specialties)

        const matches = [
          contractor.companyName?.toLowerCase(),
          contractor.contactName?.toLowerCase(),
          contractor.description?.toLowerCase(),
          contractor.city?.toLowerCase(),
          contractor.state?.toLowerCase(),
          contractor.address?.toLowerCase(),
          ...specialties.map((s: string) => s.toLowerCase())
        ].some(field => field?.includes(search))

        if (!matches) return false
      }

      // Location search
      if (locationSearch.trim()) {
        const location = locationSearch.toLowerCase()
        const matchesLocation = [
          contractor.city?.toLowerCase(),
          contractor.state?.toLowerCase(),
          contractor.address?.toLowerCase(),
          contractor.zipCode?.toLowerCase()
        ].some(field => field?.includes(location))

        if (!matchesLocation) return false
      }

      // Specialty filter
      if (selectedSpecialty !== 'all') {
        const specialties = getSpecialties(contractor.specialties)
        const hasSpecialty = specialties.some((s: string) =>
          s.toLowerCase().includes(selectedSpecialty.toLowerCase())
        )
        if (!hasSpecialty) return false
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
    return filtered.sort((a, b) => {
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
  }, [contractors, searchTerm, locationSearch, selectedSpecialty, minRating, maxDistance, sortBy, userLocation])

  // Calculate distances for contractors
  const calculateContractorDistances = async (userPos: LocationCoordinates) => {
    const updatedContractors = await Promise.all(
      contractors.map(async (contractor): Promise<Contractor> => {
        if (contractor.latitude && contractor.longitude) {
          const distance = locationService.calculateDistance(
            userPos,
            { lat: contractor.latitude, lng: contractor.longitude }
          )

          let drivingTime: string | undefined = undefined
          if (distance <= 50) {
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
            distance: Math.round(distance * 10) / 10,
            drivingTime
          }
        }
        return contractor
      })
    )

    setContractors(updatedContractors)
  }

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

      await calculateContractorDistances(position)
    } catch (error) {
      console.error('Failed to get location:', error)
      alert('Unable to get your location. Please enter your address manually.')
    } finally {
      setLocationLoading(false)
    }
  }

  // Search by address
  const handleLocationSearch = async () => {
    if (!locationSearch.trim()) return

    setLocationLoading(true)
    try {
      const locationData = await locationService.geocodeAddress(locationSearch)
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

  // Get unique specialties for filter
  const allSpecialties = useMemo(() => {
    return Array.from(new Set(
      contractors.flatMap(contractor => getSpecialties(contractor.specialties))
    )).sort()
  }, [contractors])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading contractors...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Find Contractors</h1>
              <p className="text-sm text-gray-500 mt-1">
                {filteredContractors.length} verified contractors
                {userLocation && ` near ${userLocation.city}, ${userLocation.state}`}
              </p>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <button
                onClick={getCurrentLocation}
                disabled={locationLoading}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm"
              >
                <Navigation className="w-4 h-4 mr-2" />
                {locationLoading ? 'Getting Location...' : 'Use My Location'}
              </button>
              <div className="flex rounded-lg border border-gray-300">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-50 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search contractors, services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="City, state, or zip code"
                value={locationSearch}
                onChange={(e) => setLocationSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLocationSearch()}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Specialties</option>
              {allSpecialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>

            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value={0}>Any Rating</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={4.5}>4.5+ Stars</option>
            </select>
          </div>

          {userLocation && (
            <div className="mt-4 flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <label className="text-sm font-medium text-gray-700">
                  Within {maxDistance} miles
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  value={maxDistance}
                  onChange={(e) => setMaxDistance(Number(e.target.value))}
                  className="w-32"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'rating' | 'distance' | 'name')}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              >
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest First</option>
                <option value="name">Alphabetical</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <ContractorTools
            contractorId="demo-contractor-1"
            contractorName="Demo Contractor"
            contractorPhone="+15125551234"
          />
        </div>

        {filteredContractors.length === 0 ? (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contractors found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className={viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-4'
          }>
            {filteredContractors.map((contractor) => (
              <div
                key={contractor.id}
                className={`bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow ${viewMode === 'list' ? 'flex p-4' : 'p-6'
                  }`}
              >
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
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>

                <div className={viewMode === 'list' ? 'flex-1' : ''}>
                  <div className={viewMode === 'list' ? 'flex justify-between' : 'text-center'}>
                    <div className={viewMode === 'list' ? 'flex-1' : ''}>
                      <h3 className="font-semibold text-gray-900">{contractor.companyName}</h3>
                      {contractor.contactName && (
                        <p className="text-sm text-gray-600">{contractor.contactName}</p>
                      )}

                      <div className={`flex items-center ${viewMode === 'list' ? 'mt-1' : 'justify-center mt-2'}`}>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(contractor.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                                }`}
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {contractor.rating.toFixed(1)} ({contractor.reviewCount})
                        </span>
                      </div>

                      <div className={`flex items-center ${viewMode === 'list' ? 'mt-2' : 'justify-center mt-3'} text-sm text-gray-500`}>
                        <MapPin className="w-4 h-4 mr-1" />
                        <span>
                          {contractor.city}, {contractor.state}
                          {contractor.distance && ` • ${contractor.distance} miles`}
                        </span>
                      </div>

                      {contractor.drivingTime && (
                        <div className={`flex items-center ${viewMode === 'list' ? 'mt-1' : 'justify-center mt-2'} text-sm text-blue-600`}>
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{contractor.drivingTime} drive</span>
                        </div>
                      )}

                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {getSpecialties(contractor.specialties).slice(0, 3).map((specialty: string) => (
                            <span
                              key={specialty}
                              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className={`${viewMode === 'list' ? 'ml-4 flex flex-col space-y-2' : 'mt-4 flex justify-center space-x-2'}`}>
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
  )
}
