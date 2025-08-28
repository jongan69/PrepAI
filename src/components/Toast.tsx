import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

import useThemeColors from '@/contexts/ThemeColors';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onHide?: () => void;
  isVisible: boolean;
}

const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onHide,
  isVisible,
}) => {
  const colors = useThemeColors();
  const translateY = useRef(new Animated.Value(-100)).current;

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return '#4CAF50';
      case 'error':
        return '#F44336';
      case 'warning':
        return '#FFC107';
      default:
        return '#2196F3';
    }
  };

  useEffect(() => {
    if (isVisible) {
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.delay(duration),
        Animated.timing(translateY, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        if (onHide) {
          onHide();
        }
      });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <Animated.View
      className="p-6"
      style={[
        styles.container,
        {
          transform: [{ translateY }],
          shadowColor: colors.text,
        },
      ]}>
      <View className="bg-dark-primary dark:bg-light-primary flex-row items-center justify-center rounded-xl py-6">
        <View
          className="mr-2 h-2 w-2 rounded-full"
          style={{ backgroundColor: getBackgroundColor() }}
        />
        <Text className="dark:text-dark-primary text-white">{message}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 99999999,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default Toast;
