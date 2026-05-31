import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Extremely basic in-memory store for edge rate limiting (demo purposes only)
// For a real production app on Vercel, use @upstash/ratelimit with Redis
const rateLimitMap = new Map<string, { count: number, timestamp: number }>();

const RATE_LIMIT = 50; // Max requests
const TIME_WINDOW = 60 * 1000; // 1 minute window

export function middleware(request: NextRequest) {
  // Only rate limit API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const ip = request.ip ?? '127.0.0.1';
    const now = Date.now();
    
    const windowStart = now - TIME_WINDOW;
    const requestData = rateLimitMap.get(ip);
    
    if (!requestData || requestData.timestamp < windowStart) {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    } else {
      requestData.count++;
      if (requestData.count > RATE_LIMIT) {
        return new NextResponse(
          JSON.stringify({ error: 'Too Many Requests', message: 'You have exceeded the rate limit. Please try again later.' }),
          { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }
  }

  // Security Headers
  const response = NextResponse.next();
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
