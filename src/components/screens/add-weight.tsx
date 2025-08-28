import React, { useState } from 'react';
import { View, Pressable } from 'react-native';

import { Button } from '@/components/Button';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedFooter from '@/components/ThemeFooter';
import ThemedText from '@/components/ThemedText';

export default function AddWeightScreen() {
  return (
    <View className="relative flex-1 bg-background">
      <Header className="bg-transparent" title="Add Weight" showBackButton />
      <View className="relative w-full flex-1 items-center justify-center">
        <WeightBar />
      </View>
      <ThemedFooter className="!bg-transparent">
        <Button
          title="Add Weight"
          className="!bg-highlight"
          textClassName="!text-white"
          onPress={() => {}}
        />
      </ThemedFooter>
    </View>
  );
}

const WeightBar = () => {
  const [isKgActive, setIsKgActive] = useState(true);
  const [weight, setWeight] = useState(74.3);

  const handleDecrease = () => {
    const increment = isKgActive ? 0.1 : 0.2;
    const minWeight = isKgActive ? 30 : 66;

    if (weight > minWeight) {
      setWeight((prev) => Math.max(minWeight, prev - increment));
    }
  };

  const handleIncrease = () => {
    const increment = isKgActive ? 0.1 : 0.2;
    const maxWeight = isKgActive ? 200 : 440;

    if (weight < maxWeight) {
      setWeight((prev) => Math.min(maxWeight, prev + increment));
    }
  };

  const getDisplayValue = () => {
    if (isKgActive) {
      return `${weight.toFixed(1)} kg`;
    } else {
      return `${(weight * 2.20462).toFixed(1)} lb`;
    }
  };

  return (
    <>
      <View className="relative z-10 flex-1 px-global">
        <View className="mt-10 flex-row overflow-hidden rounded-xl bg-secondary p-1">
          <Pressable
            onPress={() => setIsKgActive(true)}
            className={`flex-1 rounded-xl px-4 py-2.5 ${isKgActive ? 'bg-background' : 'bg-transparent'}`}>
            <ThemedText className="text-center text-sm font-medium">KG</ThemedText>
          </Pressable>
          <Pressable
            onPress={() => setIsKgActive(false)}
            className={`flex-1 rounded-xl px-4 py-2.5 ${!isKgActive ? 'bg-background' : 'bg-transparent'}`}>
            <ThemedText className="text-center text-sm font-medium">LB</ThemedText>
          </Pressable>
        </View>
        <View className="w-full flex-1 flex-row items-center justify-between pb-20">
          <Icon
            onPress={handleDecrease}
            name="Minus"
            size={20}
            className={`h-10 w-10 rounded-full border border-border ${
              weight <= (isKgActive ? 30 : 66) ? 'bg-border opacity-50' : 'bg-secondary'
            }`}
          />
          <View className="mx-6">
            <ThemedText className="text-center text-5xl font-semibold">
              {getDisplayValue()}
            </ThemedText>
          </View>

          <Icon
            onPress={handleIncrease}
            name="Plus"
            size={20}
            className={`h-10 w-10 rounded-full border border-border ${
              weight >= (isKgActive ? 200 : 440) ? 'bg-border opacity-50' : 'bg-secondary'
            }`}
          />
        </View>
      </View>
    </>
  );
};
