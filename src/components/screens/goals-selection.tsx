import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, ScrollView, Platform } from 'react-native';

import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import { IconName } from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import { useDatabase } from '@/contexts/DatabaseProvider';
import { storageManager } from '@/utils/storage';

interface Goal {
  id: string;
  title: string;
  description: string;
  icon: IconName;
  category: 'fitness' | 'nutrition' | 'lifestyle';
}

const availableGoals: Goal[] = [
  {
    id: 'lose-weight',
    title: 'Lose Weight',
    description: 'Shed pounds and get leaner',
    icon: 'TrendingDown',
    category: 'fitness',
  },
  {
    id: 'gain-muscle',
    title: 'Build Muscle',
    description: 'Increase strength and muscle mass',
    icon: 'Dumbbell',
    category: 'fitness',
  },
  {
    id: 'maintain-weight',
    title: 'Maintain Weight',
    description: 'Keep your current weight stable',
    icon: 'Minus',
    category: 'fitness',
  },
  {
    id: 'improve-fitness',
    title: 'Improve Fitness',
    description: 'Boost overall fitness and endurance',
    icon: 'Heart',
    category: 'fitness',
  },
  {
    id: 'eat-healthier',
    title: 'Eat Healthier',
    description: 'Improve your nutrition habits',
    icon: 'Apple',
    category: 'nutrition',
  },
  {
    id: 'drink-more-water',
    title: 'Drink More Water',
    description: 'Stay hydrated throughout the day',
    icon: 'Droplets',
    category: 'nutrition',
  },
  {
    id: 'reduce-stress',
    title: 'Reduce Stress',
    description: 'Manage stress and improve mental health',
    icon: 'Brain',
    category: 'lifestyle',
  },
  {
    id: 'better-sleep',
    title: 'Better Sleep',
    description: 'Improve sleep quality and duration',
    icon: 'Moon',
    category: 'lifestyle',
  },
  {
    id: 'increase-energy',
    title: 'More Energy',
    description: 'Boost daily energy levels',
    icon: 'Zap',
    category: 'lifestyle',
  },
];

export default function GoalsSelection() {
  const { userId } = useDatabase();
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]
    );
  };

  const handleContinue = async () => {
    if (selectedGoals.length > 0) {
      await storageManager.saveUserPreferences({ goals: selectedGoals }, userId || undefined);
    }
    router.push('/(mobile)/(onboarding)/personal-info');
  };

  const handleSkip = () => {
    router.push('/(mobile)/(onboarding)/personal-info');
  };

  const groupedGoals = availableGoals.reduce(
    (acc, goal) => {
      if (!acc[goal.category]) {
        acc[goal.category] = [];
      }
      acc[goal.category].push(goal);
      return acc;
    },
    {} as Record<string, Goal[]>
  );

  const categoryTitles = {
    fitness: 'Fitness Goals',
    nutrition: 'Nutrition Goals',
    lifestyle: 'Lifestyle Goals',
  };

  return (
    <View className="flex-1 bg-background">
      <ScrollView className="flex-1 px-global">
        {/* Header */}
        <View className="pb-8 pt-16">
          <ThemedText className="mb-2 text-center text-3xl font-bold">
            What are your goals?
          </ThemedText>
          <ThemedText className="text-text/60 text-center text-base">
            Select all that apply. You can change these later.
          </ThemedText>
        </View>

        {/* Goals Selection */}
        <View className="space-y-8">
          {Object.entries(groupedGoals).map(([category, goals]) => (
            <View key={category}>
              <ThemedText className="mb-4 text-lg font-semibold">
                {categoryTitles[category as keyof typeof categoryTitles]}
              </ThemedText>

              <View className="flex-row flex-wrap gap-3">
                {goals.map((goal) => (
                  <Chip
                    key={goal.id}
                    label={goal.title}
                    icon={goal.icon}
                    isSelected={selectedGoals.includes(goal.id)}
                    onPress={() => toggleGoal(goal.id)}
                    className="mb-2"
                  />
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Bottom Spacing */}
        <View className="h-32" />
      </ScrollView>

      {/* Bottom Actions */}
      <View
        className={`absolute bottom-0 left-0 right-0 bg-background px-global ${
          Platform.OS === 'ios' ? 'pb-global' : 'pb-24'
        }`}>
        <View className="flex-row gap-4">
          <Button title="Skip" variant="outline" className="flex-1" onPress={handleSkip} />
          <Button
            title="Continue"
            className="flex-1"
            onPress={handleContinue}
            disabled={selectedGoals.length === 0}
          />
        </View>
      </View>
    </View>
  );
}
