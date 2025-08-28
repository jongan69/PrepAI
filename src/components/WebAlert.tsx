import React from 'react';

interface AlertButton {
  text?: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

interface AlertOptions {
  cancelable?: boolean;
  onDismiss?: () => void;
}

export const Alert = {
  alert: (
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: AlertOptions
  ) => {
    if (typeof window !== 'undefined') {
      const buttonText = buttons?.[0]?.text || 'OK';
      const result = window.confirm(`${title}\n${message || ''}`);
      
      if (result && buttons?.[0]?.onPress) {
        buttons[0].onPress();
      } else if (!result && buttons?.[1]?.onPress) {
        buttons[1].onPress();
      }
    }
  }
};
