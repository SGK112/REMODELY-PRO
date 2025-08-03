import puppeteer from 'puppeteer'

async function inspectCaesarstone() {
    console.log('🔍 Inspecting Caesarstone dealer finder...')

    const browser = await puppeteer.launch({
        headless: false, // Show browser so you can see what's happening
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    try {
        const page = await browser.newPage()
        await page.setViewport({ width: 1280, height: 720 })

        // Go to main site first
        console.log('📄 Loading Caesarstone homepage...')
        await page.goto('https://www.caesarstone.com', {
            waitUntil: 'networkidle2',
            timeout: 15000
        })

        // Look for dealer/where to buy links
        console.log('🔍 Looking for dealer finder links...')

        // Common patterns for dealer finders
        const dealerSelectors = [
            'a[href*="dealer"]',
            'a[href*="where"]',
            'a[href*="buy"]',
            'a[href*="find"]',
            'a[href*="locate"]',
            'a:contains("dealer")',
            'a:contains("where to buy")',
            'a:contains("find")',
            'a:contains("locate")'
        ]

        for (const selector of dealerSelectors) {
            try {
                const elements = await page.$$(selector)
                if (elements.length > 0) {
                    console.log(`✅ Found ${elements.length} elements with selector: ${selector}`)

                    const links = await page.$$eval(selector, els =>
                        els.map(el => ({
                            text: el.textContent?.trim(),
                            href: el.href
                        })).slice(0, 3)
                    )

                    links.forEach(link => {
                        console.log(`   - "${link.text}" -> ${link.href}`)
                    })
                }
            } catch (e) {
                // Selector not supported, skip
            }
        }

        // Try to find dealer page by looking at navigation
        console.log('🧭 Checking navigation menu...')
        const navLinks = await page.$$eval('nav a, header a, .menu a', links =>
            links
                .map(link => ({
                    text: link.textContent?.trim().toLowerCase(),
                    href: link.href
                }))
                .filter(link =>
                    link.text?.includes('dealer') ||
                    link.text?.includes('where') ||
                    link.text?.includes('find') ||
                    link.text?.includes('buy') ||
                    link.text?.includes('locate')
                )
                .slice(0, 5)
        )

        console.log(`📋 Found ${navLinks.length} potential navigation links:`)
        navLinks.forEach(link => {
            console.log(`   - "${link.text}" -> ${link.href}`)
        })

        // If we found a dealer link, try to visit it
        if (navLinks.length > 0) {
            const dealerLink = navLinks[0]
            console.log(`🔗 Trying to visit: ${dealerLink.href}`)

            await page.goto(dealerLink.href, {
                waitUntil: 'networkidle2',
                timeout: 15000
            })

            console.log('📄 Dealer page loaded!')
            console.log('🎯 Title:', await page.title())

            // Look for forms, search inputs, or contractor listings
            const searchInputs = await page.$$('input[type="text"], input[type="search"], input[placeholder*="zip"], input[placeholder*="location"]')
            console.log(`🔍 Found ${searchInputs.length} search inputs`)

            const contractorElements = await page.$$('.contractor, .dealer, .fabricator, .distributor, [class*="contractor"], [class*="dealer"]')
            console.log(`👥 Found ${contractorElements.length} potential contractor elements`)
        }

        // Keep browser open for 10 seconds so you can inspect manually
        console.log('🕐 Keeping browser open for 10 seconds for manual inspection...')
        await new Promise(resolve => setTimeout(resolve, 10000))

    } catch (error) {
        console.error('❌ Error:', error.message)
    } finally {
        await browser.close()
    }
}

inspectCaesarstone().catch(console.error)
