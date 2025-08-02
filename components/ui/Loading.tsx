'use client'

import { motion } from 'framer-motion'

interface LoadingSkeletonProps {
    className?: string
    variant?: 'card' | 'avatar' | 'text' | 'image' | 'button'
    count?: number
}

export function LoadingSkeleton({ 
    className = '', 
    variant = 'card',
    count = 1 
}: LoadingSkeletonProps) {
    const getSkeletonElement = () => {
        switch (variant) {
            case 'avatar':
                return (
                    <div className={`bg-gray-200 rounded-full animate-pulse ${className}`} 
                         style={{ width: '48px', height: '48px' }} />
                )
            
            case 'text':
                return (
                    <div className={`bg-gray-200 h-4 rounded animate-pulse ${className}`} />
                )
            
            case 'image':
                return (
                    <div className={`bg-gray-200 rounded-lg animate-pulse ${className}`} />
                )
            
            case 'button':
                return (
                    <div className={`bg-gray-200 h-10 rounded-md animate-pulse ${className}`} />
                )
            
            case 'card':
            default:
                return (
                    <div className={`bg-white rounded-lg shadow-md p-6 animate-pulse ${className}`}>
                        <div className="flex items-center space-x-4 mb-4">
                            <div className="bg-gray-200 h-12 w-12 rounded-full" />
                            <div className="space-y-2 flex-1">
                                <div className="bg-gray-200 h-4 rounded w-3/4" />
                                <div className="bg-gray-200 h-3 rounded w-1/2" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <div className="bg-gray-200 h-4 rounded" />
                            <div className="bg-gray-200 h-4 rounded w-5/6" />
                            <div className="bg-gray-200 h-4 rounded w-4/6" />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div className="bg-gray-200 h-8 w-20 rounded" />
                            <div className="bg-gray-200 h-8 w-24 rounded" />
                        </div>
                    </div>
                )
        }
    }

    return (
        <>
            {Array.from({ length: count }, (_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                >
                    {getSkeletonElement()}
                </motion.div>
            ))}
        </>
    )
}

// Professional loading spinner
export function LoadingSpinner({ 
    size = 'md', 
    className = '' 
}: { 
    size?: 'sm' | 'md' | 'lg'
    className?: string 
}) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    }

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <div className={`
                ${sizeClasses[size]} 
                border-2 border-gray-200 border-t-primary 
                rounded-full animate-spin
            `} />
        </div>
    )
}

// Professional page loading component
export function PageLoading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-16 h-16 border-4 border-gray-200 border-t-primary rounded-full mx-auto mb-4"
                />
                <motion.h3
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-lg font-semibold text-gray-700 mb-2"
                >
                    Loading New Countertops
                </motion.h3>
                <p className="text-gray-500">Finding the best contractors for you...</p>
            </motion.div>
        </div>
    )
}

// Search loading component
export function SearchLoading() {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-center py-8">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-8 h-8 border-2 border-gray-200 border-t-primary rounded-full"
                />
                <span className="ml-3 text-gray-600">Searching contractors...</span>
            </div>
            <LoadingSkeleton variant="card" count={3} />
        </div>
    )
}
