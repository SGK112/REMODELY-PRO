'use client'

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { LocationService, LocationData, LocationError } from '@/lib/location'

interface LocationContextType {
    currentLocation: LocationData | null
    isLoading: boolean
    error: LocationError | null
    requestLocation: () => Promise<void>
    setLocation: (location: LocationData | null) => void
    searchLocation: (address: string) => Promise<LocationData>
    calculateDistance: (lat: number, lng: number) => number
    getPopularLocations: () => string[]
}

const LocationContext = createContext<LocationContextType | undefined>(undefined)

interface LocationProviderProps {
    children: ReactNode
}

export function LocationProvider({ children }: LocationProviderProps) {
    const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<LocationError | null>(null)

    const locationService = LocationService.getInstance()

    useEffect(() => {
        // Load stored location on mount
        const storedLocation = locationService.loadStoredLocation()
        if (storedLocation) {
            setCurrentLocation(storedLocation)
        }

        // Subscribe to location changes
        const unsubscribe = locationService.onLocationChange((location) => {
            setCurrentLocation(location)
        })

        return unsubscribe
    }, [locationService])

    const requestLocation = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const location = await locationService.getCurrentLocation()
            setCurrentLocation(location)
        } catch (err) {
            setError(err as LocationError)
        } finally {
            setIsLoading(false)
        }
    }

    const setLocation = (location: LocationData | null) => {
        locationService.setCurrentLocation(location)
    }

    const searchLocation = async (address: string): Promise<LocationData> => {
        try {
            setError(null)
            const location = await locationService.geocodeAddress(address)
            return location
        } catch (err) {
            const error = {
                code: 3,
                message: err instanceof Error ? err.message : 'Failed to search location'
            } as LocationError
            setError(error)
            throw error
        }
    }

    const calculateDistance = (lat: number, lng: number): number => {
        if (!currentLocation) return 0
        return locationService.calculateDistance(
            currentLocation.lat,
            currentLocation.lng,
            lat,
            lng
        )
    }

    const getPopularLocations = (): string[] => {
        return locationService.getPopularLocations(currentLocation || undefined)
    }

    const value: LocationContextType = {
        currentLocation,
        isLoading,
        error,
        requestLocation,
        setLocation,
        searchLocation,
        calculateDistance,
        getPopularLocations
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

// Custom hook for location permission status
export function useLocationPermission() {
    const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'unsupported'>('prompt')

    useEffect(() => {
        if (!navigator.geolocation) {
            setPermissionStatus('unsupported')
            return
        }

        // Check current permission status if available
        if ('permissions' in navigator) {
            navigator.permissions.query({ name: 'geolocation' }).then((result) => {
                setPermissionStatus(result.state as 'prompt' | 'granted' | 'denied')

                result.onchange = () => {
                    setPermissionStatus(result.state as 'prompt' | 'granted' | 'denied')
                }
            }).catch(() => {
                // Fallback if permissions API not available
                setPermissionStatus('prompt')
            })
        }
    }, [])

    return permissionStatus
}
