'use client'

import { motion } from 'framer-motion'
import { 
  CheckCircle, 
  Shield, 
  Star, 
  Award, 
  Zap, 
  Clock,
  AlertCircle,
  Crown
} from 'lucide-react'

interface StatusBadgeProps {
  type: 'verified' | 'premium' | 'featured' | 'new' | 'trending' | 'top-rated' | 'quick-response' | 'elite'
  className?: string
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

export function StatusBadge({ 
  type, 
  className = '', 
  size = 'md',
  animated = true 
}: StatusBadgeProps) {
  const configs = {
    verified: {
      icon: CheckCircle,
      label: 'Verified',
      bgColor: 'bg-green-100',
      textColor: 'text-green-800',
      borderColor: 'border-green-200',
      glowColor: 'shadow-green-200/50'
    },
    premium: {
      icon: Crown,
      label: 'Premium',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-800',
      borderColor: 'border-purple-200',
      glowColor: 'shadow-purple-200/50'
    },
    featured: {
      icon: Star,
      label: 'Featured',
      bgColor: 'bg-yellow-100',
      textColor: 'text-yellow-800',
      borderColor: 'border-yellow-200',
      glowColor: 'shadow-yellow-200/50'
    },
    new: {
      icon: Zap,
      label: 'New',
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-200',
      glowColor: 'shadow-blue-200/50'
    },
    trending: {
      icon: Zap,
      label: 'Trending',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-800',
      borderColor: 'border-orange-200',
      glowColor: 'shadow-orange-200/50'
    },
    'top-rated': {
      icon: Award,
      label: 'Top Rated',
      bgColor: 'bg-indigo-100',
      textColor: 'text-indigo-800',
      borderColor: 'border-indigo-200',
      glowColor: 'shadow-indigo-200/50'
    },
    'quick-response': {
      icon: Clock,
      label: 'Quick Response',
      bgColor: 'bg-teal-100',
      textColor: 'text-teal-800',
      borderColor: 'border-teal-200',
      glowColor: 'shadow-teal-200/50'
    },
    elite: {
      icon: Shield,
      label: 'Elite Pro',
      bgColor: 'bg-gradient-to-r from-amber-100 to-orange-100',
      textColor: 'text-amber-800',
      borderColor: 'border-amber-200',
      glowColor: 'shadow-amber-200/50'
    }
  }

  const config = configs[type]
  const Icon = config.icon

  const sizeClasses = {
    sm: {
      container: 'px-2 py-1 text-xs',
      icon: 'w-3 h-3'
    },
    md: {
      container: 'px-3 py-1.5 text-sm',
      icon: 'w-4 h-4'
    },
    lg: {
      container: 'px-4 py-2 text-base',
      icon: 'w-5 h-5'
    }
  }

  const BadgeContent = (
    <div className={`
      inline-flex items-center gap-1.5 rounded-full font-medium border
      ${config.bgColor} ${config.textColor} ${config.borderColor}
      ${sizeClasses[size].container}
      ${animated ? 'transition-all duration-200 hover:scale-105' : ''}
      ${className}
    `}>
      <Icon className={sizeClasses[size].icon} />
      <span>{config.label}</span>
    </div>
  )

  if (animated) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        className="inline-block"
      >
        {BadgeContent}
      </motion.div>
    )
  }

  return BadgeContent
}

// Contractor rating component
export function ProfessionalRating({ 
  rating, 
  reviewCount, 
  showCount = true,
  size = 'md',
  className = '' 
}: {
  rating: number
  reviewCount: number
  showCount?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) {
  const sizeClasses = {
    sm: {
      star: 'w-3 h-3',
      text: 'text-xs'
    },
    md: {
      star: 'w-4 h-4',
      text: 'text-sm'
    },
    lg: {
      star: 'w-5 h-5',
      text: 'text-base'
    }
  }

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`
              ${sizeClasses[size].star}
              ${star <= rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
              }
            `}
          />
        ))}
      </div>
      <span className={`font-medium text-gray-900 ${sizeClasses[size].text}`}>
        {rating.toFixed(1)}
      </span>
      {showCount && (
        <span className={`text-gray-500 ${sizeClasses[size].text}`}>
          ({reviewCount.toLocaleString()})
        </span>
      )}
    </div>
  )
}

// Professional experience indicator
export function ExperienceIndicator({ 
  years, 
  className = '' 
}: { 
  years: number
  className?: string 
}) {
  const getExperienceLevel = (years: number) => {
    if (years >= 15) return { level: 'Master', color: 'text-purple-700', bg: 'bg-purple-100' }
    if (years >= 10) return { level: 'Expert', color: 'text-blue-700', bg: 'bg-blue-100' }
    if (years >= 5) return { level: 'Professional', color: 'text-green-700', bg: 'bg-green-100' }
    return { level: 'Skilled', color: 'text-gray-700', bg: 'bg-gray-100' }
  }

  const experience = getExperienceLevel(years)

  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium
      ${experience.bg} ${experience.color} ${className}
    `}>
      <span>{years} years</span>
      <span className="text-xs opacity-75">• {experience.level}</span>
    </div>
  )
}

// Response time indicator
export function ResponseTimeIndicator({ 
  averageHours, 
  className = '' 
}: { 
  averageHours: number
  className?: string 
}) {
  const getResponseConfig = (hours: number) => {
    if (hours <= 1) return { 
      label: 'Usually responds within 1 hour', 
      color: 'text-green-700', 
      bg: 'bg-green-50',
      icon: Zap 
    }
    if (hours <= 4) return { 
      label: 'Usually responds within 4 hours', 
      color: 'text-blue-700', 
      bg: 'bg-blue-50',
      icon: Clock 
    }
    if (hours <= 24) return { 
      label: 'Usually responds within 1 day', 
      color: 'text-yellow-700', 
      bg: 'bg-yellow-50',
      icon: Clock 
    }
    return { 
      label: 'Response time varies', 
      color: 'text-gray-700', 
      bg: 'bg-gray-50',
      icon: AlertCircle 
    }
  }

  const config = getResponseConfig(averageHours)
  const Icon = config.icon

  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm
      ${config.bg} ${config.color} ${className}
    `}>
      <Icon className="w-4 h-4" />
      <span>{config.label}</span>
    </div>
  )
}

// Combined contractor status display
export function ContractorStatus({ 
  contractor,
  className = '' 
}: { 
  contractor: {
    verified?: boolean
    premium?: boolean
    featured?: boolean
    rating: number
    reviewCount: number
    yearsExperience: number
    averageResponseHours?: number
  }
  className?: string 
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {contractor.verified && <StatusBadge type="verified" size="sm" />}
        {contractor.premium && <StatusBadge type="premium" size="sm" />}
        {contractor.featured && <StatusBadge type="featured" size="sm" />}
        {contractor.rating >= 4.8 && <StatusBadge type="top-rated" size="sm" />}
        {contractor.yearsExperience >= 15 && <StatusBadge type="elite" size="sm" />}
      </div>
      
      <ProfessionalRating 
        rating={contractor.rating} 
        reviewCount={contractor.reviewCount}
        size="sm"
      />
      
      <div className="flex flex-wrap gap-2 text-xs text-gray-600">
        <ExperienceIndicator years={contractor.yearsExperience} />
        {contractor.averageResponseHours && (
          <ResponseTimeIndicator averageHours={contractor.averageResponseHours} />
        )}
      </div>
    </div>
  )
}
