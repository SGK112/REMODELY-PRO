const puppeteer = require('puppeteer')
const { ArizonaROCLicenseScraper } = require('./lib/scrapers/public-sources')

// Simple test of Arizona ROC scraper with your credentials
async function testArizonaROCOnly() {
    console.log('🏛️ Testing Arizona ROC License Scraper...')
    console.log('Using credentials: joshb@surprisegranite.com')
    console.log('Target: https://azroc.my.site.com/AZRoc/s/contractor-search')
    console.log()

    const browser = await puppeteer.launch({
        headless: false, // Show browser for debugging
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: { width: 1200, height: 800 }
    })

    try {
        const scraper = new ArizonaROCLicenseScraper()
        const contractors = await scraper.scrape(browser, 'arizona')

        console.log(`🎯 Results: Found ${contractors.length} contractors`)

        if (contractors.length > 0) {
            console.log('\n📋 Sample contractors:')
            contractors.slice(0, 5).forEach((contractor, i) => {
                console.log(`${i + 1}. ${contractor.businessName}`)
                console.log(`   📍 ${contractor.address}, ${contractor.city}, ${contractor.state} ${contractor.zipCode}`)
                console.log(`   📞 ${contractor.phone}`)
                console.log(`   🏆 Specialties: ${contractor.specialties.join(', ')}`)
                console.log(`   📜 License: ${contractor.licenseNumber}`)
                console.log(`   📝 ${contractor.description}`)
                console.log()
            })
        } else {
            console.log('❌ No contractors found. This could be due to:')
            console.log('   - Login issues with the provided credentials')
            console.log('   - Changes in the Arizona ROC website structure')
            console.log('   - Network connectivity issues')
            console.log('   - Salesforce Lightning platform changes')
            console.log()
            console.log('💡 The browser window will stay open for manual inspection')
            console.log('   You can manually navigate and see what happens')
        }

        // Keep browser open for 60 seconds for manual inspection
        console.log('🔍 Browser staying open for 60 seconds for manual inspection...')
        await new Promise(resolve => setTimeout(resolve, 60000))

    } catch (error) {
        console.error('❌ Error in Arizona ROC test:', error)
    } finally {
        await browser.close()
    }
}

// Run the simple test
testArizonaROCOnly().catch(console.error)
