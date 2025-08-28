import { withAccelerate } from '@prisma/extension-accelerate';

import { PrismaClient } from '../../../prisma/generated/client';

/**
 * @swagger
 * components:
 *   schemas:
 *     SyncOperation:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Unique operation identifier
 *         operation:
 *           type: string
 *           enum: [CREATE, UPDATE, DELETE]
 *           description: Type of sync operation
 *         table_name:
 *           type: string
 *           description: Database table name
 *         record_id:
 *           type: string
 *           description: Record identifier
 *         record_data:
 *           type: object
 *           description: Record data for the operation
 *         timestamp:
 *           type: string
 *           format: date-time
 *           description: Operation timestamp
 *     SyncResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Whether the sync was successful
 *         processed:
 *           type: integer
 *           description: Number of operations processed
 *         total:
 *           type: integer
 *           description: Total number of operations
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *           description: List of errors if any
 *     SyncStatus:
 *       type: object
 *       properties:
 *         lastSyncTime:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Last successful sync timestamp
 *         status:
 *           type: string
 *           description: Current sync status
 *           example: "ready"
 *     SyncData:
 *       type: object
 *       properties:
 *         healthProfiles:
 *           type: array
 *           items:
 *             type: object
 *           description: Health profile data
 *         workouts:
 *           type: array
 *           items:
 *             type: object
 *           description: Workout data with exercises
 *         meals:
 *           type: array
 *           items:
 *             type: object
 *           description: Meal data
 *         progressLogs:
 *           type: array
 *           items:
 *             type: object
 *           description: Progress log data
 */

const prisma = new PrismaClient().$extends(withAccelerate());

interface SyncOperation {
  id: string;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  table_name: string;
  record_id: string;
  record_data?: any;
  timestamp: string;
  request?: Request; // Added for request context in operations
}

// Authentication and authorization helper
async function getAuthenticatedUser(request: Request) {
  // Extract user ID from request headers (set by client)
  const userId = request.headers.get('x-user-id');
  if (!userId) {
    throw new Error('Unauthorized: User not authenticated');
  }
  return userId;
}

// Authorization helper to ensure user owns the data
async function validateUserOwnership(tableName: string, recordData: any, operation: string, request: Request) {
  const authenticatedUserId = await getAuthenticatedUser(request);

  // Check if the record belongs to the authenticated user
  if (recordData.userId && recordData.userId !== authenticatedUserId) {
    throw new Error(
      `Unauthorized: User ${authenticatedUserId} cannot ${operation} ${tableName} record for user ${recordData.userId}`
    );
  }

  return authenticatedUserId;
}

// Handle CREATE operations
async function handleCreateOperation(operation: SyncOperation, request: Request) {
  const { table_name, record_data } = operation;

  console.log(`🔄 Sync API - handleCreateOperation for ${table_name}:`, record_data);

  if (!record_data) {
    console.warn(`❌ Sync API - No record data for CREATE operation on ${table_name}:${operation.record_id}`);
    return;
  }

  try {
    // Validate user ownership for all operations except user creation
    if (table_name !== 'users') {
      await validateUserOwnership(table_name, record_data, 'create', request);
    }

    switch (table_name) {
      case 'users': {
        // For user creation, ensure the user is creating their own record
        const authenticatedUserId = await getAuthenticatedUser(request);
        if (record_data.id !== authenticatedUserId && record_data.clerkId !== authenticatedUserId) {
          throw new Error(`Unauthorized: User ${authenticatedUserId} cannot create user record for ${record_data.id}`);
        }

        console.log(`🔄 Sync API - Creating/updating user:`, record_data);
        const result = await prisma.user.upsert({
          where: { id: record_data.id },
          update: record_data,
          create: {
            id: record_data.id,
            clerkId: record_data.clerkId || record_data.id,
            name: record_data.name,
            email: record_data.email,
          },
        });
        console.log(`✅ Sync API - User upsert result:`, result);
        break;
      }
      case 'health_profiles': {
        // First, ensure the user exists in the cloud database and is up to date
        const user = await prisma.user.findUnique({
          where: { clerkId: record_data.userId },
        });

        if (!user) {
          console.log(`🔄 Sync API - Creating user for health profile: ${record_data.userId}`);
          // Create user with actual data from the local database
          await prisma.user.create({
            data: {
              id: record_data.userId, // Use the userId as the local ID
              clerkId: record_data.userId, // Use the same value as clerkId
              name: record_data.name || `User ${record_data.userId}`,
              email: record_data.email || null,
            },
          });
        } else {
          // Check if user data needs to be updated
          const needsUpdate = user.name !== record_data.name || user.email !== record_data.email;

          if (needsUpdate) {
            console.log(`🔄 Sync API - Updating user data for: ${record_data.userId}`);
            await prisma.user.update({
              where: { clerkId: record_data.userId },
              data: {
                name: record_data.name || user.name,
                email: record_data.email || user.email,
                updatedAt: new Date(),
              },
            });
          }
        }

        await prisma.healthProfile.upsert({
          where: { id: record_data.id },
          update: {
            height: record_data.height,
            weight: record_data.weight,
            age: record_data.age,
            gender: record_data.gender,
            targetWeight: record_data.targetWeight,
            targetCalories: record_data.targetCalories,
            targetWaterL: record_data.targetWaterL,
            activityLevel: record_data.activityLevel,
            fitnessGoal: record_data.fitnessGoal,
            heightUnit: record_data.heightUnit,
            weightUnit: record_data.weightUnit,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
          create: {
            id: record_data.id,
            user: {
              connect: { clerkId: record_data.userId }, // Use clerkId instead of userId
            },
            height: record_data.height,
            weight: record_data.weight,
            age: record_data.age,
            gender: record_data.gender,
            targetWeight: record_data.targetWeight,
            targetCalories: record_data.targetCalories,
            targetWaterL: record_data.targetWaterL,
            activityLevel: record_data.activityLevel,
            fitnessGoal: record_data.fitnessGoal,
            heightUnit: record_data.heightUnit || 'cm',
            weightUnit: record_data.weightUnit || 'kg',
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'workouts': {
        await prisma.workout.upsert({
          where: { id: record_data.id },
          update: {
            title: record_data.title,
            durationMin: record_data.durationMin,
            calories: record_data.calories,
            date: new Date(record_data.date),
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
          create: {
            id: record_data.id,
            title: record_data.title,
            category: record_data.category || 'strength',
            durationMin: record_data.durationMin,
            calories: record_data.calories,
            date: new Date(record_data.date),
            syncedAt: new Date(),
            user: {
              connect: { id: record_data.userId },
            },
          },
        });
        break;
      }
      case 'exercises': {
        await prisma.exercise.upsert({
          where: { id: record_data.id },
          update: {
            name: record_data.name,
            sets: record_data.sets,
            reps: record_data.reps,
            weightKg: record_data.weightKg,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
          create: {
            id: record_data.id,
            workoutId: record_data.workoutId,
            name: record_data.name,
            sets: record_data.sets,
            reps: record_data.reps,
            weightKg: record_data.weightKg,
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'meals': {
        await prisma.meal.upsert({
          where: { id: record_data.id },
          update: {
            name: record_data.name,
            calories: record_data.calories,
            protein: record_data.protein,
            carbs: record_data.carbs,
            fat: record_data.fat,
            date: new Date(record_data.date),
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
          create: {
            id: record_data.id,
            name: record_data.name,
            mealType: record_data.mealType || 'snack',
            calories: record_data.calories,
            protein: record_data.protein,
            carbs: record_data.carbs,
            fat: record_data.fat,
            date: new Date(record_data.date),
            syncedAt: new Date(),
            user: {
              connect: { id: record_data.userId },
            },
          },
        });
        break;
      }
      case 'progress_logs': {
        await prisma.progressLog.upsert({
          where: { id: record_data.id },
          update: {
            waterL: record_data.waterL,
            sleepHrs: record_data.sleepHrs,
            mood: record_data.mood,
            weightKg: record_data.weightKg,
            date: new Date(record_data.date),
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
          create: {
            id: record_data.id,
            userId: record_data.userId,
            waterL: record_data.waterL,
            sleepHrs: record_data.sleepHrs,
            mood: record_data.mood,
            weightKg: record_data.weightKg,
            date: new Date(record_data.date),
            syncedAt: new Date(),
          },
        });
        break;
      }
      default:
        console.warn(`Unknown table for CREATE operation: ${table_name}`);
    }
  } catch (error) {
    console.error(`Error handling CREATE operation for ${table_name}:`, error);
    throw error;
  }
}

// Handle UPDATE operations
async function handleUpdateOperation(operation: SyncOperation, request: Request) {
  const { table_name, record_data } = operation;

  console.log(`🔄 Sync API - handleUpdateOperation for ${table_name}:`, record_data);

  if (!record_data) {
    console.warn(`❌ Sync API - No record data for UPDATE operation on ${table_name}:${operation.record_id}`);
    return;
  }

  try {
    // Validate user ownership for all operations except user creation
    if (table_name !== 'users') {
      await validateUserOwnership(table_name, record_data, 'update', request);
    }

    switch (table_name) {
      case 'users': {
        // For user updates, ensure the user is updating their own record
        const authenticatedUserId = await getAuthenticatedUser(request);
        if (record_data.id !== authenticatedUserId && record_data.clerkId !== authenticatedUserId) {
          throw new Error(`Unauthorized: User ${authenticatedUserId} cannot update user record for ${record_data.id}`);
        }

        await prisma.user.update({
          where: { id: record_data.id },
          data: {
            name: record_data.name,
            email: record_data.email,
            updatedAt: new Date(),
          },
        });
        break;
      }
      case 'health_profiles': {
        await prisma.healthProfile.update({
          where: { id: record_data.id },
          data: {
            height: record_data.height,
            weight: record_data.weight,
            age: record_data.age,
            gender: record_data.gender,
            targetWeight: record_data.targetWeight,
            targetCalories: record_data.targetCalories,
            targetWaterL: record_data.targetWaterL,
            activityLevel: record_data.activityLevel,
            fitnessGoal: record_data.fitnessGoal,
            heightUnit: record_data.heightUnit,
            weightUnit: record_data.weightUnit,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'workouts': {
        await prisma.workout.update({
          where: { id: record_data.id },
          data: {
            title: record_data.title,
            durationMin: record_data.durationMin,
            calories: record_data.calories,
            date: new Date(record_data.date),
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'exercises': {
        await prisma.exercise.update({
          where: { id: record_data.id },
          data: {
            name: record_data.name,
            sets: record_data.sets,
            reps: record_data.reps,
            weightKg: record_data.weightKg,
            duration: record_data.duration,
            distance: record_data.distance,
            restTime: record_data.restTime,
            order: record_data.order,
            isCompleted: record_data.isCompleted,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'meals': {
        await prisma.meal.update({
          where: { id: record_data.id },
          data: {
            name: record_data.name,
            mealType: record_data.mealType,
            calories: record_data.calories,
            protein: record_data.protein,
            carbs: record_data.carbs,
            fat: record_data.fat,
            date: new Date(record_data.date),
            notes: record_data.notes,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'meal_items': {
        await prisma.mealItem.update({
          where: { id: record_data.id },
          data: {
            name: record_data.name,
            calories: record_data.calories,
            protein: record_data.protein,
            carbs: record_data.carbs,
            fat: record_data.fat,
            quantity: record_data.quantity,
            unit: record_data.unit,
            isHighInProtein: record_data.isHighInProtein,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'weight_entries': {
        await prisma.weightEntry.update({
          where: { id: record_data.id },
          data: {
            weightKg: record_data.weightKg,
            date: new Date(record_data.date),
            photo: record_data.photo,
            notes: record_data.notes,
            bodyFatPercentage: record_data.bodyFatPercentage,
            muscleMassKg: record_data.muscleMassKg,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'water_intake': {
        await prisma.waterIntake.update({
          where: { id: record_data.id },
          data: {
            amountMl: record_data.amountMl,
            date: new Date(record_data.date),
            time: new Date(record_data.time),
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'sleep_entries': {
        await prisma.sleepEntry.update({
          where: { id: record_data.id },
          data: {
            hours: record_data.hours,
            quality: record_data.quality,
            date: new Date(record_data.date),
            bedtime: record_data.bedtime ? new Date(record_data.bedtime) : null,
            wakeTime: record_data.wakeTime ? new Date(record_data.wakeTime) : null,
            notes: record_data.notes,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'progress_logs': {
        await prisma.progressLog.update({
          where: { id: record_data.id },
          data: {
            date: new Date(record_data.date),
            waterL: record_data.waterL,
            sleepHrs: record_data.sleepHrs,
            mood: record_data.mood,
            weightKg: record_data.weightKg,
            steps: record_data.steps,
            activeMinutes: record_data.activeMinutes,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'goals': {
        await prisma.goal.update({
          where: { id: record_data.id },
          data: {
            type: record_data.type,
            target: record_data.target,
            current: record_data.current,
            unit: record_data.unit,
            startDate: new Date(record_data.startDate),
            endDate: record_data.endDate ? new Date(record_data.endDate) : null,
            isActive: record_data.isActive,
            notes: record_data.notes,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      default:
        console.warn(`Unknown table for UPDATE operation: ${table_name}`);
    }
  } catch (error) {
    console.error(`Error handling UPDATE operation for ${table_name}:`, error);
    throw error;
  }
}

// Handle DELETE operations (soft delete)
async function handleDeleteOperation(operation: SyncOperation, request: Request) {
  const { table_name, record_id } = operation;

  console.log(`🔄 Sync API - handleDeleteOperation for ${table_name}:${record_id}`);

  try {
    // For DELETE operations, we need to fetch the record first to validate ownership
    let recordData: any = null;

    switch (table_name) {
      case 'health_profiles':
        recordData = await prisma.healthProfile.findUnique({ where: { id: record_id } });
        break;
      case 'workouts':
        recordData = await prisma.workout.findUnique({ where: { id: record_id } });
        break;
      case 'exercises':
        recordData = await prisma.exercise.findUnique({ where: { id: record_id } });
        break;
      case 'meals':
        recordData = await prisma.meal.findUnique({ where: { id: record_id } });
        break;
      case 'meal_items':
        recordData = await prisma.mealItem.findUnique({ where: { id: record_id } });
        break;
      case 'weight_entries':
        recordData = await prisma.weightEntry.findUnique({ where: { id: record_id } });
        break;
      case 'water_intake':
        recordData = await prisma.waterIntake.findUnique({ where: { id: record_id } });
        break;
      case 'sleep_entries':
        recordData = await prisma.sleepEntry.findUnique({ where: { id: record_id } });
        break;
      case 'progress_logs':
        recordData = await prisma.progressLog.findUnique({ where: { id: record_id } });
        break;
      case 'goals':
        recordData = await prisma.goal.findUnique({ where: { id: record_id } });
        break;
    }

    if (recordData) {
      await validateUserOwnership(table_name, recordData, 'delete', request);
    }

    switch (table_name) {
      case 'users': {
        console.log(`Soft delete not implemented for users: ${record_id}`);
        break;
      }
      case 'health_profiles': {
        await prisma.healthProfile.update({
          where: { id: record_id },
          data: {
            isDeleted: true,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'workouts': {
        await prisma.workout.update({
          where: { id: record_id },
          data: {
            isDeleted: true,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'exercises': {
        await prisma.exercise.update({
          where: { id: record_id },
          data: {
            isDeleted: true,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'meals': {
        await prisma.meal.update({
          where: { id: record_id },
          data: {
            isDeleted: true,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      case 'progress_logs': {
        await prisma.progressLog.update({
          where: { id: record_id },
          data: {
            isDeleted: true,
            updatedAt: new Date(),
            syncedAt: new Date(),
          },
        });
        break;
      }
      default:
        console.warn(`Unknown table for DELETE operation: ${table_name}`);
    }
  } catch (error) {
    console.error(`Error handling DELETE operation for ${table_name}:`, error);
    throw error;
  }
}

/**
 * @swagger
 * /api/sync:
 *   post:
 *     summary: Sync data operations
 *     description: Process multiple data operations (CREATE, UPDATE, DELETE) for synchronization
 *     tags: [Sync]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - operations
 *             properties:
 *               operations:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/SyncOperation'
 *                 description: Array of sync operations to process
 *     responses:
 *       200:
 *         description: Sync operations processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SyncResponse'
 *       400:
 *         description: Bad request - invalid operations data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid operations data"
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: User not authenticated"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Sync failed"
 *                 details:
 *                   type: string
 *                   example: "Unknown error"
 */
// Main sync handler
export async function POST(request: Request) {
  try {
    console.log('🔄 Sync API - received POST request');
    const body = await request.json();
    console.log('🔄 Sync API - request body:', body);

    const { operations } = body;

    if (!operations || !Array.isArray(operations)) {
      console.error('❌ Sync API - Invalid operations data:', operations);
      return Response.json({ error: 'Invalid operations data' }, { status: 400 });
    }

    let syncedCount = 0;
    const errors: { operationId: string; error: string }[] = [];

    for (const operation of operations) {
      try {
        console.log(`🔄 Sync API - processing operation:`, operation);

        switch (operation.operation) {
          case 'CREATE':
            console.log(`🔄 Sync API - handling CREATE operation for ${operation.table_name}`);
            await handleCreateOperation(operation, request);
            syncedCount++;
            console.log(`✅ Sync API - CREATE operation completed for ${operation.table_name}`);
            break;
          case 'UPDATE':
            console.log(`🔄 Sync API - handling UPDATE operation for ${operation.table_name}`);
            await handleUpdateOperation(operation, request);
            syncedCount++;
            console.log(`✅ Sync API - UPDATE operation completed for ${operation.table_name}`);
            break;
          case 'DELETE':
            console.log(`🔄 Sync API - handling DELETE operation for ${operation.table_name}`);
            await handleDeleteOperation(operation, request);
            syncedCount++;
            console.log(`✅ Sync API - DELETE operation completed for ${operation.table_name}`);
            break;
          default:
            console.warn(`❌ Sync API - Unknown operation type: ${operation.operation}`);
            errors.push({
              operationId: operation.id,
              error: `Unknown operation type: ${operation.operation}`,
            });
        }
      } catch (error) {
        console.error(`❌ Sync API - Error processing operation:`, operation, error);
        errors.push({
          operationId: operation.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
        // Continue with other operations even if one fails
      }
    }

    console.log(
      `🔄 Sync API - sync completed. Synced: ${syncedCount}, Total: ${operations.length}, Errors: ${errors.length}`
    );

    return Response.json({
      success: true,
      synced: syncedCount,
      total: operations.length,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error('Sync API error:', error);
    return Response.json(
      {
        error: 'Sync failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * @swagger
 * /api/sync:
 *   get:
 *     summary: Get sync status or fetch data
 *     description: Retrieve sync status or fetch user data for synchronization
 *     tags: [Sync]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: action
 *         required: true
 *         schema:
 *           type: string
 *           enum: [status, fetch]
 *         description: Action to perform
 *         example: "status"
 *       - in: query
 *         name: since
 *         schema:
 *           type: string
 *           format: date-time
 *         description: ISO date string for fetching data since this time (only for fetch action)
 *         example: "2024-01-01T00:00:00.000Z"
 *     responses:
 *       200:
 *         description: Sync status or data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/SyncStatus'
 *                 - $ref: '#/components/schemas/SyncData'
 *       400:
 *         description: Bad request - invalid action
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid action"
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized: User not authenticated"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to get sync status"
 *                 details:
 *                   type: string
 *                   example: "Unknown error"
 */
// GET handler for sync status and data retrieval
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (action === 'status') {
      // Get sync status
      const lastSyncResult = await prisma.$queryRaw`
        SELECT MAX(synced_at) as lastSyncTime FROM (
          SELECT synced_at FROM "HealthProfile" WHERE synced_at IS NOT NULL
          UNION ALL
          SELECT synced_at FROM "Workout" WHERE synced_at IS NOT NULL
          UNION ALL
          SELECT synced_at FROM "Exercise" WHERE synced_at IS NOT NULL
          UNION ALL
          SELECT synced_at FROM "Meal" WHERE synced_at IS NOT NULL
          UNION ALL
          SELECT synced_at FROM "ProgressLog" WHERE synced_at IS NOT NULL
        )
      `;

      return Response.json({
        lastSyncTime: (lastSyncResult as any)[0]?.lastSyncTime || null,
        status: 'ready',
      });
    }

    if (action === 'fetch') {
      // Fetch data for the authenticated user only
      const authenticatedUserId = await getAuthenticatedUser(request);
      const since = searchParams.get('since'); // ISO date string

      const data = {
        healthProfiles: await prisma.healthProfile.findMany({
          where: {
            userId: authenticatedUserId,
            isDeleted: false,
            ...(since && { updatedAt: { gte: new Date(since) } }),
          },
        }),
        workouts: await prisma.workout.findMany({
          where: {
            userId: authenticatedUserId,
            isDeleted: false,
            ...(since && { updatedAt: { gte: new Date(since) } }),
          },
          include: {
            exercises: {
              where: { isDeleted: false },
            },
          },
        }),
        meals: await prisma.meal.findMany({
          where: {
            userId: authenticatedUserId,
            isDeleted: false,
            ...(since && { updatedAt: { gte: new Date(since) } }),
          },
        }),
        progressLogs: await prisma.progressLog.findMany({
          where: {
            userId: authenticatedUserId,
            isDeleted: false,
            ...(since && { updatedAt: { gte: new Date(since) } }),
          },
        }),
      };

      return Response.json(data);
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Sync status API error:', error);
    return Response.json(
      {
        error: 'Failed to get sync status',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
