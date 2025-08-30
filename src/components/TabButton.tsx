import { TabTriggerSlotProps } from 'expo-router/ui';
import { forwardRef, useEffect, useState, ReactNode } from 'react';
import { Text, Pressable, View, Animated } from 'react-native';

import Avatar from './Avatar';
import ThemedText from './ThemedText';

import Icon, { IconName } from '@/components/Icon';
import { useThemeColors } from '@/contexts/ThemeColors';

export type TabButtonProps = TabTriggerSlotProps & {
  icon?: IconName;
  avatar?: string;
  customContent?: ReactNode;
  labelAnimated?: boolean;
  hasBadge?: boolean;
};

export const TabButton = forwardRef<View, TabButtonProps>(function TabButton(
  { icon, avatar, children, isFocused, onPress, customContent, labelAnimated = true, hasBadge = false, ...props },
  ref
) {
  const colors = useThemeColors();

  // Use Animated Values to control opacity and translateY
  const [labelOpacity] = useState(new Animated.Value(isFocused ? 1 : 0));
  const [labelMarginBottom] = useState(new Animated.Value(isFocused ? 0 : 10));
  const [lineScale] = useState(new Animated.Value(isFocused ? 0 : 10));

  // Animate opacity and translation when the tab becomes focused or unfocused
  useEffect(() => {
    Animated.parallel([
      Animated.timing(labelOpacity, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(labelMarginBottom, {
        toValue: isFocused ? 0 : 10,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(lineScale, {
        toValue: isFocused ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isFocused, labelOpacity, labelMarginBottom, lineScale]);

  // Render icon or custom content
  const renderContent = () => {
    if (customContent) {
      return customContent;
    }

    if (icon) {
      return (
        <View className="relative">
          <View className={`relative w-full ${isFocused ? 'opacity-100' : 'opacity-40'}`}>
            {/*isFocused && (
                <AnimatedView animation='scaleIn' duration={200} className='absolute border-4 rounded-full border-light-primary dark:border-dark-primary -top-1 -left-1/3  w-full h-8  bg-highlight/20' ></AnimatedView>
              )}*/}
            <Icon
              name={icon}
              size={24}
              strokeWidth={isFocused ? 2.5 : 2}
              color={isFocused ? colors.highlight : colors.icon}
            />
          </View>
          {hasBadge && (
            <View className="border-light-primary dark:border-dark-primary absolute -right-1.5 -top-1 h-3 w-3 rounded-full border bg-red-500" />
          )}
        </View>
      );
    }
    if (avatar) {
      return (
        <View className={`rounded-full border-2 ${isFocused ? 'border-highlight' : 'border-transparent'}`}>
          <Avatar
            src={avatar}
            size="xxs"
          />
        </View>
      );
    }
    return null;
  };

  return (
    <Pressable
      className={`w-1/5 overflow-hidden ${isFocused ? '' : ''}`}
      ref={ref}
      {...props}
      onPress={onPress}>
      <View className="relative w-full flex-col items-center justify-center pb-0 pt-4">
        {/*<Animated.View className="absolute w-full h-[2px] bg-black dark:bg-white left-0 top-0"
            style={{
              opacity: lineScale,
              transform: [{ scaleX: lineScale }],
            }}
          />*/}

        {renderContent()}

        {labelAnimated ? (
          <Animated.View
            className="relative"
            style={{
              opacity: labelOpacity,
              transform: [{ translateY: labelMarginBottom }],
            }}>
            <Text className="mt-px text-[9px] text-highlight">{children}</Text>
          </Animated.View>
        ) : (
          <ThemedText className="mt-px text-[9px]">{children}</ThemedText>
        )}
      </View>
    </Pressable>
  );
});
