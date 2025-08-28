import { StatusBar } from 'expo-status-bar';
import React, { createContext, useContext, useState } from 'react';
import { View } from 'react-native';

import { themes } from '@/utils/color-theme';

interface ThemeProviderProps {
  children: React.ReactNode;
}

type ThemeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);
    // Note: You may need to implement theme switching logic here
    // This could involve updating CSS variables or using a different approach
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      <StatusBar
        backgroundColor="transparent"
        translucent
        style={currentTheme === 'dark' ? 'light' : 'dark'}
        animated
      />
      <View style={themes[currentTheme]} className="flex-1 bg-background">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
