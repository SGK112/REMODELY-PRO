'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { googleMapsService } from '@/lib/maps'

export interface LocationData {
    lat: number
    lng: number
    address?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
}

interface LocationContextType {
    currentLocation: LocationData | null
    isLocationLoading: boolean
    locationError: string | null
    hasLocationPermission: boolean
    requestLocation: () => Promise<void>
    searchLocation: (query: string) => Promise<LocationData | null>
    calculateDistance: (destination: { lat: number; lng: number }) => Promise<{ distance: string; duration: string } | null>
    reverseGeocode: (coordinates: { lat: number; lng: number }) => Promise<LocationData | null>
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

interface LocationProviderProps {
    children: ReactNode
}

export function LocationProvider({ children }: LocationProviderProps) {
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null)
    const [isLocationLoading, setIsLocationLoading] = useState(false)
    const [locationError, setLocationError] = useState<string | null>(null)
    const [hasLocationPermission, setHasLocationPermission] = useState(false)

    // Check if geolocation is supported
    const isGeolocationSupported = typeof navigator !== 'undefined' && 'geolocation' in navigator

    // Request user's current location
    const requestLocation = async (): Promise<void> => {
        if (!isGeolocationSupported) {
            setLocationError('Geolocation is not supported by this browser')
            return
        }

        setIsLocationLoading(true)
        setLocationError(null)

        try {
            const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    resolve,
                    reject,
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 300000 // 5 minutes
                    }
                )
            })

            const coordinates = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }

            // Reverse geocode to get address
            const locationData = await reverseGeocode(coordinates)

            if (locationData) {
                setCurrentLocation(locationData)
                setHasLocationPermission(true)
            } else {
                // Fallback if reverse geocoding fails
                setCurrentLocation(coordinates)
                setHasLocationPermission(true)
            }

        } catch (error: any) {
            console.error('Error getting location:', error)

            let errorMessage = 'Unable to get your location'

            if (error.code === 1) {
                errorMessage = 'Location access denied. Please enable location services.'
            } else if (error.code === 2) {
                errorMessage = 'Location unavailable. Please try again.'
            } else if (error.code === 3) {
                errorMessage = 'Location request timed out. Please try again.'
            }

            setLocationError(errorMessage)
            setHasLocationPermission(false)
        } finally {
            setIsLocationLoading(false)
        }
    }

    // Search for a location by address/query
    const searchLocation = async (query: string): Promise<LocationData | null> => {
        try {
            const result = await googleMapsService.geocodeAddress(query)

            if (result) {
                // Get detailed address information
                const detailedLocation = await reverseGeocode(result)
                return detailedLocation || result
            }

            return null
        } catch (error) {
            console.error('Location search error:', error)
            return null
        }
    }

    // Calculate distance from current location to destination
    const calculateDistance = async (
        destination: { lat: number; lng: number }
    ): Promise<{ distance: string; duration: string } | null> => {
        if (!currentLocation) {
            return null
        }

        try {
            return await googleMapsService.calculateDistance(currentLocation, destination)
        } catch (error) {
            console.error('Distance calculation error:', error)
            return null
        }
    }

    // Reverse geocode coordinates to get address details
    const reverseGeocode = async (coordinates: { lat: number; lng: number }): Promise<LocationData | null> => {
        try {
            const google = await googleMapsService.loadGoogleMaps()
            const geocoder = new google.maps.Geocoder()

            return new Promise((resolve) => {
                geocoder.geocode({ location: coordinates }, (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                        const result = results[0]
                        const components = result.address_components

                        let locationData: LocationData = {
                            ...coordinates,
                            address: result.formatted_address
                        }

                        // Extract address components
                        components?.forEach(component => {
                            const types = component.types

                            if (types.includes('locality')) {
                                locationData.city = component.long_name
                            } else if (types.includes('administrative_area_level_1')) {
                                locationData.state = component.short_name
                            } else if (types.includes('postal_code')) {
                                locationData.zipCode = component.long_name
                            } else if (types.includes('country')) {
                                locationData.country = component.long_name
                            }
                        })

                        resolve(locationData)
                    } else {
                        resolve(null)
                    }
                })
            })
        } catch (error) {
            console.error('Reverse geocoding error:', error)
            return null
        }
    }

    // Check for existing location permission on mount
    useEffect(() => {
        if (isGeolocationSupported && 'permissions' in navigator) {
            navigator.permissions.query({ name: 'geolocation' }).then((permission) => {
                if (permission.state === 'granted') {
                    setHasLocationPermission(true)
                    // Optionally auto-request location if permission is already granted
                    // requestLocation()
                }
            }).catch(() => {
                // Permissions API not supported, ignore
            })
        }
    }, [])

    const value: LocationContextType = {
        currentLocation,
        isLocationLoading,
        locationError,
        hasLocationPermission,
        requestLocation,
        searchLocation,
        calculateDistance,
        reverseGeocode
    }

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    )
}

export function useLocation() {
    const context = useContext(LocationContext)
    if (context === undefined) {
        throw new Error('useLocation must be used within a LocationProvider')
    }
    return context
}

// Location permission request component
export function LocationPermissionBanner() {
    const { hasLocationPermission, requestLocation, isLocationLoading, locationError } = useLocation()

    if (hasLocationPermission) {
        return null
    }

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                    <h4 className="text-sm font-medium text-blue-900">
                        Enable Location Services
                    </h4>
                    <p className="text-sm text-blue-700 mt-1">
                        Allow location access to find contractors near you and get accurate distances.
                    </p>
                    {locationError && (
                        <p className="text-sm text-red-600 mt-1">{locationError}</p>
                    )}
                    <button
                        onClick={requestLocation}
                        disabled={isLocationLoading}
                        className="mt-2 text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLocationLoading ? 'Getting Location...' : 'Enable Location'}
                    </button>
                </div>
            </div>
        </div>
    )
}

import { MapPin } from 'lucide-react'
