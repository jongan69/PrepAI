import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import Section from '@/components/layout/Section';

interface CalendarDay {
  date: number;
  hasWorkout: boolean;
  workoutType?: 'A' | 'B' | 'C';
  isSelected: boolean;
  isToday: boolean;
}

export default function WorkoutHistoryScreen() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar' | 'notes'>('calendar');
  const [selectedDate, setSelectedDate] = useState(16);

  // Mock calendar data for current month
  const currentMonthDays: CalendarDay[] = Array.from({ length: 31 }, (_, i) => ({
    date: i + 1,
    hasWorkout: [3, 5, 8, 10, 12, 15, 16, 18, 20, 22, 25, 27, 29].includes(i + 1),
    workoutType: [3, 8, 15, 22, 29].includes(i + 1)
      ? 'A'
      : [5, 12, 18, 25].includes(i + 1)
        ? 'B'
        : [10, 20, 27].includes(i + 1)
          ? 'C'
          : undefined,
    isSelected: i + 1 === selectedDate,
    isToday: i + 1 === 16,
  }));

  // Mock calendar data for September 2025
  const septemberDays: CalendarDay[] = Array.from({ length: 30 }, (_, i) => ({
    date: i + 1,
    hasWorkout: [1, 3, 6, 8, 10, 13, 15, 17, 20, 22, 24, 27, 29].includes(i + 1),
    workoutType: [1, 8, 15, 22, 29].includes(i + 1)
      ? 'A'
      : [3, 10, 17, 24].includes(i + 1)
        ? 'B'
        : [6, 13, 20, 27].includes(i + 1)
          ? 'C'
          : undefined,
    isSelected: false,
    isToday: false,
  }));

  const renderCalendar = (days: CalendarDay[], monthName: string) => (
    <View className="mb-8">
      <ThemedText className="mb-4 text-center text-lg font-semibold">{monthName}</ThemedText>

      {/* Day headers */}
      <View className="mb-2 flex-row justify-around">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
          <View key={index} className="h-8 w-8 items-center justify-center">
            <ThemedText className="text-subtext text-xs">{day}</ThemedText>
          </View>
        ))}
      </View>

      {/* Calendar grid */}
      <View className="flex-row flex-wrap justify-around">
        {days.map((day, index) => (
          <Pressable
            key={index}
            onPress={() => setSelectedDate(day.date)}
            className={`h-8 w-8 items-center justify-center rounded-full ${
              day.isSelected
                ? 'bg-highlight'
                : day.hasWorkout
                  ? 'border border-highlight bg-secondary'
                  : 'bg-transparent'
            }`}>
            <ThemedText
              className={`text-xs ${
                day.isSelected
                  ? 'font-semibold text-background'
                  : day.hasWorkout
                    ? 'font-medium text-highlight'
                    : 'text-text'
              }`}>
              {day.date}
            </ThemedText>
            {day.hasWorkout && !day.isSelected && (
              <View className="absolute -bottom-1 h-1 w-1 rounded-full bg-highlight" />
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );

  const renderViewModeToggle = () => (
    <View className="mb-6 flex-row rounded-lg bg-secondary p-1">
      {[
        { key: 'list', label: 'List', icon: 'List' },
        { key: 'calendar', label: 'Calendar', icon: 'Calendar' },
        { key: 'notes', label: 'Notes', icon: 'FileText' },
      ].map((mode) => (
        <Pressable
          key={mode.key}
          onPress={() => setViewMode(mode.key as any)}
          className={`flex-1 flex-row items-center justify-center rounded-md py-2 ${
            viewMode === mode.key ? 'bg-background' : 'bg-transparent'
          }`}>
          <Icon
            name={mode.icon as any}
            size={16}
            className={`mr-2 ${viewMode === mode.key ? 'text-highlight' : 'text-subtext'}`}
          />
          <ThemedText
            className={`text-sm ${
              viewMode === mode.key ? 'font-medium text-highlight' : 'text-subtext'
            }`}>
            {mode.label}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );

  return (
    <>
      <Header title="History" className="bg-secondary" showBackButton />

      <ThemedScroller className="flex-1">
        <View className="p-global">
          {renderViewModeToggle()}

          {viewMode === 'calendar' && (
            <>
              {renderCalendar(currentMonthDays, 'August 2025')}
              {renderCalendar(septemberDays, 'Sep 2025')}
            </>
          )}

          {viewMode === 'list' && (
            <Section title="Recent Workouts" className="mb-6">
              {[
                { date: 'Today', workout: 'Workout B', exercises: 5 },
                { date: 'Yesterday', workout: 'Workout A', exercises: 5 },
                { date: '2 days ago', workout: 'Workout C', exercises: 5 },
                { date: '3 days ago', workout: 'Workout B', exercises: 5 },
                { date: '1 week ago', workout: 'Workout A', exercises: 5 },
              ].map((item, index) => (
                <Link key={index} asChild href="/screens/workout-detail">
                  <Pressable className="mb-3 flex-row items-center justify-between rounded-lg bg-secondary p-4">
                    <View>
                      <ThemedText className="text-base font-medium">{item.workout}</ThemedText>
                      <ThemedText className="text-subtext text-sm">{item.date}</ThemedText>
                    </View>
                    <View className="flex-row items-center">
                      <ThemedText className="text-subtext mr-2 text-sm">
                        {item.exercises} exercises
                      </ThemedText>
                      <Icon name="ChevronRight" size={16} className="text-subtext" />
                    </View>
                  </Pressable>
                </Link>
              ))}
            </Section>
          )}

          {viewMode === 'notes' && (
            <Section title="Workout Notes" className="mb-6">
              <View className="rounded-lg bg-secondary p-4">
                <ThemedText className="text-subtext text-sm">
                  No workout notes yet. Add notes during your workouts to track progress and
                  observations.
                </ThemedText>
              </View>
            </Section>
          )}
        </View>
      </ThemedScroller>
    </>
  );
}
