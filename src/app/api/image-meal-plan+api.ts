import { CONFIG } from '@/lib/api-utils';

/**
 * @swagger
 * components:
 *   schemas:
 *     ExtractedIngredient:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Ingredient name
 *           example: "tomato"
 *         confidence:
 *           type: number
 *           minimum: 0
 *           maximum: 1
 *           description: Confidence score (0-1)
 *           example: 0.9
 *         quantity:
 *           type: number
 *           description: Detected quantity
 *           example: 2
 *         unit:
 *           type: string
 *           description: Unit of measurement
 *           example: "pieces"
 *         notes:
 *           type: string
 *           description: Additional notes about the ingredient
 *           example: "Extracted from image"
 *     ImageAnalysisResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Whether the analysis was successful
 *           example: true
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExtractedIngredient'
 *           description: List of extracted ingredients
 *         message:
 *           type: string
 *           description: Success message
 *           example: "Found 5 ingredients in the image"
 */

// Type definitions
interface ExtractedIngredient {
  name: string;
  confidence: number;
  quantity?: number;
  unit?: string;
  notes?: string;
}

// Image analysis service
class ImageAnalysisService {
  async extractIngredients(imageDataUrl: string): Promise<ExtractedIngredient[]> {
    if (!CONFIG.AIML.API_KEY) {
      throw new Error('AIML API key not configured');
    }

    const response = await fetch(`${CONFIG.AIML.BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CONFIG.AIML.API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: CONFIG.AIML.MODEL,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'List all food ingredients you can see in this image. Return only a JSON array of objects with \'name\' and \'confidence\' fields. Example: [{"name": "tomato", "confidence": 0.9}]. Focus on main ingredients only.',
              },
              {
                type: 'image_url',
                image_url: { url: imageDataUrl },
              },
            ],
          },
        ],
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`AIML API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content in AIML response');
    }

    return this.parseIngredientsResponse(content);
  }

  private parseIngredientsResponse(content: string): ExtractedIngredient[] {
    const cleanedContent = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');

    try {
      const ingredients = JSON.parse(cleanedContent);
      if (Array.isArray(ingredients)) {
        return ingredients.map((ing: any) => ({
          name: ing.name || 'unknown',
          confidence: ing.confidence || 0.5,
          quantity: ing.quantity,
          unit: ing.unit,
          notes: ing.notes || 'Extracted from image',
        }));
      }
    } catch (error) {
      console.error('Failed to parse JSON response:', error);
    }

    return this.extractIngredientsFromText(content);
  }

  private extractIngredientsFromText(text: string): ExtractedIngredient[] {
    const foodKeywords = [
      'tomato',
      'onion',
      'garlic',
      'carrot',
      'potato',
      'lettuce',
      'spinach',
      'chicken',
      'beef',
      'pork',
      'fish',
      'salmon',
      'rice',
      'pasta',
      'bread',
      'milk',
      'cheese',
      'egg',
      'oil',
      'butter',
      'flour',
      'sugar',
      'salt',
    ];

    const ingredients: ExtractedIngredient[] = [];
    const lowerText = text.toLowerCase();

    for (const keyword of foodKeywords) {
      if (lowerText.includes(keyword)) {
        const existing = ingredients.find((ing) => ing.name.toLowerCase() === keyword);
        if (!existing) {
          ingredients.push({
            name: keyword,
            confidence: 0.6,
            notes: 'Extracted from text analysis',
          });
        }
      }
    }

    return ingredients;
  }
}

const imageAnalysisService = new ImageAnalysisService();

/**
 * @swagger
 * /api/image-meal-plan:
 *   post:
 *     summary: Extract ingredients from food images
 *     description: Use AI vision to identify food ingredients in uploaded images
 *     tags: [Image Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Food image file (JPEG, PNG, etc.)
 *     responses:
 *       200:
 *         description: Ingredients extracted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ImageAnalysisResponse'
 *       400:
 *         description: Bad request - invalid file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No image file provided"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to extract ingredients from image"
 *                 details:
 *                   type: string
 *                   example: "AIML API credentials not configured"
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const imageFile = (formData as any).get('image') as File | null;

    if (!imageFile) {
      return Response.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Validate file type and size
    if (!imageFile.type.startsWith('image/')) {
      return Response.json({ error: 'File must be an image' }, { status: 400 });
    }

    if (imageFile.size > 5 * 1024 * 1024) {
      return Response.json({ error: 'Image file too large (max 5MB)' }, { status: 400 });
    }

    // Convert image to base64
    const arrayBuffer = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    const dataUrl = `data:${imageFile.type};base64,${base64Image}`;

    // Extract ingredients using AI vision service
    const ingredients = await imageAnalysisService.extractIngredients(dataUrl);

    return Response.json({
      success: true,
      ingredients,
      message: `Found ${ingredients.length} ingredients in the image`,
    });
  } catch (error) {
    console.error('Image ingredient extraction error:', error);

    return Response.json(
      {
        error: 'Failed to extract ingredients from image',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
