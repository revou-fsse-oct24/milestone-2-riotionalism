import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                    request.nextUrl.pathname.startsWith('/register')
  const isApiRoute = request.nextUrl.pathname.startsWith('/api')

  // Protect API routes
  if (isApiRoute && !token) {
    return NextResponse.json(
      { message: 'Authentication required' },
      { status: 401 }
    )
  }

  // Redirect from auth pages if logged in
  if (isAuthPage && token) {
    return NextResponse.redirect(new URL('/products', request.url))
  }

  // Protect private pages
  if (!isAuthPage && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/products/:path*',
    '/cart/:path*',
    '/profile/:path*',
    '/api/:path*',
    '/login',
    '/register'
  ]
}