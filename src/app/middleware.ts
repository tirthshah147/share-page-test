import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const subdomain = host.split('.')[0] // Extract subdomain

  console.log(subdomain, host)

  const authUser = req.cookies.get('auth-user')?.value

  // If user is not authenticated, redirect to login
  if (!authUser && req.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Check if the request is coming from a subdomain
  if (subdomain !== 'founderled' && subdomain !== 'www') {
    console.log(req.url)
    return NextResponse.rewrite(new URL(`/dashboard`, req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'], // Apply to all dashboard routes
}
