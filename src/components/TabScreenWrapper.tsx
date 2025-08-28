import { useIsFocused } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

import AnimatedView from './AnimatedView';
import type { AnimationType } from './AnimatedView';

interface TabScreenWrapperProps {
  children: React.ReactNode;
  animation?: AnimationType;
  duration?: number;
  delay?: number;
  className?: string;
}

export default function TabScreenWrapper({
  children,
  animation = 'fadeIn',
  duration = 300,
  delay = 0,
  className,
}: TabScreenWrapperProps) {
  const isFocused = useIsFocused();
  const [key, setKey] = React.useState(0);

  React.useEffect(() => {
    if (isFocused) {
      setKey((prev) => prev + 1);
    }
  }, [isFocused]);

  return (
    <View className="dark:bg-dark-primary flex-1 bg-background">
      <AnimatedView
        style={{ flex: 1 }}
        key={key}
        animation={animation}
        duration={duration}
        delay={delay}
        className={className}>
        {children}
      </AnimatedView>
    </View>
  );
}
