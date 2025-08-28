import { useFocusEffect } from '@react-navigation/native';
import { useRef, useCallback } from 'react';
import { View, Animated } from 'react-native';

import Icon from './Icon';
import ThemedText from './ThemedText';

import useThemeColors from '@/contexts/ThemeColors';

interface ProgressBarData {
  percentage: number;
  color?: string;
  label?: string;
}

interface SmallProgressBarCardProps {
  title: string;
  subtitle?: string;
  data: ProgressBarData[] | number; // Support single number or array of bars
  barColor?: string;
  backgroundColor?: string;
  value?: string;
  unit?: string;
  height?: number;
  barWidth?: number;
}

export const SmallProgressBarCard = ({
  title,
  subtitle,
  data,
  barColor,
  backgroundColor,
  value,
  unit,
  height = 60,
  barWidth = 6,
}: SmallProgressBarCardProps) => {
  const colors = useThemeColors();

  // Normalize data to array format
  const barsData = Array.isArray(data) ? data : [{ percentage: data, color: barColor }];

  // Animation values for each bar
  const animatedValues = useRef(barsData.map(() => new Animated.Value(0))).current;

  const animateProgress = useCallback(() => {
    // Reset all animations
    animatedValues.forEach((anim) => anim.setValue(0));

    // Animate bars with staggered timing
    const animations = animatedValues.map((anim, index) =>
      Animated.timing(anim, {
        toValue: barsData[index].percentage,
        duration: 1200,
        delay: index * 200,
        useNativeDriver: false,
      })
    );

    Animated.parallel(animations).start();
  }, [animatedValues, barsData]);

  useFocusEffect(
    useCallback(() => {
      animateProgress();
    }, [animateProgress])
  );

  return (
    <View className="min-w-0 rounded-lg bg-secondary p-4">
      <ThemedText className="text-xl font-bold">{title}</ThemedText>
      {subtitle && <ThemedText className="text-sm opacity-50">{subtitle}</ThemedText>}

      {/* Vertical Progress Bars */}
      <View className="mb-2 mt-4 items-center">
        <View className="flex-row items-end justify-center gap-4" style={{ height: height + 20 }}>
          {barsData.map((bar, index) => (
            <View key={index} className="items-center">
              {/* Progress Bar Container */}
              <View
                className="relative overflow-hidden rounded-full bg-background"
                style={{
                  width: barWidth,
                  height,
                  marginHorizontal: 4,
                }}>
                {/* Animated Progress Fill */}
                <Animated.View
                  className="absolute bottom-0 left-0 right-0 rounded-full"
                  style={{
                    backgroundColor: bar.color || barColor || colors.highlight,
                    height: animatedValues[index].interpolate({
                      inputRange: [0, 100],
                      outputRange: [0, height],
                    }),
                  }}
                />
              </View>

              {/* Percentage Text Below Bar */}
              <View className="mt-2 min-h-6 justify-center">
                <ThemedText className="text-center text-xs font-semibold">
                  {Math.round(bar.percentage)}%
                </ThemedText>
                {bar.label && (
                  <ThemedText className="text-center text-xs opacity-60">{bar.label}</ThemedText>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {value && (
        <View className="mt-2 w-full flex-row justify-between border-t border-border pt-4">
          <View className="flex-row items-end">
            <ThemedText className="text-xl font-bold">{value}</ThemedText>
            <ThemedText className="ml-1 -translate-y-1 text-sm opacity-50">{unit}</ThemedText>
          </View>
          <Icon name="ChevronRight" size={20} color={colors.text} />
        </View>
      )}
    </View>
  );
};
