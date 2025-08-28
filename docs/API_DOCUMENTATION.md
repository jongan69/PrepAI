# PrepAI API Documentation

This document explains how to use and maintain the Swagger API documentation for the PrepAI application.

## Overview

The PrepAI API uses Swagger/OpenAPI 3.0 for documentation. The documentation is automatically generated from JSDoc comments in the API route files and served through a dedicated endpoint.

## Quick Start

### 1. Generate Documentation

Generate the Swagger documentation from your API routes:

```bash
bun run swagger:generate
```

This will:
- Parse all API routes in `src/app/api/**/*.ts`
- Extract JSDoc comments with `@swagger` annotations
- Generate a `swagger.json` file
- Create a TypeScript specification file for the API route
- Display a summary of documented endpoints

### 2. View Documentation

Start your development server:

```bash
bun run dev:web
```

Then visit: `http://localhost:8081/api/docs`

The documentation will use the generated specification and works in both development and production environments.

## API Documentation Structure

### Documented Endpoints

Currently documented endpoints:

- **Health Check**: `GET /api/ping` - Server health and service status
- **Recipes**: `GET /api/recipes` - Search for recipes with filters
- **Products**: `GET /api/products` - Search for grocery products
- **Documentation**: `GET /api/docs` - Swagger UI documentation

### Adding Documentation to New Endpoints

To add Swagger documentation to a new API endpoint, add JSDoc comments with `@swagger` annotations:

```typescript
/**
 * @swagger
 * /api/your-endpoint:
 *   get:
 *     summary: Brief description of what the endpoint does
 *     description: Detailed description of the endpoint functionality
 *     tags: [Category]
 *     parameters:
 *       - in: query
 *         name: paramName
 *         required: true
 *         schema:
 *           type: string
 *         description: Parameter description
 *         example: "example value"
 *     responses:
 *       200:
 *         description: Success response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/YourResponseSchema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export function GET(request: Request) {
  // Your endpoint implementation
}
```

### Defining Schemas

Define reusable schemas in the `@swagger` comments:

```typescript
/**
 * @swagger
 * components:
 *   schemas:
 *     YourResponseSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier
 *         name:
 *           type: string
 *           description: Display name
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 */
```

## Configuration

The Swagger configuration is in `swagger-config.js`:

- **API Info**: Title, version, description, contact info
- **Servers**: Development and production server URLs
- **Security**: Authentication schemes (Bearer token)
- **Schemas**: Common response schemas
- **File Patterns**: Which files to scan for documentation

## Generated Files

The generation script creates:

- **`swagger.json`** - JSON specification file
- **`src/app/api/swagger-spec.ts`** - TypeScript specification for the API route
- **API Route Integration** - The `/api/swagger.json` endpoint uses the generated specification

## Available Scripts

- `bun run swagger:generate` - Generate Swagger documentation from API routes

## Available Endpoints

- `GET /api/docs` - Swagger UI documentation interface
- `GET /api/swagger.json` - OpenAPI 3.0 specification (JSON format)

## Best Practices

### 1. Consistent Documentation

- Use clear, descriptive summaries
- Include examples for all parameters
- Document all possible response codes
- Group related endpoints with tags

### 2. Schema Reusability

- Define common schemas in the configuration
- Reference schemas using `$ref: '#/components/schemas/SchemaName'`
- Keep schemas consistent across endpoints

### 3. Parameter Documentation

- Mark required parameters with `required: true`
- Provide meaningful examples
- Include parameter constraints and validation rules
- Use appropriate data types

### 4. Response Documentation

- Document all possible HTTP status codes
- Include response schemas for success and error cases
- Provide example responses when helpful

## Troubleshooting

### Common Issues

1. **Documentation not updating**: Run `bun run swagger:generate` after making changes
2. **Missing endpoints**: Check that JSDoc comments are properly formatted
3. **Schema errors**: Verify schema references and syntax
4. **Server not starting**: Check that all dependencies are installed

### Debugging

- Check the console output when running `swagger:generate`
- Verify JSDoc syntax in your API files
- Ensure the swagger configuration is correct
- Check that the documentation endpoint is accessible

## Integration with Development Workflow

### Pre-commit Hooks

Consider adding a pre-commit hook to automatically regenerate documentation:

```bash
#!/bin/sh
bun run swagger:generate
git add swagger.json src/app/api/swagger-spec.ts
```

### CI/CD Integration

Add documentation generation to your CI/CD pipeline:

```yaml
- name: Generate API Documentation
  run: bun run swagger:generate
- name: Upload Documentation
  uses: actions/upload-artifact@v2
  with:
    name: api-docs
    path: swagger.json
```

### Deployment

The documentation works seamlessly with all Expo Router deployment options:
- EAS Hosting
- Vercel
- Netlify
- Custom servers

The generated specification is served by the API routes, ensuring it's always available in production.

## Advanced Features

### Custom Styling

The Swagger UI can be customized by modifying the HTML template in `src/app/api/docs+api.ts`. The specification is generated from your API routes and JSDoc comments.

### Authentication

The documentation includes Bearer token authentication. To test authenticated endpoints:

1. Click the "Authorize" button in Swagger UI
2. Enter your Bearer token
3. All subsequent requests will include the token

### Export Options

The generated `swagger.json` endpoint can be:
- Imported into other API documentation tools
- Used with code generation tools
- Shared with external developers
- Accessed directly via `/api/swagger.json`
- Version controlled for API changes

## Support

For issues with the API documentation:

1. Check the troubleshooting section above
2. Review the Swagger/OpenAPI 3.0 specification
3. Consult the swagger-jsdoc documentation
4. Check the generated `swagger.json` file for syntax errors
