// Image Service class to handle contractor and project images
export class ImageService {
    private static contractorImages = [
        '/images/contractor-1.jpg',
        '/images/contractor-2.jpg',
        '/images/contractor-3.jpg',
        '/images/contractor-4.jpg',
        '/images/contractor-5.jpg'
    ]

    // High-quality contractor profile images
    private static contractorProfiles = [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', // Professional man
        'https://images.unsplash.com/photo-1494790108755-2616c8c7c58a?w=300&h=300&fit=crop', // Professional woman
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop', // Businessman
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop', // Professional headshot
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop', // Business professional
    ]

    // Project portfolio images
    private static projectImages = [
        // Kitchen Projects
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', // Modern kitchen
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', // Kitchen countertops
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', // Modern design

        // Bathroom Projects
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop', // Bathroom vanity
        'https://images.unsplash.com/photo-1584622781564-1d987ba8c2ab?w=400&h=300&fit=crop', // Luxury bathroom

        // Natural Stone
        'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop', // Natural granite
        'https://images.unsplash.com/photo-1600607688618-c0e08f5f9d87?w=400&h=300&fit=crop', // Stone patterns
    ]

    // Business/workshop images for contractors without portfolio
    private static workshopImages = [
        'https://images.unsplash.com/photo-1580794452703-c76de2709bd8?w=400&h=300&fit=crop', // Stone workshop
        'https://images.unsplash.com/photo-1619642081092-5ee8ba4f1c60?w=400&h=300&fit=crop', // Fabrication shop
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop', // Stone cutting
        'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop', // Professional tools
        'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop', // Construction site
    ]

    // Company logos/business images
    private static businessImages = [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=150&fit=crop', // Modern storefront
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=150&fit=crop', // Office building
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=150&fit=crop', // Business exterior
    ]

    // Get contractor profile image - returns a random contractor image or default
    static getContractorProfileImage(): string {
        const randomIndex = Math.floor(Math.random() * this.contractorProfiles.length)
        return this.contractorProfiles[randomIndex] || this.contractorProfiles[0]
    }

    // Get random profile image
    static getRandomProfileImage(): string {
        return this.contractorProfiles[Math.floor(Math.random() * this.contractorProfiles.length)]
    }

    // Get random project images (multiple)
    static getRandomProjectImages(count: number = 3): string[] {
        const shuffled = [...this.projectImages].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, count)
    }

    // Get workshop image
    static getRandomWorkshopImage(): string {
        return this.workshopImages[Math.floor(Math.random() * this.workshopImages.length)]
    }

    // Get business image
    static getRandomBusinessImage(): string {
        return this.businessImages[Math.floor(Math.random() * this.businessImages.length)]
    }

    // Get default contractor image
    static getDefaultContractorImage(): string {
        return this.contractorProfiles[0]
    }

    // Get project image based on type
    static getProjectImage(projectType?: string): string {
        const projectImages: { [key: string]: string } = {
            kitchen: '/images/kitchen-project.jpg',
            bathroom: '/images/bathroom-project.jpg',
            roofing: '/images/roofing-project.jpg',
            flooring: '/images/flooring-project.jpg',
            painting: '/images/painting-project.jpg',
            default: '/images/default-project.jpg'
        }

        return projectImages[projectType?.toLowerCase() || 'default'] || projectImages.default
    }

    // Get images based on specialty
    static getSpecialtyImages(specialties: string[], count: number = 3): string[] {
        let relevantImages = [...this.projectImages]

        // Filter based on specialties if specific ones are mentioned
        if (specialties.some(s => s.toLowerCase().includes('bathroom'))) {
            relevantImages = this.projectImages.filter(img =>
                img.includes('bathroom') || img.includes('vanity')
            )
        }

        if (specialties.some(s => s.toLowerCase().includes('outdoor'))) {
            relevantImages = this.projectImages.filter(img =>
                img.includes('outdoor') || img.includes('patio')
            )
        }

        // If no specific matches, use general project images
        if (relevantImages.length < count) {
            relevantImages = this.projectImages
        }

        const shuffled = relevantImages.sort(() => 0.5 - Math.random())
        return shuffled.slice(0, count)
    }

    // Validate if a given URL is a valid image URL
    static validateImageUrl(url: string): boolean {
        try {
            new URL(url)
            return true
        } catch {
            return false
        }
    }

    // Get a placeholder image in SVG format
    static getImagePlaceholder(width: number = 300, height: number = 200): string {
        return `data:image/svg+xml;base64,${btoa(
            `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#e5e7eb"/>
        <text x="50%" y="50%" font-family="Arial" font-size="14" fill="#9ca3af" text-anchor="middle" dy=".3em">
          Image placeholder
        </text>
      </svg>`
        )}`
    }
}

export default ImageService
