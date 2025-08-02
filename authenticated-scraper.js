// Authenticated scraping using real contractor accounts
const puppeteer = require('puppeteer')

class AuthenticatedScraper {
    constructor() {
        this.credentials = {
            angi: {
                email: 'your-angi-email@example.com',
                password: 'your-angi-password'
            },
            homeadvisor: {
                email: 'your-homeadvisor-email@example.com',
                password: 'your-homeadvisor-password'
            },
            thumbtack: {
                email: 'your-thumbtack-email@example.com',
                password: 'your-thumbtack-password'
            },
            houzz: {
                email: 'your-houzz-email@example.com',
                password: 'your-houzz-password'
            }
            // Add more platforms as needed
        }
    }

    async loginToAngi(page) {
        try {
            console.log('🔐 Logging into Angi...')
            await page.goto('https://www.angi.com/login', { waitUntil: 'networkidle2' })

            // Wait for login form
            await page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 10000 })

            // Enter credentials
            await page.type('input[type="email"], input[name="email"]', this.credentials.angi.email)
            await page.type('input[type="password"], input[name="password"]', this.credentials.angi.password)

            // Click login button
            await page.click('button[type="submit"], .login-button, [data-testid="login-submit"]')

            // Wait for successful login
            await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 })

            console.log('✅ Successfully logged into Angi')
            return true
        } catch (error) {
            console.error('❌ Angi login failed:', error.message)
            return false
        }
    }

    async loginToHomeAdvisor(page) {
        try {
            console.log('🔐 Logging into HomeAdvisor...')
            await page.goto('https://www.homeadvisor.com/account/login', { waitUntil: 'networkidle2' })

            await page.waitForSelector('input[name="email"], #email', { timeout: 10000 })

            await page.type('input[name="email"], #email', this.credentials.homeadvisor.email)
            await page.type('input[name="password"], #password', this.credentials.homeadvisor.password)

            await page.click('button[type="submit"], .btn-login')
            await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 })

            console.log('✅ Successfully logged into HomeAdvisor')
            return true
        } catch (error) {
            console.error('❌ HomeAdvisor login failed:', error.message)
            return false
        }
    }

    async loginToThumbtack(page) {
        try {
            console.log('🔐 Logging into Thumbtack...')
            await page.goto('https://www.thumbtack.com/login', { waitUntil: 'networkidle2' })

            await page.waitForSelector('input[type="email"]', { timeout: 10000 })

            await page.type('input[type="email"]', this.credentials.thumbtack.email)
            await page.type('input[type="password"]', this.credentials.thumbtack.password)

            await page.click('button[type="submit"]')
            await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 })

            console.log('✅ Successfully logged into Thumbtack')
            return true
        } catch (error) {
            console.error('❌ Thumbtack login failed:', error.message)
            return false
        }
    }

    async scrapeAuthenticatedData(platform, location) {
        const browser = await puppeteer.launch({
            headless: false, // Show browser for debugging
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        })

        try {
            const page = await browser.newPage()
            let loginSuccess = false

            // Login based on platform
            switch (platform.toLowerCase()) {
                case 'angi':
                    loginSuccess = await this.loginToAngi(page)
                    break
                case 'homeadvisor':
                    loginSuccess = await this.loginToHomeAdvisor(page)
                    break
                case 'thumbtack':
                    loginSuccess = await this.loginToThumbtack(page)
                    break
                default:
                    console.error('❌ Unknown platform:', platform)
                    return []
            }

            if (!loginSuccess) {
                console.error('❌ Authentication failed for', platform)
                return []
            }

            // Now scrape authenticated content
            const contractors = await this.scrapeContractorsAfterLogin(page, platform, location)

            return contractors
        } catch (error) {
            console.error('❌ Authenticated scraping error:', error)
            return []
        } finally {
            await browser.close()
        }
    }

    async scrapeContractorsAfterLogin(page, platform, location) {
        const contractors = []

        try {
            // Navigate to search or directory page
            const searchUrls = {
                angi: `https://www.angi.com/companylist/us/${location.toLowerCase().replace(/\s+/g, '-')}/countertop-installation.htm`,
                homeadvisor: `https://www.homeadvisor.com/c.Countertops.${location}.html`,
                thumbtack: `https://www.thumbtack.com/k/countertop-installation/near-me/${location.toLowerCase().replace(/\s+/g, '-')}`
            }

            if (searchUrls[platform]) {
                await page.goto(searchUrls[platform], { waitUntil: 'networkidle2' })

                // Wait for contractor listings
                await page.waitForSelector('.contractor-card, .provider-card, .pro-card, .business-card', { timeout: 10000 })

                // Extract contractor data
                const contractorElements = await page.$$('.contractor-card, .provider-card, .pro-card, .business-card')

                for (const element of contractorElements.slice(0, 10)) {
                    try {
                        const contractorData = await element.evaluate((el) => {
                            const nameEl = el.querySelector('h3, .business-name, .contractor-name')
                            const phoneEl = el.querySelector('.phone, [href^="tel:"]')
                            const addressEl = el.querySelector('.address, .location')
                            const ratingEl = el.querySelector('.rating, .stars')

                            return {
                                name: nameEl?.textContent?.trim(),
                                phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                                address: addressEl?.textContent?.trim(),
                                rating: ratingEl?.textContent?.trim()
                            }
                        })

                        if (contractorData.name) {
                            contractors.push({
                                ...contractorData,
                                source: platform,
                                specialties: ['Countertop Installation'],
                                certifications: [`${platform} Professional`]
                            })
                        }
                    } catch (error) {
                        console.error('Error parsing contractor:', error)
                    }
                }
            }
        } catch (error) {
            console.error('Error scraping after login:', error)
        }

        return contractors
    }
}

// Test function
async function testAuthenticatedScraping() {
    console.log('🧪 Testing Authenticated Scraping')
    console.log('=================================\n')

    const scraper = new AuthenticatedScraper()

    // Test different platforms
    const platforms = ['angi', 'homeadvisor', 'thumbtack']
    const location = 'Denver, CO'

    for (const platform of platforms) {
        console.log(`\n🔍 Testing ${platform} with location: ${location}`)
        const results = await scraper.scrapeAuthenticatedData(platform, location)

        console.log(`📊 Found ${results.length} contractors from ${platform}`)

        if (results.length > 0) {
            console.log('📋 Sample contractors:')
            results.slice(0, 3).forEach((contractor, index) => {
                console.log(`   ${index + 1}. ${contractor.name}`)
                console.log(`      Phone: ${contractor.phone || 'N/A'}`)
                console.log(`      Address: ${contractor.address || 'N/A'}`)
            })
        }
    }
}

module.exports = { AuthenticatedScraper, testAuthenticatedScraping }

// Run test if called directly
if (require.main === module) {
    testAuthenticatedScraping()
}
