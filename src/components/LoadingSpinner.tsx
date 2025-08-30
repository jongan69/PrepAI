import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import ThemedText from './ThemedText';
import Icon from './Icon';
import { useThemeColors } from '@/contexts/ThemeColors';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
}

export default function LoadingSpinner({ message = 'Loading...', size = 'large' }: LoadingSpinnerProps) {
  const colors = useThemeColors();

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Icon
        name="Zap"
        size={48}
        color={colors.highlight}
      />
      <ActivityIndicator
        size={size}
        color={colors.highlight}
        className="mt-4"
      />
      <ThemedText className="mt-4 text-xl font-bold text-white">{message}</ThemedText>
    </View>
  );
}
