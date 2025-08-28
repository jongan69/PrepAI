import { useFonts, Outfit_400Regular, Outfit_700Bold } from '@expo-google-fonts/outfit';
import { Drawer } from 'expo-router/drawer';
import React from 'react';

import CustomDrawerContent from '@/components/CustomDrawerContent';
import { DrawerProvider } from '@/contexts/DrawerContext';
import useThemeColors from '@/contexts/ThemeColors';

// Create a ref to the drawer instance that can be used across the app
export const drawerRef = React.createRef();

export default function DrawerLayout() {
  const colors = useThemeColors();
  const [fontsLoaded] = useFonts({
    Outfit_400Regular,
    Outfit_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <DrawerProvider>
      <Drawer
        ref={drawerRef}
        screenOptions={{
          headerShown: false,
          drawerType: 'slide',
          drawerPosition: 'left',
          drawerStyle: {
            backgroundColor: colors.secondary,
            width: '85%',
            flex: 1,
          },
          overlayColor: 'rgba(0,0,0, 0.4)',
          swipeEdgeWidth: 10,
        }}
        drawerContent={(props) => <CustomDrawerContent />}>
        <Drawer.Screen
          name="(index)"
          options={{
            title: 'PrepAI',
            drawerLabel: 'Home',
          }}
        />
        <Drawer.Screen
          name="(profile)"
          options={{
            title: 'Profile',
            drawerLabel: 'Profile',
          }}
        />
        <Drawer.Screen
          name="(modals)"
          options={{
            title: 'Modals',
            drawerLabel: 'Modals',
          }}
        />
        <Drawer.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            drawerLabel: 'Notifications',
          }}
        />
      </Drawer>
    </DrawerProvider>
  );
}
