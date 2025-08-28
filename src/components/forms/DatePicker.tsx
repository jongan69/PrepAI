import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Platform, Animated, Pressable } from 'react-native';
import Modal from 'react-native-modal';

import { InputVariant } from './Input';

import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/contexts/ThemeColors';
import { formatToYYYYMMDD } from '@/utils/date';

interface DatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  label?: string;
  placeholder?: string;
  maxDate?: Date;
  minDate?: Date;
  error?: string;
  disabled?: boolean;
  containerClassName?: string;
  variant?: InputVariant;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  placeholder = 'Select date',
  maxDate,
  minDate,
  error,
  disabled = false,
  containerClassName = '',
  variant = 'inline',
}) => {
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(value || new Date());
  const [isFocused, setIsFocused] = useState(false);
  const colors = useThemeColors();
  const animatedLabelValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    if (variant !== 'classic') {
      Animated.timing(animatedLabelValue, {
        toValue: isFocused || value ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  }, [isFocused, value, animatedLabelValue, variant]);

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

  const showDatePicker = () => {
    if (disabled) return;
    setIsFocused(true);
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setIsFocused(false);
    setDatePickerVisible(false);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      hideDatePicker();
      if (selectedDate) {
        onChange(selectedDate);
      }
    } else {
      if (selectedDate) {
        setTempDate(selectedDate);
      }
    }
  };

  const handleConfirm = () => {
    onChange(tempDate);
    hideDatePicker();
  };

  // Helper function to render date picker modal/component
  const renderDatePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <Modal
          isVisible={isDatePickerVisible}
          onBackdropPress={hideDatePicker}
          style={{ margin: 0, justifyContent: 'flex-end' }}>
          <View
            style={{ backgroundColor: colors.bg }}
            className="w-full items-center justify-center rounded-t-xl">
            <View
              style={{ borderBottomColor: colors.border }}
              className="w-full flex-row items-center justify-between border-b p-4">
              <Button
                title="Cancel"
                variant="ghost"
                onPress={hideDatePicker}
                textClassName="text-base font-normal"
              />
              <ThemedText className="text-lg font-medium">{label || 'Select Date'}</ThemedText>
              <Button
                title="Done"
                variant="ghost"
                onPress={handleConfirm}
                textClassName="text-base font-semibold"
              />
            </View>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              maximumDate={maxDate}
              minimumDate={minDate}
              themeVariant={colors.isDark ? 'dark' : 'light'}
              accentColor={colors.highlight}
              style={{ backgroundColor: colors.bg }}
            />
          </View>
        </Modal>
      );
    } else {
      return (
        isDatePickerVisible && (
          <DateTimePicker
            value={value || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={maxDate}
            minimumDate={minDate}
          />
        )
      );
    }
  };

  // Inline variant with label as placeholder (matching TimePicker.tsx exactly)
  if (variant === 'inline') {
    return (
      <View className={`relative mb-global ${containerClassName}`}>
        {label && (
          <ThemedText className="absolute left-3 top-2 mb-2 text-xs font-medium text-text opacity-60">
            {label}
          </ThemedText>
        )}
        <TouchableOpacity
          onPress={showDatePicker}
          disabled={disabled}
          className={`h-16 rounded-lg border border-border bg-border px-3 pr-10 pt-7
            ${isFocused ? 'border-border' : 'border-border/60'}
            ${error ? 'border-red-500' : ''}
            ${disabled ? 'opacity-50' : ''}`}>
          <ThemedText className={value ? 'text-text' : 'text-text opacity-60'}>
            {value ? formatToYYYYMMDD(value) : placeholder}
          </ThemedText>
        </TouchableOpacity>
        <Pressable className="absolute right-3 top-[18px] z-10">
          <Icon name="Calendar" size={20} color={colors.text} />
        </Pressable>
        {error && <ThemedText className="mt-1 text-xs text-red-500">{error}</ThemedText>}
        {renderDatePicker()}
      </View>
    );
  }

  // Classic variant (matching TimePicker.tsx exactly)
  if (variant === 'classic') {
    return (
      <View className={`relative mb-global ${containerClassName}`} style={{ position: 'relative' }}>
        {label && <ThemedText className="mb-2 font-medium">{label}</ThemedText>}
        <View className="relative">
          <TouchableOpacity
            onPress={showDatePicker}
            disabled={disabled}
            className={`h-14 rounded-lg border bg-secondary px-3 pr-10 text-text 
              ${isFocused ? 'border-border' : 'border-border/60'}
              ${error ? 'border-red-500' : ''}
              ${disabled ? 'opacity-50' : ''}`}>
            <View className="flex-1 justify-center">
              <ThemedText className={value ? 'text-text' : 'text-text opacity-60'}>
                {value ? formatToYYYYMMDD(value) : placeholder}
              </ThemedText>
            </View>
          </TouchableOpacity>
          <Pressable className="absolute right-3 top-[18px] z-10">
            <Icon name="Calendar" size={20} color={colors.text} />
          </Pressable>
        </View>
        {error && <ThemedText className="mt-1 text-xs text-red-500">{error}</ThemedText>}
        {renderDatePicker()}
      </View>
    );
  }

  // Underlined variant (matching TimePicker.tsx exactly)
  if (variant === 'underlined') {
    return (
      <View className={`relative mb-global ${containerClassName}`} style={{ position: 'relative' }}>
        <View className="relative">
          <Pressable className="z-40 bg-secondary px-0" onPress={showDatePicker}>
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
            onPress={showDatePicker}
            disabled={disabled}
            className={`h-14 border-b-2 border-l-0 border-r-0 border-t-0 bg-transparent px-0 py-3 pr-10 text-text
              ${isFocused ? 'border-border' : 'border-border'}
              ${error ? 'border-red-500' : ''}
              ${disabled ? 'opacity-50' : ''}`}>
            <View className="flex-1 justify-center">
              <ThemedText className={value ? 'text-text' : 'transparent'}>
                {value ? formatToYYYYMMDD(value) : ''}
              </ThemedText>
            </View>
          </TouchableOpacity>

          <Pressable className="absolute right-0 top-[18px] z-10">
            <Icon name="Calendar" size={20} color={colors.text} />
          </Pressable>
        </View>

        {error && <ThemedText className="mt-1 text-xs text-red-500">{error}</ThemedText>}
        {renderDatePicker()}
      </View>
    );
  }

  // Default animated variant (matching TimePicker.tsx exactly)
  return (
    <View className={`relative mb-8 ${containerClassName}`}>
      <Pressable
        className="z-40 bg-background px-1"
        style={{ position: 'absolute', left: -6, top: 0 }}
        onPress={showDatePicker}>
        <Animated.Text style={[labelStyle]} className="bg-background text-text">
          {label}
        </Animated.Text>
      </Pressable>

      <TouchableOpacity
        onPress={showDatePicker}
        disabled={disabled}
        className={`h-14 rounded-lg border bg-transparent px-3 py-3 pr-10 text-text
          ${isFocused ? 'border-border' : 'border-border'}
          ${error ? 'border-red-500' : ''}
          ${disabled ? 'opacity-50' : ''}`}>
        <View className="flex-1 justify-center">
          <ThemedText className={value ? 'text-text' : 'transparent'}>
            {value ? formatToYYYYMMDD(value) : ''}
          </ThemedText>
        </View>
      </TouchableOpacity>

      <Pressable className="absolute right-3 top-[18px] z-10">
        <Icon name="Calendar" size={20} color={colors.text} />
      </Pressable>

      {error && <ThemedText className="mt-1 text-xs text-red-500">{error}</ThemedText>}
      {renderDatePicker()}
    </View>
  );
};
