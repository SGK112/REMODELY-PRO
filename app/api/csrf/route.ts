import { NextRequest, NextResponse } from 'next/server'
import { generateCSRFToken } from '@/lib/csrf'
import { checkRateLimit, getClientIP, RATE_LIMITS } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  // Rate limit CSRF token requests
  const clientIP = getClientIP(request)
  const rateLimit = checkRateLimit(`csrf:${clientIP}`, RATE_LIMITS.API_GENERAL)
  
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: rateLimit.message },
      { status: 429 }
    )
  }
  
  const token = generateCSRFToken()
  
  return NextResponse.json({ csrfToken: token })
}
