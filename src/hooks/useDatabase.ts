import { useEffect, useState } from 'react';

import { database } from '@/lib/database';

export function useDatabase() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        await database.init();
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize database'));
      }
    };

    initDatabase();
  }, []);

  return {
    database,
    isInitialized,
    error,
  };
}

// Dashboard data hook
export function useDashboardData(userId: string) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const userIdStr = userId.toString();
        const today = new Date().toISOString().split('T')[0];

        // Get user's health profile for target calories
        const healthProfile = await database.getHealthProfile(userIdStr);
        const targetCalories = healthProfile?.targetCalories || 2000;

        // Get today's meals to calculate consumed calories
        const todayMeals = await database.getMealsByType(userIdStr, 'breakfast', today);
        const lunchMeals = await database.getMealsByType(userIdStr, 'lunch', today);
        const dinnerMeals = await database.getMealsByType(userIdStr, 'dinner', today);
        const snackMeals = await database.getMealsByType(userIdStr, 'snack', today);

        const allTodayMeals = [...todayMeals, ...lunchMeals, ...dinnerMeals, ...snackMeals];
        const todayCalories = allTodayMeals.reduce((total, meal) => total + (meal.calories || 0), 0);

        // Get today's workouts to calculate burned calories
        const todayWorkouts = await database.getWorkouts(userIdStr, 50);
        const todayWorkoutCalories = todayWorkouts
          .filter((workout) => workout.date === today)
          .reduce((total, workout) => total + (workout.calories || 0), 0);

        // Calculate weekly calories (last 7 days)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const weekStart = weekAgo.toISOString().split('T')[0];

        const weeklyMeals = await database.getMeals(userIdStr, 100);
        const weeklyCalories = weeklyMeals
          .filter((meal) => meal.date >= weekStart && meal.date <= today)
          .reduce((total, meal) => total + (meal.calories || 0), 0);

        const dashboardData = {
          todayCalories,
          targetCalories,
          todayCaloriesBurned: todayWorkoutCalories,
          weeklyCalories,
        };

        setData(dashboardData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch dashboard data'));
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [userId]);

  return { data, loading, error };
}

// Latest weight hook
export function useLatestWeight(userId: string) {
  const [weight, setWeight] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchLatestWeight = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const userIdStr = userId.toString();
        const latestWeight = await database.getLatestWeight(userIdStr);

        if (latestWeight) {
          setWeight({
            weight: latestWeight.weightKg,
            date: latestWeight.date,
          });
        } else {
          setWeight(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch latest weight'));
      } finally {
        setLoading(false);
      }
    };

    fetchLatestWeight();
  }, [userId]);

  return { weight, loading, error };
}

// Water intake hook
export function useWaterIntake(userId: string, date: string) {
  const [amount, setAmount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchWaterIntake = async () => {
      if (!userId || !date) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const userIdStr = userId.toString();
        const totalWaterIntake = await database.getTotalWaterIntake(userIdStr, date);

        setAmount(totalWaterIntake);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch water intake'));
      } finally {
        setLoading(false);
      }
    };

    fetchWaterIntake();
  }, [userId, date]);

  return { amount, loading, error };
}

// Sleep entry hook
export function useSleepEntry(userId: string, date: string) {
  const [entry, setEntry] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchSleepEntry = async () => {
      if (!userId || !date) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const userIdStr = userId.toString();
        const sleepEntry = await database.getSleepEntry(userIdStr, date);

        if (sleepEntry) {
          setEntry({
            hours: sleepEntry.hours,
            quality: sleepEntry.quality,
            date: sleepEntry.date,
          });
        } else {
          setEntry(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch sleep entry'));
      } finally {
        setLoading(false);
      }
    };

    fetchSleepEntry();
  }, [userId, date]);

  return { entry, loading, error };
}
