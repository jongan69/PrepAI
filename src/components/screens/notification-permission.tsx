import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';

export default function NotificationPermissionScreen() {
  const handleSkip = () => {
    router.replace('/screens/location-permission');
  };

  return (
    <View className="dark:bg-dark-primary flex-1 bg-background p-6">
      <View className="flex-1 items-center justify-center">
        <Icon
          name="BellDot"
          size={80}
          strokeWidth={0.7}
        />
        <ThemedText className="mb-4 mt-8 text-center text-3xl font-bold">Enable Notifications</ThemedText>
        <ThemedText className="text-light-subtext dark:text-dark-subtext mb-12 text-center">
          Stay updated with property alerts, messages, and important updates
        </ThemedText>
      </View>

      <View className="gap-1">
        <Button
          title="Allow Notifications"
          size="large"
        />
        <Button
          title="Skip for Now"
          onPress={handleSkip}
          variant="ghost"
          size="large"
        />
      </View>
    </View>
  );
}
