import { NextRequest, NextResponse } from 'next/server'
import { ContractorScraper } from '@/lib/scraper'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        // Check for admin authentication
        const session = await getServerSession(authOptions)
        if (!session?.user?.email || session.user.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await request.json().catch(() => ({}))
        const { location, category = 'all' } = body

        const scraper = new ContractorScraper()

        console.log(`Starting scrape for category: ${category}`)
        console.log(`Location filter: ${location || 'All locations'}`)

        let results = []
        let categoryName = ''

        // Run different scraper categories based on request
        switch (category) {
            case 'manufacturers':
                results = await scraper.scrapeManufacturerWebsites(location)
                categoryName = 'manufacturer websites'
                break
            case 'directories':
                results = await scraper.scrapeDirectoryWebsites(location)
                categoryName = 'contractor directories'
                break
            case 'industry':
                results = await scraper.scrapeIndustryWebsites(location)
                categoryName = 'industry associations'
                break
            case 'local':
                results = await scraper.scrapeLocalDirectories(location)
                categoryName = 'local directories'
                break
            case 'authenticated':
                results = await scraper.scrapeAuthenticatedSources(location)
                categoryName = 'authenticated sources (Angi & HomeAdvisor)'
                break
            case 'public':
                results = await scraper.scrapePublicDataSources(location)
                categoryName = 'public data sources (Government, BBB, Yellow Pages)'
                break
            case 'all':
            default:
                results = await scraper.scrapeAllManufacturers(location)
                categoryName = 'all sources'
                break
        }

        // Store the scraped contractors in the database
        let storedCount = 0
        for (const contractor of results) {
            try {
                await scraper.storeContractor(contractor)
                storedCount++
            } catch (error) {
                console.error(`Failed to store contractor ${contractor.businessName}:`, error)
            }
        }

        return NextResponse.json({
            success: true,
            message: `Successfully scraped ${results.length} contractors from ${categoryName} and stored ${storedCount} in database`,
            details: {
                category: categoryName,
                totalScraped: results.length,
                totalStored: storedCount,
                skipped: results.length - storedCount,
                contractors: results.slice(0, 10).map(contractor => ({
                    name: contractor.businessName,
                    city: contractor.city,
                    state: contractor.state,
                    source: contractor.certifications[0] || 'Unknown',
                    specialties: contractor.specialties
                }))
            }
        })

    } catch (error) {
        console.error('Scraping API error:', error)
        return NextResponse.json({
            error: 'Internal server error during scraping',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

export async function GET() {
    // Get available manufacturers and instructions
    return NextResponse.json({
        availableManufacturers: [
            'caesarstone',
            'cambria',
            'silestone',
            'msi-stone',
            'quartz-master',
            'hanstone',
            'formica',
            'corian'
        ],
        instructions: {
            endpoint: '/api/scrape',
            method: 'POST',
            body: {
                location: 'optional - e.g., "California" or "90210"'
            },
            notes: 'Admin authentication required. Scrapes all manufacturers. Can take several minutes.'
        }
    })
}
