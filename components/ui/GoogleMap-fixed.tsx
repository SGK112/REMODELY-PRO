'use client'

import React, { useEffect, useRef, useState } from 'react'
import { googleMapsService, ContractorLocation } from '@/lib/maps'

interface GoogleMapProps {
    center: { lat: number; lng: number }
    zoom?: number
    height?: string
    contractors?: ContractorLocation[]
    onContractorClick?: (contractor: ContractorLocation) => void
    showUserLocation?: boolean
    className?: string
}

const GoogleMap: React.FC<GoogleMapProps> = ({
    center,
    zoom = 12,
    height = '400px',
    contractors = [],
    onContractorClick,
    showUserLocation = false,
    className = ''
}) => {
    const mapRef = useRef<HTMLDivElement>(null)
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [markers, setMarkers] = useState<google.maps.Marker[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // Check if Google Maps API key is available
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    const hasValidApiKey = apiKey && apiKey !== 'AIzaSyBQ8ZhvfZ8_development_key_here'

    // Initialize Google Map
    useEffect(() => {
        const initMap = async () => {
            try {
                setIsLoading(true)
                setError(null)

                if (!hasValidApiKey) {
                    setError('Google Maps API key not configured')
                    setIsLoading(false)
                    return
                }

                if (!mapRef.current) return

                const google = await googleMapsService.loadGoogleMaps()

                const mapInstance = new google.maps.Map(mapRef.current, {
                    center,
                    zoom,
                    styles: [
                        {
                            featureType: 'poi',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }]
                        },
                        {
                            featureType: 'transit',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }]
                        }
                    ],
                    disableDefaultUI: false,
                    zoomControl: true,
                    streetViewControl: false,
                    fullscreenControl: true
                })

                setMap(mapInstance)
                setIsLoading(false)
            } catch (error) {
                console.error('Error initializing map:', error)
                setError('Failed to load map')
                setIsLoading(false)
            }
        }

        initMap()
    }, [center, zoom, hasValidApiKey])

    // Add contractor markers
    useEffect(() => {
        if (!map || !hasValidApiKey) return

        // Clear existing markers
        markers.forEach(marker => marker.setMap(null))
        setMarkers([])

        const newMarkers: google.maps.Marker[] = []

        contractors.forEach(contractor => {
            const marker = new google.maps.Marker({
                position: contractor.coordinates,
                map,
                title: contractor.name,
                icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 16 40 16 40C16 40 32 24.8366 32 16C32 7.16344 24.8366 0 16 0Z" fill="#d97706"/>
                            <circle cx="16" cy="16" r="8" fill="white"/>
                            <path d="M16 10L18 14H22L19 17L20 21L16 19L12 21L13 17L10 14H14L16 10Z" fill="#d97706"/>
                        </svg>
                    `),
                    scaledSize: new google.maps.Size(32, 40),
                    anchor: new google.maps.Point(16, 40)
                }
            })

            // Add click listener
            marker.addListener('click', () => {
                if (onContractorClick) {
                    onContractorClick(contractor)
                }
            })

            // Add info window
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div class="p-2">
                        <h3 class="font-semibold text-gray-900">${contractor.name}</h3>
                        <p class="text-sm text-gray-600">${contractor.address}</p>
                        <p class="text-sm text-gray-600">${contractor.phone}</p>
                    </div>
                `
            })

            marker.addListener('click', () => {
                // Close other info windows
                newMarkers.forEach(m => {
                    const otherInfoWindow = (m as any).infoWindow
                    if (otherInfoWindow) otherInfoWindow.close()
                })

                infoWindow.open(map, marker)
            });

            (marker as any).infoWindow = infoWindow
            newMarkers.push(marker)
        })

        setMarkers(newMarkers)

        // Fit map to show all contractors
        if (contractors.length > 1) {
            const bounds = new google.maps.LatLngBounds()
            contractors.forEach(contractor => {
                bounds.extend(contractor.coordinates)
            })
            map.fitBounds(bounds)
        }

    }, [map, contractors, onContractorClick, hasValidApiKey])

    // Fallback static map display when Google Maps isn't available
    if (error || !hasValidApiKey) {
        return (
            <div className={`${className} bg-gradient-construction-subtle rounded-lg border border-stone-200 flex items-center justify-center`} style={{ height }}>
                <div className="text-center p-6">
                    <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-construction-heading mb-2">Location Information</h3>
                    <p className="text-stone-600 mb-4">
                        Serving {contractors.length > 0 ? contractors[0].address : 'the local area'}
                    </p>
                    <div className="space-y-2">
                        <button
                            onClick={() => {
                                const location = contractors.length > 0 ? contractors[0].address : 'Phoenix, AZ'
                                const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`
                                window.open(url, '_blank')
                            }}
                            className="btn-outline text-sm px-4 py-2"
                        >
                            View on Google Maps
                        </button>
                        <p className="text-xs text-stone-500">
                            Interactive map requires Google Maps API configuration
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative ${className} bg-gradient-construction-subtle rounded-lg overflow-hidden border border-stone-200`} style={{ height }}>
            {isLoading && (
                <div className="absolute inset-0 bg-gradient-construction-subtle flex items-center justify-center z-10">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-amber-600"></div>
                        </div>
                        <span className="text-sm text-stone-600">Loading interactive map...</span>
                    </div>
                </div>
            )}
            <div ref={mapRef} className="w-full h-full" />
        </div>
    )
}

export default GoogleMap
