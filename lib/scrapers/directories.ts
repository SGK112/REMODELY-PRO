import { Browser, Page } from 'puppeteer'
import { ManufacturerScraper, ScrapedContractor } from './base'

// Angie's List / Angi scraper for home improvement contractors
export class AngiScraper extends ManufacturerScraper {
    manufacturerName = 'Angi'
    baseUrl = 'https://www.angi.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York, NY'
            const searchUrl = `${this.baseUrl}/companylist/us/${searchLocation.toLowerCase().replace(/\s+/g, '-')}/countertop-installation.htm`

            console.log(`Scraping Angi for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for contractor listings to load
            await page.waitForSelector('[data-testid="provider-card"], .provider-card, .contractor-card', { timeout: 10000 })

            const contractorElements = await page.$$('[data-testid="provider-card"], .provider-card, .contractor-card')

            for (const element of contractorElements) {
                try {
                    const contractorData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('h3, .company-name, [data-testid="provider-name"]')
                        const phoneEl = el.querySelector('[href^="tel:"], .phone-number')
                        const addressEl = el.querySelector('.address, .location, [data-testid="provider-address"]')
                        const ratingEl = el.querySelector('.rating, .stars, [data-testid="rating"]')
                        const reviewsEl = el.querySelector('.reviews, .review-count')

                        return {
                            name: nameEl?.textContent?.trim(),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            address: addressEl?.textContent?.trim(),
                            rating: ratingEl?.textContent?.trim(),
                            reviews: reviewsEl?.textContent?.trim()
                        }
                    })

                    if (contractorData.name) {
                        const addressParts = this.parseFullAddress(contractorData.address || '')

                        contractors.push({
                            name: contractorData.name,
                            businessName: contractorData.name,
                            phone: this.parsePhoneNumber(contractorData.phone || ''),
                            address: addressParts.address,
                            city: addressParts.city,
                            state: addressParts.state,
                            zipCode: addressParts.zipCode,
                            specialties: ['Countertop Installation', 'Kitchen Remodeling'],
                            certifications: ['Angi Certified'],
                            manufacturers: []
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

        return contractors
    }
}

// HomeAdvisor scraper
export class HomeAdvisorScraper extends ManufacturerScraper {
    manufacturerName = 'HomeAdvisor'
    baseUrl = 'https://www.homeadvisor.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || '10001' // Default to NYC zip code
            const searchUrl = `${this.baseUrl}/c.Countertops.${searchLocation}.html`

            console.log(`Scraping HomeAdvisor for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for contractor listings
            await page.waitForSelector('.provider-card, .pro-card, .contractor-listing', { timeout: 10000 })

            const contractorElements = await page.$$('.provider-card, .pro-card, .contractor-listing')

            for (const element of contractorElements) {
                try {
                    const contractorData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('.business-name, .pro-name, h3')
                        const phoneEl = el.querySelector('.phone, [href^="tel:"]')
                        const locationEl = el.querySelector('.location, .address, .service-area')
                        const servicesEl = el.querySelector('.services, .specialties')

                        return {
                            name: nameEl?.textContent?.trim(),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            location: locationEl?.textContent?.trim(),
                            services: servicesEl?.textContent?.trim()
                        }
                    })

                    if (contractorData.name) {
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
                            manufacturers: []
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

        return contractors
    }
}

// Houzz scraper for kitchen and bath professionals
export class HouzzScraper extends ManufacturerScraper {
    manufacturerName = 'Houzz'
    baseUrl = 'https://www.houzz.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York, NY'
            const searchUrl = `${this.baseUrl}/professionals/countertop-contractor/c/${searchLocation}`

            console.log(`Scraping Houzz for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for professional listings
            await page.waitForSelector('[data-testid="pro-card"], .pro-card, .professional-card', { timeout: 10000 })

            const contractorElements = await page.$$('[data-testid="pro-card"], .pro-card, .professional-card')

            for (const element of contractorElements) {
                try {
                    const contractorData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('.professional-name, .pro-name, h3')
                        const locationEl = el.querySelector('.location, .pro-location')
                        const phoneEl = el.querySelector('.phone, [href^="tel:"]')
                        const specialtiesEl = el.querySelector('.specialties, .services')

                        return {
                            name: nameEl?.textContent?.trim(),
                            location: locationEl?.textContent?.trim(),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            specialties: specialtiesEl?.textContent?.trim()
                        }
                    })

                    if (contractorData.name) {
                        const addressParts = this.parseFullAddress(contractorData.location || '')

                        contractors.push({
                            name: contractorData.name,
                            businessName: contractorData.name,
                            phone: this.parsePhoneNumber(contractorData.phone || ''),
                            address: addressParts.address,
                            city: addressParts.city,
                            state: addressParts.state,
                            zipCode: addressParts.zipCode,
                            specialties: ['Kitchen Design', 'Countertop Installation', 'Bath Remodeling'],
                            certifications: ['Houzz Professional'],
                            manufacturers: []
                        })
                    }
                } catch (error) {
                    console.error('Error parsing Houzz contractor:', error)
                }
            }
        } catch (error) {
            console.error('Houzz scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}

// Thumbtack scraper
export class ThumbtsackScraper extends ManufacturerScraper {
    manufacturerName = 'Thumbtack'
    baseUrl = 'https://www.thumbtack.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York, NY'
            const searchUrl = `${this.baseUrl}/k/countertop-installation/near-me/${searchLocation.toLowerCase().replace(/\s+/g, '-').replace(',', '')}`

            console.log(`Scraping Thumbtack for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for pro listings
            await page.waitForSelector('[data-testid="pro-card"], .pro-card, .contractor-card', { timeout: 10000 })

            const contractorElements = await page.$$('[data-testid="pro-card"], .pro-card, .contractor-card')

            for (const element of contractorElements) {
                try {
                    const contractorData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('.pro-name, .business-name, h3, h4')
                        const locationEl = el.querySelector('.location, .pro-location, .service-area')
                        const ratingEl = el.querySelector('.rating, .stars')
                        const reviewsEl = el.querySelector('.reviews, .review-count')

                        return {
                            name: nameEl?.textContent?.trim(),
                            location: locationEl?.textContent?.trim(),
                            rating: ratingEl?.textContent?.trim(),
                            reviews: reviewsEl?.textContent?.trim()
                        }
                    })

                    if (contractorData.name) {
                        const addressParts = this.parseFullAddress(contractorData.location || '')

                        contractors.push({
                            name: contractorData.name,
                            businessName: contractorData.name,
                            address: addressParts.address,
                            city: addressParts.city,
                            state: addressParts.state,
                            zipCode: addressParts.zipCode,
                            specialties: ['Countertop Installation', 'Kitchen Renovation'],
                            certifications: ['Thumbtack Top Pro'],
                            manufacturers: []
                        })
                    }
                } catch (error) {
                    console.error('Error parsing Thumbtack contractor:', error)
                }
            }
        } catch (error) {
            console.error('Thumbtack scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}

// Google Business / Maps scraper
export class GoogleBusinessScraper extends ManufacturerScraper {
    manufacturerName = 'Google Business'
    baseUrl = 'https://www.google.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York, NY'
            const searchQuery = `countertop contractors near ${searchLocation}`
            const searchUrl = `${this.baseUrl}/maps/search/${encodeURIComponent(searchQuery)}`

            console.log(`Scraping Google Business for: ${searchQuery}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for business listings
            await page.waitForSelector('[data-result-index], .section-result, .gm2-body-2', { timeout: 10000 })

            const businessElements = await page.$$('[data-result-index], .section-result')

            for (const element of businessElements.slice(0, 10)) { // Limit to first 10 results
                try {
                    const businessData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('.section-result-title, .qBF1Pd')
                        const addressEl = el.querySelector('.section-result-location, .W4Efsd:last-child')
                        const ratingEl = el.querySelector('.section-result-rating, .MW4etd')
                        const phoneEl = el.querySelector('[data-value]')

                        return {
                            name: nameEl?.textContent?.trim(),
                            address: addressEl?.textContent?.trim(),
                            rating: ratingEl?.textContent?.trim(),
                            phone: phoneEl?.getAttribute('data-value')
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
                            specialties: ['Countertop Installation', 'Stone Fabrication'],
                            certifications: ['Google Business Verified'],
                            manufacturers: []
                        })
                    }
                } catch (error) {
                    console.error('Error parsing Google Business listing:', error)
                }
            }
        } catch (error) {
            console.error('Google Business scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}

// Better Business Bureau scraper
export class BBBScraper extends ManufacturerScraper {
    manufacturerName = 'Better Business Bureau'
    baseUrl = 'https://www.bbb.org'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York, NY'
            const searchUrl = `${this.baseUrl}/search?find_country=USA&find_loc=${encodeURIComponent(searchLocation)}&find_text=countertop+installation`

            console.log(`Scraping BBB for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for business listings
            await page.waitForSelector('.search-result, .business-card', { timeout: 10000 })

            const businessElements = await page.$$('.search-result, .business-card')

            for (const element of businessElements) {
                try {
                    const businessData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('.business-name, h3, h4')
                        const addressEl = el.querySelector('.address, .location')
                        const phoneEl = el.querySelector('.phone, [href^="tel:"]')
                        const ratingEl = el.querySelector('.rating, .grade')

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
                            specialties: ['Countertop Installation', 'Home Improvement'],
                            certifications: ['BBB Accredited Business'],
                            manufacturers: []
                        })
                    }
                } catch (error) {
                    console.error('Error parsing BBB business:', error)
                }
            }
        } catch (error) {
            console.error('BBB scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}
