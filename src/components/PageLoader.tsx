import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import ThemedText from './ThemedText';

import useThemeColors from '@/contexts/ThemeColors';

interface PageLoaderProps {
  text?: string;
}

export default function PageLoader({ text }: PageLoaderProps) {
  const colors = useThemeColors();

  return (
    <View className="dark:bg-dark-primary flex-1 items-center justify-center bg-background">
      <ActivityIndicator size="large" color={colors.highlight} />
      {text && (
        <ThemedText className="text-light-subtext dark:text-dark-subtext mt-4">{text}</ThemedText>
      )}
    </View>
  );
}
