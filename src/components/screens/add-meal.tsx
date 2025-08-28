import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Pressable, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import ThemedFooter from '@/components/ThemeFooter';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';
import { useDatabase } from '@/contexts/DatabaseProvider';
import useThemeColors from '@/contexts/ThemeColors';
import { useDataStore } from '@/stores/data-store';
import { shadowPresets } from '@/utils/useShadow';

const mealOptions = [
  { title: 'Greek Yogurt', description: '77 cal, Plain Greek yogurt, 100.0 g' },
  { title: 'Grilled Chicken Breast', description: '165 cal, Skinless chicken breast, 100.0 g' },
  { title: 'Peanut Butter', description: '588 cal, Natural peanut butter, 100.0 g' },
  { title: 'Banana', description: '89 cal, Medium banana, 118.0 g' },
  { title: 'Salmon Fillet', description: '208 cal, Atlantic salmon, 100.0 g' },
  { title: 'Brown Rice', description: '111 cal, Cooked brown rice, 100.0 g' },
  { title: 'Avocado', description: '160 cal, Medium avocado, 100.0 g' },
  { title: 'Almonds', description: '579 cal, Raw almonds, 100.0 g' },
  { title: 'Sweet Potato', description: '86 cal, Baked sweet potato, 100.0 g' },
  { title: 'Spinach', description: '23 cal, Fresh spinach leaves, 100.0 g' },
  { title: 'Eggs', description: '155 cal, Large whole eggs, 100.0 g' },
  { title: 'Quinoa', description: '120 cal, Cooked quinoa, 100.0 g' },
  { title: 'Blueberries', description: '57 cal, Fresh blueberries, 100.0 g' },
  { title: 'Broccoli', description: '34 cal, Fresh broccoli, 100.0 g' },
  { title: 'Oatmeal', description: '68 cal, Cooked oatmeal, 100.0 g' },
  { title: 'Turkey Breast', description: '135 cal, Roasted turkey breast, 100.0 g' },
];

export default function AddMealScreen() {
  const { userId } = useDatabase();
  const { addMeal } = useDataStore();
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddMeals = async () => {
    if (selectedMeals.length === 0) return;

    setIsLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];

      for (const mealTitle of selectedMeals) {
        const mealOption = mealOptions.find((option) => option.title === mealTitle);
        if (mealOption) {
          // Parse calories from description
          const caloriesMatch = mealOption.description.match(/(\d+) cal/);
          const calories = caloriesMatch ? parseInt(caloriesMatch[1], 10) : 0;

          // Generate a simple meal ID
          const mealId = `meal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

          await addMeal({
            id: mealId,
            userId: userId?.toString() || '',
            name: mealOption.title,
            mealType: 'snack', // Default to snack, could be made configurable
            calories,
            date: today,
            isDeleted: false,
          });
        }
      }

      router.back();
    } catch (error) {
      console.error('Failed to add meals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMealSelection = (mealTitle: string) => {
    setSelectedMeals((prev) =>
      prev.includes(mealTitle) ? prev.filter((title) => title !== mealTitle) : [...prev, mealTitle]
    );
  };

  return (
    <>
      <SearchInput />
      <ThemedScroller className="!px-4 pt-6">
        <View className="gap-3">
          {mealOptions.map((meal, index) => (
            <MealCard
              key={index}
              title={meal.title}
              description={meal.description}
              isSelected={selectedMeals.includes(meal.title)}
              onPress={() => toggleMealSelection(meal.title)}
            />
          ))}
        </View>
      </ThemedScroller>
      <ThemedFooter>
        <Button
          title={`Add ${selectedMeals.length} Meal${selectedMeals.length !== 1 ? 's' : ''}`}
          className="!bg-highlight"
          textClassName="!text-white"
          onPress={handleAddMeals}
          loading={isLoading}
          disabled={selectedMeals.length === 0}
        />
      </ThemedFooter>
    </>
  );
}

const SearchInput = () => {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();
  return (
    <View
      style={{ paddingTop: insets.top }}
      className="flex-row items-center justify-between bg-secondary px-4 pb-4">
      <View className="relative h-14 flex-1 flex-row  rounded-xl bg-border">
        <Icon name="ArrowLeft" onPress={() => router.back()} size={20} className="pl-2" />
        <TextInput
          className="h-14 flex-1 rounded-xl px-4 text-text"
          placeholder="Search meals"
          placeholderTextColor={colors.placeholder}
        />
      </View>
    </View>
  );
};

const MealCard = (props: any) => {
  return (
    <Pressable
      style={shadowPresets.card}
      onPress={props.onPress}
      className="flex-row items-center justify-between rounded-xl bg-secondary p-4">
      <View className="flex-1">
        <ThemedText className="text-lg font-bold">{props.title}</ThemedText>
        <ThemedText className="text-base text-text opacity-50">{props.description}</ThemedText>
      </View>
      {props.isSelected ? (
        <Icon
          name="Check"
          size={20}
          color="white"
          className="h-10 w-10 rounded-full bg-highlight"
        />
      ) : (
        <Icon name="Plus" size={20} className="h-10 w-10 rounded-full bg-background" />
      )}
    </Pressable>
  );
};
