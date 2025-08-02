// Import using ESM syntax for TypeScript compatibility
async function importScraper() {
    const module = await import('./lib/scraper.ts')
    return module.ContractorScraper
}

async function testExpandedScraping() {
    console.log('🚀 Testing Expanded Contractor Scraping System')
    console.log('===============================================\n')

    const ContractorScraper = await importScraper()
    const scraper = new ContractorScraper()

    try {
        // Test different categories of scrapers
        const testLocation = 'Denver, CO'

        console.log(`📍 Testing location: ${testLocation}\n`)

        // Test 1: Manufacturer websites (updated selectors needed)
        console.log('1️⃣ Testing Manufacturer Websites...')
        const manufacturerResults = await scraper.scrapeManufacturerWebsites(testLocation)
        console.log(`   Found ${manufacturerResults.length} contractors from manufacturer sites\n`)

        // Test 2: General contractor directories
        console.log('2️⃣ Testing General Contractor Directories...')
        const directoryResults = await scraper.scrapeDirectoryWebsites(testLocation)
        console.log(`   Found ${directoryResults.length} contractors from directory sites\n`)

        // Test 3: Industry-specific directories
        console.log('3️⃣ Testing Industry-Specific Directories...')
        const industryResults = await scraper.scrapeIndustryWebsites(testLocation)
        console.log(`   Found ${industryResults.length} contractors from industry sites\n`)

        // Test 4: Local business directories
        console.log('4️⃣ Testing Local Business Directories...')
        const localResults = await scraper.scrapeLocalDirectories(testLocation)
        console.log(`   Found ${localResults.length} contractors from local directories\n`)

        // Combine all results
        const allContractors = [
            ...manufacturerResults,
            ...directoryResults,
            ...industryResults,
            ...localResults
        ]

        console.log('📊 FINAL RESULTS:')
        console.log('==================')
        console.log(`Total contractors found: ${allContractors.length}`)
        console.log(`Manufacturer sites: ${manufacturerResults.length}`)
        console.log(`Directory sites: ${directoryResults.length}`)
        console.log(`Industry sites: ${industryResults.length}`)
        console.log(`Local directories: ${localResults.length}`)

        // Show sample contractors
        if (allContractors.length > 0) {
            console.log('\n📋 Sample Contractors Found:')
            console.log('============================')
            allContractors.slice(0, 5).forEach((contractor, index) => {
                console.log(`${index + 1}. ${contractor.businessName}`)
                console.log(`   Phone: ${contractor.phone || 'Not provided'}`)
                console.log(`   City: ${contractor.city || 'Not provided'}`)
                console.log(`   Specialties: ${contractor.specialties.join(', ')}`)
                console.log(`   Source: ${contractor.certifications[0] || 'Unknown'}`)
                console.log('')
            })
        }

        // Save to database if we found contractors
        if (allContractors.length > 0) {
            console.log('💾 Saving contractors to database...')
            await scraper.saveContractorsToDatabase(allContractors)
            console.log(`✅ Successfully saved ${allContractors.length} contractors to database`)
        } else {
            console.log('❌ No contractors found - scrapers may need selector updates')
        }

    } catch (error) {
        console.error('❌ Error during testing:', error)
    } finally {
        await scraper.close()
        console.log('\n🔚 Testing completed')
    }
}

// Run the test
testExpandedScraping().catch(console.error)
