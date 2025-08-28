import { CONFIG } from '@/lib/api-utils';

/**
 * @swagger
 * components:
 *   schemas:
 *     ServiceStatus:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           enum: [configured, not_configured]
 *           description: Service configuration status
 *         message:
 *           type: string
 *           description: Human-readable status message
 *     HealthStatus:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "ok"
 *         timestamp:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T10:30:00.000Z"
 *         services:
 *           type: object
 *           properties:
 *             kroger:
 *               $ref: '#/components/schemas/ServiceStatus'
 *             edamam:
 *               $ref: '#/components/schemas/ServiceStatus'
 *             aiml:
 *               $ref: '#/components/schemas/ServiceStatus'
 *         endpoints:
 *           type: array
 *           items:
 *             type: string
 *           description: List of available API endpoints
 */

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Detailed health check
 *     description: Returns detailed health status of all services and available endpoints
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Health status retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthStatus'
 */
export function GET() {
  const healthStatus = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      kroger: {
        status: CONFIG.KROGER.CLIENT_ID !== 'demo_client_id' ? 'configured' : 'not_configured',
        message:
          CONFIG.KROGER.CLIENT_ID !== 'demo_client_id'
            ? 'Kroger API credentials available'
            : 'Kroger API credentials not configured',
      },
      edamam: {
        status: !!(CONFIG.EDAMAM.APP_ID && CONFIG.EDAMAM.APP_KEY) ? 'configured' : 'not_configured',
        message: !!(CONFIG.EDAMAM.APP_ID && CONFIG.EDAMAM.APP_KEY)
          ? 'Edamam API credentials available'
          : 'Edamam API credentials not configured',
      },
      aiml: {
        status: !!CONFIG.AIML.API_KEY ? 'configured' : 'not_configured',
        message: !!CONFIG.AIML.API_KEY ? 'AIML API credentials available' : 'AIML API credentials not configured',
      },
    },
    endpoints: [
      'GET /api/ping - Health check',
      'GET /api/health - Detailed health check',
      'GET /api/locations - Kroger store locations',
      'GET /api/products - Kroger product search',
      'GET /api/recipes - Edamam recipe search',
      'POST /api/meal-plan - Generate meal plans and shopping lists',
      'POST /api/image-meal-plan - Extract ingredients from images',
    ],
  };

  return Response.json(healthStatus);
}
