import React, { useState, useRef } from 'react';
import { View, Animated, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';

import Icon, { IconName } from '../Icon';
import ThemedText from '../ThemedText';

import useThemeColors from '@/contexts/ThemeColors';

interface SwitchProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  label?: string;
  description?: string;
  icon?: IconName;
  disabled?: boolean;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

const Switch: React.FC<SwitchProps> = ({
  value,
  onChange,
  label,
  description,
  icon,
  disabled = false,
  className = '',
  style,
}) => {
  const colors = useThemeColors();
  const [isOn, setIsOn] = useState(value ?? false);
  const slideAnim = useRef(new Animated.Value((value ?? false) ? 1 : 0)).current;

  // Handle controlled vs uncontrolled state
  const isControlled = value !== undefined;
  const switchValue = isControlled ? value : isOn;

  const toggleSwitch = () => {
    if (disabled) return;

    const newValue = !switchValue;

    // Update internal state if uncontrolled
    if (!isControlled) {
      setIsOn(newValue);
    }

    // Call callback if provided
    onChange?.(newValue);

    // Animate the switch
    Animated.spring(slideAnim, {
      toValue: newValue ? 1 : 0,
      useNativeDriver: true,
      bounciness: 4,
      speed: 12,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={toggleSwitch}
      disabled={disabled}
      className={`flex-row items-center py-1 ${disabled ? 'opacity-100' : ''} ${className}`}
      style={style}>
      {icon && (
        <View className="mr-3">
          <Icon name={icon} size={20} color={colors.text} />
        </View>
      )}

      <View className="flex-1">
        {label && <ThemedText className="text-base font-medium">{label}</ThemedText>}
        {description && (
          <ThemedText className="text-sm text-text opacity-60">{description}</ThemedText>
        )}
      </View>

      <View className="h-6 w-10 rounded-full">
        <View
          className={`absolute h-full w-full rounded-full ${switchValue ? 'bg-highlight' : 'bg-secondary'}`}
        />
        <Animated.View
          style={{
            transform: [
              {
                translateX: slideAnim.interpolate({
                  inputRange: [0, 1.2],
                  outputRange: [1, 21],
                }),
              },
            ],
          }}
          className="my-0.5 h-5 w-5 rounded-full bg-secondary shadow-sm"
        />
      </View>
    </TouchableOpacity>
  );
};

export default Switch;
