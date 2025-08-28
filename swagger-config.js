module.exports = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'PrepAI API Documentation',
      version: '1.0.0',
      description: 'API documentation for PrepAI - A comprehensive meal planning and nutrition tracking application',
      contact: {
        name: 'PrepAI Development Team',
        email: 'support@prepai.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: 'http://localhost:8081',
        description: 'Development server',
      },
      {
        url: 'https://jongan69-prepai.expo.app',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error type',
            },
            message: {
              type: 'string',
              description: 'Error message',
            },
            statusCode: {
              type: 'integer',
              description: 'HTTP status code',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Success status',
            },
            data: {
              type: 'object',
              description: 'Response data',
            },
            message: {
              type: 'string',
              description: 'Success message',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/app/api/**/*.ts'], // Path to the API docs
  options: {
    swaggerDefinition: {
      openapi: '3.0.0',
    },
  },
};
