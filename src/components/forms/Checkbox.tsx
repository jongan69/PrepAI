import React from 'react';
import { View, Pressable } from 'react-native';

import Icon from '../Icon';
import ThemedText from '../ThemedText';

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  error?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked = false, onChange, error, className = '' }) => {
  // Internal state if no onChange provided (for mockups)
  const [internalChecked, setInternalChecked] = React.useState(checked);

  // Use either the controlled prop or internal state
  const isChecked = onChange ? checked : internalChecked;

  const handlePress = () => {
    if (onChange) {
      onChange(!isChecked);
    } else {
      setInternalChecked(!internalChecked);
    }
  };

  return (
    <View className={`mb-global ${className}`}>
      <Pressable
        onPress={handlePress}
        className="flex-row items-center">
        <View
          className={`
          flex h-6 w-6 items-center justify-center rounded border
          ${isChecked ? 'bg-highlight' : 'border-border'}
          ${error ? 'border-red-500' : ''}
        `}>
          {isChecked && (
            <View className="h-full w-full items-center justify-center rounded border-[2px] border-border bg-highlight">
              <Icon
                name="Check"
                size={14}
                color="#fff"
              />
            </View>
          )}
        </View>
        <ThemedText className="ml-2">{label}</ThemedText>
      </Pressable>

      {error && <ThemedText className="mt-1 text-xs text-red-500">{error}</ThemedText>}
    </View>
  );
};

export default Checkbox;
