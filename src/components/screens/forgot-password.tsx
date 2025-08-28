import { useSignIn } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AnimatedView from '@/components/AnimatedView';
import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import Input from '@/components/forms/Input';

export default function ForgotPasswordScreen() {
  const { signIn, isLoaded } = useSignIn();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleResetPassword = async () => {
    if (!isLoaded) return;

    const isEmailValid = validateEmail(email);

    if (isEmailValid) {
      setIsLoading(true);
      try {
        // Use Clerk's password reset functionality
        const signInAttempt = await signIn.create({
          strategy: 'reset_password_email_code',
          identifier: email,
        });

        if (signInAttempt.status === 'needs_first_factor') {
          // Password reset email sent successfully
          Alert.alert(
            'Password Reset Link Sent',
            "We've sent a password reset link to your email address. Please check your inbox and follow the instructions to reset your password.",
            [
              {
                text: 'OK',
                onPress: () => {
                  // Navigate back to login screen
                  router.back();
                },
              },
            ]
          );
        } else {
          // Handle other statuses
          console.log('Sign in attempt status:', signInAttempt.status);
          Alert.alert('Error', 'Unable to send password reset email. Please try again.', [
            { text: 'OK' },
          ]);
        }
      } catch (err: any) {
        console.error('Password reset error:', err);

        // Handle specific Clerk errors
        if (err.errors && err.errors.length > 0) {
          const error = err.errors[0];
          if (error.code === 'form_identifier_not_found') {
            Alert.alert(
              'Email Not Found',
              'No account found with this email address. Please check your email or sign up for a new account.',
              [{ text: 'OK' }]
            );
          } else if (error.code === 'form_identifier_invalid') {
            setEmailError('Please enter a valid email address');
          } else {
            Alert.alert(
              'Error',
              error.message || 'Unable to send password reset email. Please try again.',
              [{ text: 'OK' }]
            );
          }
        } else {
          Alert.alert('Error', 'Unable to send password reset email. Please try again.', [
            { text: 'OK' },
          ]);
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <LinearGradient colors={['#000000', '#101010']} locations={[0, 0.5]} style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        bounces={false}
        className="flex-1">
        <StatusBar style="light" />
        <View className="flex-1" style={{ paddingTop: insets.top }}>
          <View className="w-full flex-row items-center justify-between px-global">
            <Icon name="ArrowLeft" onPress={() => router.back()} size={24} color="white" />
            <Link
              href="/(mobile)/(onboarding)/login"
              className="rounded-xl border border-white/60 px-3 py-2 text-white">
              Login
            </Link>
          </View>
          <View className="w-full flex-1 items-center justify-center pb-10" />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}>
          <AnimatedView duration={500} delay={200} animation="slideInBottom" className="p-4">
            <View className="rounded-3xl border border-border bg-background p-6">
              <View className="mb-6 items-center justify-center">
                <ThemedText className="font-outfit-bold text-3xl">Reset Password</ThemedText>
                <ThemedText className="text-sm">
                  Enter your email address to recover password
                </ThemedText>
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
              />

              <Button
                title="Send Reset Link"
                onPress={handleResetPassword}
                loading={isLoading}
                size="large"
                className="mb-4 mt-4"
              />
            </View>
          </AnimatedView>
        </KeyboardAvoidingView>
      </ScrollView>
    </LinearGradient>
  );
}
