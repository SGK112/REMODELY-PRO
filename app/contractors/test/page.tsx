import Link from 'next/link'

export default function TestContractors() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Simple Contractors Test Page
                </h1>

                {/* Simple Search Form */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-xl font-semibold mb-4">Search Test</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Search contractors..."
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <input
                            type="text"
                            placeholder="Location (City, State)"
                            className="md:w-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Search
                        </button>
                    </div>
                </div>

                {/* Test Results */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Test Results</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-lg">Test Contractor {i}</h3>
                                <p className="text-gray-600">Phoenix, AZ</p>
                                <p className="text-yellow-500">⭐ 4.{i} stars</p>
                                <div className="mt-4">
                                    <Link
                                        href={`/contractors/${i}`}
                                        className="text-blue-600 hover:text-blue-700"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8">
                    <Link
                        href="/contractors"
                        className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                        ← Back to Main Contractors Page
                    </Link>
                </div>
            </div>
        </div>
    )
}
