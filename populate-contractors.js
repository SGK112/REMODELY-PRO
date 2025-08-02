// Script to populate database with scraped contractor data
import { ContractorScraper } from './lib/scraper.ts'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function populateDatabase() {
    console.log('🚀 Starting contractor database population...')

    const scraper = new ContractorScraper()

    try {
        // Scrape contractors from public sources (most reliable)
        console.log('📊 Scraping public data sources...')
        const publicContractors = await scraper.scrapePublicDataSources('Phoenix, AZ')

        // Scrape from manufacturer websites  
        console.log('🏭 Scraping manufacturer websites...')
        const manufacturerContractors = await scraper.scrapeManufacturerWebsites('Phoenix, AZ')

        // Combine all results
        const allContractors = [...publicContractors, ...manufacturerContractors]

        console.log(`✅ Found ${allContractors.length} contractors total`)

        // Save to database
        if (allContractors.length > 0) {
            console.log('💾 Saving contractors to database...')
            await scraper.saveContractorsToDatabase(allContractors)

            // Check what's in the database now
            const dbCount = await prisma.contractor.count()
            console.log(`🎯 Database now contains ${dbCount} contractors`)

            // Show some examples
            const examples = await prisma.contractor.findMany({
                take: 3,
                include: {
                    user: {
                        select: { name: true, email: true }
                    }
                }
            })

            console.log('\n📋 Sample contractors in database:')
            examples.forEach((contractor, i) => {
                console.log(`${i + 1}. ${contractor.businessName}`)
                console.log(`   📞 ${contractor.phone || 'No phone'}`)
                console.log(`   📍 ${contractor.city}, ${contractor.state}`)
                console.log(`   🛠️  ${JSON.parse(contractor.specialties || '[]').join(', ')}`)
                console.log(`   📧 ${contractor.user.email}`)
                console.log('')
            })
        }

    } catch (error) {
        console.error('❌ Error:', error)
    } finally {
        await scraper.close()
    }
}

async function showCurrentDatabase() {
    console.log('\n🗄️  Current Database Contents:')

    const contractors = await prisma.contractor.findMany({
        include: {
            user: {
                select: { name: true }
            }
        }
    })

    console.log(`Total contractors: ${contractors.length}`)

    contractors.forEach((contractor, i) => {
        console.log(`${i + 1}. ${contractor.businessName} (${contractor.city}, ${contractor.state})`)
    })
}

// Main execution
async function main() {
    console.log('🎯 Remodely.AI Database Populator')
    console.log('=====================================\n')

    // Show current state
    await showCurrentDatabase()

    // Ask if user wants to populate
    console.log('\n❓ Ready to populate database with scraped contractors?')
    console.log('This will:')
    console.log('- Scrape public data sources (Arizona ROC, BBB, etc.)')
    console.log('- Scrape manufacturer websites')
    console.log('- Save all contractors to your database')
    console.log('- Update your /contractors page with real data')

    // For demo, let's just show what would happen
    console.log('\n🎬 DEMO MODE: Showing what would be populated...')

    const mockScrapedData = [
        {
            name: 'Arizona Stone Works',
            businessName: 'Arizona Stone Works LLC',
            phone: '(602) 555-0100',
            email: 'info@arizonastoneworks.com',
            city: 'Phoenix',
            state: 'AZ',
            specialties: ['Granite Installation', 'Quartz Countertops', 'Kitchen Remodeling'],
            certifications: ['Arizona ROC Licensed #123456', 'BBB Accredited A+'],
            source: 'Arizona ROC Database'
        },
        {
            name: 'Desert Granite Solutions',
            businessName: 'Desert Granite Solutions',
            phone: '(480) 555-0200',
            email: 'contact@desertgranite.com',
            city: 'Scottsdale',
            state: 'AZ',
            specialties: ['Marble Installation', 'Kitchen Remodeling', 'Custom Fabrication'],
            certifications: ['BBB Accredited Business A+', 'NKBA Member'],
            source: 'Better Business Bureau'
        }
    ]

    console.log('\n📊 Sample data that would be added:')
    mockScrapedData.forEach((contractor, i) => {
        console.log(`${i + 1}. ${contractor.businessName}`)
        console.log(`   📞 ${contractor.phone}`)
        console.log(`   📧 ${contractor.email}`)
        console.log(`   📍 ${contractor.city}, ${contractor.state}`)
        console.log(`   🛠️  ${contractor.specialties.join(', ')}`)
        console.log(`   ✅ ${contractor.certifications.join(', ')}`)
        console.log(`   🔗 Source: ${contractor.source}`)
        console.log('')
    })

    console.log('💡 Running real population now...')

    // Actually populate the database:
    await populateDatabase()
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())
