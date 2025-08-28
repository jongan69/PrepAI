import { CONFIG, RateLimiter, getClientIP, createSuccessResponse } from '../../lib/api-utils';

export function GET(request: Request) {
  const clientIP = getClientIP(request);

  // Rate limiting check
  if (!RateLimiter.checkRateLimit(clientIP)) {
    return Response.json(
      {
        error: 'Rate limit exceeded',
        message: 'Too many requests. Please try again later.',
        retryAfter: '15 minutes',
      },
      {
        status: 429,
        headers: {
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': new Date(Date.now() + 900000).toISOString(),
        },
      }
    );
  }

  return createSuccessResponse(
    {
      status: 'ok',
      timestamp: new Date().toISOString(),
      message: 'Server is running',
      version: '1.0.0',
      services: {
        kroger: CONFIG.KROGER.CLIENT_ID !== 'demo_client_id',
        edamam: !!(CONFIG.EDAMAM.APP_ID && CONFIG.EDAMAM.APP_KEY),
        aiml: !!CONFIG.AIML.API_KEY,
      },
      rateLimit: {
        remaining: RateLimiter.getRemainingRequests(clientIP),
        resetTime: new Date(Date.now() + 900000).toISOString(),
      },
    },
    200
  );
}
