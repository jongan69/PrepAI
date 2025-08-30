import { ClerkProvider } from '@clerk/clerk-expo';
import { tokenCache } from '@clerk/clerk-expo/token-cache';
import { Slot, Stack } from 'expo-router';
import React from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';

import { SyncInitializer } from '@/components/SyncInitializer';
import { DatabaseProvider } from '@/contexts/DatabaseProvider';
import { MoneyModelProvider } from '@/contexts/MoneyModelContext';
import useThemeColors from '@/contexts/ThemeColors';
import { ThemeProvider } from '@/contexts/ThemeContext';

// You'll need to replace this with your actual Clerk publishable key
const CLERK_PUBLISHABLE_KEY =
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_your-clerk-publishable-key-here';

export default function RootLayout() {
  const colors = useThemeColors();

  // For web platform, render the web layout
  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <Slot />
      </SafeAreaView>
    );
  }

  // For mobile platforms (iOS/Android), always render the mobile layout
  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}>
      <GestureHandlerRootView
        className={`bg-background  ${Platform.OS === 'ios' ? 'pb-0 ' : ''}`}
        style={{ flex: 1 }}>
        <ThemeProvider>
          <DatabaseProvider>
            <MoneyModelProvider>
              <SyncInitializer>
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.bg },
                  }}>
                  <Stack.Screen name="(mobile)" />
                </Stack>
                <Toast />
              </SyncInitializer>
            </MoneyModelProvider>
          </DatabaseProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  keyboardView: {
    flex: 1,
  },
});
