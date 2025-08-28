import { database } from '@/lib/database';
import { useSyncStore } from '@/stores/sync-store';

class SyncService {
  private syncInterval: NodeJS.Timeout | null = null;
  private isInitialized = false;
  private currentUserId: string | null = null;

  // Set the current user ID (called from DatabaseProvider)
  setCurrentUser(userId: string | null) {
    this.currentUserId = userId;
  }

  async initialize() {
    if (this.isInitialized) return;

    console.log('🔄 SyncService - initializing...');

    // Start background sync if enabled
    const { syncEnabled } = useSyncStore.getState();
    if (syncEnabled) {
      this.startBackgroundSync();
    }

    this.isInitialized = true;
    console.log('🔄 SyncService - initialized');
  }

  async syncNow() {
    const {
      getUnsyncedOperations,
      setIsSyncing,
      setLastSyncTime,
      markOperationSynced,
      markOperationFailed,
    } = useSyncStore.getState();

    const unsyncedOperations = getUnsyncedOperations();

    if (unsyncedOperations.length === 0) {
      console.log('🔄 SyncService - no operations to sync');
      return;
    }

    console.log(`🔄 SyncService - syncing ${unsyncedOperations.length} operations...`);
    console.log('🔄 SyncService - operations to sync:', unsyncedOperations);
    setIsSyncing(true);

    try {
      const syncPayload = unsyncedOperations.map((op: any) => ({
        id: op.id,
        operation: op.operation,
        table_name: op.tableName,
        record_id: op.recordId,
        record_data: op.recordData,
        timestamp: op.timestamp,
      }));

      console.log('🔄 SyncService - sending sync payload to API:', syncPayload);

      // Check if we have a current user ID
      if (!this.currentUserId) {
        throw new Error('No authenticated user found for sync');
      }

      const response = await fetch('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': this.currentUserId, // Add user authentication header
        },
        body: JSON.stringify({
          operations: syncPayload,
        }),
      });

      if (!response.ok) {
        throw new Error(`Sync failed: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log(`🔄 SyncService - API response:`, result);
      console.log(`🔄 SyncService - successfully synced ${result.synced} operations`);

      // Mark operations as synced
      for (const operation of unsyncedOperations) {
        console.log(`🔄 SyncService - marking operation as synced:`, operation.id);
        markOperationSynced(operation.id);
      }

      setLastSyncTime(new Date().toISOString());

      // Clean up old synced operations
      this.cleanupOldOperations();
    } catch (error) {
      console.error('❌ SyncService - sync failed:', error);

      // Mark operations as failed
      for (const operation of unsyncedOperations) {
        markOperationFailed(operation.id, error instanceof Error ? error.message : 'Unknown error');
      }
    } finally {
      setIsSyncing(false);
    }
  }

  async fetchRemoteData(userId: string, since?: string) {
    try {
      // Check if we have a current user ID
      if (!this.currentUserId) {
        throw new Error('No authenticated user found for data fetch');
      }

      const params = new URLSearchParams({
        action: 'fetch',
        ...(since && { since }),
      });

      const response = await fetch(`/api/sync?${params}`, {
        headers: {
          'x-user-id': this.currentUserId, // Add user authentication header
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch remote data: ${response.status} ${response.statusText}`);
      }

      const remoteData = await response.json();
      console.log('🔄 SyncService - fetched remote data:', remoteData);
      return remoteData;
    } catch (error) {
      console.error('❌ SyncService - failed to fetch remote data:', error);
      throw error;
    }
  }

  async mergeRemoteData(userId: string, since?: string) {
    try {
      const remoteData = await this.fetchRemoteData(userId, since);

      // Merge health profiles
      if (remoteData.healthProfiles) {
        for (const profile of remoteData.healthProfiles) {
          const existing = await database.getHealthProfile(profile.userId);

          if (existing) {
            await database.updateHealthProfile(profile.id, {
              height: profile.heightCm,
              weight: profile.weightKg,
              age: profile.age,
              gender: profile.gender,
              syncedAt: profile.syncedAt,
            });
          } else {
            await database.createHealthProfile({
              id: profile.id,
              userId: profile.userId,
              height: profile.heightCm,
              weight: profile.weightKg,
              age: profile.age,
              gender: profile.gender,
              syncedAt: profile.syncedAt,
              isDeleted: false,
            });
          }
        }
      }

      // Merge workouts
      if (remoteData.workouts) {
        for (const workout of remoteData.workouts) {
          const existingWorkouts = await database.getWorkouts(workout.userId);
          const existing = existingWorkouts.find((w) => w.id === workout.id);

          if (existing) {
            await database.updateWorkout(workout.id, {
              title: workout.title,
              durationMin: workout.durationMin,
              calories: workout.calories,
              date: workout.date,
              syncedAt: workout.syncedAt,
            });
          } else {
            await database.createWorkout({
              id: workout.id,
              userId: workout.userId,
              title: workout.title,
              category: workout.category || 'strength',
              durationMin: workout.durationMin,
              calories: workout.calories,
              date: workout.date,
              isCompleted: workout.isCompleted || false,
              syncedAt: workout.syncedAt,
              isDeleted: false,
            });
          }

          // Handle exercises
          if (workout.exercises) {
            for (const exercise of workout.exercises) {
              const existingExercises = await database.getExercises(workout.id);
              const existingExercise = existingExercises.find((e) => e.id === exercise.id);

              if (existingExercise) {
                // Update exercise logic would go here
                // For now, we'll just create new ones
              } else {
                await database.createExercise({
                  id: exercise.id,
                  workoutId: exercise.workoutId,
                  name: exercise.name,
                  sets: exercise.sets,
                  reps: exercise.reps,
                  weightKg: exercise.weightKg,
                  order: exercise.order || 0,
                  isCompleted: exercise.isCompleted || false,
                  syncedAt: exercise.syncedAt,
                  isDeleted: false,
                });
              }
            }
          }
        }
      }

      // Merge meals
      if (remoteData.meals) {
        for (const meal of remoteData.meals) {
          const existingMeals = await database.getMeals(meal.userId);
          const existing = existingMeals.find((m) => m.id === meal.id);

          if (existing) {
            // Update meal logic would go here
            // For now, we'll just create new ones
          } else {
            await database.createMeal({
              id: meal.id,
              userId: meal.userId,
              name: meal.name,
              mealType: meal.mealType || 'snack',
              calories: meal.calories,
              protein: meal.protein,
              carbs: meal.carbs,
              fat: meal.fat,
              date: meal.date,
              syncedAt: meal.syncedAt,
              isDeleted: false,
            });
          }
        }
      }

      // Merge progress logs
      if (remoteData.progressLogs) {
        for (const log of remoteData.progressLogs) {
          const existingLogs = await database.getProgressLogs(log.userId);
          const existing = existingLogs.find((l) => l.id === log.id);

          if (existing) {
            // Update progress log logic would go here
            // For now, we'll just create new ones
          } else {
            await database.createProgressLog({
              id: log.id,
              userId: log.userId,
              date: log.date,
              waterL: log.waterL,
              sleepHrs: log.sleepHrs,
              mood: log.mood,
              weightKg: log.weightKg,
              syncedAt: log.syncedAt,
              isDeleted: false,
            });
          }
        }
      }

      console.log('🔄 SyncService - successfully merged remote data');
    } catch (error) {
      console.error('❌ SyncService - failed to merge remote data:', error);
      throw error;
    }
  }

  startBackgroundSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    // Sync every 30 seconds
    this.syncInterval = setInterval(() => {
      const { syncEnabled } = useSyncStore.getState();
      if (syncEnabled) {
        this.syncNow().catch(console.error);
      }
    }, 30000);

    console.log('🔄 SyncService - background sync started (30s interval)');
  }

  stopBackgroundSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
      console.log('🔄 SyncService - background sync stopped');
    }
  }

  toggleBackgroundSync(enabled: boolean) {
    const { setSyncEnabled } = useSyncStore.getState();
    setSyncEnabled(enabled);

    if (enabled) {
      this.startBackgroundSync();
      // Trigger immediate sync
      this.syncNow().catch(console.error);
    } else {
      this.stopBackgroundSync();
    }
  }

  private cleanupOldOperations() {
    const { operations, clearSyncedOperations } = useSyncStore.getState();

    // Keep only the last 100 operations to prevent memory bloat
    if (operations.length > 100) {
      const syncedOperations = operations.filter((op: any) => op.synced);
      if (syncedOperations.length > 50) {
        clearSyncedOperations();
        console.log('🔄 SyncService - cleaned up old synced operations');
      }
    }
  }

  // Utility method to get sync status
  getSyncStatus() {
    const { isSyncing, lastSyncTime, syncEnabled, getSyncStats } = useSyncStore.getState();

    const stats = getSyncStats();

    return {
      isSyncing,
      lastSyncTime: lastSyncTime ? new Date(lastSyncTime) : null,
      syncEnabled,
      stats,
    };
  }
}

// Export singleton instance
export const syncService = new SyncService();
