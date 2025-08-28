import React from 'react';
import { ScrollView, ScrollViewProps, View } from 'react-native';

interface ThemedScrollerProps extends ScrollViewProps {
  className?: string;
  children: React.ReactNode;
}

export default function ThemedScroller({
  className = '',
  children,
  contentContainerStyle,
  ...props
}: ThemedScrollerProps) {
  return (
    <ScrollView
      className={`bg-background px-global ${className}`}
      bounces={false}
      contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      showsVerticalScrollIndicator={false}
      {...props}>
      {children}
      <View className="h-24 " />
    </ScrollView>
  );
}
