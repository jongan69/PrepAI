import React from 'react';
import { View, Image } from 'react-native';

import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';

export default function WorkoutDetailScreen() {
  return (
    <>
      <Header
        showBackButton
        className="bg-secondary"
        rightComponents={[<Icon name="Share2" />]}
      />
      <ThemedScroller className="!px-0">
        <View className="bg-secondary p-global pt-0">
          <Image
            style={{ objectFit: 'cover' }}
            source={require('@/assets/img/muscles.png')}
            className="h-72 w-full "
          />
          <ThemedText className="text-2xl font-bold">Strength training</ThemedText>
          <ThemedText className="text-sm opacity-50">June 23, 2025</ThemedText>
          <View className="my-global border-y border-border py-global">
            <View>
              <ThemedText className="text-3xl font-bold ">45 min</ThemedText>
              <ThemedText className="text-sm opacity-50">Total time</ThemedText>
            </View>
          </View>
          <View className="w-full flex-row items-center">
            <View className="flex-1">
              <View className="flex-row items-center">
                <Icon
                  name="Heart"
                  size={15}
                />
                <ThemedText className="ml-2 text-xl font-bold">104 bpm</ThemedText>
              </View>
              <ThemedText className="text-sm opacity-50">Avg HR</ThemedText>
            </View>
            <View className="flex-1">
              <View className="flex-row items-center">
                <Icon
                  name="Flame"
                  size={15}
                />
                <ThemedText className="ml-2 text-xl font-bold">241</ThemedText>
              </View>
              <ThemedText className="text-sm opacity-50">Total calories</ThemedText>
            </View>
          </View>
        </View>
        <WorkoutTable />
      </ThemedScroller>
    </>
  );
}

const WorkoutTable = () => {
  const workoutData = [
    { set: 1, name: 'Bench Press', time: '2:30', reps: 12, weight: '80kg' },
    { set: 2, name: 'Bench Press', time: '2:45', reps: 10, weight: '85kg' },
    { set: 3, name: 'Bench Press', time: '3:00', reps: 8, weight: '90kg' },
    { set: 4, name: 'Incline Press', time: '2:20', reps: 12, weight: '70kg' },
    { set: 5, name: 'Incline Press', time: '2:35', reps: 10, weight: '75kg' },
    { set: 6, name: 'Dumbbell Flyes', time: '1:45', reps: 15, weight: '25kg' },
  ];

  return (
    <View className="mt-global overflow-hidden rounded-lg bg-secondary">
      {/* Header */}
      <View className="dark:bg-dark-primary flex-row bg-background px-4 py-3">
        <ThemedText className="w-10 text-xs font-semibold opacity-60">SET</ThemedText>
        <ThemedText className="flex-1 text-xs font-semibold opacity-60">EXERCISE</ThemedText>
        <ThemedText className="flex-1 text-center text-xs font-semibold opacity-60">TIME</ThemedText>
        <ThemedText className="flex-1 text-center text-xs font-semibold opacity-60">REPS</ThemedText>
        <ThemedText className="flex-1 text-right text-xs font-semibold opacity-60">WEIGHT</ThemedText>
      </View>

      {/* Rows */}
      {workoutData.map((item, index) => (
        <View
          key={index}
          className={`flex-row px-4 py-4 ${index % 2 === 0 ? 'bg-secondary' : 'dark:bg-dark-primary bg-background'}`}>
          <ThemedText className="w-10 text-base font-medium">{item.set}</ThemedText>
          <ThemedText className="flex-1 text-base">{item.name}</ThemedText>
          <ThemedText className="flex-1 text-center text-base">{item.time}</ThemedText>
          <ThemedText className="flex-1 text-center text-base">{item.reps}</ThemedText>
          <ThemedText className="flex-1 text-right text-base font-medium">{item.weight}</ThemedText>
        </View>
      ))}
    </View>
  );
};
