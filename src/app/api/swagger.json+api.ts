/**
 * @swagger
 * /api/swagger.json:
 *   get:
 *     summary: Get Swagger JSON specification
 *     description: Returns the OpenAPI 3.0 specification for all API endpoints
 *     tags: [Documentation]
 *     responses:
 *       200:
 *         description: OpenAPI 3.0 specification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
export async function GET() {
  try {
    let swaggerSpec;

    try {
      // Try to import the generated specification
      const { swaggerSpec: generatedSpec } = await import('@/spec/swagger-spec');
      swaggerSpec = generatedSpec;
    } catch (error) {
      // Fallback to static specification if generated file doesn't exist
      console.warn('Generated swagger-spec.ts not found, using fallback specification', error);

      // Static fallback specification
      swaggerSpec = {
        openapi: '3.0.0',
        info: {
          title: 'PrepAI API Documentation',
          version: '1.0.0',
          description:
            'API documentation for PrepAI - A comprehensive meal planning and nutrition tracking application',
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
            url: 'https://your-production-domain.com',
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
        paths: {},
      };
    }

    return Response.json(swaggerSpec, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving Swagger JSON:', error);
    return Response.json(
      {
        error: 'Failed to serve Swagger specification',
        message: 'An error occurred while serving the API specification',
      },
      { status: 500 }
    );
  }
}
