// Advanced Smart Matching System for REMODELY AI PRO
import { GoogleMapsService } from './maps'

export interface SmartMatchCriteria {
    projectType: string
    budget: string
    timeline: string
    location: {
        address: string
        coordinates?: { lat: number; lng: number }
        radius?: number // miles
    }
    preferences: {
        rating?: number
        certifications?: string[]
        specialties?: string[]
        experienceLevel?: 'beginner' | 'intermediate' | 'expert'
        businessSize?: 'individual' | 'small' | 'medium' | 'large'
    }
    requirements: {
        licensed?: boolean
        insured?: boolean
        bonded?: boolean
        backgroundCheck?: boolean
    }
}

export interface SmartMatchResult {
    contractor: any
    matchScore: number
    matchReasons: string[]
    distance: number
    estimatedResponseTime: string
    priceCompatibility: 'excellent' | 'good' | 'fair' | 'poor'
    availabilityScore: number
}

export interface LocationData {
    address: string
    coordinates: { lat: number; lng: number }
    city: string
    state: string
    zipCode: string
    county?: string
    timezone?: string
}

export class SmartMatchingService {
    private static instance: SmartMatchingService
    private mapsService: GoogleMapsService

    private constructor() {
        this.mapsService = GoogleMapsService.getInstance()
    }

    static getInstance(): SmartMatchingService {
        if (!SmartMatchingService.instance) {
            SmartMatchingService.instance = new SmartMatchingService()
        }
        return SmartMatchingService.instance
    }

    /**
     * Advanced AI-powered matching algorithm
     */
    async findMatches(criteria: SmartMatchCriteria, contractors: any[]): Promise<SmartMatchResult[]> {
        console.log('🎯 Starting smart matching with criteria:', criteria)

        const results: SmartMatchResult[] = []

        for (const contractor of contractors) {
            try {
                const matchResult = await this.calculateMatchScore(criteria, contractor)
                if (matchResult.matchScore > 0.3) { // Only show matches above 30%
                    results.push(matchResult)
                }
            } catch (error) {
                console.error('Error calculating match for contractor:', contractor.id, error)
            }
        }

        // Sort by match score (highest first)
        results.sort((a, b) => b.matchScore - a.matchScore)

        console.log(`✅ Found ${results.length} matches, top score: ${results[0]?.matchScore?.toFixed(2) || 'N/A'}`)
        return results.slice(0, 20) // Return top 20 matches
    }

    private async calculateMatchScore(criteria: SmartMatchCriteria, contractor: any): Promise<SmartMatchResult> {
        const matchReasons: string[] = []
        let totalScore = 0
        let maxPossibleScore = 0

        // 1. Specialty Match (25% weight)
        const specialtyScore = this.calculateSpecialtyScore(criteria, contractor, matchReasons)
        totalScore += specialtyScore * 0.25
        maxPossibleScore += 0.25

        // 2. Location/Distance (20% weight)
        const distanceScore = await this.calculateDistanceScore(criteria, contractor, matchReasons)
        totalScore += distanceScore.score * 0.20
        maxPossibleScore += 0.20

        // 3. Rating & Reviews (15% weight)
        const ratingScore = this.calculateRatingScore(criteria, contractor, matchReasons)
        totalScore += ratingScore * 0.15
        maxPossibleScore += 0.15

        // 4. Budget Compatibility (15% weight)
        const budgetScore = this.calculateBudgetScore(criteria, contractor, matchReasons)
        totalScore += budgetScore.score * 0.15
        maxPossibleScore += 0.15

        // 5. Experience Level (10% weight)
        const experienceScore = this.calculateExperienceScore(criteria, contractor, matchReasons)
        totalScore += experienceScore * 0.10
        maxPossibleScore += 0.10

        // 6. Certifications & Requirements (10% weight)
        const certificationScore = this.calculateCertificationScore(criteria, contractor, matchReasons)
        totalScore += certificationScore * 0.10
        maxPossibleScore += 0.10

        // 7. Availability (5% weight)
        const availabilityScore = this.calculateAvailabilityScore(contractor, matchReasons)
        totalScore += availabilityScore.score * 0.05
        maxPossibleScore += 0.05

        const finalScore = totalScore / maxPossibleScore

        return {
            contractor,
            matchScore: finalScore,
            matchReasons,
            distance: distanceScore.distance,
            estimatedResponseTime: availabilityScore.responseTime,
            priceCompatibility: budgetScore.compatibility,
            availabilityScore: availabilityScore.score
        }
    }

    private calculateSpecialtyScore(criteria: SmartMatchCriteria, contractor: any, reasons: string[]): number {
        const contractorSpecialties = contractor.specialties || []
        const projectType = criteria.projectType.toLowerCase()

        // Direct specialty match
        const directMatch = contractorSpecialties.some((spec: string) =>
            spec.toLowerCase().includes(projectType) || projectType.includes(spec.toLowerCase())
        )

        if (directMatch) {
            reasons.push(`Specializes in ${criteria.projectType}`)
            return 1.0
        }

        // Related specialty match
        const relatedMatches = this.getRelatedSpecialties(projectType)
        const relatedMatch = contractorSpecialties.some((spec: string) =>
            relatedMatches.some(related => spec.toLowerCase().includes(related))
        )

        if (relatedMatch) {
            reasons.push(`Experience with related projects`)
            return 0.7
        }

        // General contractor fallback
        if (contractorSpecialties.some((spec: string) => spec.toLowerCase().includes('general'))) {
            reasons.push(`General contractor with broad experience`)
            return 0.4
        }

        return 0.1
    }

    private async calculateDistanceScore(criteria: SmartMatchCriteria, contractor: any, reasons: string[]): Promise<{ score: number, distance: number }> {
        const maxRadius = criteria.location.radius || 25 // Default 25 mile radius

        // If we have coordinates for both, calculate precise distance
        if (criteria.location.coordinates && contractor.coordinates) {
            const distance = this.calculateDistance(
                criteria.location.coordinates,
                contractor.coordinates
            )

            if (distance <= maxRadius) {
                const score = Math.max(0, 1 - (distance / maxRadius))
                reasons.push(`${distance.toFixed(1)} miles away`)
                return { score, distance }
            }

            return { score: 0, distance }
        }

        // Fallback to location string comparison
        const contractorLocation = contractor.location || contractor.city || ''
        const userLocation = criteria.location.address

        if (contractorLocation.toLowerCase().includes(userLocation.toLowerCase()) ||
            userLocation.toLowerCase().includes(contractorLocation.toLowerCase())) {
            reasons.push(`Located in your area`)
            return { score: 0.8, distance: 5 } // Estimated local distance
        }

        return { score: 0.2, distance: 50 } // Unknown distance penalty
    }

    private calculateRatingScore(criteria: SmartMatchCriteria, contractor: any, reasons: string[]): number {
        const rating = contractor.rating || 0
        const reviewCount = contractor.reviewCount || 0
        const minRating = criteria.preferences.rating || 3.0

        if (rating >= minRating) {
            if (rating >= 4.8 && reviewCount >= 50) {
                reasons.push(`Excellent rating (${rating}⭐) with ${reviewCount} reviews`)
                return 1.0
            } else if (rating >= 4.5 && reviewCount >= 20) {
                reasons.push(`Great rating (${rating}⭐) with ${reviewCount} reviews`)
                return 0.9
            } else if (rating >= 4.0) {
                reasons.push(`Good rating (${rating}⭐)`)
                return 0.7
            } else {
                return 0.5
            }
        }

        return 0.1
    }

    private calculateBudgetScore(criteria: SmartMatchCriteria, contractor: any, reasons: string[]): { score: number, compatibility: 'excellent' | 'good' | 'fair' | 'poor' } {
        const contractorPrice = contractor.priceRange || '$$'
        const userBudget = criteria.budget

        const priceMap: { [key: string]: number } = {
            '$ (Budget)': 1,
            '$$ (Standard)': 2,
            '$$$ (Premium)': 3,
            '$$$$ (Luxury)': 4
        }

        const contractorLevel = priceMap[contractorPrice] || 2
        const userLevel = priceMap[userBudget] || 2

        const difference = Math.abs(contractorLevel - userLevel)

        if (difference === 0) {
            reasons.push(`Perfect budget match`)
            return { score: 1.0, compatibility: 'excellent' }
        } else if (difference === 1) {
            reasons.push(`Good budget compatibility`)
            return { score: 0.8, compatibility: 'good' }
        } else if (difference === 2) {
            reasons.push(`Fair budget match`)
            return { score: 0.4, compatibility: 'fair' }
        } else {
            return { score: 0.1, compatibility: 'poor' }
        }
    }

    private calculateExperienceScore(criteria: SmartMatchCriteria, contractor: any, reasons: string[]): number {
        const years = contractor.yearsExperience || 0
        const preferredLevel = criteria.preferences.experienceLevel

        if (preferredLevel === 'expert' && years >= 15) {
            reasons.push(`${years} years of expert experience`)
            return 1.0
        } else if (preferredLevel === 'intermediate' && years >= 5 && years < 15) {
            reasons.push(`${years} years of solid experience`)
            return 1.0
        } else if (preferredLevel === 'beginner' && years < 5) {
            reasons.push(`Newer contractor with competitive rates`)
            return 1.0
        } else if (years >= 10) {
            reasons.push(`${years} years of experience`)
            return 0.8
        } else if (years >= 5) {
            reasons.push(`${years} years of experience`)
            return 0.6
        }

        return 0.3
    }

    private calculateCertificationScore(criteria: SmartMatchCriteria, contractor: any, reasons: string[]): number {
        const contractorCerts = contractor.certifications || []
        const requirements = criteria.requirements
        let score = 0.5 // Base score

        if (requirements.licensed && contractorCerts.some((cert: string) => cert.toLowerCase().includes('licensed'))) {
            reasons.push(`Licensed contractor`)
            score += 0.2
        }

        if (requirements.insured && contractorCerts.some((cert: string) => cert.toLowerCase().includes('insured'))) {
            reasons.push(`Fully insured`)
            score += 0.2
        }

        if (contractor.verified) {
            reasons.push(`Verified business`)
            score += 0.1
        }

        return Math.min(score, 1.0)
    }

    private calculateAvailabilityScore(contractor: any, reasons: string[]): { score: number, responseTime: string } {
        const responseHours = contractor.averageResponseHours || 24

        if (responseHours <= 2) {
            reasons.push(`Quick response (${responseHours}h average)`)
            return { score: 1.0, responseTime: 'Same day' }
        } else if (responseHours <= 8) {
            reasons.push(`Fast response (${responseHours}h average)`)
            return { score: 0.8, responseTime: 'Within 8 hours' }
        } else if (responseHours <= 24) {
            reasons.push(`Responds within 24 hours`)
            return { score: 0.6, responseTime: 'Within 24 hours' }
        } else {
            return { score: 0.3, responseTime: '1-2 business days' }
        }
    }

    private getRelatedSpecialties(projectType: string): string[] {
        const specialtyMap: { [key: string]: string[] } = {
            'kitchen': ['countertop', 'cabinet', 'remodel', 'renovation'],
            'bathroom': ['plumbing', 'tile', 'remodel', 'renovation'],
            'countertop': ['kitchen', 'granite', 'quartz', 'marble'],
            'flooring': ['tile', 'hardwood', 'laminate', 'vinyl'],
            'plumbing': ['bathroom', 'kitchen', 'pipe', 'fixture'],
            'electrical': ['wiring', 'lighting', 'panel', 'outlet'],
        }

        return specialtyMap[projectType] || []
    }

    private calculateDistance(coord1: { lat: number, lng: number }, coord2: { lat: number, lng: number }): number {
        const R = 3959 // Earth's radius in miles
        const dLat = this.toRad(coord2.lat - coord1.lat)
        const dLon = this.toRad(coord2.lng - coord1.lng)
        const lat1 = this.toRad(coord1.lat)
        const lat2 = this.toRad(coord2.lat)

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

        return R * c
    }

    private toRad(value: number): number {
        return value * Math.PI / 180
    }
}

export class LocationService {
    private static instance: LocationService
    private mapsService: GoogleMapsService

    private constructor() {
        this.mapsService = GoogleMapsService.getInstance()
    }

    static getInstance(): LocationService {
        if (!LocationService.instance) {
            LocationService.instance = new LocationService()
        }
        return LocationService.instance
    }

    /**
     * Get user's current location using browser geolocation
     */
    async getCurrentLocation(): Promise<{ lat: number, lng: number } | null> {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                console.warn('Geolocation not supported')
                resolve(null)
                return
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                },
                (error) => {
                    console.error('Geolocation error:', error)
                    resolve(null)
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            )
        })
    }

    /**
     * Geocode an address to coordinates
     */
    async geocodeAddress(address: string): Promise<LocationData | null> {
        try {
            const google = await this.mapsService.loadGoogleMaps()
            const geocoder = new google.maps.Geocoder()

            return new Promise((resolve) => {
                geocoder.geocode({ address }, (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        const result = results[0]
                        const location = result.geometry.location

                        const locationData: LocationData = {
                            address: result.formatted_address,
                            coordinates: {
                                lat: location.lat(),
                                lng: location.lng()
                            },
                            city: this.extractComponent(result, 'locality'),
                            state: this.extractComponent(result, 'administrative_area_level_1'),
                            zipCode: this.extractComponent(result, 'postal_code'),
                            county: this.extractComponent(result, 'administrative_area_level_2'),
                        }

                        resolve(locationData)
                    } else {
                        console.error('Geocoding failed:', status)
                        resolve(null)
                    }
                })
            })
        } catch (error) {
            console.error('Geocoding error:', error)
            return null
        }
    }

    /**
     * Reverse geocode coordinates to address
     */
    async reverseGeocode(lat: number, lng: number): Promise<LocationData | null> {
        try {
            const google = await this.mapsService.loadGoogleMaps()
            const geocoder = new google.maps.Geocoder()

            return new Promise((resolve) => {
                geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        const result = results[0]

                        const locationData: LocationData = {
                            address: result.formatted_address,
                            coordinates: { lat, lng },
                            city: this.extractComponent(result, 'locality'),
                            state: this.extractComponent(result, 'administrative_area_level_1'),
                            zipCode: this.extractComponent(result, 'postal_code'),
                            county: this.extractComponent(result, 'administrative_area_level_2'),
                        }

                        resolve(locationData)
                    } else {
                        console.error('Reverse geocoding failed:', status)
                        resolve(null)
                    }
                })
            })
        } catch (error) {
            console.error('Reverse geocoding error:', error)
            return null
        }
    }

    private extractComponent(result: google.maps.GeocoderResult, type: string): string {
        const component = result.address_components.find(comp => comp.types.includes(type))
        return component ? component.long_name : ''
    }

    /**
     * Check if location services are enabled
     */
    isLocationServiceEnabled(): boolean {
        return 'geolocation' in navigator
    }

    /**
     * Request location permission
     */
    async requestLocationPermission(): Promise<boolean> {
        if (!this.isLocationServiceEnabled()) {
            return false
        }

        try {
            const position = await this.getCurrentLocation()
            return position !== null
        } catch (error) {
            console.error('Location permission error:', error)
            return false
        }
    }
}

// Export singleton instances
export const smartMatchingService = SmartMatchingService.getInstance()
export const locationService = LocationService.getInstance()
