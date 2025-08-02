// Generic images service for contractors and projects
export const ImageService = {
    // Professional contractor profile images
    contractorProfiles: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', // Professional man
        'https://images.unsplash.com/photo-1494790108755-2616b332c449?w=150&h=150&fit=crop&crop=face', // Professional woman
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', // Mature professional
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face', // Experienced contractor
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face', // Female contractor
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face', // Skilled worker
        'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face', // Construction professional
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face', // Trade professional
    ],

    // Kitchen and countertop project images
    projectImages: [
        // Modern Kitchens
        'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', // Modern white kitchen
        'https://images.unsplash.com/photo-1556909011-7309f48f79b6?w=400&h=300&fit=crop', // Granite countertops
        'https://images.unsplash.com/photo-1556909114-4e4fa72bb41c?w=400&h=300&fit=crop', // Kitchen island
        'https://images.unsplash.com/photo-1585663800131-6675cd0c77a2?w=400&h=300&fit=crop', // Luxury kitchen
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop', // Marble countertops
        'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=400&h=300&fit=crop', // Dark granite
        'https://images.unsplash.com/photo-1556909114-f3bda3dd4b3f?w=400&h=300&fit=crop', // Quartz countertops

        // Kitchen Details
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop', // Backsplash detail
        'https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=400&h=300&fit=crop', // Stone texture
        'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=400&h=300&fit=crop', // Kitchen renovation
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', // Modern design
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=400&h=300&fit=crop', // Stone installation

        // Natural Stone
        'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=400&h=300&fit=crop', // Natural granite
        'https://images.unsplash.com/photo-1600607688618-c0e08f5f9d87?w=400&h=300&fit=crop', // Stone patterns
        'https://images.unsplash.com/photo-1600607688842-1d3e8a5b7e8a?w=400&h=300&fit=crop', // Marble veining

        // Bathroom Applications
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=300&fit=crop', // Bathroom vanity
        'https://images.unsplash.com/photo-1584622781564-1d987ba8c2ab?w=400&h=300&fit=crop', // Luxury bathroom
    ],

    // Business/workshop images for contractors without portfolio
    workshopImages: [
        'https://images.unsplash.com/photo-1580794452703-c76de2709bd8?w=400&h=300&fit=crop', // Stone workshop
        'https://images.unsplash.com/photo-1619642081092-5ee8ba4f1c60?w=400&h=300&fit=crop', // Fabrication shop
        'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop', // Stone cutting
        'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop', // Professional tools
        'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop', // Construction site
    ],

    // Company logos/business images
    businessImages: [
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=150&fit=crop', // Modern storefront
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=150&fit=crop', // Office building
        'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=200&h=150&fit=crop', // Business exterior
    ],

    // Get random profile image
    getRandomProfileImage(): string {
        return this.contractorProfiles[Math.floor(Math.random() * this.contractorProfiles.length)];
    },

    // Get random project images (multiple)
    getRandomProjectImages(count: number = 3): string[] {
        const shuffled = [...this.projectImages].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    },

    // Get workshop image
    getRandomWorkshopImage(): string {
        return this.workshopImages[Math.floor(Math.random() * this.workshopImages.length)];
    },

    // Get business image
    getRandomBusinessImage(): string {
        return this.businessImages[Math.floor(Math.random() * this.businessImages.length)];
    },

    // Get images based on specialty
    getSpecialtyImages(specialties: string[], count: number = 3): string[] {
        let relevantImages = [...this.projectImages];

        // Filter based on specialties if specific ones are mentioned
        if (specialties.some(s => s.toLowerCase().includes('bathroom'))) {
            relevantImages = this.projectImages.filter(img =>
                img.includes('bathroom') || img.includes('vanity')
            );
        }

        if (specialties.some(s => s.toLowerCase().includes('outdoor'))) {
            relevantImages = this.projectImages.filter(img =>
                img.includes('outdoor') || img.includes('patio')
            );
        }

        // If no specific matches, use general project images
        if (relevantImages.length < count) {
            relevantImages = this.projectImages;
        }

        const shuffled = relevantImages.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
};

export default ImageService;
