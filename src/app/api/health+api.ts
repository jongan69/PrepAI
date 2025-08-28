// API Configuration
const CONFIG = {
  KROGER: {
    CLIENT_ID: process.env.KROGER_CLIENT_ID || 'demo_client_id',
    CLIENT_SECRET: process.env.KROGER_CLIENT_SECRET || 'demo_client_secret',
  },
  AIML: {
    BASE_URL: process.env.AIML_BASE_URL || 'https://api.aimlapi.com',
    API_KEY: process.env.AIMLAPI_KEY,
    MODEL: process.env.AIML_MODEL || 'openai/gpt-4o',
  },
  EDAMAM: {
    APP_ID: process.env.EDAMAM_APP_ID,
    APP_KEY: process.env.EDAMAM_APP_KEY,
  },
};

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
