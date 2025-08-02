// Test individual scrapers after updating selectors
const puppeteer = require('puppeteer')

// Import the base scraper class for testing (simplified version)
class TestScraper {
    constructor(name, url, selectors) {
        this.name = name
        this.url = url
        this.selectors = selectors
    }

    parsePhoneNumber(phone) {
        if (!phone) return undefined
        const cleaned = phone.replace(/[^\d]/g, '')
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
        }
        return phone
    }

    parseFullAddress(address) {
        if (!address) return { address: undefined, city: undefined, state: undefined, zipCode: undefined }

        const parts = address.split(',').map(p => p.trim())
        if (parts.length >= 2) {
            const lastPart = parts[parts.length - 1]
            const stateZipMatch = lastPart.match(/([A-Z]{2})\s*(\d{5}(-\d{4})?)/)

            if (stateZipMatch) {
                return {
                    address: parts.slice(0, -2).join(', ') || undefined,
                    city: parts[parts.length - 2] || undefined,
                    state: stateZipMatch[1],
                    zipCode: stateZipMatch[2]
                }
            }
        }

        return {
            address: address,
            city: undefined,
            state: undefined,
            zipCode: undefined
        }
    }

    async test(location = 'Denver, CO') {
        const browser = await puppeteer.launch({
            headless: false, // Show browser for debugging
            slowMo: 100
        })

        try {
            const page = await browser.newPage()
            await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

            const testUrl = this.url.replace('{location}', encodeURIComponent(location))
            console.log(`🧪 Testing ${this.name}`)
            console.log(`📄 URL: ${testUrl}`)

            await page.goto(testUrl, { waitUntil: 'networkidle2', timeout: 30000 })
            await new Promise(resolve => setTimeout(resolve, 3000))

            console.log(`✅ Page loaded: ${await page.title()}`)

            // Test each selector
            for (const [key, selector] of Object.entries(this.selectors)) {
                try {
                    const elements = await page.$$(selector)
                    console.log(`🔍 ${key}: ${selector} → ${elements.length} matches`)

                    if (elements.length > 0 && key === 'container') {
                        // Test extracting data from first few containers
                        console.log('\n📊 Sample data extraction:')

                        for (let i = 0; i < Math.min(3, elements.length); i++) {
                            try {
                                const data = await elements[i].evaluate((el, selectors) => {
                                    const name = el.querySelector(selectors.name)?.textContent?.trim()
                                    const phone = el.querySelector(selectors.phone)?.textContent?.trim() ||
                                        el.querySelector(selectors.phone)?.getAttribute('href')?.replace('tel:', '')
                                    const address = el.querySelector(selectors.address)?.textContent?.trim()
                                    const website = el.querySelector(selectors.website)?.getAttribute('href')

                                    return { name, phone, address, website }
                                }, this.selectors)

                                console.log(`   ${i + 1}. Name: ${data.name || 'Not found'}`)
                                console.log(`      Phone: ${data.phone || 'Not found'}`)
                                console.log(`      Address: ${data.address || 'Not found'}`)
                                console.log(`      Website: ${data.website || 'Not found'}`)
                                console.log('')
                            } catch (error) {
                                console.log(`   ${i + 1}. Error extracting data: ${error.message}`)
                            }
                        }
                    }
                } catch (error) {
                    console.log(`❌ ${key}: ${selector} → Error: ${error.message}`)
                }
            }

            console.log('\n💡 Keep browser open to inspect elements manually.')
            console.log('   Press Ctrl+C when done.')

            // Keep browser open for inspection
            await new Promise(() => { })

        } catch (error) {
            console.error('❌ Test failed:', error.message)
        } finally {
            await browser.close()
        }
    }
}

// Predefined scraper tests
const scraperConfigs = {
    yelp: {
        name: 'Yelp',
        url: 'https://www.yelp.com/search?find_desc=countertop+installation&find_loc={location}',
        selectors: {
            container: '[data-testid="serp-ia-card"], .business-listing, .search-result',
            name: '[data-testid="business-name"], .business-name, h3, h4',
            phone: '[data-testid="business-phone"], .phone, [href^="tel:"]',
            address: '[data-testid="business-address"], .address',
            website: 'a[href*="http"]:not([href*="yelp"])'
        }
    },

    yellowpages: {
        name: 'Yellow Pages',
        url: 'https://www.yellowpages.com/search?search_terms=countertop+installation&geo_location_terms={location}',
        selectors: {
            container: '.result, .search-results .business-card, .organic',
            name: '.business-name, h3, h4, .n',
            phone: '.phone, .phones, [href^="tel:"]',
            address: '.address, .adr, .street-address',
            website: '.website, [href*="http"]:not([href*="yellowpages"])'
        }
    },

    angi: {
        name: 'Angi',
        url: 'https://www.angi.com/companylist/us/{location}/countertop-installation.htm',
        selectors: {
            container: '[data-testid="provider-card"], .provider-card, .contractor-card',
            name: 'h3, .company-name, [data-testid="provider-name"]',
            phone: '[href^="tel:"], .phone-number',
            address: '.address, .location, [data-testid="provider-address"]',
            website: 'a[href*="http"]:not([href*="angi"])'
        }
    }
}

async function testScraper(scraperName, location = 'Denver, CO') {
    const config = scraperConfigs[scraperName.toLowerCase()]
    if (!config) {
        console.log(`❌ Unknown scraper: ${scraperName}`)
        console.log('📋 Available scrapers:', Object.keys(scraperConfigs).join(', '))
        return
    }

    const scraper = new TestScraper(config.name, config.url, config.selectors)
    await scraper.test(location)
}

// Command line usage
const args = process.argv.slice(2)
if (args.length === 0) {
    console.log('🧪 Single Scraper Tester')
    console.log('========================')
    console.log('')
    console.log('Usage: node test-single-scraper.js <scraper-name> [location]')
    console.log('')
    console.log('Available scrapers:')
    Object.entries(scraperConfigs).forEach(([key, config]) => {
        console.log(`  ${key}: ${config.name}`)
    })
    console.log('')
    console.log('Examples:')
    console.log('  node test-single-scraper.js yelp "Miami, FL"')
    console.log('  node test-single-scraper.js yellowpages "Denver, CO"')
    console.log('  node test-single-scraper.js angi "New York, NY"')
    console.log('')
    console.log('This will:')
    console.log('  • Open the scraper target site')
    console.log('  • Test all CSS selectors')
    console.log('  • Show you what data is extracted')
    console.log('  • Keep browser open for manual inspection')
} else {
    const scraperName = args[0]
    const location = args[1] || 'Denver, CO'
    testScraper(scraperName, location)
}
