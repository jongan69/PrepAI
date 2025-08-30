import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, FlatList, Dimensions, Pressable, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Icon, { IconName } from '@/components/Icon';
import ThemedText from '@/components/ThemedText';

const { width } = Dimensions.get('window');

interface SlideData {
  id: string;
  title: string;
  image: any;
  description: string;
  icon: string;
}

const slides: SlideData[] = [
  {
    id: '1',
    title: 'Track Your Health',
    image: require('@/assets/img/onboarding-1.jpg'),
    description: 'Monitor your daily calories, workouts, and progress with ease',
    icon: 'Dumbbell',
  },
  {
    id: '2',
    title: 'Stay Motivated',
    image: require('@/assets/img/onboarding-2.jpg'),
    description: 'Set goals and track your fitness journey every day',
    icon: 'Heart',
  },
  {
    id: '3',
    title: 'Achieve Your Goals',
    image: require('@/assets/img/wallpaper-3.jpg'),
    description: 'Get personalized insights and reach your health targets',
    icon: 'Target',
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const insets = useSafeAreaInsets();

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: number } } }) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    setCurrentIndex(index);
  };

  return (
    <View
      style={{ backgroundColor: 'black' }}
      className="flex-1 bg-background">
      <View className="relative flex-1 bg-background">
        <FlatList
          className="h-full w-full"
          data={slides}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          snapToAlignment="start"
          decelerationRate="fast"
          snapToInterval={width}
          renderItem={({ item }) => (
            <View
              style={{ width }}
              className="items-center justify-center">
              <ImageBackground
                source={item.image}
                className="absolute left-0 top-0 h-full w-full">
                <LinearGradient
                  colors={['transparent', 'rgba(0,0,0,0.8)']}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                  <View
                    className="mt-8 flex-1 items-center justify-center"
                    style={{}}>
                    <Icon
                      name={item.icon as IconName}
                      size={30}
                      strokeWidth={1}
                      color="white"
                      className="h-20 w-20 rounded-full border border-white/40"
                    />
                    <ThemedText className="mt-6 text-center font-outfit-bold text-3xl">{item.title}</ThemedText>
                    <Text className="px-20 text-center text-lg text-text opacity-80">{item.description}</Text>
                  </View>
                </LinearGradient>
              </ImageBackground>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <View
          className="absolute mb-20 w-full flex-row justify-center"
          style={{ top: insets.top + 10 }}>
          {slides.map((_, index) => (
            <View
              key={index}
              className={`mx-1 h-2 rounded-full ${index === currentIndex ? 'w-2 bg-white' : 'w-2 bg-white/50'}`}
            />
          ))}
        </View>

        {/* Login/Signup Buttons */}
        <View
          style={{ bottom: insets.bottom }}
          className="absolute bottom-0 mb-global flex w-full flex-col space-y-2 px-6">
          <View className="flex flex-row items-center justify-center gap-2">
            <Pressable
              onPress={() => router.push('/(mobile)/(onboarding)/login')}
              className="flex flex-1 flex-row items-center justify-center rounded-full border border-white py-4">
              <AntDesign
                name="google"
                size={22}
                color="white"
              />
            </Pressable>
            <Pressable
              onPress={() => router.push('/(mobile)/(onboarding)/login')}
              className="flex w-1/4 flex-1 flex-row items-center justify-center rounded-full bg-white py-4">
              <Icon
                name="Mail"
                size={20}
                color="black"
              />
            </Pressable>
            <Pressable
              onPress={() => router.push('/(mobile)/(onboarding)/login')}
              className="flex flex-1 flex-row items-center justify-center rounded-full border border-white py-4">
              <AntDesign
                name="apple1"
                size={22}
                color="white"
              />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
