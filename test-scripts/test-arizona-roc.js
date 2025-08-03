const puppeteer = require('puppeteer')

// Test script for Arizona ROC with real credentials
async function testArizonaROC() {
    console.log('🏛️ Testing Arizona ROC scraper with real credentials...')

    const browser = await puppeteer.launch({
        headless: true, // Set to false if you want to see what's happening
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    })

    const page = await browser.newPage()

    try {
        // Navigate to Arizona ROC login page
        console.log('🔍 Navigating to Arizona ROC site...')
        await page.goto('https://azroc.my.site.com', { waitUntil: 'networkidle2' })

        // Take a screenshot to see the initial page
        await page.screenshot({ path: 'arizona-roc-initial.png' })
        console.log('📸 Screenshot saved: arizona-roc-initial.png')

        // Look for login elements
        const loginSelectors = [
            'button:contains("Log In")',
            'a:contains("Login")',
            '.login-button',
            '#login',
            '[data-testid="login"]'
        ]

        let loginFound = false
        for (const selector of loginSelectors) {
            try {
                await page.waitForSelector(selector, { timeout: 2000 })
                console.log(`✅ Found login element: ${selector}`)
                loginFound = true
                break
            } catch (e) {
                console.log(`❌ Login selector not found: ${selector}`)
            }
        }

        if (!loginFound) {
            console.log('🔍 Looking for any elements containing "login" text...')
            const loginElements = await page.evaluate(() => {
                const elements = Array.from(document.querySelectorAll('*'))
                return elements
                    .filter(el => el.textContent && el.textContent.toLowerCase().includes('login'))
                    .map(el => ({
                        tag: el.tagName,
                        text: el.textContent.trim().substring(0, 50),
                        className: el.className,
                        id: el.id
                    }))
                    .slice(0, 10)
            })

            console.log('Login-related elements found:', loginElements)
        }

        // Navigate directly to contractor search
        console.log('🔍 Navigating to contractor search page...')
        await page.goto('https://azroc.my.site.com/AZRoc/s/contractor-search', { waitUntil: 'networkidle2' })

        // Take screenshot of search page
        await page.screenshot({ path: 'arizona-roc-search.png' })
        console.log('📸 Screenshot saved: arizona-roc-search.png')

        // Look for search form elements
        console.log('🔍 Analyzing search page structure...')
        const pageInfo = await page.evaluate(() => {
            return {
                title: document.title,
                url: window.location.href,
                forms: Array.from(document.forms).map(form => ({
                    action: form.action,
                    method: form.method,
                    elements: form.elements.length
                })),
                inputs: Array.from(document.querySelectorAll('input')).map(input => ({
                    type: input.type,
                    name: input.name,
                    id: input.id,
                    placeholder: input.placeholder
                })),
                selects: Array.from(document.querySelectorAll('select')).map(select => ({
                    name: select.name,
                    id: select.id,
                    options: select.options.length
                })),
                buttons: Array.from(document.querySelectorAll('button')).map(button => ({
                    text: button.textContent?.trim(),
                    type: button.type,
                    id: button.id,
                    className: button.className
                }))
            }
        })

        console.log('📋 Page Analysis:')
        console.log('Title:', pageInfo.title)
        console.log('URL:', pageInfo.url)
        console.log('Forms:', pageInfo.forms)
        console.log('Input fields:', pageInfo.inputs)
        console.log('Select dropdowns:', pageInfo.selects)
        console.log('Buttons:', pageInfo.buttons)

        // Check if we need authentication
        const needsAuth = await page.evaluate(() => {
            return document.body.textContent?.includes('login') ||
                document.body.textContent?.includes('sign in') ||
                document.body.textContent?.includes('authenticate')
        })

        if (needsAuth) {
            console.log('🔐 Page appears to require authentication')
        } else {
            console.log('✅ Page appears to be accessible without authentication')
        }

    } catch (error) {
        console.error('❌ Error testing Arizona ROC:', error)
    } finally {
        await browser.close()
    }
}

// Run the test
testArizonaROC().catch(console.error)
