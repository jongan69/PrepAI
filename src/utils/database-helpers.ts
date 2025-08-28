import { database, type Meal } from '@/lib/database';

// Date utilities
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function getTodayString(): string {
  return formatDate(new Date());
}

export function getDateFromString(dateString: string): Date {
  return new Date(dateString + 'T00:00:00');
}

export function getDaysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return formatDate(date);
}

export function getWeekRange(): { startDate: string; endDate: string } {
  const endDate = getTodayString();
  const startDate = getDaysAgo(6);
  return { startDate, endDate };
}

export function getMonthRange(): { startDate: string; endDate: string } {
  const endDate = getTodayString();
  const startDate = getDaysAgo(29);
  return { startDate, endDate };
}

// Data formatting utilities
export function formatWeight(weight: number): string {
  return `${weight.toFixed(1)} kg`;
}

export function formatCalories(calories: number): string {
  return `${calories.toLocaleString()} cal`;
}

export function formatWaterIntake(amount: number): string {
  return `${(amount / 1000).toFixed(1)}L`;
}

export function formatSleepHours(hours: number): string {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours % 1) * 60);
  return `${wholeHours}h ${minutes}m`;
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

// Data aggregation utilities
export async function getWeeklyStats(userId: string) {
  const { startDate, endDate } = getWeekRange();

  const [weightEntries, workouts, waterIntake, sleepEntries] = await Promise.all([
    database.getWeightEntries(userId, startDate, endDate),
    database.getWorkouts(userId, startDate, endDate),
    database.getWaterIntakeHistory(userId, 7),
    database.getSleepEntries(userId, startDate, endDate),
  ]);

  // Get meals for the week (we need to get them day by day since getMeals filters by date)
  const meals: Meal[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dayMeals = await database.getMeals(userId, 50, formatDate(date));
    meals.push(...dayMeals);
  }

  // Calculate total calories for the week
  let totalCalories = 0;
  for (const meal of meals) {
    totalCalories += meal.calories;
  }

  // Calculate total calories burned
  const totalCaloriesBurned = workouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);

  // Calculate average water intake
  const totalWaterIntake = waterIntake.reduce((sum, entry) => sum + entry.amount, 0);
  const avgWaterIntake = waterIntake.length > 0 ? totalWaterIntake / waterIntake.length : 0;

  // Calculate average sleep
  const totalSleepHours = sleepEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const avgSleepHours = sleepEntries.length > 0 ? totalSleepHours / sleepEntries.length : 0;

  // Get weight change
  const weightChange =
    weightEntries.length >= 2
      ? weightEntries[0].weight - weightEntries[weightEntries.length - 1].weight
      : 0;

  return {
    totalCalories,
    totalCaloriesBurned,
    avgWaterIntake,
    avgSleepHours,
    weightChange,
    workoutCount: workouts.length,
    weightEntries: weightEntries.length,
  };
}

export async function getMonthlyStats(userId: string) {
  const { startDate, endDate } = getMonthRange();

  const [weightEntries, workouts, waterIntake, sleepEntries] = await Promise.all([
    database.getWeightEntries(userId, startDate, endDate),
    database.getWorkouts(userId, startDate, endDate),
    database.getWaterIntakeHistory(userId, 30),
    database.getSleepEntries(userId, startDate, endDate),
  ]);

  // Get meals for the month (we need to get them day by day since getMeals filters by date)
  const meals: Meal[] = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dayMeals = await database.getMeals(userId, 50, formatDate(date));
    meals.push(...dayMeals);
  }

  // Calculate total calories for the month
  let totalCalories = 0;
  for (const meal of meals) {
    totalCalories += meal.calories;
  }

  // Calculate total calories burned
  const totalCaloriesBurned = workouts.reduce((sum, workout) => sum + workout.caloriesBurned, 0);

  // Calculate average water intake
  const totalWaterIntake = waterIntake.reduce((sum, entry) => sum + entry.amount, 0);
  const avgWaterIntake = waterIntake.length > 0 ? totalWaterIntake / waterIntake.length : 0;

  // Calculate average sleep
  const totalSleepHours = sleepEntries.reduce((sum, entry) => sum + entry.hours, 0);
  const avgSleepHours = sleepEntries.length > 0 ? totalSleepHours / sleepEntries.length : 0;

  // Get weight change
  const weightChange =
    weightEntries.length >= 2
      ? weightEntries[0].weight - weightEntries[weightEntries.length - 1].weight
      : 0;

  return {
    totalCalories,
    totalCaloriesBurned,
    avgWaterIntake,
    avgSleepHours,
    weightChange,
    workoutCount: workouts.length,
    weightEntries: weightEntries.length,
  };
}

// Goal progress utilities
export function calculateGoalProgress(current: number, target: number): number {
  if (target === 0) return 0;
  return Math.min(100, Math.max(0, (current / target) * 100));
}

export function getGoalStatus(current: number, target: number): 'on-track' | 'behind' | 'ahead' {
  const progress = calculateGoalProgress(current, target);
  if (progress >= 100) return 'ahead';
  if (progress >= 80) return 'on-track';
  return 'behind';
}

// Data validation utilities
export function validateWeight(weight: number): boolean {
  return weight > 0 && weight < 1000; // Reasonable weight range
}

export function validateCalories(calories: number): boolean {
  return calories >= 0 && calories < 10000; // Reasonable calorie range
}

export function validateWaterIntake(amount: number): boolean {
  return amount >= 0 && amount < 10000; // Reasonable water intake range (ml)
}

export function validateSleepHours(hours: number): boolean {
  return hours >= 0 && hours <= 24; // Reasonable sleep range
}

// Export database instance for direct access when needed
export { database };
