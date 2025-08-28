import React, { forwardRef } from 'react';
import ActionSheet, { ActionSheetProps, ActionSheetRef } from 'react-native-actions-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useThemeColors from '@/contexts/ThemeColors';

interface ActionSheetThemedProps extends ActionSheetProps {}

const ActionSheetThemed = forwardRef<ActionSheetRef, ActionSheetThemedProps>(
  ({ containerStyle, ...props }, ref) => {
    const colors = useThemeColors();
    const insets = useSafeAreaInsets();
    return (
      <ActionSheet
        {...props}
        ref={ref}
        containerStyle={{
          backgroundColor: colors.secondary,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: insets.bottom,
          ...containerStyle,
        }}
      />
    );
  }
);

export default ActionSheetThemed;
