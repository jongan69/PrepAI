import React, { useState, useRef } from 'react';
import { View, Image, TouchableOpacity, Platform, Linking } from 'react-native';
import { ScrollView as GestureScrollView } from 'react-native-gesture-handler';
import { ScrollView as RNScrollView } from 'react-native';

import { Button } from '@/components/Button';
import Icon, { IconName } from '@/components/Icon';
import LandingMobileMenu from '@/components/LandingMobileMenu';
import ThemedText from '@/components/ThemedText';
import { useThemeColors } from '@/contexts/ThemeColors';
import { getAppInfo, getAppStats, getSocialMediaLinks } from '@/lib/app-config';

// Use the appropriate ScrollView based on platform
const ScrollView = Platform.OS === 'web' ? RNScrollView : GestureScrollView;

const LandingPage = () => {
  const colors = useThemeColors();
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(false);
  const scrollViewRef = useRef<any>(null);

  // Get configurable values from app.json
  const appInfo = getAppInfo();
  const appStats = getAppStats();
  const socialLinks = getSocialMediaLinks();

  const features = [
    {
      icon: 'Activity' as IconName,
      title: 'Smart Meal Planning',
      description: 'AI-powered meal suggestions based on your goals and preferences',
    },
    {
      icon: 'TrendingUp' as IconName,
      title: 'Progress Tracking',
      description: 'Monitor your fitness journey with detailed analytics and insights',
    },
    {
      icon: 'Dumbbell' as IconName,
      title: 'Workout Library',
      description: 'Access hundreds of exercises with proper form guidance',
    },
    {
      icon: 'Target' as IconName,
      title: 'Goal Setting',
      description: 'Set personalized fitness goals and track your achievements',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Fitness Enthusiast',
      content: 'PrepAI transformed my fitness journey. The meal planning is incredible!',
      avatar: require('@/assets/img/user-1.jpg'),
    },
    {
      name: 'Mike Chen',
      role: 'Personal Trainer',
      content: 'I recommend PrepAI to all my clients. The progress tracking is unmatched.',
      avatar: require('@/assets/img/user-2.jpg'),
    },
    {
      name: 'Emma Davis',
      role: 'Health Coach',
      content: 'The AI-powered recommendations are spot-on. Love this app!',
      avatar: require('@/assets/img/user-3.jpg'),
    },
  ];

  const stats = [
    { number: appStats.activeUsers, label: 'Active Users' },
    { number: appStats.mealsPlanned, label: 'Meals Planned' },
    { number: appStats.successRate, label: 'Success Rate' },
    { number: appStats.appRating, label: 'App Rating' },
  ];

  const handleNavigateToSection = (sectionId: string) => {
    console.log('Scrolling to section:', sectionId);
    console.log('ScrollView ref:', scrollViewRef.current);

    // Use a more reliable approach with scrollTo
    const sectionOffsets = {
      features: 800,
      pricing: 2400,
      about: 1600,
    };

    const yOffset = sectionOffsets[sectionId as keyof typeof sectionOffsets];
    console.log('Y offset:', yOffset);
    if (yOffset && scrollViewRef.current) {
      console.log('Executing scroll...');
      try {
        // Use ScrollView method for both platforms
        scrollViewRef.current.scrollTo({ x: 0, y: yOffset, animated: true });
        console.log('Scroll executed successfully');
      } catch (error) {
        console.error('Scroll error:', error);
      }
    } else {
      console.log('ScrollView ref not available or yOffset not found');
    }
  };

  return (
    <View className="flex-1">
      <Image
        source={require('@/assets/img/wallpaper.webp')}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
        resizeMode="stretch"
      />
      <View className="absolute inset-0 bg-black bg-opacity-40" />
      <ScrollView
        ref={scrollViewRef}
        className="flex-1"
        showsVerticalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={16}>
        {/* Hero Section */}
        <View className="relative min-h-screen">
          {/* Navigation */}
          <View className="flex-row items-center justify-between p-4 pt-8 md:p-6 md:pt-12">
            <View className="flex-row items-center">
              <Icon
                name="Zap"
                size={28}
                color="white"
                className="md:w-8"
              />
              <ThemedText className="ml-2 text-xl font-bold text-white md:text-2xl">PrepAI</ThemedText>
            </View>

            <View className="hidden flex-row items-center space-x-4 md:flex">
              <TouchableOpacity>
                <ThemedText className="text-base text-white">Features</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity>
                <ThemedText className="text-base text-white">Pricing</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity>
                <ThemedText className="text-base text-white">About</ThemedText>
              </TouchableOpacity>
              <Button
                title="Get Started"
                variant="outline"
                className="border-white bg-white"
                textClassName="text-black"
              />
            </View>

            {/* Mobile menu button */}
            <TouchableOpacity
              className="md:hidden"
              onPress={() => setIsMobileMenuVisible(true)}>
              <Icon
                name="Menu"
                size={24}
                color="white"
              />
            </TouchableOpacity>
          </View>

          {/* Hero Content */}
          <View className="flex-1 items-center justify-center px-2 md:px-6">
            <View className="mx-auto w-full max-w-sm text-center md:max-w-4xl">
              <ThemedText className="mb-6 text-6xl font-bold leading-tight text-white">{appInfo.tagline}</ThemedText>
              <ThemedText className="mb-8 text-base leading-relaxed text-white opacity-90 md:text-xl md:max-w-3xl">
                {appInfo.description}
              </ThemedText>

              <View className="mb-12 flex-col justify-center space-y-3 md:flex-row md:space-x-4 md:space-y-0">
                <Button
                  title="Start Free Trial"
                  size="large"
                  className="border-white bg-white w-full md:w-auto"
                  textClassName="text-black font-semibold"
                />
                <Button
                  title="Watch Demo"
                  variant="outline"
                  size="large"
                  className="border-white w-full md:w-auto"
                  textClassName="text-white"
                  iconStart="Play"
                />
              </View>

              {/* Hero Image */}
              <View className="relative">
                <Image
                  source={require('@/assets/img/banner.png')}
                  className="h-64 w-full rounded-2xl md:h-96"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 rounded-2xl bg-black bg-opacity-20" />
              </View>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View className="px-4 py-16 md:px-6">
          <View className="mx-auto max-w-6xl">
            <View className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              {stats.map((stat, index) => (
                <View
                  key={index}
                  className="text-center">
                  <ThemedText className="mb-2 text-4xl font-bold text-white">{stat.number}</ThemedText>
                  <ThemedText className="text-lg text-white opacity-80">{stat.label}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Features Section */}
        <View className="px-4 py-20 md:px-6">
          <View className="mx-auto max-w-6xl">
            <View className="mb-16 text-center">
              <ThemedText className="mb-4 text-3xl font-bold text-white md:text-4xl">Why Choose PrepAI?</ThemedText>
              <ThemedText className="mx-auto max-w-2xl text-lg text-white opacity-70 md:text-xl">
                Our AI-powered platform provides everything you need for a successful fitness journey
              </ThemedText>
            </View>

            <View className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              {features.map((feature, index) => (
                <View
                  key={index}
                  className="rounded-2xl border border-white border-opacity-20 bg-white bg-opacity-10 p-6 text-center backdrop-blur-sm">
                  <View className="mx-auto mb-4 h-16 w-16 items-center justify-center rounded-full bg-highlight bg-opacity-20">
                    <Icon
                      name={feature.icon}
                      size={32}
                      color={colors.highlight}
                    />
                  </View>
                  <ThemedText className="mb-3 text-xl font-semibold text-white">{feature.title}</ThemedText>
                  <ThemedText className="leading-relaxed text-white opacity-70">{feature.description}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* How It Works Section */}
        <View className="px-4 py-20 md:px-6">
          <View className="mx-auto max-w-6xl">
            <View className="mb-16 text-center">
              <ThemedText className="mb-4 text-3xl font-bold text-white md:text-4xl">How It Works</ThemedText>
              <ThemedText className="text-lg text-white opacity-70 md:text-xl">
                Get started in just 3 simple steps
              </ThemedText>
            </View>

            <View className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                {
                  step: '01',
                  title: 'Set Your Goals',
                  description: 'Tell us about your fitness goals, dietary preferences, and current lifestyle.',
                  image: require('@/assets/img/service-1.jpg'),
                },
                {
                  step: '02',
                  title: 'Get AI Recommendations',
                  description: 'Our AI creates personalized meal plans and workout routines just for you.',
                  image: require('@/assets/img/onboarding-3.png'),
                },
                {
                  step: '03',
                  title: 'Track & Improve',
                  description: 'Monitor your progress and get continuous optimization from our AI.',
                  image: require('@/assets/img/progress.png'),
                },
              ].map((item, index) => (
                <View
                  key={index}
                  className="text-center">
                  <View className="relative mb-6">
                    <View className="mx-auto h-48 w-48 items-center justify-center rounded-xl bg-gray-100">
                      <Image
                        source={item.image}
                        style={{ width: 192, height: 192, borderRadius: 10 }}
                        resizeMode="cover"
                      />
                    </View>
                    <View className="absolute -right-4 -top-4 h-12 w-12 items-center justify-center rounded-full bg-highlight">
                      <ThemedText className="text-lg font-bold text-white">{item.step}</ThemedText>
                    </View>
                  </View>
                  <ThemedText className="mb-3 text-2xl font-semibold text-white">{item.title}</ThemedText>
                  <ThemedText className="leading-relaxed text-white opacity-70">{item.description}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Testimonials Section */}
        <View className="px-4 py-20 md:px-6">
          <View className="mx-auto max-w-6xl">
            <View className="mb-16 text-center">
              <ThemedText className="mb-4 text-3xl font-bold text-white md:text-4xl">What Our Users Say</ThemedText>
              <ThemedText className="text-lg text-white opacity-70 md:text-xl">
                Join thousands of satisfied users who transformed their lives with PrepAI
              </ThemedText>
            </View>

            <View className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              {testimonials.map((testimonial, index) => (
                <View
                  key={index}
                  className="rounded-2xl border border-white border-opacity-20 bg-white bg-opacity-10 p-6 backdrop-blur-sm">
                  <View className="mb-4 flex-row items-center">
                    <View className="mr-4 h-12 w-12 overflow-hidden rounded-full">
                      <Image
                        source={testimonial.avatar}
                        style={{ width: 48, height: 48 }}
                        resizeMode="cover"
                      />
                    </View>
                    <View>
                      <ThemedText className="font-semibold text-white">{testimonial.name}</ThemedText>
                      <ThemedText className="text-sm text-white opacity-70">{testimonial.role}</ThemedText>
                    </View>
                  </View>
                  <ThemedText className="leading-relaxed text-white opacity-80">"{testimonial.content}"</ThemedText>
                  <View className="mt-4 flex-row">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="Star"
                        size={16}
                        color={colors.highlight}
                        className="mr-1"
                      />
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View className="bg-highlight px-4 py-20 md:px-6">
          <View className="mx-auto max-w-4xl text-center">
            <ThemedText className="mb-6 text-3xl font-bold text-white md:text-4xl">
              Ready to Transform Your Fitness Journey?
            </ThemedText>
            <ThemedText className="mb-8 text-lg text-white opacity-90 md:text-xl">
              Join thousands of users who have already achieved their health goals with PrepAI
            </ThemedText>

            <View className="mb-8 flex-col justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
              <Button
                title="Start Free Trial"
                size="large"
                className="border-white bg-white"
                textClassName="text-black font-semibold"
              />
              <Button
                title="Learn More"
                variant="outline"
                size="large"
                className="border-white"
                textClassName="text-white"
              />
            </View>

            <ThemedText className="text-white opacity-70">
              No credit card required • 14-day free trial • Cancel anytime
            </ThemedText>
          </View>
        </View>

        {/* Footer */}
        <View className="border-t border-white border-opacity-20 px-4 py-12 md:px-6">
          <View className="mx-auto max-w-6xl">
            <View className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
              <View>
                <View className="mb-4 flex-row items-center">
                  <Icon
                    name="Zap"
                    size={24}
                    color={colors.highlight}
                  />
                  <ThemedText className="ml-2 text-xl font-bold text-white">PrepAI</ThemedText>
                </View>
                <ThemedText className="leading-relaxed text-white opacity-70">
                  Transform your fitness journey with AI-powered nutrition and workout planning.
                </ThemedText>
              </View>

              <View>
                <ThemedText className="mb-4 font-semibold text-white">Product</ThemedText>
                <TouchableOpacity
                  className="mb-2"
                  onPress={() => handleNavigateToSection('features')}>
                  <ThemedText className="text-white opacity-70">Features</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  className="mb-2"
                  onPress={() => handleNavigateToSection('pricing')}>
                  <ThemedText className="text-white opacity-70">Pricing</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  className="mb-2"
                  onPress={() => {
                    if (Platform.OS === 'web') {
                      window.location.href = '/api/docs';
                    } else {
                      Linking.openURL(`${appInfo.contact.website}/api/docs`);
                    }
                  }}>
                  <ThemedText className="text-white opacity-70">API</ThemedText>
                </TouchableOpacity>
              </View>

              <View>
                <ThemedText className="mb-4 font-semibold text-white">Company</ThemedText>
                <TouchableOpacity className="mb-2">
                  <ThemedText className="text-white opacity-70">About</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity className="mb-2">
                  <ThemedText className="text-white opacity-70">Blog</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity className="mb-2">
                  <ThemedText className="text-white opacity-70">Careers</ThemedText>
                </TouchableOpacity>
              </View>

              <View>
                <ThemedText className="mb-4 font-semibold text-white">Support</ThemedText>
                <TouchableOpacity className="mb-2">
                  <ThemedText className="text-white opacity-70">Help Center</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity className="mb-2">
                  <ThemedText className="text-white opacity-70">Contact</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity className="mb-2">
                  <ThemedText className="text-white opacity-70">Privacy</ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            <View className="mt-8 flex-col items-center justify-between space-y-4 border-t border-white border-opacity-20 pt-8 md:flex-row md:space-y-0">
              <ThemedText className="text-center text-white opacity-70 md:text-left">
                © {new Date().getFullYear()} PrepAI. All rights reserved.
              </ThemedText>
              <View className="flex-row space-x-4">
                <TouchableOpacity onPress={() => Linking.openURL(socialLinks.twitter)}>
                  <Icon
                    name="Twitter"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(socialLinks.facebook)}>
                  <Icon
                    name="Facebook"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(socialLinks.instagram)}>
                  <Icon
                    name="Instagram"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Mobile Menu */}
      <LandingMobileMenu
        isVisible={isMobileMenuVisible}
        onClose={() => setIsMobileMenuVisible(false)}
        onNavigateToSection={handleNavigateToSection}
      />
    </View>
  );
};

export default LandingPage;
