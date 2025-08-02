'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Search, MapPin, Loader2, X } from 'lucide-react'
import { searchService, SearchFilters } from '@/lib/searchService'

interface LocationSearchProps {
    value: string
    onChange: (value: string) => void
    onLocationSelect?: (location: string, coordinates: { lat: number; lng: number }) => void
    placeholder?: string
    className?: string
}

export const LocationSearch: React.FC<LocationSearchProps> = ({
    value,
    onChange,
    onLocationSelect,
    placeholder = "Enter city, state, or zip code",
    className = ""
}) => {
    const [suggestions, setSuggestions] = useState<string[]>([])
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)
    const inputRef = useRef<HTMLInputElement>(null)
    const suggestionsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (value.length > 2) {
                setIsLoading(true)
                try {
                    const locationSuggestions = await searchService.getLocationSuggestions(value)
                    setSuggestions(locationSuggestions)
                    setShowSuggestions(locationSuggestions.length > 0)
                } catch (error) {
                    console.error('Failed to get location suggestions:', error)
                    setSuggestions([])
                } finally {
                    setIsLoading(false)
                }
            } else {
                setSuggestions([])
                setShowSuggestions(false)
            }
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [value])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        onChange(newValue)
        setSelectedIndex(-1)
    }

    const handleSuggestionClick = async (suggestion: string) => {
        onChange(suggestion)
        setShowSuggestions(false)
        setSuggestions([])

        if (onLocationSelect) {
            const coordinates = await searchService.geocodeLocation(suggestion)
            if (coordinates) {
                onLocationSelect(suggestion, coordinates)
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions) return

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setSelectedIndex(prev =>
                    prev < suggestions.length - 1 ? prev + 1 : prev
                )
                break
            case 'ArrowUp':
                e.preventDefault()
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
                break
            case 'Enter':
                e.preventDefault()
                if (selectedIndex >= 0) {
                    handleSuggestionClick(suggestions[selectedIndex])
                }
                break
            case 'Escape':
                setShowSuggestions(false)
                setSelectedIndex(-1)
                break
        }
    }

    const clearInput = () => {
        onChange('')
        setShowSuggestions(false)
        setSuggestions([])
        inputRef.current?.focus()
    }

    return (
        <div className={`relative ${className}`}>
            <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" size={20} />
                <input
                    ref={inputRef}
                    type="text"
                    value={value}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                    placeholder={placeholder}
                    className="w-full pl-12 pr-12 py-4 text-base border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                />
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex items-center">
                    {isLoading && <Loader2 className="animate-spin text-stone-400" size={18} />}
                    {value && !isLoading && (
                        <button
                            onClick={clearInput}
                            className="text-stone-400 hover:text-stone-600 transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}
                </div>
            </div>

            {showSuggestions && suggestions.length > 0 && (
                <div
                    ref={suggestionsRef}
                    className="absolute top-full left-0 right-0 z-50 bg-white border border-stone-200 rounded-xl shadow-lg mt-2 max-h-60 overflow-y-auto"
                >
                    {suggestions.map((suggestion, index) => (
                        <button
                            key={suggestion}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className={`w-full text-left px-4 py-3 hover:bg-amber-50 transition-colors border-b border-stone-100 last:border-b-0 ${index === selectedIndex ? 'bg-amber-50' : ''
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <MapPin size={16} className="text-amber-600 flex-shrink-0" />
                                <span className="text-stone-700">{suggestion}</span>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

interface SmartSearchProps {
    onSearch: (filters: SearchFilters) => void
    loading?: boolean
    className?: string
}

export const SmartSearch: React.FC<SmartSearchProps> = ({
    onSearch,
    loading = false,
    className = ""
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [location, setLocation] = useState('')
    const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | undefined>()
    const [filters, setFilters] = useState<SearchFilters>({
        location: '',
        radius: 25,
        minRating: 0,
        specialties: [],
        priceRange: '',
        availability: '',
        sortBy: 'distance'
    })

    const handleLocationSelect = (locationString: string, coords: { lat: number; lng: number }) => {
        setLocation(locationString)
        setCoordinates(coords)
        setFilters(prev => ({
            ...prev,
            location: locationString,
            coordinates: coords
        }))
    }

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()

        const searchFilters: SearchFilters = {
            ...filters,
            location,
            coordinates
        }

        // If no coordinates but we have a location, try to geocode it
        if (location && !coordinates) {
            const coords = await searchService.geocodeLocation(location)
            if (coords) {
                searchFilters.coordinates = coords
            }
        }

        onSearch(searchFilters)
    }

    const useCurrentLocation = async () => {
        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000
                })
            })

            const { latitude, longitude } = position.coords

            // Reverse geocode to get address
            try {
                const response = await fetch(
                    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
                )
                const data = await response.json()
                const locationString = `${data.city}, ${data.principalSubdivision}`

                setLocation(locationString)
                setCoordinates({ lat: latitude, lng: longitude })
                setFilters(prev => ({
                    ...prev,
                    location: locationString,
                    coordinates: { lat: latitude, lng: longitude }
                }))
            } catch (error) {
                console.error('Reverse geocoding failed:', error)
                setLocation('Current Location')
                setCoordinates({ lat: latitude, lng: longitude })
                setFilters(prev => ({
                    ...prev,
                    location: 'Current Location',
                    coordinates: { lat: latitude, lng: longitude }
                }))
            }
        } catch (error) {
            console.error('Failed to get current location:', error)
            alert('Unable to get your current location. Please enter your location manually.')
        }
    }

    return (
        <div className={`bg-white rounded-2xl shadow-construction border border-stone-200 p-6 ${className}`}>
            <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Search Term */}
                    <div className="lg:col-span-1">
                        <label className="block text-sm font-semibold text-stone-700 mb-2">
                            Service Needed
                        </label>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" size={20} />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Granite countertops, kitchen remodel..."
                                className="w-full pl-12 pr-4 py-4 text-base border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Location Search */}
                    <div className="lg:col-span-1">
                        <label className="block text-sm font-semibold text-stone-700 mb-2">
                            Location
                        </label>
                        <LocationSearch
                            value={location}
                            onChange={setLocation}
                            onLocationSelect={handleLocationSelect}
                            placeholder="City, state, or zip code"
                        />
                        <button
                            type="button"
                            onClick={useCurrentLocation}
                            className="mt-2 text-sm text-amber-600 hover:text-amber-700 font-medium"
                        >
                            📍 Use current location
                        </button>
                    </div>

                    {/* Radius */}
                    <div className="lg:col-span-1">
                        <label className="block text-sm font-semibold text-stone-700 mb-2">
                            Search Radius
                        </label>
                        <select
                            value={filters.radius}
                            onChange={(e) => setFilters(prev => ({ ...prev, radius: Number(e.target.value) }))}
                            className="w-full py-4 px-4 text-base border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                            <option value={10}>10 miles</option>
                            <option value={25}>25 miles</option>
                            <option value={50}>50 miles</option>
                            <option value={100}>100+ miles</option>
                        </select>
                    </div>
                </div>

                {/* Advanced Filters Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">
                            Minimum Rating
                        </label>
                        <select
                            value={filters.minRating}
                            onChange={(e) => setFilters(prev => ({ ...prev, minRating: Number(e.target.value) }))}
                            className="w-full py-3 px-4 text-base border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                            <option value={0}>Any Rating</option>
                            <option value={3}>3+ Stars</option>
                            <option value={4}>4+ Stars</option>
                            <option value={4.5}>4.5+ Stars</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">
                            Price Range
                        </label>
                        <select
                            value={filters.priceRange}
                            onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                            className="w-full py-3 px-4 text-base border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                            <option value="">Any Budget</option>
                            <option value="Budget">Budget Friendly</option>
                            <option value="Mid-Range">Mid-Range</option>
                            <option value="Premium">Premium</option>
                            <option value="Luxury">Luxury</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-stone-700 mb-2">
                            Sort By
                        </label>
                        <select
                            value={filters.sortBy}
                            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as SearchFilters['sortBy'] }))}
                            className="w-full py-3 px-4 text-base border border-stone-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                        >
                            <option value="distance">Distance</option>
                            <option value="rating">Highest Rated</option>
                            <option value="reviews">Most Reviews</option>
                            <option value="experience">Most Experience</option>
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <div className="flex justify-center">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white font-bold py-4 px-12 rounded-xl transition-colors duration-200 flex items-center space-x-3 shadow-lg min-w-[200px] justify-center"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                <span>Searching...</span>
                            </>
                        ) : (
                            <>
                                <Search size={20} />
                                <span>Find Contractors</span>
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}
