import React, { useState, useEffect, useMemo } from 'react';
import { View, Image } from 'react-native';

import { Chip } from '@/components/Chip';
import Header from '@/components/Header';
import Icon, { IconName } from '@/components/Icon';
import SkeletonLoader from '@/components/SkeletonLoader';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import List from '@/components/layout/List';
import ListItem from '@/components/layout/ListItem';

type NotificationType = 'workout' | 'achievement' | 'reminder' | 'social' | 'health' | 'all';

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: IconName;
  user?: User; // Optional user field for notifications from other users
}

export default function NotificationsScreen() {
  const [selectedType, setSelectedType] = useState<NotificationType>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [notificationsData, setNotificationsData] = useState<Notification[]>([]);

  // Define notifications data outside useEffect to avoid re-creation
  const notifications: Notification[] = useMemo(
    () => [
      {
        id: 1,
        type: 'workout',
        title: 'Workout Completed!',
        message: 'Great job! You completed your Upper Body Strength workout',
        time: '2 min ago',
        read: false,
        icon: 'CheckCircle',
      },
      {
        id: 2,
        type: 'achievement',
        title: 'New Achievement Unlocked!',
        message: "Congratulations! You've reached your 7-day workout streak",
        time: '1 hour ago',
        read: false,
        icon: 'Award',
      },
      {
        id: 3,
        type: 'social',
        title: 'Friend Activity',
        message: 'Sarah completed a 5K run and burned 320 calories',
        time: '2 hours ago',
        read: true,
        icon: 'Users',
        user: {
          id: 102,
          name: 'Sarah Miller',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
        },
      },
      {
        id: 4,
        type: 'reminder',
        title: 'Workout Reminder',
        message: 'Time for your scheduled HIIT Cardio workout',
        time: '3 hours ago',
        read: false,
        icon: 'Clock',
      },
      {
        id: 5,
        type: 'health',
        title: 'Hydration Goal Reached',
        message: "You've reached your daily water intake goal of 2.5L",
        time: '4 hours ago',
        read: true,
        icon: 'Droplets',
      },
      {
        id: 6,
        type: 'workout',
        title: 'Rest Day Scheduled',
        message: 'Tomorrow is your scheduled rest day. Great work this week!',
        time: '1 day ago',
        read: true,
        icon: 'Moon',
      },
      {
        id: 7,
        type: 'social',
        title: 'Challenge Invitation',
        message: 'Alex invited you to join the 30-Day Push-up Challenge',
        time: '1 day ago',
        read: false,
        icon: 'Target',
        user: {
          id: 101,
          name: 'Alex Thompson',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
      },
      {
        id: 8,
        type: 'achievement',
        title: 'Personal Record!',
        message: "New PR! You lifted 25% more weight in today's session",
        time: '2 days ago',
        read: true,
        icon: 'TrendingUp',
      },
      {
        id: 9,
        type: 'health',
        title: 'Sleep Goal Achieved',
        message: 'You got 8 hours of quality sleep last night',
        time: '2 days ago',
        read: true,
        icon: 'Moon',
      },
      {
        id: 10,
        type: 'reminder',
        title: 'Meal Prep Reminder',
        message: "Don't forget to log your lunch calories",
        time: '3 days ago',
        read: false,
        icon: 'Utensils',
      },
      {
        id: 11,
        type: 'social',
        title: 'Workout Buddy',
        message: 'Michael wants to be your workout partner for tomorrow',
        time: '4 days ago',
        read: true,
        icon: 'UserPlus',
        user: {
          id: 103,
          name: 'Michael Chen',
          avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        },
      },
      {
        id: 12,
        type: 'achievement',
        title: 'Weekly Goal Completed',
        message: "You've completed all 5 workouts this week!",
        time: '5 days ago',
        read: true,
        icon: 'Trophy',
      },
      {
        id: 13,
        type: 'health',
        title: 'Heart Rate Zone',
        message: 'You spent 45 minutes in your target heart rate zone',
        time: '6 days ago',
        read: true,
        icon: 'Heart',
      },
      {
        id: 14,
        type: 'reminder',
        title: 'Recovery Day',
        message: 'Consider taking a recovery day after 6 consecutive workouts',
        time: '1 week ago',
        read: false,
        icon: 'AlertCircle',
      },
    ],
    []
  );

  // Load notifications data with proper useEffect
  useEffect(() => {
    console.log('Loading notifications...');

    // Simulate API call with a delay
    const loadData = async () => {
      try {
        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Set notifications data
        setNotificationsData(notifications);

        // Turn off loading state
        setIsLoading(false);
        console.log('Notifications loaded successfully');
      } catch (error) {
        console.error('Error loading notifications:', error);
        setIsLoading(false); // Ensure loading state is turned off even if there's an error
      }
    };

    loadData();

    // Cleanup function
    return () => {
      console.log('Notifications component unmounted');
    };
  }, [notifications]); // Empty dependency array means this runs once on mount

  // Filter notifications based on selected type
  const filteredNotifications = notificationsData.filter((notification) =>
    selectedType === 'all' ? true : notification.type === selectedType
  );

  return (
    <>
      <Header
        showBackButton
        title="Notifications"
      />
      <View className="dark:bg-dark-primary flex-1 bg-background">
        <View className="flex-row gap-1 p-4">
          <Chip
            label="All"
            isSelected={selectedType === 'all'}
            onPress={() => setSelectedType('all')}
          />
          <Chip
            label="Workouts"
            isSelected={selectedType === 'workout'}
            onPress={() => setSelectedType('workout')}
          />
          <Chip
            label="Achievements"
            isSelected={selectedType === 'achievement'}
            onPress={() => setSelectedType('achievement')}
          />
          <Chip
            label="Reminders"
            isSelected={selectedType === 'reminder'}
            onPress={() => setSelectedType('reminder')}
          />
          <Chip
            label="Social"
            isSelected={selectedType === 'social'}
            onPress={() => setSelectedType('social')}
          />
          <Chip
            label="Health"
            isSelected={selectedType === 'health'}
            onPress={() => setSelectedType('health')}
          />
        </View>

        <ThemedScroller className="!px-0">
          {isLoading ? (
            <View className="p-4">
              <SkeletonLoader
                variant="list"
                count={6}
              />
            </View>
          ) : (
            <List variant="divided">
              {filteredNotifications.length > 0 ? (
                filteredNotifications.map((notification) => (
                  <View key={notification.id}>{renderNotification(notification)}</View>
                ))
              ) : (
                <View className="items-center p-8">
                  <ThemedText>No notifications found</ThemedText>
                </View>
              )}
            </List>
          )}
        </ThemedScroller>
      </View>
    </>
  );
}

export const renderNotification = (notification: Notification) => (
  <ListItem
    leading={
      notification.user ? (
        <Image
          source={{ uri: notification.user.avatar }}
          className="h-10 w-10 rounded-full"
        />
      ) : (
        <View className="/30 dark:bg-dark-subtext/30 h-10 w-10 items-center justify-center rounded-full bg-secondary">
          <Icon
            name={notification.icon}
            size={20}
          />
        </View>
      )
    }
    title={<ThemedText className="font-bold">{notification.title}</ThemedText>}
    subtitle={notification.message}
    trailing={
      <ThemedText className="text-light-subtext dark:text-dark-subtext text-xs">{notification.time}</ThemedText>
    }
    className={`p-4 ${!notification.read ? '' : ''}`}
  />
);
