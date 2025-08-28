import { Link } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Pressable, FlatList } from 'react-native';

import Avatar from '@/components/Avatar';
import { CardScroller } from '@/components/CardScroller';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import WorkoutBarChart from '@/components/WorkoutBarChart';
import Section from '@/components/layout/Section';
import SmartOfferCard from '@/components/SmartOfferCard';
import { useDatabase } from '@/contexts/DatabaseProvider';
import { useClerkUser } from '@/hooks/useClerkUser';
import { useWorkouts } from '@/hooks/useLiveData';

interface Workout {
  id: string;
  name: string;
  duration: string;
  exercises: number;
}

// Sample data for different days
const workoutDaysData = [
  {
    id: 0,
    date: 'TUESDAY',
    title: 'Workouts',
    subtitle: '3 Workouts this week',
  },
  {
    id: 1,
    date: 'YESTERDAY',
    title: 'Workouts',
    subtitle: '4 Workouts this week',
  },
  {
    id: 2,
    date: 'TODAY',
    title: 'Workouts',
    subtitle: '5 Workouts this week',
  },
];

const mockWorkouts: Workout[] = [
  {
    id: '1',
    name: 'Upper Body Strength',
    duration: '45 min',
    exercises: 8,
  },
  {
    id: '2',
    name: 'HIIT Cardio',
    duration: '30 min',
    exercises: 12,
  },
  {
    id: '3',
    name: 'Yoga Flow',
    duration: '60 min',
    exercises: 15,
  },
  {
    id: '4',
    name: 'Core Blast',
    duration: '20 min',
    exercises: 6,
  },
  {
    id: '5',
    name: 'Lower Body Power',
    duration: '40 min',
    exercises: 10,
  },
];

const recentWorkouts = [
  { name: 'Upper Body Strength', date: 'Today', duration: '45 min' },
  { name: 'HIIT Cardio', date: 'Yesterday', duration: '30 min' },
  { name: 'Yoga Flow', date: '2 days ago', duration: '60 min' },
];

export default function WorkoutsScreen() {
  const { userId } = useDatabase();
  const { imageUrl, displayName } = useClerkUser();
  const { workouts, todayWorkouts, weeklyWorkouts, isLoading } = useWorkouts(userId?.toString() || '');
  const [currentDayIndex, setCurrentDayIndex] = useState(2); // Start with TODAY
  const flatListRef = useRef<FlatList>(null);

  const handlePrevDay = () => {
    if (currentDayIndex > 0) {
      const newIndex = currentDayIndex - 1;
      setCurrentDayIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  const handleNextDay = () => {
    if (currentDayIndex < workoutDaysData.length - 1) {
      const newIndex = currentDayIndex + 1;
      setCurrentDayIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  const renderWorkoutDay = ({ item }: { item: (typeof workoutDaysData)[0] }) => <WorkoutDayContent data={item} />;

  const onScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const pageIndex = Math.round(contentOffset / viewSize);
    setCurrentDayIndex(pageIndex);
  };

  return (
    <>
      <Header
        title="Workouts"
        className="bg-secondary"
        leftComponent={
          <Avatar
            src={imageUrl}
            name={displayName}
            size="sm"
            link="/(mobile)/(profile)"
          />
        }
        rightComponents={[
          <Icon
            name="PlusCircle"
            size={24}
            href="/screens/add-workout"
            className="text-light-text dark:text-dark-text"
          />,
        ]}
      />
      <View className="w-full flex-row items-center justify-between border-b border-border bg-secondary px-global py-4">
        <Pressable
          onPress={handlePrevDay}
          disabled={currentDayIndex === 0}>
          <Icon
            name="ChevronLeft"
            size={20}
            className={currentDayIndex === 0 ? 'opacity-30' : ''}
          />
        </Pressable>
        <ThemedText className="text-base">{workoutDaysData[currentDayIndex].date}</ThemedText>
        <Pressable
          onPress={handleNextDay}
          disabled={currentDayIndex === workoutDaysData.length - 1}>
          <Icon
            name="ChevronRight"
            size={20}
            className={currentDayIndex === workoutDaysData.length - 1 ? 'opacity-30' : ''}
          />
        </Pressable>
      </View>

      <ThemedScroller className="flex-1 !px-0">
        {/* Horizontal scrollable chart section */}
        <FlatList
          ref={flatListRef}
          data={workoutDaysData}
          renderItem={renderWorkoutDay}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          initialScrollIndex={2}
          getItemLayout={(data, index) => {
            const { width } = require('react-native').Dimensions.get('window');
            return {
              length: width,
              offset: width * index,
              index,
            };
          }}
        />

        {/* Static content below */}

        <View className="mt-6 px-global">
          {/* Workout Program Quick Access */}
          <Section
            title="Workout Program"
            className="mb-6">
            <View className="mb-3 flex-row gap-3">
              <Link
                asChild
                href="/(mobile)/(workout)/dashboard">
                <Pressable className="flex-1 rounded-lg bg-highlight p-4">
                  <ThemedText className="mb-1 text-base font-medium text-background">Dashboard</ThemedText>
                  <ThemedText className="text-background/80 text-xs">View workouts & start training</ThemedText>
                </Pressable>
              </Link>
              <Link
                asChild
                href="/(mobile)/(workout)/history">
                <Pressable className="flex-1 rounded-lg bg-secondary p-4">
                  <ThemedText className="mb-1 text-base font-medium text-text">History</ThemedText>
                  <ThemedText className="text-subtext text-xs">Calendar & workout logs</ThemedText>
                </Pressable>
              </Link>
            </View>
            <View className="flex-row gap-3">
              <Link
                asChild
                href="/(mobile)/(workout)/setup">
                <Pressable className="flex-1 rounded-lg bg-secondary p-3">
                  <ThemedText className="text-center text-sm font-medium text-text">Setup Program</ThemedText>
                </Pressable>
              </Link>
              <Link
                asChild
                href="/(mobile)/(workout)/progress">
                <Pressable className="flex-1 rounded-lg bg-secondary p-3">
                  <ThemedText className="text-center text-sm font-medium text-text">Progress</ThemedText>
                </Pressable>
              </Link>
            </View>
          </Section>

          <Section
            title="Recent Workouts"
            className="mb-6">
            <CardScroller
              space={10}
              className="mt-2">
              {workouts.slice(0, 3).map((workout, index) => (
                <Link
                  key={workout.id}
                  asChild
                  href="/(mobile)/(workout)/detail">
                  <Pressable className="dark:bg-dark-secondary  mb-2 min-h-[150px] w-[150px] items-start justify-between rounded-lg bg-secondary p-4">
                    <ThemedText className="text-light-text dark:text-dark-text text-base font-medium">
                      {workout.title}
                    </ThemedText>
                    <ThemedText className="text-light-subtext dark:text-dark-subtext mt-auto text-xs">
                      {new Date(workout.date).toLocaleDateString()} • {workout.durationMin || 0} min
                    </ThemedText>
                  </Pressable>
                </Link>
              ))}
            </CardScroller>
          </Section>

          <Section
            title="Available Workouts"
            className="mb-6 mt-5">
            <FlatList
              className="mt-4"
              data={mockWorkouts}
              renderItem={renderWorkoutCard}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </Section>

          {/* Money Model Integration - Smart Offer Card for Workouts */}
          <Section className="mb-6">
            <SmartOfferCard
              placement="workout"
              variant="banner"
              className="mt-4"
            />
          </Section>
        </View>
      </ThemedScroller>
    </>
  );
}

const WorkoutDayContent = ({ data }: { data: (typeof workoutDaysData)[0] }) => {
  const { width } = require('react-native').Dimensions.get('window');

  return (
    <View
      style={{ width }}
      className="bg-secondary">
      <View className="px-global">
        <Section
          title={data.title}
          subtitle={data.subtitle}
          titleSize="3xl"
          className="mb-2 mt-10"
        />
        <WorkoutBarChart className="mb-10 mt-6" />
      </View>
    </View>
  );
};

const renderWorkoutCard = ({ item }: { item: Workout }) => {
  return (
    <Link
      asChild
      href="/(mobile)/(workout)/tracker">
      <Pressable className="dark:bg-dark-secondary  mb-4 flex-row items-center justify-between rounded-xl bg-secondary p-4">
        <View className="flex-1">
          <ThemedText className="text-light-text dark:text-dark-text mb-4 text-lg font-semibold">
            {item.name}
          </ThemedText>

          <View className="flex-row items-center gap-4">
            <View className="flex-row items-center">
              <Icon
                name="Clock"
                size={14}
                className="text-light-subtext dark:text-dark-subtext mr-1"
              />
              <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">{item.duration}</ThemedText>
            </View>

            <View className="flex-row items-center">
              <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">
                {item.exercises} exercises
              </ThemedText>
            </View>
          </View>
        </View>
        <Icon
          name="Play"
          size={17}
          className="dark:bg-dark-primary/60 h-10 w-10 items-center justify-center rounded-full bg-background"
        />
      </Pressable>
    </Link>
  );
};
