'use client'

import { useState, useMemo } from 'react'
import { Search, Filter, SlidersHorizontal, X, MapPin, Star, DollarSign } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FilterOptions {
    minRating: number
    maxDistance: number
    specialties: string[]
    priceRange: string[]
    verified: boolean
    minExperience: number
}

interface ProfessionalSearchProps {
    onSearch: (query: string, filters: FilterOptions) => void
    specialtyOptions: string[]
    className?: string
}

export function ProfessionalSearch({
    onSearch,
    specialtyOptions = [],
    className = ''
}: ProfessionalSearchProps) {
    const [searchQuery, setSearchQuery] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    const [filters, setFilters] = useState<FilterOptions>({
        minRating: 0,
        maxDistance: 50,
        specialties: [],
        priceRange: [],
        verified: false,
        minExperience: 0
    })

    const priceRanges = [
        '$1,000 - $3,000',
        '$3,000 - $5,000',
        '$5,000 - $8,000',
        '$8,000 - $12,000',
        '$12,000+'
    ]

    const handleSearch = () => {
        onSearch(searchQuery, filters)
    }

    const handleFilterChange = (key: keyof FilterOptions, value: any) => {
        const newFilters = { ...filters, [key]: value }
        setFilters(newFilters)
        onSearch(searchQuery, newFilters)
    }

    const handleSpecialtyToggle = (specialty: string) => {
        const newSpecialties = filters.specialties.includes(specialty)
            ? filters.specialties.filter(s => s !== specialty)
            : [...filters.specialties, specialty]
        handleFilterChange('specialties', newSpecialties)
    }

    const handlePriceRangeToggle = (range: string) => {
        const newRanges = filters.priceRange.includes(range)
            ? filters.priceRange.filter(r => r !== range)
            : [...filters.priceRange, range]
        handleFilterChange('priceRange', newRanges)
    }

    const clearFilters = () => {
        const clearedFilters = {
            minRating: 0,
            maxDistance: 50,
            specialties: [],
            priceRange: [],
            verified: false,
            minExperience: 0
        }
        setFilters(clearedFilters)
        onSearch(searchQuery, clearedFilters)
    }

    const activeFilterCount = useMemo(() => {
        let count = 0
        if (filters.minRating > 0) count++
        if (filters.maxDistance < 50) count++
        if (filters.specialties.length > 0) count++
        if (filters.priceRange.length > 0) count++
        if (filters.verified) count++
        if (filters.minExperience > 0) count++
        return count
    }, [filters])

    return (
        <div className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}>
            {/* Main Search Bar */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search contractors, materials, or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-gray-900 placeholder-gray-500"
                        />
                    </div>

                    <div className="flex gap-3">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`
                relative flex items-center gap-2 px-4 py-3 rounded-lg border transition-all duration-200
                ${showFilters
                                    ? 'bg-primary text-white border-primary shadow-md'
                                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                                }
              `}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span className="font-medium">Filters</span>
                            {activeFilterCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={handleSearch}
                            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium shadow-md hover:shadow-lg"
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-semibold text-gray-900">Advanced Filters</h3>
                                <button
                                    onClick={clearFilters}
                                    className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
                                >
                                    <X className="w-4 h-4" />
                                    Clear all
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {/* Rating Filter */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <Star className="w-4 h-4 text-yellow-500" />
                                        Minimum Rating
                                    </label>
                                    <select
                                        value={filters.minRating}
                                        onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
                                        className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20"
                                    >
                                        <option value={0}>Any rating</option>
                                        <option value={3}>3+ stars</option>
                                        <option value={4}>4+ stars</option>
                                        <option value={4.5}>4.5+ stars</option>
                                    </select>
                                </div>

                                {/* Distance Filter */}
                                <div className="space-y-3">
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                        <MapPin className="w-4 h-4 text-blue-500" />
                                        Max Distance: {filters.maxDistance} miles
                                    </label>
                                    <input
                                        type="range"
                                        min="5"
                                        max="50"
                                        value={filters.maxDistance}
                                        onChange={(e) => handleFilterChange('maxDistance', Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                </div>

                                {/* Experience Filter */}
                                <div className="space-y-3">
                                    <label className="text-sm font-medium text-gray-700">
                                        Minimum Experience: {filters.minExperience} years
                                    </label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="20"
                                        value={filters.minExperience}
                                        onChange={(e) => handleFilterChange('minExperience', Number(e.target.value))}
                                        className="w-full accent-primary"
                                    />
                                </div>
                            </div>

                            {/* Specialties */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-3">
                                    Specialties
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {specialtyOptions.map((specialty) => (
                                        <motion.button
                                            key={specialty}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handleSpecialtyToggle(specialty)}
                                            className={`
                        px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                        ${filters.specialties.includes(specialty)
                                                    ? 'bg-primary text-white shadow-md'
                                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-primary/30 hover:bg-primary/5'
                                                }
                      `}
                                        >
                                            {specialty}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mt-6">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                    <DollarSign className="w-4 h-4 text-green-500" />
                                    Price Range
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {priceRanges.map((range) => (
                                        <motion.button
                                            key={range}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => handlePriceRangeToggle(range)}
                                            className={`
                        px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                        ${filters.priceRange.includes(range)
                                                    ? 'bg-green-100 text-green-800 border border-green-200'
                                                    : 'bg-white text-gray-700 border border-gray-200 hover:border-green-300 hover:bg-green-50'
                                                }
                      `}
                                        >
                                            {range}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Verified Toggle */}
                            <div className="mt-6">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.verified}
                                        onChange={(e) => handleFilterChange('verified', e.target.checked)}
                                        className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary/20"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        Show only verified contractors
                                    </span>
                                </label>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
