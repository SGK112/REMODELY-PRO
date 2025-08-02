import { Browser, Page } from 'puppeteer'
import { ManufacturerScraper, ScrapedContractor } from './base'

// Yellow Pages scraper for local businesses
export class YellowPagesScraper extends ManufacturerScraper {
    manufacturerName = 'Yellow Pages'
    baseUrl = 'https://www.yellowpages.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York, NY'
            const searchUrl = `${this.baseUrl}/search?search_terms=countertop+installation&geo_location_terms=${encodeURIComponent(searchLocation)}`

            console.log(`Scraping Yellow Pages for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for business listings
            await page.waitForSelector('.result, .search-results .business-card, .organic', { timeout: 10000 })

            const businessElements = await page.$$('.result, .search-results .business-card, .organic')

            for (const element of businessElements.slice(0, 15)) { // Limit results
                try {
                    const businessData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('.business-name, h3, h4, .n')
                        const addressEl = el.querySelector('.address, .adr, .street-address')
                        const phoneEl = el.querySelector('.phone, .phones, [href^="tel:"]')
                        const websiteEl = el.querySelector('.website, [href*="http"]:not([href*="yellowpages"])')

                        return {
                            name: nameEl?.textContent?.trim(),
                            address: addressEl?.textContent?.trim(),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            website: websiteEl?.getAttribute('href')
                        }
                    })

                    if (businessData.name) {
                        const addressParts = this.parseFullAddress(businessData.address || '')

                        contractors.push({
                            name: businessData.name,
                            businessName: businessData.name,
                            phone: this.parsePhoneNumber(businessData.phone || ''),
                            website: businessData.website || undefined,
                            address: addressParts.address,
                            city: addressParts.city,
                            state: addressParts.state,
                            zipCode: addressParts.zipCode,
                            specialties: ['Countertop Installation', 'Home Improvement'],
                            certifications: ['Yellow Pages Listed'],
                            manufacturers: []
                        })
                    }
                } catch (error) {
                    console.error('Error parsing Yellow Pages business:', error)
                }
            }
        } catch (error) {
            console.error('Yellow Pages scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}

// Yelp scraper for local businesses
export class YelpScraper extends ManufacturerScraper {
    manufacturerName = 'Yelp'
    baseUrl = 'https://www.yelp.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York, NY'
            const searchUrl = `${this.baseUrl}/search?find_desc=countertop+installation&find_loc=${encodeURIComponent(searchLocation)}`

            console.log(`Scraping Yelp for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for business listings
            await page.waitForSelector('[data-testid="serp-ia-card"], .business-listing, .search-result', { timeout: 10000 })

            const businessElements = await page.$$('[data-testid="serp-ia-card"], .business-listing, .search-result')

            for (const element of businessElements.slice(0, 12)) { // Limit results
                try {
                    const businessData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('[data-testid="business-name"], .business-name, h3, h4')
                        const addressEl = el.querySelector('[data-testid="business-address"], .address')
                        const phoneEl = el.querySelector('[data-testid="business-phone"], .phone, [href^="tel:"]')
                        const ratingEl = el.querySelector('[data-testid="five-star-rating"], .rating, .stars')

                        return {
                            name: nameEl?.textContent?.trim(),
                            address: addressEl?.textContent?.trim(),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            rating: ratingEl?.textContent?.trim()
                        }
                    })

                    if (businessData.name) {
                        const addressParts = this.parseFullAddress(businessData.address || '')

                        contractors.push({
                            name: businessData.name,
                            businessName: businessData.name,
                            phone: this.parsePhoneNumber(businessData.phone || ''),
                            address: addressParts.address,
                            city: addressParts.city,
                            state: addressParts.state,
                            zipCode: addressParts.zipCode,
                            specialties: ['Countertop Installation', 'Kitchen Remodeling'],
                            certifications: ['Yelp Business'],
                            manufacturers: []
                        })
                    }
                } catch (error) {
                    console.error('Error parsing Yelp business:', error)
                }
            }
        } catch (error) {
            console.error('Yelp scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}

// Local contractor association websites scraper
export class LocalAssociationScraper extends ManufacturerScraper {
    manufacturerName = 'Local Associations'
    baseUrl = ''

    private associationUrls = [
        'https://www.contractorsassociation.org/find-contractor',
        'https://www.builderslicense.com/contractor-directory',
        'https://www.remodelers.org/find-remodeler',
        'https://www.phccweb.org/find-contractor'
    ]

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        for (const url of this.associationUrls) {
            try {
                console.log(`Scraping association: ${url}`)
                await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 })

                // Generic selectors for contractor listings
                const contractorElements = await page.$$([
                    '.contractor-listing',
                    '.member-listing',
                    '.business-card',
                    '.professional-card',
                    '.directory-entry'
                ].join(', '))

                for (const element of contractorElements.slice(0, 8)) { // Limit per site
                    try {
                        const contractorData = await element.evaluate((el) => {
                            const nameEl = el.querySelector('.name, .business-name, .contractor-name, h3, h4')
                            const addressEl = el.querySelector('.address, .location')
                            const phoneEl = el.querySelector('.phone, [href^="tel:"]')
                            const websiteEl = el.querySelector('a[href*="http"]:not([href*="association"])')

                            return {
                                name: nameEl?.textContent?.trim(),
                                address: addressEl?.textContent?.trim(),
                                phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                                website: websiteEl?.getAttribute('href')
                            }
                        })

                        if (contractorData.name) {
                            const addressParts = this.parseFullAddress(contractorData.address || '')

                            contractors.push({
                                name: contractorData.name,
                                businessName: contractorData.name,
                                phone: this.parsePhoneNumber(contractorData.phone || ''),
                                website: contractorData.website || undefined,
                                address: addressParts.address,
                                city: addressParts.city,
                                state: addressParts.state,
                                zipCode: addressParts.zipCode,
                                specialties: ['General Contracting', 'Home Remodeling', 'Countertop Installation'],
                                certifications: ['Association Member'],
                                manufacturers: []
                            })
                        }
                    } catch (error) {
                        console.error('Error parsing association contractor:', error)
                    }
                }

                // Rate limiting between sites
                await this.delay(3000)
            } catch (error) {
                console.error(`Error scraping association ${url}:`, error)
            }
        }

        await page.close()
        return contractors
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

// Facebook Business Pages scraper
export class FacebookBusinessScraper extends ManufacturerScraper {
    manufacturerName = 'Facebook Business'
    baseUrl = 'https://www.facebook.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York'
            const searchUrl = `${this.baseUrl}/search/pages/?q=countertop%20installation%20${encodeURIComponent(searchLocation)}`

            console.log(`Scraping Facebook Business for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for page results
            await page.waitForSelector('[data-pagelet="SearchResults"] a, .search-result', { timeout: 10000 })

            const businessElements = await page.$$('[data-pagelet="SearchResults"] a[href*="/"], .search-result a')

            for (const element of businessElements.slice(0, 10)) { // Limit results
                try {
                    const businessData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('span[dir="auto"], .business-name, strong')
                        const href = el.getAttribute('href')

                        return {
                            name: nameEl?.textContent?.trim(),
                            href: href
                        }
                    })

                    if (businessData.name && businessData.href?.includes('/')) {
                        // Visit the business page to get more details
                        const businessPage = await browser.newPage()
                        try {
                            await businessPage.goto(`${this.baseUrl}${businessData.href}`, {
                                waitUntil: 'networkidle2',
                                timeout: 10000
                            })

                            const details = await businessPage.evaluate(() => {
                                const phoneEl = document.querySelector('[href^="tel:"], .phone')
                                const addressEl = document.querySelector('.address, [data-overlaytrigger="address"]')
                                const websiteEl = document.querySelector('a[href*="http"]:not([href*="facebook"])')

                                return {
                                    phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                                    address: addressEl?.textContent?.trim(),
                                    website: websiteEl?.getAttribute('href')
                                }
                            })

                            const addressParts = this.parseFullAddress(details.address || '')

                            contractors.push({
                                name: businessData.name,
                                businessName: businessData.name,
                                phone: this.parsePhoneNumber(details.phone || ''),
                                website: details.website || undefined,
                                address: addressParts.address,
                                city: addressParts.city,
                                state: addressParts.state,
                                zipCode: addressParts.zipCode,
                                specialties: ['Countertop Installation', 'Kitchen Remodeling'],
                                certifications: ['Facebook Business Page'],
                                manufacturers: []
                            })
                        } catch (error) {
                            console.error('Error scraping Facebook business page:', error)
                        } finally {
                            await businessPage.close()
                        }
                    }
                } catch (error) {
                    console.error('Error parsing Facebook business:', error)
                }
            }
        } catch (error) {
            console.error('Facebook Business scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}
