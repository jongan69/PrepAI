import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import { useDatabase } from '@/contexts/DatabaseProvider';

export default function OnboardingLoading() {
  const insets = useSafeAreaInsets();
  useDatabase();

  return (
    <View
      className="flex-1 items-center justify-center bg-background"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}>
      <View className="items-center">
        <Icon
          name="Brain"
          size={64}
          className="mb-6"
        />
        <ThemedText className="mb-2 text-center text-2xl font-bold">PrepAI</ThemedText>
        <ThemedText className="text-text/60 mb-8 text-center text-base">
          Loading your personalized experience...
        </ThemedText>
      </View>
    </View>
  );
}
