'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

export default function ScrapingAdminPage() {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [results, setResults] = useState<any>(null)
    const [error, setError] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [location, setLocation] = useState('')

    const categories = [
        { value: 'all', label: 'All Sources', description: 'Scrape from all available sources' },
        { value: 'public', label: '🏛️ Public Data Sources', description: 'Government databases, BBB, Yellow Pages (recommended)' },
        { value: 'authenticated', label: '🔐 Authenticated Sources', description: 'Angi & HomeAdvisor using contractor accounts (most reliable)' },
        { value: 'manufacturers', label: 'Manufacturer Websites', description: 'Caesarstone, Cambria, Silestone, etc.' },
        { value: 'directories', label: 'Contractor Directories', description: 'Angi, HomeAdvisor, Houzz, Thumbtack, etc.' },
        { value: 'industry', label: 'Industry Associations', description: 'NKBA, Marble Institute, Natural Stone Institute' },
        { value: 'local', label: 'Local Directories', description: 'Yellow Pages, Yelp, Facebook Business' }
    ]

    const handleScrape = async () => {
        setIsLoading(true)
        setError('')
        setResults(null)

        try {
            const response = await fetch('/api/scrape', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    location: location.trim() || undefined,
                    category: selectedCategory
                })
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Scraping failed')
            }

            setResults(data)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
                    <p className="text-gray-600">Please sign in to access the scraping admin panel.</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Contractor Data Scraping</h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Category Selection */}
                            <div>
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                                    Scraper Category
                                </label>
                                <select
                                    id="category"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                >
                                    {categories.map((category) => (
                                        <option key={category.value} value={category.value}>
                                            {category.label}
                                        </option>
                                    ))}
                                </select>
                                <p className="mt-1 text-sm text-gray-500">
                                    {categories.find(c => c.value === selectedCategory)?.description}
                                </p>
                            </div>

                            {/* Location Filter */}
                            <div>
                                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                                    Location Filter (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="e.g., New York, NY or 10001"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                />
                                <p className="mt-1 text-sm text-gray-500">
                                    Leave empty to scrape all available locations
                                </p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-600 mb-4">
                                This tool scrapes contractor information from manufacturer websites to bootstrap the marketplace with real data.
                            </p>

                            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-yellow-800">
                                            Warning
                                        </h3>
                                        <div className="mt-2 text-sm text-yellow-700">
                                            <p>This operation can take several minutes and will scrape data from multiple manufacturer websites. Use responsibly.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleScrape}
                                disabled={isLoading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-md transition-colors"
                            >
                                {isLoading ? 'Scraping...' : 'Start Scraping'}
                            </button>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">Error</h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            <p>{error}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {results && (
                            <div className="bg-green-50 border border-green-200 rounded-md p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-green-800">Success!</h3>
                                        <div className="mt-2 text-sm text-green-700">
                                            <p>{results.message}</p>
                                            <div className="mt-2">
                                                <p><strong>Total Scraped:</strong> {results.details.totalScraped}</p>
                                                <p><strong>Stored in Database:</strong> {results.details.totalStored}</p>
                                                <p><strong>Skipped (duplicates):</strong> {results.details.skipped}</p>
                                            </div>

                                            {results.details.contractors.length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="font-medium text-green-800 mb-2">Sample Contractors:</h4>
                                                    <div className="space-y-2">
                                                        {results.details.contractors.map((contractor: any, index: number) => (
                                                            <div key={index} className="bg-white p-2 rounded border">
                                                                <p><strong>{contractor.name}</strong></p>
                                                                <p className="text-sm">{contractor.city}, {contractor.state}</p>
                                                                <p className="text-sm text-gray-600">
                                                                    {contractor.manufacturers.join(', ')} • {contractor.specialties.slice(0, 2).join(', ')}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
