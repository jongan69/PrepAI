import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';

import { Button } from '@/components/Button';
import Icon, { IconName } from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import { useThemeColors } from '@/contexts/ThemeColors';

const LandingPage = () => {
  const colors = useThemeColors();

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
    { number: '50K+', label: 'Active Users' },
    { number: '1M+', label: 'Meals Planned' },
    { number: '95%', label: 'Success Rate' },
    { number: '4.8', label: 'App Rating' },
  ];

  return (
    <ScrollView className="flex-1 bg-background">
      {/* Hero Section */}
      <View className="relative min-h-screen">
        <LinearGradient
          colors={[colors.highlight, colors.highlight + '80']}
          className="absolute inset-0"
        />

        {/* Navigation */}
        <View className="flex-row items-center justify-between p-6 pt-12">
          <View className="flex-row items-center">
            <Icon
              name="Zap"
              size={32}
              color={colors.invert}
            />
            <ThemedText className="ml-2 text-2xl font-bold text-invert">PrepAI</ThemedText>
          </View>

          <View className="flex-row items-center space-x-4">
            <TouchableOpacity>
              <ThemedText className="text-base text-invert">Features</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity>
              <ThemedText className="text-base text-invert">Pricing</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity>
              <ThemedText className="text-base text-invert">About</ThemedText>
            </TouchableOpacity>
            <Button
              title="Get Started"
              variant="outline"
              className="border-invert bg-invert"
              textClassName="text-invert"
            />
          </View>
        </View>

        {/* Hero Content */}
        <View className="flex-1 items-center justify-center px-6">
          <View className="mx-auto max-w-4xl text-center">
            <ThemedText className="mb-6 text-5xl font-bold leading-tight text-invert">
              Transform Your Fitness Journey with AI
            </ThemedText>
            <ThemedText className="mb-8 text-xl leading-relaxed text-invert opacity-90">
              PrepAI combines artificial intelligence with personalized nutrition and workout planning to help you
              achieve your health goals faster and more effectively.
            </ThemedText>

            <View className="mb-12 flex-row justify-center space-x-4">
              <Button
                title="Start Free Trial"
                size="large"
                className="border-invert bg-invert"
                textClassName="text-highlight font-semibold"
              />
              <Button
                title="Watch Demo"
                variant="outline"
                size="large"
                className="border-invert"
                textClassName="text-invert"
                iconStart="Play"
              />
            </View>

            {/* Hero Image */}
            <View className="relative">
              <Image
                source={require('@/assets/img/onboarding-1.png')}
                className="h-96 w-full rounded-2xl"
                resizeMode="cover"
              />
              <View className="absolute inset-0 rounded-2xl bg-black bg-opacity-20" />
            </View>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View className="bg-secondary px-6 py-16">
        <View className="mx-auto max-w-6xl">
          <View className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat, index) => (
              <View
                key={index}
                className="text-center">
                <ThemedText className="mb-2 text-4xl font-bold text-highlight">{stat.number}</ThemedText>
                <ThemedText className="text-lg text-text opacity-80">{stat.label}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View className="px-6 py-20">
        <View className="mx-auto max-w-6xl">
          <View className="mb-16 text-center">
            <ThemedText className="mb-4 text-4xl font-bold text-text">Why Choose PrepAI?</ThemedText>
            <ThemedText className="mx-auto max-w-2xl text-xl text-text opacity-70">
              Our AI-powered platform provides everything you need for a successful fitness journey
            </ThemedText>
          </View>

          <View className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <View
                key={index}
                className="rounded-2xl border border-border bg-secondary p-6 text-center">
                <View className="mx-auto mb-4 h-16 w-16 items-center justify-center rounded-full bg-highlight bg-opacity-10">
                  <Icon
                    name={feature.icon}
                    size={32}
                    color={colors.highlight}
                  />
                </View>
                <ThemedText className="mb-3 text-xl font-semibold text-text">{feature.title}</ThemedText>
                <ThemedText className="leading-relaxed text-text opacity-70">{feature.description}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* How It Works Section */}
      <View className="bg-secondary px-6 py-20">
        <View className="mx-auto max-w-6xl">
          <View className="mb-16 text-center">
            <ThemedText className="mb-4 text-4xl font-bold text-text">How It Works</ThemedText>
            <ThemedText className="text-xl text-text opacity-70">Get started in just 3 simple steps</ThemedText>
          </View>

          <View className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                step: '01',
                title: 'Set Your Goals',
                description: 'Tell us about your fitness goals, dietary preferences, and current lifestyle.',
                image: require('@/assets/img/onboarding-2.png'),
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
                  <Image
                    source={item.image}
                    className="h-48 w-full rounded-xl"
                    resizeMode="cover"
                  />
                  <View className="absolute -right-4 -top-4 h-12 w-12 items-center justify-center rounded-full bg-highlight">
                    <ThemedText className="text-lg font-bold text-invert">{item.step}</ThemedText>
                  </View>
                </View>
                <ThemedText className="mb-3 text-2xl font-semibold text-text">{item.title}</ThemedText>
                <ThemedText className="leading-relaxed text-text opacity-70">{item.description}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* Testimonials Section */}
      <View className="px-6 py-20">
        <View className="mx-auto max-w-6xl">
          <View className="mb-16 text-center">
            <ThemedText className="mb-4 text-4xl font-bold text-text">What Our Users Say</ThemedText>
            <ThemedText className="text-xl text-text opacity-70">
              Join thousands of satisfied users who transformed their lives with PrepAI
            </ThemedText>
          </View>

          <View className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <View
                key={index}
                className="rounded-2xl border border-border bg-secondary p-6">
                <View className="mb-4 flex-row items-center">
                  <Image
                    source={testimonial.avatar}
                    className="mr-4 h-12 w-12 rounded-full"
                    resizeMode="cover"
                  />
                  <View>
                    <ThemedText className="font-semibold text-text">{testimonial.name}</ThemedText>
                    <ThemedText className="text-sm text-text opacity-70">{testimonial.role}</ThemedText>
                  </View>
                </View>
                <ThemedText className="leading-relaxed text-text opacity-80">"{testimonial.content}"</ThemedText>
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
      <View className="bg-highlight px-6 py-20">
        <View className="mx-auto max-w-4xl text-center">
          <ThemedText className="mb-6 text-4xl font-bold text-invert">
            Ready to Transform Your Fitness Journey?
          </ThemedText>
          <ThemedText className="mb-8 text-xl text-invert opacity-90">
            Join thousands of users who have already achieved their health goals with PrepAI
          </ThemedText>

          <View className="mb-8 flex-row justify-center space-x-4">
            <Button
              title="Start Free Trial"
              size="large"
              className="border-invert bg-invert"
              textClassName="text-highlight font-semibold"
            />
            <Button
              title="Learn More"
              variant="outline"
              size="large"
              className="border-invert"
              textClassName="text-invert"
            />
          </View>

          <ThemedText className="text-invert opacity-70">
            No credit card required • 14-day free trial • Cancel anytime
          </ThemedText>
        </View>
      </View>

      {/* Footer */}
      <View className="border-t border-border bg-secondary px-6 py-12">
        <View className="mx-auto max-w-6xl">
          <View className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <View>
              <View className="mb-4 flex-row items-center">
                <Icon
                  name="Zap"
                  size={24}
                  color={colors.highlight}
                />
                <ThemedText className="ml-2 text-xl font-bold text-text">PrepAI</ThemedText>
              </View>
              <ThemedText className="leading-relaxed text-text opacity-70">
                Transform your fitness journey with AI-powered nutrition and workout planning.
              </ThemedText>
            </View>

            <View>
              <ThemedText className="mb-4 font-semibold text-text">Product</ThemedText>
              <TouchableOpacity className="mb-2">
                <ThemedText className="text-text opacity-70">Features</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity className="mb-2">
                <ThemedText className="text-text opacity-70">Pricing</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity className="mb-2">
                <ThemedText className="text-text opacity-70">API</ThemedText>
              </TouchableOpacity>
            </View>

            <View>
              <ThemedText className="mb-4 font-semibold text-text">Company</ThemedText>
              <TouchableOpacity className="mb-2">
                <ThemedText className="text-text opacity-70">About</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity className="mb-2">
                <ThemedText className="text-text opacity-70">Blog</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity className="mb-2">
                <ThemedText className="text-text opacity-70">Careers</ThemedText>
              </TouchableOpacity>
            </View>

            <View>
              <ThemedText className="mb-4 font-semibold text-text">Support</ThemedText>
              <TouchableOpacity className="mb-2">
                <ThemedText className="text-text opacity-70">Help Center</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity className="mb-2">
                <ThemedText className="text-text opacity-70">Contact</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity className="mb-2">
                <ThemedText className="text-text opacity-70">Privacy</ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          <View className="mt-8 flex-row items-center justify-between border-t border-border pt-8">
            <ThemedText className="text-text opacity-70">© 2024 PrepAI. All rights reserved.</ThemedText>
            <View className="flex-row space-x-4">
              <TouchableOpacity>
                <Icon
                  name="Twitter"
                  size={20}
                  color={colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="Facebook"
                  size={20}
                  color={colors.text}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  name="Instagram"
                  size={20}
                  color={colors.text}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LandingPage;
