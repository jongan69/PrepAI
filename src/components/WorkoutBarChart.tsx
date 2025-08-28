import { useFocusEffect } from '@react-navigation/native';
import React, { useRef, useCallback } from 'react';
import { View, Animated } from 'react-native';

import ThemedText from './ThemedText';

interface WorkoutBarChartProps {
  className?: string;
}

const WorkoutBarChart: React.FC<WorkoutBarChartProps> = ({ className = '' }) => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  // Mock workout durations in minutes
  const workoutDurations = [60, 40, 0, 45, 0, 60, 0];
  const maxDuration = 60; // Max for scaling - should match y-axis maximum
  const yAxisValues = [0, 30, 60]; // Y-axis time values

  const animatedValues = useRef(days.map(() => new Animated.Value(0))).current;

  const startAnimation = useCallback(() => {
    // Reset all bars
    animatedValues.forEach((anim) => anim.setValue(0));

    // Animate bars with staggered timing
    const animations = animatedValues.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: false,
      })
    );

    Animated.parallel(animations).start();
  }, [animatedValues]);

  useFocusEffect(
    useCallback(() => {
      startAnimation();
    }, [startAnimation])
  );

  return (
    <View className={className}>
      <View className="flex-row">
        {/* Y-Axis Labels */}
        <View className=" mr-2 h-40 justify-between">
          {yAxisValues.reverse().map((value, index) => (
            <ThemedText
              key={index}
              className="text-light-subtext dark:text-dark-subtext text-right text-xs">
              {value}
            </ThemedText>
          ))}
        </View>

        {/* Chart Area with Grid */}
        <View className="relative h-40 flex-1">
          {/* Horizontal Grid Lines */}
          {yAxisValues.map((_, index) => (
            <View
              key={index}
              className="absolute h-px w-full bg-border"
              style={{ bottom: (index * 140) / (yAxisValues.length - 1) }}
            />
          ))}

          {/* Bars Container */}
          <View className="h-full flex-row items-end gap-4 px-2">
            {days.map((day, index) => {
              const duration = workoutDurations[index];
              const heightPercentage = duration / maxDuration;

              return (
                <View key={index} className="relative flex-1 items-center">
                  {/* Vertical Grid Line */}
                  <View className="absolute bottom-0 h-40 w-px bg-transparent" />

                  <Animated.View
                    className={`w-full max-w-10 rounded-t-md ${
                      duration > 0 ? 'bg-sky-500' : 'bg-background'
                    }`}
                    style={{
                      height: animatedValues[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, heightPercentage * 140], // Match container height
                      }),
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* Bottom Axis - Days */}
      <View className="mt-2 flex-row gap-2 px-2 pl-8">
        {days.map((day, index) => (
          <View key={index} className="flex-1 flex-row items-center justify-center">
            <ThemedText className="mx-auto text-xs">{day}</ThemedText>
          </View>
        ))}
      </View>
    </View>
  );
};

export default WorkoutBarChart;
