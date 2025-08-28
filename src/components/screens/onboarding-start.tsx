import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import { HealthSyncStatus } from '@/components/HealthSyncStatus';
import ThemedText from '@/components/ThemedText';
import { useDatabase } from '@/contexts/DatabaseProvider';
import { syncDatabase } from '@/lib/sync-database';
import { storageManager } from '@/utils/storage';

export default function OnboardingStart() {
  const insets = useSafeAreaInsets();
  const { isInitialized, userId, isOnboardingCompleted } = useDatabase();
  const [isRecovering, setIsRecovering] = useState(false);
  const [hasExistingData, setHasExistingData] = useState(false);

  // Check for existing user data and onboarding status
  useEffect(() => {
    const checkExistingData = async () => {
      if (isInitialized) {
        try {
          if (userId) {
            // Check if user exists and has meaningful data
            const user = await syncDatabase.getUser(userId);
            if (user) {
              // Check for health profile (most important for onboarding)
              const healthProfile = await syncDatabase.getHealthProfile(userId);

              // Check for other meaningful data
              const workouts = await syncDatabase.getWorkouts(userId);
              const meals = await syncDatabase.getMeals(userId);
              const weightEntries = await syncDatabase.getWeightEntries(userId);
              const goals = await syncDatabase.getGoals(userId);

              // User has existing data if they have a health profile or any meaningful data
              const hasData =
                !!healthProfile ||
                (workouts && workouts.length > 0) ||
                (meals && meals.length > 0) ||
                (weightEntries && weightEntries.length > 0) ||
                (goals && goals.length > 0);

              setHasExistingData(hasData);
            }
          }
        } catch (error) {
          console.log('No existing user data found:', error);
          setHasExistingData(false);
        }
      }
    };

    checkExistingData();
  }, [isInitialized, userId]);

  // If user has completed onboarding, redirect to main app
  useEffect(() => {
    if (isInitialized && isOnboardingCompleted) {
      console.log('User has completed onboarding, redirecting to main app');
      router.replace('/(mobile)/(index)');
    }
  }, [isInitialized, isOnboardingCompleted]);

  const handleRecoverProfile = async () => {
    setIsRecovering(true);
    try {
      // Check if we have existing user data
      if (!userId) {
        Alert.alert('Error', 'No user ID available');
        return;
      }

      const user = await syncDatabase.getUser(userId);

      if (user) {
        // Get user preferences from storage and save to database
        const preferences = await storageManager.getUserPreferences();

        if (preferences && userId) {
          try {
            // Convert preferences to health profile and save to database
            const healthProfileData = storageManager.convertPreferencesToHealthProfile(preferences, userId as string);

            // Check if health profile already exists in database
            const existingProfile = await syncDatabase.getHealthProfile(userId as string);

            if (existingProfile) {
              // Update existing profile
              await syncDatabase.updateHealthProfile(existingProfile.id, healthProfileData);
            } else {
              // Create new profile
              await syncDatabase.createHealthProfile(healthProfileData);
            }
          } catch (dbError) {
            console.error('Error saving profile to database:', dbError);
            // Continue with recovery even if database save fails
          }
        }

        Alert.alert(
          'Profile Found!',
          `Welcome back, ${user.name || 'User'}! Your profile has been loaded from your local database.`,
          [
            {
              text: 'Continue',
              onPress: () => router.push('/(mobile)/(onboarding)/goals-selection'),
            },
          ]
        );
      } else {
        Alert.alert('No Profile Found', 'No saved profile was found. Please continue with the setup process.');
      }
    } catch (error) {
      console.error('Error recovering profile:', error);
      Alert.alert('Recovery Failed', 'Unable to recover your profile. Please continue with the setup process.');
    } finally {
      setIsRecovering(false);
    }
  };

  const handleNewSetup = () => {
    router.push('/(mobile)/(onboarding)/goals-selection');
  };

  return (
    <>
      <ImageBackground
        source={require('@/assets/img/welcome.jpg')}
        style={{ flex: 1 }}>
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <View className=" flex h-full flex-1 items-start justify-end p-6">
            <View>
              <ThemedText className="mt-auto font-outfit-bold text-4xl text-white">Welcome to PrepAI</ThemedText>
              <ThemedText className="mt-2 text-base text-white">
                Your personal health and fitness companion. Let's get your account set up with a few quick steps.
              </ThemedText>
            </View>

            {/* Sync Status */}
            <View className="mt-4">
              <HealthSyncStatus
                compact
                showControls={false}
              />
            </View>

            <View
              className=" mt-6 w-full space-y-5"
              style={{ paddingBottom: insets.bottom }}>
              <Button
                size="large"
                className="!bg-highlight"
                textClassName="text-white"
                rounded="full"
                title="Start New Setup"
                onPress={handleNewSetup}
              />

              {hasExistingData && (
                <Button
                  size="large"
                  className="!border !border-white !bg-transparent"
                  textClassName="text-white"
                  rounded="full"
                  title={isRecovering ? 'Loading...' : 'Load Existing Profile'}
                  onPress={handleRecoverProfile}
                  disabled={isRecovering}
                />
              )}

              <ThemedText className="mt-2 text-center text-sm text-gray-300">
                Your data is stored locally and automatically synced to the cloud for backup.
              </ThemedText>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </>
  );
}
