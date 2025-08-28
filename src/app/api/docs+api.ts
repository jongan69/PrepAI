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
    // Static Swagger UI HTML that works in production
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
        .swagger-ui .topbar {
            background-color: #2c3e50;
        }
        .swagger-ui .topbar .download-url-wrapper .select-label {
            color: #fff;
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
                url: '/api/swagger.json',
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                plugins: [
                    SwaggerUIBundle.plugins.DownloadUrl
                ],
                layout: "StandaloneLayout",
                validatorUrl: null,
                docExpansion: 'list',
                filter: true,
                showRequestHeaders: true,
                tryItOutEnabled: true
            });
        };
    </script>
</body>
</html>`;

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Error serving documentation:', error);
    return Response.json(
      {
        error: 'Failed to serve documentation',
        message: 'An error occurred while serving the API documentation',
      },
      { status: 500 }
    );
  }
}
