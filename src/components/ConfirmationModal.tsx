import * as NavigationBar from 'expo-navigation-bar';
import React from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import ThemedText from '@/components/ThemedText';
import useThemeColors from '@/contexts/ThemeColors';
import { useTheme } from '@/contexts/ThemeContext';

interface ConfirmationModalProps {
  isVisible: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  actionSheetRef: React.RefObject<ActionSheetRef>;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  actionSheetRef,
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const colors = useThemeColors();

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setBackgroundColorAsync(colors.bg);
      NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');

      return () => {
        // Reset to default theme color when modal closes
        NavigationBar.setBackgroundColorAsync(colors.bg);
        NavigationBar.setButtonStyleAsync(isDark ? 'light' : 'dark');
      };
    }
  }, [isDark, colors.bg]);

  const handleConfirm = () => {
    actionSheetRef.current?.hide();
    onConfirm();
  };

  const handleCancel = () => {
    actionSheetRef.current?.hide();
    onCancel();
  };

  return (
    <ActionSheet
      ref={actionSheetRef}
      gestureEnabled
      drawUnderStatusBar={false}
      statusBarTranslucent
      containerStyle={{
        backgroundColor: colors.bg,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}>
      <View className="p-8 pb-14">
        <ThemedText className="mb-2 text-xl font-bold">{title}</ThemedText>
        <ThemedText className="text-light-subtext dark:text-dark-subtext mb-6">
          {message}
        </ThemedText>

        <View className="flex-row justify-between space-x-3">
          <Pressable
            onPress={handleCancel}
            className="dark:bg-dark-secondary flex-1 items-center rounded-lg bg-secondary px-4  py-3">
            <ThemedText>{cancelText}</ThemedText>
          </Pressable>
          <Pressable
            onPress={handleConfirm}
            className="flex-1 items-center rounded-lg bg-red-500 px-4 py-3">
            <Text className="text-white">{confirmText}</Text>
          </Pressable>
        </View>
      </View>
    </ActionSheet>
  );
};

export default ConfirmationModal;
