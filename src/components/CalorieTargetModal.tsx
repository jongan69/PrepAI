import * as NavigationBar from 'expo-navigation-bar';
import React, { useState, useEffect } from 'react';
import { View, Pressable, Platform } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import Input from '@/components/forms/Input';
import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/contexts/ThemeColors';
import { useTheme } from '@/contexts/ThemeContext';
import { useDataStore } from '@/stores/data-store';

interface CalorieTargetModalProps {
  isVisible: boolean;
  currentTarget: number;
  onClose: () => void;
  onSave: (newTarget: number) => void;
  actionSheetRef: React.RefObject<ActionSheetRef | null>;
}

const CalorieTargetModal: React.FC<CalorieTargetModalProps> = ({ currentTarget, onClose, onSave, actionSheetRef }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = useThemeColors();
  const [targetCalories, setTargetCalories] = useState(currentTarget.toString());
  const [error, setError] = useState<string | null>(null);
  const { healthProfile, updateHealthProfile } = useDataStore();

  useEffect(() => {
    setTargetCalories(currentTarget.toString());
    setError(null);
  }, [currentTarget]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(colors.bg);
      NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');

      return () => {
        NavigationBar.setBackgroundColorAsync(colors.bg);
        NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
      };
    }
  }, [isDark, colors.bg]);

  const validateCalories = (value: string): boolean => {
    const calories = parseInt(value);
    if (isNaN(calories) || calories <= 0) {
      setError('Please enter a valid calorie target');
      return false;
    }
    if (calories < 800 || calories > 5000) {
      setError('Calorie target must be between 800 and 5000');
      return false;
    }
    setError(null);
    return true;
  };

  const handleSave = async () => {
    if (!validateCalories(targetCalories)) {
      return;
    }

    const newTarget = parseInt(targetCalories);

    try {
      if (healthProfile) {
        await updateHealthProfile(healthProfile.id, {
          targetCalories: newTarget,
          userId: healthProfile.userId,
        });

        console.log('Calorie target updated successfully:', newTarget);

        // Call onSave with the new target
        onSave(newTarget);
        actionSheetRef.current?.hide();
      } else {
        setError('Health profile not found. Please try again.');
      }
    } catch (error) {
      console.error('Error updating calorie target:', error);
      setError('Failed to update calorie target. Please try again.');
    }
  };

  const handleCancel = () => {
    actionSheetRef.current?.hide();
    onClose();
  };

  const handleInputChange = (text: string) => {
    setTargetCalories(text);
    if (error) {
      validateCalories(text);
    }
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled
      drawUnderStatusBar={false}
      statusBarTranslucent
      containerStyle={{
        backgroundColor: colors.bg,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      <View className="p-8 pb-14">
        <ThemedText className="mb-6 text-xl font-bold">Update Calorie Target</ThemedText>

        <View className="mb-6">
          <Input
            label="Daily Calorie Target"
            value={targetCalories}
            onChangeText={handleInputChange}
            keyboardType="numeric"
            placeholder="Enter your daily calorie target"
            error={error || undefined}
            variant="inline"
            className="text-lg"
          />
        </View>

        <View className="mb-4">
          <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">
            Recommended daily calorie targets:
          </ThemedText>
          <View className="mt-2 space-y-1">
            <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">
              • Weight loss: 1,200 - 1,800 calories
            </ThemedText>
            <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">
              • Maintenance: 1,800 - 2,400 calories
            </ThemedText>
            <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">
              • Weight gain: 2,400 - 3,000 calories
            </ThemedText>
          </View>
        </View>

        <View className="flex-row justify-between space-x-3">
          <Pressable
            onPress={handleCancel}
            className="dark:bg-dark-secondary flex-1 items-center rounded-lg bg-secondary px-4 py-3">
            <ThemedText>Cancel</ThemedText>
          </Pressable>
          <Pressable
            onPress={handleSave}
            className="flex-1 items-center rounded-lg bg-highlight px-4 py-3">
            <ThemedText className="text-white font-semibold">Save</ThemedText>
          </Pressable>
        </View>
      </View>
    </ActionSheet>
  );
};

export default CalorieTargetModal;
