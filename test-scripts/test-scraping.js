import puppeteer from 'puppeteer'

// Simple test to verify scraping infrastructure is working
async function testScraping() {
    console.log('🔍 Testing scraping infrastructure...')

    const browser = await puppeteer.launch({
        headless: false, // Set to false to see the browser
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    })

    try {
        const page = await browser.newPage()

        // Test basic navigation
        console.log('📄 Testing basic navigation...')
        await page.goto('https://httpbin.org/json', { waitUntil: 'networkidle2' })

        const content = await page.content()
        console.log('✅ Navigation successful!')
        console.log('📊 Page content length:', content.length)

        // Test a real manufacturer site with a simple check
        console.log('🏢 Testing Caesarstone website...')
        await page.goto('https://www.caesarstone.com', {
            waitUntil: 'networkidle2',
            timeout: 10000
        })

        const title = await page.title()
        console.log('✅ Caesarstone loaded! Title:', title)

        // Look for any dealer/contractor links
        const dealerLinks = await page.$$eval('a', links =>
            links
                .filter(link =>
                    link.textContent?.toLowerCase().includes('dealer') ||
                    link.textContent?.toLowerCase().includes('fabricator') ||
                    link.textContent?.toLowerCase().includes('find') ||
                    link.href?.includes('dealer') ||
                    link.href?.includes('fabricator')
                )
                .map(link => ({
                    text: link.textContent?.trim(),
                    href: link.href
                }))
                .slice(0, 5)
        )

        console.log('🔗 Found potential dealer links:', dealerLinks.length)
        dealerLinks.forEach((link, i) => {
            console.log(`  ${i + 1}. "${link.text}" -> ${link.href}`)
        })

    } catch (error) {
        console.error('❌ Error during testing:', error.message)
    } finally {
        await browser.close()
    }
}

// Run the test
testScraping().then(() => {
    console.log('🎉 Test completed!')
}).catch(console.error)
