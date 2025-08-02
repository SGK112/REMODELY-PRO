'use client'

import React, { useState } from 'react'
import { MapPin, Navigation, Phone, ExternalLink } from 'lucide-react'
import { universalMapsService, getPreferredMapsService } from '@/lib/apple-maps'

interface MapsActionProps {
    contractor: {
        id: string
        name: string
        businessName: string
        address: string
        coordinates: { lat: number; lng: number }
        phone?: string
        website?: string
    }
    userLocation?: { lat: number; lng: number }
    className?: string
    showAllActions?: boolean
}

const MapsAction: React.FC<MapsActionProps> = ({
    contractor,
    userLocation,
    className = '',
    showAllActions = true
}) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const preferredService = getPreferredMapsService()

    const handleGetDirections = (service?: 'apple' | 'google') => {
        if (userLocation) {
            universalMapsService.openDirections(
                userLocation,
                contractor.coordinates,
                service
            )
        } else {
            universalMapsService.openDirections(
                'Current Location',
                contractor.coordinates,
                service
            )
        }
        setShowDropdown(false)
    }

    const handleViewLocation = (service?: 'apple' | 'google') => {
        universalMapsService.openLocation(
            contractor.coordinates,
            contractor.businessName,
            service
        )
        setShowDropdown(false)
    }

    const handleCall = () => {
        if (contractor.phone) {
            window.open(`tel:${contractor.phone}`, '_self')
        }
    }

    const handleWebsite = () => {
        if (contractor.website) {
            const url = contractor.website.startsWith('http')
                ? contractor.website
                : `https://${contractor.website}`
            window.open(url, '_blank')
        }
    }

    return (
        <div className={`relative ${className}`}>
            {showAllActions ? (
                // Full action panel
                <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-900">{contractor.businessName}</h4>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {preferredService === 'apple' ? '🍎 Apple Maps' : '🗺️ Google Maps'}
                        </span>
                    </div>

                    <p className="text-sm text-gray-600">{contractor.address}</p>

                    <div className="grid grid-cols-2 gap-2">
                        {/* Get Directions */}
                        <div className="relative">
                            <button
                                onClick={() => handleGetDirections()}
                                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                            >
                                <Navigation size={16} />
                                <span>Directions</span>
                            </button>

                            {/* Dropdown for choosing maps service */}
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="absolute right-0 top-0 h-full px-1 bg-blue-700 text-white rounded-r-lg hover:bg-blue-800 border-l border-blue-500"
                            >
                                <span className="text-xs">▼</span>
                            </button>

                            {showDropdown && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    <button
                                        onClick={() => handleGetDirections('google')}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2"
                                    >
                                        <span>🗺️</span>
                                        <span>Google Maps</span>
                                    </button>
                                    <button
                                        onClick={() => handleGetDirections('apple')}
                                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center space-x-2 border-t border-gray-100"
                                    >
                                        <span>🍎</span>
                                        <span>Apple Maps</span>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* View Location */}
                        <button
                            onClick={() => handleViewLocation()}
                            className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm"
                        >
                            <MapPin size={16} />
                            <span>View</span>
                        </button>

                        {/* Call */}
                        {contractor.phone && (
                            <button
                                onClick={handleCall}
                                className="flex items-center justify-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                            >
                                <Phone size={16} />
                                <span>Call</span>
                            </button>
                        )}

                        {/* Website */}
                        {contractor.website && (
                            <button
                                onClick={handleWebsite}
                                className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                            >
                                <ExternalLink size={16} />
                                <span>Website</span>
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                // Compact button
                <button
                    onClick={() => handleGetDirections()}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                    <Navigation size={16} />
                    <span>Get Directions</span>
                </button>
            )}
        </div>
    )
}

export default MapsAction
