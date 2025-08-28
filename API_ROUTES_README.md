# API Routes Documentation

This document describes the API routes that have been created to replace the Bun server functionality. All routes are located in `src/app/api/` and follow the Expo Router file-based routing convention.

## Overview

The API routes provide the following functionality:
- Health checks and server status
- Kroger store locations and product search
- Edamam recipe search with fallback recipes
- Meal planning and shopping list generation
- AI-powered ingredient extraction from images

## Environment Variables

The following environment variables are required for full functionality:

```env
# Kroger API
KROGER_CLIENT_ID=your_kroger_client_id
KROGER_CLIENT_SECRET=your_kroger_client_secret

# Edamam API
EDAMAM_APP_ID=your_edamam_app_id
EDAMAM_APP_KEY=your_edamam_app_key

# AIML API (for image analysis)
AIMLAPI_KEY=your_aiml_api_key
AIML_BASE_URL=https://api.aimlapi.com
AIML_MODEL=openai/gpt-4o
```

## API Routes

### 1. Health Check Routes

#### `GET /api/ping`
Simple health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "Server is running",
  "version": "1.0.0",
  "services": {
    "kroger": true,
    "edamam": true,
    "aiml": true
  },
  "rateLimit": {
    "remaining": 99,
    "resetTime": "2024-01-01T00:15:00.000Z"
  }
}
```

#### `GET /api/health`
Detailed health check with service status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "kroger": {
      "status": "configured",
      "message": "Kroger API credentials available"
    },
    "edamam": {
      "status": "configured", 
      "message": "Edamam API credentials available"
    },
    "aiml": {
      "status": "configured",
      "message": "AIML API credentials available"
    }
  },
  "endpoints": [
    "GET /api/ping - Health check",
    "GET /api/health - Detailed health check",
    "GET /api/locations - Kroger store locations",
    "GET /api/products - Kroger product search",
    "GET /api/recipes - Edamam recipe search",
    "POST /api/meal-plan - Generate meal plans and shopping lists",
    "POST /api/image-meal-plan - Extract ingredients from images"
  ]
}
```

### 2. Kroger API Routes

#### `GET /api/locations`
Search for Kroger store locations.

**Query Parameters:**
- `zipCode` (optional): ZIP code to search near
- `lat` (optional): Latitude coordinate
- `lon` (optional): Longitude coordinate
- `radiusInMiles` (optional): Search radius in miles (default: 100)
- `limit` (optional): Maximum number of results (default: 10)

**Example:**
```
GET /api/locations?zipCode=12345&radiusInMiles=50&limit=5
```

**Response:**
```json
{
  "data": [
    {
      "locationId": "01400441",
      "chain": "Kroger",
      "address": {
        "addressLine1": "123 Main St",
        "city": "Cincinnati",
        "state": "OH",
        "zipCode": "45202"
      },
      "geolocation": {
        "latitude": 39.1031,
        "longitude": -84.5120
      }
    }
  ]
}
```

#### `GET /api/products`
Search for Kroger products.

**Query Parameters:**
- `term` (required): Product search term
- `locationId` (required): Kroger location ID
- `limit` (optional): Maximum number of results (default: 20)

**Example:**
```
GET /api/products?term=milk&locationId=01400441&limit=10
```

**Response:**
```json
{
  "data": [
    {
      "productId": "0001111088898",
      "name": "Kroger Whole Milk",
      "items": [
        {
          "itemId": "0001111088898",
          "price": {
            "regular": 2.99,
            "promo": 2.49
          }
        }
      ]
    }
  ]
}
```

### 3. Recipe Search Route

#### `GET /api/recipes`
Search for recipes using Edamam API with fallback recipes.

**Query Parameters:**
- `query` (required): Recipe search query
- `userId` (required): User ID for tracking
- `mealType` (optional): breakfast, lunch, dinner, snack
- `diet` (optional): Diet type (e.g., low-carb, high-protein)
- `health` (optional): Health filters (can be multiple)
- `from` (optional): Starting index (default: 0)
- `to` (optional): Ending index (default: 20)

**Example:**
```
GET /api/recipes?query=chicken&mealType=dinner&diet=high-protein&health=dairy-free&userId=user123
```

**Response:**
```json
{
  "recipes": [
    {
      "label": "Grilled Chicken Breast",
      "ingredients": [
        {
          "food": "chicken breast",
          "quantity": 1,
          "measure": "piece"
        }
      ],
      "ingredientLines": [
        "Season chicken breast",
        "Grill for 6-8 minutes per side"
      ],
      "totalTime": 20,
      "calories": 165,
      "totalNutrients": {
        "PROCNT": { "quantity": 31 },
        "CHOCDF": { "quantity": 0 },
        "FAT": { "quantity": 3.6 }
      }
    }
  ],
  "nextPage": null,
  "totalHits": 1,
  "from": 0,
  "to": 1
}
```

### 4. Meal Planning Route

#### `POST /api/meal-plan`
Generate meal plans and shopping lists.

**Request Body:**
```json
{
  "action": "generateDay" | "generateShoppingList",
  "day": "Monday",
  "budget": 25,
  "dietaryPreferences": {
    "diet": "high-protein",
    "allergies": ["dairy"],
    "servings": 2
  },
  "ingredients": ["chicken", "rice", "vegetables"],
  "mealPlan": {}, // Required for shopping list generation
  "availableIngredients": ["salt", "pepper"],
  "locationId": "01400441"
}
```

**Response for `generateDay`:**
```json
{
  "day": "Monday",
  "totalCost": 25,
  "recipes": {
    "breakfast": {
      "name": "Scrambled Eggs with Vegetables",
      "description": "A delicious breakfast using your ingredients",
      "ingredients": [
        {
          "name": "eggs",
          "amount": 2,
          "unit": "large"
        }
      ],
      "instructions": [
        "Crack 2 eggs into a bowl",
        "Heat oil in pan",
        "Scramble until done"
      ],
      "prepTime": 5,
      "cookTime": 10,
      "servings": 2,
      "nutrition": {
        "calories": 250,
        "protein": 18,
        "carbs": 8,
        "fat": 12,
        "fiber": 3
      },
      "tags": ["breakfast"]
    }
  }
}
```

**Response for `generateShoppingList`:**
```json
{
  "totalCost": 75,
  "shoppingList": [
    {
      "name": "Chicken Breast",
      "amount": 1,
      "unit": "pound",
      "category": "meat",
      "estimatedPrice": 4.99
    }
  ],
  "prepSchedule": [
    {
      "day": "Sunday",
      "tasks": [
        {
          "description": "Prepare ingredients for the week",
          "timeRequired": 20,
          "recipes": ["breakfast", "lunch", "dinner"]
        }
      ]
    }
  ],
  "pricingNote": "Prices based on Kroger store data"
}
```

### 5. Image Analysis Route

#### `POST /api/image-meal-plan`
Extract ingredients from food images using AI vision.

**Request:**
- Content-Type: `multipart/form-data`
- Body: Form data with `image` field containing image file

**Example:**
```javascript
const formData = new FormData();
formData.append('image', imageFile);

fetch('/api/image-meal-plan', {
  method: 'POST',
  body: formData
});
```

**Response:**
```json
{
  "success": true,
  "ingredients": [
    {
      "name": "tomato",
      "confidence": 0.9,
      "quantity": 2,
      "unit": "medium",
      "notes": "Extracted from image"
    },
    {
      "name": "onion",
      "confidence": 0.8,
      "quantity": 1,
      "unit": "large",
      "notes": "Extracted from image"
    }
  ],
  "message": "Found 2 ingredients in the image"
}
```

## Error Handling

All API routes return consistent error responses:

```json
{
  "error": "Request failed",
  "details": "Specific error message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Common HTTP status codes:
- `200`: Success
- `400`: Bad Request (missing parameters, invalid input)
- `429`: Rate Limit Exceeded
- `500`: Internal Server Error

## Rate Limiting

All routes implement rate limiting:
- 100 requests per 15-minute window per IP address
- Rate limit headers included in responses:
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time

## Security Features

- Input sanitization to prevent XSS attacks
- CORS headers for cross-origin requests
- Security headers (XSS protection, content type options, etc.)
- File size limits for image uploads (5MB max)
- File type validation for images

## Fallback Behavior

- Recipe search falls back to predefined recipes if Edamam API fails
- Product pricing falls back to estimated prices if Kroger API fails
- Image analysis falls back to text-based ingredient extraction if AI vision fails

## Usage Examples

### Frontend Integration

```javascript
// Health check
const health = await fetch('/api/ping').then(r => r.json());

// Find nearby stores
const stores = await fetch('/api/locations?zipCode=12345').then(r => r.json());

// Search recipes
const recipes = await fetch('/api/recipes?query=chicken&userId=user123').then(r => r.json());

// Generate meal plan
const mealPlan = await fetch('/api/meal-plan', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    action: 'generateDay',
    ingredients: ['chicken', 'rice'],
    budget: 25
  })
}).then(r => r.json());

// Extract ingredients from image
const formData = new FormData();
formData.append('image', imageFile);
const ingredients = await fetch('/api/image-meal-plan', {
  method: 'POST',
  body: formData
}).then(r => r.json());
```

## Shared Utilities

Common functionality is shared through `src/lib/api-utils.ts`:
- Configuration management
- Input sanitization
- Rate limiting
- Request logging
- Security headers
- Error response helpers

This modular approach ensures consistency across all API routes while maintaining clean, maintainable code.
