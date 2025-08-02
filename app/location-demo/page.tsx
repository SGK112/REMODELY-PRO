'use client'

import { useLocation } from '@/components/providers/LocationProvider'
import LocationRequest from '@/components/ui/LocationRequest'

export default function LocationDemo() {
    const {
        currentLocation,
        isLoading,
        error,
        requestLocation,
        searchLocation,
        calculateDistance,
        getPopularLocations
    } = useLocation()

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">
                        Location Service Demo
                    </h1>

                    {/* Current Location Status */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Current Location</h2>
                        {currentLocation ? (
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <h3 className="font-medium text-green-900">Location Found:</h3>
                                <p className="text-green-700">📍 {currentLocation.formattedAddress}</p>
                                <p className="text-sm text-green-600">
                                    City: {currentLocation.city}, {currentLocation.state}
                                </p>
                                <p className="text-sm text-green-600">
                                    Coordinates: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
                                </p>
                                {currentLocation.zipCode && (
                                    <p className="text-sm text-green-600">
                                        Zip Code: {currentLocation.zipCode}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                                <p className="text-yellow-700">No location set</p>
                            </div>
                        )}

                        {error && (
                            <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4">
                                <h3 className="font-medium text-red-900">Error:</h3>
                                <p className="text-red-700">{error.message}</p>
                            </div>
                        )}
                    </div>

                    {/* Location Request Component */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Location Request</h2>
                        <LocationRequest
                            onLocationReceived={(location) => {
                                console.log('Location received:', location)
                            }}
                            onDismiss={() => {
                                console.log('Location request dismissed')
                            }}
                        />
                    </div>

                    {/* Manual Actions */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Manual Actions</h2>
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={requestLocation}
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                            >
                                {isLoading ? 'Getting Location...' : 'Request Location'}
                            </button>

                            <button
                                onClick={() => searchLocation('San Francisco, CA')}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                            >
                                Search San Francisco
                            </button>

                            <button
                                onClick={() => searchLocation('New York, NY')}
                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                            >
                                Search New York
                            </button>
                        </div>
                    </div>

                    {/* Popular Locations */}
                    <div className="mb-8">
                        <h2 className="text-xl font-semibold mb-4">Popular Locations</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                            {getPopularLocations().slice(0, 12).map((location) => (
                                <button
                                    key={location}
                                    onClick={() => searchLocation(location)}
                                    className="text-left p-2 text-blue-600 hover:bg-blue-50 rounded"
                                >
                                    {location}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Distance Calculator */}
                    {currentLocation && (
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">Distance Calculator</h2>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>To Phoenix, AZ:</span>
                                    <span className="font-mono">
                                        {calculateDistance(30.2672, -97.7431).toFixed(1)} miles
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>To Dallas, TX:</span>
                                    <span className="font-mono">
                                        {calculateDistance(32.7767, -96.7970).toFixed(1)} miles
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span>To Houston, TX:</span>
                                    <span className="font-mono">
                                        {calculateDistance(29.7604, -95.3698).toFixed(1)} miles
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Usage Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4 text-blue-900">How to Use</h2>
                        <ul className="space-y-2 text-blue-800">
                            <li>• Click "Request Location" to get your current GPS location</li>
                            <li>• Use the search buttons to test geocoding of specific cities</li>
                            <li>• Popular locations are sorted based on your current location</li>
                            <li>• The location is automatically saved in localStorage</li>
                            <li>• Distance calculations work once you have a location set</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
