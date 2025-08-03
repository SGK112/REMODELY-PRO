const puppeteer = require('puppeteer')

// Test script for Arizona CLC to analyze reCAPTCHA
async function testArizonaCLC() {
    console.log('🏗️ Testing Arizona CLC (https://www.azclc.com/profiles)...')

    const browser = await puppeteer.launch({
        headless: false, // Show browser to see reCAPTCHA
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        defaultViewport: { width: 1200, height: 800 }
    })

    const page = await browser.newPage()

    try {
        console.log('🔍 Navigating to Arizona CLC profiles...')
        await page.goto('https://www.azclc.com/profiles', { waitUntil: 'networkidle2' })

        // Take initial screenshot
        await page.screenshot({ path: 'arizona-clc-initial.png' })
        console.log('📸 Screenshot saved: arizona-clc-initial.png')

        // Check for reCAPTCHA
        const recaptchaElements = await page.evaluate(() => {
            const recaptchas = Array.from(document.querySelectorAll('*')).filter(el =>
                el.className.includes('recaptcha') ||
                el.id.includes('recaptcha') ||
                el.getAttribute('data-sitekey') ||
                el.innerHTML.includes('recaptcha')
            )

            return recaptchas.map(el => ({
                tag: el.tagName,
                className: el.className,
                id: el.id,
                innerHTML: el.innerHTML.substring(0, 200)
            }))
        })

        if (recaptchaElements.length > 0) {
            console.log('🤖 reCAPTCHA elements found:')
            console.log(recaptchaElements)
        } else {
            console.log('✅ No reCAPTCHA elements detected on initial page')
        }

        // Analyze page structure
        const pageInfo = await page.evaluate(() => {
            return {
                title: document.title,
                url: window.location.href,
                hasSearchForm: !!document.querySelector('form'),
                searchInputs: Array.from(document.querySelectorAll('input[type="search"], input[name*="search"], input[placeholder*="search"]')).map(input => ({
                    name: input.name,
                    id: input.id,
                    placeholder: input.placeholder,
                    type: input.type
                })),
                allInputs: Array.from(document.querySelectorAll('input')).map(input => ({
                    name: input.name,
                    id: input.id,
                    placeholder: input.placeholder,
                    type: input.type,
                    className: input.className
                })),
                buttons: Array.from(document.querySelectorAll('button')).map(button => ({
                    text: button.textContent?.trim(),
                    type: button.type,
                    className: button.className
                })),
                links: Array.from(document.querySelectorAll('a[href*="profile"], a[href*="contractor"], a[href*="search"]')).map(link => ({
                    text: link.textContent?.trim(),
                    href: link.href
                })).slice(0, 10)
            }
        })

        console.log('📋 Arizona CLC Page Analysis:')
        console.log('Title:', pageInfo.title)
        console.log('URL:', pageInfo.url)
        console.log('Has Search Form:', pageInfo.hasSearchForm)
        console.log('Search Inputs:', pageInfo.searchInputs)
        console.log('All Inputs:', pageInfo.allInputs)
        console.log('Buttons:', pageInfo.buttons)
        console.log('Relevant Links:', pageInfo.links)

        // Try to find and use search functionality
        if (pageInfo.searchInputs.length > 0 || pageInfo.allInputs.length > 0) {
            console.log('🔍 Attempting to use search functionality...')

            // Try to find a search input
            const searchInput = await page.$('input[type="search"], input[name*="search"], input[placeholder*="search"], input[type="text"]')

            if (searchInput) {
                console.log('✅ Found search input, typing test search...')
                await searchInput.type('countertop')

                await new Promise(resolve => setTimeout(resolve, 2000))

                // Look for search button or submit
                const searchButton = await page.$('button[type="submit"], button:contains("Search"), input[type="submit"]')

                if (searchButton) {
                    console.log('🔍 Clicking search button...')
                    await searchButton.click()

                    await new Promise(resolve => setTimeout(resolve, 3000))

                    // Check if reCAPTCHA appeared after search
                    const postSearchRecaptcha = await page.$('.g-recaptcha, #recaptcha, [data-sitekey]')

                    if (postSearchRecaptcha) {
                        console.log('🤖 reCAPTCHA appeared after search attempt')
                        await page.screenshot({ path: 'arizona-clc-recaptcha.png' })
                        console.log('📸 reCAPTCHA screenshot saved: arizona-clc-recaptcha.png')
                    } else {
                        console.log('✅ No reCAPTCHA after search - taking results screenshot')
                        await page.screenshot({ path: 'arizona-clc-results.png' })
                        console.log('📸 Results screenshot saved: arizona-clc-results.png')
                    }
                }
            }
        }

        // Keep browser open for inspection
        console.log('🔍 Browser will stay open for 20 seconds for manual inspection...')
        await new Promise(resolve => setTimeout(resolve, 20000))

    } catch (error) {
        console.error('❌ Error testing Arizona CLC:', error)
    } finally {
        await browser.close()
    }
}

// Run the test
testArizonaCLC().catch(console.error)
