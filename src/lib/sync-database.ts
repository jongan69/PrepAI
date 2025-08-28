import { database } from './database';

import { useSyncStore } from '@/stores/sync-store';

// Sync-enabled database wrapper
class SyncDatabase {
  private async logSyncOperation(
    operation: 'CREATE' | 'UPDATE' | 'DELETE',
    tableName: string,
    recordId: string,
    recordData?: any
  ) {
    try {
      const { addOperation } = useSyncStore.getState();
      addOperation({
        operation,
        tableName,
        recordId,
        recordData,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error logging sync operation:', error);
    }
  }

  // User operations with sync logging
  async createUser(user: any): Promise<string> {
    await database.createUser(user);
    await this.logSyncOperation('CREATE', 'users', user.id, user);
    return user.id;
  }

  async updateUser(userId: string, updates: any): Promise<void> {
    await database.updateUser(userId, updates);
    // Get the updated user data for sync
    const updatedUser = await database.getUser(userId);
    await this.logSyncOperation('UPDATE', 'users', userId, updatedUser);
  }

  // Weight operations with sync logging
  async addWeightEntry(entry: any): Promise<string> {
    await database.createWeightEntry(entry);
    await this.logSyncOperation('CREATE', 'weight_entries', entry.id, entry);
    return entry.id;
  }

  // Meal operations with sync logging
  async addMeal(meal: any): Promise<string> {
    await database.createMeal(meal);
    await this.logSyncOperation('CREATE', 'meals', meal.id, meal);
    return meal.id;
  }

  // Workout operations with sync logging
  async addWorkout(workout: any): Promise<string> {
    await database.createWorkout(workout);
    await this.logSyncOperation('CREATE', 'workouts', workout.id, workout);
    return workout.id;
  }

  // Water intake operations with sync logging
  async addWaterIntake(entry: any): Promise<string> {
    await database.createWaterIntake(entry);
    await this.logSyncOperation('CREATE', 'water_intake', entry.id, entry);
    return entry.id;
  }

  // Sleep operations with sync logging
  async addSleepEntry(entry: any): Promise<string> {
    await database.createSleepEntry(entry);
    await this.logSyncOperation('CREATE', 'sleep_entries', entry.id, entry);
    return entry.id;
  }

  // Goal operations with sync logging
  async addGoal(goal: any): Promise<string> {
    await database.createGoal(goal);
    await this.logSyncOperation('CREATE', 'goals', goal.id, goal);
    return goal.id;
  }

  async updateGoal(goalId: string, updates: any): Promise<void> {
    await database.updateGoal(goalId, updates);
    await this.logSyncOperation('UPDATE', 'goals', goalId);
  }

  // Health Profile operations with sync logging
  async createHealthProfile(profile: any): Promise<string> {
    await database.createHealthProfile(profile);
    await this.logSyncOperation('CREATE', 'health_profiles', profile.id, profile);
    return profile.id;
  }

  async updateHealthProfile(profileId: string, updates: any): Promise<void> {
    await database.updateHealthProfile(profileId, updates);
    await this.logSyncOperation('UPDATE', 'health_profiles', profileId);
  }

  async getHealthProfile(userId: string) {
    return database.getHealthProfile(userId);
  }

  // Delegate all other operations to the original database
  async init(): Promise<void> {
    return database.init();
  }

  async getUser(userId: string) {
    return database.getUser(userId);
  }

  async getWeightEntries(userId: string, startDate?: string, endDate?: string) {
    return database.getWeightEntries(userId);
  }

  async getLatestWeight(userId: string) {
    return database.getLatestWeight(userId);
  }

  async getMeals(userId: string, limit = 50, date?: string) {
    return database.getMeals(userId, limit, date);
  }

  async getMealItems(mealId: string) {
    return database.getMealItems(mealId);
  }

  async addMealItem(item: any): Promise<string> {
    await database.createMealItem(item);
    await this.logSyncOperation('CREATE', 'meal_items', item.id, item);
    return item.id;
  }

  async getDailyCalories(userId: string, date: string) {
    // Not implemented in current database
    return 0;
  }

  async getWorkouts(userId: string, startDate?: string, endDate?: string) {
    return database.getWorkouts(userId);
  }

  async getWorkoutExercises(workoutId: string) {
    return database.getExercises(workoutId);
  }

  async addExercise(exercise: any): Promise<string> {
    await database.createExercise(exercise);
    await this.logSyncOperation('CREATE', 'exercises', exercise.id, exercise);
    return exercise.id;
  }

  async getDailyCaloriesBurned(userId: string, date: string) {
    // Not implemented in current database
    return 0;
  }

  async getWaterIntake(userId: string, date: string) {
    return database.getWaterIntake(userId, date);
  }

  async getWaterIntakeHistory(userId: string, days: number = 7) {
    // Not implemented in current database
    return [];
  }

  async getSleepEntry(userId: string, date: string) {
    return database.getSleepEntry(userId, date);
  }

  async getSleepEntries(userId: string, startDate: string, endDate: string) {
    // Not implemented in current database
    return [];
  }

  async updateSleepEntry(entryId: string, updates: any): Promise<void> {
    await database.updateSleepEntry(entryId, updates);
    await this.logSyncOperation('UPDATE', 'sleep_entries', entryId);
  }

  async getGoals(userId: string, activeOnly: boolean = true) {
    return database.getGoals(userId);
  }

  async getDashboardData(userId: string) {
    // Not implemented in current database
    return {};
  }

  async close(): Promise<void> {
    return database.close();
  }

  // Expose database methods for sync operations
  async execAsync(sql: string): Promise<void> {
    // Not exposed in current database
    throw new Error('Method not available');
  }

  async runAsync(sql: string, ...params: any[]): Promise<any> {
    // Not exposed in current database
    throw new Error('Method not available');
  }

  async getAllAsync<T = any>(sql: string, ...params: any[]): Promise<T[]> {
    // Not exposed in current database
    throw new Error('Method not available');
  }

  async getFirstAsync<T = any>(sql: string, ...params: any[]): Promise<T | null> {
    // Not exposed in current database
    throw new Error('Method not available');
  }
}

export const syncDatabase = new SyncDatabase();
