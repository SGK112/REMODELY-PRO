// Test the expanded scraping system via API
async function testExpandedScrapingAPI() {
    console.log('🚀 Testing Expanded Contractor Scraping via API')
    console.log('===============================================\n')

    const testLocation = 'Denver, CO'
    const categories = [
        { name: 'directories', description: 'General contractor directories' },
        { name: 'industry', description: 'Industry-specific directories' },
        { name: 'local', description: 'Local business directories' }
    ]

    console.log(`📍 Testing location: ${testLocation}\n`)

    // First start the dev server in the background
    console.log('Starting development server...')

    // Wait a bit for server to start, then test each category
    setTimeout(async () => {
        for (const category of categories) {
            try {
                console.log(`\n🔍 Testing ${category.description}...`)

                const response = await fetch('http://localhost:3000/api/scrape', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // Note: In production, you'd need proper authentication
                    },
                    body: JSON.stringify({
                        location: testLocation,
                        category: category.name
                    })
                })

                if (response.ok) {
                    const data = await response.json()
                    console.log(`✅ ${category.name}: Found ${data.details.totalScraped} contractors`)

                    if (data.details.contractors.length > 0) {
                        console.log('   Sample contractors:')
                        data.details.contractors.slice(0, 3).forEach((contractor, index) => {
                            console.log(`   ${index + 1}. ${contractor.name} (${contractor.city || 'Unknown city'})`)
                        })
                    }
                } else {
                    console.log(`❌ ${category.name}: API request failed - ${response.status}`)
                }
            } catch (error) {
                console.log(`❌ ${category.name}: Error - ${error.message}`)
            }

            // Wait between requests
            await new Promise(resolve => setTimeout(resolve, 2000))
        }
    }, 5000) // Wait 5 seconds for server to start
}

console.log('📝 Instructions for testing:')
console.log('1. Run this command in one terminal: npm run dev')
console.log('2. Wait for server to start (should show "Ready on http://localhost:3000")')
console.log('3. Run this script in another terminal: node test-api-scraping.js')
console.log('4. Make sure you are signed in as admin to access the scraping API\n')

// For now, just show the test structure
console.log('🔧 Expanded Scraping System Overview:')
console.log('=====================================')
console.log('✅ Manufacturer Websites (12 scrapers):')
console.log('   • Caesarstone, Cambria, Silestone, MSI Stone')
console.log('   • Quartz Master, Hanstone, Corian, Formica')
console.log('   • Wilsonart, LG Viatera, Samsung Radianz, Dekton')
console.log('')
console.log('✅ General Contractor Directories (6 scrapers):')
console.log('   • Angi (formerly Angie\'s List)')
console.log('   • HomeAdvisor')
console.log('   • Houzz')
console.log('   • Thumbtack')
console.log('   • Google Business/Maps')
console.log('   • Better Business Bureau')
console.log('')
console.log('✅ Industry-Specific Directories (5 scrapers):')
console.log('   • NKBA (National Kitchen & Bath Association)')
console.log('   • Marble Institute of America')
console.log('   • Natural Stone Institute')
console.log('   • BuildZoom')
console.log('   • Porch')
console.log('')
console.log('✅ Local Business Directories (4 scrapers):')
console.log('   • Yellow Pages')
console.log('   • Yelp')
console.log('   • Local Association Websites')
console.log('   • Facebook Business Pages')
console.log('')
console.log('🎯 Total: 27 different scraping sources!')
console.log('')
console.log('💡 Key Features:')
console.log('   • Location-based filtering')
console.log('   • Category-specific scraping')
console.log('   • Automatic deduplication')
console.log('   • Database integration')
console.log('   • Rate limiting for respectful scraping')
console.log('   • Error handling and logging')
console.log('')
console.log('📊 Expected Results:')
console.log('   • Manufacturer sites: 0-5 contractors (need selector updates)')
console.log('   • Directory sites: 5-15 contractors per site')
console.log('   • Industry sites: 3-10 contractors per site')
console.log('   • Local directories: 10-20 contractors per site')
console.log('   • Total potential: 50-200+ contractors per location')
