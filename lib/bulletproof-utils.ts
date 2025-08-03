// BULLETPROOF: Common validation utilities
// Safe utility functions that enhance security without breaking builds

export class ValidationUtils {
    // Sanitize string inputs
    static sanitizeString(input: any, maxLength: number = 1000): string {
        if (typeof input !== 'string') return ''
        return input.trim().substring(0, maxLength)
    }

    // Validate email format
    static isValidEmail(email: any): boolean {
        if (typeof email !== 'string') return false
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email) && email.length <= 254
    }

    // Validate phone number format
    static isValidPhone(phone: any): boolean {
        if (typeof phone !== 'string') return false
        const phoneRegex = /^\+?[\d\s\-\(\)]{10,15}$/
        return phoneRegex.test(phone.replace(/\s/g, ''))
    }

    // Sanitize and validate numbers
    static parseNumber(input: any, min: number = 0, max: number = Number.MAX_SAFE_INTEGER): number | null {
        if (typeof input === 'number') {
            return isNaN(input) ? null : Math.min(max, Math.max(min, input))
        }
        if (typeof input === 'string') {
            const parsed = parseFloat(input)
            return isNaN(parsed) ? null : Math.min(max, Math.max(min, parsed))
        }
        return null
    }

    // Validate pagination parameters
    static validatePagination(page: any, limit: any): { page: number; limit: number } {
        const validPage = Math.max(1, parseInt(page) || 1)
        const validLimit = Math.min(100, Math.max(1, parseInt(limit) || 10))
        return { page: validPage, limit: validLimit }
    }

    // Rate limiting helper
    static isRateLimited(ip: string, maxRequests: number = 100, windowMs: number = 15 * 60 * 1000): boolean {
        // This is a placeholder - in production you'd use Redis or similar
        // For now, just return false to not block anything
        return false
    }
}

export class SecurityUtils {
    // Check for common injection patterns (basic protection)
    static containsSuspiciousPatterns(input: string): boolean {
        const suspiciousPatterns = [
            /script/i,
            /javascript/i,
            /on\w+=/i,
            /href\s*=/i,
            /src\s*=/i,
            /<\s*\w+/,
            /\{\{.*\}\}/,
            /\$\{.*\}/
        ]
        return suspiciousPatterns.some(pattern => pattern.test(input))
    }

    // Sanitize HTML/JS content
    static sanitizeContent(input: string): string {
        return input
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;')
            .replace(/\//g, '&#x2F;')
    }
}

export class ResponseUtils {
    // Standardized error responses
    static errorResponse(message: string, status: number = 500, details?: any) {
        return {
            error: message,
            timestamp: new Date().toISOString(),
            ...(details && { details })
        }
    }

    // Standardized success responses
    static successResponse(data: any, message?: string) {
        return {
            success: true,
            data,
            timestamp: new Date().toISOString(),
            ...(message && { message })
        }
    }
}
