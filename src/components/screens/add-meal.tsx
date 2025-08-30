import { router } from 'expo-router';
import React, { useState, useRef } from 'react';
import { View, Pressable, TextInput, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button } from '@/components/Button';
import AIIngredientCamera from '@/components/AIIngredientCamera';
import AIMealPlanGenerator from '@/components/AIMealPlanGenerator';
import Icon from '@/components/Icon';
import ThemedFooter from '@/components/ThemeFooter';

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

type ExtractedIngredient = {
  name: string;
  confidence: number;
  quantity?: number;
  unit?: string;
  notes?: string;
};

export default function AddMealScreen() {
  const { userId } = useDatabase();
  const { addMeal } = useDataStore();
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [extractedIngredients, setExtractedIngredients] = useState<ExtractedIngredient[]>([]);
  const [currentTab, setCurrentTab] = useState<'browse' | 'ai-camera' | 'ai-planner'>('browse');
  const scrollViewRef = useRef<ScrollView>(null);

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

  const handleIngredientsExtracted = (ingredients: ExtractedIngredient[]) => {
    setExtractedIngredients(ingredients);
    // Auto-switch to browse tab to show results
    setCurrentTab('browse');
  };

  const handleMealPlanGenerated = (mealPlan: any) => {
    // Convert meal plan to selectable meals
    const generatedMeals: string[] = [];

    Object.entries(mealPlan).forEach(([mealType, meal]: [string, any]) => {
      if (meal && typeof meal === 'object' && meal.name) {
        generatedMeals.push(meal.name);
      }
    });

    if (generatedMeals.length > 0) {
      setSelectedMeals((prev) => [...prev, ...generatedMeals]);
      setCurrentTab('browse');
      Alert.alert('Meal Plan Generated', `Added ${generatedMeals.length} meals to your selection.`);
    }
  };

  const renderTabContent = () => {
    switch (currentTab) {
      case 'ai-camera':
        return (
          <View className="p-4">
            <AIIngredientCamera
              onIngredientsExtracted={handleIngredientsExtracted}
              className="mb-4"
            />
            {extractedIngredients.length > 0 && (
              <View className="mt-4">
                <ThemedText className="mb-3 text-lg font-bold">Detected Ingredients:</ThemedText>
                <View className="flex-row flex-wrap">
                  {extractedIngredients.map((ingredient, index) => (
                    <View
                      key={index}
                      className="mb-2 mr-2 rounded-full bg-highlight/20 px-3 py-2">
                      <ThemedText className="text-sm">
                        {ingredient.name} ({Math.round(ingredient.confidence * 100)}%)
                      </ThemedText>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        );
      case 'ai-planner':
        return (
          <View className="p-4">
            <AIMealPlanGenerator
              ingredients={extractedIngredients.map((ing) => ing.name)}
              onMealPlanGenerated={handleMealPlanGenerated}
            />
          </View>
        );
      default:
        return (
          <View className="gap-3 px-4">
            {extractedIngredients.length > 0 && (
              <View className="mb-4 rounded-xl bg-green-50 p-4">
                <View className="mb-2 flex-row items-center">
                  <Icon
                    name="Sparkles"
                    size={16}
                    className="mr-2 text-green-600"
                  />
                  <ThemedText className="font-semibold text-green-800">AI-Detected Ingredients</ThemedText>
                </View>
                <View className="flex-row flex-wrap">
                  {extractedIngredients.slice(0, 5).map((ingredient, index) => (
                    <ThemedText
                      key={index}
                      className="mr-2 text-sm text-green-700">
                      {ingredient.name}
                      {index < extractedIngredients.slice(0, 5).length - 1 ? ',' : ''}
                    </ThemedText>
                  ))}
                  {extractedIngredients.length > 5 && (
                    <ThemedText className="text-sm text-green-600">+{extractedIngredients.length - 5} more</ThemedText>
                  )}
                </View>
              </View>
            )}
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
        );
    }
  };

  return (
    <>
      <SearchInput
        currentTab={currentTab}
        onTabChange={setCurrentTab}
      />
      <ScrollView
        ref={scrollViewRef}
        className="flex-1 bg-background"
        showsVerticalScrollIndicator={false}>
        <View className="pt-6">{renderTabContent()}</View>
      </ScrollView>
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

type SearchInputProps = {
  currentTab: 'browse' | 'ai-camera' | 'ai-planner';
  onTabChange: (tab: 'browse' | 'ai-camera' | 'ai-planner') => void;
};

const SearchInput = ({ currentTab, onTabChange }: SearchInputProps) => {
  const insets = useSafeAreaInsets();
  const colors = useThemeColors();

  return (
    <View
      style={{ paddingTop: insets.top }}
      className="bg-secondary pb-4">
      {/* Header with back button and search */}
      <View className="mb-4 flex-row items-center justify-between px-4">
        <View className="relative h-14 flex-1 flex-row rounded-xl bg-border">
          <Icon
            name="ArrowLeft"
            onPress={() => router.back()}
            size={20}
            className="pl-2"
          />
          <TextInput
            className="h-14 flex-1 rounded-xl px-4 text-text"
            placeholder="Search meals"
            placeholderTextColor={colors.placeholder}
          />
        </View>
      </View>

      {/* Tab Navigation */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="px-4">
        <View className="flex-row space-x-2">
          <Pressable
            onPress={() => onTabChange('browse')}
            className={`flex-row items-center rounded-lg px-4 py-2 ${
              currentTab === 'browse' ? 'bg-highlight' : 'bg-background'
            }`}>
            <Icon
              name="Search"
              size={16}
              className={`mr-2 ${currentTab === 'browse' ? 'text-white' : ''}`}
              color={currentTab === 'browse' ? 'white' : colors.text}
            />
            <ThemedText className={`text-sm font-medium ${currentTab === 'browse' ? 'text-white' : ''}`}>
              Browse
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={() => onTabChange('ai-camera')}
            className={`flex-row items-center rounded-lg px-4 py-2 ${
              currentTab === 'ai-camera' ? 'bg-highlight' : 'bg-background'
            }`}>
            <Icon
              name="Camera"
              size={16}
              className={`mr-2 ${currentTab === 'ai-camera' ? 'text-white' : ''}`}
              color={currentTab === 'ai-camera' ? 'white' : colors.text}
            />
            <ThemedText className={`text-sm font-medium ${currentTab === 'ai-camera' ? 'text-white' : ''}`}>
              AI Scan
            </ThemedText>
          </Pressable>

          <Pressable
            onPress={() => onTabChange('ai-planner')}
            className={`flex-row items-center rounded-lg px-4 py-2 ${
              currentTab === 'ai-planner' ? 'bg-highlight' : 'bg-background'
            }`}>
            <Icon
              name="Sparkles"
              size={16}
              className={`mr-2 ${currentTab === 'ai-planner' ? 'text-white' : ''}`}
              color={currentTab === 'ai-planner' ? 'white' : colors.text}
            />
            <ThemedText className={`text-sm font-medium ${currentTab === 'ai-planner' ? 'text-white' : ''}`}>
              AI Planner
            </ThemedText>
          </Pressable>
        </View>
      </ScrollView>
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
        <Icon
          name="Plus"
          size={20}
          className="h-10 w-10 rounded-full bg-background"
        />
      )}
    </Pressable>
  );
};
