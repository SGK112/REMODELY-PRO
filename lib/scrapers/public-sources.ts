// Public Data Scraping Strategy
// Focus on publicly available contractor information from government and business directories

import { ScrapedContractor } from './base'
import { Browser, Page } from 'puppeteer'

/**
 * Base class for public data scrapers
 */
abstract class PublicDataScraper {
    protected sourceName: string
    protected baseUrl: string

    constructor(sourceName: string, baseUrl: string) {
        this.sourceName = sourceName
        this.baseUrl = baseUrl
    }

    abstract scrape(browser: Browser, searchLocation: string): Promise<ScrapedContractor[]>

    protected parsePhoneNumber(phone: string): string {
        if (!phone) return ''
        return phone.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }

    protected parseFullAddress(fullAddress: string): {
        address: string
        city: string
        state: string
        zipCode: string
    } {
        if (!fullAddress) return { address: '', city: '', state: '', zipCode: '' }

        const parts = fullAddress.split(',').map(p => p.trim())
        const address = parts[0] || ''
        const city = parts[1] || ''
        const stateZip = parts[2] || ''
        const stateZipMatch = stateZip.match(/([A-Z]{2})\s*(\d{5}(-\d{4})?)/)

        return {
            address,
            city,
            state: stateZipMatch?.[1] || '',
            zipCode: stateZipMatch?.[2] || ''
        }
    }
}

/**
 * Government and Public Records Scrapers
 * These sources are public information and appropriate to scrape
 */

export class ArizonaROCLicenseScraper extends PublicDataScraper {
    private readonly credentials = {
        username: 'joshb@surprisegranite.com',
        password: '@154Asterdr'
    }

    constructor() {
        super('Arizona ROC License Database', 'https://azroc.my.site.com/AZRoc/s/contractor-search')
    }

    async scrape(browser: Browser, searchLocation: string = 'arizona'): Promise<ScrapedContractor[]> {
        const contractors: ScrapedContractor[] = []
        const page = await browser.newPage()

        try {
            console.log('🏛️ Scraping Arizona ROC (Registrar of Contractors) database...')

            // First, navigate to login page (Salesforce Lightning platform)
            await page.goto('https://azroc.my.site.com', { waitUntil: 'networkidle2' })

            // Wait for Salesforce Lightning to load
            await new Promise(resolve => setTimeout(resolve, 3000))

            // Check if we need to login - look for Salesforce Lightning login elements
            const loginElements = await page.evaluate(() => {
                // Look for various login indicators in Salesforce Lightning
                const indicators = [
                    document.querySelector('input[type="email"]'),
                    document.querySelector('input[name="username"]'),
                    document.querySelector('.login'),
                    document.title.includes('Login'),
                    document.body.textContent?.includes('Username'),
                    document.body.textContent?.includes('Password')
                ]
                return indicators.some(Boolean)
            })

            if (loginElements) {
                console.log('🔐 Attempting to login to Arizona ROC (Salesforce Lightning)...')

                try {
                    // Wait for login form to be fully loaded
                    await page.waitForSelector('input', { timeout: 10000 })

                    // Find and fill username field (try multiple selectors)
                    const usernameSelectors = [
                        'input[type="email"]',
                        'input[name="username"]',
                        'input[id*="username"]',
                        'input[id*="email"]',
                        '.slds-input[type="email"]'
                    ]

                    let loginSuccess = false
                    for (const selector of usernameSelectors) {
                        try {
                            const usernameField = await page.$(selector)
                            if (usernameField) {
                                await usernameField.type(this.credentials.username)
                                console.log(`✅ Username entered using selector: ${selector}`)

                                // Find password field
                                const passwordField = await page.$('input[type="password"]')
                                if (passwordField) {
                                    await passwordField.type(this.credentials.password)
                                    console.log('✅ Password entered')

                                    // Look for submit button
                                    const submitSelectors = [
                                        'button[type="submit"]',
                                        'input[type="submit"]',
                                        '.slds-button',
                                        'button:contains("Log In")',
                                        'button:contains("Login")'
                                    ]

                                    for (const btnSelector of submitSelectors) {
                                        try {
                                            const submitBtn = await page.$(btnSelector)
                                            if (submitBtn) {
                                                await submitBtn.click()
                                                console.log('🔐 Login submitted')

                                                // Wait for potential navigation
                                                await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 })
                                                loginSuccess = true
                                                break
                                            }
                                        } catch (e) {
                                            // Try next selector
                                        }
                                    }
                                    break
                                }
                            }
                        } catch (e) {
                            // Try next selector
                        }
                    }

                    if (!loginSuccess) {
                        console.log('⚠️ Could not complete automatic login - proceeding without authentication')
                    }

                } catch (error) {
                    console.log('⚠️ Login attempt failed, proceeding without authentication:', error instanceof Error ? error.message : String(error))
                }
            }

            // Navigate to contractor search (whether logged in or not)
            await page.goto(this.baseUrl, { waitUntil: 'networkidle2' })

            // Wait for Salesforce Lightning components to load
            await new Promise(resolve => setTimeout(resolve, 5000))

            // Search for contractors by classification
            const classifications = [
                'K-38 Kitchen & Bath Remodeling',
                'B General Building',
                'R-1 Residential',
                'CR-6 Ceramic, Mosaic & Quarry Tile',
                'CR-40 Stone & Masonry'
            ]

            for (const classification of classifications) {
                try {
                    console.log(`🔍 Searching for ${classification} contractors...`)

                    // Look for search form elements (may vary based on actual site structure)
                    const searchInput = await page.$('input[name="search"], #search, .search-input')
                    if (searchInput) {
                        await searchInput.click({ clickCount: 3 }) // Select all text
                        await searchInput.type(classification)
                    }

                    // Look for classification dropdown
                    const classificationSelect = await page.$('select[name="classification"], #classification')
                    if (classificationSelect) {
                        await page.select('select[name="classification"], #classification', classification)
                    }

                    // Submit search
                    const searchButton = await page.$('button[type="submit"], #search-button, .search-btn')
                    if (searchButton) {
                        await searchButton.click()
                        await page.waitForSelector('.search-result, .contractor-result, .result-item', { timeout: 10000 })
                    }

                    // Extract contractor data from results
                    const resultElements = await page.$$('.search-result, .contractor-result, .result-item, tr[data-contractor]')

                    for (const element of resultElements.slice(0, 50)) { // Limit to 50 per classification
                        const contractorData = await element.evaluate((el: Element) => {
                            // Try multiple selector patterns for different data fields
                            const getName = () => {
                                return el.querySelector('.contractor-name, .business-name, .name, td:nth-child(1)')?.textContent?.trim() ||
                                    el.querySelector('a[href*="contractor"]')?.textContent?.trim()
                            }

                            const getAddress = () => {
                                return el.querySelector('.address, .location, td:nth-child(2)')?.textContent?.trim()
                            }

                            const getPhone = () => {
                                return el.querySelector('.phone, .telephone, td:nth-child(3)')?.textContent?.trim()
                            }

                            const getLicense = () => {
                                return el.querySelector('.license, .license-number, td:nth-child(4)')?.textContent?.trim()
                            }

                            const getStatus = () => {
                                return el.querySelector('.status, .license-status, td:nth-child(5)')?.textContent?.trim()
                            }

                            return {
                                name: getName(),
                                address: getAddress(),
                                phone: getPhone(),
                                license: getLicense(),
                                status: getStatus()
                            }
                        })

                        if (contractorData.name && (contractorData.license || contractorData.phone)) {
                            const addressParts = this.parseFullAddress(contractorData.address || '')

                            contractors.push({
                                name: contractorData.name,
                                businessName: contractorData.name,
                                phone: this.parsePhoneNumber(contractorData.phone || ''),
                                address: addressParts.address,
                                city: addressParts.city || 'Phoenix',
                                state: 'AZ',
                                zipCode: addressParts.zipCode,
                                specialties: [classification.replace(/^[A-Z0-9-]+\s/, '')], // Remove classification code
                                certifications: contractorData.license ? [`Arizona ROC License: ${contractorData.license}`] : [],
                                manufacturers: [],
                                description: `Licensed Arizona contractor - ${contractorData.status || 'Active'} license (${classification})`,
                                licenseNumber: contractorData.license || ''
                            })
                        }
                    }

                    // Small delay between searches
                    await new Promise(resolve => setTimeout(resolve, 2000))

                } catch (error) {
                    console.log(`❌ Error searching for ${classification}:`, error)
                }
            }

        } catch (error) {
            console.error('❌ Error scraping Arizona ROC:', error)
        } finally {
            await page.close()
        }

        console.log(`✅ Found ${contractors.length} licensed contractors from Arizona ROC`)
        return contractors
    }
}

export class PublicBBBScraper extends PublicDataScraper {
    constructor() {
        super('Better Business Bureau', 'https://www.bbb.org/search')
    }

    async scrape(browser: Browser, searchLocation: string = 'los angeles'): Promise<ScrapedContractor[]> {
        const contractors: ScrapedContractor[] = []
        const page = await browser.newPage()

        try {
            console.log('🛡️ Scraping Better Business Bureau for accredited contractors...')

            const searchTerms = [
                'countertop installation',
                'granite contractors',
                'kitchen remodeling',
                'stone fabrication'
            ]

            for (const searchTerm of searchTerms) {
                const searchUrl = `${this.baseUrl}?find_text=${encodeURIComponent(searchTerm)}&find_loc=${encodeURIComponent(searchLocation)}&page=1`
                await page.goto(searchUrl, { waitUntil: 'networkidle2' })

                // Look for business listings
                const businessElements = await page.$$('.search-result-business')

                for (const element of businessElements.slice(0, 20)) {
                    const businessData = await element.evaluate((el: Element) => {
                        const name = el.querySelector('.business-name a')?.textContent?.trim()
                        const rating = el.querySelector('.rating')?.textContent?.trim()
                        const address = el.querySelector('.address')?.textContent?.trim()
                        const phone = el.querySelector('.phone')?.textContent?.trim()
                        const accredited = el.querySelector('.accredited-badge') ? true : false
                        const description = el.querySelector('.business-description')?.textContent?.trim()

                        return { name, rating, address, phone, accredited, description }
                    })

                    if (businessData.name) {
                        const addressParts = this.parseFullAddress(businessData.address || '')

                        contractors.push({
                            name: businessData.name,
                            businessName: businessData.name,
                            phone: this.parsePhoneNumber(businessData.phone || ''),
                            address: addressParts.address,
                            city: addressParts.city || searchLocation.split(',')[0].trim(),
                            state: addressParts.state || searchLocation.split(',')[1]?.trim(),
                            zipCode: addressParts.zipCode,
                            specialties: [searchTerm.replace(/\b\w/g, l => l.toUpperCase())],
                            certifications: businessData.accredited ? ['BBB Accredited Business'] : [],
                            manufacturers: [],
                            description: businessData.description || `BBB rated business specializing in ${searchTerm}`
                        })
                    }
                }
            }

        } catch (error) {
            console.error('❌ Error scraping BBB:', error)
        } finally {
            await page.close()
        }

        console.log(`✅ Found ${contractors.length} contractors from Better Business Bureau`)
        return contractors
    }
}

export class PublicGoogleBusinessScraper extends PublicDataScraper {
    constructor() {
        super('Google Business Search', 'https://www.google.com/search')
    }

    async scrape(browser: Browser, searchLocation: string = 'los angeles'): Promise<ScrapedContractor[]> {
        const contractors: ScrapedContractor[] = []
        const page = await browser.newPage()

        try {
            console.log('🔍 Scraping Google Business listings...')

            const searchQueries = [
                `countertop contractors near ${searchLocation}`,
                `granite installation ${searchLocation}`,
                `kitchen remodeling ${searchLocation}`,
                `stone fabrication ${searchLocation}`
            ]

            for (const query of searchQueries) {
                const searchUrl = `${this.baseUrl}?q=${encodeURIComponent(query)}&tbm=lcl`
                await page.goto(searchUrl, { waitUntil: 'networkidle2' })

                // Look for local business results
                const businessElements = await page.$$('.VkpGBb')  // Google local business result selector

                for (const element of businessElements.slice(0, 15)) {
                    const businessData = await element.evaluate((el: Element) => {
                        const name = el.querySelector('h3')?.textContent?.trim()
                        const rating = el.querySelector('.yi40Hd')?.textContent?.trim()
                        const address = el.querySelector('.rllt__details div:nth-child(2)')?.textContent?.trim()
                        const phone = el.querySelector('[data-value]')?.getAttribute('data-value')
                        const website = el.querySelector('a[href^="http"]')?.getAttribute('href')

                        return { name, rating, address, phone, website }
                    })

                    if (businessData.name && businessData.name.length > 3) {
                        const addressParts = this.parseFullAddress(businessData.address || '')

                        contractors.push({
                            name: businessData.name,
                            businessName: businessData.name,
                            phone: this.parsePhoneNumber(businessData.phone || ''),
                            website: businessData.website || undefined,
                            address: addressParts.address,
                            city: addressParts.city || searchLocation.split(',')[0].trim(),
                            state: addressParts.state || searchLocation.split(',')[1]?.trim(),
                            zipCode: addressParts.zipCode,
                            specialties: [query.split(' ')[0].replace(/\b\w/g, l => l.toUpperCase())],
                            certifications: [],
                            manufacturers: [],
                            description: `Google Business listing for ${query.split(' ')[0]} services`
                        })
                    }
                }
            }

        } catch (error) {
            console.error('❌ Error scraping Google Business:', error)
        } finally {
            await page.close()
        }

        console.log(`✅ Found ${contractors.length} contractors from Google Business`)
        return contractors
    }
}

export class PublicYellowPagesScraper extends PublicDataScraper {
    constructor() {
        super('Yellow Pages', 'https://www.yellowpages.com')
    }

    async scrape(browser: Browser, searchLocation: string = 'los angeles'): Promise<ScrapedContractor[]> {
        const contractors: ScrapedContractor[] = []
        const page = await browser.newPage()

        try {
            console.log('📞 Scraping Yellow Pages business directory...')

            const categories = [
                'countertops',
                'granite-contractors',
                'kitchen-remodeling',
                'stone-fabricators'
            ]

            for (const category of categories) {
                const searchUrl = `${this.baseUrl}/search?search_terms=${category}&geo_location_terms=${encodeURIComponent(searchLocation)}`
                await page.goto(searchUrl, { waitUntil: 'networkidle2' })

                const businessElements = await page.$$('.result')

                for (const element of businessElements.slice(0, 20)) {
                    const businessData = await element.evaluate((el: Element) => {
                        const name = el.querySelector('.business-name')?.textContent?.trim()
                        const phone = el.querySelector('.phones')?.textContent?.trim()
                        const address = el.querySelector('.address')?.textContent?.trim()
                        const website = el.querySelector('.track-visit-website')?.getAttribute('href')
                        const rating = el.querySelector('.result-rating')?.textContent?.trim()

                        return { name, phone, address, website, rating }
                    })

                    if (businessData.name) {
                        const addressParts = this.parseFullAddress(businessData.address || '')

                        contractors.push({
                            name: businessData.name,
                            businessName: businessData.name,
                            phone: this.parsePhoneNumber(businessData.phone || ''),
                            website: businessData.website || undefined,
                            address: addressParts.address,
                            city: addressParts.city || searchLocation.split(',')[0].trim(),
                            state: addressParts.state || searchLocation.split(',')[1]?.trim(),
                            zipCode: addressParts.zipCode,
                            specialties: [category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())],
                            certifications: [],
                            manufacturers: [],
                            description: `Yellow Pages business listing for ${category.replace(/-/g, ' ')} services`
                        })
                    }
                }
            }

        } catch (error) {
            console.error('❌ Error scraping Yellow Pages:', error)
        } finally {
            await page.close()
        }

        console.log(`✅ Found ${contractors.length} contractors from Yellow Pages`)
        return contractors
    }
}

/**
 * Arizona CLC (Contractors License Check) Scraper
 * Note: This site uses reCAPTCHA which may limit automated access
 */
export class ArizonaCLCScraper extends PublicDataScraper {
    constructor() {
        super('Arizona CLC Profiles', 'https://www.azclc.com/profiles')
    }

    async scrape(browser: Browser, searchLocation: string = 'arizona'): Promise<ScrapedContractor[]> {
        const contractors: ScrapedContractor[] = []
        const page = await browser.newPage()

        try {
            console.log('🏗️ Scraping Arizona CLC contractor profiles...')
            console.log('⚠️  Note: This site uses reCAPTCHA (site key: 6LetowQTAAAAALz9gdCNtLPSVG_pBYCcXNwV9SBv)')

            await page.goto(this.baseUrl, { waitUntil: 'networkidle2' })

            // Check for reCAPTCHA immediately
            const recaptcha = await page.$('.g-recaptcha, #recaptcha, [data-sitekey]')
            if (recaptcha) {
                console.log('🤖 reCAPTCHA detected on Arizona CLC')
                console.log('💡 To use this scraper effectively, you would need:')
                console.log('   - Manual CAPTCHA solving service (2captcha, AntiCaptcha)')
                console.log('   - Or browser automation with human interaction')
                console.log('   - Or API access from Arizona CLC')

                // For now, return empty but show what we could scrape
                console.log('📋 Available search fields detected:')

                const formFields = await page.evaluate(() => {
                    const inputs = Array.from(document.querySelectorAll('input')).map(input => ({
                        name: input.name,
                        type: input.type,
                        placeholder: input.placeholder,
                        id: input.id
                    }))

                    const checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]')).map(cb => {
                        const element = cb as HTMLInputElement
                        return {
                            name: element.name,
                            value: element.value,
                            label: element.parentElement?.textContent?.trim()
                        }
                    })

                    return { inputs, checkboxes }
                })

                console.log('   - Text search fields:', formFields.inputs.filter(f => f.type === 'text'))
                console.log('   - Category checkboxes:', formFields.checkboxes)

                return contractors // Return empty due to reCAPTCHA
            }

            // If no reCAPTCHA (unlikely), proceed with scraping
            console.log('✅ No reCAPTCHA detected, proceeding with search...')

            // Search categories for countertop contractors
            const searchTerms = [
                { description: 'countertop', zipcode: '85001' }, // Phoenix
                { description: 'granite', zipcode: '85001' },
                { description: 'kitchen remodeling', zipcode: '85001' },
                { description: 'stone installation', zipcode: '85001' },
                { description: 'tile contractor', zipcode: '85001' }
            ]

            for (const searchTerm of searchTerms) {
                try {
                    console.log(`🔍 Searching Arizona CLC for: ${searchTerm.description}`)

                    // Fill search form
                    const descriptionInput = await page.$('input[name="description"]')
                    if (descriptionInput) {
                        await descriptionInput.click({ clickCount: 3 })
                        await descriptionInput.type(searchTerm.description)
                    }

                    const zipcodeInput = await page.$('input[name="zipcode"]')
                    if (zipcodeInput) {
                        await zipcodeInput.click({ clickCount: 3 })
                        await zipcodeInput.type(searchTerm.zipcode)
                    }

                    // Click search button
                    const searchButton = await page.$('button[type="submit"]:contains("Search")')
                    if (searchButton) {
                        await searchButton.click()
                        await new Promise(resolve => setTimeout(resolve, 3000))

                        // Check if results loaded or reCAPTCHA appeared
                        const postSearchRecaptcha = await page.$('.g-recaptcha')
                        if (postSearchRecaptcha) {
                            console.log('🤖 reCAPTCHA appeared after search - stopping')
                            break
                        }

                        // Extract results if no reCAPTCHA
                        const profileElements = await page.$$('.profile, .contractor-profile, .result, .search-result')

                        for (const element of profileElements.slice(0, 20)) {
                            const profileData = await element.evaluate((el: Element) => {
                                const getText = (selector: string) => el.querySelector(selector)?.textContent?.trim()

                                return {
                                    name: getText('.contractor-name, .profile-name, .business-name, h3, h2'),
                                    business: getText('.business-name, .company-name'),
                                    phone: getText('.phone, .telephone, .contact-phone'),
                                    address: getText('.address, .location, .contact-address'),
                                    license: getText('.license, .license-number, .credential'),
                                    specialty: getText('.specialty, .trade, .category'),
                                    rating: getText('.rating, .stars, .score'),
                                    website: el.querySelector('a[href*="http"]')?.getAttribute('href')
                                }
                            })

                            if (profileData.name && (profileData.phone || profileData.address)) {
                                const addressParts = this.parseFullAddress(profileData.address || '')

                                contractors.push({
                                    name: profileData.name,
                                    businessName: profileData.business || profileData.name,
                                    phone: this.parsePhoneNumber(profileData.phone || ''),
                                    address: addressParts.address,
                                    city: addressParts.city || 'Phoenix',
                                    state: 'AZ',
                                    zipCode: addressParts.zipCode,
                                    specialties: profileData.specialty ? [profileData.specialty] : [searchTerm.description.replace(/\b\w/g, l => l.toUpperCase())],
                                    certifications: profileData.license ? [`Arizona License: ${profileData.license}`] : [],
                                    manufacturers: [],
                                    description: `Arizona licensed contractor specializing in ${profileData.specialty || searchTerm.description}${profileData.rating ? ` (Rating: ${profileData.rating})` : ''}`,
                                    licenseNumber: profileData.license || '',
                                    website: profileData.website || ''
                                })
                            }
                        }
                    }

                    // Delay between searches
                    await new Promise(resolve => setTimeout(resolve, 3000))

                } catch (error) {
                    console.log(`❌ Error searching Arizona CLC for ${searchTerm.description}:`, error instanceof Error ? error.message : String(error))
                }
            }

        } catch (error) {
            console.error('❌ Error scraping Arizona CLC:', error)
            if (error instanceof Error && (error.message.includes('recaptcha') || error.message.includes('CAPTCHA'))) {
                console.log('🤖 reCAPTCHA protection detected - consider these alternatives:')
                console.log('   - Use CAPTCHA solving services')
                console.log('   - Manual browser session with human CAPTCHA solving')
                console.log('   - Contact Arizona CLC for API access')
            }
        } finally {
            await page.close()
        }

        console.log(`✅ Found ${contractors.length} contractors from Arizona CLC${contractors.length === 0 ? ' (blocked by reCAPTCHA)' : ''}`)
        return contractors
    }
}

export class StateContractorLicenseScraper extends PublicDataScraper {
    constructor() {
        super('State Contractor License Databases', 'https://example.gov')
    }

    async scrape(browser: Browser, searchLocation: string = 'california'): Promise<ScrapedContractor[]> {
        const contractors: ScrapedContractor[] = []

        // Map of state license database URLs
        const stateDatabases = {
            'california': 'https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
            'texas': 'https://www.trec.texas.gov/license-holder-search',
            'florida': 'https://www.myfloridalicense.com/LicenseDetail.asp',
            'arizona': 'https://roc.az.gov/license-lookup',
            'nevada': 'https://www.nscb.nv.gov/license-lookup',
            'colorado': 'https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx'
        }

        const state = searchLocation.toLowerCase().split(',')[1]?.trim() || searchLocation.toLowerCase()
        const databaseUrl = stateDatabases[state as keyof typeof stateDatabases]

        if (!databaseUrl) {
            console.log(`⚠️  No license database available for ${state}`)
            return contractors
        }

        const page = await browser.newPage()

        try {
            console.log(`🏛️ Scraping ${state} contractor license database...`)

            await page.goto(databaseUrl, { waitUntil: 'networkidle2' })

            // This would need to be customized for each state's specific form structure
            // For now, this is a template showing the approach

            console.log(`✅ Template ready for ${state} license database scraping`)

        } catch (error) {
            console.error(`❌ Error scraping ${state} licenses:`, error)
        } finally {
            await page.close()
        }

        return contractors
    }
}
