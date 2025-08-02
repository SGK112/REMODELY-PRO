'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Star, Filter } from 'lucide-react'
import Link from 'next/link'
import ContractorImage from '@/components/ui/ContractorImage'

interface Contractor {
    id: string
    businessName: string
    rating: number
    reviewCount: number
    city: string
    state: string
    zipCode: string
    licenseNumber: string | null
    specialties: string[]
    phone: string | null
    website: string | null
}

export default function SimpleContractorsPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [locationQuery, setLocationQuery] = useState('')
    const [contractors, setContractors] = useState<Contractor[]>([])
    const [loading, setLoading] = useState(true)
    const [showFilters, setShowFilters] = useState(false)

    // Load contractors from database
    useEffect(() => {
        async function loadContractors() {
            try {
                const response = await fetch('/api/contractors')
                if (response.ok) {
                    const data = await response.json()
                    setContractors(data)
                }
            } catch (error) {
                console.error('Failed to load contractors:', error)
            } finally {
                setLoading(false)
            }
        }
        loadContractors()
    }, [])

    // Filter contractors based on search term
    const filteredContractors = contractors.filter(contractor => {
        const matchesSearch = searchTerm === '' ||
            contractor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            contractor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))

        const matchesLocation = locationQuery === '' ||
            contractor.city.toLowerCase().includes(locationQuery.toLowerCase()) ||
            contractor.state.toLowerCase().includes(locationQuery.toLowerCase())

        return matchesSearch && matchesLocation
    })

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Find Granite Contractors Near You
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Connect with verified, experienced contractors and fabricators
                        </p>
                    </div>

                    {/* Search Bar - Always Visible */}
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by business name or specialty..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        value={locationQuery}
                                        onChange={(e) => setLocationQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Filter size={20} />
                                <span>Filters</span>
                            </button>
                        </div>
                    </div>

                    {/* Status */}
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">
                            Showing {filteredContractors.length} of {contractors.length} contractors
                        </p>
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading contractors...</p>
                    </div>
                ) : filteredContractors.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 mb-4">No contractors found matching your search.</p>
                        <button
                            onClick={() => {
                                setSearchTerm('')
                                setLocationQuery('')
                            }}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredContractors.map((contractor) => (
                            <div key={contractor.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                {/* Profile Image */}
                                <div className="h-48 bg-gray-200 relative">
                                    <ContractorImage
                                        src={`https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000)}?w=400&h=300&fit=crop&auto=format`}
                                        alt={`${contractor.businessName} - Kitchen Project`}
                                        className="w-full h-full object-cover"
                                        fallbackSrc="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
                                    />
                                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full shadow-md">
                                        <div className="flex items-center">
                                            <Star className="text-yellow-400 fill-current" size={14} />
                                            <span className="ml-1 text-sm font-medium text-gray-700">
                                                {contractor.rating.toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {contractor.businessName}
                                        </h3>
                                    </div>

                                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                                        <p>📍 {contractor.city}, {contractor.state}</p>
                                        {contractor.licenseNumber && (
                                            <p>🆔 License: {contractor.licenseNumber}</p>
                                        )}
                                        {contractor.phone && (
                                            <p>📞 {contractor.phone}</p>
                                        )}
                                        <p>⭐ {contractor.rating.toFixed(1)} stars ({contractor.reviewCount} reviews)</p>
                                    </div>

                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {contractor.specialties.slice(0, 3).map((specialty, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <Link
                                            href={`/contractors/${contractor.id}`}
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            View Details
                                        </Link>
                                        {contractor.website && (
                                            <a
                                                href={`https://${contractor.website}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 text-sm"
                                            >
                                                Visit Website →
                                            </a>
                                        )}
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
