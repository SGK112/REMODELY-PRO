'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ContractorImageProps {
    src: string
    alt: string
    className?: string
    fallbackSrc?: string
}

export default function ContractorImage({
    src,
    alt,
    className = '',
    fallbackSrc
}: ContractorImageProps) {
    const [imgSrc, setImgSrc] = useState(src)
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const handleError = () => {
        if (fallbackSrc && imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc)
            setHasError(false)
        } else {
            setHasError(true)
        }
        setIsLoading(false)
    }

    const handleLoad = () => {
        setIsLoading(false)
        setHasError(false)
    }

    if (hasError) {
        return (
            <div className={`bg-gray-200 flex items-center justify-center ${className}`}>
                <div className="text-gray-400 text-sm text-center p-4">
                    <svg className="w-8 h-8 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                    Image not available
                </div>
            </div>
        )
    }

    return (
        <div className={`relative ${className}`}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <div className="text-gray-400">Loading...</div>
                </div>
            )}
            <img
                src={imgSrc}
                alt={alt}
                className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                onLoad={handleLoad}
                onError={handleError}
            />
        </div>
    )
}
