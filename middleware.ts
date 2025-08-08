import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const { pathname } = request.nextUrl

  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/auth/login',
    '/auth/signin',
    '/auth/register',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/auth/error',
    '/contractors',
    '/search',
    '/quote',
    '/quote/request',
    '/plans',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/business-model',
    '/blog',
    '/careers',
    '/developers',
    '/cookies',
    // Service pages
    '/concrete',
    '/framing',
    '/handyman',
    '/hvac',
    '/roofing',
    // AI Tools - Public Landing Pages
    '/ai-tools',
    '/ai-chat',
    '/ai-transform',
    '/voice-consultation',
    '/voice-translator',
    '/marketplace',
    '/marketplace/sell',
    // Apps - Public demos
    '/apps',
    '/apps/ai-voice-assistants',
    '/apps/cabinet-designer',
    '/apps/countertop-analyzer',
    '/apps/framing-calculator',
    '/apps/handyman-assistant',
    '/apps/roofing-measurement',
    '/apps/voice-translation',
    // Pro tools
    '/pro',
    '/pro/crypto',
    '/pro/financial',
    '/pro/payments',
    '/pro/quickbooks',
    '/white-label',
    '/consultation',
    '/checkout',
    '/tokens',
    '/tokens/purchase',
    // API endpoints
    '/api/health',
    '/api/contractors',
    '/api/auth',
    '/api/ai',
    '/api/ai-services',
    '/api/ai-test',
    '/api/ai-health',
    '/api/ai-transform',
    '/api/ai-transform-enhanced',
    '/api/ai-transform-with-generation',
    '/api/ai-designer',
    '/api/voice-translation',
    '/api/voice/text-to-speech',
    '/api/voice/david-agent',
    '/api/voice/sarah-agent',
    '/api/marketplace',
    '/api/ai-tools/usage',
    '/api/placeholder',
    '/api/csrf',
    '/api/verify-phone',
    '/api/sms-status'
  ]

  // Static asset paths that should always be accessible
  const staticAssetPaths = [
    '/_next',
    '/favicon.ico',
    '/logo-remodely.svg',
    '/logo.svg',
    '/brands',
    '/uploads',
    '/static'
  ]

  // Image file extensions that should always be accessible
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.ico']
  const isImageFile = imageExtensions.some(ext => pathname.toLowerCase().endsWith(ext))

  // Check if current path is a static asset
  const isStaticAsset = staticAssetPaths.some(path =>
    pathname.startsWith(path)
  ) || isImageFile

  // Allow static assets
  if (isStaticAsset) {
    return NextResponse.next()
  }

  // Check if current path is public
  const isPublicPath = publicPaths.some(path =>
    pathname === path || pathname.startsWith(`${path}/`)
  )

  // API routes that require authentication
  const protectedApiRoutes = [
    '/api/user',
    '/api/quotes',
    '/api/bookings',
    '/api/payments',
    '/api/reviews'
  ]

  // Admin routes
  const adminRoutes = ['/admin', '/api/admin', '/api/scrape']

  // Dashboard routes
  const dashboardRoutes = ['/dashboard']

  // Allow public paths
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Redirect unauthenticated users to login
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Check admin access
  if (adminRoutes.some(route => pathname.startsWith(route))) {
    if (token.userType !== 'ADMIN') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        )
      }
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Check dashboard access and redirect based on user type
  if (dashboardRoutes.some(route => pathname.startsWith(route))) {
    const userType = token.userType as string

    if (pathname === '/dashboard') {
      // Redirect to appropriate dashboard based on user type
      switch (userType) {
        case 'ADMIN':
          return NextResponse.redirect(new URL('/dashboard/admin', request.url))
        case 'CONTRACTOR':
          return NextResponse.redirect(new URL('/dashboard/contractor', request.url))
        case 'CUSTOMER':
        default:
          return NextResponse.redirect(new URL('/dashboard/customer', request.url))
      }
    }

    // Check role-specific dashboard access
    if (pathname.startsWith('/dashboard/admin') && userType !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (pathname.startsWith('/dashboard/contractor') && userType !== 'CONTRACTOR') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    if (pathname.startsWith('/dashboard/customer') && userType !== 'CUSTOMER') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  // Check protected API routes
  if (protectedApiRoutes.some(route => pathname.startsWith(route))) {
    // Additional API-specific checks can be added here
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
