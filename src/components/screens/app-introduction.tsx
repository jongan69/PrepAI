import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, FlatList, Dimensions, Pressable, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import Icon, { IconName } from '@/components/Icon';
import ThemedText from '@/components/ThemedText';
import { storageManager } from '@/utils/storage';

const { width } = Dimensions.get('window');

interface IntroductionSlide {
  id: string;
  title: string;
  description: string;
  image: any;
  icon: IconName;
  color: string;
}

const introductionSlides: IntroductionSlide[] = [
  {
    id: '1',
    title: 'Welcome to PrepAI',
    description:
      'Your personal AI-powered fitness companion that helps you achieve your health goals with smart insights and personalized recommendations.',
    image: require('@/assets/img/onboarding-1.jpg'),
    icon: 'Brain',
    color: '#6366f1',
  },
  {
    id: '2',
    title: 'Track Everything',
    description:
      'Monitor your meals, workouts, water intake, and weight progress all in one place. Get detailed insights into your health journey.',
    image: require('@/assets/img/onboarding-2.jpg'),
    icon: 'BarChart3',
    color: '#10b981',
  },
  {
    id: '3',
    title: 'Smart Recommendations',
    description: 'Get personalized meal suggestions, workout plans, and health tips based on your goals and progress.',
    image: require('@/assets/img/onboarding-3.png'),
    icon: 'Lightbulb',
    color: '#f59e0b',
  },
  {
    id: '4',
    title: 'Stay Motivated',
    description:
      'Set achievable goals, track your streaks, and celebrate your progress with our gamified approach to health.',
    image: require('@/assets/img/progress.png'),
    icon: 'Trophy',
    color: '#ef4444',
  },
];

export default function AppIntroduction() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < introductionSlides.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      handleGetStarted();
    }
  };

  const handleSkip = () => {
    handleGetStarted();
  };

  const handleGetStarted = async () => {
    await storageManager.setFirstTimeUserCompleted();
    router.replace('/screens/onboarding-start');
  };

  const renderSlide = ({ item }: { item: IntroductionSlide }) => (
    <View
      style={{ width }}
      className="flex-1">
      <ImageBackground
        source={item.image}
        className="absolute left-0 top-0 h-full w-full">
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={{ width: '100%', height: '100%' }}>
          <View className="flex-1 items-center justify-center px-6">
            <View
              className="mb-8 h-20 w-20 items-center justify-center rounded-full"
              style={{ backgroundColor: `${item.color}20` }}>
              <Icon
                name={item.icon}
                size={32}
                color={item.color}
              />
            </View>

            <ThemedText className="mb-4 text-center text-3xl font-bold text-white">{item.title}</ThemedText>

            <ThemedText className="text-center text-lg leading-6 text-white/80">{item.description}</ThemedText>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );

  return (
    <View className="flex-1 bg-background">
      {/* Skip Button */}
      <Pressable
        onPress={handleSkip}
        className="absolute right-6 top-12 z-10"
        style={{ paddingTop: insets.top }}>
        <ThemedText className="text-lg font-medium text-white">Skip</ThemedText>
      </Pressable>

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={introductionSlides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToAlignment="start"
        decelerationRate="fast"
        snapToInterval={width}
      />

      {/* Bottom Section */}
      <View
        className="absolute bottom-0 left-0 right-0 px-6 pb-6"
        style={{ paddingBottom: insets.bottom + 24 }}>
        {/* Dots */}
        <View className="mb-8 flex-row justify-center">
          {introductionSlides.map((_, index) => (
            <View
              key={index}
              className={`mx-1 h-2 rounded-full ${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/50'}`}
            />
          ))}
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-4">
          {currentIndex < introductionSlides.length - 1 ? (
            <>
              <Button
                title="Skip"
                variant="outline"
                className="flex-1"
                textClassName="text-white"
                onPress={handleSkip}
              />
              <Button
                title="Next"
                className="flex-1"
                onPress={handleNext}
              />
            </>
          ) : (
            <Button
              title="Get Started"
              className="flex-1"
              onPress={handleGetStarted}
            />
          )}
        </View>
      </View>
    </View>
  );
}
