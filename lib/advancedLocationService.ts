/**
 * Advanced Location Service for Remodely AI
 * Provides precise geolocation, distance calculation, and location intelligence
 */

export interface LocationCoordinates {
    lat: number
    lng: number
}

export interface LocationDetails {
    formatted: string
    city: string
    state: string
    zipCode: string
    country?: string
}

export interface DrivingInfo {
    duration: number // in minutes
    distance: number // in miles
}

class AdvancedLocationService {
    private static instance: AdvancedLocationService
    private apiKey: string | undefined

    private constructor() {
        this.apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    }

    static getInstance(): AdvancedLocationService {
        if (!AdvancedLocationService.instance) {
            AdvancedLocationService.instance = new AdvancedLocationService()
        }
        return AdvancedLocationService.instance
    }

    async getCurrentLocation(): Promise<LocationCoordinates> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser'))
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
                    reject(new Error(`Failed to get current location: ${error.message}`))
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000 // 5 minutes
                }
            )
        })
    }

    async reverseGeocode(coordinates: LocationCoordinates): Promise<LocationDetails> {
        if (!this.apiKey) {
            // Fallback when no API key
            return {
                formatted: `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`,
                city: 'Unknown City',
                state: 'Unknown State',
                zipCode: '00000'
            }
        }

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates.lat},${coordinates.lng}&key=${this.apiKey}`
            )

            if (!response.ok) {
                throw new Error('Geocoding API request failed')
            }

            const data = await response.json()

            if (data.status !== 'OK' || !data.results.length) {
                throw new Error('No results found for coordinates')
            }

            const result = data.results[0]
            const components = result.address_components

            return {
                formatted: result.formatted_address,
                city: this.extractComponent(components, 'locality') || 'Unknown City',
                state: this.extractComponent(components, 'administrative_area_level_1') || 'Unknown State',
                zipCode: this.extractComponent(components, 'postal_code') || '00000'
            }
        } catch (error) {
            console.warn('Reverse geocoding failed:', error)
            return {
                formatted: `${coordinates.lat.toFixed(4)}, ${coordinates.lng.toFixed(4)}`,
                city: 'Unknown City',
                state: 'Unknown State',
                zipCode: '00000'
            }
        }
    }

    async geocodeAddress(address: string): Promise<{ coordinates: LocationCoordinates } & LocationDetails> {
        if (!this.apiKey) {
            throw new Error('Google Maps API key not configured')
        }

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.apiKey}`
            )

            if (!response.ok) {
                throw new Error('Geocoding API request failed')
            }

            const data = await response.json()

            if (data.status !== 'OK' || !data.results.length) {
                throw new Error('Address not found')
            }

            const result = data.results[0]
            const location = result.geometry.location
            const components = result.address_components

            return {
                coordinates: {
                    lat: location.lat,
                    lng: location.lng
                },
                formatted: result.formatted_address,
                city: this.extractComponent(components, 'locality') || 'Unknown City',
                state: this.extractComponent(components, 'administrative_area_level_1') || 'Unknown State',
                zipCode: this.extractComponent(components, 'postal_code') || '00000'
            }
        } catch (error) {
            console.error('Geocoding failed:', error)
            throw error
        }
    }

    calculateDistance(from: LocationCoordinates, to: LocationCoordinates): number {
        const R = 3959 // Earth's radius in miles
        const dLat = this.toRadians(to.lat - from.lat)
        const dLng = this.toRadians(to.lng - from.lng)

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(from.lat)) * Math.cos(this.toRadians(to.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    async getDrivingInfo(from: LocationCoordinates, to: LocationCoordinates): Promise<DrivingInfo> {
        if (!this.apiKey) {
            // Fallback calculation
            const distance = this.calculateDistance(from, to)
            return {
                duration: Math.round(distance * 2), // Rough estimate: 2 minutes per mile
                distance: Math.round(distance * 10) / 10
            }
        }

        try {
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${from.lat},${from.lng}&destinations=${to.lat},${to.lng}&units=imperial&key=${this.apiKey}`
            )

            if (!response.ok) {
                throw new Error('Distance Matrix API request failed')
            }

            const data = await response.json()

            if (data.status !== 'OK' || !data.rows.length || !data.rows[0].elements.length) {
                throw new Error('No route found')
            }

            const element = data.rows[0].elements[0]

            if (element.status !== 'OK') {
                throw new Error('Route calculation failed')
            }

            return {
                duration: Math.round(element.duration.value / 60), // Convert seconds to minutes
                distance: Math.round(element.distance.value * 0.000621371 * 10) / 10 // Convert meters to miles
            }
        } catch (error) {
            console.warn('Driving info calculation failed:', error)
            // Fallback to straight-line distance
            const distance = this.calculateDistance(from, to)
            return {
                duration: Math.round(distance * 2),
                distance: Math.round(distance * 10) / 10
            }
        }
    }

    private extractComponent(components: any[], type: string): string | null {
        const component = components.find(comp => comp.types.includes(type))
        return component ? component.long_name : null
    }

    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180)
    }
}

export default AdvancedLocationService
