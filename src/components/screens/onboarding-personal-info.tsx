import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { RulerPicker } from 'react-native-ruler-picker';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

import { useThemeColors } from '@/contexts/ThemeColors';

import { Button } from '@/components/Button';
import Icon from '@/components/Icon';
import MultiStep, { Step } from '@/components/MultiStep';
import ThemedText from '@/components/ThemedText';
import { DatePicker } from '@/components/forms/DatePicker';
import Selectable from '@/components/forms/Selectable';
import { useDatabase } from '@/contexts/DatabaseProvider';
import { storageManager } from '@/utils/storage';

export default function OnboardingStart() {
  const { userId } = useDatabase();

  return (
    <MultiStep
      onComplete={async () => {
        router.replace('/(mobile)/(onboarding)/complete');
      }}
      onClose={() => router.push('/(mobile)/(index)')}>
      <Step title="Sex">
        <Gender userId={userId} />
      </Step>

      <Step title="Birthday">
        <Birthday userId={userId} />
      </Step>

      <Step title="Height">
        <Height userId={userId} />
      </Step>

      <Step title="Weight">
        <Weight userId={userId} />
      </Step>

      <Step title="Trend">
        <Trend userId={userId} />
      </Step>
      <Step title="Frequency">
        <Frequency userId={userId} />
      </Step>
    </MultiStep>
  );
}

const Gender = ({ userId }: { userId: string | null }) => {
  const [gender, setGender] = useState<'Male' | 'Female'>();

  const handleGenderSelect = async (selectedGender: 'Male' | 'Female') => {
    setGender(selectedGender);
    await storageManager.saveUserPreferences({ gender: selectedGender }, userId || undefined);
  };

  return (
    <View className="flex-1 px-global">
      <ThemedText className="mb-7 text-center text-3xl font-bold">What is your sex?</ThemedText>
      <Selectable
        title="Male"
        icon="Mars"
        onPress={() => handleGenderSelect('Male')}
        selected={gender === 'Male'}
      />
      <Selectable
        title="Female"
        icon="Venus"
        onPress={() => handleGenderSelect('Female')}
        selected={gender === 'Female'}
      />
    </View>
  );
};

const Birthday = ({ userId }: { userId: string | null }) => {
  const [birthday, setBirthday] = useState<Date>(new Date('1990-01-01'));

  const handleBirthdayChange = async (date: Date) => {
    setBirthday(date);
    await storageManager.saveUserPreferences({ birthday: date }, userId || undefined);
  };

  return (
    <View className="flex-1 px-global">
      <Icon
        name="Cake"
        size={30}
        className="mx-auto my-8 h-20 w-20 rounded-full border border-border"
      />
      <ThemedText className="mb-7 text-center text-3xl font-bold">
        When is your birthday?
      </ThemedText>

      <DatePicker label="Birthday" onChange={handleBirthdayChange} value={birthday} />
    </View>
  );
};

const Trend = ({ userId }: { userId: string | null }) => {
  const [trend, setTrend] = useState<'up' | 'down' | 'stable' | 'not-sure'>();

  const handleTrendSelect = async (selectedTrend: 'up' | 'down' | 'stable' | 'not-sure') => {
    setTrend(selectedTrend);
    await storageManager.saveUserPreferences({ weightTrend: selectedTrend }, userId || undefined);
  };

  return (
    <View className="flex-1 px-global">
      <ThemedText className="mb-7 text-center text-3xl font-bold">
        How was your weight past week?
      </ThemedText>
      <Selectable
        title="I have been gaining weight"
        icon="ArrowUp"
        onPress={() => handleTrendSelect('up')}
        selected={trend === 'up'}
      />
      <Selectable
        title="I have been losing weight"
        icon="ArrowDown"
        onPress={() => handleTrendSelect('down')}
        selected={trend === 'down'}
      />
      <Selectable
        title="I have been stable"
        icon="Minus"
        onPress={() => handleTrendSelect('stable')}
        selected={trend === 'stable'}
      />
      <Selectable
        title="Not sure"
        icon="FileQuestion"
        onPress={() => handleTrendSelect('not-sure')}
        selected={trend === 'not-sure'}
      />
    </View>
  );
};

const Frequency = ({ userId }: { userId: string | null }) => {
  const [frequency, setFrequency] = useState<'0' | '1-3' | '4-6' | '7+'>();

  const handleFrequencySelect = async (selectedFrequency: '0' | '1-3' | '4-6' | '7+') => {
    setFrequency(selectedFrequency);
    await storageManager.saveUserPreferences(
      { exerciseFrequency: selectedFrequency },
      userId || undefined
    );
  };

  return (
    <View className="flex-1 px-global">
      <View className=" mb-7">
        <ThemedText className="text-center text-3xl font-bold">
          How often do you exercise?
        </ThemedText>
        <ThemedText className="text-center text-base opacity-60">
          Estimate workouts, recreational sports or resistance training.
        </ThemedText>
      </View>
      <Selectable
        title="0 times a week"
        icon="Calendar"
        onPress={() => handleFrequencySelect('0')}
        selected={frequency === '0'}
      />
      <Selectable
        title="1-3 times a week"
        icon="Calendar1"
        onPress={() => handleFrequencySelect('1-3')}
        selected={frequency === '1-3'}
      />
      <Selectable
        title="4-6 times a week"
        icon="CalendarDays"
        onPress={() => handleFrequencySelect('4-6')}
        selected={frequency === '4-6'}
      />
      <Selectable
        title="7+ times a week"
        icon="CalendarRange"
        onPress={() => handleFrequencySelect('7+')}
        selected={frequency === '7+'}
      />
    </View>
  );
};

const Height = ({ userId }: { userId: string | null }) => {
  const [height, setHeight] = useState<string>('170');
  const [unit, setUnit] = useState<'cm' | 'ft'>('cm');
  const colors = useThemeColors();

  const handleHeightChange = async (value: string) => {
    setHeight(value);
    await storageManager.saveUserPreferences(
      {
        height: { value: parseInt(value, 10), unit },
      },
      userId || undefined
    );
  };

  const handleUnitChange = async (newUnit: 'cm' | 'ft') => {
    setUnit(newUnit);
    await storageManager.saveUserPreferences(
      {
        height: { value: parseInt(height, 10), unit: newUnit },
      },
      userId || undefined
    );
  };

  return (
    <View className="flex-1 px-global">
      <ThemedText className="mb-7 text-center text-3xl font-bold">How tall are you?</ThemedText>
      <View className="mx-auto mb-20 w-1/2">
        <View className="flex-row items-center justify-center gap-2">
          <Button
            title="cm"
            variant={unit === 'cm' ? 'primary' : 'outline'}
            onPress={() => handleUnitChange('cm')}
          />
          <Button
            title="ft"
            variant={unit === 'ft' ? 'primary' : 'outline'}
            onPress={() => handleUnitChange('ft')}
          />
        </View>
      </View>
      <View className="flex-1 items-center justify-start">
        {unit === 'cm' ? (
          <WheelPickerExpo
            height={300}
            width={150}
            backgroundColor={colors.bg}
            initialSelectedIndex={70}
            items={Array.from({ length: 150 }, (_, i) => i + 100).map((h) => ({
              label: h.toString(),
              value: h.toString(),
            }))}
            onChange={({ item }) => handleHeightChange(item.label)}
          />
        ) : (
          <WheelPickerExpo
            height={300}
            width={150}
            backgroundColor={colors.bg}
            initialSelectedIndex={10}
            items={(() => {
              const items = [];
              for (let feet = 4; feet <= 7; feet++) {
                for (let inches = 0; inches <= 11; inches++) {
                  const label = `${feet}'${inches}"`;
                  items.push({ label, value: `${feet}.${inches}` });
                }
              }
              return items;
            })()}
            onChange={({ item }) => handleHeightChange(item.label)}
          />
        )}
      </View>
    </View>
  );
};

const Weight = ({ userId }: { userId: string | null }) => {
  const [weight, setWeight] = useState<string>('170');
  const [unit, setUnit] = useState<'kg' | 'lb'>('kg');
  const colors = useThemeColors();

  const handleWeightChange = async (value: string) => {
    setWeight(value);
    await storageManager.saveUserPreferences(
      {
        weight: { value: parseInt(value, 10), unit },
      },
      userId || undefined
    );
  };

  const handleUnitChange = async (newUnit: 'kg' | 'lb') => {
    setUnit(newUnit);
    await storageManager.saveUserPreferences(
      {
        weight: { value: parseInt(weight, 10), unit: newUnit },
      },
      userId || undefined
    );
  };

  return (
    <View className="flex-1">
      <ThemedText className="mb-7 text-center text-3xl font-bold">What is your weight?</ThemedText>
      <View className="mx-auto mb-20 w-1/2">
        <View className="flex-row items-center justify-center gap-2">
          <Button
            title="kg"
            variant={unit === 'kg' ? 'primary' : 'outline'}
            onPress={() => handleUnitChange('kg')}
          />
          <Button
            title="lb"
            variant={unit === 'lb' ? 'primary' : 'outline'}
            onPress={() => handleUnitChange('lb')}
          />
        </View>
      </View>
      <View className="flex-1 items-center justify-center">
        {Platform.OS === 'ios' ? (
          <ThemedText className="translate-y-20 text-center text-5xl font-bold">
            {weight} {unit}
          </ThemedText>
        ) : (
          <></>
        )}
        {unit === 'kg' ? (
          <RulerPicker
            min={40}
            max={200}
            step={1}
            fractionDigits={0}
            initialValue={80}
            unit="kg"
            indicatorColor={colors.text}
            valueTextStyle={{ color: `${Platform.OS === 'ios' ? 'transparent' : colors.text}` }}
            unitTextStyle={{ color: `${Platform.OS === 'ios' ? 'transparent' : colors.text}` }}
            onValueChange={(value) => handleWeightChange(value)}
          />
        ) : (
          <RulerPicker
            min={40}
            max={200}
            step={1}
            fractionDigits={0}
            initialValue={160}
            unit="lb"
            indicatorColor={colors.text}
            valueTextStyle={{ color: `${Platform.OS === 'ios' ? 'transparent' : colors.text}` }}
            unitTextStyle={{ color: `${Platform.OS === 'ios' ? 'transparent' : colors.text}` }}
            onValueChange={(value) => handleWeightChange(value)}
          />
        )}
      </View>
    </View>
  );
};
