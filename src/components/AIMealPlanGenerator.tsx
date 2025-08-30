import React, { useState } from 'react';
import { View, Pressable, Text, TextInput, Alert, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import ThemedText from './ThemedText';
import Icon from './Icon';
import useThemeColors from '@/contexts/ThemeColors';
import { shadowPresets } from '@/utils/useShadow';

interface MealPlanPreferences {
  dietary: string[];
  allergies: string[];
  calories: number;
  meals: number;
  cuisine: string;
  cookingTime: string;
}

interface GeneratedMealPlan {
  breakfast?: MealSuggestion;
  lunch?: MealSuggestion;
  dinner?: MealSuggestion;
  snacks?: MealSuggestion[];
}

interface MealSuggestion {
  name: string;
  calories: number;
  prepTime: number;
  ingredients: string[];
  instructions: string[];
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
}

interface AIMealPlanGeneratorProps {
  ingredients?: string[];
  onMealPlanGenerated: (mealPlan: GeneratedMealPlan) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function AIMealPlanGenerator({
  ingredients = [],
  onMealPlanGenerated,
  onError,
  className = '',
}: AIMealPlanGeneratorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState<MealPlanPreferences>({
    dietary: [],
    allergies: [],
    calories: 2000,
    meals: 3,
    cuisine: 'any',
    cookingTime: 'medium',
  });
  const [customInstructions, setCustomInstructions] = useState('');
  const colors = useThemeColors();

  const dietaryOptions = [
    'vegetarian',
    'vegan',
    'keto',
    'paleo',
    'mediterranean',
    'low-carb',
    'high-protein',
    'gluten-free',
    'dairy-free',
  ];

  const cuisineOptions = [
    'any',
    'american',
    'italian',
    'asian',
    'mexican',
    'mediterranean',
    'indian',
    'japanese',
    'thai',
    'french',
  ];

  const generateMealPlan = async () => {
    setIsLoading(true);
    try {
      const requestBody = {
        ingredients: ingredients,
        preferences: preferences,
        customInstructions: customInstructions,
        targetCalories: preferences.calories,
        mealsPerDay: preferences.meals,
      };

      const response = await fetch('/api/meal-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to generate meal plan');
      }

      if (result.success && result.mealPlan) {
        onMealPlanGenerated(result.mealPlan);
        Alert.alert('Meal Plan Generated!', 'Your personalized meal plan is ready.');
      } else {
        throw new Error('No meal plan generated');
      }
    } catch (error) {
      console.error('Meal plan generation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      onError?.(errorMessage);
      Alert.alert('Error', `Failed to generate meal plan: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleDietaryOption = (option: string) => {
    setPreferences((prev) => ({
      ...prev,
      dietary: prev.dietary.includes(option)
        ? prev.dietary.filter((item) => item !== option)
        : [...prev.dietary, option],
    }));
  };

  return (
    <ScrollView
      className={`rounded-xl bg-secondary ${className}`}
      style={shadowPresets.medium}>
      <View className="p-6">
        <View className="mb-6 flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-lg bg-green-500">
            <Icon
              name="ChefHat"
              size={20}
              color="white"
            />
          </View>
          <View className="flex-1">
            <ThemedText className="text-lg font-bold">AI Meal Planner</ThemedText>
            <ThemedText className="text-sm opacity-70">Generate personalized meal plans with AI</ThemedText>
          </View>
        </View>

        {ingredients.length > 0 && (
          <View className="mb-4 rounded-lg bg-background p-3">
            <ThemedText className="mb-2 text-sm font-semibold">Available Ingredients:</ThemedText>
            <View className="flex-row flex-wrap">
              {ingredients.map((ingredient, index) => (
                <View
                  key={index}
                  className="mb-2 mr-2 rounded-full bg-highlight/20 px-3 py-1">
                  <ThemedText className="text-xs">{ingredient}</ThemedText>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Calorie Target */}
        <View className="mb-4">
          <ThemedText className="mb-2 text-sm font-semibold">Daily Calorie Target</ThemedText>
          <TextInput
            value={preferences.calories.toString()}
            onChangeText={(text) =>
              setPreferences((prev) => ({
                ...prev,
                calories: parseInt(text) || 2000,
              }))
            }
            keyboardType="numeric"
            className="rounded-lg bg-background p-3 text-base"
            style={{ color: colors.text }}
            placeholder="2000"
            placeholderTextColor={colors.text + '60'}
          />
        </View>

        {/* Dietary Preferences */}
        <View className="mb-4">
          <ThemedText className="mb-2 text-sm font-semibold">Dietary Preferences</ThemedText>
          <View className="flex-row flex-wrap">
            {dietaryOptions.map((option) => (
              <Pressable
                key={option}
                onPress={() => toggleDietaryOption(option)}
                className={`mb-2 mr-2 rounded-lg px-3 py-2 ${
                  preferences.dietary.includes(option) ? 'bg-highlight' : 'bg-background'
                }`}>
                <ThemedText
                  className={`text-xs capitalize ${preferences.dietary.includes(option) ? 'text-white' : ''}`}>
                  {option.replace('-', ' ')}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Cuisine Preference */}
        <View className="mb-4">
          <ThemedText className="mb-2 text-sm font-semibold">Cuisine Preference</ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}>
            <View className="flex-row">
              {cuisineOptions.map((cuisine) => (
                <Pressable
                  key={cuisine}
                  onPress={() => setPreferences((prev) => ({ ...prev, cuisine }))}
                  className={`mr-2 rounded-lg px-4 py-2 ${
                    preferences.cuisine === cuisine ? 'bg-highlight' : 'bg-background'
                  }`}>
                  <ThemedText className={`text-xs capitalize ${preferences.cuisine === cuisine ? 'text-white' : ''}`}>
                    {cuisine}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Custom Instructions */}
        <View className="mb-4">
          <ThemedText className="mb-2 text-sm font-semibold">Custom Instructions (Optional)</ThemedText>
          <TextInput
            value={customInstructions}
            onChangeText={setCustomInstructions}
            multiline
            numberOfLines={3}
            className="rounded-lg bg-background p-3 text-base"
            style={{ color: colors.text }}
            placeholder="e.g., I prefer quick meals, avoid spicy food..."
            placeholderTextColor={colors.text + '60'}
          />
        </View>

        {isLoading && (
          <View className="mb-4">
            <BlurView
              intensity={50}
              className="rounded-lg p-4">
              <View className="flex-row items-center">
                <View className="mr-3 h-6 w-6 animate-spin rounded-full border-2 border-green-500 border-t-transparent" />
                <ThemedText className="text-sm">Generating your personalized meal plan...</ThemedText>
              </View>
            </BlurView>
          </View>
        )}

        <Pressable
          onPress={generateMealPlan}
          disabled={isLoading}
          className={`flex-row items-center justify-center rounded-lg bg-green-500 p-4 ${
            isLoading ? 'opacity-50' : ''
          }`}>
          <Icon
            name={isLoading ? 'Loader2' : 'Sparkles'}
            size={20}
            color="white"
            className={isLoading ? 'animate-spin' : ''}
          />
          <Text className="ml-2 font-semibold text-white">{isLoading ? 'Generating...' : 'Generate Meal Plan'}</Text>
        </Pressable>

        <View className="mt-4 rounded-lg bg-background p-3">
          <ThemedText className="text-xs opacity-60">
            🤖 Our AI will create a personalized meal plan based on your preferences, dietary restrictions, and
            available ingredients. Each meal includes detailed nutrition information and cooking instructions.
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}
