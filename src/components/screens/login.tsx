import { useSignIn, useAuth } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AnimatedView from '@/components/AnimatedView';
import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import Input from '@/components/forms/Input';
import { storageManager } from '@/utils/storage';

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const { isSignedIn } = useAuth();

  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if user is already signed in
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log('User is already signed in, redirecting to home');
      router.replace('/(mobile)/(index)');
    }
  }, [isLoaded, isSignedIn]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError('Email is required');
      return false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleLogin = async () => {
    if (!isLoaded) return;

    // Check if user is already signed in
    if (isSignedIn) {
      console.log('User is already signed in, redirecting to home');
      router.replace('/(mobile)/(index)');
      return;
    }

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);
      // Start the sign-in process using the email and password provided
      try {
        const signInAttempt = await signIn.create({
          identifier: email,
          password,
        });

        // If sign-in process is complete, set the created session as active
        // and redirect the user
        if (signInAttempt.status === 'complete') {
          await setActive({ session: signInAttempt.createdSessionId });

          // Mark that user has opened the app before (not first time user)
          await storageManager.setFirstTimeUserCompleted();

          console.log('Login successful, redirecting to main app');
          // Let the router handle redirection based on onboarding status
          router.replace('/');
        } else {
          // If the status isn't complete, check why. User might need to
          // complete further steps.
          console.error(JSON.stringify(signInAttempt, null, 2));
        }
      } catch (err) {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(err, null, 2));
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ImageBackground
      source={require('@/assets/img/onboarding-1.jpg')}
      style={{ flex: 1 }}>
      <LinearGradient
        colors={['transparent', 'transparent']}
        style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
          className="flex-1">
          <StatusBar style="light" />
          <View
            className="flex-1"
            style={{ paddingTop: insets.top }}>
            <View className="w-full flex-row items-center justify-between px-global">
              <Icon
                name="ArrowLeft"
                onPress={() => router.back()}
                size={24}
                color="white"
              />
              <Link
                href="/(mobile)/(onboarding)/signup"
                className="rounded-xl border border-white/60 px-3 py-2 text-white">
                Sign Up
              </Link>
            </View>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
            <AnimatedView
              duration={500}
              delay={200}
              animation="slideInBottom"
              className="p-4 pb-10">
              <View className="rounded-3xl border border-border bg-background p-6">
                <View className="mb-6 items-center justify-center">
                  <ThemedText className="font-outfit-bold text-3xl">Login</ThemedText>
                  <ThemedText className="text-sm">Sign in to your account</ThemedText>
                </View>

                <Input
                  label="Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (emailError) validateEmail(text);
                  }}
                  error={emailError}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  variant="inline"
                />

                <Input
                  label="Password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    if (passwordError) validatePassword(text);
                  }}
                  error={passwordError}
                  isPassword
                  autoCapitalize="none"
                />
                <Button
                  title="Login"
                  onPress={handleLogin}
                  loading={isLoading}
                  size="large"
                  className="mb-4"
                />
                <Link
                  className="mb-4 text-center text-sm text-text underline"
                  href="/(mobile)/(onboarding)/forgot-password">
                  Forgot Password?
                </Link>
              </View>
            </AnimatedView>
          </KeyboardAvoidingView>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}
