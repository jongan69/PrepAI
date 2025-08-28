import { Slot } from 'expo-router';
import { KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet } from 'react-native';

export { ErrorBoundary } from 'expo-router';

export default function Layout() {
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        <Slot />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  keyboardView: {
    flex: 1,
  },
});
