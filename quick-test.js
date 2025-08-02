// Quick API test script
// Run this after starting the dev server

async function testAPI() {
    const testLocation = 'Denver, CO'

    try {
        console.log('🧪 Testing Contractor Directory Scrapers...')

        const response = await fetch('http://localhost:3001/api/scrape', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                location: testLocation,
                category: 'directories' // Test directory scrapers first
            })
        })

        if (response.ok) {
            const data = await response.json()
            console.log('✅ SUCCESS!')
            console.log(`Found ${data.details.totalScraped} contractors`)
            console.log(`Stored ${data.details.totalStored} in database`)

            if (data.details.contractors.length > 0) {
                console.log('\n📋 Sample Results:')
                data.details.contractors.forEach((contractor, index) => {
                    console.log(`${index + 1}. ${contractor.name}`)
                    console.log(`   Location: ${contractor.city}, ${contractor.state}`)
                    console.log(`   Source: ${contractor.source}`)
                })
            }
        } else {
            console.log('❌ API Error:', response.status, await response.text())
            console.log('💡 Make sure you are logged in as admin!')
        }
    } catch (error) {
        console.log('❌ Network Error:', error.message)
        console.log('💡 Make sure the dev server is running!')
    }
}

testAPI()
