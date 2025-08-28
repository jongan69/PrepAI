import React, { useRef, useState, useEffect } from 'react';
import { View, Pressable, Text, Animated } from 'react-native';

import { Button } from '@/components/Button';
import Header from '@/components/Header';
import ThemedFooter from '@/components/ThemeFooter';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';

type WorkoutState = 'ready' | 'working' | 'resting';

export default function WorkoutTrackerScreen() {
  const [workoutState, setWorkoutState] = useState<WorkoutState>('ready');
  const [currentSet, setCurrentSet] = useState(1);
  const [totalWorkoutTime, setTotalWorkoutTime] = useState(0);
  const [currentTimer, setCurrentTimer] = useState(0);
  const [reps] = useState(14);

  // Timer effect for total workout time
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalWorkoutTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Timer effect for current activity (set or rest)
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (workoutState === 'working' || workoutState === 'resting') {
      interval = setInterval(() => {
        setCurrentTimer((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [workoutState]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSetButtonPress = () => {
    if (workoutState === 'ready') {
      // Start working
      setWorkoutState('working');
      setCurrentTimer(0);
    } else if (workoutState === 'working') {
      // Start resting
      setWorkoutState('resting');
      setCurrentTimer(0);
    } else if (workoutState === 'resting') {
      // Next set
      setCurrentSet((prev) => prev + 1);
      setWorkoutState('working');
      setCurrentTimer(0);
    }
  };

  const getButtonText = () => {
    switch (workoutState) {
      case 'ready':
        return 'Start';
      case 'working':
        return 'Stop';
      case 'resting':
        return 'Next Set';
      default:
        return 'Start';
    }
  };

  const getTimerLabel = () => {
    switch (workoutState) {
      case 'ready':
        return 'Timer';
      case 'working':
        return 'Set Time';
      case 'resting':
        return 'Rest Time';
      default:
        return 'Timer';
    }
  };

  return (
    <>
      <View className="flex-1">
        <Header
          className="bg-secondary"
          title="Workout"
          showBackButton
          rightComponents={[
            <View className="flex-row items-center justify-center rounded-full border border-border bg-background px-3 py-1">
              <ThemedText className="text-lg font-semibold">
                {formatTime(totalWorkoutTime)}
              </ThemedText>
              <View className="ml-4 h-3 w-3 rounded-full bg-highlight" />
            </View>,
          ]}
        />
        <View className=" items-center justify-center bg-secondary py-global">
          <View className="w-full flex-row items-center justify-between px-8">
            <View className="h-24 w-24 items-center justify-center rounded-full border border-border bg-background">
              <ThemedText className="text-sm">Set</ThemedText>
              <ThemedText className="text-lg font-bold">{currentSet}</ThemedText>
            </View>
            <SetButton
              onPress={handleSetButtonPress}
              text={getButtonText()}
              isActive={workoutState === 'working'}
            />
            <View className="h-24 w-24 items-center justify-center rounded-full border border-border bg-background">
              <ThemedText className="text-sm">Reps</ThemedText>
              <ThemedText className="text-lg font-bold">{reps}</ThemedText>
            </View>
          </View>
          <View className="mt-6 w-full flex-row  items-center justify-between">
            <View className="h-px flex-1 bg-border" />
            <View className="h-24 w-24 items-center justify-center rounded-full border border-border bg-background">
              <ThemedText className="text-sm">{getTimerLabel()}</ThemedText>
              <ThemedText className="text-lg font-bold">{formatTime(currentTimer)}</ThemedText>
            </View>
            <View className="h-px flex-1 bg-border" />
          </View>
        </View>
        <ThemedScroller className="!px-0">
          <View className="p-global">
            <SetCard
              title="Press up"
              description="2 sets"
              timer={formatTime(currentTimer)}
              isActive
            />
            <SetCard title="Dumbbell press" description="3 sets" timer="0:00" isActive={false} />
            <SetCard title="Push up" description="2 sets" timer="0:00" isActive={false} />
            <SetCard title="Pull up" description="2 sets" timer="0:00" isActive={false} />
            <SetCard title="Incline push up" description="2 sets" timer="0:00" isActive={false} />
            <SetCard title="Incline pull up" description="2 sets" timer="0:00" isActive={false} />
          </View>
        </ThemedScroller>
        <ThemedFooter>
          <Button title="Finish" size="large" rounded="full" />
        </ThemedFooter>
      </View>
    </>
  );
}

const SetCard = (props: any) => {
  return (
    <View
      className={`mb-3 flex flex-row items-center justify-start rounded-2xl bg-secondary p-5 ${props.isActive ? 'border border-highlight' : 'border border-transparent'}`}>
      <View>
        <ThemedText className="text-base font-semibold ">{props.title}</ThemedText>
        <ThemedText className="text-sm">{props.description}</ThemedText>
      </View>
      <View className="ml-auto flex-row items-center justify-center">
        <ThemedText className="mr-4 text-sm">{props.timer}</ThemedText>
        {props.isActive ? (
          <View className="h-3 w-3 rounded-full bg-highlight" />
        ) : (
          <View className="h-3 w-3 rounded-full bg-border" />
        )}
      </View>
    </View>
  );
};

const SetButton = ({
  onPress,
  text,
  isActive,
}: {
  onPress: () => void;
  text: string;
  isActive: boolean;
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isActive, pulseAnim]);

  return (
    <View className="h-40 w-40 items-center justify-center rounded-full border border-text bg-background p-4">
      <Animated.View
        style={{
          transform: [{ scale: pulseAnim }],
          width: '100%',
          height: '100%',
        }}>
        <Pressable
          onPress={onPress}
          className={`h-full w-full items-center justify-center rounded-full ${
            isActive ? 'bg-text' : 'bg-text'
          }`}>
          <Text
            className={`text-base font-semibold uppercase ${
              isActive ? 'text-background' : 'text-background'
            }`}>
            {text}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};
