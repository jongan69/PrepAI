import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import { Button } from '@/components/Button';
import ExerciseSetTracker from '@/components/ExerciseSetTracker';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import Input from '@/components/forms/Input';

interface Exercise {
  id: string;
  name: string;
  target: string;
  sets: Set[];
  isCompleted: boolean;
}

interface Set {
  id: string;
  reps: number;
  weight: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

export default function StrongLiftsWorkoutScreen() {
  const [workoutMode, setWorkoutMode] = useState<'workout' | 'warmup'>('workout');
  const [bodyWeight, setBodyWeight] = useState('143.7');

  const exercises: Exercise[] = [
    {
      id: '1',
      name: 'Squat',
      target: '5x45lb',
      sets: [
        { id: '1-1', reps: 5, weight: 45, isCompleted: true, isCurrent: false },
        { id: '1-2', reps: 5, weight: 65, isCompleted: true, isCurrent: false },
        { id: '1-3', reps: 5, weight: 75, isCompleted: true, isCurrent: false },
        { id: '1-4', reps: 5, weight: 75, isCompleted: true, isCurrent: false },
      ],
      isCompleted: true,
    },
    {
      id: '2',
      name: 'Incline Bench Press',
      target: '4x5 45lb',
      sets: [
        { id: '2-1', reps: 5, weight: 45, isCompleted: true, isCurrent: false },
        { id: '2-2', reps: 5, weight: 45, isCompleted: true, isCurrent: false },
        { id: '2-3', reps: 5, weight: 45, isCompleted: true, isCurrent: false },
        { id: '2-4', reps: 5, weight: 45, isCompleted: true, isCurrent: false },
      ],
      isCompleted: true,
    },
    {
      id: '3',
      name: 'Deadlift',
      target: '4x5 55lb',
      sets: [
        { id: '3-1', reps: 5, weight: 55, isCompleted: true, isCurrent: false },
        { id: '3-2', reps: 5, weight: 55, isCompleted: true, isCurrent: false },
        { id: '3-3', reps: 5, weight: 55, isCompleted: true, isCurrent: false },
        { id: '3-4', reps: 5, weight: 55, isCompleted: true, isCurrent: false },
      ],
      isCompleted: true,
    },
    {
      id: '4',
      name: 'Chinups',
      target: '3x8 BW',
      sets: [
        { id: '4-1', reps: 8, weight: 0, isCompleted: true, isCurrent: false },
        { id: '4-2', reps: 8, weight: 0, isCompleted: true, isCurrent: false },
        { id: '4-3', reps: 8, weight: 0, isCompleted: true, isCurrent: false },
      ],
      isCompleted: false,
    },
    {
      id: '5',
      name: 'Bench Press',
      target: '5x45lb',
      sets: [
        { id: '5-1', reps: 5, weight: 45, isCompleted: true, isCurrent: false },
        { id: '5-2', reps: 5, weight: 45, isCompleted: true, isCurrent: false },
        { id: '5-3', reps: 5, weight: 45, isCompleted: true, isCurrent: false },
        { id: '5-4', reps: 5, weight: 50, isCompleted: true, isCurrent: false },
        { id: '5-5', reps: 5, weight: 60, isCompleted: true, isCurrent: false },
        { id: '5-6', reps: 3, weight: 70, isCompleted: true, isCurrent: false },
      ],
      isCompleted: true,
    },
  ];

  const renderExercise = (exercise: Exercise) => (
    <ExerciseSetTracker
      key={exercise.id}
      exerciseName={exercise.name}
      target={exercise.target}
      sets={exercise.sets}
      showAddButton={!exercise.isCompleted}
      onSetPress={(setId) => {
        // Handle set press - could mark as current or completed
        console.log('Set pressed:', setId);
      }}
      onAddSet={() => {
        // Handle adding a new set
        console.log('Add set for:', exercise.name);
      }}
    />
  );

  return (
    <>
      <Header
        title="Workout B"
        className="bg-secondary"
        showBackButton
        rightComponents={[<Icon name="ChevronDown" size={20} className="text-highlight" />]}
      />

      <ThemedScroller className="flex-1">
        <View className="p-global">
          {/* Workout/Warmup Toggle */}
          <View className="mb-6 flex-row rounded-lg bg-secondary p-1">
            {['workout', 'warmup'].map((mode) => (
              <Pressable
                key={mode}
                onPress={() => setWorkoutMode(mode as any)}
                className={`flex-1 items-center justify-center rounded-md py-2 ${
                  workoutMode === mode ? 'bg-background' : 'bg-transparent'
                }`}>
                <ThemedText
                  className={`text-sm capitalize ${
                    workoutMode === mode ? 'font-medium text-highlight' : 'text-subtext'
                  }`}>
                  {mode}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          {/* Exercises */}
          <View className="mb-6">{exercises.map(renderExercise)}</View>

          {/* Body Weight Input */}
          <View className="mb-6">
            <Input
              label="Body Weight"
              value={bodyWeight}
              onChangeText={setBodyWeight}
              placeholder="Enter body weight"
              className="bg-secondary"
            />
          </View>
        </View>
      </ThemedScroller>

      {/* Bottom Actions */}
      <View className="flex-row justify-between border-t border-border bg-secondary p-global">
        <Button title="Note" variant="ghost" size="medium" className="mr-2 flex-1" />
        <Button title="Edit" variant="ghost" size="medium" className="ml-2 flex-1" />
      </View>
    </>
  );
}
