import React from 'react';
import { View, ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ThemeFooterProps extends ViewProps {
  children: React.ReactNode;
}

export default function ThemedFooter({ children, className, ...props }: ThemeFooterProps) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className={`dark:bg-dark-primary w-full bg-background px-global pt-global  ${className || ''}`}
      {...props}>
      {children}
    </View>
  );
}
