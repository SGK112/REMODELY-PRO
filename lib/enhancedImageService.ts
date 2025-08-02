// Enhanced Image Service with Professional Placeholders
export class EnhancedImageService {
    private static readonly BASE_URL = process.env.NODE_ENV === 'production'
        ? 'https://your-domain.com'
        : 'http://localhost:3002';

    private static readonly CLOUDINARY_BASE = 'https://res.cloudinary.com/da7q0jb1p/image/upload';

    // Professional placeholder categories
    private static readonly PLACEHOLDER_CATEGORIES = {
        contractor: {
            profile: '/api/placeholder/150x150?category=contractor-profile',
            business: '/api/placeholder/400x300?category=contractor-business',
            portfolio: '/api/placeholder/400x300?category=contractor-portfolio'
        },
        materials: {
            granite: '/api/placeholder/400x300?category=granite-countertop',
            quartz: '/api/placeholder/400x300?category=quartz-countertop',
            marble: '/api/placeholder/400x300?category=marble-countertop',
            concrete: '/api/placeholder/400x300?category=concrete-countertop',
            butcherblock: '/api/placeholder/400x300?category=butcherblock-countertop'
        },
        projects: {
            kitchen: '/api/placeholder/600x400?category=kitchen-project',
            bathroom: '/api/placeholder/600x400?category=bathroom-project',
            commercial: '/api/placeholder/600x400?category=commercial-project'
        },
        logos: {
            manufacturer: '/api/placeholder/200x100?category=manufacturer-logo',
            contractor: '/api/placeholder/120x60?category=contractor-logo'
        }
    };

    /**
     * Get optimized image URL with fallback to professional placeholder
     */
    static getOptimizedImage(
        originalUrl: string | null | undefined,
        category: keyof typeof EnhancedImageService.PLACEHOLDER_CATEGORIES,
        subcategory: string,
        transformations: {
            width?: number;
            height?: number;
            quality?: 'auto' | number;
            format?: 'webp' | 'jpg' | 'png';
            crop?: 'fill' | 'fit' | 'scale';
        } = {}
    ): string {
        // If we have a valid URL, try to optimize it
        if (originalUrl && this.isValidImageUrl(originalUrl)) {
            return this.applyTransformations(originalUrl, transformations);
        }

        // Fall back to professional placeholder
        const placeholderCategory = this.PLACEHOLDER_CATEGORIES[category] as any;
        if (placeholderCategory && placeholderCategory[subcategory]) {
            return `${this.BASE_URL}${placeholderCategory[subcategory]}`;
        }

        // Ultimate fallback
        return `${this.BASE_URL}/api/placeholder/400x300/professional-placeholder`;
    }

    /**
     * Get contractor profile image with professional placeholder
     */
    static getContractorProfileImage(imageUrl?: string | null): string {
        return this.getOptimizedImage(
            imageUrl,
            'contractor',
            'profile',
            { width: 150, height: 150, crop: 'fill', format: 'webp', quality: 'auto' }
        );
    }

    /**
     * Get contractor business/hero image
     */
    static getContractorBusinessImage(imageUrl?: string | null): string {
        return this.getOptimizedImage(
            imageUrl,
            'contractor',
            'business',
            { width: 400, height: 300, crop: 'fill', format: 'webp', quality: 'auto' }
        );
    }

    /**
     * Get portfolio/project image
     */
    static getPortfolioImage(imageUrl?: string | null, projectType: 'kitchen' | 'bathroom' | 'commercial' = 'kitchen'): string {
        if (imageUrl && this.isValidImageUrl(imageUrl)) {
            return this.applyTransformations(imageUrl, {
                width: 600,
                height: 400,
                crop: 'fill',
                format: 'webp',
                quality: 'auto'
            });
        }

        return `${this.BASE_URL}/api/placeholder/600x400/${projectType}-project`;
    }

    /**
     * Get material sample image
     */
    static getMaterialImage(
        imageUrl?: string | null,
        materialType: 'granite' | 'quartz' | 'marble' | 'concrete' | 'butcherblock' = 'granite'
    ): string {
        return this.getOptimizedImage(
            imageUrl,
            'materials',
            materialType,
            { width: 400, height: 300, crop: 'fill', format: 'webp', quality: 'auto' }
        );
    }

    /**
     * Get manufacturer logo
     */
    static getManufacturerLogo(logoUrl?: string | null): string {
        return this.getOptimizedImage(
            logoUrl,
            'logos',
            'manufacturer',
            { width: 200, height: 100, crop: 'fit', format: 'webp', quality: 'auto' }
        );
    }

    /**
     * Apply Cloudinary transformations
     */
    private static applyTransformations(url: string, transformations: any): string {
        if (!url.includes('cloudinary.com')) {
            // For non-Cloudinary images, return as-is or proxy through our service
            return url;
        }

        const { width, height, quality = 'auto', format = 'webp', crop = 'fill' } = transformations;

        // Build transformation string
        const transforms: string[] = [];

        if (width && height) {
            transforms.push(`w_${width},h_${height},c_${crop}`);
        } else if (width) {
            transforms.push(`w_${width}`);
        } else if (height) {
            transforms.push(`h_${height}`);
        }

        transforms.push(`q_${quality}`);
        transforms.push(`f_${format}`);

        // Insert transformations into Cloudinary URL
        const transformString = transforms.join(',');
        return url.replace('/upload/', `/upload/${transformString}/`);
    }

    /**
     * Check if URL is a valid image URL
     */
    private static isValidImageUrl(url: string): boolean {
        if (!url || typeof url !== 'string') return false;

        try {
            new URL(url);
            return /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url) || url.includes('cloudinary.com');
        } catch {
            return false;
        }
    }

    /**
     * Generate responsive image srcSet
     */
    static generateSrcSet(baseUrl: string, sizes: number[] = [400, 600, 800, 1200]): string {
        return sizes
            .map(size => {
                const optimizedUrl = this.applyTransformations(baseUrl, {
                    width: size,
                    quality: 'auto',
                    format: 'webp'
                });
                return `${optimizedUrl} ${size}w`;
            })
            .join(', ');
    }

    /**
     * Preload critical images
     */
    static preloadImage(url: string): Promise<void> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = reject;
            img.src = url;
        });
    }

    /**
     * Lazy load image with intersection observer
     */
    static lazyLoadImage(img: HTMLImageElement, src: string): void {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target as HTMLImageElement;
                        image.src = src;
                        image.classList.remove('lazy');
                        imageObserver.unobserve(image);
                    }
                });
            });

            imageObserver.observe(img);
        } else {
            // Fallback for older browsers
            img.src = src;
        }
    }
}

export default EnhancedImageService;
