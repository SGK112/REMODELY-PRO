// Enhanced Search Service with Google Maps Integration
import { GoogleMapsService } from './maps'
import { LocationService, LocationData } from './location'

export interface SearchFilters {
    location: string
    coordinates?: { lat: number; lng: number }
    radius: number // in miles
    minRating: number
    specialties: string[]
    priceRange: string
    availability: string
    sortBy: 'distance' | 'rating' | 'reviews' | 'experience'
}

export interface ContractorSearchResult {
    id: string
    name: string
    businessName: string
    rating: number
    reviewCount: number
    location: string
    coordinates?: { lat: number; lng: number }
    distance?: number // in miles
    specialties: string[]
    yearsExperience: number
    profileImage: string
    portfolioImages: string[]
    description: string
    verified: boolean
    phone: string
    website?: string
    priceRange: string
    premium?: boolean
    featured?: boolean
}

export class EnhancedSearchService {
    private static instance: EnhancedSearchService
    private googleMapsService: GoogleMapsService
    private locationService: LocationService

    private constructor() {
        this.googleMapsService = GoogleMapsService.getInstance()
        this.locationService = LocationService.getInstance()
    }

    public static getInstance(): EnhancedSearchService {
        if (!EnhancedSearchService.instance) {
            EnhancedSearchService.instance = new EnhancedSearchService()
        }
        return EnhancedSearchService.instance
    }

    // Geocode location string to coordinates
    async geocodeLocation(locationString: string): Promise<{ lat: number; lng: number } | null> {
        try {
            return await this.googleMapsService.geocodeAddress(locationString)
        } catch (error) {
            console.error('Geocoding failed:', error)
            return null
        }
    }

    // Get location suggestions using Google Places API
    async getLocationSuggestions(query: string): Promise<string[]> {
        try {
            const google = await this.googleMapsService.loadGoogleMaps()
            const service = new google.maps.places.AutocompleteService()

            return new Promise((resolve) => {
                service.getPlacePredictions(
                    {
                        input: query,
                        types: ['(cities)'],
                        componentRestrictions: { country: 'us' }
                    },
                    (predictions, status) => {
                        if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                            const suggestions = predictions.map(prediction => prediction.description)
                            resolve(suggestions.slice(0, 5)) // Limit to 5 suggestions
                        } else {
                            resolve([])
                        }
                    }
                )
            })
        } catch (error) {
            console.error('Failed to get location suggestions:', error)
            return []
        }
    }

    // Calculate distance between two coordinates using Haversine formula
    calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
        const R = 3959 // Earth's radius in miles
        const dLat = this.toRadians(lat2 - lat1)
        const dLng = this.toRadians(lng2 - lng1)

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180)
    }

    // Search contractors with advanced filtering
    async searchContractors(
        contractors: ContractorSearchResult[],
        filters: SearchFilters
    ): Promise<ContractorSearchResult[]> {
        let results = [...contractors]

        // Get coordinates for search location if not provided
        if (filters.location && !filters.coordinates) {
            const coordinates = await this.geocodeLocation(filters.location)
            if (coordinates) {
                filters.coordinates = coordinates
            }
        }

        // Filter by location and radius
        if (filters.coordinates) {
            results = results.filter(contractor => {
                if (!contractor.coordinates) return false

                const distance = this.calculateDistance(
                    filters.coordinates!.lat,
                    filters.coordinates!.lng,
                    contractor.coordinates.lat,
                    contractor.coordinates.lng
                )

                contractor.distance = Math.round(distance * 10) / 10 // Round to 1 decimal place
                return distance <= filters.radius
            })
        }

        // Filter by minimum rating
        if (filters.minRating > 0) {
            results = results.filter(contractor => contractor.rating >= filters.minRating)
        }

        // Filter by specialties
        if (filters.specialties.length > 0) {
            results = results.filter(contractor =>
                filters.specialties.some(specialty =>
                    contractor.specialties.some(contractorSpecialty =>
                        contractorSpecialty.toLowerCase().includes(specialty.toLowerCase())
                    )
                )
            )
        }

        // Filter by price range
        if (filters.priceRange) {
            results = results.filter(contractor => contractor.priceRange === filters.priceRange)
        }

        // Sort results
        results = this.sortContractors(results, filters.sortBy)

        return results
    }

    // Sort contractors based on specified criteria
    private sortContractors(
        contractors: ContractorSearchResult[],
        sortBy: SearchFilters['sortBy']
    ): ContractorSearchResult[] {
        return contractors.sort((a, b) => {
            // Featured contractors always come first
            if (a.featured && !b.featured) return -1
            if (!a.featured && b.featured) return 1

            // Then premium contractors
            if (a.premium && !b.premium) return -1
            if (!a.premium && b.premium) return 1

            switch (sortBy) {
                case 'distance':
                    return (a.distance || Infinity) - (b.distance || Infinity)
                case 'rating':
                    return b.rating - a.rating
                case 'reviews':
                    return b.reviewCount - a.reviewCount
                case 'experience':
                    return b.yearsExperience - a.yearsExperience
                default:
                    return 0
            }
        })
    }

    // Get nearby contractors based on current location
    async getNearbyContractors(
        contractors: ContractorSearchResult[],
        radiusMiles: number = 25
    ): Promise<ContractorSearchResult[]> {
        try {
            const currentLocation = await this.locationService.getCurrentLocation()

            const filters: SearchFilters = {
                location: currentLocation.formattedAddress,
                coordinates: { lat: currentLocation.lat, lng: currentLocation.lng },
                radius: radiusMiles,
                minRating: 0,
                specialties: [],
                priceRange: '',
                availability: '',
                sortBy: 'distance'
            }

            return await this.searchContractors(contractors, filters)
        } catch (error) {
            console.error('Failed to get nearby contractors:', error)
            return contractors
        }
    }

    // Search contractors by specialty in a specific location
    async searchBySpecialty(
        contractors: ContractorSearchResult[],
        specialty: string,
        location: string,
        radius: number = 25
    ): Promise<ContractorSearchResult[]> {
        const filters: SearchFilters = {
            location,
            radius,
            minRating: 0,
            specialties: [specialty],
            priceRange: '',
            availability: '',
            sortBy: 'rating'
        }

        return await this.searchContractors(contractors, filters)
    }

    // Get contractors for map display
    getContractorsForMap(contractors: ContractorSearchResult[]): ContractorSearchResult[] {
        return contractors.filter(contractor => contractor.coordinates)
    }

    // Get search suggestions based on query
    async getSearchSuggestions(query: string): Promise<{
        locations: string[]
        specialties: string[]
        companies: string[]
    }> {
        const suggestions = {
            locations: await this.getLocationSuggestions(query),
            specialties: this.getSpecialtySuggestions(query),
            companies: this.getCompanySuggestions(query)
        }

        return suggestions
    }

    private getSpecialtySuggestions(query: string): string[] {
        const specialties = [
            'Granite Countertops',
            'Quartz Installation',
            'Marble Work',
            'Kitchen Remodeling',
            'Bathroom Renovation',
            'Outdoor Kitchen',
            'Fireplace Surrounds',
            'Commercial Stone Work',
            'Stone Repair',
            'Custom Fabrication'
        ]

        return specialties
            .filter(specialty => specialty.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 5)
    }

    private getCompanySuggestions(query: string): string[] {
        // This would typically come from your database
        const companies = [
            'Premium Stone Solutions',
            'Mirage Marble & Granite',
            'Elite Countertops',
            'Stone Masters',
            'Granite Pros'
        ]

        return companies
            .filter(company => company.toLowerCase().includes(query.toLowerCase()))
            .slice(0, 3)
    }
}

export const searchService = EnhancedSearchService.getInstance()
