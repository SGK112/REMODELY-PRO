import { Browser, Page } from 'puppeteer'
import { ManufacturerScraper, ScrapedContractor } from './base'

// National Kitchen & Bath Association (NKBA) member directory
export class NKBAScraper extends ManufacturerScraper {
    manufacturerName = 'NKBA'
    baseUrl = 'https://www.nkba.org'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York, NY'
            const searchUrl = `${this.baseUrl}/find-a-professional`

            console.log(`Scraping NKBA for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Look for search form and fill it
            const locationInput = await page.$('input[name*="location"], input[placeholder*="location"], #location')
            if (locationInput) {
                await locationInput.type(searchLocation)
                await page.keyboard.press('Enter')
                await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 })
            }

            // Wait for professional listings
            await page.waitForSelector('.professional-card, .member-card, .directory-listing', { timeout: 10000 })

            const professionalElements = await page.$$('.professional-card, .member-card, .directory-listing')

            for (const element of professionalElements) {
                try {
                    const professionalData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('.name, .professional-name, h3, h4')
                        const businessEl = el.querySelector('.business-name, .company-name')
                        const addressEl = el.querySelector('.address, .location')
                        const phoneEl = el.querySelector('.phone, [href^="tel:"]')
                        const websiteEl = el.querySelector('a[href*="http"], .website')
                        const specialtiesEl = el.querySelector('.specialties, .services')

                        return {
                            name: nameEl?.textContent?.trim(),
                            businessName: businessEl?.textContent?.trim(),
                            address: addressEl?.textContent?.trim(),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            website: websiteEl?.getAttribute('href'),
                            specialties: specialtiesEl?.textContent?.trim()
                        }
                    })

                    if (professionalData.name || professionalData.businessName) {
                        const addressParts = this.parseFullAddress(professionalData.address || '')

                        contractors.push({
                            name: professionalData.name || professionalData.businessName || '',
                            businessName: professionalData.businessName || professionalData.name || '',
                            phone: this.parsePhoneNumber(professionalData.phone || ''),
                            website: professionalData.website || undefined,
                            address: addressParts.address,
                            city: addressParts.city,
                            state: addressParts.state,
                            zipCode: addressParts.zipCode,
                            specialties: ['Kitchen Design', 'Bath Design', 'Countertop Installation'],
                            certifications: ['NKBA Professional Member'],
                            manufacturers: []
                        })
                    }
                } catch (error) {
                    console.error('Error parsing NKBA professional:', error)
                }
            }
        } catch (error) {
            console.error('NKBA scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}

// Marble Institute of America member directory
export class MarbleInstituteScraper extends ManufacturerScraper {
    manufacturerName = 'Marble Institute of America'
    baseUrl = 'https://www.marble-institute.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York, NY'
            const searchUrl = `${this.baseUrl}/find-a-member`

            console.log(`Scraping Marble Institute for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for member listings
            await page.waitForSelector('.member-listing, .company-card, .directory-entry', { timeout: 10000 })

            const memberElements = await page.$$('.member-listing, .company-card, .directory-entry')

            for (const element of memberElements) {
                try {
                    const memberData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('.company-name, .business-name, h3, h4')
                        const addressEl = el.querySelector('.address, .location, .contact-info')
                        const phoneEl = el.querySelector('.phone, [href^="tel:"]')
                        const websiteEl = el.querySelector('a[href*="http"], .website')
                        const servicesEl = el.querySelector('.services, .specialties, .capabilities')

                        return {
                            businessName: nameEl?.textContent?.trim(),
                            address: addressEl?.textContent?.trim(),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            website: websiteEl?.getAttribute('href'),
                            services: servicesEl?.textContent?.trim()
                        }
                    })

                    if (memberData.businessName) {
                        const addressParts = this.parseFullAddress(memberData.address || '')

                        contractors.push({
                            name: memberData.businessName,
                            businessName: memberData.businessName,
                            phone: this.parsePhoneNumber(memberData.phone || ''),
                            website: memberData.website || undefined,
                            address: addressParts.address,
                            city: addressParts.city,
                            state: addressParts.state,
                            zipCode: addressParts.zipCode,
                            specialties: ['Natural Stone Installation', 'Marble Fabrication', 'Countertop Installation'],
                            certifications: ['Marble Institute Member'],
                            manufacturers: []
                        })
                    }
                } catch (error) {
                    console.error('Error parsing Marble Institute member:', error)
                }
            }
        } catch (error) {
            console.error('Marble Institute scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}

// Natural Stone Institute member directory
export class NaturalStoneInstituteScraper extends ManufacturerScraper {
    manufacturerName = 'Natural Stone Institute'
    baseUrl = 'https://www.naturalstoneinstitute.org'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchUrl = `${this.baseUrl}/members/member-search`

            console.log(`Scraping Natural Stone Institute member directory`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for member search results
            await page.waitForSelector('.member-result, .company-listing, .member-card', { timeout: 10000 })

            const memberElements = await page.$$('.member-result, .company-listing, .member-card')

            for (const element of memberElements) {
                try {
                    const memberData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('.company-name, .member-name, h3, h4')
                        const addressEl = el.querySelector('.address, .location')
                        const phoneEl = el.querySelector('.phone, [href^="tel:"]')
                        const websiteEl = el.querySelector('a[href*="http"], .website')
                        const categoryEl = el.querySelector('.category, .member-type, .classification')

                        return {
                            businessName: nameEl?.textContent?.trim(),
                            address: addressEl?.textContent?.trim(),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            website: websiteEl?.getAttribute('href'),
                            category: categoryEl?.textContent?.trim()
                        }
                    })

                    if (memberData.businessName) {
                        const addressParts = this.parseFullAddress(memberData.address || '')

                        // Filter for fabricators and installers
                        const category = memberData.category?.toLowerCase() || ''
                        if (category.includes('fabricator') || category.includes('installer') || category.includes('contractor')) {
                            contractors.push({
                                name: memberData.businessName,
                                businessName: memberData.businessName,
                                phone: this.parsePhoneNumber(memberData.phone || ''),
                                website: memberData.website || undefined,
                                address: addressParts.address,
                                city: addressParts.city,
                                state: addressParts.state,
                                zipCode: addressParts.zipCode,
                                specialties: ['Natural Stone Fabrication', 'Stone Installation', 'Countertop Services'],
                                certifications: ['Natural Stone Institute Member'],
                                manufacturers: []
                            })
                        }
                    }
                } catch (error) {
                    console.error('Error parsing Natural Stone Institute member:', error)
                }
            }
        } catch (error) {
            console.error('Natural Stone Institute scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}

// BuildZoom contractor directory
export class BuildZoomScraper extends ManufacturerScraper {
    manufacturerName = 'BuildZoom'
    baseUrl = 'https://www.buildzoom.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York, NY'
            const searchUrl = `${this.baseUrl}/contractors/${searchLocation.toLowerCase().replace(/\s+/g, '-').replace(',', '')}/countertop-installation`

            console.log(`Scraping BuildZoom for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for contractor listings
            await page.waitForSelector('.contractor-card, .business-listing, .search-result', { timeout: 10000 })

            const contractorElements = await page.$$('.contractor-card, .business-listing, .search-result')

            for (const element of contractorElements) {
                try {
                    const contractorData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('.business-name, .contractor-name, h3')
                        const addressEl = el.querySelector('.address, .location')
                        const phoneEl = el.querySelector('.phone, [href^="tel:"]')
                        const licenseEl = el.querySelector('.license, .license-number')
                        const ratingEl = el.querySelector('.rating, .score')

                        return {
                            name: nameEl?.textContent?.trim(),
                            address: addressEl?.textContent?.trim(),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            license: licenseEl?.textContent?.trim(),
                            rating: ratingEl?.textContent?.trim()
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
                            licenseNumber: contractorData.license,
                            specialties: ['Countertop Installation', 'Kitchen Remodeling'],
                            certifications: ['BuildZoom Verified'],
                            manufacturers: []
                        })
                    }
                } catch (error) {
                    console.error('Error parsing BuildZoom contractor:', error)
                }
            }
        } catch (error) {
            console.error('BuildZoom scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}

// Porch contractor directory  
export class PorchScraper extends ManufacturerScraper {
    manufacturerName = 'Porch'
    baseUrl = 'https://porch.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'New York, NY'
            const searchUrl = `${this.baseUrl}/countertop-installation/${searchLocation.toLowerCase().replace(/\s+/g, '-').replace(',', '')}`

            console.log(`Scraping Porch for location: ${searchLocation}`)
            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for professional listings
            await page.waitForSelector('.professional-card, .contractor-listing, .pro-card', { timeout: 10000 })

            const professionalElements = await page.$$('.professional-card, .contractor-listing, .pro-card')

            for (const element of professionalElements) {
                try {
                    const professionalData = await element.evaluate((el) => {
                        const nameEl = el.querySelector('.professional-name, .business-name, h3')
                        const locationEl = el.querySelector('.location, .service-area')
                        const phoneEl = el.querySelector('.phone, [href^="tel:"]')
                        const ratingEl = el.querySelector('.rating, .stars')
                        const reviewsEl = el.querySelector('.reviews, .review-count')

                        return {
                            name: nameEl?.textContent?.trim(),
                            location: locationEl?.textContent?.trim(),
                            phone: phoneEl?.textContent?.trim() || phoneEl?.getAttribute('href')?.replace('tel:', ''),
                            rating: ratingEl?.textContent?.trim(),
                            reviews: reviewsEl?.textContent?.trim()
                        }
                    })

                    if (professionalData.name) {
                        const addressParts = this.parseFullAddress(professionalData.location || '')

                        contractors.push({
                            name: professionalData.name,
                            businessName: professionalData.name,
                            phone: this.parsePhoneNumber(professionalData.phone || ''),
                            address: addressParts.address,
                            city: addressParts.city,
                            state: addressParts.state,
                            zipCode: addressParts.zipCode,
                            specialties: ['Countertop Installation', 'Home Improvement'],
                            certifications: ['Porch Verified Pro'],
                            manufacturers: []
                        })
                    }
                } catch (error) {
                    console.error('Error parsing Porch professional:', error)
                }
            }
        } catch (error) {
            console.error('Porch scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}
