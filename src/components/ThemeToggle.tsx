import Feather from '@expo/vector-icons/Feather';
import { useEffect } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { useTheme } from '@/contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const translateX = useSharedValue(isDark ? 36 : 3.5);

  useEffect(() => {
    translateX.value = withSpring(isDark ? 36 : 3.5, {
      damping: 15,
      stiffness: 150,
    });
  }, [isDark]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Pressable
      onPress={toggleTheme}
      className="relative h-10 w-20 flex-row items-center justify-between rounded-full bg-secondary p-1">
      <Icon icon="sun" />
      <Icon icon="moon" />
      <Animated.View
        style={[animatedStyle]}
        className="absolute flex h-9 w-9 flex-row items-center justify-center rounded-full bg-background"
      />
    </Pressable>
  );
};

const Icon = (props: any) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View className="relative z-50 flex h-9 w-9 flex-row items-center justify-center rounded-full">
      <Feather name={props.icon} size={16} color={`${isDark ? 'white' : 'black'}`} />
    </View>
  );
};

export default ThemeToggle;
