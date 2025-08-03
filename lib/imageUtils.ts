/**
 * Image utility functions for handling image loading, fallbacks, and optimization
 */

export interface ImageConfig {
    src: string
    alt: string
    fallback?: string
    className?: string
    width?: number
    height?: number
    priority?: boolean
}

/**
 * Get optimized image URL with fallbacks
 */
export function getOptimizedImageUrl(src: string | null | undefined, fallback?: string): string {
    if (!src) return fallback || '/placeholder-image.jpg'

    // Handle relative URLs
    if (src.startsWith('/')) return src

    // Handle external URLs - check if accessible
    try {
        new URL(src)
        return src
    } catch {
        return fallback || '/placeholder-image.jpg'
    }
}

/**
 * Handle image load errors with fallback
 */
export function handleImageError(
    event: React.SyntheticEvent<HTMLImageElement>,
    fallback?: string
): void {
    const img = event.currentTarget
    const fallbackSrc = fallback || '/placeholder-image.jpg'

    // Prevent infinite loop if fallback also fails
    if (img.src !== fallbackSrc) {
        img.src = fallbackSrc
    }
}

/**
 * Create image loading handler with retry logic
 */
export function createImageLoadHandler(
    fallback?: string,
    onError?: () => void
) {
    return (event: React.SyntheticEvent<HTMLImageElement>) => {
        handleImageError(event, fallback)
        onError?.()
    }
}

/**
 * Portfolio image configurations
 */
export const portfolioImageConfig = {
    placeholder: '/api/placeholder/400x300?category=portfolio',
    defaultAlt: 'Portfolio project image',
    className: 'w-full h-48 object-cover rounded-lg',
}

/**
 * Contractor profile image configurations  
 */
export const contractorImageConfig = {
    placeholder: '/api/placeholder/120x120?category=contractor-profile',
    defaultAlt: 'Contractor profile image',
    className: 'w-12 h-12 rounded-full object-cover',
}

/**
 * Logo image configurations
 */
export const logoImageConfig = {
    main: {
        src: '/logo-remodely.svg',
        fallback: 'Remodely Pro',
        alt: 'Remodely Pro Logo',
        className: 'h-8 w-auto',
    },
    small: {
        src: '/logo.svg',
        fallback: 'RP',
        alt: 'Remodely Pro',
        className: 'h-6 w-6',
    }
}

/**
 * Brand/manufacturer logo configurations
 */
export const brandImageConfig = {
    placeholder: '/api/placeholder/200x100?category=brand-logo',
    defaultAlt: 'Brand logo',
    className: 'h-12 w-auto object-contain',
}

/**
 * Hero/banner image configurations
 */
export const heroImageConfig = {
    placeholder: '/hero-construction.svg',
    defaultAlt: 'Construction and remodeling services',
    className: 'w-full h-full object-cover',
}

/**
 * Generate placeholder image URL for development
 */
export function generatePlaceholderUrl(
    width: number = 400,
    height: number = 300,
    category: string = 'general',
    text?: string
): string {
    const params = new URLSearchParams({
        width: width.toString(),
        height: height.toString(),
        category,
        ...(text && { text })
    })

    return `/api/placeholder?${params.toString()}`
}

/**
 * Validate image URL accessibility (client-side)
 */
export async function validateImageUrl(url: string): Promise<boolean> {
    try {
        const response = await fetch(url, { method: 'HEAD', mode: 'no-cors' })
        return true
    } catch {
        return false
    }
}

/**
 * Preload critical images
 */
export function preloadImage(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = reject
        img.src = src
    })
}

/**
 * Image lazy loading intersection observer
 */
export function createImageObserver(
    callback?: (entry: IntersectionObserverEntry) => void
): IntersectionObserver | null {
    if (typeof window === 'undefined') return null

    return new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement
                    const dataSrc = img.getAttribute('data-src')
                    if (dataSrc) {
                        img.src = dataSrc
                        img.removeAttribute('data-src')
                    }
                    callback?.(entry)
                }
            })
        },
        { threshold: 0.1 }
    )
}
