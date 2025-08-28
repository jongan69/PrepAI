import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { useSyncStore } from './sync-store';

import { database } from '@/lib/database';

// Types for the data store
export interface DataState {
  // User data
  user: any | null;
  healthProfile: any | null;

  // Workout data
  workouts: any[];
  exercises: any[];

  // Meal data
  meals: any[];
  mealItems: any[];

  // Progress data
  weightEntries: any[];
  waterIntake: any[];
  sleepEntries: any[];
  progressLogs: any[];

  // Goals
  goals: any[];

  // Loading states
  isLoading: {
    user: boolean;
    healthProfile: boolean;
    workouts: boolean;
    meals: boolean;
    weightEntries: boolean;
    waterIntake: boolean;
    sleepEntries: boolean;
    progressLogs: boolean;
    goals: boolean;
  };

  // Error states
  errors: {
    user: string | null;
    healthProfile: string | null;
    workouts: string | null;
    meals: string | null;
    weightEntries: string | null;
    waterIntake: string | null;
    sleepEntries: string | null;
    progressLogs: string | null;
    goals: string | null;
  };

  // Actions
  // User actions
  setUser: (user: any) => void;
  createUser: (userData: any) => Promise<void>;
  updateUser: (userId: string, updates: any) => Promise<void>;

  // Health profile actions
  setHealthProfile: (profile: any) => void;
  createHealthProfile: (profileData: any) => Promise<void>;
  updateHealthProfile: (profileId: string, updates: any) => Promise<void>;

  // Workout actions
  setWorkouts: (workouts: any[]) => void;
  addWorkout: (workoutData: any) => Promise<void>;
  updateWorkout: (workoutId: string, updates: any) => Promise<void>;
  deleteWorkout: (workoutId: string) => Promise<void>;
  addExercise: (exerciseData: any) => Promise<void>;
  updateExercise: (exerciseId: string, updates: any) => Promise<void>;
  deleteExercise: (exerciseId: string) => Promise<void>;

  // Meal actions
  setMeals: (meals: any[]) => void;
  addMeal: (mealData: any) => Promise<void>;
  updateMeal: (mealId: string, updates: any) => Promise<void>;
  deleteMeal: (mealId: string) => Promise<void>;
  addMealItem: (mealItemData: any) => Promise<void>;
  updateMealItem: (mealItemId: string, updates: any) => Promise<void>;
  deleteMealItem: (mealItemId: string) => Promise<void>;

  // Weight entry actions
  setWeightEntries: (entries: any[]) => void;
  addWeightEntry: (entryData: any) => Promise<void>;
  updateWeightEntry: (entryId: string, updates: any) => Promise<void>;
  deleteWeightEntry: (entryId: string) => Promise<void>;

  // Water intake actions
  setWaterIntake: (intake: any[]) => void;
  addWaterIntake: (intakeData: any) => Promise<void>;
  updateWaterIntake: (intakeId: string, updates: any) => Promise<void>;
  deleteWaterIntake: (intakeId: string) => Promise<void>;

  // Sleep entry actions
  setSleepEntries: (entries: any[]) => void;
  addSleepEntry: (entryData: any) => Promise<void>;
  updateSleepEntry: (entryId: string, updates: any) => Promise<void>;
  deleteSleepEntry: (entryId: string) => Promise<void>;

  // Progress log actions
  setProgressLogs: (logs: any[]) => void;
  addProgressLog: (logData: any) => Promise<void>;
  updateProgressLog: (logId: string, updates: any) => Promise<void>;
  deleteProgressLog: (logId: string) => Promise<void>;

  // Goal actions
  setGoals: (goals: any[]) => void;
  addGoal: (goalData: any) => Promise<void>;
  updateGoal: (goalId: string, updates: any) => Promise<void>;
  deleteGoal: (goalId: string) => Promise<void>;

  // Loading actions
  setLoading: (key: keyof DataState['isLoading'], loading: boolean) => void;

  // Error actions
  setError: (key: keyof DataState['errors'], error: string | null) => void;

  // Data fetching actions
  fetchUserData: (userId: string) => Promise<void>;
  fetchWorkouts: (userId: string) => Promise<void>;
  fetchMeals: (userId: string) => Promise<void>;
  fetchWeightEntries: (userId: string) => Promise<void>;
  fetchWaterIntake: (userId: string, date?: string) => Promise<void>;
  fetchSleepEntries: (userId: string) => Promise<void>;
  fetchProgressLogs: (userId: string) => Promise<void>;
  fetchGoals: (userId: string) => Promise<void>;

  // Utility actions
  clearAllData: () => void;
  refreshAllData: (userId: string) => Promise<void>;
}

// Helper function to add sync operation
const addSyncOperation = (
  operation: 'CREATE' | 'UPDATE' | 'DELETE',
  tableName: string,
  recordId: string,
  recordData?: any
) => {
  useSyncStore.getState().addOperation({
    operation,
    tableName,
    recordId,
    recordData,
    timestamp: new Date().toISOString(),
  });
};

export const useDataStore = create<DataState>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    user: null,
    healthProfile: null,
    workouts: [],
    exercises: [],
    meals: [],
    mealItems: [],
    weightEntries: [],
    waterIntake: [],
    sleepEntries: [],
    progressLogs: [],
    goals: [],

    isLoading: {
      user: false,
      healthProfile: false,
      workouts: false,
      meals: false,
      weightEntries: false,
      waterIntake: false,
      sleepEntries: false,
      progressLogs: false,
      goals: false,
    },

    errors: {
      user: null,
      healthProfile: null,
      workouts: null,
      meals: null,
      weightEntries: null,
      waterIntake: null,
      sleepEntries: null,
      progressLogs: null,
      goals: null,
    },

    // User actions
    setUser: (user) => set({ user }),

    createUser: async (userData) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, user: true } }));
        set((state) => ({ errors: { ...state.errors, user: null } }));

        await database.createUser(userData);
        set({ user: userData });

        addSyncOperation('CREATE', 'users', userData.id, userData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create user';
        set((state) => ({ errors: { ...state.errors, user: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, user: false } }));
      }
    },

    updateUser: async (userId: string, updates) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, user: true } }));
        set((state) => ({ errors: { ...state.errors, user: null } }));

        await database.updateUser(userId, updates);
        set((state) => ({ user: state.user ? { ...state.user, ...updates } : null }));

        addSyncOperation('UPDATE', 'users', userId, updates);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update user';
        set((state) => ({ errors: { ...state.errors, user: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, user: false } }));
      }
    },

    // Health profile actions
    setHealthProfile: (profile) => set({ healthProfile: profile }),

    createHealthProfile: async (profileData) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, healthProfile: true } }));
        set((state) => ({ errors: { ...state.errors, healthProfile: null } }));

        // Validate that the profile belongs to the current user
        if (profileData.userId !== get().user?.id) {
          throw new Error('Unauthorized: Cannot create health profile for another user');
        }

        await database.createHealthProfile(profileData);
        set({ healthProfile: profileData });

        addSyncOperation('CREATE', 'health_profiles', profileData.id, profileData);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to create health profile';
        set((state) => ({ errors: { ...state.errors, healthProfile: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, healthProfile: false } }));
      }
    },

    updateHealthProfile: async (profileId, updates) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, healthProfile: true } }));
        set((state) => ({ errors: { ...state.errors, healthProfile: null } }));

        // Validate that the profile belongs to the current user
        const currentUser = get().user;
        if (!currentUser || updates.userId !== currentUser.id) {
          throw new Error('Unauthorized: Cannot update health profile for another user');
        }

        await database.updateHealthProfile(profileId, updates);
        set((state) => ({
          healthProfile: state.healthProfile ? { ...state.healthProfile, ...updates } : null,
        }));

        addSyncOperation('UPDATE', 'health_profiles', profileId, updates);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to update health profile';
        set((state) => ({ errors: { ...state.errors, healthProfile: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, healthProfile: false } }));
      }
    },

    // Workout actions
    setWorkouts: (workouts) => set({ workouts }),

    addWorkout: async (workoutData) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, workouts: true } }));
        set((state) => ({ errors: { ...state.errors, workouts: null } }));

        await database.createWorkout(workoutData);
        set((state) => ({ workouts: [workoutData, ...state.workouts] }));

        addSyncOperation('CREATE', 'workouts', workoutData.id, workoutData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add workout';
        set((state) => ({ errors: { ...state.errors, workouts: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, workouts: false } }));
      }
    },

    updateWorkout: async (workoutId, updates) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, workouts: true } }));
        set((state) => ({ errors: { ...state.errors, workouts: null } }));

        await database.updateWorkout(workoutId, updates);
        set((state) => ({
          workouts: state.workouts.map((workout) =>
            workout.id === workoutId ? { ...workout, ...updates } : workout
          ),
        }));

        addSyncOperation('UPDATE', 'workouts', workoutId, updates);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update workout';
        set((state) => ({ errors: { ...state.errors, workouts: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, workouts: false } }));
      }
    },

    deleteWorkout: async (workoutId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, workouts: true } }));
        set((state) => ({ errors: { ...state.errors, workouts: null } }));

        // Soft delete by updating isDeleted flag
        await database.updateWorkout(workoutId, { isDeleted: true });
        set((state) => ({
          workouts: state.workouts.filter((workout) => workout.id !== workoutId),
        }));

        addSyncOperation('DELETE', 'workouts', workoutId);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete workout';
        set((state) => ({ errors: { ...state.errors, workouts: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, workouts: false } }));
      }
    },

    addExercise: async (exerciseData) => {
      try {
        await database.createExercise(exerciseData);
        set((state) => ({ exercises: [exerciseData, ...state.exercises] }));

        addSyncOperation('CREATE', 'exercises', exerciseData.id, exerciseData);
      } catch (error) {
        throw error;
      }
    },

    updateExercise: async (exerciseId, updates) => {
      try {
        await database.updateExercise?.(exerciseId, updates);
        set((state) => ({
          exercises: state.exercises.map((exercise) =>
            exercise.id === exerciseId ? { ...exercise, ...updates } : exercise
          ),
        }));

        addSyncOperation('UPDATE', 'exercises', exerciseId, updates);
      } catch (error) {
        throw error;
      }
    },

    deleteExercise: async (exerciseId) => {
      try {
        await database.updateExercise?.(exerciseId, { isDeleted: true });
        set((state) => ({
          exercises: state.exercises.filter((exercise) => exercise.id !== exerciseId),
        }));

        addSyncOperation('DELETE', 'exercises', exerciseId);
      } catch (error) {
        throw error;
      }
    },

    // Meal actions
    setMeals: (meals) => set({ meals }),

    addMeal: async (mealData) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, meals: true } }));
        set((state) => ({ errors: { ...state.errors, meals: null } }));

        await database.createMeal(mealData);
        set((state) => ({ meals: [mealData, ...state.meals] }));

        addSyncOperation('CREATE', 'meals', mealData.id, mealData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add meal';
        set((state) => ({ errors: { ...state.errors, meals: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, meals: false } }));
      }
    },

    updateMeal: async (mealId, updates) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, meals: true } }));
        set((state) => ({ errors: { ...state.errors, meals: null } }));

        await database.updateMeal?.(mealId, updates);
        set((state) => ({
          meals: state.meals.map((meal) => (meal.id === mealId ? { ...meal, ...updates } : meal)),
        }));

        addSyncOperation('UPDATE', 'meals', mealId, updates);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update meal';
        set((state) => ({ errors: { ...state.errors, meals: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, meals: false } }));
      }
    },

    deleteMeal: async (mealId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, meals: true } }));
        set((state) => ({ errors: { ...state.errors, meals: null } }));

        await database.updateMeal?.(mealId, { isDeleted: true });
        set((state) => ({
          meals: state.meals.filter((meal) => meal.id !== mealId),
        }));

        addSyncOperation('DELETE', 'meals', mealId);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete meal';
        set((state) => ({ errors: { ...state.errors, meals: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, meals: false } }));
      }
    },

    addMealItem: async (mealItemData) => {
      try {
        await database.createMealItem(mealItemData);
        set((state) => ({ mealItems: [mealItemData, ...state.mealItems] }));

        addSyncOperation('CREATE', 'meal_items', mealItemData.id, mealItemData);
      } catch (error) {
        throw error;
      }
    },

    updateMealItem: async (mealItemId, updates) => {
      try {
        await database.updateMealItem?.(mealItemId, updates);
        set((state) => ({
          mealItems: state.mealItems.map((item) =>
            item.id === mealItemId ? { ...item, ...updates } : item
          ),
        }));

        addSyncOperation('UPDATE', 'meal_items', mealItemId, updates);
      } catch (error) {
        throw error;
      }
    },

    deleteMealItem: async (mealItemId) => {
      try {
        await database.updateMealItem?.(mealItemId, { isDeleted: true });
        set((state) => ({
          mealItems: state.mealItems.filter((item) => item.id !== mealItemId),
        }));

        addSyncOperation('DELETE', 'meal_items', mealItemId);
      } catch (error) {
        throw error;
      }
    },

    // Weight entry actions
    setWeightEntries: (entries) => set({ weightEntries: entries }),

    addWeightEntry: async (entryData) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, weightEntries: true } }));
        set((state) => ({ errors: { ...state.errors, weightEntries: null } }));

        await database.createWeightEntry(entryData);
        set((state) => ({ weightEntries: [entryData, ...state.weightEntries] }));

        addSyncOperation('CREATE', 'weight_entries', entryData.id, entryData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add weight entry';
        set((state) => ({ errors: { ...state.errors, weightEntries: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, weightEntries: false } }));
      }
    },

    updateWeightEntry: async (entryId, updates) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, weightEntries: true } }));
        set((state) => ({ errors: { ...state.errors, weightEntries: null } }));

        await database.updateWeightEntry?.(entryId, updates);
        set((state) => ({
          weightEntries: state.weightEntries.map((entry) =>
            entry.id === entryId ? { ...entry, ...updates } : entry
          ),
        }));

        addSyncOperation('UPDATE', 'weight_entries', entryId, updates);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to update weight entry';
        set((state) => ({ errors: { ...state.errors, weightEntries: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, weightEntries: false } }));
      }
    },

    deleteWeightEntry: async (entryId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, weightEntries: true } }));
        set((state) => ({ errors: { ...state.errors, weightEntries: null } }));

        await database.updateWeightEntry?.(entryId, { isDeleted: true });
        set((state) => ({
          weightEntries: state.weightEntries.filter((entry) => entry.id !== entryId),
        }));

        addSyncOperation('DELETE', 'weight_entries', entryId);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to delete weight entry';
        set((state) => ({ errors: { ...state.errors, weightEntries: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, weightEntries: false } }));
      }
    },

    // Water intake actions
    setWaterIntake: (intake) => set({ waterIntake: intake }),

    addWaterIntake: async (intakeData) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, waterIntake: true } }));
        set((state) => ({ errors: { ...state.errors, waterIntake: null } }));

        await database.createWaterIntake(intakeData);
        set((state) => ({ waterIntake: [intakeData, ...state.waterIntake] }));

        addSyncOperation('CREATE', 'water_intake', intakeData.id, intakeData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add water intake';
        set((state) => ({ errors: { ...state.errors, waterIntake: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, waterIntake: false } }));
      }
    },

    updateWaterIntake: async (intakeId, updates) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, waterIntake: true } }));
        set((state) => ({ errors: { ...state.errors, waterIntake: null } }));

        await database.updateWaterIntake?.(intakeId, updates);
        set((state) => ({
          waterIntake: state.waterIntake.map((intake) =>
            intake.id === intakeId ? { ...intake, ...updates } : intake
          ),
        }));

        addSyncOperation('UPDATE', 'water_intake', intakeId, updates);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to update water intake';
        set((state) => ({ errors: { ...state.errors, waterIntake: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, waterIntake: false } }));
      }
    },

    deleteWaterIntake: async (intakeId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, waterIntake: true } }));
        set((state) => ({ errors: { ...state.errors, waterIntake: null } }));

        await database.updateWaterIntake?.(intakeId, { isDeleted: true });
        set((state) => ({
          waterIntake: state.waterIntake.filter((intake) => intake.id !== intakeId),
        }));

        addSyncOperation('DELETE', 'water_intake', intakeId);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to delete water intake';
        set((state) => ({ errors: { ...state.errors, waterIntake: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, waterIntake: false } }));
      }
    },

    // Sleep entry actions
    setSleepEntries: (entries) => set({ sleepEntries: entries }),

    addSleepEntry: async (entryData) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, sleepEntries: true } }));
        set((state) => ({ errors: { ...state.errors, sleepEntries: null } }));

        await database.createSleepEntry(entryData);
        set((state) => ({ sleepEntries: [entryData, ...state.sleepEntries] }));

        addSyncOperation('CREATE', 'sleep_entries', entryData.id, entryData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add sleep entry';
        set((state) => ({ errors: { ...state.errors, sleepEntries: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, sleepEntries: false } }));
      }
    },

    updateSleepEntry: async (entryId, updates) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, sleepEntries: true } }));
        set((state) => ({ errors: { ...state.errors, sleepEntries: null } }));

        await database.updateSleepEntry?.(entryId, updates);
        set((state) => ({
          sleepEntries: state.sleepEntries.map((entry) =>
            entry.id === entryId ? { ...entry, ...updates } : entry
          ),
        }));

        addSyncOperation('UPDATE', 'sleep_entries', entryId, updates);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to update sleep entry';
        set((state) => ({ errors: { ...state.errors, sleepEntries: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, sleepEntries: false } }));
      }
    },

    deleteSleepEntry: async (entryId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, sleepEntries: true } }));
        set((state) => ({ errors: { ...state.errors, sleepEntries: null } }));

        await database.updateSleepEntry?.(entryId, { isDeleted: true });
        set((state) => ({
          sleepEntries: state.sleepEntries.filter((entry) => entry.id !== entryId),
        }));

        addSyncOperation('DELETE', 'sleep_entries', entryId);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to delete sleep entry';
        set((state) => ({ errors: { ...state.errors, sleepEntries: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, sleepEntries: false } }));
      }
    },

    // Progress log actions
    setProgressLogs: (logs) => set({ progressLogs: logs }),

    addProgressLog: async (logData) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, progressLogs: true } }));
        set((state) => ({ errors: { ...state.errors, progressLogs: null } }));

        await database.createProgressLog(logData);
        set((state) => ({ progressLogs: [logData, ...state.progressLogs] }));

        addSyncOperation('CREATE', 'progress_logs', logData.id, logData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add progress log';
        set((state) => ({ errors: { ...state.errors, progressLogs: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, progressLogs: false } }));
      }
    },

    updateProgressLog: async (logId, updates) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, progressLogs: true } }));
        set((state) => ({ errors: { ...state.errors, progressLogs: null } }));

        await database.updateProgressLog?.(logId, updates);
        set((state) => ({
          progressLogs: state.progressLogs.map((log) =>
            log.id === logId ? { ...log, ...updates } : log
          ),
        }));

        addSyncOperation('UPDATE', 'progress_logs', logId, updates);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to update progress log';
        set((state) => ({ errors: { ...state.errors, progressLogs: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, progressLogs: false } }));
      }
    },

    deleteProgressLog: async (logId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, progressLogs: true } }));
        set((state) => ({ errors: { ...state.errors, progressLogs: null } }));

        await database.updateProgressLog?.(logId, { isDeleted: true });
        set((state) => ({
          progressLogs: state.progressLogs.filter((log) => log.id !== logId),
        }));

        addSyncOperation('DELETE', 'progress_logs', logId);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to delete progress log';
        set((state) => ({ errors: { ...state.errors, progressLogs: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, progressLogs: false } }));
      }
    },

    // Goal actions
    setGoals: (goals) => set({ goals }),

    addGoal: async (goalData) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, goals: true } }));
        set((state) => ({ errors: { ...state.errors, goals: null } }));

        await database.createGoal(goalData);
        set((state) => ({ goals: [goalData, ...state.goals] }));

        addSyncOperation('CREATE', 'goals', goalData.id, goalData);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add goal';
        set((state) => ({ errors: { ...state.errors, goals: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, goals: false } }));
      }
    },

    updateGoal: async (goalId, updates) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, goals: true } }));
        set((state) => ({ errors: { ...state.errors, goals: null } }));

        await database.updateGoal?.(goalId, updates);
        set((state) => ({
          goals: state.goals.map((goal) => (goal.id === goalId ? { ...goal, ...updates } : goal)),
        }));

        addSyncOperation('UPDATE', 'goals', goalId, updates);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to update goal';
        set((state) => ({ errors: { ...state.errors, goals: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, goals: false } }));
      }
    },

    deleteGoal: async (goalId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, goals: true } }));
        set((state) => ({ errors: { ...state.errors, goals: null } }));

        await database.updateGoal?.(goalId, { isDeleted: true });
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== goalId),
        }));

        addSyncOperation('DELETE', 'goals', goalId);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete goal';
        set((state) => ({ errors: { ...state.errors, goals: errorMessage } }));
        throw error;
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, goals: false } }));
      }
    },

    // Loading actions
    setLoading: (key, loading) =>
      set((state) => ({
        isLoading: { ...state.isLoading, [key]: loading },
      })),

    // Error actions
    setError: (key, error) =>
      set((state) => ({
        errors: { ...state.errors, [key]: error },
      })),

    // Data fetching actions
    fetchUserData: async (userId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, user: true } }));
        set((state) => ({ errors: { ...state.errors, user: null } }));

        // Validate that the user is fetching their own data
        const currentUser = get().user;
        if (!currentUser || userId !== currentUser.id) {
          throw new Error('Unauthorized: Cannot fetch data for another user');
        }

        const user = await database.getUser(userId);
        const healthProfile = await database.getHealthProfile(userId);

        set({ user, healthProfile });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch user data';
        set((state) => ({ errors: { ...state.errors, user: errorMessage } }));
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, user: false } }));
      }
    },

    fetchWorkouts: async (userId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, workouts: true } }));
        set((state) => ({ errors: { ...state.errors, workouts: null } }));

        const workouts = await database.getWorkouts(userId);
        set({ workouts });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch workouts';
        set((state) => ({ errors: { ...state.errors, workouts: errorMessage } }));
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, workouts: false } }));
      }
    },

    fetchMeals: async (userId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, meals: true } }));
        set((state) => ({ errors: { ...state.errors, meals: null } }));

        const meals = await database.getMeals(userId);
        set({ meals });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch meals';
        set((state) => ({ errors: { ...state.errors, meals: errorMessage } }));
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, meals: false } }));
      }
    },

    fetchWeightEntries: async (userId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, weightEntries: true } }));
        set((state) => ({ errors: { ...state.errors, weightEntries: null } }));

        const weightEntries = await database.getWeightEntries(userId);
        set({ weightEntries });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch weight entries';
        set((state) => ({ errors: { ...state.errors, weightEntries: errorMessage } }));
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, weightEntries: false } }));
      }
    },

    fetchWaterIntake: async (userId, date) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, waterIntake: true } }));
        set((state) => ({ errors: { ...state.errors, waterIntake: null } }));

        const waterIntake = await database.getWaterIntake(
          userId,
          date || new Date().toISOString().split('T')[0]
        );
        set({ waterIntake });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch water intake';
        set((state) => ({ errors: { ...state.errors, waterIntake: errorMessage } }));
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, waterIntake: false } }));
      }
    },

    fetchSleepEntries: async (userId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, sleepEntries: true } }));
        set((state) => ({ errors: { ...state.errors, sleepEntries: null } }));

        // Note: This would need to be implemented in the database class
        // For now, we'll use an empty array
        set({ sleepEntries: [] });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch sleep entries';
        set((state) => ({ errors: { ...state.errors, sleepEntries: errorMessage } }));
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, sleepEntries: false } }));
      }
    },

    fetchProgressLogs: async (userId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, progressLogs: true } }));
        set((state) => ({ errors: { ...state.errors, progressLogs: null } }));

        const progressLogs = await database.getProgressLogs(userId);
        set({ progressLogs });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to fetch progress logs';
        set((state) => ({ errors: { ...state.errors, progressLogs: errorMessage } }));
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, progressLogs: false } }));
      }
    },

    fetchGoals: async (userId) => {
      try {
        set((state) => ({ isLoading: { ...state.isLoading, goals: true } }));
        set((state) => ({ errors: { ...state.errors, goals: null } }));

        const goals = await database.getGoals(userId);
        set({ goals });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch goals';
        set((state) => ({ errors: { ...state.errors, goals: errorMessage } }));
      } finally {
        set((state) => ({ isLoading: { ...state.isLoading, goals: false } }));
      }
    },

    // Utility actions
    clearAllData: () => {
      set({
        user: null,
        healthProfile: null,
        workouts: [],
        exercises: [],
        meals: [],
        mealItems: [],
        weightEntries: [],
        waterIntake: [],
        sleepEntries: [],
        progressLogs: [],
        goals: [],
        isLoading: {
          user: false,
          healthProfile: false,
          workouts: false,
          meals: false,
          weightEntries: false,
          waterIntake: false,
          sleepEntries: false,
          progressLogs: false,
          goals: false,
        },
        errors: {
          user: null,
          healthProfile: null,
          workouts: null,
          meals: null,
          weightEntries: null,
          waterIntake: null,
          sleepEntries: null,
          progressLogs: null,
          goals: null,
        },
      });
    },

    refreshAllData: async (userId) => {
      await Promise.all([
        get().fetchUserData(userId),
        get().fetchWorkouts(userId),
        get().fetchMeals(userId),
        get().fetchWeightEntries(userId),
        get().fetchWaterIntake(userId),
        get().fetchSleepEntries(userId),
        get().fetchProgressLogs(userId),
        get().fetchGoals(userId),
      ]);
    },
  }))
);
