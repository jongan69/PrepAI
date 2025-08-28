import * as SQLite from 'expo-sqlite';

import { useSyncStore } from '@/stores/sync-store';
import { syncService } from '@/services/sync-service';

// Database configuration
const DATABASE_NAME = 'prepai-v2.db';
const DATABASE_VERSION = 1;

// Types matching enhanced Prisma schema
export interface User {
  id: string;
  clerkId: string;
  name?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface HealthProfile {
  id: string;
  userId: string;
  height?: number; // Height value (always stored in cm)
  weight?: number; // Weight value (always stored in kg)
  age?: number;
  gender?: string; // 'Male' | 'Female'
  birthday?: string;
  targetWeight?: number; // Target weight (always stored in kg)
  targetCalories?: number;
  targetWaterL?: number;
  activityLevel?: string; // 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'
  fitnessGoal?: string; // 'lose_weight' | 'gain_weight' | 'maintain' | 'build_muscle' | 'improve_fitness'
  heightUnit?: string; // 'cm' | 'in'
  weightUnit?: string; // 'kg' | 'lb'
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
  isDeleted: boolean;
}

export interface Workout {
  id: string;
  userId: string;
  title: string;
  category: string; // 'strength' | 'cardio' | 'yoga' | 'pilates' | 'functional' | 'flexibility'
  durationMin?: number;
  calories?: number;
  date: string;
  notes?: string;
  isCompleted: boolean;
  totalTime?: number; // Total time in seconds
  restTime?: number; // Total rest time in seconds
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
  isDeleted: boolean;
}

export interface Exercise {
  id: string;
  workoutId: string;
  name: string;
  sets?: number;
  reps?: number;
  weightKg?: number;
  duration?: number; // Duration in seconds
  distance?: number; // Distance in meters
  restTime?: number; // Rest time in seconds
  order: number; // Exercise order in workout
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
  isDeleted: boolean;
}

export interface Meal {
  id: string;
  userId: string;
  name: string;
  mealType: string; // 'breakfast' | 'lunch' | 'dinner' | 'snack'
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  date: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
  isDeleted: boolean;
}

export interface MealItem {
  id: string;
  mealId: string;
  userId: string;
  name: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  quantity?: number; // Quantity in grams or units
  unit?: string; // Unit of measurement
  isHighInProtein: boolean;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
  isDeleted: boolean;
}

export interface ProgressLog {
  id: string;
  userId: string;
  date: string;
  waterL?: number;
  sleepHrs?: number;
  mood?: string; // 'poor' | 'fair' | 'good' | 'excellent'
  weightKg?: number;
  steps?: number;
  activeMinutes?: number;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
  isDeleted: boolean;
}

export interface WeightEntry {
  id: string;
  userId: string;
  weightKg: number;
  date: string;
  photo?: string; // URL or path to photo
  notes?: string;
  bodyFatPercentage?: number;
  muscleMassKg?: number;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
  isDeleted: boolean;
}

export interface WaterIntake {
  id: string;
  userId: string;
  amountMl: number; // Amount in milliliters
  date: string;
  time: string; // Specific time of intake
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
  isDeleted: boolean;
}

export interface SleepEntry {
  id: string;
  userId: string;
  hours: number;
  quality: string; // 'poor' | 'fair' | 'good' | 'excellent'
  date: string;
  bedtime?: string;
  wakeTime?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
  isDeleted: boolean;
}

export interface Goal {
  id: string;
  userId: string;
  type: string; // 'weight' | 'calories' | 'workouts' | 'water' | 'sleep' | 'steps' | 'strength'
  target: number;
  current: number;
  unit: string; // 'kg' | 'calories' | 'workouts' | 'liters' | 'hours' | 'steps' | 'kg'
  startDate: string;
  endDate?: string;
  isActive: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  syncedAt?: string;
  isDeleted: boolean;
}

// Database class
class PrepAIDatabase {
  private db: SQLite.SQLiteDatabase | null = null;

  async init(): Promise<void> {
    try {
      this.db = await SQLite.openDatabaseAsync(DATABASE_NAME);
      await this.migrate();
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  private async migrate(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // Get current database version
    const results = await this.db.getAllAsync<{ user_version: number }>('PRAGMA user_version');
    const currentVersion = results.length > 0 ? results[0].user_version : 0;

    if (currentVersion >= DATABASE_VERSION) {
      return;
    }

    // Set WAL mode before any transactions
    await this.db.execAsync('PRAGMA journal_mode = WAL');
    await this.db.execAsync('PRAGMA foreign_keys = ON');

    // Run migrations
    await this.db.withTransactionAsync(async () => {
      // Migration 1: Create initial tables matching enhanced Prisma schema
      if (currentVersion < 1) {
        await this.createTables();
      }

      // Update database version
      await this.db!.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
    });
  }

  private async createTables(): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.execAsync(`
      -- Users table (matching Prisma User model)
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        clerk_id TEXT UNIQUE NOT NULL,
        name TEXT,
        email TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now'))
      );

      -- Health profiles table (matching enhanced Prisma HealthProfile model)
      CREATE TABLE IF NOT EXISTS health_profiles (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        height_cm REAL,
        weight_kg REAL,
        age INTEGER,
        gender TEXT,
        birthday TEXT,
        target_weight_kg REAL,
        target_calories INTEGER DEFAULT 2000,
        target_water_l REAL DEFAULT 2.0,
        activity_level TEXT,
        fitness_goal TEXT,
        height_unit TEXT DEFAULT 'cm',
        weight_unit TEXT DEFAULT 'kg',
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        synced_at TEXT,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Workouts table (matching enhanced Prisma Workout model)
      CREATE TABLE IF NOT EXISTS workouts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        duration_min INTEGER,
        calories INTEGER,
        date TEXT NOT NULL,
        notes TEXT,
        is_completed BOOLEAN NOT NULL DEFAULT 0,
        total_time INTEGER,
        rest_time INTEGER,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        synced_at TEXT,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Exercises table (matching enhanced Prisma Exercise model)
      CREATE TABLE IF NOT EXISTS exercises (
        id TEXT PRIMARY KEY,
        workout_id TEXT NOT NULL,
        name TEXT NOT NULL,
        sets INTEGER,
        reps INTEGER,
        weight_kg REAL,
        duration INTEGER,
        distance REAL,
        rest_time INTEGER,
        exercise_order INTEGER NOT NULL DEFAULT 0,
        is_completed BOOLEAN NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        synced_at TEXT,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (workout_id) REFERENCES workouts (id) ON DELETE CASCADE
      );

      -- Meals table (matching enhanced Prisma Meal model)
      CREATE TABLE IF NOT EXISTS meals (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        meal_type TEXT NOT NULL,
        calories INTEGER,
        protein REAL,
        carbs REAL,
        fat REAL,
        date TEXT NOT NULL,
        notes TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        synced_at TEXT,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Meal items table (matching enhanced Prisma MealItem model)
      CREATE TABLE IF NOT EXISTS meal_items (
        id TEXT PRIMARY KEY,
        meal_id TEXT NOT NULL,
        user_id TEXT NOT NULL,
        name TEXT NOT NULL,
        calories INTEGER,
        protein REAL,
        carbs REAL,
        fat REAL,
        quantity REAL,
        unit TEXT,
        is_high_in_protein BOOLEAN NOT NULL DEFAULT 0,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        synced_at TEXT,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (meal_id) REFERENCES meals (id) ON DELETE CASCADE,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Progress logs table (matching enhanced Prisma ProgressLog model)
      CREATE TABLE IF NOT EXISTS progress_logs (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        date TEXT NOT NULL,
        water_l REAL,
        sleep_hrs REAL,
        mood TEXT,
        weight_kg REAL,
        steps INTEGER,
        active_minutes INTEGER,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        synced_at TEXT,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Weight entries table (matching enhanced Prisma WeightEntry model)
      CREATE TABLE IF NOT EXISTS weight_entries (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        weight_kg REAL NOT NULL,
        date TEXT NOT NULL,
        photo TEXT,
        notes TEXT,
        body_fat_percentage REAL,
        muscle_mass_kg REAL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        synced_at TEXT,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Water intake table (matching enhanced Prisma WaterIntake model)
      CREATE TABLE IF NOT EXISTS water_intake (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        amount_ml INTEGER NOT NULL,
        date TEXT NOT NULL,
        time TEXT NOT NULL,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        synced_at TEXT,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Sleep entries table (matching enhanced Prisma SleepEntry model)
      CREATE TABLE IF NOT EXISTS sleep_entries (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        hours REAL NOT NULL,
        quality TEXT NOT NULL,
        date TEXT NOT NULL,
        bedtime TEXT,
        wake_time TEXT,
        notes TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        synced_at TEXT,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Goals table (matching enhanced Prisma Goal model)
      CREATE TABLE IF NOT EXISTS goals (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        type TEXT NOT NULL,
        target REAL NOT NULL,
        current REAL NOT NULL DEFAULT 0,
        unit TEXT NOT NULL,
        start_date TEXT NOT NULL,
        end_date TEXT,
        is_active BOOLEAN NOT NULL DEFAULT 1,
        notes TEXT,
        created_at TEXT NOT NULL DEFAULT (datetime('now')),
        updated_at TEXT NOT NULL DEFAULT (datetime('now')),
        synced_at TEXT,
        is_deleted BOOLEAN NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      );

      -- Create indexes for better performance
      CREATE INDEX IF NOT EXISTS idx_health_profiles_user ON health_profiles (user_id);
      CREATE INDEX IF NOT EXISTS idx_workouts_user_date ON workouts (user_id, date);
      CREATE INDEX IF NOT EXISTS idx_workouts_category ON workouts (category);
      CREATE INDEX IF NOT EXISTS idx_exercises_workout ON exercises (workout_id);
      CREATE INDEX IF NOT EXISTS idx_exercises_order ON exercises (exercise_order);
      CREATE INDEX IF NOT EXISTS idx_meals_user_date ON meals (user_id, date);
      CREATE INDEX IF NOT EXISTS idx_meals_type ON meals (meal_type);
      CREATE INDEX IF NOT EXISTS idx_meal_items_meal ON meal_items (meal_id);
      CREATE INDEX IF NOT EXISTS idx_progress_logs_user_date ON progress_logs (user_id, date);
      CREATE INDEX IF NOT EXISTS idx_weight_entries_user_date ON weight_entries (user_id, date);
      CREATE INDEX IF NOT EXISTS idx_water_intake_user_date ON water_intake (user_id, date);
      CREATE INDEX IF NOT EXISTS idx_sleep_entries_user_date ON sleep_entries (user_id, date);
      CREATE INDEX IF NOT EXISTS idx_goals_user_active ON goals (user_id, is_active);
      CREATE INDEX IF NOT EXISTS idx_synced_at ON health_profiles (synced_at);
      CREATE INDEX IF NOT EXISTS idx_synced_at_workouts ON workouts (synced_at);
      CREATE INDEX IF NOT EXISTS idx_synced_at_exercises ON exercises (synced_at);
      CREATE INDEX IF NOT EXISTS idx_synced_at_meals ON meals (synced_at);
      CREATE INDEX IF NOT EXISTS idx_synced_at_meal_items ON meal_items (synced_at);
      CREATE INDEX IF NOT EXISTS idx_synced_at_progress ON progress_logs (synced_at);
      CREATE INDEX IF NOT EXISTS idx_synced_at_weight ON weight_entries (synced_at);
      CREATE INDEX IF NOT EXISTS idx_synced_at_water ON water_intake (synced_at);
      CREATE INDEX IF NOT EXISTS idx_synced_at_sleep ON sleep_entries (synced_at);
      CREATE INDEX IF NOT EXISTS idx_synced_at_goals ON goals (synced_at);
    `);
  }

  // User operations
  async createUser(user: Omit<User, 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      'INSERT INTO users (id, clerk_id, name, email) VALUES (?, ?, ?, ?)',
      user.id,
      user.clerkId,
      user.name ?? null,
      user.email ?? null
    );

    // Track sync operation
    useSyncStore.getState().addOperation({
      operation: 'CREATE',
      tableName: 'users',
      recordId: user.id,
      recordData: user,
      timestamp: new Date().toISOString(),
    });
  }

  async getUser(id: string): Promise<User | null> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<User>('SELECT * FROM users WHERE id = ?', id);
    return results.length > 0 ? results[0] : null;
  }

  async getUserByClerkId(clerkId: string): Promise<User | null> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<User>(
      'SELECT * FROM users WHERE clerk_id = ?',
      clerkId
    );
    return results.length > 0 ? results[0] : null;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields = Object.keys(updates)
      .map((key) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = ?`)
      .join(', ');
    const values = Object.values(updates).map((val) => val ?? null);

    await this.db.runAsync(
      `UPDATE users SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
      ...values,
      id
    );

    // Track sync operation
    const existingUser = await this.getUser(id);
    if (existingUser) {
      useSyncStore.getState().addOperation({
        operation: 'UPDATE',
        tableName: 'users',
        recordId: id,
        recordData: { ...existingUser, ...updates },
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Get current user (for authentication purposes)
  async getCurrentUser(): Promise<User | null> {
    if (!this.db) throw new Error('Database not initialized');

    // This is a simplified implementation - in a real app, you'd get this from the auth context
    // For now, we'll return null as the current user should be managed by the DatabaseProvider
    return null;
  }

  // Health Profile operations
  async createHealthProfile(
    profile: Omit<HealthProfile, 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      `INSERT INTO health_profiles (
        id, user_id, height, weight, age, gender, birthday, 
        target_weight, target_calories, target_water_l, activity_level, fitness_goal, 
        synced_at, is_deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      profile.id,
      profile.userId,
      profile.height ?? null,
      profile.weight ?? null,
      profile.age ?? null,
      profile.gender ?? null,
      profile.birthday ?? null,
      profile.targetWeight ?? null,
      profile.targetCalories ?? null,
      profile.targetWaterL ?? null,
      profile.activityLevel ?? null,
      profile.fitnessGoal ?? null,
      profile.syncedAt ?? null,
      profile.isDeleted ? 1 : 0
    );

    // Track sync operation
    useSyncStore.getState().addOperation({
      operation: 'CREATE',
      tableName: 'health_profiles',
      recordId: profile.id,
      recordData: profile,
      timestamp: new Date().toISOString(),
    });
  }

  async getHealthProfile(userId: string): Promise<HealthProfile | null> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<HealthProfile>(
      'SELECT * FROM health_profiles WHERE user_id = ? AND is_deleted = 0',
      userId
    );
    return results.length > 0 ? results[0] : null;
  }

  async updateHealthProfile(id: string, updates: Partial<HealthProfile>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    // First, get the existing profile to validate ownership
    const existingProfile = await this.getHealthProfile(updates.userId || '');
    if (!existingProfile) {
      throw new Error('Health profile not found');
    }

    // Validate that the user is updating their own profile
    if (existingProfile.userId !== updates.userId) {
      throw new Error('Unauthorized: Cannot update health profile for another user');
    }

    const fields = Object.keys(updates)
      .map((key) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = ?`)
      .join(', ');
    const values = Object.values(updates).map((val) => val ?? null);

    await this.db.runAsync(
      `UPDATE health_profiles SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
      ...values,
      id
    );

    // Track sync operation
    if (existingProfile) {
      useSyncStore.getState().addOperation({
        operation: 'UPDATE',
        tableName: 'health_profiles',
        recordId: id,
        recordData: { ...existingProfile, ...updates },
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Workout operations
  async createWorkout(workout: Omit<Workout, 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      `INSERT INTO workouts (
        id, user_id, title, category, duration_min, calories, date, notes, 
        is_completed, total_time, rest_time, synced_at, is_deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      workout.id,
      workout.userId,
      workout.title,
      workout.category,
      workout.durationMin ?? null,
      workout.calories ?? null,
      workout.date,
      workout.notes ?? null,
      workout.isCompleted ? 1 : 0,
      workout.totalTime ?? null,
      workout.restTime ?? null,
      workout.syncedAt ?? null,
      workout.isDeleted ? 1 : 0
    );

    // Track sync operation
    useSyncStore.getState().addOperation({
      operation: 'CREATE',
      tableName: 'workouts',
      recordId: workout.id,
      recordData: workout,
      timestamp: new Date().toISOString(),
    });
  }

  async getWorkouts(userId: string, limit = 50): Promise<Workout[]> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<Workout>(
      'SELECT * FROM workouts WHERE user_id = ? AND is_deleted = 0 ORDER BY date DESC LIMIT ?',
      userId,
      limit
    );
    return results || [];
  }

  async getWorkoutsByCategory(userId: string, category: string): Promise<Workout[]> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<Workout>(
      'SELECT * FROM workouts WHERE user_id = ? AND category = ? AND is_deleted = 0 ORDER BY date DESC',
      userId,
      category
    );
    return results || [];
  }

  async updateWorkout(id: string, updates: Partial<Workout>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields = Object.keys(updates)
      .map((key) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = ?`)
      .join(', ');
    const values = Object.values(updates).map((val) => val ?? null);

    await this.db.runAsync(
      `UPDATE workouts SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
      ...values,
      id
    );

    // Track sync operation
    const existingWorkouts = await this.getWorkouts(updates.userId || '');
    const existingWorkout = existingWorkouts.find((w) => w.id === id);
    if (existingWorkout) {
      useSyncStore.getState().addOperation({
        operation: 'UPDATE',
        tableName: 'workouts',
        recordId: id,
        recordData: { ...existingWorkout, ...updates },
        timestamp: new Date().toISOString(),
      });
    }
  }

  async updateExercise(id: string, updates: Partial<Exercise>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields = Object.keys(updates)
      .map((key) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = ?`)
      .join(', ');
    const values = Object.values(updates).map((val) => val ?? null);

    await this.db.runAsync(
      `UPDATE exercises SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
      ...values,
      id
    );

    // Track sync operation
    const existingExercises = await this.getExercises(updates.workoutId || '');
    const existingExercise = existingExercises.find((e) => e.id === id);
    if (existingExercise) {
      useSyncStore.getState().addOperation({
        operation: 'UPDATE',
        tableName: 'exercises',
        recordId: id,
        recordData: { ...existingExercise, ...updates },
        timestamp: new Date().toISOString(),
      });
    }
  }

  // Exercise operations
  async createExercise(exercise: Omit<Exercise, 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      `INSERT INTO exercises (
        id, workout_id, name, sets, reps, weight_kg, duration, distance, 
        rest_time, exercise_order, is_completed, synced_at, is_deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      exercise.id,
      exercise.workoutId,
      exercise.name,
      exercise.sets ?? null,
      exercise.reps ?? null,
      exercise.weightKg ?? null,
      exercise.duration ?? null,
      exercise.distance ?? null,
      exercise.restTime ?? null,
      exercise.order,
      exercise.isCompleted ? 1 : 0,
      exercise.syncedAt ?? null,
      exercise.isDeleted ? 1 : 0
    );

    // Track sync operation
    useSyncStore.getState().addOperation({
      operation: 'CREATE',
      tableName: 'exercises',
      recordId: exercise.id,
      recordData: exercise,
      timestamp: new Date().toISOString(),
    });
  }

  async getExercises(workoutId: string): Promise<Exercise[]> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<Exercise>(
      'SELECT * FROM exercises WHERE workout_id = ? AND is_deleted = 0 ORDER BY exercise_order ASC',
      workoutId
    );
    return results || [];
  }

  // Meal operations
  async createMeal(meal: Omit<Meal, 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      `INSERT INTO meals (
        id, user_id, name, meal_type, calories, protein, carbs, fat, date, notes, 
        synced_at, is_deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      meal.id,
      meal.userId,
      meal.name,
      meal.mealType,
      meal.calories ?? null,
      meal.protein ?? null,
      meal.carbs ?? null,
      meal.fat ?? null,
      meal.date,
      meal.notes ?? null,
      meal.syncedAt ?? null,
      meal.isDeleted ? 1 : 0
    );
  }

  async getMeals(userId: string, limit = 50, date?: string): Promise<Meal[]> {
    if (!this.db) throw new Error('Database not initialized');

    let query: string;
    let params: any[];

    if (date) {
      // If date is provided, filter by date
      query = 'SELECT * FROM meals WHERE user_id = ? AND date = ? AND is_deleted = 0 ORDER BY date DESC LIMIT ?';
      params = [userId, date, limit];
    } else {
      // If no date provided, get all meals (original behavior)
      query = 'SELECT * FROM meals WHERE user_id = ? AND is_deleted = 0 ORDER BY date DESC LIMIT ?';
      params = [userId, limit];
    }

    const results = await this.db.getAllAsync<Meal>(query, ...params);
    return results || [];
  }

  async updateMeal(id: string, updates: Partial<Meal>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields = Object.keys(updates)
      .map((key) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = ?`)
      .join(', ');
    const values = Object.values(updates).map((val) => val ?? null);

    await this.db.runAsync(
      `UPDATE meals SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
      ...values,
      id
    );
  }

  async getMealsByType(userId: string, mealType: string, date: string): Promise<Meal[]> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<Meal>(
      'SELECT * FROM meals WHERE user_id = ? AND meal_type = ? AND date = ? AND is_deleted = 0',
      userId,
      mealType,
      date
    );
    return results || [];
  }

  // Meal Item operations
  async createMealItem(mealItem: Omit<MealItem, 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      `INSERT INTO meal_items (
        id, meal_id, user_id, name, calories, protein, carbs, fat, quantity, unit, 
        is_high_in_protein, synced_at, is_deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      mealItem.id,
      mealItem.mealId,
      mealItem.userId,
      mealItem.name,
      mealItem.calories ?? null,
      mealItem.protein ?? null,
      mealItem.carbs ?? null,
      mealItem.fat ?? null,
      mealItem.quantity ?? null,
      mealItem.unit ?? null,
      mealItem.isHighInProtein ? 1 : 0,
      mealItem.syncedAt ?? null,
      mealItem.isDeleted ? 1 : 0
    );
  }

  async getMealItems(mealId: string): Promise<MealItem[]> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<MealItem>(
      'SELECT * FROM meal_items WHERE meal_id = ? AND is_deleted = 0 ORDER BY created_at ASC',
      mealId
    );
    return results || [];
  }

  async updateMealItem(id: string, updates: Partial<MealItem>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields = Object.keys(updates)
      .map((key) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = ?`)
      .join(', ');
    const values = Object.values(updates).map((val) => val ?? null);

    await this.db.runAsync(
      `UPDATE meal_items SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
      ...values,
      id
    );
  }

  // Weight Entry operations
  async createWeightEntry(entry: Omit<WeightEntry, 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      `INSERT INTO weight_entries (
        id, user_id, weight_kg, date, photo, notes, body_fat_percentage, muscle_mass_kg, 
        synced_at, is_deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      entry.id,
      entry.userId,
      entry.weightKg,
      entry.date,
      entry.photo ?? null,
      entry.notes ?? null,
      entry.bodyFatPercentage ?? null,
      entry.muscleMassKg ?? null,
      entry.syncedAt ?? null,
      entry.isDeleted ? 1 : 0
    );
  }

  async getWeightEntries(userId: string, limit = 50): Promise<WeightEntry[]> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<WeightEntry>(
      'SELECT * FROM weight_entries WHERE user_id = ? AND is_deleted = 0 ORDER BY date DESC LIMIT ?',
      userId,
      limit
    );
    return results || [];
  }

  async updateWeightEntry(id: string, updates: Partial<WeightEntry>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields = Object.keys(updates)
      .map((key) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = ?`)
      .join(', ');
    const values = Object.values(updates).map((val) => val ?? null);

    await this.db.runAsync(
      `UPDATE weight_entries SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
      ...values,
      id
    );
  }

  async getLatestWeight(userId: string): Promise<WeightEntry | null> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<WeightEntry>(
      'SELECT * FROM weight_entries WHERE user_id = ? AND is_deleted = 0 ORDER BY date DESC LIMIT 1',
      userId
    );
    return results.length > 0 ? results[0] : null;
  }

  // Water Intake operations
  async createWaterIntake(entry: Omit<WaterIntake, 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      'INSERT INTO water_intake (id, user_id, amount_ml, date, time, synced_at, is_deleted) VALUES (?, ?, ?, ?, ?, ?, ?)',
      entry.id,
      entry.userId,
      entry.amountMl,
      entry.date,
      entry.time,
      entry.syncedAt ?? null,
      entry.isDeleted ? 1 : 0
    );
  }

  async getWaterIntake(userId: string, date: string): Promise<WaterIntake[]> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<WaterIntake>(
      'SELECT * FROM water_intake WHERE user_id = ? AND date = ? AND is_deleted = 0',
      userId,
      date
    );
    return results || [];
  }

  async updateWaterIntake(id: string, updates: Partial<WaterIntake>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields = Object.keys(updates)
      .map((key) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = ?`)
      .join(', ');
    const values = Object.values(updates).map((val) => val ?? null);

    await this.db.runAsync(
      `UPDATE water_intake SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
      ...values,
      id
    );
  }

  async getTotalWaterIntake(userId: string, date: string): Promise<number> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<{ total: number }>(
      'SELECT SUM(amount_ml) as total FROM water_intake WHERE user_id = ? AND date = ? AND is_deleted = 0',
      userId,
      date
    );
    return results.length > 0 ? results[0].total : 0;
  }

  // Sleep Entry operations
  async createSleepEntry(entry: Omit<SleepEntry, 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      `INSERT INTO sleep_entries (
        id, user_id, hours, quality, date, bedtime, wake_time, notes, 
        synced_at, is_deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      entry.id,
      entry.userId,
      entry.hours,
      entry.quality,
      entry.date,
      entry.bedtime ?? null,
      entry.wakeTime ?? null,
      entry.notes ?? null,
      entry.syncedAt ?? null,
      entry.isDeleted ? 1 : 0
    );
  }

  async getSleepEntry(userId: string, date: string): Promise<SleepEntry | null> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<SleepEntry>(
      'SELECT * FROM sleep_entries WHERE user_id = ? AND date = ? AND is_deleted = 0',
      userId,
      date
    );
    return results.length > 0 ? results[0] : null;
  }

  async updateSleepEntry(id: string, updates: Partial<SleepEntry>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields = Object.keys(updates)
      .map((key) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = ?`)
      .join(', ');
    const values = Object.values(updates).map((val) => val ?? null);

    await this.db.runAsync(
      `UPDATE sleep_entries SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
      ...values,
      id
    );
  }

  // Progress Log operations
  async createProgressLog(log: Omit<ProgressLog, 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      `INSERT INTO progress_logs (
        id, user_id, date, water_l, sleep_hrs, mood, weight_kg, steps, active_minutes, 
        synced_at, is_deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      log.id,
      log.userId,
      log.date,
      log.waterL ?? null,
      log.sleepHrs ?? null,
      log.mood ?? null,
      log.weightKg ?? null,
      log.steps ?? null,
      log.activeMinutes ?? null,
      log.syncedAt ?? null,
      log.isDeleted ? 1 : 0
    );
  }

  async getProgressLogs(userId: string, limit = 50): Promise<ProgressLog[]> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<ProgressLog>(
      'SELECT * FROM progress_logs WHERE user_id = ? AND is_deleted = 0 ORDER BY date DESC LIMIT ?',
      userId,
      limit
    );
    return results || [];
  }

  async updateProgressLog(id: string, updates: Partial<ProgressLog>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields = Object.keys(updates)
      .map((key) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = ?`)
      .join(', ');
    const values = Object.values(updates).map((val) => val ?? null);

    await this.db.runAsync(
      `UPDATE progress_logs SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
      ...values,
      id
    );
  }

  // Goal operations
  async createGoal(goal: Omit<Goal, 'createdAt' | 'updatedAt'>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    await this.db.runAsync(
      `INSERT INTO goals (
        id, user_id, type, target, current, unit, start_date, end_date, is_active, notes, 
        synced_at, is_deleted
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      goal.id,
      goal.userId,
      goal.type,
      goal.target,
      goal.current,
      goal.unit,
      goal.startDate,
      goal.endDate ?? null,
      goal.isActive ? 1 : 0,
      goal.notes ?? null,
      goal.syncedAt ?? null,
      goal.isDeleted ? 1 : 0
    );
  }

  async getGoals(userId: string): Promise<Goal[]> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<Goal>(
      'SELECT * FROM goals WHERE user_id = ? AND is_deleted = 0 ORDER BY created_at DESC',
      userId
    );
    return results || [];
  }

  async updateGoal(id: string, updates: Partial<Goal>): Promise<void> {
    if (!this.db) throw new Error('Database not initialized');

    const fields = Object.keys(updates)
      .map((key) => `${key.replace(/([A-Z])/g, '_$1').toLowerCase()} = ?`)
      .join(', ');
    const values = Object.values(updates).map((val) => val ?? null);

    await this.db.runAsync(
      `UPDATE goals SET ${fields}, updated_at = datetime('now') WHERE id = ?`,
      ...values,
      id
    );
  }

  async getActiveGoals(userId: string): Promise<Goal[]> {
    if (!this.db) throw new Error('Database not initialized');

    const results = await this.db.getAllAsync<Goal>(
      'SELECT * FROM goals WHERE user_id = ? AND is_active = 1 AND is_deleted = 0 ORDER BY created_at DESC',
      userId
    );
    return results || [];
  }

  // Utility methods
  // Transaction method removed due to API incompatibility

  async close(): Promise<void> {
    if (this.db) {
      await this.db.closeAsync();
      this.db = null;
    }
  }

  // Sync utility methods
  async triggerSync(): Promise<void> {
    await syncService.syncNow();
  }

  async getUnsyncedCount(): Promise<number> {
    const { getUnsyncedOperations } = useSyncStore.getState();
    return getUnsyncedOperations().length;
  }
}

// Export singleton instance
export const database = new PrepAIDatabase();
