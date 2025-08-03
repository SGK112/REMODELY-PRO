/**
 * Advanced Location Service for Remodely AI
 * Provides precise geolocation, distance calculation, and location intelligence
 */

export interface LocationCoordinates {
    lat: number
    lng: number
    accuracy?: number
    altitude?: number
    heading?: number
    speed?: number
}

export interface LocationData {
    coordinates: LocationCoordinates
    address: string
    city: string
    state: string
    zipCode: string
    country: string
    formatted: string
    placeId?: string
    types?: string[]
}

export interface ContractorLocation extends LocationData {
    serviceRadius: number
    primaryServiceArea: string
    secondaryServiceAreas: string[]
    travelTime?: number
    distanceFromUser?: number
}

class AdvancedLocationService {
    private static instance: AdvancedLocationService
    private geocoder?: google.maps.Geocoder
    private placesService?: google.maps.places.PlacesService
    private directionsService?: google.maps.DirectionsService
    private userLocation?: LocationCoordinates

    private constructor() {
        this.initializeGoogleMaps()
    }

    static getInstance(): AdvancedLocationService {
        if (!AdvancedLocationService.instance) {
            AdvancedLocationService.instance = new AdvancedLocationService()
        }
        return AdvancedLocationService.instance
    }

    private async initializeGoogleMaps(): Promise<void> {
        if (typeof window === 'undefined') return

        try {
            // Ensure Google Maps is loaded
            if (!window.google?.maps) {
                await this.loadGoogleMapsScript()
            }

            this.geocoder = new google.maps.Geocoder()
            this.directionsService = new google.maps.DirectionsService()

            // Initialize places service with a dummy div
            const div = document.createElement('div')
            const map = new google.maps.Map(div)
            this.placesService = new google.maps.places.PlacesService(map)
        } catch (error) {
            console.error('Failed to initialize Google Maps:', error)
        }
    }

    private loadGoogleMapsScript(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (window.google?.maps) {
                resolve()
                return
            }

            const script = document.createElement('script')
            script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places,geometry`
            script.async = true
            script.defer = true

            script.onload = () => resolve()
            script.onerror = () => reject(new Error('Failed to load Google Maps script'))

            document.head.appendChild(script)
        })
    }

    /**
     * Get user's current location with high accuracy
     */
    async getCurrentLocation(highAccuracy = true): Promise<LocationCoordinates> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported'))
                return
            }

            const options: PositionOptions = {
                enableHighAccuracy: highAccuracy,
                timeout: 10000,
                maximumAge: 300000 // 5 minutes
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords: LocationCoordinates = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        altitude: position.coords.altitude || undefined,
                        heading: position.coords.heading || undefined,
                        speed: position.coords.speed || undefined
                    }
                    this.userLocation = coords
                    resolve(coords)
                },
                (error) => {
                    reject(new Error(`Geolocation error: ${error.message}`))
                },
                options
            )
        })
    }

    /**
     * Geocode an address to coordinates
     */
    async geocodeAddress(address: string): Promise<LocationData> {
        if (!this.geocoder) {
            throw new Error('Geocoder not initialized')
        }

        return new Promise((resolve, reject) => {
            this.geocoder!.geocode({ address }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                    const result = results[0]
                    const location = result.geometry.location

                    const locationData: LocationData = {
                        coordinates: {
                            lat: location.lat(),
                            lng: location.lng()
                        },
                        address: this.extractAddressComponent(result, 'street_number') + ' ' +
                            this.extractAddressComponent(result, 'route'),
                        city: this.extractAddressComponent(result, 'locality'),
                        state: this.extractAddressComponent(result, 'administrative_area_level_1'),
                        zipCode: this.extractAddressComponent(result, 'postal_code'),
                        country: this.extractAddressComponent(result, 'country'),
                        formatted: result.formatted_address,
                        placeId: result.place_id,
                        types: result.types
                    }

                    resolve(locationData)
                } else {
                    reject(new Error(`Geocoding failed: ${status}`))
                }
            })
        })
    }

    /**
     * Reverse geocode coordinates to address
     */
    async reverseGeocode(coordinates: LocationCoordinates): Promise<LocationData> {
        if (!this.geocoder) {
            throw new Error('Geocoder not initialized')
        }

        return new Promise((resolve, reject) => {
            const latLng = new google.maps.LatLng(coordinates.lat, coordinates.lng)

            this.geocoder!.geocode({ location: latLng }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
                    const result = results[0]

                    const locationData: LocationData = {
                        coordinates,
                        address: this.extractAddressComponent(result, 'street_number') + ' ' +
                            this.extractAddressComponent(result, 'route'),
                        city: this.extractAddressComponent(result, 'locality'),
                        state: this.extractAddressComponent(result, 'administrative_area_level_1'),
                        zipCode: this.extractAddressComponent(result, 'postal_code'),
                        country: this.extractAddressComponent(result, 'country'),
                        formatted: result.formatted_address,
                        placeId: result.place_id,
                        types: result.types
                    }

                    resolve(locationData)
                } else {
                    reject(new Error(`Reverse geocoding failed: ${status}`))
                }
            })
        })
    }

    /**
     * Calculate precise distance between two points
     */
    calculateDistance(
        point1: LocationCoordinates,
        point2: LocationCoordinates,
        unit: 'miles' | 'km' = 'miles'
    ): number {
        if (!window.google?.maps?.geometry) {
            // Fallback to Haversine formula
            return this.haversineDistance(point1, point2, unit)
        }

        const from = new google.maps.LatLng(point1.lat, point1.lng)
        const to = new google.maps.LatLng(point2.lat, point2.lng)

        const distance = google.maps.geometry.spherical.computeDistanceBetween(from, to)

        // Convert from meters
        return unit === 'miles' ? distance * 0.000621371 : distance / 1000
    }

    /**
     * Get driving time and distance between two points
     */
    async getDrivingInfo(
        origin: LocationCoordinates,
        destination: LocationCoordinates
    ): Promise<{
        distance: number
        duration: number
        distanceText: string
        durationText: string
        route?: google.maps.DirectionsRoute
    }> {
        if (!this.directionsService) {
            throw new Error('Directions service not initialized')
        }

        return new Promise((resolve, reject) => {
            const request: google.maps.DirectionsRequest = {
                origin: new google.maps.LatLng(origin.lat, origin.lng),
                destination: new google.maps.LatLng(destination.lat, destination.lng),
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: false,
                avoidTolls: false
            }

            this.directionsService!.route(request, (result, status) => {
                if (status === google.maps.DirectionsStatus.OK && result) {
                    const route = result.routes[0]
                    const leg = route.legs[0]

                    resolve({
                        distance: leg.distance?.value ? leg.distance.value * 0.000621371 : 0, // Convert to miles
                        duration: leg.duration?.value || 0, // In seconds
                        distanceText: leg.distance?.text || '',
                        durationText: leg.duration?.text || '',
                        route
                    })
                } else {
                    reject(new Error(`Directions request failed: ${status}`))
                }
            })
        })
    }

    /**
     * Find contractors within radius
     */
    async findContractorsInRadius(
        center: LocationCoordinates,
        radiusMiles: number,
        contractors: any[]
    ): Promise<any[]> {
        const contractorsWithDistance = await Promise.all(
            contractors.map(async (contractor) => {
                if (!contractor.latitude || !contractor.longitude) {
                    return { ...contractor, distance: null, drivingTime: null }
                }

                const contractorLocation: LocationCoordinates = {
                    lat: contractor.latitude,
                    lng: contractor.longitude
                }

                const distance = this.calculateDistance(center, contractorLocation)

                if (distance <= radiusMiles) {
                    try {
                        const drivingInfo = await this.getDrivingInfo(center, contractorLocation)
                        return {
                            ...contractor,
                            distance: parseFloat(distance.toFixed(1)),
                            drivingTime: Math.round(drivingInfo.duration / 60), // Convert to minutes
                            distanceText: `${distance.toFixed(1)} miles`,
                            drivingTimeText: drivingInfo.durationText
                        }
                    } catch (error) {
                        return {
                            ...contractor,
                            distance: parseFloat(distance.toFixed(1)),
                            drivingTime: null,
                            distanceText: `${distance.toFixed(1)} miles`
                        }
                    }
                }

                return null
            })
        )

        return contractorsWithDistance
            .filter(contractor => contractor !== null)
            .sort((a, b) => (a.distance || 0) - (b.distance || 0))
    }

    /**
     * Get location suggestions/autocomplete
     */
    async getLocationSuggestions(query: string): Promise<google.maps.places.AutocompletePrediction[]> {
        if (!this.placesService || !window.google?.maps?.places) {
            return []
        }

        return new Promise((resolve) => {
            const service = new google.maps.places.AutocompleteService()

            service.getPlacePredictions({
                input: query,
                types: ['(cities)'],
                componentRestrictions: { country: 'us' }
            }, (predictions, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && predictions) {
                    resolve(predictions)
                } else {
                    resolve([])
                }
            })
        })
    }

    /**
     * Check if contractor serves specific location
     */
    contractorServesLocation(
        contractorLocation: LocationCoordinates,
        serviceRadius: number,
        customerLocation: LocationCoordinates
    ): boolean {
        const distance = this.calculateDistance(contractorLocation, customerLocation)
        return distance <= serviceRadius
    }

    // Private helper methods
    private extractAddressComponent(
        result: google.maps.GeocoderResult,
        type: string
    ): string {
        const component = result.address_components.find(comp =>
            comp.types.includes(type)
        )
        return component?.long_name || ''
    }

    private haversineDistance(
        point1: LocationCoordinates,
        point2: LocationCoordinates,
        unit: 'miles' | 'km' = 'miles'
    ): number {
        const R = unit === 'miles' ? 3959 : 6371 // Earth's radius
        const dLat = this.toRadians(point2.lat - point1.lat)
        const dLng = this.toRadians(point2.lng - point1.lng)

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(point1.lat)) * Math.cos(this.toRadians(point2.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180)
    }
}

export default AdvancedLocationService
