'use client'

import { useState } from 'react'
import { Search, MapPin, Star, Sliders, SortAsc } from 'lucide-react'
import Link from 'next/link'

interface SearchFilters {
  location: string
  radius: string
  minRating: number
  specialties: string[]
  priceRange: string
  availability: string
}

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    radius: '25',
    minRating: 0,
    specialties: [],
    priceRange: '',
    availability: ''
  })
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to contractors page with search parameters
    const params = new URLSearchParams()
    if (searchTerm) params.set('q', searchTerm)
    if (filters.location) params.set('location', filters.location)
    if (filters.radius) params.set('radius', filters.radius)
    if (filters.minRating > 0) params.set('rating', filters.minRating.toString())
    if (filters.specialties.length > 0) params.set('specialties', filters.specialties.join(','))
    if (filters.priceRange) params.set('price', filters.priceRange)
    
    window.location.href = `/contractors?${params.toString()}`
  }

  const popularSearches = [
    'Kitchen remodeling Austin',
    'Granite countertops Dallas',
    'Quartz installation Houston',
    'Bathroom countertops San Antonio',
    'Marble fabrication Fort Worth'
  ]

  const featuredLocations = [
    { name: 'Austin', count: 156 },
    { name: 'Dallas', count: 234 },
    { name: 'Houston', count: 189 },
    { name: 'San Antonio', count: 98 },
    { name: 'Fort Worth', count: 87 },
    { name: 'Plano', count: 67 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Granite & Stone Contractors
            </h1>
            <p className="text-xl text-gray-600">
              Search thousands of verified contractors in your area
            </p>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            {/* Main Search */}
            <div className="relative">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="What type of project do you need help with?"
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="md:w-80 relative">
                  <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Enter your location"
                    className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    value={filters.location}
                    onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700"
              >
                <Sliders size={18} />
                <span>Advanced Filters</span>
              </button>
              
              <button
                type="submit"
                className="btn-primary btn-lg px-12"
              >
                Search Contractors
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="bg-gray-50 rounded-lg p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Radius
                    </label>
                    <select
                      value={filters.radius}
                      onChange={(e) => setFilters(prev => ({ ...prev, radius: e.target.value }))}
                      className="input-field"
                    >
                      <option value="10">10 miles</option>
                      <option value="25">25 miles</option>
                      <option value="50">50 miles</option>
                      <option value="100">100 miles</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Rating
                    </label>
                    <select
                      value={filters.minRating}
                      onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                      className="input-field"
                    >
                      <option value="0">Any Rating</option>
                      <option value="3">3+ Stars</option>
                      <option value="4">4+ Stars</option>
                      <option value="4.5">4.5+ Stars</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price Range
                    </label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">Any Price</option>
                      <option value="$">$ - Budget Friendly</option>
                      <option value="$$">$$ - Moderate</option>
                      <option value="$$$">$$$ - Premium</option>
                      <option value="$$$$">$$$$ - Luxury</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Specialties
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      'Kitchen Remodeling',
                      'Bathroom Remodeling',
                      'Granite Installation',
                      'Quartz Countertops',
                      'Marble Work',
                      'Custom Fabrication',
                      'Outdoor Kitchens',
                      'Commercial Projects'
                    ].map(specialty => (
                      <label key={specialty} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.specialties.includes(specialty)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFilters(prev => ({
                                ...prev,
                                specialties: [...prev.specialties, specialty]
                              }))
                            } else {
                              setFilters(prev => ({
                                ...prev,
                                specialties: prev.specialties.filter(s => s !== specialty)
                              }))
                            }
                          }}
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="text-sm text-gray-700">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Searches */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h2>
            <div className="space-y-2">
              {popularSearches.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchTerm(search)
                    handleSearch({ preventDefault: () => {} } as React.FormEvent)
                  }}
                  className="block w-full text-left text-primary-600 hover:text-primary-700 text-sm py-1"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Locations */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse by Location</h2>
            <div className="space-y-3">
              {featuredLocations.map((location, index) => (
                <div key={index} className="flex items-center justify-between">
                  <button
                    onClick={() => {
                      setFilters(prev => ({ ...prev, location: location.name + ', TX' }))
                      handleSearch({ preventDefault: () => {} } as React.FormEvent)
                    }}
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {location.name}
                  </button>
                  <span className="text-sm text-gray-500">{location.count} contractors</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Search Tips</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Be specific about your project type</li>
              <li>• Include your city and state for best results</li>
              <li>• Use filters to narrow down options</li>
              <li>• Check contractor ratings and reviews</li>
              <li>• Get quotes from multiple contractors</li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-primary-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Get connected with up to 3 qualified contractors in your area and receive free quotes for your project.
            </p>
            <Link href="/quote" className="btn-primary btn-lg">
              Get Free Quotes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
