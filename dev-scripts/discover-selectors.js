// Automatic CSS selector discovery tool
const puppeteer = require('puppeteer')

async function discoverSelectors(url, searchType = 'business') {
    console.log(`🔍 Discovering selectors for: ${url}`)
    console.log('='.repeat(50))

    const browser = await puppeteer.launch({
        headless: false, // Show browser so you can see what's happening
        slowMo: 100
    })

    try {
        const page = await browser.newPage()

        // Set realistic user agent
        await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

        console.log(`📄 Loading page...`)
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 })

        // Wait for page to fully load
        await new Promise(resolve => setTimeout(resolve, 3000))

        console.log(`✅ Page loaded: ${await page.title()}`)

        // Common selector patterns for business listings
        const commonPatterns = [
            // Generic business card patterns
            '.business-card',
            '.business-listing',
            '.listing-card',
            '.result-card',
            '.company-card',
            '.contractor-card',
            '.provider-card',
            '.professional-card',

            // Data attribute patterns
            '[data-testid*="business"]',
            '[data-testid*="result"]',
            '[data-testid*="card"]',
            '[data-testid*="listing"]',
            '[data-testid*="provider"]',
            '[data-cy*="business"]',
            '[data-cy*="result"]',

            // ID-based patterns
            '#search-results > div',
            '#results > div',
            '#listings > div',

            // Class patterns with common keywords
            '[class*="business"]',
            '[class*="listing"]',
            '[class*="result"]',
            '[class*="card"]',
            '[class*="item"]',
            '[class*="row"]',

            // Article/section patterns
            'article',
            'section[class*="result"]',
            'section[class*="business"]',

            // List item patterns
            'li[class*="result"]',
            'li[class*="business"]',
            'li[class*="listing"]',

            // Div patterns
            'div[class*="result"]:not([class*="header"])',
            'div[class*="business"]:not([class*="header"])',
            'div[class*="listing"]:not([class*="header"])'
        ]

        console.log('\n🔍 Testing selector patterns...')
        const workingSelectors = []

        for (const selector of commonPatterns) {
            try {
                const elements = await page.$$(selector)
                if (elements.length > 0) {
                    console.log(`✅ ${selector}: ${elements.length} elements`)

                    // Get sample text from first element
                    if (elements.length > 0) {
                        const sampleText = await elements[0].evaluate(el => {
                            return el.textContent?.trim().substring(0, 100) || 'No text content'
                        })
                        console.log(`   Sample: "${sampleText}..."`)

                        workingSelectors.push({
                            selector,
                            count: elements.length,
                            sample: sampleText
                        })
                    }
                }
            } catch (error) {
                // Skip selectors that cause errors
            }
        }

        // Look for specific business information patterns
        console.log('\n🏢 Looking for business name patterns...')
        const namePatterns = [
            'h3', 'h4', 'h2',
            '.business-name',
            '.company-name',
            '.name',
            '[class*="name"]',
            '[data-testid*="name"]',
            'a[href*="business"]',
            'a[href*="biz"]'
        ]

        for (const pattern of namePatterns) {
            try {
                const elements = await page.$$(pattern)
                if (elements.length > 2) { // Only show if multiple matches
                    const samples = []
                    for (let i = 0; i < Math.min(3, elements.length); i++) {
                        const text = await elements[i].evaluate(el => el.textContent?.trim())
                        if (text && text.length > 3 && text.length < 100) {
                            samples.push(text)
                        }
                    }
                    if (samples.length > 0) {
                        console.log(`📝 ${pattern}: ${elements.length} elements`)
                        console.log(`   Samples: ${samples.join(' | ')}`)
                    }
                }
            } catch (error) {
                // Skip
            }
        }

        // Look for phone number patterns
        console.log('\n📞 Looking for phone patterns...')
        const phonePatterns = [
            'a[href^="tel:"]',
            '.phone',
            '[class*="phone"]',
            '[data-testid*="phone"]'
        ]

        for (const pattern of phonePatterns) {
            try {
                const elements = await page.$$(pattern)
                if (elements.length > 0) {
                    const sample = await elements[0].evaluate(el => {
                        return el.textContent?.trim() || el.getAttribute('href') || 'No content'
                    })
                    console.log(`📞 ${pattern}: ${elements.length} elements - "${sample}"`)
                }
            } catch (error) {
                // Skip
            }
        }

        console.log('\n🎯 RECOMMENDATIONS:')
        console.log('='.repeat(30))

        if (workingSelectors.length > 0) {
            console.log('Top selector candidates:')
            workingSelectors
                .sort((a, b) => b.count - a.count)
                .slice(0, 3)
                .forEach((sel, index) => {
                    console.log(`${index + 1}. ${sel.selector} (${sel.count} matches)`)
                    console.log(`   Sample content: "${sel.sample.substring(0, 60)}..."`)
                })

            console.log('\n💡 Next steps:')
            console.log('1. Choose the selector that best matches business listings')
            console.log('2. Test it in browser console: document.querySelectorAll("your-selector")')
            console.log('3. Update your scraper file with the working selector')
            console.log('4. Test the updated scraper')
        } else {
            console.log('❌ No common selectors found. This site may have:')
            console.log('   • Heavy JavaScript rendering (wait longer)')
            console.log('   • Anti-bot protection')
            console.log('   • Unusual HTML structure')
            console.log('   • Login requirements')
        }

        // Keep browser open for manual inspection
        console.log('\n🔍 Browser left open for manual inspection.')
        console.log('   Press Ctrl+C when done exploring.')

        // Wait for user to close manually
        await new Promise(() => { }) // Never resolves, keeps browser open

    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        await browser.close()
    }
}

// Usage examples
const args = process.argv.slice(2)
if (args.length === 0) {
    console.log('🔍 Selector Discovery Tool')
    console.log('=========================')
    console.log('')
    console.log('Usage: node discover-selectors.js <url>')
    console.log('')
    console.log('Examples:')
    console.log('  node discover-selectors.js "https://www.yelp.com/search?find_desc=countertop+installation&find_loc=Denver,CO"')
    console.log('  node discover-selectors.js "https://www.yellowpages.com/search?search_terms=countertop&geo_location_terms=Denver,CO"')
    console.log('  node discover-selectors.js "https://www.angi.com/companylist/us/co/denver/countertop-installation.htm"')
    console.log('')
    console.log('The tool will:')
    console.log('  • Open the site in a visible browser')
    console.log('  • Test common selector patterns')
    console.log('  • Show you what selectors work')
    console.log('  • Leave browser open for manual inspection')
} else {
    const url = args[0]
    discoverSelectors(url)
}
