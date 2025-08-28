import { CONFIG } from '@/lib/api-utils';

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         productId:
 *           type: string
 *           description: Unique product identifier
 *         name:
 *           type: string
 *           description: Product name
 *         brand:
 *           type: string
 *           description: Product brand
 *         price:
 *           type: object
 *           properties:
 *             regular:
 *               type: number
 *               description: Regular price
 *             promo:
 *               type: number
 *               description: Promotional price if available
 *         images:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: Image URL
 *               size:
 *                 type: string
 *                 description: Image size
 *         nutrition:
 *           type: object
 *           description: Nutritional information
 *         aisleLocations:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               bayNumber:
 *                 type: string
 *                 description: Bay number in store
 *               description:
 *                 type: string
 *                 description: Location description
 *     ProductSearchResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *         meta:
 *           type: object
 *           properties:
 *             pagination:
 *               type: object
 *               properties:
 *                 start:
 *                   type: integer
 *                   description: Starting index
 *                 limit:
 *                   type: integer
 *                   description: Number of items per page
 *                 total:
 *                   type: integer
 *                   description: Total number of products
 */

// Input sanitization utilities
class InputSanitizer {
  static sanitizeString(input: string, maxLength: number = 100): string {
    if (!input) return '';
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/[&]/g, '&amp;') // Basic XSS prevention
      .substring(0, maxLength);
  }

  static sanitizeNumber(input: string | number): number {
    const num = typeof input === 'string' ? parseFloat(input) : input;
    return isNaN(num) ? 0 : Math.max(0, num);
  }
}

// Token management for Kroger Product API
class TokenManager {
  private productAccessToken: string | null = null;
  private productTokenExpiry = 0;

  async getKrogerProductAccessToken(): Promise<string> {
    const now = Date.now();

    if (this.productAccessToken && this.productTokenExpiry > now) {
      return this.productAccessToken!;
    }

    const credentials = Buffer.from(`${CONFIG.KROGER.CLIENT_ID}:${CONFIG.KROGER.CLIENT_SECRET}`).toString('base64');

    try {
      const response = await fetch('https://api.kroger.com/v1/connect/oauth2/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials&scope=product.compact',
      });

      if (!response.ok) {
        throw new Error(`Failed to get product access token: ${response.statusText}`);
      }

      const data = await response.json();
      this.productAccessToken = data.access_token;
      this.productTokenExpiry = now + data.expires_in * 1000 - 60000;

      return this.productAccessToken!;
    } catch (error) {
      console.error('Failed to get Kroger product access token:', error);
      throw new Error('Unable to authenticate with Kroger Product API');
    }
  }
}

const tokenManager = new TokenManager();

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Search for products
 *     description: Search for products using the Kroger Product API
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *           default: "milk"
 *         description: Search term for products
 *         example: "organic milk"
 *       - in: query
 *         name: locationId
 *         required: true
 *         schema:
 *           type: string
 *         description: Kroger location ID
 *         example: "01400943"
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Maximum number of products to return
 *         example: 10
 *     responses:
 *       200:
 *         description: Products found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductSearchResponse'
 *       400:
 *         description: Bad request - missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "locationId parameter is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch Kroger products"
 *                 details:
 *                   type: string
 *                   example: "Unable to authenticate with Kroger Product API"
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Sanitize input parameters
    const term = InputSanitizer.sanitizeString(searchParams.get('term') || 'milk', 50);
    const limit = InputSanitizer.sanitizeNumber(searchParams.get('limit') || '20');
    const locationId = InputSanitizer.sanitizeString(searchParams.get('locationId') || '', 20);

    if (!locationId) {
      return Response.json(
        {
          error: 'locationId parameter is required',
        },
        { status: 400 }
      );
    }

    console.log('Searching for products:', { term, limit, locationId });

    // Use KrogerService to get products
    const token = await tokenManager.getKrogerProductAccessToken();

    const apiParams = new URLSearchParams();
    apiParams.append('filter.term', term);
    apiParams.append('filter.locationId', locationId);
    apiParams.append('filter.limit', limit.toString());

    const apiUrl = `https://api.kroger.com/v1/products?${apiParams.toString()}`;

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      throw new Error(`Kroger API error: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error: any) {
    console.error('API Error:', error);

    return Response.json(
      {
        error: 'Failed to fetch Kroger products',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
