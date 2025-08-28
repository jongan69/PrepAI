import { Stack } from 'expo-router';
export default function ProfileLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="edit" />
      <Stack.Screen name="subscription" />
      <Stack.Screen name="(settings)" />
      <Stack.Screen name="help" />
    </Stack>
  );
}
