import { CONFIG } from '@/lib/api-utils';

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Recipe name
 *         description:
 *           type: string
 *           description: Recipe description
 *         ingredients:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Ingredient name
 *               amount:
 *                 type: number
 *                 description: Ingredient amount
 *               unit:
 *                 type: string
 *                 description: Unit of measurement
 *         instructions:
 *           type: array
 *           items:
 *             type: string
 *           description: Step-by-step cooking instructions
 *         prepTime:
 *           type: integer
 *           description: Preparation time in minutes
 *         cookTime:
 *           type: integer
 *           description: Cooking time in minutes
 *         servings:
 *           type: integer
 *           description: Number of servings
 *         nutrition:
 *           type: object
 *           properties:
 *             calories:
 *               type: integer
 *               description: Total calories per serving
 *             protein:
 *               type: number
 *               description: Protein content in grams
 *             carbs:
 *               type: number
 *               description: Carbohydrate content in grams
 *             fat:
 *               type: number
 *               description: Fat content in grams
 *             fiber:
 *               type: number
 *               description: Fiber content in grams
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Recipe tags/categories
 *         source:
 *           type: string
 *           description: Recipe source
 *         originalUrl:
 *           type: string
 *           description: Original recipe URL
 *         imageUrl:
 *           type: string
 *           description: Recipe image URL
 *         healthLabels:
 *           type: array
 *           items:
 *             type: string
 *           description: Health-related labels
 *         cautions:
 *           type: array
 *           items:
 *             type: string
 *           description: Allergy warnings
 *     MealPlan:
 *       type: object
 *       properties:
 *         day:
 *           type: string
 *           description: Day of the week
 *         totalCost:
 *           type: number
 *           description: Total estimated cost
 *         recipes:
 *           type: object
 *           additionalProperties:
 *             $ref: '#/components/schemas/Recipe'
 *           description: Recipes for different meal types
 *     ShoppingItem:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Item name
 *         amount:
 *           type: number
 *           description: Quantity needed
 *         unit:
 *           type: string
 *           description: Unit of measurement
 *         category:
 *           type: string
 *           description: Shopping category
 *         estimatedPrice:
 *           type: number
 *           description: Estimated price
 *         notes:
 *           type: string
 *           description: Additional notes
 *         krogerProduct:
 *           type: object
 *           description: Associated Kroger product data
 *     ShoppingList:
 *       type: object
 *       properties:
 *         totalCost:
 *           type: number
 *           description: Total estimated cost
 *         shoppingList:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ShoppingItem'
 *         prepSchedule:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               day:
 *                 type: string
 *                 description: Day of the week
 *               tasks:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     description:
 *                       type: string
 *                       description: Task description
 *                     timeRequired:
 *                       type: integer
 *                       description: Time required in minutes
 *                     recipes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: Related recipes
 *         pricingNote:
 *           type: string
 *           description: Pricing information note
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

// Type definitions
interface Recipe {
  name: string;
  description: string;
  ingredients: { name: string; amount: number; unit: string }[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  nutrition: { calories: number; protein: number; carbs: number; fat: number; fiber: number };
  tags: string[];
  source?: string;
  originalUrl?: string;
  imageUrl?: string;
  healthLabels?: string[];
  cautions?: string[];
  totalWeight?: number;
  yield?: number;
}

interface MealPlan {
  day: string;
  totalCost: number;
  recipes: { [key: string]: Recipe };
}

interface ShoppingItem {
  name: string;
  amount: number;
  unit: string;
  category: string;
  estimatedPrice: number;
  notes?: string;
  krogerProduct?: any;
}

interface ShoppingList {
  totalCost: number;
  shoppingList: ShoppingItem[];
  prepSchedule: {
    day: string;
    tasks: { description: string; timeRequired: number; recipes: string[] }[];
  }[];
  pricingNote: string;
}

// Token management for Kroger API
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

// Price service for fallback pricing
class PriceService {
  private static readonly BASE_PRICES: { [key: string]: number } = {
    chicken: 4.99,
    beef: 6.99,
    salmon: 8.99,
    eggs: 3.49,
    milk: 2.99,
    cheese: 4.99,
    bread: 2.99,
    rice: 3.99,
    pasta: 2.49,
    tomatoes: 2.99,
    onions: 1.99,
    garlic: 1.49,
    'olive oil': 4.99,
    butter: 3.99,
    flour: 2.99,
    sugar: 2.49,
    salt: 1.49,
    pepper: 2.99,
    vegetables: 3.99,
    fruits: 4.99,
    potatoes: 2.99,
    carrots: 1.99,
    broccoli: 2.99,
    spinach: 2.49,
    lettuce: 1.99,
    cucumber: 1.49,
    'bell pepper': 2.99,
    mushrooms: 2.99,
    zucchini: 2.49,
    squash: 2.99,
    corn: 1.99,
    beans: 1.99,
    lentils: 2.49,
    quinoa: 4.99,
    oatmeal: 3.99,
    cereal: 4.99,
    yogurt: 3.99,
    cream: 2.99,
    'sour cream': 2.49,
    mayonnaise: 2.99,
    ketchup: 1.99,
    mustard: 1.99,
    'soy sauce': 2.49,
    vinegar: 2.99,
    lemon: 0.99,
    lime: 0.99,
    herbs: 2.99,
    spices: 3.99,
  };

  private static readonly CATEGORIES: { [key: string]: string } = {
    chicken: 'meat',
    beef: 'meat',
    pork: 'meat',
    lamb: 'meat',
    turkey: 'meat',
    salmon: 'seafood',
    tuna: 'seafood',
    shrimp: 'seafood',
    eggs: 'dairy',
    milk: 'dairy',
    cheese: 'dairy',
    yogurt: 'dairy',
    cream: 'dairy',
    butter: 'dairy',
    bread: 'bakery',
    pasta: 'pantry',
    rice: 'pantry',
    flour: 'pantry',
    sugar: 'pantry',
    salt: 'pantry',
    'olive oil': 'pantry',
    vegetables: 'produce',
    fruits: 'produce',
    tomatoes: 'produce',
    onions: 'produce',
    garlic: 'produce',
    potatoes: 'produce',
    carrots: 'produce',
    broccoli: 'produce',
    spinach: 'produce',
    lettuce: 'produce',
    cucumber: 'produce',
    'bell pepper': 'produce',
    mushrooms: 'produce',
    zucchini: 'produce',
    squash: 'produce',
    corn: 'produce',
    beans: 'pantry',
    lentils: 'pantry',
    quinoa: 'pantry',
    oatmeal: 'pantry',
    cereal: 'pantry',
    herbs: 'produce',
    spices: 'pantry',
  };

  static getEstimatedPrice(ingredientName: string, amount: number): number {
    const basePrice = this.BASE_PRICES[ingredientName.toLowerCase()] || 2.99;
    return Math.round(basePrice * amount * 100) / 100;
  }

  static getCategory(ingredientName: string): string {
    return this.CATEGORIES[ingredientName.toLowerCase()] || 'pantry';
  }
}

// Kroger service for pricing
class KrogerService {
  async getPrice(ingredientName: string, locationId: string): Promise<number> {
    try {
      console.log(`Looking up Kroger price for: ${ingredientName} at location: ${locationId}`);

      const tokenManager = new TokenManager();
      const token = await tokenManager.getKrogerProductAccessToken();

      const searchTerm = ingredientName.toLowerCase();
      const apiParams = new URLSearchParams({
        'filter.term': searchTerm,
        'filter.locationId': locationId,
        'filter.limit': '5',
      });

      const apiUrl = `https://api.kroger.com/v1/products?${apiParams.toString()}`;

      const response = await fetch(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const products = data.data || [];

        if (products.length > 0) {
          const firstProduct = products[0];
          const items = firstProduct.items || [];

          if (items.length > 0) {
            const price = items[0].price?.regular || items[0].price?.promo || 0;
            console.log(`Found Kroger price for ${ingredientName}: $${price}`);
            return price;
          }
        }
      }

      console.log(`No Kroger price found for ${ingredientName}, using estimated price`);
      return PriceService.getEstimatedPrice(ingredientName, 1);
    } catch (error) {
      console.error(`Error getting Kroger price for ${ingredientName}:`, error);
      return PriceService.getEstimatedPrice(ingredientName, 1);
    }
  }
}

// Edamam service for recipe search
class EdamamService {
  private static lastRequestTime = 0;
  private static requestCount = 0;
  private static readonly RATE_LIMIT = 5;
  private static readonly RATE_WINDOW = 60000;

  private async delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async checkRateLimit(): Promise<void> {
    const now = Date.now();

    if (now - EdamamService.lastRequestTime > EdamamService.RATE_WINDOW) {
      EdamamService.requestCount = 0;
      EdamamService.lastRequestTime = now;
    }

    if (EdamamService.requestCount >= EdamamService.RATE_LIMIT) {
      const waitTime = EdamamService.RATE_WINDOW - (now - EdamamService.lastRequestTime);
      await this.delay(waitTime);
      EdamamService.requestCount = 0;
      EdamamService.lastRequestTime = Date.now();
    }

    const timeSinceLastRequest = now - EdamamService.lastRequestTime;
    if (timeSinceLastRequest < 1000) {
      await this.delay(1000 - timeSinceLastRequest);
    }

    EdamamService.requestCount++;
    EdamamService.lastRequestTime = Date.now();
  }

  async searchRecipes(params: {
    query: string;
    mealType?: string;
    diet?: string;
    allergies?: string[];
  }): Promise<any[]> {
    if (!CONFIG.EDAMAM.APP_ID || !CONFIG.EDAMAM.APP_KEY) {
      throw new Error('Edamam API credentials not configured');
    }

    await this.checkRateLimit();

    const apiParams = new URLSearchParams({
      type: 'public',
      q: params.query,
      app_id: CONFIG.EDAMAM.APP_ID,
      app_key: CONFIG.EDAMAM.APP_KEY,
      from: '0',
      to: '5',
    });

    if (params.mealType) apiParams.append('mealType', params.mealType);
    if (params.diet) apiParams.append('diet', params.diet);

    const apiUrl = `https://api.edamam.com/api/recipes/v2?${apiParams.toString()}`;

    try {
      const response = await fetch(apiUrl, {
        headers: {
          Accept: 'application/json',
          'Edamam-Account-User': 'meal-plan-user',
        },
      });

      if (!response.ok) {
        throw new Error(`Edamam API failed: ${response.status}`);
      }

      const data = await response.json();
      return data.hits?.map((hit: any) => hit.recipe) || [];
    } catch (error) {
      console.error('Edamam API error:', error);
      return [];
    }
  }
}

// Meal planning service
class MealPlanningService {
  private edamamService = new EdamamService();
  private krogerService = new KrogerService();

  async generateMealPlan(params: {
    ingredients: string[];
    day: string;
    budget: number;
    dietaryPreferences: any;
  }): Promise<MealPlan> {
    const { ingredients, day, budget, dietaryPreferences } = params;
    const availableIngredientNames = ingredients.map((ing) => ing.toLowerCase());
    const totalCost = Math.min(budget, 50);

    const mealPlan: MealPlan = {
      day: day || 'Monday',
      totalCost,
      recipes: {},
    };

    const mealTypes = ['breakfast', 'lunch', 'dinner'];

    for (const mealType of mealTypes) {
      const searchQuery = availableIngredientNames.slice(0, 3).join(' ');
      console.log(`Searching for ${mealType} recipes with query: "${searchQuery}"`);

      try {
        const searchResponse = await this.edamamService.searchRecipes({
          query: searchQuery,
          mealType,
          diet: dietaryPreferences?.diet,
          allergies: dietaryPreferences?.allergies,
        });

        if (searchResponse.length > 0) {
          const selectedRecipe = searchResponse[0];
          const createdRecipe = this.createRecipeFromEdamam(selectedRecipe, mealType, dietaryPreferences);
          mealPlan.recipes[mealType] = createdRecipe;
        } else {
          mealPlan.recipes[mealType] = this.createFallbackRecipe(
            mealType,
            availableIngredientNames,
            dietaryPreferences
          );
        }
      } catch (error) {
        console.error(`Error getting ${mealType} recipes from Edamam:`, error);
        mealPlan.recipes[mealType] = this.createFallbackRecipe(mealType, availableIngredientNames, dietaryPreferences);
      }
    }

    return mealPlan;
  }

  async generateShoppingList(params: {
    mealPlan: MealPlan;
    availableIngredients: string[];
    budget: number;
    dietaryPreferences: any;
    locationId: string;
  }): Promise<ShoppingList> {
    const { mealPlan, availableIngredients, budget, locationId } = params;
    const availableIngredientNames = availableIngredients.map((ing) => ing.toLowerCase());
    const totalCost = Math.min(budget, 100);

    // Collect all recipe ingredients
    const allRecipeIngredients: { name: string; amount: number; unit: string }[] = [];

    Object.values(mealPlan.recipes).forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        allRecipeIngredients.push({
          name: ingredient.name.toLowerCase(),
          amount: ingredient.amount,
          unit: ingredient.unit,
        });
      });
    });

    // Find missing ingredients
    const shoppingItems: ShoppingItem[] = [];

    for (const recipeIngredient of allRecipeIngredients) {
      const isAvailable = availableIngredientNames.some(
        (available) => available.includes(recipeIngredient.name) || recipeIngredient.name.includes(available)
      );

      if (!isAvailable) {
        let estimatedPrice: number;
        try {
          estimatedPrice = await this.krogerService.getPrice(recipeIngredient.name, locationId);
        } catch (error) {
          console.error(`Error getting Kroger price for ${recipeIngredient.name}:`, error);
          estimatedPrice = PriceService.getEstimatedPrice(recipeIngredient.name, recipeIngredient.amount);
        }

        shoppingItems.push({
          name: recipeIngredient.name.charAt(0).toUpperCase() + recipeIngredient.name.slice(1),
          amount: recipeIngredient.amount,
          unit: recipeIngredient.unit,
          category: PriceService.getCategory(recipeIngredient.name),
          estimatedPrice,
        });
      }
    }

    // Remove duplicates and combine similar items
    const uniqueItems = this.combineDuplicateItems(shoppingItems);

    const prepSchedule = this.generateFallbackPrepSchedule(mealPlan.recipes);

    return {
      totalCost,
      shoppingList: uniqueItems,
      prepSchedule,
      pricingNote: 'Prices based on Kroger store data',
    };
  }

  private createRecipeFromEdamam(edamamRecipe: any, mealType: string, dietaryPreferences: any): Recipe {
    return {
      name: edamamRecipe.label,
      description: `A delicious ${mealType} using your ingredients`,
      ingredients:
        edamamRecipe.ingredients?.map((ing: any) => ({
          name: ing.food,
          amount: ing.quantity,
          unit: ing.measure,
        })) || [],
      instructions: edamamRecipe.ingredientLines || ['Follow recipe instructions'],
      prepTime: Math.floor((edamamRecipe.totalTime || 30) * 0.3),
      cookTime: edamamRecipe.totalTime || 30,
      servings: dietaryPreferences?.servings || 2,
      nutrition: {
        calories: Math.round(edamamRecipe.calories || 400),
        protein: Math.round(edamamRecipe.totalNutrients?.PROCNT?.quantity || 15),
        carbs: Math.round(edamamRecipe.totalNutrients?.CHOCDF?.quantity || 50),
        fat: Math.round(edamamRecipe.totalNutrients?.FAT?.quantity || 15),
        fiber: Math.round(edamamRecipe.totalNutrients?.FIBTG?.quantity || 5),
      },
      tags: [mealType],
      source: edamamRecipe.source,
      originalUrl: edamamRecipe.url,
    };
  }

  private createFallbackRecipe(mealType: string, availableIngredients: string[], dietaryPreferences: any): Recipe {
    return {
      name: `${mealType.charAt(0).toUpperCase() + mealType.slice(1)} with ${availableIngredients[0] || 'ingredients'}`,
      description: `A healthy ${mealType} using your ingredients`,
      ingredients: availableIngredients.slice(0, 3).map((ing) => ({
        name: ing,
        amount: 1,
        unit: 'serving',
      })),
      instructions: ['Prepare ingredients', `Cook ${mealType}`, 'Serve hot'],
      prepTime: 10,
      cookTime: 20,
      servings: dietaryPreferences?.servings || 2,
      nutrition: { calories: 400, protein: 20, carbs: 45, fat: 15, fiber: 5 },
      tags: [mealType],
    };
  }

  private combineDuplicateItems(items: ShoppingItem[]): ShoppingItem[] {
    return items.reduce((acc: ShoppingItem[], item: ShoppingItem) => {
      const existing = acc.find(
        (existingItem) => existingItem.name.toLowerCase() === item.name.toLowerCase() && existingItem.unit === item.unit
      );

      if (existing) {
        existing.amount += item.amount;
        existing.estimatedPrice += item.estimatedPrice;
      } else {
        acc.push(item);
      }

      return acc;
    }, []);
  }

  private generateFallbackPrepSchedule(recipes: { [key: string]: Recipe }): {
    day: string;
    tasks: { description: string; timeRequired: number; recipes: string[] }[];
  }[] {
    const mealTypes = Object.keys(recipes);

    if (mealTypes.length > 0) {
      return [
        {
          day: 'Sunday',
          tasks: [
            {
              description: 'Prepare ingredients for the week',
              timeRequired: 20,
              recipes: mealTypes,
            },
          ],
        },
      ];
    }

    return [];
  }
}

const mealPlanningService = new MealPlanningService();

/**
 * @swagger
 * /api/meal-plan:
 *   post:
 *     summary: Generate meal plans and shopping lists
 *     description: Generate meal plans for a specific day or create shopping lists based on meal plans
 *     tags: [Meal Planning]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - action
 *             properties:
 *               action:
 *                 type: string
 *                 enum: [generateDay, generateShoppingList]
 *                 description: The action to perform
 *                 example: "generateDay"
 *               day:
 *                 type: string
 *                 description: Day of the week for meal planning
 *                 example: "Monday"
 *               budget:
 *                 type: number
 *                 description: Budget in dollars
 *                 example: 25
 *               dietaryPreferences:
 *                 type: object
 *                 description: Dietary restrictions and preferences
 *                 example: {"vegetarian": true, "gluten-free": false}
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Available ingredients
 *                 example: ["chicken", "rice", "vegetables"]
 *               mealPlan:
 *                 type: object
 *                 description: Existing meal plan for shopping list generation
 *               availableIngredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Ingredients already available
 *                 example: ["salt", "pepper", "olive oil"]
 *               locationId:
 *                 type: string
 *                 description: Kroger location ID for pricing
 *                 example: "01400943"
 *     responses:
 *       200:
 *         description: Meal plan or shopping list generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/MealPlan'
 *                 - $ref: '#/components/schemas/ShoppingList'
 *       400:
 *         description: Bad request - invalid action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid action. Use 'generateDay' or 'generateShoppingList'"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to process meal plan request"
 *                 details:
 *                   type: string
 *                   example: "Unknown error"
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Sanitize request body
    const action = InputSanitizer.sanitizeString(body.action || '', 50);
    const day = InputSanitizer.sanitizeString(body.day || '', 20);
    const budget = InputSanitizer.sanitizeNumber(body.budget || 25);
    const dietaryPreferences = body.dietaryPreferences || {};
    const ingredients = InputSanitizer.sanitizeArray(body.ingredients || [], 20);
    const mealPlan = body.mealPlan || {};
    const availableIngredients = InputSanitizer.sanitizeArray(body.availableIngredients || [], 50);
    const locationId = InputSanitizer.sanitizeString(body.locationId || '', 20);

    if (action === 'generateDay') {
      const generatedMealPlan = await mealPlanningService.generateMealPlan({
        ingredients: ingredients || [],
        day: day || 'Monday',
        budget: budget || 25,
        dietaryPreferences,
      });

      return Response.json(generatedMealPlan);
    }

    if (action === 'generateShoppingList') {
      const shoppingList = await mealPlanningService.generateShoppingList({
        mealPlan,
        availableIngredients: availableIngredients || [],
        budget: budget || 75,
        dietaryPreferences,
        locationId: locationId || CONFIG.DEFAULT_LOCATION,
      });

      return Response.json(shoppingList);
    }

    return Response.json(
      {
        error: 'Invalid action. Use "generateDay" or "generateShoppingList"',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in meal plan API:', error);
    return Response.json(
      {
        error: 'Failed to process meal plan request',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
