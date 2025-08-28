import Storage from 'expo-sqlite/kv-store';

import { database } from '@/lib/database';
import { useDataStore } from '@/stores/data-store';

const STORAGE_KEYS = {
  ONBOARDING_COMPLETED: 'onboarding_completed',
  USER_PREFERENCES: 'user_preferences',
  FIRST_TIME_USER: 'first_time_user',
} as const;

export interface UserPreferences {
  gender?: 'Male' | 'Female';
  birthday?: Date | string; // Can be Date object or ISO string when retrieved from storage
  height?: {
    value: number;
    unit: 'cm' | 'ft';
  };
  weight?: {
    value: number;
    unit: 'kg' | 'lb';
  };
  weightTrend?: 'up' | 'down' | 'stable' | 'not-sure';
  exerciseFrequency?: '0' | '1-3' | '4-6' | '7+';
  goals?: string[];
  notifications?: boolean;
  theme?: 'light' | 'dark' | 'auto';
}

class StorageManager {
  // Check if user has completed onboarding
  async isOnboardingCompleted(): Promise<boolean> {
    console.log('🔄 StorageManager isOnboardingCompleted - called');
    try {
      const value = await Storage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED);
      console.log('🔄 StorageManager isOnboardingCompleted - result:', value);
      // Ensure we return a proper boolean value
      return value === 'true';
    } catch (error) {
      console.error('❌ StorageManager isOnboardingCompleted - Error:', error);
      return false;
    }
  }

  // Mark onboarding as completed
  async setOnboardingCompleted(): Promise<void> {
    try {
      await Storage.setItem(STORAGE_KEYS.ONBOARDING_COMPLETED, 'true');
      console.log('✅ StorageManager - onboarding marked as completed');
    } catch (error) {
      console.error('❌ StorageManager - Error setting onboarding completed:', error);
    }
  }

  // Check if this is the first time user opens the app
  async isFirstTimeUser(): Promise<boolean> {
    console.log('🔄 StorageManager isFirstTimeUser - called');
    try {
      const value = await Storage.getItem(STORAGE_KEYS.FIRST_TIME_USER);
      console.log('🔄 StorageManager isFirstTimeUser - result:', value);
      // If no value is stored, it's a first time user
      // If value is 'false', it's not a first time user
      return value === null || value === undefined;
    } catch (error) {
      console.error('❌ StorageManager isFirstTimeUser - Error:', error);
      return true; // Default to first time user if there's an error
    }
  }

  // Mark that user has opened the app before
  async setFirstTimeUserCompleted(): Promise<void> {
    try {
      await Storage.setItem(STORAGE_KEYS.FIRST_TIME_USER, 'false');
      console.log('✅ StorageManager - first time user marked as completed');
    } catch (error) {
      console.error('❌ StorageManager - Error setting first time user:', error);
    }
  }

  // Get user preferences
  async getUserPreferences(): Promise<UserPreferences | null> {
    try {
      const value = await Storage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return null;
    }
  }

  // Convert user preferences to health profile data
  convertPreferencesToHealthProfile(preferences: UserPreferences, userId: string): any {
    const profile: any = {
      id: `health_${userId}`,
      userId,
      isDeleted: false,
    };

    // Convert gender
    if (preferences.gender) {
      profile.gender = preferences.gender;
    }

    // Convert birthday to age
    if (preferences.birthday) {
      // Handle both Date objects and ISO strings
      const birthdayDate =
        preferences.birthday instanceof Date
          ? preferences.birthday
          : new Date(preferences.birthday);

      if (!isNaN(birthdayDate.getTime())) {
        profile.birthday = birthdayDate.toISOString();
        const today = new Date();
        const age = today.getFullYear() - birthdayDate.getFullYear();
        const monthDiff = today.getMonth() - birthdayDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdayDate.getDate())) {
          profile.age = age - 1;
        } else {
          profile.age = age;
        }
      }
    }

    // Convert height
    if (preferences.height) {
      if (preferences.height.unit === 'cm') {
        profile.heightCm = preferences.height.value;
        profile.heightUnit = 'cm';
      } else {
        // Convert feet to cm
        const feet = Math.floor(preferences.height.value);
        const inches = (preferences.height.value - feet) * 10;
        const totalInches = feet * 12 + inches;
        profile.heightCm = totalInches * 2.54;
        profile.heightUnit = 'in';
      }
    }

    // Convert weight
    if (preferences.weight) {
      if (preferences.weight.unit === 'kg') {
        profile.weightKg = preferences.weight.value;
        profile.weightUnit = 'kg';
      } else {
        // Convert lbs to kg
        profile.weightKg = preferences.weight.value * 0.453592;
        profile.weightUnit = 'lb';
      }
    }

    // Convert exercise frequency to activity level
    if (preferences.exerciseFrequency) {
      switch (preferences.exerciseFrequency) {
        case '0':
          profile.activityLevel = 'sedentary';
          break;
        case '1-3':
          profile.activityLevel = 'light';
          break;
        case '4-6':
          profile.activityLevel = 'moderate';
          break;
        case '7+':
          profile.activityLevel = 'active';
          break;
      }
    }

    // Convert weight trend to fitness goal
    if (preferences.weightTrend) {
      switch (preferences.weightTrend) {
        case 'up':
          profile.fitnessGoal = 'gain_weight';
          break;
        case 'down':
          profile.fitnessGoal = 'lose_weight';
          break;
        case 'stable':
          profile.fitnessGoal = 'maintain';
          break;
        case 'not-sure':
          profile.fitnessGoal = 'improve_fitness';
          break;
      }
    }

    return profile;
  }

  // Save user preferences to both storage and database
  async saveUserPreferences(preferences: Partial<UserPreferences>, userId?: string): Promise<void> {
    try {
      console.log('🔄 StorageManager - Saving user preferences:', preferences);

      // Save to local storage
      const existing = await this.getUserPreferences();
      const updated = { ...existing, ...preferences };
      await Storage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updated));
      console.log('✅ StorageManager - Saved to local storage:', updated);

      // Save to database if we have a user ID
      const currentUserId = userId || useDataStore.getState().user?.id;
      if (currentUserId) {
        console.log('🔄 StorageManager - Converting to health profile for user:', currentUserId);
        const healthProfileData = this.convertPreferencesToHealthProfile(updated, currentUserId);
        console.log('🔄 StorageManager - Health profile data:', healthProfileData);

        // Check if health profile already exists
        const existingProfile = await database.getHealthProfile(currentUserId);

        if (existingProfile) {
          console.log('🔄 StorageManager - Updating existing health profile');
          // Update existing profile
          await useDataStore.getState().updateHealthProfile(existingProfile.id, healthProfileData);
        } else {
          console.log('🔄 StorageManager - Creating new health profile');
          // Create new profile
          await useDataStore.getState().createHealthProfile(healthProfileData);
        }
        console.log('✅ StorageManager - Health profile saved to database');
      } else {
        console.log('⚠️ StorageManager - No user ID available, skipping database save');
      }
    } catch (error) {
      console.error('❌ StorageManager - Error saving user preferences:', error);
    }
  }

  // Complete onboarding and save all data to database
  async completeOnboarding(userId?: string): Promise<void> {
    try {
      console.log('🔄 StorageManager - Completing onboarding...');

      // Get all user preferences from storage
      const preferences = await this.getUserPreferences();
      console.log('🔄 StorageManager - Retrieved preferences:', preferences);

      if (preferences) {
        // Save to database if we have a user ID
        const currentUserId = userId || useDataStore.getState().user?.id;
        if (currentUserId) {
          console.log(
            '🔄 StorageManager - Converting preferences to health profile for user:',
            currentUserId
          );
          const healthProfileData = this.convertPreferencesToHealthProfile(
            preferences,
            currentUserId
          );
          console.log('🔄 StorageManager - Health profile data:', healthProfileData);

          // Check if health profile already exists
          const existingProfile = await database.getHealthProfile(currentUserId);

          if (existingProfile) {
            console.log('🔄 StorageManager - Updating existing health profile');
            // Update existing profile
            await useDataStore
              .getState()
              .updateHealthProfile(existingProfile.id, healthProfileData);
          } else {
            console.log('🔄 StorageManager - Creating new health profile');
            // Create new profile
            await useDataStore.getState().createHealthProfile(healthProfileData);
          }
          console.log('✅ StorageManager - Health profile saved to database');
        } else {
          console.log('⚠️ StorageManager - No user ID available, skipping database save');
        }
      } else {
        console.log('⚠️ StorageManager - No preferences found');
      }

      // Mark onboarding as completed
      await this.setOnboardingCompleted();
      console.log('✅ StorageManager - Onboarding marked as completed');
    } catch (error) {
      console.error('❌ StorageManager - Error completing onboarding:', error);
      // Still mark as completed even if database save fails
      await this.setOnboardingCompleted();
      console.log('✅ StorageManager - Onboarding marked as completed despite error');
    }
  }

  // Clear all data (for testing or logout)
  async clearAllData(): Promise<void> {
    try {
      console.log('🔄 StorageManager - Clearing all data...');
      await Storage.multiRemove([
        STORAGE_KEYS.ONBOARDING_COMPLETED,
        STORAGE_KEYS.USER_PREFERENCES,
        STORAGE_KEYS.FIRST_TIME_USER,
      ]);
      console.log('✅ StorageManager - All data cleared successfully');
    } catch (error) {
      console.error('❌ StorageManager - Error clearing data:', error);
    }
  }

  // Reset onboarding status only
  async resetOnboardingStatus(): Promise<void> {
    try {
      console.log('🔄 StorageManager - Resetting onboarding status...');
      await Storage.multiRemove([STORAGE_KEYS.ONBOARDING_COMPLETED, STORAGE_KEYS.FIRST_TIME_USER]);
      console.log('✅ StorageManager - Onboarding status reset successfully');
    } catch (error) {
      console.error('❌ StorageManager - Error resetting onboarding status:', error);
    }
  }

  // Debug method to check current onboarding status
  async debugOnboardingStatus(): Promise<void> {
    try {
      console.log('🔍 StorageManager - Debugging onboarding status...');
      const [onboardingCompleted, firstTimeUser, userPreferences] = await Promise.all([
        Storage.getItem(STORAGE_KEYS.ONBOARDING_COMPLETED),
        Storage.getItem(STORAGE_KEYS.FIRST_TIME_USER),
        Storage.getItem(STORAGE_KEYS.USER_PREFERENCES),
      ]);

      console.log('🔍 StorageManager - Current storage values:', {
        onboardingCompleted,
        firstTimeUser,
        hasUserPreferences: !!userPreferences,
      });

      console.log('🔍 StorageManager - Computed values:', {
        isOnboardingCompleted: onboardingCompleted === 'true',
        isFirstTimeUser: firstTimeUser === null || firstTimeUser === undefined,
      });
    } catch (error) {
      console.error('❌ StorageManager - Error debugging onboarding status:', error);
    }
  }

  // Test method to verify storage functionality
  async testStorageFunctionality(): Promise<void> {
    try {
      console.log('🧪 StorageManager - Testing storage functionality...');

      // Test setting and getting onboarding completed
      await this.setOnboardingCompleted();
      const isCompleted = await this.isOnboardingCompleted();
      console.log('🧪 StorageManager - Onboarding completed test:', isCompleted);

      // Test setting and getting first time user
      await this.setFirstTimeUserCompleted();
      const isFirstTime = await this.isFirstTimeUser();
      console.log('🧪 StorageManager - First time user test:', isFirstTime);

      // Clear the test data
      await this.clearAllData();
      console.log('🧪 StorageManager - Test completed and data cleared');
    } catch (error) {
      console.error('❌ StorageManager - Error testing storage functionality:', error);
    }
  }

  // Force complete onboarding for existing users (emergency fix)
  async forceCompleteOnboardingForExistingUser(userId?: string): Promise<void> {
    try {
      console.log('🚨 StorageManager - Force completing onboarding for existing user...');

      // Mark as not first time user
      await this.setFirstTimeUserCompleted();

      // Mark onboarding as completed
      await this.setOnboardingCompleted();

      // If we have a user ID, try to save any existing preferences
      if (userId) {
        const preferences = await this.getUserPreferences();
        if (preferences) {
          console.log('🚨 StorageManager - Found existing preferences, saving to database...');
          await this.saveUserPreferences(preferences, userId);
        }
      }

      console.log('✅ StorageManager - Force completed onboarding for existing user');
    } catch (error) {
      console.error('❌ StorageManager - Error force completing onboarding:', error);
    }
  }
}

export const storageManager = new StorageManager();
export { STORAGE_KEYS };
