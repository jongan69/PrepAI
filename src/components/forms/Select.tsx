import * as NavigationBar from 'expo-navigation-bar';
import React, { useRef, useState, useEffect } from 'react';
import { View, TouchableOpacity, Pressable, Animated, Platform, ViewStyle } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import { InputVariant } from './Input';

import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/contexts/ThemeColors';
import { useTheme } from '@/contexts/ThemeContext';

interface SelectOption {
  label: string;
  value: string | number;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  error?: string;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  style?: ViewStyle;
  variant?: InputVariant;
}

const Select: React.FC<SelectProps> = ({
  label,
  placeholder = 'Select option',
  options,
  value,
  onChange,
  error,
  disabled = false,
  className = '',
  containerClassName = '',
  style,
  variant = 'inline',
}) => {
  const { theme } = useTheme();
  const colors = useThemeColors();
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(
    options.find((option) => option.value === value)
  );

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(colors.bg);
      NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');

      return () => {
        NavigationBar.setBackgroundColorAsync(colors.bg);
        NavigationBar.setButtonStyleAsync(theme === 'dark' ? 'light' : 'dark');
      };
    }
  }, [theme, colors.bg]);

  const animatedLabelValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    if (variant !== 'classic') {
      Animated.timing(animatedLabelValue, {
        toValue: isFocused || selectedOption ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocused, selectedOption, animatedLabelValue, variant]);

  const labelStyle = {
    top: animatedLabelValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, -8],
    }),
    fontSize: animatedLabelValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedLabelValue.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.placeholder, colors.text],
    }),
    left: 12,
    paddingHorizontal: 8,
    position: 'absolute' as 'absolute',
    zIndex: 50,
    backgroundColor: colors.bg,
  };

  const handleSelect = (option: SelectOption) => {
    setSelectedOption(option);
    onChange(option.value);
    actionSheetRef.current?.hide();
  };

  const handlePress = () => {
    if (disabled) return;
    setIsFocused(true);
    actionSheetRef.current?.show();
  };

  const handleClose = () => {
    setIsFocused(false);
  };

  // Render the action sheet
  const renderActionSheet = () => (
    <ActionSheet
      ref={actionSheetRef}
      onClose={handleClose}
      isModal
      enableGesturesInScrollView
      statusBarTranslucent
      drawUnderStatusBar={false}
      containerStyle={{
        backgroundColor: colors.bg,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      animated
      openAnimationConfig={{
        stiffness: 3000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      }}
      closeAnimationConfig={{
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      }}>
      <View className="p-4">
        {options.map((option) => (
          <Pressable
            key={option.value}
            onPress={() => handleSelect(option)}
            className={`mb-2 rounded-lg px-4 py-3 ${selectedOption?.value === option.value ? 'bg-secondary' : ''}`}>
            <ThemedText>{option.label}</ThemedText>
          </Pressable>
        ))}
      </View>
    </ActionSheet>
  );

  if (variant === 'inline') {
    return (
      <View className={`relative mb-global ${containerClassName}`} style={style}>
        {label && (
          <ThemedText className="absolute left-3 top-2 mb-2 text-xs font-medium text-text opacity-60">
            {label}
          </ThemedText>
        )}
        <TouchableOpacity
          onPress={handlePress}
          disabled={disabled}
          className={`h-16 flex-row items-center justify-between rounded-lg border border-border bg-border px-3 pt-3
                        ${isFocused ? 'border-border' : 'border-border/60'}
                        ${error ? 'border-red-500' : ''}
                        ${disabled ? 'opacity-50' : ''}
                        ${className}`}>
          <ThemedText className={selectedOption ? 'text-text' : 'text-text opacity-60'}>
            {selectedOption ? selectedOption.label : placeholder}
          </ThemedText>
          <Icon name="ChevronDown" size={20} color={colors.text} className="-translate-y-1" />
        </TouchableOpacity>
        {error && <ThemedText className="mt-1 text-xs text-red-500">{error}</ThemedText>}
        {renderActionSheet()}
      </View>
    );
  }

  if (variant === 'classic') {
    return (
      <View
        className={`relative mb-global ${containerClassName}`}
        style={{ position: 'relative', ...style }}>
        {label && <ThemedText className="mb-2 font-medium">{label}</ThemedText>}
        <View className="relative">
          <TouchableOpacity
            onPress={handlePress}
            disabled={disabled}
            className={`h-14 flex-row items-center justify-between rounded-lg  border bg-secondary px-3 text-text
                            ${isFocused ? 'border-border' : 'border-border/60'}
                            ${error ? 'border-red-500' : ''}
                            ${disabled ? 'opacity-50' : ''}
                            ${className}`}>
            <ThemedText className={selectedOption ? 'text-text' : 'text-text opacity-60'}>
              {selectedOption ? selectedOption.label : placeholder}
            </ThemedText>
            <Icon name="ChevronDown" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
        {error && <ThemedText className="mt-1 text-xs text-red-500">{error}</ThemedText>}
        {renderActionSheet()}
      </View>
    );
  }

  if (variant === 'underlined') {
    return (
      <View
        className={`relative mb-global ${containerClassName}`}
        style={{ position: 'relative', ...style }}>
        <View className="relative">
          <Pressable className="z-40 bg-secondary px-0" onPress={handlePress}>
            <Animated.Text
              style={[
                {
                  top: animatedLabelValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, -8],
                  }),
                  fontSize: animatedLabelValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 12],
                  }),
                  color: animatedLabelValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [colors.placeholder, colors.text],
                  }),
                  left: 0,
                  paddingHorizontal: 0,
                  position: 'absolute',
                  zIndex: 50,
                  backgroundColor: colors.bg,
                },
              ]}
              className="text-black dark:text-white">
              {label}
            </Animated.Text>
          </Pressable>

          <TouchableOpacity
            onPress={handlePress}
            disabled={disabled}
            className={`h-14 flex-row items-center justify-between border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-3 pr-10 text-text
                            ${isFocused ? 'border-border' : 'border-border'}
                            ${error ? 'border-red-500' : ''}
                            ${disabled ? 'opacity-50' : ''}
                            ${className}`}>
            <ThemedText className={selectedOption ? 'text-text' : 'transparent'}>
              {selectedOption ? selectedOption.label : ''}
            </ThemedText>
            <Icon name="ChevronDown" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>

        {error && <ThemedText className="mt-1 text-xs text-red-500">{error}</ThemedText>}
        {renderActionSheet()}
      </View>
    );
  }

  return (
    <View className={`relative mb-8 ${containerClassName}`} style={style}>
      <Pressable
        className="z-40 bg-background px-1"
        style={{ position: 'absolute', left: -6, top: 0 }}
        onPress={handlePress}>
        <Animated.Text style={[labelStyle]} className="bg-background text-text">
          {label}
        </Animated.Text>
      </Pressable>

      <TouchableOpacity
        onPress={handlePress}
        disabled={disabled}
        className={`h-14 flex-row items-center justify-between rounded-lg border bg-transparent px-3 py-3 text-text
                    ${isFocused ? 'border-border' : 'border-border'}
                    ${error ? 'border-red-500' : ''}
                    ${disabled ? 'opacity-50' : ''}
                    ${className}`}>
        <ThemedText className={selectedOption ? 'text-text' : 'transparent'}>
          {selectedOption ? selectedOption.label : ''}
        </ThemedText>
        <Icon name="ChevronDown" size={20} color={colors.text} />
      </TouchableOpacity>

      {error && <ThemedText className="mt-1 text-xs text-red-500">{error}</ThemedText>}
      {renderActionSheet()}
    </View>
  );
};

export default Select;
