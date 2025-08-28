/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test API endpoint
 *     description: Simple test endpoint to verify API routes are working
 *     tags: [Testing]
 *     responses:
 *       200:
 *         description: API is working
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "API routes are working!"
 */
export function GET() {
  return Response.json({ message: 'API routes are working!' });
}
