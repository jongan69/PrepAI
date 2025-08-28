import React from 'react';
import { View, Pressable } from 'react-native';

import Icon from '@/components/Icon';
import ThemedText from '@/components/ThemedText';

interface Set {
  id: string;
  reps: number;
  weight: number;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface ExerciseSetTrackerProps {
  exerciseName: string;
  target: string;
  sets: Set[];
  onSetPress?: (setId: string) => void;
  onAddSet?: () => void;
  showAddButton?: boolean;
}

export default function ExerciseSetTracker({
  exerciseName,
  target,
  sets,
  onSetPress,
  onAddSet,
  showAddButton = false,
}: ExerciseSetTrackerProps) {
  const renderSet = (set: Set) => (
    <Pressable
      key={set.id}
      onPress={() => onSetPress?.(set.id)}
      className={`h-12 w-12 items-center justify-center rounded-full ${
        set.isCurrent
          ? 'bg-highlight'
          : set.isCompleted
            ? 'border border-highlight bg-secondary'
            : 'border border-border bg-secondary'
      }`}>
      <ThemedText
        className={`text-sm font-medium ${
          set.isCurrent ? 'text-background' : set.isCompleted ? 'text-highlight' : 'text-text'
        }`}>
        {set.reps}
      </ThemedText>
      {set.weight > 0 && (
        <ThemedText
          className={`text-xs ${
            set.isCurrent ? 'text-background' : set.isCompleted ? 'text-highlight' : 'text-subtext'
          }`}>
          {set.weight}
        </ThemedText>
      )}
    </Pressable>
  );

  return (
    <View className="mb-6">
      <View className="mb-3 flex-row items-center justify-between">
        <ThemedText className="text-lg font-semibold">{exerciseName}</ThemedText>
        <View className="flex-row items-center">
          <ThemedText className="text-subtext mr-2 text-sm">{target}</ThemedText>
          <Icon
            name="ChevronRight"
            size={16}
            className="text-highlight"
          />
        </View>
      </View>

      <View className="flex-row flex-wrap gap-2">
        {sets.map(renderSet)}

        {showAddButton && (
          <Pressable
            onPress={onAddSet}
            className="h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary">
            <Icon
              name="Plus"
              size={20}
              className="text-subtext"
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}
