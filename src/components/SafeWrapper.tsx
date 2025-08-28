import { usePathname } from 'expo-router';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SafeWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const bypassRoutes = [
    // '/screens/onboarding-start',
    '/modal',
    // '/fullscreen',
    // //'/(drawer)/(tabs)/index',
  ];

  const shouldBypass = bypassRoutes.includes(pathname);

  return (
    <SafeAreaView
      className="dark:bg-dark-primary flex-1 bg-background"
      edges={shouldBypass ? [] : undefined}>
      {children}
    </SafeAreaView>
  );
}
