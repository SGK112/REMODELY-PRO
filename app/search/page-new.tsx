'use client'

import { SmartSearch } from '@/components/ui/SmartSearch'
import { SearchFilters } from '@/lib/searchService'
import Link from 'next/link'

export default function SearchPage() {
    const handleSearch = async (filters: SearchFilters) => {
        // Build URL parameters
        const params = new URLSearchParams()
        if (filters.location) params.set('location', filters.location)
        if (filters.radius !== 25) params.set('radius', filters.radius.toString())
        if (filters.minRating > 0) params.set('rating', filters.minRating.toString())
        if (filters.specialties.length > 0) params.set('specialties', filters.specialties.join(','))
        if (filters.priceRange) params.set('price', filters.priceRange)
        if (filters.sortBy !== 'distance') params.set('sort', filters.sortBy)

        // Redirect to contractors page with search parameters
        window.location.href = `/contractors?${params.toString()}`
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Hero Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Find the Perfect Contractor
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Connect with vetted, licensed contractors in your area. Get quotes, read reviews, and hire with confidence.
                        </p>
                    </div>

                    {/* Enhanced Search Component */}
                    <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
                        <div className="mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Start Your Search</h2>
                            <p className="text-gray-600">Use our advanced search with Google Maps integration for pinpoint accuracy</p>
                        </div>

                        <SmartSearch onSearch={handleSearch} />
                    </div>

                    {/* Popular Services */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Popular Services</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: 'Kitchen Remodeling', count: '145 contractors' },
                                { name: 'Bathroom Remodeling', count: '128 contractors' },
                                { name: 'Roofing', count: '97 contractors' },
                                { name: 'Electrical', count: '86 contractors' },
                                { name: 'Plumbing', count: '92 contractors' },
                                { name: 'HVAC', count: '74 contractors' },
                                { name: 'Flooring', count: '81 contractors' },
                                { name: 'Painting', count: '103 contractors' }
                            ].map((service) => (
                                <Link
                                    key={service.name}
                                    href={`/contractors?specialties=${encodeURIComponent(service.name)}`}
                                    className="block p-4 bg-gray-50 rounded-xl hover:bg-orange-50 hover:border-orange-200 border border-transparent transition-colors"
                                >
                                    <div className="font-medium text-gray-900">{service.name}</div>
                                    <div className="text-sm text-gray-600">{service.count}</div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
