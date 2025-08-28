import React, { useState, useRef } from 'react';
import { View, Pressable, Animated } from 'react-native';

interface ToggleProps {
  value?: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({ value, onChange, disabled = false, className = '' }) => {
  const [isActive, setIsActive] = useState(value ?? false);
  const slideAnim = useRef(new Animated.Value((value ?? false) ? 1 : 0)).current;

  // Handle controlled and uncontrolled modes
  const isControlled = value !== undefined;
  const isOn = isControlled ? value : isActive;

  const toggleSwitch = () => {
    if (disabled) return;

    const newValue = !isOn;
    if (!isControlled) {
      setIsActive(newValue);
    }
    onChange?.(newValue);

    Animated.spring(slideAnim, {
      toValue: newValue ? 1 : 0,
      useNativeDriver: true,
      bounciness: 4,
      speed: 12,
    }).start();
  };

  return (
    <Pressable
      onPress={toggleSwitch}
      className={`h-7 w-12 rounded-full ${disabled ? 'opacity-50' : ''} ${className}`}>
      <View
        className={`absolute h-full w-full rounded-full ${isOn ? 'bg-highlight' : 'dark:bg-dark-secondary  bg-secondary'}`}
      />
      <Animated.View
        style={{
          transform: [
            {
              translateX: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [2, 21],
              }),
            },
          ],
        }}
        className="my-0.5 h-6 w-6 rounded-full bg-white shadow-sm"
      />
    </Pressable>
  );
};

export default Toggle;
