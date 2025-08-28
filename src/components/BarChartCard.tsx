import { useFocusEffect } from '@react-navigation/native';
import React, { useRef, useCallback } from 'react';
import { View, Animated } from 'react-native';

import ThemedText from './ThemedText';

import useThemeColors from '@/contexts/ThemeColors';

interface BarChartCardProps {
  data: number[];
  labels?: string[];
  yAxisLabels?: number[];
  showYAxis?: boolean;
  showXAxis?: boolean;
  barColor?: string;
  className?: string;
  height?: number;
}

const BarChartCard: React.FC<BarChartCardProps> = ({
  data,
  labels,
  yAxisLabels,
  showYAxis = false,
  showXAxis = false,
  barColor,
  className = '',
  height = 160,
}) => {
  const colors = useThemeColors();
  const chartHeight = height - (showXAxis ? 40 : 10); // Reserve space for X-axis labels

  // Animation values for each bar
  const animatedValues = useRef(data.map(() => new Animated.Value(0))).current;

  // Calculate scaling with fixed 0-100 range
  const minValue = 0; // Always start from 0
  const range = 100; // Fixed range

  // Default Y-axis labels if not provided - use fixed 0-100 scale
  const defaultYLabels = yAxisLabels || [0, 50, 100];

  const startAnimation = useCallback(() => {
    // Reset all bars
    animatedValues.forEach((anim) => anim.setValue(0));

    // Animate bars with staggered timing
    const animations = animatedValues.map((anim, index) =>
      Animated.timing(anim, {
        toValue: 1,
        duration: 500,
        delay: index * 20,
        useNativeDriver: false,
        //easing: Easing.ease,
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
        {showYAxis && (
          <View className="mr-3 justify-between" style={{ height: chartHeight }}>
            {defaultYLabels.reverse().map((value, index) => (
              <ThemedText key={index} className="min-w-6 text-right text-xs opacity-60">
                {value}
              </ThemedText>
            ))}
          </View>
        )}

        {/* Chart Area */}
        <View className="flex-1" style={{ height: chartHeight }}>
          {/* Bars Container */}
          <View className="h-full flex-row items-end justify-between px-0">
            {data.map((value, index) => {
              const heightPercentage = (value - minValue) / range;

              return (
                <View key={index} className="flex-1 items-center ">
                  <Animated.View
                    className="mx-1 rounded-t-md"
                    style={{
                      backgroundColor: barColor || colors.highlight,
                      height: animatedValues[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, heightPercentage * chartHeight * 0.9], // 90% of available height
                      }),
                      minWidth: 8, // Minimum bar width
                      maxWidth: 40, // Maximum bar width
                      width: Math.max(8, Math.min(40, (280 - 100) / data.length - 8)), // Responsive width
                    }}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>

      {/* Bottom Axis - Labels */}
      {showXAxis && labels && (
        <View className="mt-2 flex-row" style={{ marginLeft: showYAxis ? 32 : 0 }}>
          {labels.map((label, index) => (
            <View key={index} className="flex-1 items-center">
              <ThemedText className="text-xs opacity-60">{label}</ThemedText>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default BarChartCard;
