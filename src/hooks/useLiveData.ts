import { useEffect, useMemo } from 'react';
import { useDataStore } from '@/stores/data-store';

// Hook for user data
export function useUser(userId: string) {
  const { user, healthProfile, isLoading, errors, fetchUserData } = useDataStore();

  useEffect(() => {
    if (userId) {
      fetchUserData(userId);
    }
  }, [userId, fetchUserData]);

  return {
    user,
    healthProfile,
    isLoading: isLoading.user,
    error: errors.user,
  };
}

// Hook for workouts
export function useWorkouts(userId: string) {
  const { workouts, isLoading, errors, fetchWorkouts } = useDataStore();

  useEffect(() => {
    if (userId) {
      fetchWorkouts(userId);
    }
  }, [userId, fetchWorkouts]);

  // Get today's workouts
  const todayWorkouts = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return workouts.filter((workout) => workout.date === today);
  }, [workouts]);

  // Get this week's workouts
  const weeklyWorkouts = useMemo(() => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());
    const weekStartStr = weekStart.toISOString().split('T')[0];
    const weekEndStr = today.toISOString().split('T')[0];

    return workouts.filter((workout) => workout.date >= weekStartStr && workout.date <= weekEndStr);
  }, [workouts]);

  // Get workouts by category
  const getWorkoutsByCategory = (category: string) => {
    return workouts.filter((workout) => workout.category === category);
  };

  return {
    workouts,
    todayWorkouts,
    weeklyWorkouts,
    getWorkoutsByCategory,
    isLoading: isLoading.workouts,
    error: errors.workouts,
  };
}

// Hook for meals
export function useMeals(userId: string, date?: string) {
  const { meals, isLoading, errors, fetchMeals } = useDataStore();

  useEffect(() => {
    if (userId) {
      fetchMeals(userId);
    }
  }, [userId, fetchMeals]);

  const targetDate = date || new Date().toISOString().split('T')[0];

  // Get meals for specific date
  const dateMeals = useMemo(() => {
    return meals.filter((meal) => meal.date === targetDate);
  }, [meals, targetDate]);

  // Get meals by type for specific date
  const getMealsByType = (mealType: string) => {
    return dateMeals.filter((meal) => meal.mealType === mealType);
  };

  // Calculate total calories for the date
  const totalCalories = useMemo(() => {
    return dateMeals.reduce((total, meal) => total + (meal.calories || 0), 0);
  }, [dateMeals]);

  // Calculate macros for the date
  const macros = useMemo(() => {
    return dateMeals.reduce(
      (acc, meal) => ({
        protein: acc.protein + (meal.protein || 0),
        carbs: acc.carbs + (meal.carbs || 0),
        fat: acc.fat + (meal.fat || 0),
      }),
      { protein: 0, carbs: 0, fat: 0 }
    );
  }, [dateMeals]);

  return {
    meals: dateMeals,
    allMeals: meals,
    getMealsByType,
    totalCalories,
    macros,
    isLoading: isLoading.meals,
    error: errors.meals,
  };
}

// Hook for weight entries
export function useWeightEntries(userId: string) {
  const { weightEntries, isLoading, errors, fetchWeightEntries } = useDataStore();

  useEffect(() => {
    if (userId) {
      fetchWeightEntries(userId);
    }
  }, [userId, fetchWeightEntries]);

  // Get latest weight
  const latestWeight = useMemo(() => {
    return weightEntries.length > 0 ? weightEntries[0] : null;
  }, [weightEntries]);

  // Get weight trend (last 7 days)
  const weightTrend = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    const weekStartStr = weekAgo.toISOString().split('T')[0];

    return weightEntries
      .filter((entry) => entry.date >= weekStartStr)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [weightEntries]);

  // Get weight change from start
  const weightChange = useMemo(() => {
    if (weightEntries.length < 2) return 0;
    const latest = weightEntries[0];
    const earliest = weightEntries[weightEntries.length - 1];
    return latest.weightKg - earliest.weightKg;
  }, [weightEntries]);

  return {
    weightEntries,
    latestWeight,
    weightTrend,
    weightChange,
    isLoading: isLoading.weightEntries,
    error: errors.weightEntries,
  };
}

// Hook for water intake
export function useWaterIntake(userId: string, date?: string) {
  const { waterIntake, isLoading, errors, fetchWaterIntake } = useDataStore();

  useEffect(() => {
    if (userId) {
      fetchWaterIntake(userId, date);
    }
  }, [userId, date, fetchWaterIntake]);

  // Get total water intake for the date
  const totalWaterIntake = useMemo(() => {
    return waterIntake.reduce((total, intake) => total + intake.amountMl, 0);
  }, [waterIntake]);

  // Get water intake in liters
  const totalWaterLiters = useMemo(() => {
    return totalWaterIntake / 1000;
  }, [totalWaterIntake]);

  // Get water intake trend (last 3 days)
  const waterTrend = useMemo(() => {
    const today = new Date();
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);
    const startDate = threeDaysAgo.toISOString().split('T')[0];

    const dailyIntake: { [key: string]: number } = {};

    waterIntake
      .filter((intake) => intake.date >= startDate)
      .forEach((intake) => {
        if (!dailyIntake[intake.date]) {
          dailyIntake[intake.date] = 0;
        }
        dailyIntake[intake.date] += intake.amountMl;
      });

    return Object.entries(dailyIntake).map(([date, amount]) => ({
      date,
      amountMl: amount,
      amountL: amount / 1000,
    }));
  }, [waterIntake]);

  return {
    waterIntake,
    totalWaterIntake,
    totalWaterLiters,
    waterTrend,
    isLoading: isLoading.waterIntake,
    error: errors.waterIntake,
  };
}

// Hook for sleep entries
export function useSleepEntries(userId: string, date?: string) {
  const { sleepEntries, isLoading, errors, fetchSleepEntries } = useDataStore();

  useEffect(() => {
    if (userId) {
      fetchSleepEntries(userId);
    }
  }, [userId, fetchSleepEntries]);

  const targetDate = date || new Date().toISOString().split('T')[0];

  // Get sleep entry for specific date
  const dateSleepEntry = useMemo(() => {
    return sleepEntries.find((entry) => entry.date === targetDate);
  }, [sleepEntries, targetDate]);

  // Get sleep trend (last 7 days)
  const sleepTrend = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    const weekStartStr = weekAgo.toISOString().split('T')[0];

    return sleepEntries
      .filter((entry) => entry.date >= weekStartStr)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [sleepEntries]);

  // Calculate average sleep hours
  const averageSleepHours = useMemo(() => {
    if (sleepTrend.length === 0) return 0;
    const totalHours = sleepTrend.reduce((total, entry) => total + entry.hours, 0);
    return totalHours / sleepTrend.length;
  }, [sleepTrend]);

  return {
    sleepEntries,
    dateSleepEntry,
    sleepTrend,
    averageSleepHours,
    isLoading: isLoading.sleepEntries,
    error: errors.sleepEntries,
  };
}

// Hook for progress logs
export function useProgressLogs(userId: string) {
  const { progressLogs, isLoading, errors, fetchProgressLogs } = useDataStore();

  useEffect(() => {
    if (userId) {
      fetchProgressLogs(userId);
    }
  }, [userId, fetchProgressLogs]);

  // Get today's progress log
  const todayProgress = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    return progressLogs.find((log) => log.date === today);
  }, [progressLogs]);

  // Get progress trend (last 7 days)
  const progressTrend = useMemo(() => {
    const today = new Date();
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 7);
    const weekStartStr = weekAgo.toISOString().split('T')[0];

    return progressLogs
      .filter((log) => log.date >= weekStartStr)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [progressLogs]);

  return {
    progressLogs,
    todayProgress,
    progressTrend,
    isLoading: isLoading.progressLogs,
    error: errors.progressLogs,
  };
}

// Hook for goals
export function useGoals(userId: string) {
  const { goals, isLoading, errors, fetchGoals } = useDataStore();

  useEffect(() => {
    if (userId) {
      fetchGoals(userId);
    }
  }, [userId, fetchGoals]);

  // Get active goals
  const activeGoals = useMemo(() => {
    return goals.filter((goal) => goal.isActive);
  }, [goals]);

  // Get goals by type
  const getGoalsByType = (type: string) => {
    return goals.filter((goal) => goal.type === type);
  };

  // Get completed goals
  const completedGoals = useMemo(() => {
    return goals.filter((goal) => goal.current >= goal.target);
  }, [goals]);

  // Get progress percentage for a goal
  const getGoalProgress = (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (!goal) return 0;
    return Math.min(100, (goal.current / goal.target) * 100);
  };

  return {
    goals,
    activeGoals,
    completedGoals,
    getGoalsByType,
    getGoalProgress,
    isLoading: isLoading.goals,
    error: errors.goals,
  };
}

// Hook for dashboard data
export function useDashboardData(userId: string) {
  const { user, healthProfile } = useUser(userId);
  const { todayWorkouts, weeklyWorkouts } = useWorkouts(userId);
  const { totalCalories, macros } = useMeals(userId);
  const { latestWeight, weightTrend } = useWeightEntries(userId);
  const { totalWaterLiters, waterTrend } = useWaterIntake(userId);
  const { dateSleepEntry, sleepTrend } = useSleepEntries(userId);

  const targetCalories = healthProfile?.targetCalories || 2000;
  const targetWaterL = healthProfile?.targetWaterL || 2.0;

  // Calculate calories burned from workouts
  const caloriesBurned = useMemo(() => {
    return todayWorkouts.reduce((total, workout) => total + (workout.calories || 0), 0);
  }, [todayWorkouts]);

  // Calculate weekly calories
  const weeklyCalories = useMemo(() => {
    return weeklyWorkouts.reduce((total, workout) => total + (workout.calories || 0), 0);
  }, [weeklyWorkouts]);

  // Calculate remaining calories
  const remainingCalories = Math.max(0, targetCalories - totalCalories + caloriesBurned);

  // Calculate water progress
  const waterProgress = Math.min(100, (totalWaterLiters / targetWaterL) * 100);

  // Calculate sleep progress (assuming 8 hours is optimal)
  const sleepProgress = dateSleepEntry ? Math.min(100, (dateSleepEntry.hours / 8) * 100) : 0;

  return {
    // User info
    user,
    healthProfile,

    // Calories
    totalCalories,
    targetCalories,
    caloriesBurned,
    remainingCalories,
    weeklyCalories,
    macros,

    // Weight
    currentWeight: latestWeight?.weightKg || 0,
    weightTrend,

    // Water
    waterIntake: totalWaterLiters,
    targetWater: targetWaterL,
    waterProgress,
    waterTrend,

    // Sleep
    sleepHours: dateSleepEntry?.hours || 0,
    sleepQuality: dateSleepEntry?.quality || 'good',
    sleepProgress,
    sleepTrend,

    // Workouts
    todayWorkouts,
    weeklyWorkouts,
  };
}

// Hook for real-time data updates
export function useRealTimeData(userId: string) {
  const { refreshAllData } = useDataStore();

  const refreshData = () => {
    if (userId) {
      refreshAllData(userId);
    }
  };

  return {
    refreshData,
  };
}
