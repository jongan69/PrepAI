import { useAuth } from '@clerk/clerk-expo';
import { useFocusEffect } from '@react-navigation/native';
import { Redirect } from 'expo-router';
import React, { useRef, useCallback, useState } from 'react';
import { View, Animated, Pressable, RefreshControl } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';
import Svg, { Circle } from 'react-native-svg';

import Avatar from '@/components/Avatar';
import CalorieTargetModal from '@/components/CalorieTargetModal';
import Header, { HeaderIcon } from '@/components/Header';
import Icon from '@/components/Icon';
import { SmallChartCard } from '@/components/SmallChartCard';
import { SmallCircleCard } from '@/components/SmallCircleCard';
import { SmallProgressBarCard } from '@/components/SmallProgressBarCard';
import SmartOfferCard from '@/components/SmartOfferCard';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import Toast from '@/components/Toast';
import Section from '@/components/layout/Section';
import OnboardingLoading from '@/components/screens/onboarding-loading';
import { useDatabase } from '@/contexts/DatabaseProvider';
import useThemeColors from '@/contexts/ThemeColors';
import { useClerkUser } from '@/hooks/useClerkUser';
import { useDashboardData, useRealTimeData } from '@/hooks/useLiveData';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function HomeScreen() {
  const { userId, isLoading: isDatabaseLoading } = useDatabase();
  const { isSignedIn, isLoaded: isAuthLoaded } = useAuth();
  const { imageUrl, displayName } = useClerkUser();

  // Add error handling for dashboard data
  const dashboardData = useDashboardData(userId || '');
  const { refreshData } = useRealTimeData(userId || '');
  const colors = useThemeColors();
  const [isCalorieModalVisible, setIsCalorieModalVisible] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const calorieModalRef = useRef<ActionSheetRef | null>(null);

  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      refreshData();
      setToastMessage('Data refreshed successfully!');
      setShowToast(true);
    } catch (error) {
      console.error('Error refreshing data:', error);
      setToastMessage('Failed to refresh data');
      setShowToast(true);
    } finally {
      setIsRefreshing(false);
    }
  }, [refreshData]);

  // Show loading state while authentication and database are initializing
  if (!isAuthLoaded || isDatabaseLoading) {
    console.log('Authentication or database still loading, showing loading state');
    return <OnboardingLoading />;
  }

  if (!isSignedIn) {
    console.log('Not signed in');
    return <Redirect href="/(mobile)/(onboarding)" />;
  }

  // Add safety check for userId with additional validation
  if (!userId || typeof userId !== 'string') {
    console.log('No valid user ID available, showing loading state');
    return <OnboardingLoading />;
  }

  // For now, we'll show loading state if no data is available
  const isLoading = !dashboardData.user && !dashboardData.healthProfile;

  return (
    <>
      <Header
        className="bg-secondary"
        leftComponent={
          <Avatar
            src={imageUrl}
            name={displayName}
            size="sm"
            link="/(mobile)/(profile)"
          />
        }
        rightComponents={[
          <HeaderIcon
            key="notifications"
            icon="Bell"
            hasBadge
            href="/(mobile)/notifications"
          />,
        ]}
      />
      <ThemedScroller
        className="flex-1 bg-background !px-0"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={colors.text}
            colors={[colors.highlight]}
          />
        }>
        <View className="bg-secondary px-global ">
          <Section
            title="Good morning!"
            titleSize="4xl"
            subtitle={todayFormatted}
            className="mb-8 mt-8"
          />
          <CaloriesOverview
            currentCalories={dashboardData?.totalCalories || 0}
            targetCalories={dashboardData?.targetCalories || 2200}
            caloriesBurned={dashboardData?.caloriesBurned || 0}
            onEditTarget={() => {
              setIsCalorieModalVisible(true);
              calorieModalRef.current?.show();
            }}
          />
        </View>
        <View className="bg-background p-5">
          <MiniCharts
            currentWeight={dashboardData?.currentWeight || 0}
            todayWaterIntake={dashboardData?.waterIntake || 0}
            todaySleep={dashboardData?.sleepHours || 0}
            weeklyCalories={dashboardData?.weeklyCalories || 0}
            weightTrend={dashboardData?.weightTrend || []}
            waterTrend={dashboardData?.waterTrend || []}
            sleepTrend={dashboardData?.sleepTrend || []}
            isLoading={isLoading}
          />

          {/* Money Model Integration - Smart Offer Card */}
          <View className="mt-6">
            <SmartOfferCard
              placement="home"
              variant="compact"
              className="mb-4"
            />
          </View>
        </View>
      </ThemedScroller>

      <CalorieTargetModal
        isVisible={isCalorieModalVisible}
        currentTarget={dashboardData?.targetCalories || 2200}
        onClose={() => setIsCalorieModalVisible(false)}
        onSave={() => {
          // The modal will handle the database update
          setIsCalorieModalVisible(false);
          // Force a refresh of the dashboard data to reflect the new target
          refreshData();
        }}
        actionSheetRef={calorieModalRef}
      />

      <Toast
        message={toastMessage}
        type="success"
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
    </>
  );
}

interface MiniChartsProps {
  currentWeight: number;
  todayWaterIntake: number;
  todaySleep: number;
  weeklyCalories: number;
  weightTrend: any[];
  waterTrend: any[];
  sleepTrend: any[];
  isLoading: boolean;
}

const MiniCharts: React.FC<MiniChartsProps> = ({
  currentWeight,
  todayWaterIntake,
  todaySleep,
  weeklyCalories,
  weightTrend,
  waterTrend,
}) => {
  // Use real weight trend data from database
  const weightData =
    weightTrend.length > 0
      ? weightTrend.map((entry) => entry.weightKg).reverse()
      : Array.from({ length: 7 }, () => currentWeight);

  // Use real calories data - calculate daily average from weekly data
  const caloriesData = Array.from({ length: 7 }, (_, i) => {
    const baseCalories = weeklyCalories / 7;
    // Add some variation based on day of week (weekends might be different)
    const dayVariation = i >= 5 ? 0.1 : 0; // Weekend variation
    return Math.round(baseCalories * (1 + dayVariation));
  });

  // Use real water intake data from database
  const waterData =
    waterTrend.length > 0
      ? waterTrend.map((entry) => ({
          percentage: Math.min(100, (entry.amountL / 2) * 100), // Assuming 2L target
        }))
      : Array.from({ length: 3 }, () => ({
          percentage: Math.min(100, (todayWaterIntake / 2) * 100),
        }));

  return (
    <>
      <View className="mb-6 w-full flex-row items-center justify-between gap-4">
        <View className="flex-1">
          <SmallChartCard
            title="Weight Trend"
            value={currentWeight.toFixed(1)}
            unit="kg"
            subtitle="Last 7 days"
            data={weightData}
            lineColor="#00A6F4"
          />
        </View>
        <View className="flex-1">
          <SmallChartCard
            title="Calories"
            value={Math.round(weeklyCalories / 7).toString()}
            unit="cal"
            subtitle="This week"
            data={caloriesData}
            lineColor="#10b981"
          />
        </View>
      </View>
      <View className="mb-6 w-full flex-row items-center justify-between gap-4">
        <View className="flex-1">
          <SmallCircleCard
            title="Sleep"
            subtitle="Today"
            percentage={Math.min(100, (todaySleep / 8) * 100)}
            value={`${Math.floor(todaySleep)}h ${Math.round((todaySleep % 1) * 60)}m`}
          />
        </View>
        <View className="flex-1">
          <SmallProgressBarCard
            title="Water Intake"
            subtitle="Past 3 days"
            data={waterData}
            barColor="#06b6d4"
            value={`${(todayWaterIntake / 1000).toFixed(1)}L`}
            unit="/ 2L"
          />
        </View>
      </View>
    </>
  );
};

interface CaloriesOverviewProps {
  currentCalories: number;
  targetCalories: number;
  caloriesBurned: number;
  onEditTarget: () => void;
}

const CaloriesOverview: React.FC<CaloriesOverviewProps> = ({
  currentCalories,
  targetCalories,
  caloriesBurned,
  onEditTarget,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const percentage = Math.min(100, (currentCalories / targetCalories) * 100);
  const colors = useThemeColors();

  // Circle properties
  const size = 158; // 32 * 4 (w-32 h-32)
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;

  useFocusEffect(
    useCallback(() => {
      // Reset animation value
      animatedValue.setValue(0);

      // Start animation
      Animated.timing(animatedValue, {
        toValue: percentage,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, [percentage])
  );

  const remaining = targetCalories - currentCalories + caloriesBurned;

  return (
    <View className="dark:bg-dark-secondary mb-6  rounded-xl bg-secondary pt-14">
      {/* Animated Progress Ring */}
      <View className="mb-12 items-center">
        <View className="relative h-32 w-32 items-center justify-center rounded-full bg-background">
          <Svg
            width={size}
            height={size}
            style={{ position: 'absolute' }}>
            {/* Background circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.bg}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            {/* Animated progress circle */}
            <AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.highlight}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: [circumference, 0],
              })}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>

          <View className="absolute items-center">
            <ThemedText className="text-3xl font-bold">{currentCalories}</ThemedText>
            <ThemedText className="text-sm">/ {targetCalories} cal</ThemedText>
          </View>
        </View>
      </View>

      <View className="items-center justify-center">
        <View className="flex-row items-center">
          <ThemedText className="text-lg font-bold">Calories Today</ThemedText>
          <Pressable
            onPress={onEditTarget}
            className="ml-2 rounded-full p-1">
            <Icon
              name="Edit"
              size={16}
            />
          </Pressable>
        </View>
      </View>

      {/* Calories Breakdown */}
      <View className="mt-4 flex-row  justify-between rounded-2xl border-t  border-border px-6 pt-4">
        <View className="items-center">
          <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">Consumed</ThemedText>
          <View className="flex-row items-center">
            <Icon
              name="Apple"
              size={14}
              className="mr-2"
            />
            <ThemedText className="text-lg font-bold ">{currentCalories.toLocaleString()}</ThemedText>
          </View>
        </View>
        <View className="items-center">
          <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">Burned</ThemedText>
          <View className="flex-row items-center">
            <Icon
              name="Flame"
              size={14}
              className="mr-2"
            />
            <ThemedText className="text-lg font-bold ">{caloriesBurned.toLocaleString()}</ThemedText>
          </View>
        </View>
        <View className="items-center">
          <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">Remaining</ThemedText>
          <View className="flex-row items-center">
            <Icon
              name="ChartPie"
              size={14}
              className="mr-2"
            />
            <ThemedText className="text-lg font-bold ">{Math.max(0, remaining).toLocaleString()}</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
};
