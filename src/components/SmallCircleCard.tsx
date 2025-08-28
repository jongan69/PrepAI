import { useFocusEffect } from '@react-navigation/native';
import { useRef, useCallback } from 'react';
import { View, Animated } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import Icon from './Icon';
import ThemedText from './ThemedText';

import useThemeColors from '@/contexts/ThemeColors';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface SmallCircleCardProps {
  title: string;
  subtitle?: string;
  percentage: number; // 0-100 percentage
  circleColor?: string;
  backgroundColor?: string;
  value?: string;
  unit?: string;
  size?: number;
}

export const SmallCircleCard = ({
  title,
  subtitle,
  percentage,
  circleColor,
  backgroundColor,
  value,
  unit,
  size = 80,
}: SmallCircleCardProps) => {
  const colors = useThemeColors();

  // Animation
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Circle calculations
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const animateProgress = useCallback(() => {
    animatedValue.setValue(0);

    Animated.timing(animatedValue, {
      toValue: percentage,
      duration: 1500,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, percentage]);

  useFocusEffect(
    useCallback(() => {
      animateProgress();
    }, [animateProgress])
  );

  return (
    <View className="min-w-0 rounded-lg bg-secondary p-4">
      <ThemedText className="text-xl font-bold">{title}</ThemedText>
      {subtitle && <ThemedText className="text-sm opacity-50">{subtitle}</ThemedText>}

      {/* Circle Progress Chart */}
      <View className="mb-2 mt-4 items-center">
        <View
          className="relative items-center justify-center"
          style={{ width: size, height: size }}>
          <Svg width={size} height={size} style={{ position: 'absolute' }}>
            {/* Background circle */}
            <Circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={colors.invert}
              strokeWidth={strokeWidth}
              fill="transparent"
              opacity={0.2}
            />
            {/* Animated progress circle */}
            <AnimatedCircle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              stroke={circleColor || colors.highlight}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={animatedValue.interpolate({
                inputRange: [0, 100],
                outputRange: [circumference, 0],
              })}
              strokeLinecap="round"
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          </Svg>

          {/* Centered percentage text */}
          <View className="absolute items-center">
            <ThemedText className="text-lg font-bold">{Math.round(percentage)}%</ThemedText>
          </View>
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
