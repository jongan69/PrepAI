import React, { useState } from 'react';
import { View, Alert } from 'react-native';

import { Button } from '@/components/Button';
import Header from '@/components/Header';
import ListLink from '@/components/ListLink';
import ThemedScroller from '@/components/ThemeScroller';
import ThemeToggle from '@/components/ThemeToggle';
import ThemedText from '@/components/ThemedText';
import Switch from '@/components/forms/SimpleSwitch';
import { Section } from '@/components/layout/Section';
import { useLogout } from '@/utils/auth';

export default function SettingsScreen() {
  const { logout } = useLogout();

  // Settings state
  const [notifications, setNotifications] = useState({
    workouts: true,
    meals: true,
    water: true,
    weight: true,
    achievements: true,
    weeklyReports: true,
  });

  const [privacy, setPrivacy] = useState({
    shareProgress: false,
    allowAnalytics: true,
    locationServices: true,
  });

  const [appSettings, setAppSettings] = useState({
    autoSync: true,
    hapticFeedback: true,
    soundEffects: false,
  });

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

  const handleDeleteAccount = () => {
    Alert.alert('Delete Account', 'This action cannot be undone. All your data will be permanently deleted.', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          console.log('Account deletion requested');
        },
      },
    ]);
  };

  const handleComingSoon = (feature: string) => {
    Alert.alert('Coming Soon', `${feature} will be available in a future update!`);
  };

  return (
    <>
      <Header
        showBackButton
        title="Settings"
        rightComponents={[<ThemeToggle />]}
      />
      <ThemedScroller
        className="px-6 pt-4"
        contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Quick Actions */}
        <View className="mb-6 rounded-2xl bg-secondary p-4">
          <ThemedText className="mb-3 text-lg font-semibold">Quick Actions</ThemedText>
          <View className="flex-row gap-3">
            <Button
              variant="outline"
              title="Edit Profile"
              href="/(mobile)/(profile)/edit"
              className="flex-1"
              iconStart="User"
            />
            <Button
              variant="outline"
              title="Subscription"
              href="/(mobile)/(profile)/subscription"
              className="flex-1"
              iconStart="Trophy"
            />
          </View>
        </View>

        {/* Notifications */}
        <Section
          title="Notifications"
          icon="Bell"
          titleSize="lg"
          className="mb-6">
          <View className="rounded-2xl bg-secondary p-4">
            <Switch
              label="Workout Reminders"
              description="Get notified about scheduled workouts"
              icon="Dumbbell"
              value={notifications.workouts}
              onChange={(value) => setNotifications((prev) => ({ ...prev, workouts: value }))}
              className="mb-4"
            />
            <Switch
              label="Meal Tracking"
              description="Reminders to log your meals"
              icon="Utensils"
              value={notifications.meals}
              onChange={(value) => setNotifications((prev) => ({ ...prev, meals: value }))}
              className="mb-4"
            />
            <Switch
              label="Water Intake"
              description="Stay hydrated with water reminders"
              icon="Droplets"
              value={notifications.water}
              onChange={(value) => setNotifications((prev) => ({ ...prev, water: value }))}
              className="mb-4"
            />
            <Switch
              label="Weight Tracking"
              description="Weekly weight tracking reminders"
              icon="Scale"
              value={notifications.weight}
              onChange={(value) => setNotifications((prev) => ({ ...prev, weight: value }))}
              className="mb-4"
            />
            <Switch
              label="Achievements"
              description="Celebrate your fitness milestones"
              icon="Award"
              value={notifications.achievements}
              onChange={(value) => setNotifications((prev) => ({ ...prev, achievements: value }))}
              className="mb-4"
            />
            <Switch
              label="Weekly Reports"
              description="Get your weekly progress summary"
              icon="BarChart3"
              value={notifications.weeklyReports}
              onChange={(value) => setNotifications((prev) => ({ ...prev, weeklyReports: value }))}
            />
          </View>
        </Section>

        {/* Privacy & Data */}
        <Section
          title="Privacy & Data"
          icon="Shield"
          titleSize="lg"
          className="mb-6">
          <View className="rounded-2xl bg-secondary p-4">
            <Switch
              label="Share Progress"
              description="Allow friends to see your fitness progress"
              icon="Users"
              value={privacy.shareProgress}
              onChange={(value) => setPrivacy((prev) => ({ ...prev, shareProgress: value }))}
              className="mb-4"
            />
            <Switch
              label="Analytics"
              description="Help improve the app with anonymous data"
              icon="BarChart"
              value={privacy.allowAnalytics}
              onChange={(value) => setPrivacy((prev) => ({ ...prev, allowAnalytics: value }))}
              className="mb-4"
            />
            <Switch
              label="Location Services"
              description="Use location for workout tracking"
              icon="MapPin"
              value={privacy.locationServices}
              onChange={(value) => setPrivacy((prev) => ({ ...prev, locationServices: value }))}
            />
          </View>
        </Section>

        {/* App Settings */}
        <Section
          title="App Settings"
          icon="Settings"
          titleSize="lg"
          className="mb-6">
          <View className="rounded-2xl bg-secondary p-4">
            <Switch
              label="Auto Sync"
              description="Automatically sync data in the background"
              icon="Cloud"
              value={appSettings.autoSync}
              onChange={(value) => setAppSettings((prev) => ({ ...prev, autoSync: value }))}
              className="mb-4"
            />
            <Switch
              label="Haptic Feedback"
              description="Vibrate on interactions"
              icon="Smartphone"
              value={appSettings.hapticFeedback}
              onChange={(value) => setAppSettings((prev) => ({ ...prev, hapticFeedback: value }))}
              className="mb-4"
            />
            <Switch
              label="Sound Effects"
              description="Play sounds for achievements and actions"
              icon="Volume2"
              value={appSettings.soundEffects}
              onChange={(value) => setAppSettings((prev) => ({ ...prev, soundEffects: value }))}
            />
          </View>
        </Section>

        {/* Connected Devices */}
        <Section
          title="Connected Devices"
          icon="Watch"
          titleSize="lg"
          className="mb-6">
          <View className="rounded-2xl bg-secondary">
            <ListLink
              className="px-5"
              hasBorder
              title="Manage Devices"
              description="Apple Watch, Garmin, Fitbit"
              icon="Watch"
              href="devices"
            />
            <ListLink
              className="px-5"
              hasBorder
              title="Health Apps"
              description="Apple Health, Google Fit"
              icon="Heart"
              onPress={() => handleComingSoon('Health Apps Integration')}
            />
            <ListLink
              className="px-5"
              title="Sync Settings"
              description="Configure data synchronization"
              icon="RefreshCw"
              onPress={() => handleComingSoon('Sync Settings')}
            />
          </View>
        </Section>

        {/* Data Management */}
        <Section
          title="Data Management"
          icon="Database"
          titleSize="lg"
          className="mb-6">
          <View className="rounded-2xl bg-secondary">
            <ListLink
              className="px-5"
              hasBorder
              title="Export Data"
              description="Download your health data"
              icon="Download"
              onPress={() => handleComingSoon('Data Export')}
            />
            <ListLink
              className="px-5"
              hasBorder
              title="Backup & Restore"
              description="Manage your data backups"
              icon="Save"
              onPress={() => handleComingSoon('Backup & Restore')}
            />
            <ListLink
              className="px-5"
              title="Clear Cache"
              description="Free up storage space"
              icon="Trash"
              onPress={() => {
                Alert.alert('Clear Cache', 'Cache cleared successfully!');
              }}
            />
          </View>
        </Section>

        {/* Support & Help */}
        <Section
          title="Support & Help"
          icon="HelpCircle"
          titleSize="lg"
          className="mb-6">
          <View className="rounded-2xl bg-secondary">
            <ListLink
              className="px-5"
              hasBorder
              title="Help Center"
              description="Find answers to common questions"
              icon="HelpCircle"
              href="/(mobile)/(profile)/help"
            />
            <ListLink
              className="px-5"
              hasBorder
              title="Contact Support"
              description="Get help from our team"
              icon="MessageCircle"
              onPress={() => handleComingSoon('Contact Support')}
            />
            <ListLink
              className="px-5"
              hasBorder
              title="Feedback"
              description="Share your thoughts with us"
              icon="MessageSquare"
              onPress={() => handleComingSoon('Feedback')}
            />
            <ListLink
              className="px-5"
              hasBorder
              title="Rate App"
              description="Rate us on the App Store"
              icon="Star"
              onPress={() => handleComingSoon('App Rating')}
            />
            <ListLink
              className="px-5"
              hasBorder
              title="About"
              description="Version 1.0.0 • Terms & Privacy"
              icon="Info"
              onPress={() => handleComingSoon('About')}
            />
          </View>
        </Section>

        {/* Account Actions */}
        <Section
          title="Account"
          icon="User"
          titleSize="lg"
          className="mb-6">
          <View className="rounded-2xl bg-secondary">
            <ListLink
              className="px-5"
              hasBorder
              title="Data & Privacy"
              description="Control your data and privacy settings"
              icon="Shield"
              onPress={() => handleComingSoon('Data & Privacy Settings')}
            />
            <ListLink
              className="px-5"
              title="Delete Account"
              description="Permanently delete your account"
              icon="Trash2"
              onPress={handleDeleteAccount}
            />
          </View>
        </Section>

        {/* Logout Section */}
        <Section className="mb-8">
          <Button
            variant="outline"
            title="Logout"
            onPress={handleLogout}
            className="border-red-500"
            textClassName="text-red-500"
            iconStart="LogOut"
          />
        </Section>
      </ThemedScroller>
    </>
  );
}
