import React, { useState, useEffect } from 'react';
import { View, Pressable, ScrollView, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-chart-kit';
import ThemedText from './ThemedText';
import Icon from './Icon';
import useThemeColors from '@/contexts/ThemeColors';
import { shadowPresets } from '@/utils/useShadow';

interface AnalyticsData {
  workoutStats: {
    totalWorkouts: number;
    totalMinutes: number;
    avgCaloriesBurned: number;
    weeklyTrend: number[];
    categoryBreakdown: { [key: string]: number };
  };
  nutritionStats: {
    avgDailyCalories: number;
    proteinIntake: number;
    carbsIntake: number;
    fatIntake: number;
    weeklyCalories: number[];
    mealTypeBreakdown: { [key: string]: number };
  };
  progressStats: {
    weightTrend: { date: string; weight: number }[];
    waterIntake: number[];
    sleepHours: number[];
    goalProgress: { [key: string]: { current: number; target: number } };
  };
}

interface AdvancedAnalyticsDashboardProps {
  userId: string;
  className?: string;
}

export default function AdvancedAnalyticsDashboard({ userId, className = '' }: AdvancedAnalyticsDashboardProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | '3months'>('month');
  const [selectedMetric, setSelectedMetric] = useState<'workouts' | 'nutrition' | 'progress'>('workouts');
  const [isLoading, setIsLoading] = useState(true);
  const colors = useThemeColors();

  const screenWidth = Dimensions.get('window').width;
  const chartWidth = screenWidth - 60; // Accounting for padding

  useEffect(() => {
    if (userId) {
      loadAnalyticsData();
    }
  }, [userId, selectedPeriod]);

  const loadAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // This would typically fetch from your analytics API or compute from local data
      // For now, we'll simulate the data structure
      const mockData: AnalyticsData = {
        workoutStats: {
          totalWorkouts: 24,
          totalMinutes: 1440,
          avgCaloriesBurned: 320,
          weeklyTrend: [3, 4, 2, 5, 3, 4, 3],
          categoryBreakdown: {
            strength: 12,
            cardio: 8,
            yoga: 3,
            functional: 1,
          },
        },
        nutritionStats: {
          avgDailyCalories: 2150,
          proteinIntake: 128,
          carbsIntake: 245,
          fatIntake: 85,
          weeklyCalories: [2100, 2200, 2000, 2300, 2150, 2050, 2250],
          mealTypeBreakdown: {
            breakfast: 25,
            lunch: 35,
            dinner: 30,
            snack: 10,
          },
        },
        progressStats: {
          weightTrend: [
            { date: '2024-01-01', weight: 75.5 },
            { date: '2024-01-08', weight: 75.2 },
            { date: '2024-01-15', weight: 74.8 },
            { date: '2024-01-22', weight: 74.5 },
            { date: '2024-01-29', weight: 74.3 },
          ],
          waterIntake: [2.1, 2.3, 1.8, 2.5, 2.2, 2.0, 2.4],
          sleepHours: [7.5, 8.0, 6.5, 7.8, 8.2, 7.0, 7.5],
          goalProgress: {
            weight: { current: 74.3, target: 72.0 },
            workouts: { current: 24, target: 30 },
            calories: { current: 2150, target: 2000 },
          },
        },
      };

      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const chartConfig = {
    backgroundColor: colors.secondary,
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.secondary,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
    labelColor: (opacity = 1) => colors.text + Math.round(opacity * 255).toString(16),
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: '#3B82F6',
    },
  };

  const renderWorkoutAnalytics = () => {
    if (!analyticsData) return null;

    const { workoutStats } = analyticsData;

    return (
      <View>
        {/* Key Metrics */}
        <View className="mb-6 flex-row justify-between">
          <View className="flex-1 rounded-lg bg-background p-4">
            <ThemedText className="text-2xl font-bold text-blue-600">{workoutStats.totalWorkouts}</ThemedText>
            <ThemedText className="text-sm opacity-70">Total Workouts</ThemedText>
          </View>
          <View className="flex-1 rounded-lg bg-background p-4 mx-2">
            <ThemedText className="text-2xl font-bold text-green-600">
              {Math.round(workoutStats.totalMinutes / 60)}h
            </ThemedText>
            <ThemedText className="text-sm opacity-70">Total Hours</ThemedText>
          </View>
          <View className="flex-1 rounded-lg bg-background p-4">
            <ThemedText className="text-2xl font-bold text-orange-600">{workoutStats.avgCaloriesBurned}</ThemedText>
            <ThemedText className="text-sm opacity-70">Avg Calories</ThemedText>
          </View>
        </View>

        {/* Weekly Trend Chart */}
        <View className="mb-6 rounded-lg bg-background p-4">
          <ThemedText className="mb-4 text-lg font-semibold">Weekly Workout Trend</ThemedText>
          <BarChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [{ data: workoutStats.weeklyTrend }],
            }}
            width={chartWidth - 32}
            height={200}
            chartConfig={chartConfig}
            showValuesOnTopOfBars
            fromZero
          />
        </View>

        {/* Category Breakdown */}
        <View className="rounded-lg bg-background p-4">
          <ThemedText className="mb-4 text-lg font-semibold">Workout Categories</ThemedText>
          <PieChart
            data={Object.entries(workoutStats.categoryBreakdown).map(([category, value], index) => ({
              name: category.charAt(0).toUpperCase() + category.slice(1),
              population: value,
              color: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'][index] || '#6B7280',
              legendFontColor: colors.text,
              legendFontSize: 12,
            }))}
            width={chartWidth - 32}
            height={200}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </View>
    );
  };

  const renderNutritionAnalytics = () => {
    if (!analyticsData) return null;

    const { nutritionStats } = analyticsData;

    return (
      <View>
        {/* Macro Breakdown */}
        <View className="mb-6 flex-row justify-between">
          <View className="flex-1 rounded-lg bg-background p-4">
            <ThemedText className="text-2xl font-bold text-red-600">{nutritionStats.proteinIntake}g</ThemedText>
            <ThemedText className="text-sm opacity-70">Protein</ThemedText>
          </View>
          <View className="flex-1 rounded-lg bg-background p-4 mx-2">
            <ThemedText className="text-2xl font-bold text-yellow-600">{nutritionStats.carbsIntake}g</ThemedText>
            <ThemedText className="text-sm opacity-70">Carbs</ThemedText>
          </View>
          <View className="flex-1 rounded-lg bg-background p-4">
            <ThemedText className="text-2xl font-bold text-purple-600">{nutritionStats.fatIntake}g</ThemedText>
            <ThemedText className="text-sm opacity-70">Fat</ThemedText>
          </View>
        </View>

        {/* Calorie Trend */}
        <View className="mb-6 rounded-lg bg-background p-4">
          <ThemedText className="mb-4 text-lg font-semibold">Daily Calories</ThemedText>
          <LineChart
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [{ data: nutritionStats.weeklyCalories }],
            }}
            width={chartWidth - 32}
            height={200}
            chartConfig={chartConfig}
            bezier
          />
        </View>

        {/* Meal Distribution */}
        <View className="rounded-lg bg-background p-4">
          <ThemedText className="mb-4 text-lg font-semibold">Meal Distribution (%)</ThemedText>
          <View className="space-y-3">
            {Object.entries(nutritionStats.mealTypeBreakdown).map(([mealType, percentage]) => (
              <View
                key={mealType}
                className="flex-row items-center justify-between">
                <ThemedText className="capitalize">{mealType}</ThemedText>
                <View className="flex-1 mx-4 h-2 rounded-full bg-border">
                  <View
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${percentage}%` }}
                  />
                </View>
                <ThemedText className="text-sm opacity-70">{percentage}%</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  };

  const renderProgressAnalytics = () => {
    if (!analyticsData) return null;

    const { progressStats } = analyticsData;

    return (
      <View>
        {/* Goal Progress */}
        <View className="mb-6 space-y-3">
          {Object.entries(progressStats.goalProgress).map(([goalType, data]) => {
            const progress = (data.current / data.target) * 100;
            const isOnTrack = progress >= 80;

            return (
              <View
                key={goalType}
                className="rounded-lg bg-background p-4">
                <View className="mb-2 flex-row items-center justify-between">
                  <ThemedText className="font-semibold capitalize">{goalType} Goal</ThemedText>
                  <View className={`rounded-full px-2 py-1 ${isOnTrack ? 'bg-green-500/20' : 'bg-yellow-500/20'}`}>
                    <ThemedText className={`text-xs ${isOnTrack ? 'text-green-700' : 'text-yellow-700'}`}>
                      {isOnTrack ? 'On Track' : 'Behind'}
                    </ThemedText>
                  </View>
                </View>
                <View className="mb-2 h-2 rounded-full bg-border">
                  <View
                    className={`h-full rounded-full ${isOnTrack ? 'bg-green-500' : 'bg-yellow-500'}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </View>
                <ThemedText className="text-sm opacity-70">
                  {data.current} / {data.target} ({Math.round(progress)}%)
                </ThemedText>
              </View>
            );
          })}
        </View>

        {/* Weight Trend */}
        <View className="mb-6 rounded-lg bg-background p-4">
          <ThemedText className="mb-4 text-lg font-semibold">Weight Progress</ThemedText>
          <LineChart
            data={{
              labels: progressStats.weightTrend.map((item) => item.date.slice(5, 10)),
              datasets: [{ data: progressStats.weightTrend.map((item) => item.weight) }],
            }}
            width={chartWidth - 32}
            height={200}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
            }}
            bezier
          />
        </View>

        {/* Water & Sleep */}
        <View className="flex-row justify-between">
          <View className="flex-1 rounded-lg bg-background p-4">
            <ThemedText className="mb-2 font-semibold">Water Intake (L)</ThemedText>
            <ThemedText className="text-2xl font-bold text-blue-600">
              {(progressStats.waterIntake.reduce((a, b) => a + b, 0) / 7).toFixed(1)}
            </ThemedText>
            <ThemedText className="text-sm opacity-70">Daily Average</ThemedText>
          </View>
          <View className="flex-1 rounded-lg bg-background p-4 ml-4">
            <ThemedText className="mb-2 font-semibold">Sleep Hours</ThemedText>
            <ThemedText className="text-2xl font-bold text-purple-600">
              {(progressStats.sleepHours.reduce((a, b) => a + b, 0) / 7).toFixed(1)}
            </ThemedText>
            <ThemedText className="text-sm opacity-70">Daily Average</ThemedText>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return (
      <View
        className={`rounded-xl bg-secondary p-6 ${className}`}
        style={shadowPresets.medium}>
        <View className="flex-row items-center justify-center">
          <View className="mr-3 h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
          <ThemedText>Loading analytics...</ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View
      className={`rounded-xl bg-secondary ${className}`}
      style={shadowPresets.medium}>
      <View className="p-6">
        {/* Header */}
        <View className="mb-6 flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-lg bg-purple-500">
            <Icon
              name="TrendingUp"
              size={20}
              color="white"
            />
          </View>
          <View className="flex-1">
            <ThemedText className="text-lg font-bold">Advanced Analytics</ThemedText>
            <ThemedText className="text-sm opacity-70">Detailed insights into your health journey</ThemedText>
          </View>
        </View>

        {/* Period Selector */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mb-4">
          <View className="flex-row space-x-2">
            {(['week', 'month', '3months'] as const).map((period) => (
              <Pressable
                key={period}
                onPress={() => setSelectedPeriod(period)}
                className={`rounded-lg px-4 py-2 ${selectedPeriod === period ? 'bg-highlight' : 'bg-background'}`}>
                <ThemedText className={`text-sm font-medium ${selectedPeriod === period ? 'text-white' : ''}`}>
                  {period === '3months' ? '3 Months' : period.charAt(0).toUpperCase() + period.slice(1)}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Metric Selector */}
        <View className="mb-6 flex-row space-x-2">
          {(['workouts', 'nutrition', 'progress'] as const).map((metric) => (
            <Pressable
              key={metric}
              onPress={() => setSelectedMetric(metric)}
              className={`flex-1 rounded-lg p-3 ${selectedMetric === metric ? 'bg-highlight' : 'bg-background'}`}>
              <View className="flex-row items-center justify-center">
                <Icon
                  name={metric === 'workouts' ? 'Dumbbell' : metric === 'nutrition' ? 'Apple' : 'Target'}
                  size={16}
                  className={`mr-2 ${selectedMetric === metric ? 'text-white' : ''}`}
                  color={selectedMetric === metric ? 'white' : colors.text}
                />
                <ThemedText
                  className={`text-sm font-medium capitalize ${selectedMetric === metric ? 'text-white' : ''}`}>
                  {metric}
                </ThemedText>
              </View>
            </Pressable>
          ))}
        </View>

        {/* Analytics Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="max-h-96">
          {selectedMetric === 'workouts' && renderWorkoutAnalytics()}
          {selectedMetric === 'nutrition' && renderNutritionAnalytics()}
          {selectedMetric === 'progress' && renderProgressAnalytics()}
        </ScrollView>
      </View>
    </View>
  );
}
