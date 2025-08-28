import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import { Button } from '@/components/Button';
import Header from '@/components/Header';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import Input from '@/components/forms/Input';
import Section from '@/components/layout/Section';

interface Exercise {
  name: string;
  startingWeight: string;
  currentWeight: string;
  unit: 'lb' | 'kg';
}

export default function StrongLiftsSetupScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([
    { name: 'Squat', startingWeight: '45', currentWeight: '45', unit: 'lb' },
    { name: 'Bench Press', startingWeight: '45', currentWeight: '45', unit: 'lb' },
    { name: 'Barbell Row', startingWeight: '45', currentWeight: '45', unit: 'lb' },
    { name: 'Overhead Press', startingWeight: '45', currentWeight: '45', unit: 'lb' },
    { name: 'Deadlift', startingWeight: '95', currentWeight: '95', unit: 'lb' },
  ]);

  const [bodyWeight, setBodyWeight] = useState('150');
  const [weightUnit, setWeightUnit] = useState<'lb' | 'kg'>('lb');
  const [workoutDays, setWorkoutDays] = useState<number>(3);

  const updateExerciseWeight = (index: number, field: 'startingWeight' | 'currentWeight', value: string) => {
    const updatedExercises = [...exercises];
    updatedExercises[index][field] = value;
    setExercises(updatedExercises);
  };

  const renderExercise = (exercise: Exercise, index: number) => (
    <View
      key={exercise.name}
      className="mb-4 rounded-lg bg-secondary p-4">
      <ThemedText className="mb-3 text-lg font-semibold">{exercise.name}</ThemedText>

      <View className="flex-row gap-3">
        <View className="flex-1">
          <ThemedText className="text-subtext mb-1 text-sm">Starting Weight</ThemedText>
          <Input
            value={exercise.startingWeight}
            onChangeText={(value) => updateExerciseWeight(index, 'startingWeight', value)}
            placeholder="0"
            keyboardType="numeric"
            className="bg-background"
          />
        </View>

        <View className="flex-1">
          <ThemedText className="text-subtext mb-1 text-sm">Current Weight</ThemedText>
          <Input
            value={exercise.currentWeight}
            onChangeText={(value) => updateExerciseWeight(index, 'currentWeight', value)}
            placeholder="0"
            keyboardType="numeric"
            className="bg-background"
          />
        </View>

        <View className="w-16 items-center justify-end">
          <ThemedText className="text-subtext text-sm">{exercise.unit}</ThemedText>
        </View>
      </View>
    </View>
  );

  return (
    <>
      <Header
        title="StrongLifts Setup"
        className="bg-secondary"
        showBackButton
      />

      <ThemedScroller className="flex-1">
        <View className="p-global">
          {/* Program Overview */}
          <Section
            title="StrongLifts 5x5 Program"
            className="mb-6">
            <View className="rounded-lg bg-secondary p-4">
              <ThemedText className="mb-2 text-base font-medium">Program Overview</ThemedText>
              <ThemedText className="text-subtext mb-2 text-sm">• 5 compound exercises</ThemedText>
              <ThemedText className="text-subtext mb-2 text-sm">• 3 workouts per week</ThemedText>
              <ThemedText className="text-subtext mb-2 text-sm">• Progressive overload</ThemedText>
              <ThemedText className="text-subtext text-sm">• 5 sets of 5 reps</ThemedText>
            </View>
          </Section>

          {/* Weight Unit Selection */}
          <Section
            title="Weight Unit"
            className="mb-6">
            <View className="flex-row rounded-lg bg-secondary p-1">
              {['lb', 'kg'].map((unit) => (
                <Pressable
                  key={unit}
                  onPress={() => setWeightUnit(unit as 'lb' | 'kg')}
                  className={`flex-1 items-center justify-center rounded-md py-3 ${
                    weightUnit === unit ? 'bg-background' : 'bg-transparent'
                  }`}>
                  <ThemedText
                    className={`text-base font-medium ${weightUnit === unit ? 'text-highlight' : 'text-subtext'}`}>
                    {unit.toUpperCase()}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </Section>

          {/* Body Weight */}
          <Section
            title="Body Weight"
            className="mb-6">
            <Input
              value={bodyWeight}
              onChangeText={setBodyWeight}
              placeholder="Enter your body weight"
              keyboardType="numeric"
              className="bg-secondary"
            />
          </Section>

          {/* Workout Frequency */}
          <Section
            title="Workout Frequency"
            className="mb-6">
            <View className="flex-row rounded-lg bg-secondary p-1">
              {[2, 3, 4].map((days) => (
                <Pressable
                  key={days}
                  onPress={() => setWorkoutDays(days)}
                  className={`flex-1 items-center justify-center rounded-md py-3 ${
                    workoutDays === days ? 'bg-background' : 'bg-transparent'
                  }`}>
                  <ThemedText
                    className={`text-base font-medium ${workoutDays === days ? 'text-highlight' : 'text-subtext'}`}>
                    {days}x/week
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </Section>

          {/* Exercise Weights */}
          <Section
            title="Exercise Starting Weights"
            className="mb-6">
            {exercises.map((exercise, index) => renderExercise(exercise, index))}
          </Section>

          {/* Program Schedule */}
          <Section
            title="Workout Schedule"
            className="mb-6">
            <View className="rounded-lg bg-secondary p-4">
              <ThemedText className="mb-3 text-base font-medium">Workout A</ThemedText>
              <ThemedText className="text-subtext mb-1 text-sm">• Squat 5x5</ThemedText>
              <ThemedText className="text-subtext mb-1 text-sm">• Bench Press 5x5</ThemedText>
              <ThemedText className="text-subtext mb-3 text-sm">• Barbell Row 5x5</ThemedText>

              <ThemedText className="mb-3 text-base font-medium">Workout B</ThemedText>
              <ThemedText className="text-subtext mb-1 text-sm">• Squat 5x5</ThemedText>
              <ThemedText className="text-subtext mb-1 text-sm">• Overhead Press 5x5</ThemedText>
              <ThemedText className="text-subtext text-sm">• Deadlift 1x5</ThemedText>
            </View>
          </Section>
        </View>
      </ThemedScroller>

      {/* Bottom Actions */}
      <View className="border-t border-border bg-secondary p-global">
        <Link
          asChild
          href="/(mobile)/(index)">
          <Button
            title="Start StrongLifts Program"
            variant="primary"
            size="large"
            className="w-full"
          />
        </Link>
      </View>
    </>
  );
}
