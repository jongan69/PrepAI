import React from 'react';
import { View, TouchableOpacity, Pressable, Animated } from 'react-native';
import { useRouter } from 'expo-router';

import Icon from './Icon';
import ThemedText from './ThemedText';
import { useThemeColors } from '@/contexts/ThemeColors';
import { getAppInfo } from '@/lib/app-config';

interface LandingMobileMenuProps {
  isVisible: boolean;
  onClose: () => void;
  onNavigateToSection?: (sectionId: string) => void;
}

export default function LandingMobileMenu({ isVisible, onClose, onNavigateToSection }: LandingMobileMenuProps) {
  const colors = useThemeColors();
  const router = useRouter();
  const slideAnim = React.useRef(new Animated.Value(-300)).current;
  const appInfo = getAppInfo();

  const menuItems = [
    { label: 'Features', href: '#features', sectionId: 'features' },
    { label: 'Pricing', href: '#pricing', sectionId: 'pricing' },
    { label: 'About', href: '#about', sectionId: 'about' },
    { label: 'Get Started', href: '/(mobile)/(onboarding)', isPrimary: true },
  ];

  React.useEffect(() => {
    if (isVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isVisible, slideAnim]);

  const handleMenuItemPress = (item: (typeof menuItems)[0]) => {
    if (item.href.startsWith('/(mobile)')) {
      onClose();
      router.push(item.href as any);
    } else if (item.sectionId && onNavigateToSection) {
      // Handle anchor links for same-page navigation
      onNavigateToSection(item.sectionId);
      onClose();
    } else {
      onClose();
      console.log('Navigate to:', item.href);
    }
  };

  if (!isVisible) return null;

  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
      }}>
      <Pressable
        style={{
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        onPress={onClose}>
        <Animated.View
          style={{
            position: 'absolute',
            top: 0,
            right: slideAnim,
            width: '80%',
            height: '100%',
            backgroundColor: colors.secondary,
            borderLeftWidth: 1,
            borderLeftColor: colors.border,
          }}>
          {/* Header */}
          <View className="flex-row items-center justify-between p-6 border-b border-border">
            <View className="flex-row items-center">
              <Icon
                name="Zap"
                size={24}
                color={colors.highlight}
              />
              <ThemedText className="ml-2 text-xl font-bold text-white">PrepAI</ThemedText>
            </View>
            <TouchableOpacity onPress={onClose}>
              <Icon
                name="X"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View className="p-4">
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleMenuItemPress(item)}
                className={`py-4 px-4 rounded-lg mb-2 ${item.isPrimary ? 'bg-highlight' : 'bg-transparent'}`}>
                <ThemedText
                  className={`text-lg font-semibold ${item.isPrimary ? 'text-white' : 'text-white'}`}
                  style={{
                    color: item.isPrimary ? colors.highlight : colors.text,
                  }}>
                  {item.label}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Footer */}
          <View className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
            <ThemedText className="text-center text-subtext text-sm">Version {appInfo.version}</ThemedText>
          </View>
        </Animated.View>
      </Pressable>
    </View>
  );
}
