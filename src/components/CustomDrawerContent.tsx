import { Link } from 'expo-router';
import { View, Text, Pressable, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Avatar from './Avatar';
import Icon, { IconName } from './Icon';
import ThemedScroller from './ThemeScroller';
import ThemeToggle from './ThemeToggle';
import ThemedText from './ThemedText';
import { useClerkUser } from '@/hooks/useClerkUser';

export default function CustomDrawerContent() {
  const insets = useSafeAreaInsets();
  const { imageUrl, displayName, initials } = useClerkUser();
  return (
    <ThemedScroller className="flex-1 bg-secondary p-8 " style={{ paddingTop: insets.top }}>
      <ThemedText className="mb-8 mt-4 font-outfit-bold text-2xl">
        PrepAI<Text className="text-highlight">.</Text>
      </ThemedText>

      {/* User Profile Section */}
      <Link href="/(mobile)/(profile)" asChild>
        <Pressable className="mb-8 flex-row items-center rounded-xl border-b border-border   py-10">
          <Avatar src={imageUrl} name={displayName} size="md" />
          <View className="ml-3">
            <ThemedText className="text-light-text dark:text-dark-text font-semibold">
              {displayName}
            </ThemedText>
            <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">
              72kg • Goal: 70kg
            </ThemedText>
          </View>
        </Pressable>
      </Link>

      <View className="mb-6 flex-col border-b border-border pb-6">
        <NavItem href="/(mobile)/(index)/" icon="Home" label="Home" description="Daily overview" />
        <NavItem
          href="/(mobile)/(index)/workouts"
          icon="Dumbbell"
          label="Workouts"
          description="Exercise routines"
        />
        <NavItem
          href="/(mobile)/(index)/meals"
          icon="UtensilsCrossed"
          label="Meals"
          description="Food tracking"
        />
        <NavItem
          href="/(mobile)/(index)/progress"
          icon="TrendingUp"
          label="Progress"
          description="Charts & stats"
        />
        <NavItem
          href="/(mobile)/sync-debug"
          icon="TrendingUp"
          label="Sync"
          description="Sync your data"
        />
      </View>

      <View className="flex-row items-center justify-between">
        <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">
          Version 1.0.0
        </ThemedText>
        <ThemeToggle />
      </View>
    </ThemedScroller>
  );
}

type NavItemProps = {
  href: string;
  icon: IconName;
  label: string;
  className?: string;
  description?: string;
};

export const NavItem = ({ href, icon, label, description }: NavItemProps) => (
  <Link href={href as any} asChild>
    <TouchableOpacity className="flex-row items-center py-3">
      <View className="h-14 w-14 flex-row items-center justify-center rounded-xl   bg-background">
        <Icon name={icon} size={18} className="" />
      </View>
      <View className="ml-4 flex-1 ">
        {label && <ThemedText className="text-lg font-bold ">{label}</ThemedText>}
        {description && <ThemedText className="text-xs opacity-50">{description}</ThemedText>}
      </View>
    </TouchableOpacity>
  </Link>
);
