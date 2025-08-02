'use client'

import React, { useState } from 'react'
import { useLocation, useLocationPermission } from '@/components/providers/LocationProvider'
import { MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface LocationRequestProps {
    onLocationReceived?: (location: any) => void
    onDismiss?: () => void
    className?: string
}

export default function LocationRequest({
    onLocationReceived,
    onDismiss,
    className = ''
}: LocationRequestProps) {
    const { currentLocation, isLoading, error, requestLocation } = useLocation()
    const permissionStatus = useLocationPermission()
    const [isDismissed, setIsDismissed] = useState(false)

    // Don't show if already have location or user dismissed
    if (currentLocation || isDismissed) {
        return null
    }

    const handleRequestLocation = async () => {
        try {
            await requestLocation()
            if (onLocationReceived && currentLocation) {
                onLocationReceived(currentLocation)
            }
        } catch (err) {
            console.error('Failed to get location:', err)
        }
    }

    const handleDismiss = () => {
        setIsDismissed(true)
        if (onDismiss) {
            onDismiss()
        }
    }

    const getPermissionMessage = () => {
        switch (permissionStatus) {
            case 'denied':
                return {
                    title: 'Location Access Denied',
                    message: 'To show nearby contractors, please enable location access in your browser settings.',
                    buttonText: 'Browser Settings',
                    buttonAction: () => {
                        alert('Please go to your browser settings and allow location access for this site.')
                    }
                }
            case 'unsupported':
                return {
                    title: 'Location Not Supported',
                    message: 'Your browser doesn\'t support location services. You can still search by city or zip code.',
                    buttonText: null,
                    buttonAction: null
                }
            default:
                return {
                    title: 'Find Contractors Near You',
                    message: 'Allow location access to see contractors in your area and get accurate distance estimates.',
                    buttonText: 'Share Location',
                    buttonAction: handleRequestLocation
                }
        }
    }

    const { title, message, buttonText, buttonAction } = getPermissionMessage()

    return (
        <div className={`bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-lg p-4 shadow-sm ${className}`}>
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                        <MapPinIcon className="h-6 w-6 text-blue-600 mt-0.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900">
                            {title}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            {message}
                        </p>
                        {error && (
                            <p className="mt-1 text-sm text-red-600">
                                {error.message}
                            </p>
                        )}
                        {buttonText && buttonAction && (
                            <div className="mt-3">
                                <button
                                    onClick={buttonAction}
                                    disabled={isLoading}
                                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Getting Location...
                                        </>
                                    ) : (
                                        buttonText
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div className="flex-shrink-0">
                    <button
                        onClick={handleDismiss}
                        className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                    >
                        <span className="sr-only">Dismiss</span>
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}

// Compact version for smaller spaces
export function LocationRequestCompact({
    onLocationReceived,
    className = ''
}: Omit<LocationRequestProps, 'onDismiss'>) {
    const { currentLocation, isLoading, requestLocation } = useLocation()
    const permissionStatus = useLocationPermission()

    if (currentLocation || permissionStatus === 'denied' || permissionStatus === 'unsupported') {
        return null
    }

    const handleRequestLocation = async () => {
        try {
            await requestLocation()
            if (onLocationReceived && currentLocation) {
                onLocationReceived(currentLocation)
            }
        } catch (err) {
            console.error('Failed to get location:', err)
        }
    }

    return (
        <button
            onClick={handleRequestLocation}
            disabled={isLoading}
            className={`inline-flex items-center space-x-2 px-3 py-2 border border-blue-300 rounded-md text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            <MapPinIcon className="h-4 w-4" />
            <span>
                {isLoading ? 'Getting Location...' : 'Use My Location'}
            </span>
        </button>
    )
}
