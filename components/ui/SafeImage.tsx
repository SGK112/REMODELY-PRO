'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ImageConfig, handleImageError, getOptimizedImageUrl } from '@/lib/imageUtils'

interface SafeImageProps extends Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> {
    src: string | null | undefined
    alt: string
    fallback?: string
    fallbackText?: string
    showFallbackText?: boolean
    onError?: () => void
}

/**
 * Safe Image component with automatic fallback handling
 */
export function SafeImage({
    src,
    alt,
    fallback,
    fallbackText,
    showFallbackText = false,
    onError,
    className,
    ...props
}: SafeImageProps) {
    const [hasError, setHasError] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const imageUrl = getOptimizedImageUrl(src, fallback)

    const handleImageLoad = () => {
        setIsLoading(false)
    }

    const handleImageError = () => {
        setHasError(true)
        setIsLoading(false)
        onError?.()
    }

    if (hasError && showFallbackText && fallbackText) {
        return (
            <div
                className={`flex items-center justify-center bg-gray-100 text-gray-500 text-sm font-medium ${className}`}
                style={{
                    width: props.width,
                    height: props.height
                }}
            >
                {fallbackText}
            </div>
        )
    }

    return (
        <div className={`relative ${isLoading ? 'animate-pulse bg-gray-200' : ''}`}>
            <Image
                src={imageUrl}
                alt={alt}
                className={className}
                onLoad={handleImageLoad}
                onError={handleImageError}
                {...props}
            />
        </div>
    )
}

/**
 * Logo component with text fallback
 */
interface LogoProps {
    variant?: 'main' | 'small'
    className?: string
    showTextFallback?: boolean
}

export function Logo({ variant = 'main', className, showTextFallback = true }: LogoProps) {
    const [imageError, setImageError] = useState(false)

    const logoSrc = variant === 'main' ? '/logo-remodely.svg' : '/logo.svg'
    const logoText = variant === 'main' ? 'Remodely Pro' : 'RP'

    if (imageError && showTextFallback) {
        return (
            <span className={`font-bold text-blue-600 ${className}`}>
                {logoText}
            </span>
        )
    }

    return (
        <div className={`relative ${className}`}>
            <Image
                src={logoSrc}
                alt="Remodely Pro"
                width={variant === 'main' ? 200 : 32}
                height={variant === 'main' ? 60 : 32}
                className="object-contain"
                priority
                onError={() => setImageError(true)}
            />
        </div>
    )
}

/**
 * Contractor Avatar component
 */
interface ContractorAvatarProps {
    contractor: {
        name?: string
        businessName?: string
        image?: string | null
    }
    size?: 'sm' | 'md' | 'lg'
    className?: string
}

export function ContractorAvatar({ contractor, size = 'md', className }: ContractorAvatarProps) {
    const sizeClasses = {
        sm: 'w-8 h-8 text-xs',
        md: 'w-12 h-12 text-sm',
        lg: 'w-16 h-16 text-base'
    }

    const initials = (contractor.businessName || contractor.name || 'C')
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)

    return (
        <div className={`${sizeClasses[size]} rounded-full flex items-center justify-center ${className}`}>
            {contractor.image ? (
                <SafeImage
                    src={contractor.image}
                    alt={`${contractor.businessName || contractor.name} avatar`}
                    fallbackText={initials}
                    showFallbackText={true}
                    className={`${sizeClasses[size]} rounded-full object-cover`}
                    fill
                />
            ) : (
                <div className={`${sizeClasses[size]} rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center`}>
                    {initials}
                </div>
            )}
        </div>
    )
}

/**
 * Portfolio Image Grid component
 */
interface PortfolioImageGridProps {
    images: string[]
    alt: string
    className?: string
    maxImages?: number
}

export function PortfolioImageGrid({
    images,
    alt,
    className,
    maxImages = 4
}: PortfolioImageGridProps) {
    const displayImages = images.slice(0, maxImages)
    const remainingCount = images.length - maxImages

    if (displayImages.length === 0) {
        return (
            <div className={`bg-gray-100 flex items-center justify-center text-gray-500 ${className}`}>
                No images available
            </div>
        )
    }

    return (
        <div className={`grid grid-cols-2 gap-2 ${className}`}>
            {displayImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                    <SafeImage
                        src={image}
                        alt={`${alt} - Image ${index + 1}`}
                        className="rounded-lg object-cover"
                        fill
                    />
                    {index === maxImages - 1 && remainingCount > 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                            <span className="text-white font-semibold">
                                +{remainingCount} more
                            </span>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}
