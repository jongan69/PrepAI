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
      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="relative min-h-screen">
          {/* Navigation */}
          <View className="flex-row items-center justify-between p-6 pt-12">
            <View className="flex-row items-center">
              <Icon
                name="Zap"
                size={32}
                color="white"
              />
              <ThemedText className="ml-2 text-2xl font-bold text-white">PrepAI</ThemedText>
            </View>

            <View className="flex-row items-center space-x-4">
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
          </View>

          {/* Hero Content */}
          <View className="flex-1 items-center justify-center px-6">
            <View className="mx-auto max-w-4xl text-center">
              <ThemedText className="mb-6 text-5xl font-bold leading-tight text-white">
                Transform Your Fitness Journey with AI
              </ThemedText>
              <ThemedText className="mb-8 text-xl leading-relaxed text-white opacity-90">
                PrepAI combines artificial intelligence with personalized nutrition and workout planning to help you
                achieve your health goals faster and more effectively.
              </ThemedText>

              <View className="mb-12 flex-row justify-center space-x-4">
                <Button
                  title="Start Free Trial"
                  size="large"
                  className="border-white bg-white"
                  textClassName="text-black font-semibold"
                />
                <Button
                  title="Watch Demo"
                  variant="outline"
                  size="large"
                  className="border-white"
                  textClassName="text-white"
                  iconStart="Play"
                />
              </View>

              {/* Hero Image */}
              <View className="relative">
                <Image
                  source={require('@/assets/img/banner.png')}
                  className="h-96 w-full rounded-2xl"
                  resizeMode="cover"
                />
                <View className="absolute inset-0 rounded-2xl bg-black bg-opacity-20" />
              </View>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View className="px-6 py-16">
          <View className="mx-auto max-w-6xl">
            <View className="grid grid-cols-2 gap-8 md:grid-cols-4">
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
        <View className="px-6 py-20">
          <View className="mx-auto max-w-6xl">
            <View className="mb-16 text-center">
              <ThemedText className="mb-4 text-4xl font-bold text-white">Why Choose PrepAI?</ThemedText>
              <ThemedText className="mx-auto max-w-2xl text-xl text-white opacity-70">
                Our AI-powered platform provides everything you need for a successful fitness journey
              </ThemedText>
            </View>

            <View className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
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
        <View className="px-6 py-20">
          <View className="mx-auto max-w-6xl">
            <View className="mb-16 text-center">
              <ThemedText className="mb-4 text-4xl font-bold text-white">How It Works</ThemedText>
              <ThemedText className="text-xl text-white opacity-70">Get started in just 3 simple steps</ThemedText>
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
        <View className="px-6 py-20">
          <View className="mx-auto max-w-6xl">
            <View className="mb-16 text-center">
              <ThemedText className="mb-4 text-4xl font-bold text-white">What Our Users Say</ThemedText>
              <ThemedText className="text-xl text-white opacity-70">
                Join thousands of satisfied users who transformed their lives with PrepAI
              </ThemedText>
            </View>

            <View className="grid grid-cols-1 gap-8 md:grid-cols-3">
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
        <View className="bg-highlight px-6 py-20">
          <View className="mx-auto max-w-4xl text-center">
            <ThemedText className="mb-6 text-4xl font-bold text-white">
              Ready to Transform Your Fitness Journey?
            </ThemedText>
            <ThemedText className="mb-8 text-xl text-white opacity-90">
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
        <View className="border-t border-white border-opacity-20 px-6 py-12">
          <View className="mx-auto max-w-6xl">
            <View className="grid grid-cols-1 gap-8 md:grid-cols-4">
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
                <TouchableOpacity className="mb-2">
                  <ThemedText className="text-white opacity-70">Features</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity className="mb-2">
                  <ThemedText className="text-white opacity-70">Pricing</ThemedText>
                </TouchableOpacity>
                <TouchableOpacity className="mb-2">
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

            <View className="mt-8 flex-row items-center justify-between border-t border-white border-opacity-20 pt-8">
              <ThemedText className="text-white opacity-70">
                © {new Date().getFullYear()} PrepAI. All rights reserved.
              </ThemedText>
              <View className="flex-row space-x-4">
                <TouchableOpacity>
                  <Icon
                    name="Twitter"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon
                    name="Facebook"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>
                <TouchableOpacity>
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
    </View>
  );
};

export default LandingPage;
