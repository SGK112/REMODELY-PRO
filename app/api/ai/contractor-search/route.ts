import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { query, location, projectType, context } = body

        // Mock AI response for contractor search
        const aiResponse = {
            message: generateAiInsights(query, location, projectType, context),
            suggestions: generateSearchSuggestions(query, projectType),
            matchingCriteria: extractMatchingCriteria(query)
        }

        return NextResponse.json(aiResponse)
    } catch (error) {
        console.error('AI contractor search error:', error)
        return NextResponse.json(
            { error: 'Failed to process AI search request' },
            { status: 500 }
        )
    }
}

function generateAiInsights(query: string, location?: string, projectType?: string, context?: string): string {
    const locationText = location ? ` in ${location}` : ''

    if (context === 'contractor_search') {
        if (query.toLowerCase().includes('kitchen')) {
            return `For kitchen remodeling${locationText}, I recommend focusing on contractors with extensive cabinet, countertop, and plumbing experience. Look for specialists with 5+ years in kitchen renovations and strong ratings in project management.`
        }

        if (query.toLowerCase().includes('bathroom')) {
            return `Bathroom renovations${locationText} require contractors skilled in plumbing, tiling, and waterproofing. Prioritize verified contractors with bathroom-specific portfolios and excellent reviews for timeline adherence.`
        }

        if (query.toLowerCase().includes('roof')) {
            return `For roofing projects${locationText}, safety and weather-proofing expertise are crucial. Look for licensed roofers with insurance coverage, local weather experience, and strong emergency response capabilities.`
        }

        if (query.toLowerCase().includes('electrical')) {
            return `Electrical work${locationText} requires licensed electricians with current code knowledge. Verify licensing, insurance, and experience with your specific electrical needs (residential/commercial, voltage requirements).`
        }
    }

    return `Based on your search for "${query}"${locationText}, I've analyzed available contractors considering specialization, ratings, distance, and project compatibility. Focus on verified contractors with relevant experience and strong local reviews.`
}

function generateSearchSuggestions(query: string, projectType?: string): string[] {
    const suggestions = []

    // Common project-based suggestions
    const projectSuggestions = {
        'kitchen': ['Kitchen Remodeling', 'Cabinet Installation', 'Countertop Replacement', 'Kitchen Design'],
        'bathroom': ['Bathroom Renovation', 'Tile Installation', 'Shower Remodeling', 'Plumbing Services'],
        'roof': ['Roofing Repair', 'Roof Replacement', 'Gutter Installation', 'Roof Inspection'],
        'electrical': ['Electrical Repair', 'Electrical Installation', 'Panel Upgrade', 'Wiring Services'],
        'plumbing': ['Plumbing Repair', 'Pipe Installation', 'Water Heater', 'Drain Cleaning'],
        'flooring': ['Flooring Installation', 'Hardwood Flooring', 'Tile Flooring', 'Carpet Installation']
    }

    // Find matching suggestions based on query
    for (const [key, values] of Object.entries(projectSuggestions)) {
        if (query.toLowerCase().includes(key)) {
            suggestions.push(...values.slice(0, 3))
            break
        }
    }

    // If no specific match, return general suggestions
    if (suggestions.length === 0) {
        suggestions.push('General Contracting', 'Home Renovation', 'Repair Services', 'Maintenance')
    }

    return suggestions.slice(0, 4)
}

function extractMatchingCriteria(query: string): string[] {
    const criteria = []

    if (query.toLowerCase().includes('emergency') || query.toLowerCase().includes('urgent')) {
        criteria.push('24/7 availability')
    }

    if (query.toLowerCase().includes('licensed')) {
        criteria.push('licensed professionals')
    }

    if (query.toLowerCase().includes('insured')) {
        criteria.push('fully insured')
    }

    if (query.toLowerCase().includes('experienced')) {
        criteria.push('5+ years experience')
    }

    return criteria
}
