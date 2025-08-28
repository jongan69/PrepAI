import { CONFIG } from '@/lib/api-utils';

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         label:
 *           type: string
 *           description: Recipe name
 *           example: "Chicken Salad with Mixed Greens"
 *         ingredients:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               food:
 *                 type: string
 *                 description: Ingredient name
 *               quantity:
 *                 type: number
 *                 description: Ingredient quantity
 *               measure:
 *                 type: string
 *                 description: Unit of measurement
 *         ingredientLines:
 *           type: array
 *           items:
 *             type: string
 *           description: Step-by-step instructions
 *         totalTime:
 *           type: integer
 *           description: Total cooking time in minutes
 *         calories:
 *           type: integer
 *           description: Total calories per serving
 *         totalNutrients:
 *           type: object
 *           properties:
 *             PROCNT:
 *               type: object
 *               properties:
 *                 quantity:
 *                   type: number
 *                   description: Protein content in grams
 *             CHOCDF:
 *               type: object
 *               properties:
 *                 quantity:
 *                   type: number
 *                   description: Carbohydrate content in grams
 *             FAT:
 *               type: object
 *               properties:
 *                 quantity:
 *                   type: number
 *                   description: Fat content in grams
 *             FIBTG:
 *               type: object
 *               properties:
 *                 quantity:
 *                   type: number
 *                   description: Fiber content in grams
 *     RecipeSearchResponse:
 *       type: object
 *       properties:
 *         recipes:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Recipe'
 *         nextPage:
 *           type: string
 *           nullable: true
 *           description: URL for next page of results
 *         totalHits:
 *           type: integer
 *           description: Total number of recipes found
 *         from:
 *           type: integer
 *           description: Starting index of current page
 *         to:
 *           type: integer
 *           description: Ending index of current page
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

  static sanitizeArray(arr: any[], maxLength: number = 50): string[] {
    if (!Array.isArray(arr)) return [];
    return arr
      .slice(0, maxLength)
      .map((item) => this.sanitizeString(String(item), 50))
      .filter((item) => item.length > 0);
  }
}

interface EdamamSearchResponse {
  recipes: any[];
  nextPage: string | null;
  totalHits: number;
  from: number;
  to: number;
}

class EdamamService {
  private static lastRequestTime = 0;
  private static requestCount = 0;
  private static readonly RATE_LIMIT = 5; // Reduced to be more conservative
  private static readonly RATE_WINDOW = 60000; // 1 minute in ms
  private static readonly FALLBACK_RECIPES = {
    breakfast: [
      {
        label: 'Scrambled Eggs with Vegetables',
        ingredients: [
          { food: 'eggs', quantity: 2, measure: 'large' },
          { food: 'bell pepper', quantity: 1, measure: 'medium' },
          { food: 'onion', quantity: 0.5, measure: 'medium' },
          { food: 'spinach', quantity: 1, measure: 'cup' },
        ],
        ingredientLines: [
          'Crack 2 eggs into a bowl',
          'Chop bell pepper and onion',
          'Heat oil in pan, sauté vegetables',
          'Add eggs and scramble until done',
        ],
        totalTime: 15,
        calories: 250,
        totalNutrients: {
          PROCNT: { quantity: 18 },
          CHOCDF: { quantity: 8 },
          FAT: { quantity: 12 },
          FIBTG: { quantity: 3 },
        },
      },
      {
        label: 'Oatmeal with Fruits',
        ingredients: [
          { food: 'oats', quantity: 1, measure: 'cup' },
          { food: 'banana', quantity: 1, measure: 'medium' },
          { food: 'berries', quantity: 0.5, measure: 'cup' },
          { food: 'honey', quantity: 1, measure: 'tablespoon' },
        ],
        ingredientLines: ['Cook oats with water', 'Slice banana and add berries', 'Drizzle with honey', 'Serve warm'],
        totalTime: 10,
        calories: 300,
        totalNutrients: {
          PROCNT: { quantity: 12 },
          CHOCDF: { quantity: 55 },
          FAT: { quantity: 6 },
          FIBTG: { quantity: 8 },
        },
      },
    ],
    lunch: [
      {
        label: 'Chicken Salad with Mixed Greens',
        ingredients: [
          { food: 'chicken breast', quantity: 1, measure: 'medium' },
          { food: 'mixed greens', quantity: 2, measure: 'cups' },
          { food: 'tomatoes', quantity: 1, measure: 'medium' },
          { food: 'cucumber', quantity: 0.5, measure: 'medium' },
          { food: 'olive oil', quantity: 1, measure: 'tablespoon' },
        ],
        ingredientLines: [
          'Grill or bake chicken breast',
          'Wash and prepare vegetables',
          'Slice chicken and vegetables',
          'Toss with olive oil and serve',
        ],
        totalTime: 25,
        calories: 350,
        totalNutrients: {
          PROCNT: { quantity: 35 },
          CHOCDF: { quantity: 12 },
          FAT: { quantity: 18 },
          FIBTG: { quantity: 6 },
        },
      },
    ],
    dinner: [
      {
        label: 'Baked Salmon with Roasted Vegetables',
        ingredients: [
          { food: 'salmon fillet', quantity: 1, measure: 'medium' },
          { food: 'asparagus', quantity: 1, measure: 'bunch' },
          { food: 'potatoes', quantity: 2, measure: 'medium' },
          { food: 'lemon', quantity: 1, measure: 'medium' },
          { food: 'olive oil', quantity: 2, measure: 'tablespoons' },
        ],
        ingredientLines: [
          'Preheat oven to 400°F',
          'Season salmon with lemon and herbs',
          'Roast vegetables with olive oil',
          'Bake salmon for 12-15 minutes',
        ],
        totalTime: 35,
        calories: 450,
        totalNutrients: {
          PROCNT: { quantity: 40 },
          CHOCDF: { quantity: 30 },
          FAT: { quantity: 22 },
          FIBTG: { quantity: 8 },
        },
      },
    ],
  };

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async checkRateLimit(): Promise<void> {
    const now = Date.now();

    // Reset counter if window has passed
    if (now - EdamamService.lastRequestTime > EdamamService.RATE_WINDOW) {
      EdamamService.requestCount = 0;
      EdamamService.lastRequestTime = now;
    }

    // Check if we're at the limit
    if (EdamamService.requestCount >= EdamamService.RATE_LIMIT) {
      const waitTime = EdamamService.RATE_WINDOW - (now - EdamamService.lastRequestTime);
      console.log(`Rate limit reached. Waiting ${waitTime}ms before next request`);
      await this.delay(waitTime);
      EdamamService.requestCount = 0;
      EdamamService.lastRequestTime = Date.now();
    }

    // Add minimum delay between requests
    const timeSinceLastRequest = now - EdamamService.lastRequestTime;
    if (timeSinceLastRequest < 1000) {
      // 1 second minimum between requests
      await this.delay(1000 - timeSinceLastRequest);
    }

    EdamamService.requestCount++;
    EdamamService.lastRequestTime = Date.now();
  }

  async searchRecipes(
    params: {
      query: string;
      mealType?: string;
      diet?: string;
      allergies?: string[];
      from?: string;
      to?: string;
    },
    retryCount: number = 0
  ): Promise<EdamamSearchResponse> {
    if (!CONFIG.EDAMAM.APP_ID || !CONFIG.EDAMAM.APP_KEY) {
      throw new Error('Edamam API credentials not configured');
    }

    // Check rate limit before making request
    await this.checkRateLimit();

    console.log('=== EDAMAM RECIPE SEARCH ===');
    console.log('Search params:', params);
    console.log(`Attempt ${retryCount + 1}/3`);

    const apiParams = new URLSearchParams({
      type: 'public',
      q: params.query,
      app_id: CONFIG.EDAMAM.APP_ID,
      app_key: CONFIG.EDAMAM.APP_KEY,
      from: params.from || '0',
      to: params.to || '5',
    });

    if (params.mealType) apiParams.append('mealType', params.mealType);
    if (params.diet) apiParams.append('diet', params.diet);

    if (params.allergies) {
      params.allergies.forEach((allergy) => {
        const healthFilter = this.mapAllergyToHealthFilter(allergy);
        if (healthFilter) apiParams.append('health', healthFilter);
      });
    }

    const apiUrl = `https://api.edamam.com/api/recipes/v2?${apiParams.toString()}`;
    console.log(
      'Edamam API URL:',
      apiUrl.replace(CONFIG.EDAMAM.APP_ID, '[APP_ID]').replace(CONFIG.EDAMAM.APP_KEY, '[APP_KEY]')
    );

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Accept: 'application/json',
          'Edamam-Account-User': 'meal-plan-user',
        },
      });

      console.log('Edamam response status:', response.status);

      if (response.status === 429 && retryCount < 2) {
        const retryDelay = Math.pow(2, retryCount) * 1000; // Exponential backoff: 1s, 2s, 4s
        console.log(`Rate limited (429). Retrying in ${retryDelay}ms...`);
        await this.delay(retryDelay);
        return this.searchRecipes(params, retryCount + 1);
      }

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Edamam API error:', errorText);
        throw new Error(`Edamam API failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Edamam response data:', {
        count: data.count,
        from: data.from,
        to: data.to,
        hits: data.hits?.length || 0,
      });

      const recipes = data.hits?.map((hit: any) => hit.recipe) || [];
      console.log(`Found ${recipes.length} Edamam recipes`);

      return {
        recipes,
        nextPage: data._links?.next?.href || null,
        totalHits: data.count,
        from: data.from,
        to: data.to,
      };
    } catch (error) {
      if (retryCount < 2 && error instanceof Error && error.message.includes('429')) {
        const retryDelay = Math.pow(2, retryCount) * 1000;
        console.log(`Retrying after error in ${retryDelay}ms...`);
        await this.delay(retryDelay);
        return this.searchRecipes(params, retryCount + 1);
      }

      // If all retries failed, use fallback recipes
      console.log(`Edamam API failed after ${retryCount + 1} attempts, using fallback recipes`);
      const fallbackRecipes = this.getFallbackRecipes(params.mealType || 'dinner', params.query);

      return {
        recipes: fallbackRecipes,
        nextPage: null,
        totalHits: fallbackRecipes.length,
        from: 0,
        to: fallbackRecipes.length,
      };
    }
  }

  private mapAllergyToHealthFilter(allergy: string): string | null {
    const healthMap: { [key: string]: string } = {
      dairy: 'dairy-free',
      eggs: 'egg-free',
      nuts: 'tree-nut-free',
      peanuts: 'peanut-free',
      shellfish: 'shellfish-free',
      soy: 'soy-free',
      wheat: 'wheat-free',
      fish: 'fish-free',
    };
    return healthMap[allergy.toLowerCase()] || null;
  }

  getFallbackRecipes(mealType: string, query: string): any[] {
    console.log(`Getting fallback recipes for ${mealType} with query: ${query}`);
    const recipes = EdamamService.FALLBACK_RECIPES[mealType as keyof typeof EdamamService.FALLBACK_RECIPES] || [];

    // Filter recipes based on query if possible
    const queryLower = query.toLowerCase();
    const filteredRecipes = recipes.filter(
      (recipe) =>
        recipe.label.toLowerCase().includes(queryLower) ||
        recipe.ingredients.some((ing: any) => ing.food.toLowerCase().includes(queryLower))
    );

    return filteredRecipes.length > 0 ? filteredRecipes : recipes;
  }
}

const edamamService = new EdamamService();

/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Search for recipes
 *     description: Search for recipes using the Edamam API with various filters and parameters
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Search query for recipes
 *         example: "chicken salad"
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID for tracking and personalization
 *         example: "user123"
 *       - in: query
 *         name: diet
 *         schema:
 *           type: string
 *         description: Diet type filter
 *         example: "balanced"
 *       - in: query
 *         name: health
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Health labels (allergies, dietary restrictions)
 *         example: ["dairy-free", "gluten-free"]
 *       - in: query
 *         name: cuisineType
 *         schema:
 *           type: string
 *         description: Cuisine type filter
 *         example: "American"
 *       - in: query
 *         name: mealType
 *         schema:
 *           type: string
 *         description: Meal type filter
 *         example: "lunch"
 *       - in: query
 *         name: dishType
 *         schema:
 *           type: string
 *         description: Dish type filter
 *         example: "main course"
 *       - in: query
 *         name: from
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Starting index for pagination
 *       - in: query
 *         name: to
 *         schema:
 *           type: integer
 *           default: 20
 *         description: Ending index for pagination
 *     responses:
 *       200:
 *         description: Recipes found successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeSearchResponse'
 *       400:
 *         description: Bad request - missing required parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Query parameter is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unknown error"
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Sanitize input parameters
    const query = InputSanitizer.sanitizeString(searchParams.get('query') || '', 100);
    const diet = InputSanitizer.sanitizeString(searchParams.get('diet') || '', 50);
    const health = InputSanitizer.sanitizeArray(searchParams.getAll('health'), 10);
    const cuisineType = InputSanitizer.sanitizeString(searchParams.get('cuisineType') || '', 50);
    const mealType = InputSanitizer.sanitizeString(searchParams.get('mealType') || '', 50);
    const dishType = InputSanitizer.sanitizeString(searchParams.get('dishType') || '', 50);
    const userId = InputSanitizer.sanitizeString(searchParams.get('userId') || '', 50);
    const from = InputSanitizer.sanitizeNumber(searchParams.get('from') || '0');
    const to = InputSanitizer.sanitizeNumber(searchParams.get('to') || '20');

    if (!query) {
      return Response.json(
        {
          error: 'Query parameter is required',
        },
        { status: 400 }
      );
    }

    if (!userId) {
      return Response.json(
        {
          error: 'userId parameter is required',
        },
        { status: 400 }
      );
    }

    const searchResponse = await edamamService.searchRecipes({
      query,
      mealType: mealType || undefined,
      diet: diet || undefined,
      allergies: health.length > 0 ? health : undefined,
      from: from.toString(),
      to: to.toString(),
    });

    return Response.json(searchResponse);
  } catch (error) {
    console.error('Recipe search error:', error);
    return Response.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
