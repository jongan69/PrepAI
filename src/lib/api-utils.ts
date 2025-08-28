// API Configuration
export const CONFIG = {
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
  DEFAULT_LOCATION: '01400441',
};

// Input sanitization utilities
export class InputSanitizer {
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

  static sanitizeArray(arr: any[], maxLength: number = 50): string[] {
    if (!Array.isArray(arr)) return [];
    return arr
      .slice(0, maxLength)
      .map((item) => this.sanitizeString(String(item), 50))
      .filter((item) => item.length > 0);
  }

  static validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

// Rate limiter for API routes
export class RateLimiter {
  private static limits = new Map<string, { count: number; resetTime: number }>();

  static checkRateLimit(identifier: string, limit: number = 100, windowMs: number = 900000): boolean {
    const now = Date.now();
    const userLimit = this.limits.get(identifier);

    if (!userLimit || now > userLimit.resetTime) {
      this.limits.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (userLimit.count >= limit) {
      return false;
    }

    userLimit.count++;
    return true;
  }

  static getRemainingRequests(identifier: string): number {
    const userLimit = this.limits.get(identifier);
    if (!userLimit) return 100;
    return Math.max(0, 100 - userLimit.count);
  }
}

// Request logger
export class RequestLogger {
  static log(level: 'info' | 'warn' | 'error', message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      ...(data && { data }),
    };

    console.log(JSON.stringify(logEntry));
  }

  static logRequest(requestId: string, method: string, path: string, status: number, duration: number) {
    this.log('info', 'API Request', {
      requestId,
      method,
      path,
      status,
      duration: `${duration}ms`,
    });
  }

  static logError(requestId: string, error: Error, context?: any) {
    this.log('error', 'API Error', {
      requestId,
      error: error.message,
      stack: error.stack,
      ...(context && { context }),
    });
  }
}

// Security headers
export const getSecurityHeaders = () => ({
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
});

// CORS headers
export const getCorsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept, X-Requested-With',
  ...getSecurityHeaders(),
});

// Common error responses
export const createErrorResponse = (error: any, status: number = 500) => {
  return Response.json(
    {
      error: 'Request failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    },
    {
      status,
      headers: getCorsHeaders(),
    }
  );
};

// Common success responses
export const createSuccessResponse = (data: any, status: number = 200) => {
  return Response.json(data, {
    status,
    headers: getCorsHeaders(),
  });
};

// Get client IP for rate limiting
export const getClientIP = (request: Request): string => {
  return request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
};

// Validate required parameters
export const validateRequiredParams = (params: Record<string, any>, required: string[]): string[] => {
  const missing: string[] = [];
  for (const param of required) {
    if (!params[param] || params[param].toString().trim() === '') {
      missing.push(param);
    }
  }
  return missing;
};
