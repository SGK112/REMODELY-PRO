import puppeteer, { Browser } from 'puppeteer'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { ManufacturerScraper, ScrapedContractor } from './scrapers/base'
import {
    CaesarstoneScraper,
    CambriaScraper,
    SilestoneScraper,
    MSIStoneScraper,
    QuartzMasterScraper,
    HanstoneScraper,
    CorianScraper,
    FormicaScraper,
    WilsonartScraper,
    LGViateraScraper,
    SamsungRadianzScraper,
    DektonScraper
} from './scrapers/manufacturers'
import {
    AngiScraper,
    HomeAdvisorScraper,
    HouzzScraper,
    ThumbtsackScraper,
    GoogleBusinessScraper,
    BBBScraper
} from './scrapers/directories'
import {
    NKBAScraper,
    MarbleInstituteScraper,
    NaturalStoneInstituteScraper,
    BuildZoomScraper,
    PorchScraper
} from './scrapers/industry'
import {
    YellowPagesScraper,
    YelpScraper,
    LocalAssociationScraper,
    FacebookBusinessScraper
} from './scrapers/local'
import {
    GoogleSearchScraper
} from './scrapers/simple'
import {
    DemoWorkingScraper
} from './scrapers/demo'
import {
    AuthenticatedAngiScraper,
    AuthenticatedHomeAdvisorScraper
} from './scrapers/authenticated'
import {
    ArizonaROCLicenseScraper,
    ArizonaCLCScraper,
    PublicBBBScraper,
    PublicGoogleBusinessScraper,
    PublicYellowPagesScraper,
    StateContractorLicenseScraper
} from './scrapers/public-sources'

// Contractor data validation schema
const ContractorSchema = z.object({
    name: z.string().min(1),
    businessName: z.string().min(1),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    website: z.string().url().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    specialties: z.array(z.string()).default([]),
    certifications: z.array(z.string()).default([]),
    manufacturers: z.array(z.string()).default([]),
    description: z.string().optional(),
    yearsInBusiness: z.number().optional(),
    licenseNumber: z.string().optional()
})

export class ContractorScraper {
    private browser: Browser | null = null
    private scrapers: ManufacturerScraper[] = []
    private publicScrapers: any[] = [] // Public data scrapers use different base class

    constructor() {
        this.initializeScrapers()
    }

    private initializeScrapers() {
        this.scrapers = [
            // Manufacturer websites
            new CaesarstoneScraper(),
            new CambriaScraper(),
            new SilestoneScraper(),
            new MSIStoneScraper(),
            new QuartzMasterScraper(),
            new HanstoneScraper(),
            new CorianScraper(),
            new FormicaScraper(),
            new WilsonartScraper(),
            new LGViateraScraper(),
            new SamsungRadianzScraper(),
            new DektonScraper(),

            // General contractor directories
            new AngiScraper(),
            new HomeAdvisorScraper(),
            new HouzzScraper(),
            new ThumbtsackScraper(),
            new GoogleBusinessScraper(),
            new BBBScraper(),

            // Industry-specific directories
            new NKBAScraper(),
            new MarbleInstituteScraper(),
            new NaturalStoneInstituteScraper(),
            new BuildZoomScraper(),
            new PorchScraper(),

            // Local business directories
            new YellowPagesScraper(),
            new YelpScraper(),
            new LocalAssociationScraper(),
            new FacebookBusinessScraper(),

            // Simple working scrapers
            new GoogleSearchScraper(),
            new DemoWorkingScraper(),

            // Authenticated scrapers (more reliable data)
            new AuthenticatedAngiScraper(),
            new AuthenticatedHomeAdvisorScraper()
        ]

        // Initialize public data scrapers separately
        this.publicScrapers = [
            new ArizonaROCLicenseScraper(),
            new ArizonaCLCScraper(),
            new PublicBBBScraper(),
            new PublicGoogleBusinessScraper(),
            new PublicYellowPagesScraper(),
            new StateContractorLicenseScraper()
        ]
    }

    async initialize() {
        this.browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        })
    }

    async scrapeAllManufacturers(location?: string): Promise<ScrapedContractor[]> {
        if (!this.browser) await this.initialize()

        const allContractors: ScrapedContractor[] = []

        for (const scraper of this.scrapers) {
            try {
                console.log(`Scraping ${scraper.manufacturerName}...`)
                const contractors = await scraper.scrape(this.browser!, location)
                allContractors.push(...contractors)
                console.log(`Found ${contractors.length} contractors for ${scraper.manufacturerName}`)

                // Rate limiting to be respectful
                await this.delay(2000)
            } catch (error) {
                console.error(`Error scraping ${scraper.manufacturerName}:`, error)
            }
        }

        return this.deduplicateContractors(allContractors)
    }

    async scrapeByManufacturer(manufacturerName: string, location?: string): Promise<ScrapedContractor[]> {
        if (!this.browser) await this.initialize()

        const scraper = this.scrapers.find(s =>
            s.manufacturerName.toLowerCase() === manufacturerName.toLowerCase()
        )

        if (!scraper) {
            throw new Error(`No scraper found for manufacturer: ${manufacturerName}`)
        }

        return await scraper.scrape(this.browser!, location)
    }

    async scrapeManufacturerWebsites(location?: string): Promise<ScrapedContractor[]> {
        if (!this.browser) await this.initialize()

        const manufacturerScrapers = this.scrapers.slice(0, 12) // First 12 are manufacturer scrapers
        const contractors: ScrapedContractor[] = []

        for (const scraper of manufacturerScrapers) {
            try {
                console.log(`Scraping manufacturer ${scraper.manufacturerName}...`)
                const results = await scraper.scrape(this.browser!, location)
                contractors.push(...results)
                console.log(`Found ${results.length} contractors from ${scraper.manufacturerName}`)
                await this.delay(2000)
            } catch (error) {
                console.error(`Error scraping ${scraper.manufacturerName}:`, error)
            }
        }

        return this.deduplicateContractors(contractors)
    }

    async scrapeDirectoryWebsites(location?: string): Promise<ScrapedContractor[]> {
        if (!this.browser) await this.initialize()

        const directoryScrapers = this.scrapers.slice(12, 18) // Directory scrapers (Angi, HomeAdvisor, etc.)
        const contractors: ScrapedContractor[] = []

        for (const scraper of directoryScrapers) {
            try {
                console.log(`Scraping directory ${scraper.manufacturerName}...`)
                const results = await scraper.scrape(this.browser!, location)
                contractors.push(...results)
                console.log(`Found ${results.length} contractors from ${scraper.manufacturerName}`)
                await this.delay(3000) // Longer delay for directory sites
            } catch (error) {
                console.error(`Error scraping ${scraper.manufacturerName}:`, error)
            }
        }

        return this.deduplicateContractors(contractors)
    }

    async scrapeIndustryWebsites(location?: string): Promise<ScrapedContractor[]> {
        if (!this.browser) await this.initialize()

        const industryScrapers = this.scrapers.slice(18, 23) // Industry association scrapers
        const contractors: ScrapedContractor[] = []

        for (const scraper of industryScrapers) {
            try {
                console.log(`Scraping industry site ${scraper.manufacturerName}...`)
                const results = await scraper.scrape(this.browser!, location)
                contractors.push(...results)
                console.log(`Found ${results.length} contractors from ${scraper.manufacturerName}`)
                await this.delay(2500)
            } catch (error) {
                console.error(`Error scraping ${scraper.manufacturerName}:`, error)
            }
        }

        return this.deduplicateContractors(contractors)
    }

    async scrapeLocalDirectories(location?: string): Promise<ScrapedContractor[]> {
        if (!this.browser) await this.initialize()

        const localScrapers = this.scrapers.slice(23) // Local directory scrapers
        const contractors: ScrapedContractor[] = []

        for (const scraper of localScrapers) {
            try {
                console.log(`Scraping local directory ${scraper.manufacturerName}...`)
                const results = await scraper.scrape(this.browser!, location)
                contractors.push(...results)
                console.log(`Found ${results.length} contractors from ${scraper.manufacturerName}`)
                await this.delay(4000) // Longer delay for local sites
            } catch (error) {
                console.error(`Error scraping ${scraper.manufacturerName}:`, error)
            }
        }

        return this.deduplicateContractors(contractors)
    }

    private deduplicateContractors(contractors: ScrapedContractor[]): ScrapedContractor[] {
        const seen = new Set<string>()
        return contractors.filter(contractor => {
            const key = `${contractor.businessName}_${contractor.phone || contractor.email || contractor.address}`
            if (seen.has(key)) return false
            seen.add(key)
            return true
        })
    }

    async saveContractorsToDatabase(contractors: ScrapedContractor[]): Promise<void> {
        for (const contractorData of contractors) {
            try {
                // Check if contractor already exists
                const existing = await prisma.contractor.findFirst({
                    where: {
                        OR: [
                            { businessName: contractorData.businessName },
                            { phone: contractorData.phone },
                            {
                                user: {
                                    email: contractorData.email
                                }
                            }
                        ]
                    }
                })

                if (existing) {
                    // Update existing contractor with new information
                    await prisma.contractor.update({
                        where: { id: existing.id },
                        data: {
                            specialties: JSON.stringify(contractorData.specialties),
                            certifications: JSON.stringify(contractorData.certifications),
                            description: contractorData.description || existing.description,
                            website: contractorData.website || existing.website,
                            address: contractorData.address || existing.address,
                            city: contractorData.city || existing.city,
                            state: contractorData.state || existing.state,
                            zipCode: contractorData.zipCode || existing.zipCode,
                            latitude: contractorData.latitude || existing.latitude,
                            longitude: contractorData.longitude || existing.longitude
                        }
                    })
                } else {
                    // Create new contractor
                    await this.createNewContractor(contractorData)
                }
            } catch (error) {
                console.error('Error saving contractor:', contractorData.businessName, error)
            }
        }
    }

    async storeContractor(contractorData: ScrapedContractor): Promise<void> {
        // Validate the contractor data
        const validatedData = ContractorSchema.parse(contractorData)

        // Check if contractor already exists
        const existing = await prisma.contractor.findFirst({
            where: {
                OR: [
                    { businessName: validatedData.businessName },
                    {
                        AND: [
                            { phone: validatedData.phone },
                            { phone: { not: null } },
                            { phone: { not: '' } }
                        ]
                    }
                ]
            }
        })

        if (existing) {
            // Update existing contractor with new information
            await prisma.contractor.update({
                where: { id: existing.id },
                data: {
                    specialties: JSON.stringify(validatedData.specialties),
                    certifications: JSON.stringify(validatedData.certifications),
                    description: validatedData.description || existing.description,
                    website: validatedData.website || existing.website,
                    address: validatedData.address || existing.address,
                    city: validatedData.city || existing.city,
                    state: validatedData.state || existing.state,
                    zipCode: validatedData.zipCode || existing.zipCode,
                    latitude: validatedData.latitude || existing.latitude,
                    longitude: validatedData.longitude || existing.longitude
                }
            })
        } else {
            // Create new contractor
            await this.createNewContractor(validatedData)
        }
    }

    private async createNewContractor(contractorData: ScrapedContractor) {
        // Create a user first (required by schema)
        const user = await prisma.user.create({
            data: {
                name: contractorData.name,
                email: contractorData.email || `${contractorData.businessName.toLowerCase().replace(/\s+/g, '')}@contractor.temp`,
                userType: 'CONTRACTOR',
                emailVerified: null // Will need verification
            }
        })

        // Create contractor profile
        await prisma.contractor.create({
            data: {
                userId: user.id,
                businessName: contractorData.businessName,
                serviceArea: JSON.stringify([contractorData.city, contractorData.state].filter(Boolean)),
                phone: contractorData.phone,
                website: contractorData.website,
                address: contractorData.address,
                city: contractorData.city,
                state: contractorData.state,
                zipCode: contractorData.zipCode,
                latitude: contractorData.latitude,
                longitude: contractorData.longitude,
                specialties: JSON.stringify(contractorData.specialties),
                certifications: JSON.stringify(contractorData.certifications),
                description: contractorData.description,
                licenseNumber: contractorData.licenseNumber,
                isVerified: false // Scraped contractors need manual verification
            }
        })
    }

    private delay(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

    /**
     * Scrape using authenticated scrapers only (more reliable data)
     */
    async scrapeAuthenticatedSources(searchLocation: string = 'california'): Promise<ScrapedContractor[]> {
        console.log(`🔐 Starting authenticated scraping for location: ${searchLocation}`)

        const authenticatedScrapers = this.scrapers.filter(scraper =>
            scraper instanceof AuthenticatedAngiScraper ||
            scraper instanceof AuthenticatedHomeAdvisorScraper
        )

        const allContractors: ScrapedContractor[] = []

        for (const scraper of authenticatedScrapers) {
            try {
                console.log(`🔐 Scraping ${scraper.constructor.name}...`)

                if (!this.browser) {
                    this.browser = await puppeteer.launch({
                        headless: false, // Show browser for authentication
                        slowMo: 100,
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    })
                }

                const contractors = await scraper.scrape(this.browser, searchLocation)
                console.log(`✅ Found ${contractors.length} contractors from ${scraper.constructor.name}`)

                allContractors.push(...contractors)

                // Delay between authenticated requests
                await this.delay(3000)

            } catch (error) {
                console.error(`❌ Error scraping ${scraper.constructor.name}:`, error)
            }
        }

        const uniqueContractors = this.deduplicateContractors(allContractors)
        console.log(`🎯 Authenticated scraping complete: ${uniqueContractors.length} unique contractors`)

        return uniqueContractors
    }

    /**
     * Scrape public data sources (government databases, BBB, Yellow Pages, etc.)
     */
    async scrapePublicDataSources(searchLocation: string = 'california'): Promise<ScrapedContractor[]> {
        console.log(`🏛️ Starting public data scraping for location: ${searchLocation}`)

        const allContractors: ScrapedContractor[] = []

        for (const scraper of this.publicScrapers) {
            try {
                console.log(`🏛️ Scraping ${scraper.constructor.name}...`)

                if (!this.browser) {
                    this.browser = await puppeteer.launch({
                        headless: true,
                        args: ['--no-sandbox', '--disable-setuid-sandbox']
                    })
                }

                const contractors = await scraper.scrape(this.browser, searchLocation)
                console.log(`✅ Found ${contractors.length} contractors from ${scraper.constructor.name}`)

                allContractors.push(...contractors)

                // Delay between requests to be respectful
                await this.delay(2000)

            } catch (error) {
                console.error(`❌ Error scraping ${scraper.constructor.name}:`, error)
            }
        }

        const uniqueContractors = this.deduplicateContractors(allContractors)
        console.log(`🎯 Public data scraping complete: ${uniqueContractors.length} unique contractors`)

        return uniqueContractors
    }

    async close() {
        if (this.browser) {
            await this.browser.close()
            this.browser = null
        }
    }
}
