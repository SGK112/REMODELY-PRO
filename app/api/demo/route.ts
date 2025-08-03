import { NextRequest, NextResponse } from 'next/server'

// Demo data that showcases platform capabilities
const demoContractors = [
    {
        id: 'demo-1',
        name: 'Arizona Stone Works',
        rating: 4.9,
        reviewCount: 127,
        specialties: ['Countertops', 'Backsplash', 'Flooring'],
        location: 'Phoenix, AZ',
        responseTime: '< 1 hour',
        startingPrice: '$45/sq ft',
        verified: true,
        insurance: true,
        license: 'ROC 283947'
    },
    {
        id: 'demo-2',
        name: 'Desert Granite & Marble',
        rating: 4.8,
        reviewCount: 203,
        specialties: ['Countertops', 'Fireplace', 'Bathroom'],
        location: 'Scottsdale, AZ',
        responseTime: '< 2 hours',
        startingPrice: '$52/sq ft',
        verified: true,
        insurance: true,
        license: 'ROC 291856'
    },
    {
        id: 'demo-3',
        name: 'Premier Surface Solutions',
        rating: 4.9,
        reviewCount: 89,
        specialties: ['Countertops', 'Backsplash'],
        location: 'Tempe, AZ',
        responseTime: '< 30 min',
        startingPrice: '$48/sq ft',
        verified: true,
        insurance: true,
        license: 'ROC 275839'
    }
]

const demoQuotes = [
    {
        contractorId: 'demo-1',
        price: '$2,250',
        timeline: '5-7 days',
        includes: ['Material & Installation', 'Edge Polishing', '1 Year Warranty'],
        notes: 'Premium quartz with undermount sink cutout included'
    },
    {
        contractorId: 'demo-2',
        price: '$2,600',
        timeline: '3-5 days',
        includes: ['Material & Installation', 'Edge Polishing', '2 Year Warranty', 'Free Consultation'],
        notes: 'Expedited timeline available. Premium grade quartz.'
    },
    {
        contractorId: 'demo-3',
        price: '$2,400',
        timeline: '7-10 days',
        includes: ['Material & Installation', 'Edge Polishing', '1 Year Warranty', 'Backsplash Design'],
        notes: 'Comprehensive service including design consultation'
    }
]

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { action, projectData } = body

        // Simulate processing delay to show real-time matching
        await new Promise(resolve => setTimeout(resolve, 1500))

        switch (action) {
            case 'find-contractors':
                return NextResponse.json({
                    success: true,
                    contractors: demoContractors,
                    totalFound: demoContractors.length,
                    message: `Found ${demoContractors.length} verified contractors in your area`
                })

            case 'get-quotes':
                return NextResponse.json({
                    success: true,
                    quotes: demoQuotes.map((quote, index) => ({
                        ...quote,
                        contractor: demoContractors[index]
                    })),
                    averagePrice: '$2,417',
                    averageTimeline: '5-7 days'
                })

            case 'verify-contractor':
                const contractorId = projectData?.contractorId
                const contractor = demoContractors.find(c => c.id === contractorId)

                return NextResponse.json({
                    success: true,
                    verification: {
                        license: 'Valid - Expires 12/2024',
                        insurance: 'Active - General Liability & Workers Comp',
                        bbb_rating: 'A+',
                        background_check: 'Passed',
                        recent_reviews: [
                            { rating: 5, text: 'Excellent work on our kitchen countertops', date: '2024-01-15' },
                            { rating: 5, text: 'Professional and on time', date: '2024-01-10' },
                            { rating: 4, text: 'Great quality, minor delay in scheduling', date: '2024-01-05' }
                        ]
                    },
                    contractor
                })

            default:
                return NextResponse.json({
                    success: false,
                    error: 'Invalid action'
                }, { status: 400 })
        }
    } catch (error) {
        console.error('Demo API error:', error)
        return NextResponse.json({
            success: false,
            error: 'Internal server error'
        }, { status: 500 })
    }
}

export async function GET() {
    return NextResponse.json({
        success: true,
        demoFeatures: [
            'Live contractor discovery from 27+ sources',
            'Instant quote matching with AI',
            'Automated verification system',
            'Real-time project tracking',
            'Secure payment processing'
        ],
        stats: {
            contractorsVerified: '10,000+',
            projectsCompleted: '50,000+',
            averageResponseTime: '< 2 hours',
            satisfactionRate: '98%'
        }
    })
}
