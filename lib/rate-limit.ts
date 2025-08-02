import { NextRequest } from 'next/server'

interface RateLimitConfig {
  windowMs: number // Time window in milliseconds
  maxRequests: number // Maximum requests per window
  message?: string
}

// In-memory store for rate limiting (use Redis in production)
const store = new Map<string, { count: number; resetTime: number }>()

/**
 * Simple in-memory rate limiter
 * For production, use Redis or a dedicated rate limiting service
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { success: boolean; message?: string; resetTime?: number } {
  const now = Date.now()
  const key = `rate_limit:${identifier}`
  
  // Clean up expired entries
  if (store.size > 10000) {
    const keysToDelete: string[] = []
    store.forEach((v, k) => {
      if (v.resetTime < now) {
        keysToDelete.push(k)
      }
    })
    keysToDelete.forEach(k => store.delete(k))
  }
  
  const record = store.get(key)
  
  if (!record || record.resetTime < now) {
    // First request or window expired
    store.set(key, {
      count: 1,
      resetTime: now + config.windowMs
    })
    return { success: true }
  }
  
  if (record.count >= config.maxRequests) {
    return {
      success: false,
      message: config.message || 'Rate limit exceeded',
      resetTime: record.resetTime
    }
  }
  
  // Increment counter
  record.count++
  store.set(key, record)
  
  return { success: true }
}

/**
 * Get client IP address from request
 */
export function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  const realIP = request.headers.get('x-real-ip')
  
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }
  
  if (realIP) {
    return realIP
  }
  
  // Fallback for development
  return 'unknown-ip'
}

/**
 * Rate limit configurations
 */
export const RATE_LIMITS = {
  LOGIN: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 5, // 5 attempts per 15 minutes
    message: 'Too many login attempts. Please try again in 15 minutes.'
  },
  REGISTER: {
    windowMs: 60 * 60 * 1000, // 1 hour
    maxRequests: 3, // 3 registrations per hour per IP
    message: 'Too many registration attempts. Please try again in 1 hour.'
  },
  API_GENERAL: {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 100, // 100 requests per minute
    message: 'Rate limit exceeded. Please slow down.'
  },
  SMS: {
    windowMs: 5 * 60 * 1000, // 5 minutes
    maxRequests: 3, // 3 SMS per 5 minutes
    message: 'SMS rate limit exceeded. Please wait before sending another message.'
  }
} as const
