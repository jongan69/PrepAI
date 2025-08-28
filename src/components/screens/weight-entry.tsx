import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { View, Image, Pressable } from 'react-native';

import { Button } from '@/components/Button';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedFooter from '@/components/ThemeFooter';
import ThemedText from '@/components/ThemedText';

export default function WeightEntryScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View className="relative flex-1 flex-col bg-background">
      <Header
        className="bg-transparent"
        title="Weight Entry"
        showBackButton
      />
      <View className="relative w-full flex-1 items-center justify-center">
        <Pressable
          className="mb-20 h-44 w-44 items-center justify-center overflow-hidden rounded-xl border border-border bg-secondary"
          onPress={pickImage}>
          {selectedImage ? (
            <Image
              source={{ uri: selectedImage }}
              className="h-full w-full"
              resizeMode="cover"
            />
          ) : (
            <>
              <Icon
                name="Camera"
                size={30}
              />
              <ThemedText className="mt-2 text-sm">Add photo</ThemedText>
            </>
          )}
        </Pressable>
        <WeightBar />
      </View>
      <ThemedFooter className="!bg-transparent">
        <Button
          title="Save"
          className="!bg-highlight"
          textClassName="!text-white"
          onPress={() => {}}
        />
      </ThemedFooter>
    </View>
  );
}

const WeightBar = () => {
  const [weight, setWeight] = useState(74.3);

  const handleDecrease = () => {
    if (weight > 30) {
      setWeight((prev) => Math.max(30, prev - 0.1));
    }
  };

  const handleIncrease = () => {
    if (weight < 200) {
      setWeight((prev) => Math.min(200, prev + 0.1));
    }
  };

  return (
    <>
      <View className="relative z-10 mb-32 px-20">
        <View className="w-full flex-row items-center justify-between pb-20">
          <Icon
            onPress={handleDecrease}
            name="Minus"
            size={20}
            className={`h-10 w-10 rounded-full border border-border ${
              weight <= 30 ? 'bg-border opacity-50' : 'bg-secondary'
            }`}
          />
          <View className="mx-6">
            <ThemedText className="text-center text-5xl font-semibold">{weight.toFixed(1)} kg</ThemedText>
          </View>

          <Icon
            onPress={handleIncrease}
            name="Plus"
            size={20}
            className={`h-10 w-10 rounded-full border border-border ${
              weight >= 200 ? 'bg-border opacity-50' : 'bg-secondary'
            }`}
          />
        </View>
      </View>
    </>
  );
};
