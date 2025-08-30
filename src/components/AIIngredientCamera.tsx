import React, { useState } from 'react';
import { View, Pressable, Text, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import ThemedText from './ThemedText';
import Icon from './Icon';

import { shadowPresets } from '@/utils/useShadow';

interface ExtractedIngredient {
  name: string;
  confidence: number;
  quantity?: number;
  unit?: string;
  notes?: string;
}

interface AIIngredientCameraProps {
  onIngredientsExtracted: (ingredients: ExtractedIngredient[]) => void;
  onError?: (error: string) => void;
  className?: string;
}

export default function AIIngredientCamera({
  onIngredientsExtracted,
  onError,
  className = '',
}: AIIngredientCameraProps) {
  const [isLoading, setIsLoading] = useState(false);

  const extractIngredientsFromImage = async (imageUri: string) => {
    setIsLoading(true);
    try {
      // Convert image to form data
      const formData = new FormData();

      // Get the image as a blob/file
      const response = await fetch(imageUri);
      const blob = await response.blob();

      formData.append('image', blob as any, 'ingredient-image.jpg');

      // Call the image analysis API
      const apiResponse = await fetch('/api/image-meal-plan', {
        method: 'POST',
        body: formData,
      });

      const result = await apiResponse.json();

      if (!apiResponse.ok) {
        throw new Error(result.error || 'Failed to analyze image');
      }

      if (result.success && result.ingredients) {
        onIngredientsExtracted(result.ingredients);
        Alert.alert('Ingredients Found!', `Found ${result.ingredients.length} ingredients in your image.`);
      } else {
        throw new Error('No ingredients found in the image');
      }
    } catch (error) {
      console.error('Image analysis error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      onError?.(errorMessage);
      Alert.alert('Error', `Failed to analyze image: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera permission is required to take photos of ingredients.');
      return false;
    }
    return true;
  };

  const requestLibraryPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Photo library permission is required to select images.');
      return false;
    }
    return true;
  };

  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      await extractIngredientsFromImage(imageUri);
    }
  };

  const selectFromLibrary = async () => {
    const hasPermission = await requestLibraryPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      const imageUri = result.assets[0].uri;
      await extractIngredientsFromImage(imageUri);
    }
  };

  const showImageOptions = () => {
    Alert.alert('Ingredient Recognition', 'How would you like to add your ingredient photo?', [
      {
        text: 'Take Photo',
        onPress: takePhoto,
      },
      {
        text: 'Choose from Library',
        onPress: selectFromLibrary,
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  return (
    <View
      className={`rounded-xl bg-secondary ${className}`}
      style={shadowPresets.medium}>
      <View className="p-6">
        <View className="mb-4 flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-lg bg-highlight">
            <Icon
              name="Camera"
              size={20}
              color="white"
            />
          </View>
          <View className="flex-1">
            <ThemedText className="text-lg font-bold">AI Ingredient Scanner</ThemedText>
            <ThemedText className="text-sm opacity-70">Take a photo to identify ingredients automatically</ThemedText>
          </View>
        </View>

        {isLoading && (
          <View className="mb-4">
            <BlurView
              intensity={50}
              className="rounded-lg p-4">
              <View className="flex-row items-center">
                <View className="mr-3 h-6 w-6 animate-spin rounded-full border-2 border-highlight border-t-transparent" />
                <ThemedText className="text-sm">Analyzing image with AI...</ThemedText>
              </View>
            </BlurView>
          </View>
        )}

        <Pressable
          onPress={showImageOptions}
          disabled={isLoading}
          className={`flex-row items-center justify-center rounded-lg bg-highlight p-4 ${
            isLoading ? 'opacity-50' : ''
          }`}>
          <Icon
            name={isLoading ? 'Loader2' : 'Camera'}
            size={20}
            color="white"
            className={isLoading ? 'animate-spin' : ''}
          />
          <Text className="ml-2 font-semibold text-white">{isLoading ? 'Analyzing...' : 'Scan Ingredients'}</Text>
        </Pressable>

        <View className="mt-3 flex-row justify-center space-x-4">
          <Pressable
            onPress={takePhoto}
            disabled={isLoading}
            className="flex-row items-center rounded-lg bg-background px-4 py-2">
            <Icon
              name="Camera"
              size={16}
              className="mr-2"
            />
            <ThemedText className="text-sm">Camera</ThemedText>
          </Pressable>

          <Pressable
            onPress={selectFromLibrary}
            disabled={isLoading}
            className="flex-row items-center rounded-lg bg-background px-4 py-2">
            <Icon
              name="Image"
              size={16}
              className="mr-2"
            />
            <ThemedText className="text-sm">Gallery</ThemedText>
          </Pressable>
        </View>

        <View className="mt-4 rounded-lg bg-background p-3">
          <ThemedText className="text-xs opacity-60">
            💡 Tip: For best results, take clear photos with good lighting. The AI can identify fruits, vegetables,
            grains, proteins, and other food ingredients.
          </ThemedText>
        </View>
      </View>
    </View>
  );
}
