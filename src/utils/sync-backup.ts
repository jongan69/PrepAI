import { syncDatabase } from '@/lib/sync-database';

export interface SyncBackupInfo {
  lastSyncTime: Date | null;
  syncStatus: 'idle' | 'syncing' | 'error' | 'success';
  totalRecords: number;
  syncedRecords: number;
  unsyncedOperations: number;
}

export class SyncBackupManager {
  /**
   * Get sync backup information
   */
  static async getSyncInfo(): Promise<SyncBackupInfo> {
    try {
      // Get unsynced operations count
      const unsyncedOperations = await syncDatabase.getAllAsync<{ count: number }>(
        'SELECT COUNT(*) as count FROM sync_log WHERE synced = 0'
      );

      // Get total records count
      const totalRecords = await this.getTotalRecordsCount();

      // Get synced records count
      const syncedRecords = await this.getSyncedRecordsCount();

      return {
        lastSyncTime: null, // This would come from the sync provider
        syncStatus: 'idle', // This would come from the sync provider
        totalRecords,
        syncedRecords,
        unsyncedOperations: unsyncedOperations[0]?.count || 0,
      };
    } catch (error) {
      console.error('Error getting sync info:', error);
      return {
        lastSyncTime: null,
        syncStatus: 'error',
        totalRecords: 0,
        syncedRecords: 0,
        unsyncedOperations: 0,
      };
    }
  }

  /**
   * Get total records count across all tables
   */
  private static async getTotalRecordsCount(): Promise<number> {
    try {
      const tables = [
        'users',
        'weight_entries',
        'meals',
        'meal_items',
        'workouts',
        'exercises',
        'water_intake',
        'sleep_entries',
        'goals',
      ];

      let totalCount = 0;
      for (const table of tables) {
        try {
          const result = await syncDatabase.getAllAsync<{ count: number }>(
            `SELECT COUNT(*) as count FROM ${table}`
          );
          totalCount += result[0]?.count || 0;
        } catch {
          // Table might not exist yet, skip it
          console.log(`Table ${table} not found, skipping`);
        }
      }

      return totalCount;
    } catch (error) {
      console.error('Error getting total records count:', error);
      return 0;
    }
  }

  /**
   * Get synced records count
   */
  private static async getSyncedRecordsCount(): Promise<number> {
    try {
      const result = await syncDatabase.getAllAsync<{ count: number }>(
        'SELECT COUNT(*) as count FROM sync_log WHERE synced = 1'
      );
      return result[0]?.count || 0;
    } catch (error) {
      console.error('Error getting synced records count:', error);
      return 0;
    }
  }

  /**
   * Export all user data as JSON
   */
  static async exportUserData(userId: string): Promise<string> {
    try {
      const userData = {
        user: await syncDatabase.getUser(userId),
        weightEntries: await syncDatabase.getWeightEntries(userId),
        meals: await this.getUserMeals(userId),
        workouts: await syncDatabase.getWorkouts(userId),
        waterIntake: await this.getUserWaterIntake(userId),
        sleepEntries: await this.getUserSleepEntries(userId),
        goals: await syncDatabase.getGoals(userId),
        exportDate: new Date().toISOString(),
      };

      return JSON.stringify(userData, null, 2);
    } catch (error) {
      console.error('Error exporting user data:', error);
      throw new Error('Failed to export user data');
    }
  }

  /**
   * Get all meals for a user
   */
  private static async getUserMeals(userId: string): Promise<any[]> {
    try {
      const meals = await syncDatabase.getAllAsync<any>(
        'SELECT * FROM meals WHERE userId = ? ORDER BY date DESC',
        userId
      );

      // Get meal items for each meal
      for (const meal of meals) {
        meal.items = await syncDatabase.getMealItems(meal.id);
      }

      return meals;
    } catch (error) {
      console.error('Error getting user meals:', error);
      return [];
    }
  }

  /**
   * Get all water intake for a user
   */
  private static async getUserWaterIntake(userId: string): Promise<any[]> {
    try {
      return await syncDatabase.getAllAsync<any>(
        'SELECT * FROM water_intake WHERE userId = ? ORDER BY date DESC',
        userId
      );
    } catch (error) {
      console.error('Error getting user water intake:', error);
      return [];
    }
  }

  /**
   * Get all sleep entries for a user
   */
  private static async getUserSleepEntries(userId: string): Promise<any[]> {
    try {
      return await syncDatabase.getAllAsync<any>(
        'SELECT * FROM sleep_entries WHERE userId = ? ORDER BY date DESC',
        userId
      );
    } catch (error) {
      console.error('Error getting user sleep entries:', error);
      return [];
    }
  }

  /**
   * Check if data is fully synced
   */
  static async isFullySynced(): Promise<boolean> {
    try {
      const unsyncedOperations = await syncDatabase.getAllAsync<{ count: number }>(
        'SELECT COUNT(*) as count FROM sync_log WHERE synced = 0'
      );
      return (unsyncedOperations[0]?.count || 0) === 0;
    } catch (error) {
      console.error('Error checking sync status:', error);
      return false;
    }
  }

  /**
   * Get sync statistics
   */
  static async getSyncStats(): Promise<{
    totalOperations: number;
    syncedOperations: number;
    unsyncedOperations: number;
    syncPercentage: number;
  }> {
    try {
      const totalResult = await syncDatabase.getAllAsync<{ count: number }>(
        'SELECT COUNT(*) as count FROM sync_log'
      );
      const syncedResult = await syncDatabase.getAllAsync<{ count: number }>(
        'SELECT COUNT(*) as count FROM sync_log WHERE synced = 1'
      );
      const unsyncedResult = await syncDatabase.getAllAsync<{ count: number }>(
        'SELECT COUNT(*) as count FROM sync_log WHERE synced = 0'
      );

      const totalOperations = totalResult[0]?.count || 0;
      const syncedOperations = syncedResult[0]?.count || 0;
      const unsyncedOperations = unsyncedResult[0]?.count || 0;
      const syncPercentage = totalOperations > 0 ? (syncedOperations / totalOperations) * 100 : 100;

      return {
        totalOperations,
        syncedOperations,
        unsyncedOperations,
        syncPercentage: Math.round(syncPercentage),
      };
    } catch (error) {
      console.error('Error getting sync stats:', error);
      return {
        totalOperations: 0,
        syncedOperations: 0,
        unsyncedOperations: 0,
        syncPercentage: 0,
      };
    }
  }
}
