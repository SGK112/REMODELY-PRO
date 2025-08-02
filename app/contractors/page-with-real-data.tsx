// Enhanced contractors page that uses REAL database data
'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Star, Filter, Grid, List } from 'lucide-react'
import Link from 'next/link'

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
}

export default function ContractorsPageEnhanced() {
    const [contractors, setContractors] = useState<Contractor[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [location, setLocation] = useState('Phoenix, AZ')
    const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
    const [priceRange, setPriceRange] = useState('')
    const [rating, setRating] = useState(0)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [showFilters, setShowFilters] = useState(false)
    const [filteredContractors, setFilteredContractors] = useState<Contractor[]>([])
    const [dataSource, setDataSource] = useState<'mock' | 'database'>('mock')

    // Load contractors from database
    const loadRealContractors = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/contractors?page=1&limit=50')
            if (response.ok) {
                const data = await response.json()

                // Transform database data to match frontend interface
                const transformedContractors = data.contractors.map((contractor: any) => ({
                    id: contractor.id,
                    name: contractor.user.name,
                    businessName: contractor.businessName,
                    rating: contractor.rating || 4.5,
                    reviewCount: contractor.reviewCount || 0,
                    location: `${contractor.city}, ${contractor.state}`,
                    distance: '0 miles', // Calculate based on user location
                    specialties: JSON.parse(contractor.specialties || '[]'),
                    yearsExperience: contractor.yearsExperience || 5,
                    profileImage: contractor.user.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                    portfolioImages: JSON.parse(contractor.portfolioImages || '[]'),
                    description: contractor.description || 'Professional contractor services',
                    verified: contractor.isVerified,
                    phone: contractor.phone,
                    website: contractor.website,
                    priceRange: '$$' // Default, could be calculated
                }))

                setContractors(transformedContractors)
                setDataSource('database')
                console.log(`✅ Loaded ${transformedContractors.length} contractors from database`)
            } else {
                throw new Error('Failed to load contractors')
            }
        } catch (error) {
            console.error('Error loading contractors:', error)
            // Fall back to mock data
            loadMockContractors()
        } finally {
            setLoading(false)
        }
    }

    // Mock data fallback
    const loadMockContractors = () => {
        const MOCK_CONTRACTORS = [
            {
                id: '1',
                name: 'Michael Rodriguez',
                businessName: 'Rodriguez Granite Works',
                rating: 4.9,
                reviewCount: 127,
                location: 'Phoenix, AZ',
                distance: '2.3 miles',
                specialties: ['Kitchen Remodeling', 'Granite Installation', 'Quartz Countertops'],
                yearsExperience: 15,
                profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                portfolioImages: [
                    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop',
                    'https://images.unsplash.com/photo-1556909114-f3bda3dd4b3f?w=300&h=200&fit=crop'
                ],
                description: 'Specializing in premium granite and quartz installations with over 15 years of experience.',
                verified: true,
                phone: '(602) 555-0123',
                website: 'rodriguezgranite.com',
                priceRange: '$$$'
            }
        ]

        setContractors(MOCK_CONTRACTORS)
        setDataSource('mock')
    }

    useEffect(() => {
        // Try to load real data first, fall back to mock
        loadRealContractors()
    }, [])

    // Filter logic
    useEffect(() => {
        let filtered = contractors.filter(contractor => {
            const matchesSearch = contractor.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                contractor.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesSpecialties = selectedSpecialties.length === 0 ||
                selectedSpecialties.some(specialty => contractor.specialties.includes(specialty))

            const matchesPriceRange = !priceRange || contractor.priceRange === priceRange
            const matchesRating = contractor.rating >= rating

            return matchesSearch && matchesSpecialties && matchesPriceRange && matchesRating
        })

        setFilteredContractors(filtered)
    }, [contractors, searchTerm, selectedSpecialties, priceRange, rating])

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
        <div className="min-h-screen bg-gray-50">
            {/* Data Source Indicator */}
            <div className="bg-blue-50 border-b border-blue-200">
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
                                        🎭 Demo Data - Using sample contractors
                                    </span>
                                </>
                            )}
                        </div>
                        <button
                            onClick={loadRealContractors}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            🔄 Refresh Data
                        </button>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Find Granite Contractors Near You
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Connect with verified, experienced contractors and fabricators in your area
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-4xl mx-auto">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search by business name or specialty..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <div className="relative md:w-64">
                                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Location"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2 ${showFilters ? 'bg-gray-50' : ''}`}
                            >
                                <Filter size={20} />
                                <span>Filters</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Filters */}
                    {showFilters && (
                        <div className="lg:w-80">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>

                                {/* Specialties */}
                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-900 mb-3">Specialties</h4>
                                    <div className="space-y-2">
                                        {['Kitchen Remodeling', 'Bathroom Remodeling', 'Granite Installation', 'Quartz Countertops', 'Marble Work', 'Custom Fabrication'].map(specialty => (
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
                                                    name="priceRange"
                                                    value={price}
                                                    checked={priceRange === price}
                                                    onChange={(e) => setPriceRange(e.target.value)}
                                                    className="border-gray-300 text-primary-600 focus:ring-primary-500"
                                                />
                                                <span className="ml-2 text-sm text-gray-700">{price}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* Rating */}
                                <div className="mb-6">
                                    <h4 className="font-medium text-gray-900 mb-3">Minimum Rating</h4>
                                    <div className="flex items-center space-x-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                className={`p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                            >
                                                <Star size={20} fill="currentColor" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setSearchTerm('')
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
                    )}

                    {/* Results */}
                    <div className="flex-1">
                        {/* Results Header */}
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-900">
                                    {filteredContractors.length} Contractors Found
                                </h2>
                                <p className="text-gray-600">in {location}</p>
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
                                        className={`p-2 ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                                    >
                                        <Grid size={20} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
                                    >
                                        <List size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Contractor Grid/List */}
                        {filteredContractors.length > 0 ? (
                            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                                {filteredContractors.map(contractor => (
                                    <ContractorCard key={contractor.id} contractor={contractor} viewMode={viewMode} />
                                ))}
                            </div>
                        ) : (
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
                        <img
                            src={contractor.profileImage}
                            alt={contractor.name}
                            className="w-24 h-24 rounded-full object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                            <div>
                                <div className="flex items-center space-x-2 mb-1">
                                    <h3 className="text-xl font-semibold text-gray-900">{contractor.businessName}</h3>
                                    {contractor.verified && (
                                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                                            ✅ Verified
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

                        <div className="flex justify-between items-center">
                            <div className="flex space-x-2">
                                {contractor.portfolioImages.slice(0, 3).map((image, idx) => (
                                    <img
                                        key={idx}
                                        src={image}
                                        alt="Portfolio"
                                        className="w-16 h-16 rounded object-cover"
                                    />
                                ))}
                            </div>

                            <div className="flex space-x-3">
                                <Link href={`/contractors/${contractor.id}`} className="btn-outline">
                                    View Profile
                                </Link>
                                <button className="btn-primary">Get Quote</button>
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
                <img
                    src={contractor.portfolioImages[0] || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop'}
                    alt="Portfolio"
                    className="w-full h-48 object-cover"
                />
                {contractor.verified && (
                    <span className="absolute top-3 right-3 bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                        ✅ Verified
                    </span>
                )}
            </div>

            <div className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                    <img
                        src={contractor.profileImage}
                        alt={contractor.name}
                        className="w-12 h-12 rounded-full object-cover"
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
            </div>
        </div>
    )
}
