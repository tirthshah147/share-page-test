// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const url = req.nextUrl.clone()

  console.log('host', host)

  // If the request is coming from the main domain, continue normally.
  if (host === 'founderled.co' || 'www.founderled.co') {
    return NextResponse.next()
  }

  // Split the host by dot to check for subdomain.
  const hostParts = host.split('.')
  const subdomain = hostParts[0]

  console.log('subdomain', subdomain)

  // For our main domain (e.g. client1.founderled.co) or any other domain with a subdomain,
  // we assume that if there are more than 2 parts, the first part is the subdomain.

  // Rewrite the URL to include the subdomain as part of the path.
  // For example, if the original pathname is "/about" and the subdomain is "client1",
  // the new pathname will be "/client1/about".
  return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url))
}

// Apply the middleware to all routes.
export const config = {
  matcher: '/:path*',
}
