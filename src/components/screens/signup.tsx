import { useSignUp, useAuth } from '@clerk/clerk-expo';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Platform, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import AnimatedView from '@/components/AnimatedView';
import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import Input from '@/components/forms/Input';
import { storageManager } from '@/utils/storage';

export default function SignupScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn } = useAuth();

  const insets = useSafeAreaInsets();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthText, setStrengthText] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [verificationLoading, setVerificationLoading] = useState(false);

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

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    const feedback = [];

    // Length check
    if (password.length >= 8) {
      strength += 25;
    } else {
      feedback.push('At least 8 characters');
    }

    // Uppercase check
    if (/[A-Z]/.test(password)) {
      strength += 25;
    } else {
      feedback.push('Add uppercase letter');
    }

    // Lowercase check
    if (/[a-z]/.test(password)) {
      strength += 25;
    } else {
      feedback.push('Add lowercase letter');
    }

    // Numbers or special characters check
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) {
      strength += 25;
    } else {
      feedback.push('Add number or special character');
    }

    setPasswordStrength(strength);
    setStrengthText(feedback.join(' • ') || 'Strong password!');
    return strength >= 75;
  };

  const validatePassword = (password: string) => {
    if (!password) {
      setPasswordError('Password is required');
      return false;
    } else if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    const isStrong = checkPasswordStrength(password);
    if (!isStrong) {
      setPasswordError('Please create a stronger password');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (confirmPassword: string) => {
    if (!confirmPassword) {
      setConfirmPasswordError('Confirm password is required');
      return false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const validateCode = (code: string) => {
    if (!code) {
      setCodeError('Verification code is required');
      return false;
    } else if (code.length < 6) {
      setCodeError('Please enter the complete verification code');
      return false;
    }
    setCodeError('');
    return true;
  };

  const handleSignup = async () => {
    if (!isLoaded) return;
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);

    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fix the errors in the form before continuing.',
      });
      return;
    }

    if (isEmailValid && isPasswordValid && isConfirmPasswordValid) {
      setIsLoading(true);
      try {
        await signUp.create({
          emailAddress: email,
          password,
        });

        // Send user an email with verification code
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

        // Set 'pendingVerification' to true to display second form
        // and capture OTP code
        setPendingVerification(true);
        Toast.show({
          type: 'success',
          text1: 'Verification Sent',
          text2: "We've sent a verification code to your email address.",
        });
      } catch (err: any) {
        // Handle specific Clerk errors
        if (err.errors?.[0]?.code === 'form_identifier_exists') {
          setEmailError('An account with this email already exists');
          Toast.show({
            type: 'error',
            text1: 'Account Exists',
            text2: 'An account with this email already exists. Please try logging in instead.',
          });
        } else if (err.errors?.[0]?.code === 'form_password_pwned') {
          setPasswordError('This password has been compromised. Please choose a different password.');
          Toast.show({
            type: 'error',
            text1: 'Password Compromised',
            text2: 'This password has been found in a data breach. Please choose a stronger, unique password.',
          });
        } else {
          setEmailError('Something went wrong. Please try again.');
          Toast.show({
            type: 'error',
            text1: 'Signup Failed',
            text2: 'Something went wrong. Please try again.',
          });
        }
        console.error(JSON.stringify(err, null, 2));
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    const isCodeValid = validateCode(code);
    if (!isCodeValid) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Code',
        text2: 'Please enter a valid 6-digit verification code.',
      });
      return;
    }

    setVerificationLoading(true);
    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });

        // Mark that user has opened the app before (not first time user)
        await storageManager.setFirstTimeUserCompleted();

        Toast.show({
          type: 'success',
          text1: 'Account Created!',
          text2: 'Welcome to PrepAI! Your account has been successfully created.',
        });
        // Let the router handle redirection based on onboarding status
        router.replace('/');
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
        setCodeError('Verification failed. Please try again.');
        Toast.show({
          type: 'error',
          text1: 'Verification Failed',
          text2: 'Verification failed. Please try again.',
        });
      }
    } catch (err: any) {
      // Handle specific Clerk errors
      if (err.errors?.[0]?.code === 'form_code_incorrect') {
        setCodeError('Invalid verification code. Please try again.');
        Toast.show({
          type: 'error',
          text1: 'Invalid Code',
          text2: 'The verification code you entered is incorrect. Please try again.',
        });
      } else {
        setCodeError('Something went wrong. Please try again.');
        Toast.show({
          type: 'error',
          text1: 'Verification Error',
          text2: 'Something went wrong during verification. Please try again.',
        });
      }
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setVerificationLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <ImageBackground
        source={require('@/assets/img/wallpaper-3.jpg')}
        style={{ flex: 1, backgroundColor: 'black' }}>
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
                  onPress={() => setPendingVerification(false)}
                  size={24}
                  color="white"
                />
                <ThemedText className="font-outfit-bold text-lg text-white">Verify Email</ThemedText>
                <View style={{ width: 24 }} />
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
                    <ThemedText className="font-outfit-bold text-3xl">Verify your email</ThemedText>
                    <ThemedText className="mt-2 text-center text-sm">
                      We've sent a verification code to {email}
                    </ThemedText>
                  </View>

                  <Input
                    label="Verification Code"
                    value={code}
                    onChangeText={(text) => {
                      setCode(text);
                      if (codeError) validateCode(text);
                    }}
                    error={codeError}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    maxLength={6}
                    placeholder="Enter 6-digit code"
                  />

                  <Button
                    title="Verify Email"
                    onPress={onVerifyPress}
                    loading={verificationLoading}
                    size="large"
                    className="mb-4"
                    textClassName="text-invert"
                  />

                  <View className="flex-row justify-center">
                    <ThemedText className="text-center text-sm opacity-50">
                      Didn't receive the code? Check your spam folder or{' '}
                      <ThemedText
                        className="font-outfit-bold text-primary"
                        onPress={async () => {
                          // Resend verification code
                          if (signUp) {
                            try {
                              await signUp.prepareEmailAddressVerification({
                                strategy: 'email_code',
                              });
                              Toast.show({
                                type: 'success',
                                text1: 'Code Resent',
                                text2: 'A new verification code has been sent to your email.',
                              });
                            } catch (err) {
                              Toast.show({
                                type: 'error',
                                text1: 'Resend Failed',
                                text2: 'Failed to resend verification code: ' + err,
                              });
                            }
                          }
                        }}>
                        resend
                      </ThemedText>
                    </ThemedText>
                  </View>
                </View>
              </AnimatedView>
            </KeyboardAvoidingView>
          </ScrollView>
        </LinearGradient>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      source={require('@/assets/img/wallpaper-3.jpg')}
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
                href="/(mobile)/(onboarding)/login"
                className="rounded-xl border border-white/60 px-3 py-2 text-white">
                Login
              </Link>
            </View>
            {/*<View className='flex-1 w-full items-center justify-center pb-10'>
              <LottieView
                autoPlay
                style={{
                  width: 250,
                  height: 250,
                }}
                source={require('@/assets/lottie/lottie.json')}
              />
            </View>*/}
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
                  <ThemedText className="font-outfit-bold text-3xl">Sign up</ThemedText>
                  <ThemedText className="text-sm">Enter your details below</ThemedText>
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

                <Input
                  label="Password"
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    checkPasswordStrength(text);
                    if (passwordError) validatePassword(text);
                  }}
                  error={passwordError}
                  isPassword
                  autoCapitalize="none"
                />

                <Input
                  label="Confirm password"
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    if (confirmPasswordError) validateConfirmPassword(text);
                  }}
                  error={confirmPasswordError}
                  isPassword
                  autoCapitalize="none"
                />
                {password.length > 0 && (
                  <View className="mb-4">
                    <View className="dark:bg-dark-secondary h-1 w-full overflow-hidden rounded-full bg-secondary">
                      <View
                        className={`h-full rounded-full ${passwordStrength >= 75 ? 'bg-green-500' : passwordStrength >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${passwordStrength}%` }}
                      />
                    </View>
                    <ThemedText className="text-light-subtext dark:text-dark-subtext mt-1 text-xs">
                      {strengthText}
                    </ThemedText>
                  </View>
                )}

                <Button
                  title="Sign up"
                  onPress={handleSignup}
                  loading={isLoading}
                  size="large"
                  className="mb-4"
                  textClassName="text-invert"
                />

                <View className="flex-row justify-center">
                  <ThemedText className="text-center text-sm opacity-50">
                    By signing up you agree to our{' '}
                    <ThemedText className="font-outfit-bold text-primary">Terms & Conditions</ThemedText>
                  </ThemedText>
                </View>
              </View>
            </AnimatedView>
          </KeyboardAvoidingView>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}
