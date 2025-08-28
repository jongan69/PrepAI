import { CONFIG, RateLimiter, getClientIP, createSuccessResponse } from '@/lib/api-utils';

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns server status and service availability information
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is healthy and running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: "ok"
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-01-15T10:30:00.000Z"
 *                 message:
 *                   type: string
 *                   example: "Server is running"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 *                 services:
 *                   type: object
 *                   properties:
 *                     kroger:
 *                       type: boolean
 *                       description: Kroger API service status
 *                     edamam:
 *                       type: boolean
 *                       description: Edamam API service status
 *                     aiml:
 *                       type: boolean
 *                       description: AI/ML service status
 *                 rateLimit:
 *                   type: object
 *                   properties:
 *                     remaining:
 *                       type: integer
 *                       description: Remaining requests allowed
 *                     resetTime:
 *                       type: string
 *                       format: date-time
 *                       description: When the rate limit resets
 *       429:
 *         description: Rate limit exceeded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Rate limit exceeded"
 *                 message:
 *                   type: string
 *                   example: "Too many requests. Please try again later."
 *                 retryAfter:
 *                   type: string
 *                   example: "15 minutes"
 */
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
