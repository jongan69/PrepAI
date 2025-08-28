import swaggerJsdoc from 'swagger-jsdoc';
import swaggerConfig from '../../../swagger-config.js';

/**
 * @swagger
 * /api/docs:
 *   get:
 *     summary: Get API documentation
 *     description: Returns the Swagger UI documentation for all API endpoints
 *     tags: [Documentation]
 *     responses:
 *       200:
 *         description: HTML page with Swagger UI documentation
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 */
export function GET(request: Request) {
  try {
    // Generate the Swagger specification
    const specs = swaggerJsdoc(swaggerConfig);

    // Create HTML content for Swagger UI
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PrepAI API Documentation</title>
    <link rel="stylesheet" type="text/css" href="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui.css" />
    <style>
        html {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
        }
        *, *:before, *:after {
            box-sizing: inherit;
        }
        body {
            margin:0;
            background: #fafafa;
        }
    </style>
</head>
<body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-bundle.js"></script>
    <script src="https://unpkg.com/swagger-ui-dist@5.9.0/swagger-ui-standalone-preset.js"></script>
    <script>
        window.onload = function() {
            const ui = SwaggerUIBundle({
                spec: ${JSON.stringify(specs)},
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout"
            });
        };
    </script>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error generating Swagger documentation:', error);
    return Response.json(
      {
        error: 'Failed to generate documentation',
        message: 'An error occurred while generating the API documentation',
      },
      { status: 500 }
    );
  }
}
