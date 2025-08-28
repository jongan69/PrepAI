import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import Card from '@/components/Card';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import Section from '@/components/layout/Section';

interface ExerciseProgress {
  name: string;
  currentWeight: number;
  startingWeight: number;
  totalIncrease: number;
  percentageIncrease: number;
  lastWorkout: string;
  nextTarget: number;
}

export default function StrongLiftsProgressScreen() {
  const [selectedExercise, setSelectedExercise] = useState<string>('Squat');

  const exercises: ExerciseProgress[] = [
    {
      name: 'Squat',
      currentWeight: 185,
      startingWeight: 45,
      totalIncrease: 140,
      percentageIncrease: 311,
      lastWorkout: '2 days ago',
      nextTarget: 190,
    },
    {
      name: 'Bench Press',
      currentWeight: 135,
      startingWeight: 45,
      totalIncrease: 90,
      percentageIncrease: 200,
      lastWorkout: '1 week ago',
      nextTarget: 140,
    },
    {
      name: 'Barbell Row',
      currentWeight: 125,
      startingWeight: 45,
      totalIncrease: 80,
      percentageIncrease: 178,
      lastWorkout: '3 days ago',
      nextTarget: 130,
    },
    {
      name: 'Overhead Press',
      currentWeight: 85,
      startingWeight: 45,
      totalIncrease: 40,
      percentageIncrease: 89,
      lastWorkout: '5 days ago',
      nextTarget: 90,
    },
    {
      name: 'Deadlift',
      currentWeight: 225,
      startingWeight: 95,
      totalIncrease: 130,
      percentageIncrease: 137,
      lastWorkout: '4 days ago',
      nextTarget: 235,
    },
  ];

  const selectedExerciseData = exercises.find((ex) => ex.name === selectedExercise);

  const renderExerciseCard = (exercise: ExerciseProgress) => (
    <Pressable
      key={exercise.name}
      onPress={() => setSelectedExercise(exercise.name)}
      className={`mb-3 rounded-lg p-4 ${selectedExercise === exercise.name ? 'bg-highlight' : 'bg-secondary'}`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <ThemedText
            className={`text-lg font-semibold ${selectedExercise === exercise.name ? 'text-background' : 'text-text'}`}>
            {exercise.name}
          </ThemedText>
          <ThemedText
            className={`text-sm ${selectedExercise === exercise.name ? 'text-background/80' : 'text-subtext'}`}>
            {exercise.currentWeight}lb • +{exercise.totalIncrease}lb
          </ThemedText>
        </View>
        <View className="items-end">
          <ThemedText
            className={`text-lg font-bold ${
              selectedExercise === exercise.name ? 'text-background' : 'text-highlight'
            }`}>
            {exercise.currentWeight}lb
          </ThemedText>
          <ThemedText
            className={`text-xs ${selectedExercise === exercise.name ? 'text-background/80' : 'text-subtext'}`}>
            Next: {exercise.nextTarget}lb
          </ThemedText>
        </View>
      </View>
    </Pressable>
  );

  const renderProgressChart = () => (
    <View className="mb-6 rounded-lg bg-secondary p-4">
      <ThemedText className="mb-4 text-lg font-semibold">Progress Chart</ThemedText>

      {/* Mock chart bars */}
      <View className="space-y-3">
        {[45, 65, 85, 105, 125, 145, 165, 185].map((weight, index) => (
          <View
            key={weight}
            className="flex-row items-center">
            <ThemedText className="text-subtext w-12 text-sm">{weight}lb</ThemedText>
            <View className="mx-3 h-4 flex-1 overflow-hidden rounded-full bg-background">
              <View
                className="h-full rounded-full bg-highlight"
                style={{ width: `${Math.min(100, (index + 1) * 12.5)}%` }}
              />
            </View>
            <ThemedText className="text-subtext w-8 text-xs">{index + 1}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );

  const renderStats = () => (
    <View className="mb-6">
      <Section
        title="Statistics"
        className="mb-4">
        <View className="flex-row gap-3">
          <Card
            className="flex-1 p-4"
            title="Total Increase"
            image={require('@/assets/img/muscles.png')}>
            <ThemedText className="mb-1 text-2xl font-bold text-highlight">
              {selectedExerciseData?.totalIncrease}lb
            </ThemedText>
            <ThemedText className="text-subtext text-sm">Total Increase</ThemedText>
          </Card>

          <Card
            className="flex-1 p-4"
            title="Progress"
            image={require('@/assets/img/muscles.png')}>
            <ThemedText className="mb-1 text-2xl font-bold text-highlight">
              {selectedExerciseData?.percentageIncrease}%
            </ThemedText>
            <ThemedText className="text-subtext text-sm">Progress</ThemedText>
          </Card>

          <Card
            className="flex-1 p-4"
            title="Workouts"
            image={require('@/assets/img/muscles.png')}>
            <ThemedText className="mb-1 text-2xl font-bold text-highlight">12</ThemedText>
            <ThemedText className="text-subtext text-sm">Workouts</ThemedText>
          </Card>
        </View>
      </Section>
    </View>
  );

  return (
    <>
      <Header
        title="Progress"
        className="bg-secondary"
        showBackButton
        rightComponents={[
          <Icon
            name="Share2"
            size={24}
            className="text-text"
          />,
        ]}
      />

      <ThemedScroller className="flex-1">
        <View className="p-global">
          {/* Exercise Selection */}
          <Section
            title="Exercises"
            className="mb-6">
            {exercises.map(renderExerciseCard)}
          </Section>

          {/* Selected Exercise Details */}
          {selectedExerciseData && (
            <>
              {renderStats()}
              {renderProgressChart()}
            </>
          )}

          {/* Recent Performance */}
          <Section
            title="Recent Performance"
            className="mb-6">
            <View className="rounded-lg bg-secondary p-4">
              <ThemedText className="mb-3 text-base font-medium">Last 5 Workouts</ThemedText>
              {[
                { date: 'Today', weight: '185lb', sets: '5x5' },
                { date: '2 days ago', weight: '180lb', sets: '5x5' },
                { date: '4 days ago', weight: '175lb', sets: '5x5' },
                { date: '1 week ago', weight: '170lb', sets: '5x5' },
                { date: '1 week ago', weight: '165lb', sets: '5x5' },
              ].map((workout, index) => (
                <View
                  key={index}
                  className="flex-row items-center justify-between border-b border-border py-2 last:border-b-0">
                  <ThemedText className="text-subtext text-sm">{workout.date}</ThemedText>
                  <ThemedText className="text-sm font-medium">{workout.weight}</ThemedText>
                  <ThemedText className="text-subtext text-sm">{workout.sets}</ThemedText>
                </View>
              ))}
            </View>
          </Section>

          {/* Goals */}
          <Section
            title="Goals"
            className="mb-6">
            <View className="rounded-lg bg-secondary p-4">
              <View className="mb-3 flex-row items-center justify-between">
                <ThemedText className="text-base font-medium">Next Target</ThemedText>
                <ThemedText className="text-lg font-bold text-highlight">
                  {selectedExerciseData?.nextTarget}lb
                </ThemedText>
              </View>
              <View className="flex-row items-center justify-between">
                <ThemedText className="text-base font-medium">Goal Weight</ThemedText>
                <ThemedText className="text-lg font-bold text-highlight">225lb</ThemedText>
              </View>
            </View>
          </Section>
        </View>
      </ThemedScroller>
    </>
  );
}
