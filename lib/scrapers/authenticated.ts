import { Browser, Page, ElementHandle } from 'puppeteer'
import { ManufacturerScraper, ScrapedContractor } from './base'

// Enhanced Angi scraper with authentication
export class AuthenticatedAngiScraper extends ManufacturerScraper {
    manufacturerName = 'Angi (Authenticated)'
    baseUrl = 'https://www.angi.com'

    private credentials = {
        email: process.env.ANGI_EMAIL || '',
        password: process.env.ANGI_PASSWORD || ''
    }

    async login(page: Page): Promise<boolean> {
        try {
            console.log('🔐 Logging into Angi...')
            await page.goto(`${this.baseUrl}/login`, { waitUntil: 'networkidle2' })

            // Handle possible cookie banner
            try {
                await page.waitForSelector('[data-testid="cookie-accept"], .cookie-accept', { timeout: 3000 })
                await page.click('[data-testid="cookie-accept"], .cookie-accept')
            } catch { }

            // Wait for and fill login form
            await page.waitForSelector('input[type="email"], input[name="email"]', { timeout: 10000 })
            await page.type('input[type="email"], input[name="email"]', this.credentials.email)
            await page.type('input[type="password"], input[name="password"]', this.credentials.password)

            // Submit login
            await page.click('button[type="submit"], .login-button')

            // Wait for successful login (look for profile/dashboard elements)
            try {
                await page.waitForSelector('.user-menu, .profile-dropdown, [data-testid="user-profile"]', { timeout: 15000 })
                console.log('✅ Successfully logged into Angi')
                return true
            } catch {
                console.log('❌ Angi login may have failed - continuing anyway')
                return false
            }
        } catch (error) {
            console.error('❌ Angi login error:', error)
            return false
        }
    }

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            // Set realistic browser headers
            await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

            // Login first
            const loginSuccess = await this.login(page)

            const searchLocation = location || 'New York, NY'
            console.log(`Scraping Angi for location: ${searchLocation}`)

            // Navigate to contractor search
            const searchUrl = `${this.baseUrl}/companylist/us/${searchLocation.toLowerCase().replace(/[,\s]+/g, '-')}/countertop-installation.htm`
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Try multiple selector patterns for contractor listings
            const possibleSelectors = [
                '[data-testid="provider-card"]',
                '.provider-card',
                '.contractor-card',
                '.business-card',
                '.company-card',
                '.pro-card'
            ]

            let contractorElements: ElementHandle[] = []
            for (const selector of possibleSelectors) {
                contractorElements = await page.$$(selector)
                if (contractorElements.length > 0) {
                    console.log(`✅ Found ${contractorElements.length} contractors using selector: ${selector}`)
                    break
                }
            }

            if (contractorElements.length === 0) {
                // Fallback: look for any links that might be contractor profiles
                contractorElements = await page.$$('a[href*="/companylist/"], a[href*="/profile/"]')
                console.log(`📋 Fallback: Found ${contractorElements.length} potential contractor links`)
            }

            for (const element of contractorElements.slice(0, 15)) {
                try {
                    const contractorData = await element.evaluate((el: Element) => {
                        // Try multiple patterns for extracting data
                        const nameEl = el.querySelector('h3, h4, .company-name, .business-name, [data-testid="provider-name"]') ||
                            el.querySelector('a[href*="/companylist/"], a[href*="/profile/"]')

                        const phoneEl = el.querySelector('[href^="tel:"], .phone-number, [data-testid="phone"]')
                        const addressEl = el.querySelector('.address, .location, [data-testid="address"]')
                        const ratingEl = el.querySelector('.rating, .stars, [data-testid="rating"]')
                        const reviewsEl = el.querySelector('.reviews, .review-count, [data-testid="reviews"]')

                        return {
                            name: nameEl?.textContent?.trim() || nameEl?.getAttribute('title'),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            address: addressEl?.textContent?.trim(),
                            rating: ratingEl?.textContent?.trim(),
                            reviews: reviewsEl?.textContent?.trim()
                        }
                    })

                    if (contractorData.name && contractorData.name.length > 2) {
                        const addressParts = this.parseFullAddress(contractorData.address || '')

                        contractors.push({
                            name: contractorData.name,
                            businessName: contractorData.name,
                            phone: this.parsePhoneNumber(contractorData.phone || ''),
                            address: addressParts.address,
                            city: addressParts.city || searchLocation.split(',')[0].trim(),
                            state: addressParts.state || searchLocation.split(',')[1]?.trim(),
                            zipCode: addressParts.zipCode,
                            specialties: ['Countertop Installation', 'Kitchen Remodeling'],
                            certifications: ['Angi Certified Professional'],
                            manufacturers: [],
                            description: `Angi certified contractor with ${contractorData.reviews || 'multiple'} reviews`
                        })
                    }
                } catch (error) {
                    console.error('Error parsing Angi contractor:', error)
                }
            }
        } catch (error) {
            console.error('Angi scraping error:', error)
        } finally {
            await page.close()
        }

        console.log(`📊 Angi: Found ${contractors.length} contractors`)
        return contractors
    }
}

// Enhanced HomeAdvisor scraper with authentication
export class AuthenticatedHomeAdvisorScraper extends ManufacturerScraper {
    manufacturerName = 'HomeAdvisor (Authenticated)'
    baseUrl = 'https://www.homeadvisor.com'

    private credentials = {
        email: process.env.HOMEADVISOR_EMAIL || '',
        password: process.env.HOMEADVISOR_PASSWORD || ''
    }

    async login(page: Page): Promise<boolean> {
        try {
            console.log('🔐 Logging into HomeAdvisor...')
            await page.goto(`${this.baseUrl}/account/login`, { waitUntil: 'networkidle2' })

            await page.waitForSelector('input[name="email"], #email', { timeout: 10000 })
            await page.type('input[name="email"], #email', this.credentials.email)
            await page.type('input[name="password"], #password', this.credentials.password)

            await page.click('button[type="submit"], .btn-login, [data-testid="login-submit"]')

            try {
                await page.waitForSelector('.user-menu, .profile-menu, [data-testid="user-profile"]', { timeout: 15000 })
                console.log('✅ Successfully logged into HomeAdvisor')
                return true
            } catch {
                console.log('❌ HomeAdvisor login may have failed - continuing anyway')
                return false
            }
        } catch (error) {
            console.error('❌ HomeAdvisor login error:', error)
            return false
        }
    }

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

            const loginSuccess = await this.login(page)

            const searchLocation = location || '10001' // Default to NYC zip
            console.log(`Scraping HomeAdvisor for location: ${searchLocation}`)

            const searchUrl = `${this.baseUrl}/c.Countertops.${searchLocation}.html`
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Try multiple selectors for contractor listings
            const possibleSelectors = [
                '.provider-card',
                '.pro-card',
                '.contractor-listing',
                '[data-testid="provider-card"]',
                '.business-card'
            ]

            let contractorElements: ElementHandle[] = []
            for (const selector of possibleSelectors) {
                contractorElements = await page.$$(selector)
                if (contractorElements.length > 0) {
                    console.log(`✅ Found ${contractorElements.length} contractors using selector: ${selector}`)
                    break
                }
            }

            for (const element of contractorElements.slice(0, 15)) {
                try {
                    const contractorData = await element.evaluate((el: Element) => {
                        const nameEl = el.querySelector('.business-name, .pro-name, h3, h4')
                        const phoneEl = el.querySelector('.phone, [href^="tel:"]')
                        const locationEl = el.querySelector('.location, .address, .service-area')
                        const servicesEl = el.querySelector('.services, .specialties')
                        const ratingEl = el.querySelector('.rating, .stars')

                        return {
                            name: nameEl?.textContent?.trim(),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            location: locationEl?.textContent?.trim(),
                            services: servicesEl?.textContent?.trim(),
                            rating: ratingEl?.textContent?.trim()
                        }
                    })

                    if (contractorData.name && contractorData.name.length > 2) {
                        const addressParts = this.parseFullAddress(contractorData.location || '')

                        contractors.push({
                            name: contractorData.name,
                            businessName: contractorData.name,
                            phone: this.parsePhoneNumber(contractorData.phone || ''),
                            address: addressParts.address,
                            city: addressParts.city,
                            state: addressParts.state,
                            zipCode: addressParts.zipCode,
                            specialties: ['Countertop Installation', 'Home Remodeling'],
                            certifications: ['HomeAdvisor Screened & Approved'],
                            manufacturers: [],
                            description: `HomeAdvisor professional with rating: ${contractorData.rating || 'Not rated'}`
                        })
                    }
                } catch (error) {
                    console.error('Error parsing HomeAdvisor contractor:', error)
                }
            }
        } catch (error) {
            console.error('HomeAdvisor scraping error:', error)
        } finally {
            await page.close()
        }

        console.log(`📊 HomeAdvisor: Found ${contractors.length} contractors`)
        return contractors
    }
}
