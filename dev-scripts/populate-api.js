// Simple script to populate database using the existing API
import fetch from 'node-fetch'

async function populateWithAPI() {
    console.log('🚀 Starting contractor database population via API...')

    try {
        // Use the existing scraping API endpoint
        console.log('📊 Calling scraping API for public data sources...')
        const response = await fetch('http://localhost:3003/api/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                location: 'Phoenix, AZ',
                category: 'public'
            })
        })

        if (!response.ok) {
            throw new Error(`API call failed: ${response.statusText}`)
        }

        const data = await response.json()

        console.log('✅ API Response:')
        console.log(`- Success: ${data.success}`)
        console.log(`- Contractors found: ${data.contractorsCount || 0}`)

        if (data.contractors && data.contractors.length > 0) {
            console.log('\n📋 Sample contractors found:')
            data.contractors.slice(0, 3).forEach((contractor, i) => {
                console.log(`${i + 1}. ${contractor.businessName || contractor.name}`)
                console.log(`   📞 ${contractor.phone || 'No phone'}`)
                console.log(`   📍 ${contractor.city}, ${contractor.state}`)
                console.log(`   🛠️  ${contractor.specialties?.join(', ') || 'No specialties'}`)
                console.log(`   🔗 Source: ${contractor.source || 'Unknown'}`)
                console.log('')
            })
        } else {
            console.log('ℹ️  No contractors found from public sources')
        }

        // Try manufacturer scraping too
        console.log('\n🏭 Calling scraping API for manufacturer websites...')
        const manufacturerResponse = await fetch('http://localhost:3003/api/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                location: 'Phoenix, AZ',
                category: 'manufacturers'
            })
        })

        if (manufacturerResponse.ok) {
            const manufacturerData = await manufacturerResponse.json()
            console.log(`✅ Manufacturer scraping: ${manufacturerData.contractorsCount || 0} contractors found`)
        }

    } catch (error) {
        console.error('❌ Error:', error.message)
        console.log('\n💡 Make sure the Next.js server is running on localhost:3003')
        console.log('   Run: npm run dev')
    }
}

async function checkDatabase() {
    console.log('\n🗄️  Checking database via API...')

    try {
        const response = await fetch('http://localhost:3003/api/contractors?page=1&limit=10')

        if (response.ok) {
            const data = await response.json()
            console.log(`Total contractors in database: ${data.contractors?.length || 0}`)

            if (data.contractors && data.contractors.length > 0) {
                console.log('\n📋 Current contractors in database:')
                data.contractors.forEach((contractor, i) => {
                    console.log(`${i + 1}. ${contractor.businessName}`)
                    console.log(`   📍 ${contractor.city}, ${contractor.state}`)
                    console.log(`   ✅ Verified: ${contractor.isVerified ? 'Yes' : 'No'}`)
                    console.log('')
                })
            }
        } else {
            console.log('Unable to check database - API not available')
        }
    } catch (error) {
        console.log('Unable to check database:', error.message)
    }
}

// Main execution
async function main() {
    console.log('🎯 Remodely.AI Database Populator (API Version)')
    console.log('==================================================\n')

    // Check current database state
    await checkDatabase()

    console.log('\n❓ Ready to populate database with scraped contractors?')
    console.log('This will:')
    console.log('- Use the existing scraping API endpoints')
    console.log('- Scrape public data sources (Arizona ROC, BBB, etc.)')
    console.log('- Scrape manufacturer websites')
    console.log('- Save all contractors to your database')
    console.log('- Update your /contractors page with real data')

    console.log('\n🚀 Starting population...')
    await populateWithAPI()

    console.log('\n🔄 Checking database after population...')
    await checkDatabase()

    console.log('\n✅ Population complete!')
    console.log('💡 Visit http://localhost:3003/contractors to see the results')
    console.log('💡 Or visit http://localhost:3003/test-scraping to test the system')
}

main().catch(console.error)
