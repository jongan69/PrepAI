import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { View, Dimensions, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import { useDatabase } from '@/contexts/DatabaseProvider';

import { storageManager } from '@/utils/storage';

const { width: screenWidth } = Dimensions.get('window');

export default function OnboardingComplete() {
  const insets = useSafeAreaInsets();
  const { userId } = useDatabase();

  const handleGetStarted = async () => {
    try {
      // Complete onboarding and save all data to database
      await storageManager.completeOnboarding(userId || undefined);

      // Navigate to main app
      router.replace('/(mobile)/(index)');
    } catch (error) {
      console.error('Error completing onboarding:', error);
      // Still navigate even if there's an error
      router.replace('/(mobile)/(index)');
    }
  };

  // Dynamic calculations
  const containerWidth = Math.min(screenWidth - 64, 400);

  const contentHeight = 600; // Approximate content height (icon + title + description + features + button)
  const verticalOffset = -(contentHeight / 2) - (Platform.OS === 'android' ? 50 : 0);

  return (
    <LinearGradient
      colors={['#667eea', '#764ba2', '#f093fb']}
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}>
      <View
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: [{ translateX: -containerWidth / 2 }, { translateY: verticalOffset }],
          width: containerWidth,
        }}>
        {/* Success Icon */}
        <View className="mb-12 h-32 w-32 items-center justify-center self-center rounded-full bg-white/25 backdrop-blur-sm">
          <View className="h-24 w-24 items-center justify-center rounded-full bg-white/30">
            <Icon
              name="Check"
              size={56}
              color="white"
              strokeWidth={3}
            />
          </View>
        </View>

        {/* Title */}
        <ThemedText className="mb-6 text-center text-5xl font-bold text-white">You're All Set!</ThemedText>

        {/* Description */}
        <ThemedText className="mb-12 text-center text-xl leading-7 text-white/90">
          Welcome to PrepAI! Your personalized fitness journey starts now. We'll help you track your progress and
          achieve your health goals.
        </ThemedText>

        {/* Features Preview */}
        <View className="mb-16 w-full">
          <View className="mb-6 w-full flex-row items-center rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Icon
                name="Brain"
                size={24}
                color="white"
              />
            </View>
            <ThemedText className="flex-1 text-lg font-medium text-white">
              AI-powered insights and recommendations
            </ThemedText>
          </View>

          <View className="mb-6 w-full flex-row items-center rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Icon
                name="BarChart3"
                size={24}
                color="white"
              />
            </View>
            <ThemedText className="flex-1 text-lg font-medium text-white">
              Track meals, workouts, and progress
            </ThemedText>
          </View>

          <View className="w-full flex-row items-center rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
            <View className="mr-4 h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Icon
                name="Target"
                size={24}
                color="white"
              />
            </View>
            <ThemedText className="flex-1 text-lg font-medium text-white">Personalized goals and motivation</ThemedText>
          </View>
        </View>

        {/* Get Started Button */}
        <Button
          title="Start Your Journey"
          className="w-full rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm"
          textClassName="text-white font-bold text-lg"
          onPress={handleGetStarted}
          size="large"
        />
      </View>
    </LinearGradient>
  );
}
