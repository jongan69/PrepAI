import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';

import { Button } from '@/components/Button';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedFooter from '@/components/ThemeFooter';
import ThemedText from '@/components/ThemedText';
import { shadowPresets } from '@/utils/useShadow';

export default function AddWaterScreen() {
  return (
    <View className="relative flex-1 bg-background">
      <Header className="bg-transparent" title="Add Water" showBackButton />

      <View className="relative w-full flex-1 items-center justify-center">
        <WaterBar />
      </View>
      <ThemedFooter className="!bg-transparent">
        <Button
          title="Add Water"
          className="!bg-highlight"
          textClassName="!text-white"
          onPress={() => {}}
        />
      </ThemedFooter>
    </View>
  );
}

const WaterBar = () => {
  const [waterAmount, setWaterAmount] = useState(100);
  const waterHeight = useSharedValue(20); // Start at 20% height

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: `${waterHeight.value}%`,
    };
  });

  const handleDecrease = () => {
    if (waterAmount > 0) {
      const newAmount = waterAmount - 100;
      setWaterAmount(newAmount);
      // Calculate percentage: 0ml = 0%, 500ml = 100%
      const percentage = (newAmount / 500) * 100;
      waterHeight.value = withSpring(percentage);
    }
  };

  const handleIncrease = () => {
    if (waterAmount < 500) {
      const newAmount = waterAmount + 100;
      setWaterAmount(newAmount);
      // Calculate percentage: 0ml = 0%, 500ml = 100%
      const percentage = (newAmount / 500) * 100;
      waterHeight.value = withSpring(percentage);
    }
  };

  return (
    <>
      <View className="relative z-10">
        <View className="flex-row items-center justify-between">
          <Icon
            onPress={handleDecrease}
            name="Minus"
            size={20}
            className={`h-10 w-10 rounded-full border border-border ${waterAmount <= 0 ? 'bg-border opacity-50' : 'bg-secondary'}`}
          />
          <View className="mx-4 mt-8 items-center">
            <View
              style={[{ height: 200 }, shadowPresets.large]}
              className="relative w-6 justify-end overflow-hidden rounded-3xl bg-secondary">
              <View className="absolute left-0 top-0 z-50 h-full w-full justify-between opacity-30">
                <View className="h-px w-full bg-transparent" />
                <View className="h-px w-full bg-text" />
                <View className="h-px w-full bg-text" />
                <View className="h-px w-full bg-text" />
                <View className="h-px w-full bg-text" />
                <View className="h-px w-full bg-transparent" />
              </View>
              <Animated.View style={animatedStyle} className="w-full bg-highlight" />
            </View>
            <ThemedText className="mt-4 text-lg font-semibold">{waterAmount} ml</ThemedText>
          </View>

          <Icon
            onPress={handleIncrease}
            name="Plus"
            size={20}
            className={`h-10 w-10 rounded-full border border-border ${waterAmount >= 500 ? 'bg-border opacity-50' : 'bg-secondary'}`}
          />
        </View>
        <View className="mt-8 flex-row items-center justify-between gap-2">
          <GlassCard amount={200} />
          <GlassCard amount={300} />
          <GlassCard amount={500} />
        </View>
      </View>
      {/*<View className=' items-center h-screen w-screen absolute bottom-0 left-0 right-0 opacity-10'>
                <View style={[{ height: "100%" }, shadowPresets.large]} className='w-screen bg-transparent  relative justify-end overflow-hidden'>
                    <Animated.View style={animatedStyle} className='w-full bg-highlight' />
                </View>
            </View>*/}
    </>
  );
};

const GlassCard = (props: any) => {
  return (
    <Pressable className="relative w-28 items-center justify-center rounded-xl bg-secondary py-4">
      <Icon name="GlassWater" size={20} className="h-12 w-12 rounded-full bg-background" />
      <ThemedText className="mt-4 text-sm font-semibold">{props.amount} ml</ThemedText>
    </Pressable>
  );
};
