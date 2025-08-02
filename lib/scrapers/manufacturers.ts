import { Browser, Page } from 'puppeteer'
import { ManufacturerScraper, ScrapedContractor } from './base'

export class CaesarstoneScraper extends ManufacturerScraper {
    manufacturerName = 'Caesarstone'
    baseUrl = 'https://www.caesarstone.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            // Navigate to dealer locator
            await page.goto(`${this.baseUrl}/find-a-dealer`, { waitUntil: 'networkidle0' })

            if (location) {
                // Search for specific location
                await page.waitForSelector('input[name="location"]', { timeout: 5000 })
                await page.type('input[name="location"]', location)
                await page.click('.search-button, [type="submit"]')
                await new Promise(resolve => setTimeout(resolve, 3000))
            }

            // Extract dealer information
            const dealerElements = await page.$$('.dealer-card, .dealer-item, .location-item')

            for (const element of dealerElements) {
                try {
                    const contractorData = await element.evaluate((el) => {
                        const name = el.querySelector('.dealer-name, .business-name, h3, h4')?.textContent?.trim()
                        const address = el.querySelector('.address, .dealer-address')?.textContent?.trim()
                        const phone = el.querySelector('.phone, .dealer-phone')?.textContent?.trim()
                        const website = el.querySelector('a[href*="http"]')?.getAttribute('href')

                        return { name, address, phone, website }
                    })

                    if (contractorData.name) {
                        const contractor = await this.parseContractorData(contractorData, 'Caesarstone')
                        if (contractor) contractors.push(contractor)
                    }
                } catch (error) {
                    console.error('Error parsing dealer element:', error)
                }
            }
        } catch (error) {
            console.error('Caesarstone scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }

    private async parseContractorData(data: any, manufacturer: string): Promise<ScrapedContractor | null> {
        if (!data.name) return null

        const addressParts = this.parseAddress(data.address || '')
        const coordinates = data.address ? await this.geocodeAddress(data.address) : null

        return {
            name: data.name,
            businessName: data.name,
            phone: this.parsePhoneNumber(data.phone || ''),
            website: data.website || undefined,
            address: addressParts.address || undefined,
            city: addressParts.city || undefined,
            state: addressParts.state || undefined,
            zipCode: addressParts.zipCode || undefined,
            latitude: coordinates?.latitude,
            longitude: coordinates?.longitude,
            manufacturers: [manufacturer],
            specialties: ['Quartz Countertops', 'Stone Installation'],
            certifications: [`${manufacturer} Authorized Dealer`]
        }
    }

    private parseAddress(fullAddress: string): { address?: string, city?: string, state?: string, zipCode?: string } {
        const parts = fullAddress.split(',').map(p => p.trim())
        if (parts.length >= 3) {
            const lastPart = parts[parts.length - 1]
            const stateZip = lastPart.match(/([A-Z]{2})\s+(\d{5}(-\d{4})?)/)

            return {
                address: parts.slice(0, -2).join(', '),
                city: parts[parts.length - 2],
                state: stateZip?.[1],
                zipCode: stateZip?.[2]
            }
        }
        return { address: fullAddress }
    }
}

export class CambriaScraper extends ManufacturerScraper {
    manufacturerName = 'Cambria'
    baseUrl = 'https://www.cambriausa.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            await page.goto(`${this.baseUrl}/find-a-dealer`, { waitUntil: 'networkidle0' })

            if (location) {
                await page.waitForSelector('input[placeholder*="zip"], input[name*="location"]', { timeout: 5000 })
                await page.type('input[placeholder*="zip"], input[name*="location"]', location)
                await page.click('button[type="submit"], .search-btn')
                await new Promise(resolve => setTimeout(resolve, 3000))
            }

            const dealerElements = await page.$$('.dealer-result, .dealer-card, .location-card')

            for (const element of dealerElements) {
                const dealerData = await element.evaluate((el) => {
                    const name = el.querySelector('.dealer-name, .business-name, h3')?.textContent?.trim()
                    const address = el.querySelector('.address, .street-address')?.textContent?.trim()
                    const city = el.querySelector('.city')?.textContent?.trim()
                    const state = el.querySelector('.state')?.textContent?.trim()
                    const zipCode = el.querySelector('.zip, .postal-code')?.textContent?.trim()
                    const phone = el.querySelector('.phone')?.textContent?.trim()
                    const website = el.querySelector('a[href*="http"]')?.getAttribute('href')

                    return { name, address, city, state, zipCode, phone, website }
                })

                if (dealerData.name) {
                    const contractor: ScrapedContractor = {
                        name: dealerData.name,
                        businessName: dealerData.name,
                        phone: this.parsePhoneNumber(dealerData.phone || ''),
                        website: dealerData.website || undefined,
                        address: dealerData.address || undefined,
                        city: dealerData.city || undefined,
                        state: dealerData.state || undefined,
                        zipCode: dealerData.zipCode || undefined,
                        manufacturers: ['Cambria'],
                        specialties: ['Quartz Countertops', 'Natural Stone'],
                        certifications: ['Cambria Certified Dealer']
                    }

                    if (dealerData.address && dealerData.city && dealerData.state) {
                        const fullAddress = `${dealerData.address}, ${dealerData.city}, ${dealerData.state} ${dealerData.zipCode || ''}`
                        const coordinates = await this.geocodeAddress(fullAddress)
                        if (coordinates) {
                            contractor.latitude = coordinates.latitude
                            contractor.longitude = coordinates.longitude
                        }
                    }

                    contractors.push(contractor)
                }
            }
        } catch (error) {
            console.error('Cambria scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}

export class SilestoneScraper extends ManufacturerScraper {
    manufacturerName = 'Silestone'
    baseUrl = 'https://www.silestone.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            await page.goto(`${this.baseUrl}/find-a-distributor`, { waitUntil: 'networkidle0' })

            if (location) {
                await page.waitForSelector('input[name="address"], input[placeholder*="location"]', { timeout: 5000 })
                await page.type('input[name="address"], input[placeholder*="location"]', location)
                await page.click('.search-button, button[type="submit"]')
                await new Promise(resolve => setTimeout(resolve, 3000))
            }

            const distributorElements = await page.$$('.distributor-item, .dealer-card, .location-item')

            for (const element of distributorElements) {
                const distributorData = await element.evaluate((el) => {
                    const name = el.querySelector('.distributor-name, .dealer-name, h3, h4')?.textContent?.trim()
                    const address = el.querySelector('.address, .street-address')?.textContent?.trim()
                    const phone = el.querySelector('.phone, .telephone')?.textContent?.trim()
                    const website = el.querySelector('a[href*="http"]:not([href*="mailto"])')?.getAttribute('href')
                    const email = el.querySelector('a[href*="mailto"]')?.getAttribute('href')?.replace('mailto:', '')

                    return { name, address, phone, website, email }
                })

                if (distributorData.name) {
                    const addressParts = this.parseFullAddress(distributorData.address || '')
                    const coordinates = distributorData.address ? await this.geocodeAddress(distributorData.address) : null

                    const contractor: ScrapedContractor = {
                        name: distributorData.name,
                        businessName: distributorData.name,
                        phone: this.parsePhoneNumber(distributorData.phone || ''),
                        email: distributorData.email || undefined,
                        website: distributorData.website || undefined,
                        address: addressParts.address || undefined,
                        city: addressParts.city || undefined,
                        state: addressParts.state || undefined,
                        zipCode: addressParts.zipCode || undefined,
                        latitude: coordinates?.latitude,
                        longitude: coordinates?.longitude,
                        manufacturers: ['Silestone'],
                        specialties: ['Quartz Surfaces', 'Kitchen Countertops', 'Bathroom Vanities'],
                        certifications: ['Silestone Authorized Distributor']
                    }

                    contractors.push(contractor)
                }
            }
        } catch (error) {
            console.error('Silestone scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}

export class MSIStoneScraper extends ManufacturerScraper {
    manufacturerName = 'MSI Stone'
    baseUrl = 'https://www.msistone.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            await page.goto(`${this.baseUrl}/where-to-buy`, { waitUntil: 'networkidle0' })

            if (location) {
                await page.waitForSelector('#location-search', { timeout: 5000 })
                await page.type('#location-search', location)
                await page.click('.search-btn')
                await new Promise(resolve => setTimeout(resolve, 3000))
            }

            const dealerElements = await page.$$('.dealer-location, .store-location')

            for (const element of dealerElements) {
                const dealerData = await element.evaluate((el) => {
                    const name = el.querySelector('.store-name, .dealer-name')?.textContent?.trim()
                    const address = el.querySelector('.address')?.textContent?.trim()
                    const phone = el.querySelector('.phone')?.textContent?.trim()
                    const website = el.querySelector('.website a')?.getAttribute('href')

                    return { name, address, phone, website }
                })

                if (dealerData.name) {
                    const addressParts = this.parseAddress(dealerData.address || '')
                    const coordinates = dealerData.address ? await this.geocodeAddress(dealerData.address) : null

                    contractors.push({
                        name: dealerData.name,
                        businessName: dealerData.name,
                        phone: this.parsePhoneNumber(dealerData.phone || ''),
                        website: dealerData.website || undefined,
                        address: addressParts.address || undefined,
                        city: addressParts.city || undefined,
                        state: addressParts.state || undefined,
                        zipCode: addressParts.zipCode || undefined,
                        latitude: coordinates?.latitude,
                        longitude: coordinates?.longitude,
                        manufacturers: ['MSI Stone'],
                        specialties: ['Natural Stone', 'Quartz', 'Tile', 'Hardscaping'],
                        certifications: ['MSI Authorized Dealer']
                    })
                }
            }
        } catch (error) {
            console.error('MSI Stone scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }

    private parseAddress(fullAddress: string): { address?: string, city?: string, state?: string, zipCode?: string } {
        const lines = fullAddress.split('\n').filter(line => line.trim())
        if (lines.length >= 2) {
            const lastLine = lines[lines.length - 1]
            const stateZipMatch = lastLine.match(/([A-Z]{2})\s+(\d{5}(-\d{4})?)/)

            if (stateZipMatch) {
                return {
                    address: lines[0],
                    city: lastLine.replace(stateZipMatch[0], '').trim(),
                    state: stateZipMatch[1],
                    zipCode: stateZipMatch[2]
                }
            }
        }
        return { address: fullAddress }
    }
}

// Additional manufacturer scrapers can be added following the same pattern
export class QuartzMasterScraper extends ManufacturerScraper {
    manufacturerName = 'Quartz Master'
    baseUrl = 'https://www.quartzmaster.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        // Implementation for Quartz Master dealer locator
        return []
    }
}

export class HanstoneScraper extends ManufacturerScraper {
    manufacturerName = 'Hanstone'
    baseUrl = 'https://www.hanstoneusa.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        // Implementation for Hanstone dealer locator
        return []
    }
}

export class CorianScraper extends ManufacturerScraper {
    manufacturerName = 'Corian'
    baseUrl = 'https://www.corian.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        // Implementation for Corian dealer locator
        return []
    }
}

export class FormicaScraper extends ManufacturerScraper {
    manufacturerName = 'Formica'
    baseUrl = 'https://www.formica.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        // Implementation for Formica dealer locator
        return []
    }
}

export class WilsonartScraper extends ManufacturerScraper {
    manufacturerName = 'Wilsonart'
    baseUrl = 'https://www.wilsonart.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        // Implementation for Wilsonart dealer locator
        return []
    }
}

export class LGViateraScraper extends ManufacturerScraper {
    manufacturerName = 'LG Viatera'
    baseUrl = 'https://www.lgviatera.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        // Implementation for LG Viatera dealer locator
        return []
    }
}

export class SamsungRadianzScraper extends ManufacturerScraper {
    manufacturerName = 'Samsung Radianz'
    baseUrl = 'https://www.samsungradianz.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        // Implementation for Samsung Radianz dealer locator
        return []
    }
}

export class DektonScraper extends ManufacturerScraper {
    manufacturerName = 'Dekton'
    baseUrl = 'https://www.dekton.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        // Implementation for Dekton dealer locator
        return []
    }
}
