// import * as Location from 'expo-location';
import { router } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';

export default function LocationPermissionScreen() {
  const handleAllowLocation = async () => {
    // Location permission logic would go here
    // For now, just navigate to main app
    router.push('/(mobile)/(index)');
  };

  const handleSkip = () => {
    router.push('/(mobile)/(index)');
  };

  return (
    <View className="dark:bg-dark-primary flex-1 bg-background p-6">
      <View className="flex-1 items-center justify-center">
        <Icon
          name="MapPinned"
          size={80}
          strokeWidth={0.7}
        />
        <ThemedText className="mb-4 mt-8 text-center text-3xl font-bold">Enable Location</ThemedText>
        <ThemedText className="text-light-subtext dark:text-dark-subtext mb-12 text-center">
          Allow access to your location to find nearby properties and get accurate recommendations
        </ThemedText>
      </View>

      <View className="gap-4">
        <Button
          title="Allow Location Access"
          onPress={handleAllowLocation}
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
