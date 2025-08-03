// Quick test of one scraper with updated selectors
const puppeteer = require('puppeteer')

async function testYelpScraper() {
    console.log('🧪 Testing Yelp Scraper with Manual Inspection')
    console.log('============================================\n')

    const browser = await puppeteer.launch({
        headless: false, // Show browser to see what's happening
        slowMo: 100
    })

    try {
        const page = await browser.newPage()
        const searchLocation = 'Denver, CO'
        const searchUrl = `https://www.yelp.com/search?find_desc=countertop+installation&find_loc=${encodeURIComponent(searchLocation)}`

        console.log(`🔍 Navigating to: ${searchUrl}`)
        await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 30000 })

        // Wait a bit to see the page
        await new Promise(resolve => setTimeout(resolve, 3000))

        // Get page title to confirm we're on the right page
        const title = await page.title()
        console.log(`📄 Page title: ${title}`)

        // Look for any business cards/listings
        const possibleSelectors = [
            '[data-testid="serp-ia-card"]',
            '.business-listing',
            '.search-result',
            '[data-testid="bizName"]',
            '.businessName',
            'h3 a[href*="/biz/"]',
            'a[href*="/biz/"]'
        ]

        console.log('\n🔍 Testing selectors:')
        for (const selector of possibleSelectors) {
            try {
                const elements = await page.$$(selector)
                console.log(`   ${selector}: ${elements.length} elements found`)

                if (elements.length > 0) {
                    // Get sample text from first element
                    const sampleText = await elements[0].evaluate(el => el.textContent?.trim())
                    console.log(`      Sample text: "${sampleText?.substring(0, 50)}..."`)
                }
            } catch (error) {
                console.log(`   ${selector}: Error - ${error.message}`)
            }
        }

        // Take a screenshot to see what the page looks like
        await page.screenshot({ path: 'yelp-test.png', fullPage: true })
        console.log('\n📸 Screenshot saved as yelp-test.png')

        console.log('\n💡 Analysis:')
        console.log('   - The scraper infrastructure works (page loads successfully)')
        console.log('   - The issue is CSS selectors need updating to match current HTML')
        console.log('   - This is normal - websites change their structure regularly')
        console.log('   - We need to inspect the actual HTML and update selectors')

    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        await browser.close()
    }
}

testYelpScraper()
