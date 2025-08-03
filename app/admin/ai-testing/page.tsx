'use client'

import { useState } from 'react'

export default function AITestingPage() {
    const [testResults, setTestResults] = useState<string[]>([])

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">AI Testing Dashboard</h1>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Voice Agent Testing</h2>
                <p className="text-gray-600">AI testing interface coming soon...</p>

                <div className="mt-4">
                    <ul className="space-y-2">
                        {testResults.map((result, index) => (
                            <li key={index} className="bg-gray-100 p-2 rounded">
                                {result}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}