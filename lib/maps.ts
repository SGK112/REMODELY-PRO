// Google Maps integration for REMODELY.AI
import { Loader } from '@googlemaps/js-api-loader'

// Google Maps API configuration
const GOOGLE_MAPS_CONFIG = {
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    version: 'weekly',
    libraries: ['places', 'geometry', 'drawing'] as any[],
}

// Initialize Google Maps loader
const loader = new Loader(GOOGLE_MAPS_CONFIG)

// Google Maps service class
export class GoogleMapsService {
    private static instance: GoogleMapsService
    private isLoaded = false
    private google: typeof google | null = null

    private constructor() { }

    static getInstance(): GoogleMapsService {
        if (!GoogleMapsService.instance) {
            GoogleMapsService.instance = new GoogleMapsService()
        }
        return GoogleMapsService.instance
    }

    // Load Google Maps API
    async loadGoogleMaps(): Promise<typeof google> {
        if (this.isLoaded && this.google) {
            return this.google
        }

        try {
            this.google = await loader.load()
            this.isLoaded = true
            return this.google
        } catch (error) {
            console.error('Error loading Google Maps:', error)
            throw error
        }
    }

    // Geocode address to coordinates
    async geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
        try {
            const google = await this.loadGoogleMaps()
            const geocoder = new google.maps.Geocoder()

            return new Promise((resolve) => {
                geocoder.geocode({ address }, (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        const location = results[0].geometry.location
                        resolve({
                            lat: location.lat(),
                            lng: location.lng()
                        })
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

    // Calculate distance between two points
    async calculateDistance(
        origin: { lat: number; lng: number },
        destination: { lat: number; lng: number }
    ): Promise<{ distance: string; duration: string } | null> {
        try {
            const google = await this.loadGoogleMaps()
            const service = new google.maps.DistanceMatrixService()

            return new Promise((resolve) => {
                service.getDistanceMatrix({
                    origins: [new google.maps.LatLng(origin.lat, origin.lng)],
                    destinations: [new google.maps.LatLng(destination.lat, destination.lng)],
                    travelMode: google.maps.TravelMode.DRIVING,
                    unitSystem: google.maps.UnitSystem.IMPERIAL,
                }, (response, status) => {
                    if (status === 'OK' && response && response.rows[0]?.elements[0]) {
                        const element = response.rows[0].elements[0]
                        if (element.status === 'OK') {
                            resolve({
                                distance: element.distance?.text || 'N/A',
                                duration: element.duration?.text || 'N/A'
                            })
                        } else {
                            resolve(null)
                        }
                    } else {
                        console.error('Distance calculation failed:', status)
                        resolve(null)
                    }
                })
            })
        } catch (error) {
            console.error('Distance calculation error:', error)
            return null
        }
    }

    // Get place details including business hours, reviews, etc.
    async getPlaceDetails(placeId: string): Promise<google.maps.places.PlaceResult | null> {
        try {
            const google = await this.loadGoogleMaps()
            const service = new google.maps.places.PlacesService(
                document.createElement('div')
            )

            return new Promise((resolve) => {
                service.getDetails({
                    placeId,
                    fields: [
                        'name',
                        'formatted_address',
                        'geometry',
                        'formatted_phone_number',
                        'website',
                        'rating',
                        'user_ratings_total',
                        'opening_hours',
                        'photos',
                        'reviews'
                    ]
                }, (place, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && place) {
                        resolve(place)
                    } else {
                        console.error('Place details failed:', status)
                        resolve(null)
                    }
                })
            })
        } catch (error) {
            console.error('Place details error:', error)
            return null
        }
    }

    // Search for places (contractors, businesses)
    async searchPlaces(
        query: string,
        location: { lat: number; lng: number },
        radius: number = 50000 // 50km default
    ): Promise<google.maps.places.PlaceResult[]> {
        try {
            const google = await this.loadGoogleMaps()
            const service = new google.maps.places.PlacesService(document.createElement('div'))

            return new Promise((resolve) => {
                service.textSearch({
                    query,
                    location: new google.maps.LatLng(location.lat, location.lng),
                    radius
                }, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                        resolve(Array.isArray(results) ? results : [])
                    } else {
                        console.error('Places search failed:', status)
                        resolve([])
                    }
                })
            })
        } catch (error) {
            console.error('Places search error:', error)
            return []
        }
    }

    // Generate Google Maps URL for directions
    generateDirectionsUrl(
        origin: string | { lat: number; lng: number },
        destination: string | { lat: number; lng: number }
    ): string {
        const baseUrl = 'https://www.google.com/maps/dir/'

        const formatLocation = (location: string | { lat: number; lng: number }) => {
            if (typeof location === 'string') {
                return encodeURIComponent(location)
            }
            return `${location.lat},${location.lng}`
        }

        return `${baseUrl}${formatLocation(origin)}/${formatLocation(destination)}`
    }
}

// Export singleton instance
export const googleMapsService = GoogleMapsService.getInstance()

// Utility functions
export const formatDistance = (meters: number): string => {
    if (meters < 1609) { // Less than 1 mile
        return `${Math.round(meters * 3.28084)} ft`
    } else {
        return `${(meters / 1609.34).toFixed(1)} mi`
    }
}

export const formatDuration = (seconds: number): string => {
    if (seconds < 3600) { // Less than 1 hour
        return `${Math.round(seconds / 60)} min`
    } else {
        const hours = Math.floor(seconds / 3600)
        const minutes = Math.round((seconds % 3600) / 60)
        return `${hours}h ${minutes}m`
    }
}

// Enhanced async loading with better error handling
export const loadGoogleMapsAsync = (): Promise<typeof google> => {
    return new Promise((resolve, reject) => {
        // Check if already loaded
        if (typeof google !== 'undefined' && google.maps) {
            resolve(google);
            return;
        }

        // Check if script already exists
        const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
        if (existingScript) {
            // Wait for existing script to load
            existingScript.addEventListener('load', () => {
                if (typeof google !== 'undefined' && google.maps) {
                    resolve(google);
                } else {
                    reject(new Error('Google Maps failed to initialize'));
                }
            });
            return;
        }

        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            if (typeof google !== 'undefined' && google.maps) {
                resolve(google);
            } else {
                reject(new Error('Google Maps failed to load'));
            }
        };

        script.onerror = () => reject(new Error('Failed to load Google Maps script'));
        document.head.appendChild(script);
    });
};

// Update places search to use legacy API with proper fallback
export const searchPlacesWithNewAPI = async (query: string, location?: { lat: number; lng: number }) => {
    try {
        const google = await loadGoogleMapsAsync();
        const service = new google.maps.places.PlacesService(document.createElement('div'));

        return new Promise<google.maps.places.PlaceResult[]>((resolve) => {
            service.textSearch({
                query,
                location: location ? new google.maps.LatLng(location.lat, location.lng) : undefined,
                radius: 50000
            }, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK && results) {
                    resolve(Array.isArray(results) ? results : []);
                } else {
                    resolve([]);
                }
            });
        });
    } catch (error) {
        console.error('Places search error:', error);
        return [];
    }
};

// TypeScript interfaces for better type safety
export interface ContractorLocation {
    id: string
    name: string
    address: string
    coordinates: { lat: number; lng: number }
    placeId?: string
    phone?: string
    website?: string
}

export interface MapBounds {
    north: number
    south: number
    east: number
    west: number
}
