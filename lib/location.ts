// Location service utilities
export interface LocationData {
    lat: number
    lng: number
    city: string
    state: string
    country: string
    formattedAddress: string
    zipCode?: string
}

export interface LocationError {
    code: number
    message: string
}

export class LocationService {
    private static instance: LocationService
    private currentLocation: LocationData | null = null
    private locationCallbacks: ((location: LocationData | null) => void)[] = []

    private constructor() { }

    public static getInstance(): LocationService {
        if (!LocationService.instance) {
            LocationService.instance = new LocationService()
        }
        return LocationService.instance
    }

    // Get user's current location using browser geolocation
    public async getCurrentLocation(): Promise<LocationData> {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject({
                    code: 0,
                    message: 'Geolocation is not supported by this browser'
                } as LocationError)
                return
            }

            const options = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 5 * 60 * 1000 // 5 minutes
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const { latitude, longitude } = position.coords
                        const locationData = await this.reverseGeocode(latitude, longitude)
                        this.setCurrentLocation(locationData)
                        resolve(locationData)
                    } catch (error) {
                        reject({
                            code: 2,
                            message: 'Failed to get location details'
                        } as LocationError)
                    }
                },
                (error) => {
                    let message = 'Unknown error occurred'
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            message = 'Location access denied by user'
                            break
                        case error.POSITION_UNAVAILABLE:
                            message = 'Location information unavailable'
                            break
                        case error.TIMEOUT:
                            message = 'Location request timed out'
                            break
                    }
                    reject({
                        code: error.code,
                        message
                    } as LocationError)
                },
                options
            )
        })
    }

    // Reverse geocode coordinates to address
    private async reverseGeocode(lat: number, lng: number): Promise<LocationData> {
        try {
            // Using a free geocoding service (you can replace with Google Maps API if you have a key)
            const response = await fetch(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
            )

            if (!response.ok) {
                throw new Error('Geocoding failed')
            }

            const data = await response.json()

            return {
                lat,
                lng,
                city: data.city || data.locality || 'Unknown City',
                state: data.principalSubdivision || 'Unknown State',
                country: data.countryName || 'Unknown Country',
                formattedAddress: `${data.city || data.locality}, ${data.principalSubdivisionCode || data.principalSubdivision}`,
                zipCode: data.postcode
            }
        } catch (error) {
            // Fallback to basic location data if geocoding fails
            return {
                lat,
                lng,
                city: 'Unknown City',
                state: 'Unknown State',
                country: 'Unknown Country',
                formattedAddress: `${lat.toFixed(2)}, ${lng.toFixed(2)}`
            }
        }
    }

    // Geocode address to coordinates
    public async geocodeAddress(address: string): Promise<LocationData> {
        try {
            // Using Nominatim (OpenStreetMap) for free geocoding
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&addressdetails=1`
            )

            if (!response.ok) {
                throw new Error('Geocoding failed')
            }

            const data = await response.json()

            if (!data || data.length === 0) {
                throw new Error('Address not found')
            }

            const result = data[0]
            const address_parts = result.address || {}

            return {
                lat: parseFloat(result.lat),
                lng: parseFloat(result.lon),
                city: address_parts.city || address_parts.town || address_parts.village || 'Unknown City',
                state: address_parts.state || 'Unknown State',
                country: address_parts.country || 'Unknown Country',
                formattedAddress: result.display_name.split(',').slice(0, 2).join(', '),
                zipCode: address_parts.postcode
            }
        } catch (error) {
            throw new Error(`Failed to geocode address: ${address}`)
        }
    }

    // Calculate distance between two points in miles
    public calculateDistance(
        lat1: number, lng1: number,
        lat2: number, lng2: number
    ): number {
        const R = 3959 // Earth's radius in miles
        const dLat = this.toRadians(lat2 - lat1)
        const dLng = this.toRadians(lng2 - lng1)

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2)

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180)
    }

    // Get/Set current location
    public getCurrentLocationData(): LocationData | null {
        return this.currentLocation
    }

    public setCurrentLocation(location: LocationData | null): void {
        this.currentLocation = location
        this.notifyLocationChange(location)

        // Store in localStorage for persistence
        if (location) {
            localStorage.setItem('userLocation', JSON.stringify(location))
        } else {
            localStorage.removeItem('userLocation')
        }
    }

    // Load location from localStorage
    public loadStoredLocation(): LocationData | null {
        try {
            const stored = localStorage.getItem('userLocation')
            if (stored) {
                const location = JSON.parse(stored) as LocationData
                this.currentLocation = location
                return location
            }
        } catch (error) {
            console.error('Failed to load stored location:', error)
        }
        return null
    }

    // Subscribe to location changes
    public onLocationChange(callback: (location: LocationData | null) => void): () => void {
        this.locationCallbacks.push(callback)

        // Return unsubscribe function
        return () => {
            const index = this.locationCallbacks.indexOf(callback)
            if (index > -1) {
                this.locationCallbacks.splice(index, 1)
            }
        }
    }

    private notifyLocationChange(location: LocationData | null): void {
        this.locationCallbacks.forEach(callback => callback(location))
    }

    // Get popular locations based on current location
    public getPopularLocations(currentLocation?: LocationData): string[] {
        const allLocations = [
            'Phoenix, AZ', 'Scottsdale, AZ', 'Tempe, AZ', 'Mesa, AZ',
            'Phoenix, AZ', 'Scottsdale, AZ', 'Denver, CO', 'Colorado Springs, CO',
            'Atlanta, GA', 'Miami, FL', 'Orlando, FL', 'Tampa, FL',
            'Las Vegas, NV', 'Reno, NV', 'Los Angeles, CA', 'San Diego, CA',
            'Chicago, IL', 'Nashville, TN', 'Charlotte, NC', 'Raleigh, NC',
            'Seattle, WA', 'Portland, OR', 'Salt Lake City, UT', 'Boise, ID'
        ]

        if (!currentLocation) {
            return allLocations
        }

        // If we have user's location, prioritize nearby cities
        // This is a simplified version - in production you'd want more sophisticated location matching
        const userState = currentLocation.state
        const stateLocations = allLocations.filter(location =>
            location.includes(userState.split(' ').pop() || '')
        )

        // Return state locations first, then others
        return [...stateLocations, ...allLocations.filter(loc => !stateLocations.includes(loc))]
    }
}
