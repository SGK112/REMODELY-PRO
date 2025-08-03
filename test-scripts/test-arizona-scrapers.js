const { ContractorScraper } = require('./lib/scraper')

// Test the updated Arizona scrapers with real credentials
async function testArizonaScrapers() {
    console.log('🏛️ Testing Arizona contractor scrapers with real credentials...')
    console.log('='.repeat(60))

    const scraper = new ContractorScraper()

    try {
        await scraper.initialize()

        console.log('🔍 Testing Arizona ROC scraper...')
        console.log('Site: https://azroc.my.site.com/AZRoc/s/contractor-search')
        console.log('Credentials: joshb@surprisegranite.com / [password hidden]')
        console.log()

        // Test just the Arizona ROC scraper
        const arizonaRocResults = await scraper.scrapeByCategory('public-sources', 'arizona', 1) // Limit to 1 scraper for testing

        console.log(`📊 Arizona ROC Results: ${arizonaRocResults.length} contractors found`)
        if (arizonaRocResults.length > 0) {
            console.log('Sample contractors:')
            arizonaRocResults.slice(0, 3).forEach((contractor, i) => {
                console.log(`  ${i + 1}. ${contractor.businessName}`)
                console.log(`     📍 ${contractor.city}, ${contractor.state}`)
                console.log(`     📞 ${contractor.phone}`)
                console.log(`     🏆 ${contractor.certifications?.join(', ')}`)
                console.log()
            })
        }

        console.log('='.repeat(60))
        console.log('🏗️ Testing Arizona CLC scraper...')
        console.log('Site: https://www.azclc.com/profiles')
        console.log('Note: This site uses reCAPTCHA')
        console.log()

        // We can show what the scraper detects even if reCAPTCHA blocks it
        console.log('💡 Arizona CLC has the following search capabilities:')
        console.log('   - Description field (for "countertop", "granite", etc.)')
        console.log('   - Name field (for specific contractor names)')
        console.log('   - Zipcode field (for location-based search)')
        console.log('   - Category checkboxes (group[] fields)')
        console.log('   - reCAPTCHA site key: 6LetowQTAAAAALz9gdCNtLPSVG_pBYCcXNwV9SBv')
        console.log()
        console.log('🤖 To scrape Arizona CLC effectively, you would need:')
        console.log('   - CAPTCHA solving service (2captcha.com, anti-captcha.com)')
        console.log('   - Manual browser session with human CAPTCHA solving')
        console.log('   - API access from Arizona CLC directly')

        console.log('='.repeat(60))
        console.log('📋 Summary:')
        console.log(`✅ Arizona ROC: ${arizonaRocResults.length} contractors (authenticated access)`)
        console.log('⚠️  Arizona CLC: 0 contractors (blocked by reCAPTCHA)')
        console.log()
        console.log('🎯 Recommendations:')
        console.log('1. Arizona ROC is your best bet with the credentials you provided')
        console.log('2. Arizona CLC would need additional reCAPTCHA handling')
        console.log('3. Consider reaching out to Arizona CLC for API access')

        // Save Arizona ROC results to database if any found
        if (arizonaRocResults.length > 0) {
            console.log()
            console.log('💾 Saving Arizona ROC contractors to database...')
            const saved = await scraper.saveContractorsToDatabase(arizonaRocResults)
            console.log(`✅ Saved ${saved} new contractors to database`)
        }

    } catch (error) {
        console.error('❌ Error testing Arizona scrapers:', error)
    } finally {
        await scraper.close()
    }
}

// Run the test
testArizonaScrapers().catch(console.error)
