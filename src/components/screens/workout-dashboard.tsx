import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import { useClerkUser } from '@/hooks/useClerkUser';

interface WorkoutCard {
  id: string;
  name: string;
  date: string;
  exercises: Exercise[];
  isCompleted: boolean;
}

interface Exercise {
  name: string;
  sets: string;
}

export default function StrongLiftsDashboardScreen() {
  const { imageUrl, displayName } = useClerkUser();
  const workoutCards: WorkoutCard[] = [
    {
      id: '1',
      name: 'Workout B',
      date: 'Today, Aug 23',
      isCompleted: true,
      exercises: [
        { name: 'Squat', sets: '5x45, 5x65, 2x5 75lb' },
        { name: 'Incl BP', sets: '4x5 45lb' },
        { name: 'Deadlift', sets: '4x5 55lb' },
      ],
    },
    {
      id: '2',
      name: 'Workout C',
      date: 'Mon, Aug 25',
      isCompleted: false,
      exercises: [
        { name: 'Squat', sets: '5x55, 5x65, 5x75, 5x85, 3x100, 8x75lb' },
        { name: 'Bench', sets: '5x75, 5x85, 5x105, 5x125, 3x140, 8x105lb' },
        { name: 'BB Row', sets: '5x55, 5x75, 5x85, 5x95, 3x110, 8x85lb' },
      ],
    },
  ];

  const renderWorkoutCard = (workout: WorkoutCard) => (
    <Card
      key={workout.id}
      className="mb-4"
      title={workout.name}
      image={require('@/assets/img/muscles.png')}>
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="mb-2 flex-row items-center justify-between">
            <ThemedText className="text-lg font-semibold">{workout.name}</ThemedText>
            <ThemedText className="text-subtext text-sm">{workout.date}</ThemedText>
          </View>

          {workout.exercises.map((exercise, index) => (
            <View key={index} className="mb-1">
              <ThemedText className="text-subtext text-sm">
                {exercise.name}: {exercise.sets}
              </ThemedText>
            </View>
          ))}

          <ThemedText className="text-subtext mt-1 text-sm">+2 exercises</ThemedText>
        </View>

        <View className="ml-4 h-2 w-1 rounded-full bg-highlight" />
      </View>
    </Card>
  );

  return (
    <>
      <Header
        title="STRONGLIFTS"
        className="bg-secondary"
        leftComponent={
          <Avatar
            src={imageUrl}
            name={displayName}
            size="sm"
            link="/(mobile)/(drawer)/(profile)/index"
          />
        }
        rightComponents={[
          <Icon
            name="Settings"
            size={24}
            href="/screens/settings"
            className="text-light-text dark:text-dark-text"
          />,
        ]}
      />

      <ThemedScroller className="flex-1">
        <View className="p-global">
          {/* Welcome Card */}
          <Card className="mb-6" title="Welcome Back!" image={require('@/assets/img/muscles.png')}>
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <ThemedText className="mb-2 text-xl font-bold">Welcome Back!</ThemedText>
                <ThemedText className="text-subtext text-sm">
                  Last workout 1 week ago. Deload to avoid soreness.
                </ThemedText>
              </View>
              <Button title="Deload" variant="primary" size="small" className="ml-4" />
            </View>
          </Card>

          {/* Workout Cards */}
          {workoutCards.map(renderWorkoutCard)}

          {/* Start Workout Card */}
          <Card className="mb-6" title="Start Workout" image={require('@/assets/img/muscles.png')}>
            <View className="flex-row items-start justify-between">
              <View className="flex-1">
                <ThemedText className="mb-2 text-xl font-bold">Start Workout</ThemedText>
                <ThemedText className="text-subtext text-sm">
                  Finish in 67min at 11:35 PM
                </ThemedText>
              </View>
              <Link asChild href="/(mobile)/(workout)/stronglifts-workout">
                <Button title="Start" variant="primary" size="small" className="ml-4" />
              </Link>
            </View>
          </Card>
        </View>
      </ThemedScroller>
    </>
  );
}
