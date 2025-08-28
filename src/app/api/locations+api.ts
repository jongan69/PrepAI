import { CONFIG } from '@/lib/api-utils';

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

// Token management for Kroger API
class TokenManager {
  private accessToken: string | null = null;
  private tokenExpiry = 0;

  async getKrogerAccessToken(): Promise<string> {
    const now = Date.now();

    if (this.accessToken && this.tokenExpiry > now) {
      return this.accessToken!;
    }

    const credentials = Buffer.from(`${CONFIG.KROGER.CLIENT_ID}:${CONFIG.KROGER.CLIENT_SECRET}`).toString('base64');

    try {
      const response = await fetch('https://api.kroger.com/v1/connect/oauth2/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        throw new Error(`Kroger authentication failed: ${response.status}`);
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.tokenExpiry = now + data.expires_in * 1000 - 60000;

      return this.accessToken!;
    } catch (error) {
      console.error('Failed to get Kroger access token:', error);
      throw new Error('Unable to authenticate with Kroger API');
    }
  }
}

const tokenManager = new TokenManager();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Sanitize input parameters
    const zipCode = InputSanitizer.sanitizeString(searchParams.get('zipCode') || '', 10);
    const lat = InputSanitizer.sanitizeString(searchParams.get('lat') || '', 20);
    const lon = InputSanitizer.sanitizeString(searchParams.get('lon') || '', 20);
    const radiusInMiles = InputSanitizer.sanitizeNumber(searchParams.get('radiusInMiles') || '100');
    const limit = InputSanitizer.sanitizeNumber(searchParams.get('limit') || '10');

    // Validate required parameters
    if (!zipCode && !lat && !lon) {
      return Response.json(
        {
          error: 'At least one location parameter is required: zipCode, lat/lon, or both',
        },
        { status: 400 }
      );
    }

    const token = await tokenManager.getKrogerAccessToken();

    const apiParams = new URLSearchParams();
    if (zipCode) apiParams.append('filter.zipCode.near', zipCode);
    if (lat) apiParams.append('filter.lat.near', lat);
    if (lon) apiParams.append('filter.lon.near', lon);
    if (radiusInMiles) apiParams.append('filter.radiusInMiles', radiusInMiles.toString());
    if (limit) apiParams.append('filter.limit', limit.toString());

    const apiUrl = `https://api.kroger.com/v1/locations?${apiParams.toString()}`;

    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Kroger API error: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Error in locations API:', error);

    return Response.json(
      {
        error: 'Failed to fetch Kroger locations',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
