import { Browser, Page } from 'puppeteer'
import { ManufacturerScraper, ScrapedContractor } from './base'

// Simple Google search scraper - more reliable than complex directory sites
export class GoogleSearchScraper extends ManufacturerScraper {
    manufacturerName = 'Google Search'
    baseUrl = 'https://www.google.com'

    async scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]> {
        const page = await browser.newPage()
        const contractors: ScrapedContractor[] = []

        try {
            const searchLocation = location || 'Denver, CO'
            const searchQuery = `countertop installation contractors ${searchLocation}`
            const searchUrl = `${this.baseUrl}/search?q=${encodeURIComponent(searchQuery)}`

            console.log(`Scraping Google for: ${searchQuery}`)

            // Set user agent to look like a real browser
            await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')

            await page.goto(searchUrl, { waitUntil: 'networkidle2', timeout: 15000 })

            // Wait for search results
            await page.waitForSelector('div[data-ved], .g, [data-result-index]', { timeout: 10000 })

            // Get search result elements
            const resultElements = await page.$$('div[data-ved], .g')

            for (const element of resultElements.slice(0, 8)) { // Limit to first 8 results
                try {
                    const resultData = await element.evaluate((el) => {
                        // Look for business names in various Google result formats
                        const titleEl = el.querySelector('h3, .LC20lb, [role="heading"]')
                        const linkEl = el.querySelector('a[href]')
                        const snippetEl = el.querySelector('.VwiC3b, .s, .st')

                        const title = titleEl?.textContent?.trim()
                        const url = linkEl?.getAttribute('href')
                        const snippet = snippetEl?.textContent?.trim()

                        return {
                            title,
                            url,
                            snippet
                        }
                    })

                    if (resultData.title && resultData.title.toLowerCase().includes('countertop')) {
                        // Extract potential phone numbers from snippet
                        const phoneMatch = resultData.snippet?.match(/\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/)

                        // Try to extract location from title or snippet
                        const locationMatch = resultData.snippet?.match(/([A-Za-z\s]+),\s*([A-Z]{2})/);

                        contractors.push({
                            name: resultData.title,
                            businessName: resultData.title,
                            phone: phoneMatch ? this.parsePhoneNumber(phoneMatch[0]) : undefined,
                            website: resultData.url || undefined,
                            city: locationMatch ? locationMatch[1].trim() : undefined,
                            state: locationMatch ? locationMatch[2] : undefined,
                            description: resultData.snippet?.substring(0, 200),
                            specialties: ['Countertop Installation'],
                            certifications: ['Google Search Result'],
                            manufacturers: []
                        })
                    }
                } catch (error) {
                    console.error('Error parsing Google result:', error)
                }
            }
        } catch (error) {
            console.error('Google search scraping error:', error)
        } finally {
            await page.close()
        }

        return contractors
    }
}
