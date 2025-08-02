// Apple Maps integration for REMODELY.AI
export class AppleMapsService {
    private static instance: AppleMapsService

    private constructor() { }

    static getInstance(): AppleMapsService {
        if (!AppleMapsService.instance) {
            AppleMapsService.instance = new AppleMapsService()
        }
        return AppleMapsService.instance
    }

    // Generate Apple Maps URL for directions
    generateDirectionsUrl(
        origin: string | { lat: number; lng: number },
        destination: string | { lat: number; lng: number }
    ): string {
        const formatLocation = (location: string | { lat: number; lng: number }) => {
            if (typeof location === 'string') {
                return encodeURIComponent(location)
            }
            return `${location.lat},${location.lng}`
        }

        return `http://maps.apple.com/?daddr=${formatLocation(destination)}&saddr=${formatLocation(origin)}`
    }

    // Generate Apple Maps search URL
    generateSearchUrl(query: string, location?: { lat: number; lng: number }): string {
        let url = `http://maps.apple.com/?q=${encodeURIComponent(query)}`

        if (location) {
            url += `&sll=${location.lat},${location.lng}`
        }

        return url
    }

    // Generate Apple Maps URL for showing a specific location
    generateLocationUrl(
        location: { lat: number; lng: number },
        name?: string
    ): string {
        let url = `http://maps.apple.com/?ll=${location.lat},${location.lng}`

        if (name) {
            url += `&q=${encodeURIComponent(name)}`
        }

        return url
    }

    // Check if device supports Apple Maps (iOS/macOS)
    isAppleMapsSupported(): boolean {
        const userAgent = navigator.userAgent
        return /iPad|iPhone|iPod|Macintosh/.test(userAgent)
    }

    // Open Apple Maps with directions
    openDirections(
        origin: string | { lat: number; lng: number },
        destination: string | { lat: number; lng: number }
    ): void {
        const url = this.generateDirectionsUrl(origin, destination)
        window.open(url, '_blank')
    }

    // Open Apple Maps with location
    openLocation(
        location: { lat: number; lng: number },
        name?: string
    ): void {
        const url = this.generateLocationUrl(location, name)
        window.open(url, '_blank')
    }
}

// Export singleton instance
export const appleMapsService = AppleMapsService.getInstance()

// Utility function to determine which maps service to use
export const getPreferredMapsService = (): 'apple' | 'google' => {
    return appleMapsService.isAppleMapsSupported() ? 'apple' : 'google'
}

// Universal maps service that chooses the best option
export class UniversalMapsService {
    static openDirections(
        origin: string | { lat: number; lng: number },
        destination: string | { lat: number; lng: number },
        preferredService?: 'apple' | 'google'
    ): void {
        const service = preferredService || getPreferredMapsService()

        if (service === 'apple') {
            appleMapsService.openDirections(origin, destination)
        } else {
            // Import googleMapsService dynamically to avoid circular imports
            import('./maps').then(({ googleMapsService }) => {
                const url = googleMapsService.generateDirectionsUrl(origin, destination)
                window.open(url, '_blank')
            })
        }
    }

    static openLocation(
        location: { lat: number; lng: number },
        name?: string,
        preferredService?: 'apple' | 'google'
    ): void {
        const service = preferredService || getPreferredMapsService()

        if (service === 'apple') {
            appleMapsService.openLocation(location, name)
        } else {
            // Default to Google Maps
            const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
            window.open(url, '_blank')
        }
    }
}

export const universalMapsService = UniversalMapsService
