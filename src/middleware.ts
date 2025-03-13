import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
}

export default async function middleware(req: Request) {
  const subdomains = [
    {
      subdomain: 'client1',
    },
    {
      subdomain: 'make',
    },
    {
      subdomain: 'test',
    },
  ]

  console.log('Middleware is working')
  const url = new URL(req.url)
  const hostname = req.headers.get('host') || ''

  // Define list of allowed domains
  // (including localhost and your deployed domain)
  const allowedDomains = ['localhost:3000', 'test.com:3000', 'founderled.co']

  // Check if the current hostname is in the list of allowed domains
  const isAllowedDomain = allowedDomains.some((domain) =>
    hostname.includes(domain),
  )

  console.log('isAllowedDomain', isAllowedDomain)

  // Extract the potential subdomain from the URL
  const subdomain = hostname.split('.')[0]

  console.log('subdomain', subdomain)

  // If user is on an allowed domain and it's not a subdomain, allow the request
  if (isAllowedDomain && !subdomains.some((d) => d.subdomain === subdomain)) {
    return NextResponse.next()
  }

  const subdomainData = subdomains.find((d) => d.subdomain === subdomain)

  console.log('subdomainData', subdomainData)
  console.log(url.pathname)

  if (subdomainData) {
    // Rewrite the URL to a dynamic path based on the subdomain
    return NextResponse.rewrite(
      new URL(`/${subdomain}${url.pathname}`, req.url),
    )
  }

  return new Response(null, { status: 404 })
}
