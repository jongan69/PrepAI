import * as ImagePicker from 'expo-image-picker';
import { nanoid } from 'nanoid/non-secure';
import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Pressable, Alert } from 'react-native';

import { Button } from '@/components/Button';
import { Chip } from '@/components/Chip';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import { DatePicker } from '@/components/forms/DatePicker';
import Input from '@/components/forms/Input';
import Selectable from '@/components/forms/Selectable';
import Section from '@/components/layout/Section';
import { useDatabase } from '@/contexts/DatabaseProvider';
import { useClerkUser } from '@/hooks/useClerkUser';
import { useUser } from '@/hooks/useLiveData';
import { useDataStore } from '@/stores/data-store';
import { database } from '@/lib/database';

interface Goal {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'fitness' | 'nutrition' | 'lifestyle';
}

const availableGoals: Goal[] = [
  {
    id: 'lose-weight',
    title: 'Lose Weight',
    description: 'Shed pounds and get leaner',
    icon: 'TrendingDown',
    category: 'fitness',
  },
  {
    id: 'gain-muscle',
    title: 'Build Muscle',
    description: 'Increase strength and muscle mass',
    icon: 'Dumbbell',
    category: 'fitness',
  },
  {
    id: 'maintain-weight',
    title: 'Maintain Weight',
    description: 'Keep your current weight stable',
    icon: 'Minus',
    category: 'fitness',
  },
  {
    id: 'improve-fitness',
    title: 'Improve Fitness',
    description: 'Boost overall fitness and endurance',
    icon: 'Heart',
    category: 'fitness',
  },
  {
    id: 'eat-healthier',
    title: 'Eat Healthier',
    description: 'Improve your nutrition habits',
    icon: 'Apple',
    category: 'nutrition',
  },
  {
    id: 'drink-more-water',
    title: 'Drink More Water',
    description: 'Stay hydrated throughout the day',
    icon: 'Droplets',
    category: 'nutrition',
  },
  {
    id: 'reduce-stress',
    title: 'Reduce Stress',
    description: 'Manage stress and improve mental health',
    icon: 'Brain',
    category: 'lifestyle',
  },
  {
    id: 'better-sleep',
    title: 'Better Sleep',
    description: 'Improve sleep quality and duration',
    icon: 'Moon',
    category: 'lifestyle',
  },
  {
    id: 'increase-energy',
    title: 'More Energy',
    description: 'Boost daily energy levels',
    icon: 'Zap',
    category: 'lifestyle',
  },
];

export default function EditProfileScreen() {
  const { user, imageUrl, firstName, lastName, email } = useClerkUser();
  const { userId } = useDatabase();
  const { healthProfile } = useUser(userId || '');
  const { goals } = useDataStore();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Personal info from Clerk
  const [formData, setFormData] = useState({
    firstName: firstName || '',
    lastName: lastName || '',
    email: email || '',
  });

  // Health profile data
  const [healthData, setHealthData] = useState({
    gender: healthProfile?.gender as 'Male' | 'Female' | undefined,
    birthday: healthProfile?.birthday ? new Date(healthProfile.birthday) : new Date('1990-01-01'),
    height: {
      value: healthProfile?.height || 170,
      unit: (healthProfile?.heightUnit as 'cm' | 'ft') || 'cm',
    },
    weight: {
      value: healthProfile?.weight || 70,
      unit: (healthProfile?.weightUnit as 'kg' | 'lb') || 'kg',
    },
    weightTrend:
      healthProfile?.fitnessGoal === 'gain_weight'
        ? 'up'
        : healthProfile?.fitnessGoal === 'lose_weight'
          ? 'down'
          : healthProfile?.fitnessGoal === 'maintain'
            ? 'stable'
            : ('not-sure' as 'up' | 'down' | 'stable' | 'not-sure'),
    exerciseFrequency:
      healthProfile?.activityLevel === 'sedentary'
        ? '0'
        : healthProfile?.activityLevel === 'light'
          ? '1-3'
          : healthProfile?.activityLevel === 'moderate'
            ? '4-6'
            : ('7+' as '0' | '1-3' | '4-6' | '7+'),
  });

  // Goals data
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  // Unit preferences
  const [unitPreferences, setUnitPreferences] = useState({
    heightUnit: healthProfile?.heightUnit || 'cm',
    weightUnit: healthProfile?.weightUnit || 'kg',
  });

  // Update form data when user data changes
  useEffect(() => {
    setFormData({
      firstName: firstName || '',
      lastName: lastName || '',
      email: email || '',
    });
  }, [firstName, lastName, email]);

  // Update health data when health profile changes
  useEffect(() => {
    if (healthProfile) {
      setHealthData({
        gender: healthProfile.gender as 'Male' | 'Female' | undefined,
        birthday: healthProfile.birthday ? new Date(healthProfile.birthday) : new Date('1990-01-01'),
        height: {
          value: healthProfile.height || 170,
          unit: (healthProfile.heightUnit as 'cm' | 'ft') || 'cm',
        },
        weight: {
          value: healthProfile.weight || 70,
          unit: (healthProfile.weightUnit as 'kg' | 'lb') || 'kg',
        },
        weightTrend:
          healthProfile.fitnessGoal === 'gain_weight'
            ? 'up'
            : healthProfile.fitnessGoal === 'lose_weight'
              ? 'down'
              : healthProfile.fitnessGoal === 'maintain'
                ? 'stable'
                : 'not-sure',
        exerciseFrequency:
          healthProfile.activityLevel === 'sedentary'
            ? '0'
            : healthProfile.activityLevel === 'light'
              ? '1-3'
              : healthProfile.activityLevel === 'moderate'
                ? '4-6'
                : '7+',
      });
    }
  }, [healthProfile]);

  // Update goals when goals data changes
  useEffect(() => {
    if (goals && goals.length > 0) {
      setSelectedGoals(goals.map((goal) => goal.type));
    }
  }, [goals]);

  // Update unit preferences when health profile changes
  useEffect(() => {
    setUnitPreferences({
      heightUnit: healthProfile?.heightUnit || 'cm',
      weightUnit: healthProfile?.weightUnit || 'kg',
    });
  }, [healthProfile]);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) => (prev.includes(goalId) ? prev.filter((id) => id !== goalId) : [...prev, goalId]));
  };

  const onPickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.1,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        const base64 = result.assets[0].base64;
        const mimeType = result.assets[0].mimeType;

        const image = `data:${mimeType};base64,${base64}`;

        setIsUploading(true);
        await user?.setProfileImage({
          file: image,
        });

        // Update local state to show the new image
        setProfileImage(result.assets[0].uri);
        Alert.alert('Success', 'Profile image updated successfully!');

        // Clear the local profile image after a short delay to show the updated image from Clerk
        setTimeout(() => {
          setProfileImage(null);
        }, 2000);
      }
    } catch (err: any) {
      Alert.alert('Error', err.errors?.[0]?.message || 'Failed to update profile image');
    } finally {
      setIsUploading(false);
    }
  };

  const hasChanges = () => {
    const originalHealthData = {
      gender: healthProfile?.gender as 'Male' | 'Female' | undefined,
      birthday: healthProfile?.birthday ? new Date(healthProfile.birthday) : new Date('1990-01-01'),
      height: {
        value: healthProfile?.height || 170,
        unit: (healthProfile?.heightUnit as 'cm' | 'ft') || 'cm',
      },
      weight: {
        value: healthProfile?.weight || 70,
        unit: (healthProfile?.weightUnit as 'kg' | 'lb') || 'kg',
      },
      weightTrend:
        healthProfile?.fitnessGoal === 'gain_weight'
          ? 'up'
          : healthProfile?.fitnessGoal === 'lose_weight'
            ? 'down'
            : healthProfile?.fitnessGoal === 'maintain'
              ? 'stable'
              : 'not-sure',
      exerciseFrequency:
        healthProfile?.activityLevel === 'sedentary'
          ? '0'
          : healthProfile?.activityLevel === 'light'
            ? '1-3'
            : healthProfile?.activityLevel === 'moderate'
              ? '4-6'
              : '7+',
    };

    const originalGoals = goals ? goals.map((goal) => goal.type) : [];

    return (
      formData.firstName !== (firstName || '') ||
      formData.lastName !== (lastName || '') ||
      formData.email !== (email || '') ||
      healthData.gender !== originalHealthData.gender ||
      healthData.birthday.getTime() !== originalHealthData.birthday.getTime() ||
      healthData.height.value !== originalHealthData.height.value ||
      healthData.height.unit !== originalHealthData.height.unit ||
      healthData.weight.value !== originalHealthData.weight.value ||
      healthData.weight.unit !== originalHealthData.weight.unit ||
      healthData.weightTrend !== originalHealthData.weightTrend ||
      healthData.exerciseFrequency !== originalHealthData.exerciseFrequency ||
      JSON.stringify(selectedGoals.sort()) !== JSON.stringify(originalGoals.sort())
    );
  };

  const handleSaveChanges = async () => {
    if (!hasChanges()) {
      Alert.alert('No Changes', 'No changes to save');
      return;
    }

    try {
      setIsSaving(true);

      // Update user profile in Clerk
      if (user) {
        try {
          await user.update({
            firstName: formData.firstName,
            lastName: formData.lastName,
          });
          console.log('✅ Clerk profile updated successfully');

          // Update local user data to match Clerk
          if (userId) {
            try {
              await database.updateUser(userId, {
                name: `${formData.firstName} ${formData.lastName}`.trim(),
                email: formData.email,
              });
              console.log('✅ Local user data updated successfully');
            } catch (localUpdateError) {
              console.warn('⚠️ Local user update failed:', localUpdateError);
            }
          }
        } catch (clerkError: any) {
          console.error('❌ Clerk update error:', clerkError);
          Alert.alert('Clerk Error', clerkError.errors?.[0]?.message || 'Failed to update profile in Clerk');
          return;
        }
      }

      // Update health profile in database
      if (userId) {
        try {
          // Convert health data to database format
          const updateData = {
            gender: healthData.gender,
            birthday: healthData.birthday.toISOString(),
            height: 0, // Will be set below
            weight: 0, // Will be set below
            activityLevel: '', // Will be set below
            fitnessGoal: '', // Will be set below
          };

          // Convert height
          if (healthData.height.unit === 'cm') {
            updateData.height = healthData.height.value;
          } else {
            // Convert feet to cm (feet.inches format)
            // healthData.height.value is in format like 5.7 (5 feet 7 inches)
            const feet = Math.floor(healthData.height.value);
            const inches = Math.round((healthData.height.value % 1) * 10);
            const totalInches = feet * 12 + inches;
            updateData.height = Math.round(totalInches * 2.54);
          }

          // Convert weight
          if (healthData.weight.unit === 'kg') {
            updateData.weight = healthData.weight.value;
          } else {
            // Convert lbs to kg
            updateData.weight = healthData.weight.value * 0.453592;
          }

          // Convert exercise frequency to activity level
          switch (healthData.exerciseFrequency) {
            case '0':
              updateData.activityLevel = 'sedentary';
              break;
            case '1-3':
              updateData.activityLevel = 'light';
              break;
            case '4-6':
              updateData.activityLevel = 'moderate';
              break;
            case '7+':
              updateData.activityLevel = 'active';
              break;
          }

          // Convert weight trend to fitness goal
          switch (healthData.weightTrend) {
            case 'up':
              updateData.fitnessGoal = 'gain_weight';
              break;
            case 'down':
              updateData.fitnessGoal = 'lose_weight';
              break;
            case 'stable':
              updateData.fitnessGoal = 'maintain';
              break;
            case 'not-sure':
              updateData.fitnessGoal = 'improve_fitness';
              break;
          }

          console.log('🔄 Updating health profile with data:', updateData);

          if (healthProfile) {
            // Update existing health profile
            console.log('🔄 Final updateData keys:', Object.keys(updateData));
            await database.updateHealthProfile(healthProfile.id, updateData);
            console.log('✅ Health profile updated successfully');
          } else {
            // Create new health profile
            const newProfileId = nanoid();
            const createData = {
              id: newProfileId,
              userId,
              gender: updateData.gender,
              birthday: updateData.birthday,
              height: updateData.height,
              weight: updateData.weight,
              activityLevel: updateData.activityLevel,
              fitnessGoal: updateData.fitnessGoal,
              isDeleted: false,
            };
            console.log('🔄 Final createData keys:', Object.keys(createData));
            await database.createHealthProfile(createData);
            console.log('✅ New health profile created successfully');
          }

          // Update goals
          if (selectedGoals.length > 0) {
            try {
              console.log('🔄 Updating goals:', selectedGoals);

              // Delete existing goals
              const existingGoals = await database.getGoals(userId);
              console.log('🔄 Found existing goals:', existingGoals.length);

              for (const goal of existingGoals) {
                await database.updateGoal(goal.id, { isDeleted: true });
              }
              console.log('✅ Existing goals marked as deleted');

              // Create new goals
              for (const goalType of selectedGoals) {
                const goal = availableGoals.find((g) => g.id === goalType);
                if (goal) {
                  await database.createGoal({
                    id: nanoid(),
                    userId,
                    type: goalType,
                    target: 1, // Default target
                    current: 0,
                    unit: goalType.includes('weight')
                      ? 'kg'
                      : goalType.includes('water')
                        ? 'liters'
                        : goalType.includes('sleep')
                          ? 'hours'
                          : 'units',
                    startDate: new Date().toISOString(),
                    isActive: true,
                    isDeleted: false,
                  });
                }
              }
              console.log('✅ New goals created successfully');
            } catch (goalsError: any) {
              console.error('❌ Goals update error:', goalsError);
              Alert.alert('Goals Error', `Failed to update goals: ${goalsError.message}`);
              return;
            }
          }
        } catch (databaseError: any) {
          console.error('❌ Database error:', databaseError);
          Alert.alert('Database Error', `Failed to update database: ${databaseError.message}`);
          return;
        }
      }

      Alert.alert('Success', 'Profile updated successfully!');
    } catch (err: any) {
      console.error('❌ General error:', err);
      Alert.alert('Error', `Failed to update profile: ${err.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const groupedGoals = availableGoals.reduce(
    (acc, goal) => {
      if (!acc[goal.category]) {
        acc[goal.category] = [];
      }
      acc[goal.category].push(goal);
      return acc;
    },
    {} as Record<string, Goal[]>
  );

  const categoryTitles = {
    fitness: 'Fitness Goals',
    nutrition: 'Nutrition Goals',
    lifestyle: 'Lifestyle Goals',
  };

  return (
    <>
      <Header
        showBackButton
        title="Profile Settings"
        rightComponents={[
          <Button
            title="Save changes"
            onPress={handleSaveChanges}
            loading={isSaving}
            disabled={!hasChanges()}
          />,
        ]}
      />
      <ThemedScroller>
        {/* Profile Image Section */}
        <View className="mx-auto my-14 mb-8 w-[220px] flex-col items-center rounded-2xl bg-secondary p-10">
          <TouchableOpacity
            onPress={onPickImage}
            className="relative"
            activeOpacity={0.9}
            disabled={isUploading}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                className="h-28 w-28 rounded-full"
              />
            ) : imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                className="h-28 w-28 rounded-full"
              />
            ) : (
              <View className="h-24 w-24 items-center justify-center rounded-full bg-background">
                <Icon
                  name="Plus"
                  size={25}
                  className="text-light-subtext dark:text-dark-subtext"
                />
              </View>
            )}
            {isUploading && (
              <View className="absolute inset-0 items-center justify-center rounded-full bg-black/50">
                <Icon
                  name="Loader2"
                  size={20}
                  className="text-white"
                />
              </View>
            )}
          </TouchableOpacity>
          <View className="mt-4">
            <Button
              variant="outline"
              title={profileImage ? 'Change photo' : 'Upload photo'}
              className="text-light-subtext dark:text-dark-subtext text-sm"
              onPress={onPickImage}
              loading={isUploading}
            />

            {profileImage && (
              <Button
                className="mt-2"
                title="Remove photo"
                variant="outline"
                onPress={() => setProfileImage(null)}
                disabled={isUploading}
              />
            )}
          </View>
        </View>

        {/* Personal Information Section */}
        <Section
          titleSize="xl"
          className="pb-8 pt-4"
          title="Personal information"
          subtitle="Manage your personal information">
          <Input
            label="First Name"
            value={formData.firstName}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, firstName: text }))}
            autoCapitalize="words"
            containerClassName="mt-8"
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, lastName: text }))}
            containerClassName="flex-1"
            autoCapitalize="words"
          />
          <Input
            label="Email"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
            autoCapitalize="none"
            editable={false}
          />
        </Section>

        {/* Health Information Section */}
        <Section
          titleSize="xl"
          className="pb-8 pt-4"
          title="Health Information"
          subtitle="Your health and fitness details">
          {/* Gender */}
          <View className="mb-6">
            <ThemedText className="mb-3 text-base font-medium">Gender</ThemedText>
            <Selectable
              title="Male"
              icon="Mars"
              onPress={() => setHealthData((prev) => ({ ...prev, gender: 'Male' }))}
              selected={healthData.gender === 'Male'}
            />
            <Selectable
              title="Female"
              icon="Venus"
              onPress={() => setHealthData((prev) => ({ ...prev, gender: 'Female' }))}
              selected={healthData.gender === 'Female'}
            />
          </View>

          {/* Birthday */}
          <View className="mb-6">
            <ThemedText className="mb-3 text-base font-medium">Birthday</ThemedText>
            <DatePicker
              label="Birthday"
              onChange={(date) => setHealthData((prev) => ({ ...prev, birthday: date }))}
              value={healthData.birthday}
            />
          </View>

          {/* Height */}
          <View className="mb-6">
            <ThemedText className="mb-3 text-base font-medium">Height</ThemedText>
            <ThemedText className="mb-3 text-sm opacity-60">How tall are you?</ThemedText>

            <View className="mb-4 flex-row items-center justify-center gap-2">
              <Button
                title="cm"
                variant={healthData.height.unit === 'cm' ? 'primary' : 'outline'}
                onPress={() => {
                  if (healthData.height.unit === 'ft') {
                    // Convert from ft to cm
                    const feet = Math.floor(healthData.height.value);
                    const inches = Math.round((healthData.height.value % 1) * 10);
                    const totalInches = feet * 12 + inches;
                    const cmValue = Math.round(totalInches * 2.54);
                    setHealthData((prev) => ({
                      ...prev,
                      height: { value: cmValue, unit: 'cm' },
                    }));
                  }
                }}
              />
              <Button
                title="ft"
                variant={healthData.height.unit === 'ft' ? 'primary' : 'outline'}
                onPress={() => {
                  if (healthData.height.unit === 'cm') {
                    // Convert from cm to ft
                    const totalInches = healthData.height.value / 2.54;
                    let feet = Math.floor(totalInches / 12);
                    let inches = Math.round(totalInches % 12);

                    // Fix: Handle case where inches rounds to 12
                    if (inches === 12) {
                      inches = 0;
                      feet += 1;
                    }

                    const ftValue = feet + inches / 10;
                    setHealthData((prev) => ({
                      ...prev,
                      height: { value: ftValue, unit: 'ft' },
                    }));
                  }
                }}
              />
            </View>

            <View className="items-center justify-center py-4">
              {healthData.height.unit === 'cm' ? (
                <View className="items-center">
                  <ThemedText className="mb-4 text-3xl font-bold">{healthData.height.value || 170} cm</ThemedText>
                  <View className="flex-row items-center gap-4">
                    <Button
                      title="-"
                      onPress={() =>
                        setHealthData((prev) => ({
                          ...prev,
                          height: {
                            ...prev.height,
                            value: Math.max(100, (prev.height.value || 170) - 1),
                          },
                        }))
                      }
                      className="h-12 w-12 rounded-full"
                    />
                    <Button
                      title="+"
                      onPress={() =>
                        setHealthData((prev) => ({
                          ...prev,
                          height: {
                            ...prev.height,
                            value: Math.min(250, (prev.height.value || 170) + 1),
                          },
                        }))
                      }
                      className="h-12 w-12 rounded-full"
                    />
                  </View>
                </View>
              ) : (
                <View className="items-center">
                  <ThemedText className="mb-4 text-3xl font-bold">
                    {Math.floor(healthData.height.value || 5.7)}'
                    {(() => {
                      const inches = Math.round(((healthData.height.value || 5.7) % 1) * 100);
                      return inches > 11 ? Math.round(((healthData.height.value || 5.7) % 1) * 10) : inches;
                    })() || 0}
                    "
                  </ThemedText>
                  <View className="flex-row items-center gap-4">
                    <Button
                      title="-"
                      onPress={() => {
                        setHealthData((prev) => {
                          const currentValue = prev.height.value || 5.7;
                          const feet = Math.floor(currentValue);
                          // Handle both old format (/10) and new format (/100)
                          let inches = Math.round((currentValue % 1) * 100);
                          if (inches > 11) {
                            // This is old format, convert to new format
                            inches = Math.round((currentValue % 1) * 10);
                          }

                          // Decrement inches, handle feet boundary
                          let newInches = inches - 1;
                          let newFeet = feet;

                          if (newInches < 0) {
                            newInches = 11;
                            newFeet = feet - 1;
                          }

                          // Ensure minimum height (4'0")
                          if (newFeet < 4) {
                            newFeet = 4;
                            newInches = 0;
                          }

                          // Fix: Store inches as decimal part properly (5.10 for 5'10")
                          const newValue = newFeet + newInches / 100;
                          return {
                            ...prev,
                            height: {
                              ...prev.height,
                              value: newValue,
                            },
                          };
                        });
                      }}
                      className="h-12 w-12 rounded-full"
                    />
                    <Button
                      title="+"
                      onPress={() => {
                        setHealthData((prev) => {
                          const currentValue = prev.height.value || 5.7;
                          const feet = Math.floor(currentValue);
                          // Handle both old format (/10) and new format (/100)
                          let inches = Math.round((currentValue % 1) * 100);
                          if (inches > 11) {
                            // This is old format, convert to new format
                            inches = Math.round((currentValue % 1) * 10);
                          }

                          // Increment inches, handle feet boundary
                          let newInches = inches + 1;
                          let newFeet = feet;

                          if (newInches > 11) {
                            newInches = 0;
                            newFeet = feet + 1;
                          }

                          // Ensure maximum height (7'11")
                          if (newFeet > 7 || (newFeet === 7 && newInches > 11)) {
                            newFeet = 7;
                            newInches = 11;
                          }

                          // Fix: Store inches as decimal part properly (5.10 for 5'10")
                          const newValue = newFeet + newInches / 100;

                          return {
                            ...prev,
                            height: {
                              ...prev.height,
                              value: newValue,
                            },
                          };
                        });
                      }}
                      className="h-12 w-12 rounded-full"
                    />
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Weight */}
          <View className="mb-6">
            <ThemedText className="mb-3 text-base font-medium">Weight</ThemedText>
            <ThemedText className="mb-3 text-sm opacity-60">What is your current weight?</ThemedText>

            <View className="mb-4 flex-row items-center justify-center gap-2">
              <Button
                title="kg"
                variant={healthData.weight.unit === 'kg' ? 'primary' : 'outline'}
                onPress={() => {
                  if (healthData.weight.unit === 'lb') {
                    // Convert from lb to kg
                    const kgValue = Math.round(healthData.weight.value * 0.453592);
                    setHealthData((prev) => ({
                      ...prev,
                      weight: { value: kgValue, unit: 'kg' },
                    }));
                  }
                }}
              />
              <Button
                title="lb"
                variant={healthData.weight.unit === 'lb' ? 'primary' : 'outline'}
                onPress={() => {
                  if (healthData.weight.unit === 'kg') {
                    // Convert from kg to lb
                    const lbValue = Math.round(healthData.weight.value / 0.453592);
                    setHealthData((prev) => ({
                      ...prev,
                      weight: { value: lbValue, unit: 'lb' },
                    }));
                  }
                }}
              />
            </View>

            <View className="items-center justify-center py-4">
              {healthData.weight.value !== undefined && healthData.weight.unit === 'kg' ? (
                <View className="items-center">
                  <ThemedText className="mb-4 text-3xl font-bold">{healthData.weight.value || 70} kg</ThemedText>
                  <View className="flex-row items-center gap-4">
                    <Button
                      title="-"
                      onPress={() =>
                        setHealthData((prev) => ({
                          ...prev,
                          weight: {
                            ...prev.weight,
                            value: Math.max(40, (prev.weight.value || 70) - 1),
                          },
                        }))
                      }
                      className="h-12 w-12 rounded-full"
                    />
                    <Button
                      title="+"
                      onPress={() =>
                        setHealthData((prev) => ({
                          ...prev,
                          weight: {
                            ...prev.weight,
                            value: Math.min(200, (prev.weight.value || 70) + 1),
                          },
                        }))
                      }
                      className="h-12 w-12 rounded-full"
                    />
                  </View>
                </View>
              ) : healthData.weight.value !== undefined && healthData.weight.unit === 'lb' ? (
                <View className="items-center">
                  <ThemedText className="mb-4 text-3xl font-bold">{healthData.weight.value || 154} lb</ThemedText>
                  <View className="flex-row items-center gap-4">
                    <Button
                      title="-"
                      onPress={() =>
                        setHealthData((prev) => ({
                          ...prev,
                          weight: {
                            ...prev.weight,
                            value: Math.max(88, (prev.weight.value || 154) - 1),
                          },
                        }))
                      }
                      className="h-12 w-12 rounded-full"
                    />
                    <Button
                      title="+"
                      onPress={() =>
                        setHealthData((prev) => ({
                          ...prev,
                          weight: {
                            ...prev.weight,
                            value: Math.min(440, (prev.weight.value || 154) + 1),
                          },
                        }))
                      }
                      className="h-12 w-12 rounded-full"
                    />
                  </View>
                </View>
              ) : (
                <View className="h-32 items-center justify-center">
                  <ThemedText className="text-center opacity-60">Loading weight picker...</ThemedText>
                </View>
              )}
            </View>
          </View>

          {/* Weight Trend */}
          <View className="mb-6">
            <ThemedText className="mb-3 text-base font-medium">Weight Trend</ThemedText>
            <Selectable
              title="I have been gaining weight"
              icon="ArrowUp"
              onPress={() => setHealthData((prev) => ({ ...prev, weightTrend: 'up' }))}
              selected={healthData.weightTrend === 'up'}
            />
            <Selectable
              title="I have been losing weight"
              icon="ArrowDown"
              onPress={() => setHealthData((prev) => ({ ...prev, weightTrend: 'down' }))}
              selected={healthData.weightTrend === 'down'}
            />
            <Selectable
              title="I have been stable"
              icon="Minus"
              onPress={() => setHealthData((prev) => ({ ...prev, weightTrend: 'stable' }))}
              selected={healthData.weightTrend === 'stable'}
            />
            <Selectable
              title="Not sure"
              icon="FileQuestion"
              onPress={() => setHealthData((prev) => ({ ...prev, weightTrend: 'not-sure' }))}
              selected={healthData.weightTrend === 'not-sure'}
            />
          </View>

          {/* Exercise Frequency */}
          <View className="mb-6">
            <ThemedText className="mb-3 text-base font-medium">Exercise Frequency</ThemedText>
            <ThemedText className="mb-3 text-sm opacity-60">
              Estimate workouts, recreational sports or resistance training.
            </ThemedText>
            <Selectable
              title="0 times a week"
              icon="Calendar"
              onPress={() => setHealthData((prev) => ({ ...prev, exerciseFrequency: '0' }))}
              selected={healthData.exerciseFrequency === '0'}
            />
            <Selectable
              title="1-3 times a week"
              icon="Calendar1"
              onPress={() => setHealthData((prev) => ({ ...prev, exerciseFrequency: '1-3' }))}
              selected={healthData.exerciseFrequency === '1-3'}
            />
            <Selectable
              title="4-6 times a week"
              icon="CalendarDays"
              onPress={() => setHealthData((prev) => ({ ...prev, exerciseFrequency: '4-6' }))}
              selected={healthData.exerciseFrequency === '4-6'}
            />
            <Selectable
              title="7+ times a week"
              icon="CalendarRange"
              onPress={() => setHealthData((prev) => ({ ...prev, exerciseFrequency: '7+' }))}
              selected={healthData.exerciseFrequency === '7+'}
            />
          </View>
        </Section>

        {/* Goals Section */}
        <Section
          titleSize="xl"
          className="pb-8 pt-4"
          title="Goals"
          subtitle="Select your health and fitness goals">
          {Object.entries(groupedGoals).map(([category, categoryGoals]) => (
            <View
              key={category}
              className="mb-6">
              <ThemedText className="mb-3 text-lg font-semibold">
                {categoryTitles[category as keyof typeof categoryTitles]}
              </ThemedText>
              <View className="flex-row flex-wrap gap-2">
                {categoryGoals.map((goal) => (
                  <Chip
                    key={goal.id}
                    label={goal.title}
                    icon={goal.icon as any}
                    isSelected={selectedGoals.includes(goal.id)}
                    onPress={() => toggleGoal(goal.id)}
                  />
                ))}
              </View>
            </View>
          ))}
        </Section>

        {/* Units Section */}
        <Section
          titleSize="xl"
          className="pb-8 pt-4"
          title="Units"
          subtitle="Metric or imperial">
          <View className="mt-4">
            <ThemedText className="mb-2 text-sm font-medium">Height Units</ThemedText>
            <MetricPicker
              defaultSelected={unitPreferences.heightUnit}
              option1="cm"
              option2="in"
              onSelectionChange={(selected) => setUnitPreferences((prev) => ({ ...prev, heightUnit: selected }))}
            />
            <ThemedText className="mb-2 mt-4 text-sm font-medium">Weight Units</ThemedText>
            <MetricPicker
              defaultSelected={unitPreferences.weightUnit}
              option1="kg"
              option2="lb"
              onSelectionChange={(selected) => setUnitPreferences((prev) => ({ ...prev, weightUnit: selected }))}
            />
          </View>
        </Section>
      </ThemedScroller>
    </>
  );
}

const MetricPicker = (props: {
  defaultSelected: string;
  option1: string;
  option2: string;
  onSelectionChange?: (selected: string) => void;
}) => {
  const [selected, setSelected] = useState(props.defaultSelected);

  // Update selected when defaultSelected changes
  useEffect(() => {
    setSelected(props.defaultSelected);
  }, [props.defaultSelected]);

  const handleSelection = (newSelection: string) => {
    setSelected(newSelection);
    props.onSelectionChange?.(newSelection);
  };

  return (
    <View className="mb-4 w-full flex-row rounded-xl bg-secondary p-1">
      <Pressable
        className={`flex flex-1 items-center justify-center rounded-lg py-3 ${selected === props.option1 ? 'bg-text' : ''}`}
        onPress={() => handleSelection(props.option1)}>
        <ThemedText className={selected === props.option1 ? '!text-background' : ''}>{props.option1}</ThemedText>
      </Pressable>
      <Pressable
        className={`flex flex-1 items-center justify-center rounded-lg py-3 ${selected === props.option2 ? 'bg-text' : ''}`}
        onPress={() => handleSelection(props.option2)}>
        <ThemedText className={selected === props.option2 ? '!text-background' : ''}>{props.option2}</ThemedText>
      </Pressable>
    </View>
  );
};
