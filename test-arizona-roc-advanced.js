const puppeteer = require('puppeteer')

// Advanced test for Arizona ROC with Salesforce Lightning handling
async function testArizonaROCAdvanced() {
    console.log('🏛️ Advanced test for Arizona ROC (Salesforce Lightning)...')

    const browser = await puppeteer.launch({
        headless: false, // Show browser for debugging
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: { width: 1200, height: 800 }
    })

    const page = await browser.newPage()

    try {
        // Set credentials
        const credentials = {
            username: 'joshb@surprisegranite.com',
            password: '@154Asterdr'
        }

        console.log('🔍 Step 1: Navigating to Arizona ROC login...')
        await page.goto('https://azroc.my.site.com', { waitUntil: 'networkidle2' })

        // Wait for Salesforce Lightning to load
        await new Promise(resolve => setTimeout(resolve, 3000))

        // Look for login form
        console.log('🔍 Step 2: Looking for login form...')

        // Try various selectors for username field
        const usernameSelectors = [
            'input[type="email"]',
            'input[name="username"]',
            'input[id*="username"]',
            'input[placeholder*="email"]',
            'input[placeholder*="username"]',
            '.slds-input[type="email"]'
        ]

        let usernameField = null
        for (const selector of usernameSelectors) {
            try {
                await page.waitForSelector(selector, { timeout: 2000 })
                usernameField = selector
                console.log(`✅ Found username field: ${selector}`)
                break
            } catch (e) {
                console.log(`❌ Username selector not found: ${selector}`)
            }
        }

        if (usernameField) {
            console.log('🔐 Step 3: Attempting to login...')

            // Fill username
            await page.type(usernameField, credentials.username)
            console.log('✅ Username entered')

            // Look for password field
            const passwordSelectors = [
                'input[type="password"]',
                'input[name="password"]',
                'input[id*="password"]',
                '.slds-input[type="password"]'
            ]

            let passwordField = null
            for (const selector of passwordSelectors) {
                try {
                    await page.waitForSelector(selector, { timeout: 2000 })
                    passwordField = selector
                    console.log(`✅ Found password field: ${selector}`)
                    break
                } catch (e) {
                    console.log(`❌ Password selector not found: ${selector}`)
                }
            }

            if (passwordField) {
                await page.type(passwordField, credentials.password)
                console.log('✅ Password entered')

                // Look for login button
                const loginButtonSelectors = [
                    'button[type="submit"]',
                    'input[type="submit"]',
                    'button:contains("Log In")',
                    'button:contains("Login")',
                    '.slds-button:contains("Log In")',
                    '.loginButton'
                ]

                let loginButton = null
                for (const selector of loginButtonSelectors) {
                    try {
                        await page.waitForSelector(selector, { timeout: 2000 })
                        loginButton = selector
                        console.log(`✅ Found login button: ${selector}`)
                        break
                    } catch (e) {
                        console.log(`❌ Login button selector not found: ${selector}`)
                    }
                }

                if (loginButton) {
                    await page.click(loginButton)
                    console.log('🔐 Login button clicked')

                    // Wait for navigation
                    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 })
                    console.log('✅ Login successful')
                }
            }
        }

        console.log('🔍 Step 4: Navigating to contractor search...')
        await page.goto('https://azroc.my.site.com/AZRoc/s/contractor-search', { waitUntil: 'networkidle2' })

        // Wait for Lightning components to load
        await new Promise(resolve => setTimeout(resolve, 5000))

        console.log('🔍 Step 5: Analyzing search form after login...')

        // Take screenshot after login
        await page.screenshot({ path: 'arizona-roc-after-login.png' })
        console.log('📸 Screenshot saved: arizona-roc-after-login.png')

        // Look for all interactive elements
        const interactiveElements = await page.evaluate(() => {
            const inputs = Array.from(document.querySelectorAll('input')).map(input => ({
                type: input.type,
                name: input.name,
                id: input.id,
                placeholder: input.placeholder,
                className: input.className,
                value: input.value
            }))

            const selects = Array.from(document.querySelectorAll('select')).map(select => ({
                name: select.name,
                id: select.id,
                className: select.className,
                options: Array.from(select.options).map(opt => opt.text)
            }))

            const buttons = Array.from(document.querySelectorAll('button')).map(button => ({
                text: button.textContent?.trim(),
                type: button.type,
                id: button.id,
                className: button.className
            }))

            // Look for Lightning components
            const lightningComponents = Array.from(document.querySelectorAll('[data-aura-class], [data-lightning], lightning-input, lightning-combobox')).map(el => ({
                tag: el.tagName,
                classes: el.className,
                attributes: Array.from(el.attributes).map(attr => `${attr.name}="${attr.value}"`).slice(0, 3)
            }))

            return { inputs, selects, buttons, lightningComponents }
        })

        console.log('📋 Interactive Elements Found:')
        console.log('Inputs:', interactiveElements.inputs)
        console.log('Selects:', interactiveElements.selects)
        console.log('Buttons:', interactiveElements.buttons)
        console.log('Lightning Components:', interactiveElements.lightningComponents)

        // Try to interact with search form
        console.log('🔍 Step 6: Attempting to use search form...')

        // Look for any search input
        const searchInputs = await page.$$('input')
        if (searchInputs.length > 0) {
            console.log(`Found ${searchInputs.length} input fields`)

            try {
                // Try to type in the first text input
                await searchInputs[0].type('granite')
                console.log('✅ Typed search term in first input')

                await new Promise(resolve => setTimeout(resolve, 2000))

                // Click search button
                await page.click('button:contains("Search")')
                console.log('✅ Clicked search button')

                await new Promise(resolve => setTimeout(resolve, 5000))

                // Take screenshot of results
                await page.screenshot({ path: 'arizona-roc-search-results.png' })
                console.log('📸 Results screenshot saved: arizona-roc-search-results.png')

            } catch (error) {
                console.log('❌ Error during search:', error.message)
            }
        }

        // Keep browser open for manual inspection
        console.log('🔍 Browser will stay open for 30 seconds for manual inspection...')
        await new Promise(resolve => setTimeout(resolve, 30000))

    } catch (error) {
        console.error('❌ Error in advanced test:', error)
    } finally {
        await browser.close()
    }
}

// Run the advanced test
testArizonaROCAdvanced().catch(console.error)
