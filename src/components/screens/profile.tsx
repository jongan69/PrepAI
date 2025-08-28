import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React, { useState, useEffect, useCallback } from 'react';
import { View, Pressable, Alert, RefreshControl } from 'react-native';

import Avatar from '@/components/Avatar';
import { Button } from '@/components/Button';
import Header from '@/components/Header';
import ListLink from '@/components/ListLink';
import ThemedScroller from '@/components/ThemeScroller';
import ThemeToggle from '@/components/ThemeToggle';
import ThemedText from '@/components/ThemedText';
import { useDatabase } from '@/contexts/DatabaseProvider';
import { useClerkUser } from '@/hooks/useClerkUser';
import { syncDatabase } from '@/lib/sync-database';
import { useLogout } from '@/utils/auth';
import { shadowPresets } from '@/utils/useShadow';

export default function ProfileScreen() {
  const { userId, isInitialized } = useDatabase();
  const { imageUrl, displayName, email } = useClerkUser();
  const { logout } = useLogout();
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [latestWeight, setLatestWeight] = useState<any>(null);
  const [healthProfile, setHealthProfile] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Load user data
  const loadUserData = async () => {
    if (isInitialized && userId) {
      try {
        const userData = await syncDatabase.getUser(userId);
        if (userData) {
          setUser(userData);
        }

        // Get latest weight
        const weightData = await syncDatabase.getLatestWeight(userId);
        if (weightData) {
          setLatestWeight(weightData);
        }

        // Get health profile
        const healthData = await syncDatabase.getHealthProfile(userId);
        if (healthData) {
          setHealthProfile(healthData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      }
    }
  };

  useEffect(() => {
    loadUserData();
  }, [isInitialized, userId]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await loadUserData();
    } catch (error) {
      console.error('Error refreshing profile data:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, [isInitialized, userId]);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout? Your data will remain safely stored and synced.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  return (
    <>
      <Header
        showBackButton
        title="Profile"
        rightComponents={[<ThemeToggle />]}
      />
      <ThemedScroller
        className="px-6 pt-4"
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#666"
            colors={['#007AFF']}
          />
        }>
        <View
          style={shadowPresets.medium}
          className=" mb-4 w-full flex-row rounded-2xl bg-secondary pb-10 pt-10 ">
          <View className="w-1/2 flex-col items-center">
            <Avatar
              src={imageUrl}
              name={displayName}
              size="xl"
            />
            <View className="mt-4 flex-1 items-center">
              <ThemedText className="text-2xl font-bold">{displayName}</ThemedText>
              <View className="flex flex-row items-center">
                <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">
                  {email || 'user@example.com'}
                </ThemedText>
              </View>
            </View>
          </View>
          <View className="w-1/2 flex-col items-start border-l border-border pl-10 ">
            <View className="flex-1 flex-col justify-center">
              <ThemedText className="text-xl font-bold">{latestWeight ? `${latestWeight.weight}kg` : '--'}</ThemedText>
              <ThemedText className="font-xs opacity-50">Current weight</ThemedText>
            </View>
            <View className="flex-1 flex-col justify-center">
              <ThemedText className="text-xl font-bold">{healthProfile?.targetCalories || '--'}</ThemedText>
              <ThemedText className="font-xs opacity-50">Daily calories</ThemedText>
            </View>
          </View>
        </View>
        <UpgradeToPlus />
        <View
          style={shadowPresets.medium}
          className="mt-4 rounded-2xl bg-secondary">
          <ListLink
            className="px-5"
            hasBorder
            title="Edit Profile"
            description="Update your personal information"
            icon="Edit"
            href="/(mobile)/(profile)/edit"
          />
          <ListLink
            className="px-5"
            hasBorder
            title="Settings"
            description="Manage your account settings"
            icon="Settings"
            href="/(mobile)/(profile)/(settings)"
          />
          <ListLink
            className="px-5"
            hasBorder
            title="Subscription"
            description="Renews July 25, 2025"
            icon="Trophy"
            href="/(mobile)/(profile)/subscription"
          />
          <ListLink
            className="px-5"
            hasBorder
            title="Help"
            description="Get help"
            icon="HelpCircle"
            href="/(mobile)/(profile)/help"
          />
          <ListLink
            className="px-5"
            title="Logout"
            description="Logout of your account"
            icon="LogOut"
            onPress={handleLogout}
          />
        </View>
      </ThemedScroller>
    </>
  );
}

const UpgradeToPlus = () => {
  return (
    <LinearGradient
      colors={['#FF6B6B', '#4ECDC4']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 2 }}
      style={[{ borderRadius: 10 }, shadowPresets.medium]}>
      <Link
        asChild
        href="/(mobile)/(profile)/subscription">
        <Pressable className="flex flex-row items-center justify-between p-6">
          <View>
            <ThemedText className="font-outfit-bold text-xl text-white">Go premium</ThemedText>
            <ThemedText className="text-sm text-white">Unlock all features</ThemedText>
          </View>
          <Button
            variant="outline"
            href="/(mobile)/(profile)/subscription"
            rounded="xl"
            title="Upgrade now"
            textClassName="text-white"
            className="border-white"
          />
        </Pressable>
      </Link>
    </LinearGradient>
  );
};
