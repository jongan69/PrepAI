import { Stack } from 'expo-router';

export default function ModalsLayout() {
  return (
    <Stack
      screenOptions={{
        presentation: 'modal',
        headerShown: false,
      }}>
      <Stack.Screen name="add-meal" />
      <Stack.Screen name="add-workout" />
      <Stack.Screen name="add-water" />
      <Stack.Screen name="add-weight" />
    </Stack>
  );
}
