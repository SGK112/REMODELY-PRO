'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { EnhancedImageService } from '@/lib/enhancedImageService'

interface ProfessionalImageProps {
    src?: string | null
    alt: string
    width: number
    height: number
    category?: 'contractor-profile' | 'contractor-business' | 'granite-countertop' | 'quartz-countertop' | 'kitchen-project' | 'manufacturer-logo' | 'default'
    className?: string
    priority?: boolean
    loading?: 'lazy' | 'eager'
    quality?: number
    sizes?: string
    onLoad?: () => void
    onError?: () => void
}

export function ProfessionalImage({
    src,
    alt,
    width,
    height,
    category = 'default',
    className = '',
    priority = false,
    loading = 'lazy',
    quality = 85,
    sizes,
    onLoad,
    onError
}: ProfessionalImageProps) {
    const [imageError, setImageError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Generate optimized image URL or fallback to placeholder
    const imageUrl = src && !imageError
        ? EnhancedImageService.getOptimizedImage(src, 'contractor', 'profile', { width, height, quality })
        : `/api/placeholder/${width}x${height}?category=${category}`

    const handleLoad = useCallback(() => {
        setIsLoading(false)
        onLoad?.()
    }, [onLoad])

    const handleError = useCallback(() => {
        setImageError(true)
        setIsLoading(false)
        onError?.()
    }, [onError])

    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Loading skeleton */}
            {isLoading && (
                <div 
                    className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 rounded-lg"
                    style={{ width, height }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
            )}

            {/* Main image */}
            <Image
                src={imageUrl}
                alt={alt}
                width={width}
                height={height}
                priority={priority}
                {...(!priority && { loading })}
                quality={quality}
                sizes={sizes}
                className={`
                    transition-all duration-300 ease-out
                    ${isLoading ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
                    ${!src || imageError ? 'object-contain' : 'object-cover'}
                    rounded-lg shadow-sm hover:shadow-md
                `}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                    filter: isLoading ? 'blur(8px)' : 'blur(0px)',
                }}
            />

            {/* Professional overlay for enhanced visual appeal */}
            {!imageError && src && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-white/5 pointer-events-none rounded-lg" />
            )}

            {/* Corner accent for branding */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[15px] border-b-[15px] border-l-transparent border-b-primary/10 rounded-tr-lg" />
        </div>
    )
}

// Responsive image wrapper for common use cases
export function ResponsiveImage({
    src,
    alt,
    category,
    className = '',
    aspectRatio = '16/9',
    maxWidth = 800,
    ...props
}: Omit<ProfessionalImageProps, 'width' | 'height'> & {
    aspectRatio?: string
    maxWidth?: number
}) {
    // Calculate dimensions based on aspect ratio
    const [ratioWidth, ratioHeight] = aspectRatio.split('/').map(Number)
    const width = maxWidth
    const height = Math.round((width * ratioHeight) / ratioWidth)

    return (
        <div className={`w-full max-w-[${maxWidth}px] ${className}`}>
            <ProfessionalImage
                src={src}
                alt={alt}
                width={width}
                height={height}
                category={category}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                {...props}
            />
        </div>
    )
}

// Avatar component for contractor profiles
export function ContractorAvatar({
    src,
    name,
    size = 80,
    className = ''
}: {
    src?: string | null
    name: string
    size?: number
    className?: string
}) {
    return (
        <div className={`relative ${className}`}>
            <ProfessionalImage
                src={src}
                alt={`${name} profile picture`}
                width={size}
                height={size}
                category="contractor-profile"
                className="rounded-full border-2 border-white shadow-lg"
                priority
            />
            
            {/* Online status indicator (can be made dynamic) */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm" />
        </div>
    )
}

// Material sample component
export function MaterialSample({
    src,
    materialName,
    materialType,
    size = 150,
    className = ''
}: {
    src?: string | null
    materialName: string
    materialType: 'granite' | 'quartz' | 'marble' | 'other'
    size?: number
    className?: string
}) {
    const category = materialType === 'granite' 
        ? 'granite-countertop' 
        : materialType === 'quartz' 
        ? 'quartz-countertop' 
        : 'default'

    return (
        <div className={`relative group ${className}`}>
            <ProfessionalImage
                src={src}
                alt={`${materialName} ${materialType} sample`}
                width={size}
                height={size}
                category={category}
                className="rounded-lg border border-gray-200 group-hover:border-primary/20 transition-colors"
            />
            
            {/* Material info overlay */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-2 rounded-b-lg">
                <p className="text-white text-xs font-medium truncate">{materialName}</p>
                <p className="text-white/80 text-xs capitalize">{materialType}</p>
            </div>
        </div>
    )
}
