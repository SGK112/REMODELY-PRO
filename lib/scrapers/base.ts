import { Browser } from 'puppeteer'

export interface ScrapedContractor {
    name: string
    businessName: string
    phone?: string
    email?: string
    website?: string
    address?: string
    city?: string
    state?: string
    zipCode?: string
    latitude?: number
    longitude?: number
    specialties: string[]
    certifications: string[]
    manufacturers: string[]
    description?: string
    yearsInBusiness?: number
    licenseNumber?: string
}

// Base class for manufacturer-specific scrapers
export abstract class ManufacturerScraper {
    abstract manufacturerName: string
    abstract baseUrl: string

    abstract scrape(browser: Browser, location?: string): Promise<ScrapedContractor[]>

    protected async geocodeAddress(address: string): Promise<{ latitude: number, longitude: number } | null> {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`
            )
            const data = await response.json()

            if (data && data.length > 0) {
                return {
                    latitude: parseFloat(data[0].lat),
                    longitude: parseFloat(data[0].lon)
                }
            }
        } catch (error) {
            console.error('Geocoding error:', error)
        }
        return null
    }

    protected parsePhoneNumber(phone: string): string | undefined {
        const cleaned = phone.replace(/\D/g, '')
        if (cleaned.length === 10) {
            return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
        }
        if (cleaned.length === 11 && cleaned.startsWith('1')) {
            return `(${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
        }
        return phone.trim() || undefined
    }

    protected extractEmail(text: string): string | undefined {
        const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/
        const match = text.match(emailRegex)
        return match ? match[0] : undefined
    }

    protected cleanText(text: string): string {
        return text.replace(/\s+/g, ' ').trim()
    }

    protected parseFullAddress(fullAddress: string): { address?: string, city?: string, state?: string, zipCode?: string } {
        const parts = fullAddress.split(',').map(p => p.trim())
        if (parts.length >= 3) {
            const lastPart = parts[parts.length - 1]
            const stateZip = lastPart.match(/^([A-Z]{2})\s*(\d{5}(?:-\d{4})?)$/)

            if (stateZip) {
                return {
                    address: parts.slice(0, -2).join(', '),
                    city: parts[parts.length - 2],
                    state: stateZip[1],
                    zipCode: stateZip[2]
                }
            }
        }

        return { address: fullAddress }
    }
}
