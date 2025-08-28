import React from 'react';
import { View } from 'react-native';

import ThemedText from './ThemedText';

interface WorkoutStreakProps {
  className?: string;
}

const WorkoutStreak: React.FC<WorkoutStreakProps> = ({ className = '' }) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Simple mock data
  const workoutData = [
    [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
    [0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
    [0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  ];

  return (
    <View className={className}>
      {days.map((day, dayIndex) => (
        <View key={dayIndex} className="mb-1 flex-row items-center">
          <ThemedText className="text-light-subtext dark:text-dark-subtext mr-3 w-4 text-xs">
            {day}
          </ThemedText>
          <View className="flex-row gap-3">
            {workoutData[dayIndex].map((completed, weekIndex) => (
              <View
                key={weekIndex}
                className={`h-2.5 w-2.5 rounded-full ${
                  completed ? 'bg-sky-500' : 'dark:bg-dark-secondary bg-gray-200'
                }`}
              />
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default WorkoutStreak;
