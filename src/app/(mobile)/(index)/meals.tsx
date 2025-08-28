import { Link } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Pressable, FlatList } from 'react-native';

import Avatar from '@/components/Avatar';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ProgressBar from '@/components/ProgressBar';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import Section from '@/components/layout/Section';
import SmartOfferCard from '@/components/SmartOfferCard';
import useThemeColors from '@/contexts/ThemeColors';
import { shadowPresets } from '@/utils/useShadow';
import { useDatabase } from '@/contexts/DatabaseProvider';
import { useClerkUser } from '@/hooks/useClerkUser';
import { useMeals } from '@/hooks/useLiveData';

// Sample data for different days
const daysData = [
  {
    id: 0,
    date: 'TUESDAY',
    goal: 2420,
    food: 920,
    exercise: 1200,
    remaining: 1700,
    meals: {
      breakfast: {
        calories: 380,
        items: [
          { name: 'Oatmeal with fruits', calories: 250 },
          { name: 'Coffee', calories: 130 },
        ],
      },
      lunch: {
        calories: 540,
        items: [
          { name: 'Turkey sandwich', calories: 340, isHighInProtein: true },
          { name: 'Side salad', calories: 200 },
        ],
      },
    },
  },
  {
    id: 1,
    date: 'YESTERDAY',
    goal: 2420,
    food: 820,
    exercise: 1600,
    remaining: 1400,
    meals: {
      breakfast: {
        calories: 420,
        items: [
          { name: 'Greek yogurt with berries', calories: 180 },
          { name: 'Whole grain toast', calories: 140, isHighInProtein: true },
          { name: 'Banana', calories: 100 },
        ],
      },
      lunch: {
        calories: 580,
        items: [
          { name: 'Grilled chicken salad', calories: 320, isHighInProtein: true },
          { name: 'Quinoa', calories: 160 },
          { name: 'Avocado', calories: 100 },
        ],
      },
      dinner: {
        calories: 650,
        items: [
          { name: 'Salmon fillet', calories: 280 },
          { name: 'Roasted vegetables', calories: 120 },
          { name: 'Brown rice', calories: 150 },
          { name: 'Mixed greens', calories: 100 },
        ],
      },
      snack: {
        calories: 180,
        items: [
          { name: 'Almonds', calories: 120 },
          { name: 'Apple', calories: 60 },
        ],
      },
    },
  },
  {
    id: 2,
    date: 'TODAY',
    goal: 2420,
    food: 820,
    exercise: 1600,
    remaining: 1400,
    meals: {
      breakfast: {
        calories: 420,
        items: [
          { name: 'Greek yogurt with berries', calories: 180 },
          { name: 'Whole grain toast', calories: 140, isHighInProtein: true },
          { name: 'Banana', calories: 100 },
        ],
      },
      lunch: {
        calories: 580,
        items: [
          { name: 'Grilled chicken salad', calories: 320, isHighInProtein: true },
          { name: 'Quinoa', calories: 160 },
          { name: 'Avocado', calories: 100 },
        ],
      },
      dinner: {
        calories: 650,
        items: [
          { name: 'Salmon fillet', calories: 280 },
          { name: 'Roasted vegetables', calories: 120 },
          { name: 'Brown rice', calories: 150 },
          { name: 'Mixed greens', calories: 100 },
        ],
      },
      snack: {
        calories: 180,
        items: [
          { name: 'Almonds', calories: 120 },
          { name: 'Apple', calories: 60 },
        ],
      },
    },
  },
];

export default function MealsScreen() {
  const { userId } = useDatabase();
  const { imageUrl, displayName } = useClerkUser();
  const { meals, totalCalories, macros, isLoading } = useMeals(userId?.toString() || '');
  const [currentDayIndex, setCurrentDayIndex] = useState(1); // Start with TODAY
  const flatListRef = useRef<FlatList>(null);

  const handlePrevDay = () => {
    if (currentDayIndex > 0) {
      const newIndex = currentDayIndex - 1;
      setCurrentDayIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  const handleNextDay = () => {
    if (currentDayIndex < daysData.length - 1) {
      const newIndex = currentDayIndex + 1;
      setCurrentDayIndex(newIndex);
      flatListRef.current?.scrollToIndex({ index: newIndex, animated: true });
    }
  };

  const renderDay = ({ item }: { item: (typeof daysData)[0] }) => <DayContent data={item} />;

  const onScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const pageIndex = Math.round(contentOffset / viewSize);
    setCurrentDayIndex(pageIndex);
  };

  return (
    <>
      <Header
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
            href="/(mobile)/(modals)/add-meal"
            size={24}
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
        <ThemedText className="text-base">{daysData[currentDayIndex].date}</ThemedText>
        <Pressable
          onPress={handleNextDay}
          disabled={currentDayIndex === daysData.length - 1}>
          <Icon
            name="ChevronRight"
            size={20}
            className={currentDayIndex === daysData.length - 1 ? 'opacity-30' : ''}
          />
        </Pressable>
      </View>
      <View className="flex-1 bg-secondary">
        <FlatList
          ref={flatListRef}
          data={daysData}
          renderItem={renderDay}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onScrollEnd}
          initialScrollIndex={1}
          getItemLayout={(data, index) => {
            const { width } = require('react-native').Dimensions.get('window');
            return {
              length: width,
              offset: width * index,
              index,
            };
          }}
        />
      </View>
    </>
  );
}

const DayContent = ({ data }: { data: (typeof daysData)[0] }) => {
  const { width } = require('react-native').Dimensions.get('window');

  return (
    <ThemedScroller
      className="flex-1 bg-background !px-0"
      style={{ width }}>
      <TopPart data={data} />
      <View className="px-global">
        {data.meals.breakfast && (
          <FoodCard
            title="Breakfast"
            calories={data.meals.breakfast.calories}
            items={data.meals.breakfast.items}
          />
        )}
        {data.meals.lunch && (
          <FoodCard
            title="Lunch"
            calories={data.meals.lunch.calories}
            items={data.meals.lunch.items}
          />
        )}
        {data.meals.dinner && (
          <FoodCard
            title="Dinner"
            calories={data.meals.dinner.calories}
            items={data.meals.dinner.items}
          />
        )}
        {data.meals.snack && (
          <FoodCard
            title="Snack"
            calories={data.meals.snack.calories}
            items={data.meals.snack.items}
          />
        )}

        {/* Money Model Integration - Smart Offer Card for Meals */}
        <View className="mt-6">
          <SmartOfferCard
            placement="meal"
            variant="compact"
            className="mb-4"
          />
        </View>
      </View>
    </ThemedScroller>
  );
};

const TopPart = ({ data }: { data: (typeof daysData)[0] }) => {
  const percentage = Math.round(((data.goal - data.remaining) / data.goal) * 100);

  return (
    <View className="mb-global bg-secondary">
      <View className="px-global">
        <Section
          title="Calories remaining"
          titleSize="2xl"
          className="mt-10"
        />

        <ProgressBar
          percentage={percentage}
          height={5}
          className="my-10"
        />
        <View className="mb-10 flex-row items-center justify-between">
          <View className="items-center">
            <ThemedText className="text-xl font-bold">{data.goal.toLocaleString()}</ThemedText>
            <ThemedText className="text-sm">Goal</ThemedText>
          </View>
          <ThemedText className="text-xl">-</ThemedText>
          <View className="items-center">
            <ThemedText className="text-xl font-bold">{data.food.toLocaleString()}</ThemedText>
            <ThemedText className="text-sm">Food</ThemedText>
          </View>
          <ThemedText className="text-xl">+</ThemedText>
          <View className="items-center">
            <ThemedText className="text-xl font-bold">{data.exercise.toLocaleString()}</ThemedText>
            <ThemedText className="text-sm">Exercise</ThemedText>
          </View>
          <ThemedText className="text-xl">=</ThemedText>
          <View className="items-center">
            <ThemedText className="text-xl font-bold">{data.remaining.toLocaleString()}</ThemedText>
            <ThemedText className="text-sm">Remaining</ThemedText>
          </View>
        </View>
      </View>
    </View>
  );
};

const FoodCard = (props: any) => {
  const colors = useThemeColors();

  if (props.calories === 0) {
    return (
      <View
        style={shadowPresets.large}
        className="mb-4 rounded-xl bg-secondary">
        <View className="flex-row items-center justify-between border-b border-border p-4">
          <ThemedText className="text-lg font-bold">{props.title}</ThemedText>
          <ThemedText className="text-sm">0</ThemedText>
        </View>
        <Link
          asChild
          href="/(mobile)/(modals)/add-meal">
          <Pressable className="flex-row items-center justify-between rounded-b-xl bg-background p-4">
            <ThemedText className="text-sm font-bold uppercase !text-sky-500">Add food</ThemedText>
            <Icon
              name="PlusCircle"
              size={20}
              className="opacity-50"
              color={colors.highlight}
            />
          </Pressable>
        </Link>
      </View>
    );
  }

  return (
    <View
      style={shadowPresets.large}
      className="mb-4 rounded-xl bg-secondary">
      <View className="flex-row items-center justify-between border-b border-border p-4">
        <ThemedText className="text-lg font-bold">{props.title}</ThemedText>
        <ThemedText className="text-sm">{props.calories}</ThemedText>
      </View>
      {props.items?.map((item: any, index: number) => (
        <FoodItem
          key={index}
          name={item.name}
          calories={item.calories}
          isHighInProtein={item.isHighInProtein}
        />
      ))}
      <Link
        asChild
        href="/(mobile)/(modals)/add-meal">
        <Pressable className="flex-row items-center justify-between rounded-b-xl bg-background p-4">
          <ThemedText className="text-sm font-bold uppercase !text-sky-500">Add food</ThemedText>
          <Icon
            name="PlusCircle"
            size={20}
            className="opacity-50"
            color={colors.highlight}
          />
        </Pressable>
      </Link>
    </View>
  );
};

const FoodItem = (props: any) => {
  return (
    <View className="border-b border-border p-4">
      <View className="w-full">
        <View className="flex-row items-center justify-between">
          <ThemedText className="text-base">{props.name}</ThemedText>
          <ThemedText className="text-sm opacity-50">{props.calories}</ThemedText>
        </View>
        {props.isHighInProtein && (
          <View className="mt-1 flex-row items-center rounded-lg bg-background p-2">
            <View className="h-6 w-6 items-center justify-center rounded-lg bg-highlight">
              <Icon
                name="Check"
                size={12}
                color="white"
              />
            </View>
            <ThemedText className="ml-2 text-xs">This food is high in protein</ThemedText>
          </View>
        )}
      </View>
    </View>
  );
};
