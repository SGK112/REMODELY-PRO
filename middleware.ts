import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/profile',
  '/admin',
  '/api/user',
  '/api/upload',
  '/api/sms',
  '/api/voice',
  '/api/quotes',
  '/api/contractors/profile',
  '/api/scrape'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    // Get the token from the request
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET
    })

    // If no token, redirect to login
    if (!token) {
      // For API routes, return 401
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      }

      // For page routes, redirect to login
      const loginUrl = new URL('/signup', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Role-based access control for dashboard routes
    if (pathname.startsWith('/dashboard/contractor') && token.userType !== 'CONTRACTOR') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Contractor access required' },
          { status: 403 }
        )
      }
      // Redirect to appropriate dashboard instead of returning JSON
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (pathname.startsWith('/dashboard/customer') && token.userType !== 'CUSTOMER') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Customer access required' },
          { status: 403 }
        )
      }
      // Redirect to appropriate dashboard instead of returning JSON
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (pathname.startsWith('/dashboard/admin') && token.userType !== 'ADMIN') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        )
      }
      // Redirect to appropriate dashboard instead of returning JSON
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (pathname.startsWith('/admin') && token.userType !== 'ADMIN') {
      if (pathname.startsWith('/api/')) {
        return NextResponse.json(
          { error: 'Admin access required' },
          { status: 403 }
        )
      }
      // Redirect to login for admin routes
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/quotes/:path*',
    '/api/contractors/:path*',
    '/api/auth/:path*',
    '/api/scrape',
    '/api/sms',
    '/api/voice'
  ]
}
