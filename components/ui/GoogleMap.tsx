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

    // Initialize Google Map
    useEffect(() => {
        const initMap = async () => {
            try {
                setIsLoading(true)
                setError(null)

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
                    mapTypeControl: true,
                    streetViewControl: true,
                    fullscreenControl: true,
                    zoomControl: true,
                })

                setMap(mapInstance)
                setIsLoading(false)

                // Add user location marker if requested
                if (showUserLocation) {
                    new google.maps.Marker({
                        position: center,
                        map: mapInstance,
                        title: 'Your Location',
                        icon: {
                            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="8" fill="#3b82f6" stroke="#ffffff" stroke-width="2"/>
                  <circle cx="12" cy="12" r="3" fill="#ffffff"/>
                </svg>
              `),
                            scaledSize: new google.maps.Size(24, 24),
                            anchor: new google.maps.Point(12, 12)
                        }
                    })
                }

            } catch (err) {
                console.error('Error initializing map:', err)
                setError('Failed to load map. Please check your Google Maps API key.')
                setIsLoading(false)
            }
        }

        initMap()
    }, [center, zoom, showUserLocation])

    // Add contractor markers
    useEffect(() => {
        if (!map || contractors.length === 0) return

        const google = window.google
        if (!google) return

        // Clear existing markers
        markers.forEach(marker => marker.setMap(null))

        const newMarkers = contractors.map((contractor, index) => {
            const marker = new google.maps.Marker({
                position: contractor.coordinates,
                map,
                title: contractor.name,
                icon: {
                    url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.163 0 0 7.163 0 16C0 24.837 16 40 16 40S32 24.837 32 16C32 7.163 24.837 0 16 0Z" fill="#6366f1"/>
              <circle cx="16" cy="16" r="8" fill="#ffffff"/>
              <text x="16" y="20" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#6366f1">${index + 1}</text>
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

                // Create info window
                const infoWindow = new google.maps.InfoWindow({
                    content: `
            <div class="p-3 max-w-xs">
              <h3 class="font-semibold text-gray-900 mb-1">${contractor.name}</h3>
              <p class="text-sm text-gray-600 mb-2">${contractor.address}</p>
              <div class="flex gap-2">
                <button 
                  onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(contractor.address)}', '_blank')"
                  class="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
                >
                  Directions
                </button>
                <button 
                  onclick="window.open('tel:${contractor.phone || ''}', '_self')"
                  class="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700"
                >
                  Call
                </button>
              </div>
            </div>
          `
                })

                infoWindow.open(map, marker)
            })

            return marker
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

    }, [map, contractors, onContractorClick])

    if (error) {
        return (
            <div className={`${className} bg-gray-100 flex items-center justify-center`} style={{ height }}>
                <div className="text-center p-4">
                    <div className="text-red-600 mb-2">⚠️</div>
                    <p className="text-sm text-gray-600">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`relative ${className}`} style={{ height }}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-10">
                    <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="text-sm text-gray-600">Loading map...</span>
                    </div>
                </div>
            )}
            <div ref={mapRef} className="w-full h-full rounded-lg" />
        </div>
    )
}

export default GoogleMap
