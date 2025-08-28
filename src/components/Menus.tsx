import * as Menu from "@/components/DropdownMenu";

import { router } from "expo-router";
import React from "react";
import {
  Alert,
  Platform,
  Text,
  View,
  Share,
  useColorScheme,
} from "react-native";
import { MaterialIcons, Ionicons } from "@/components/Icons";
import { launchApp } from "@/lib/utils";

// Workout categories for the app
const WORKOUT_CATEGORIES = [
  { name: "Strength Training", icon: "fitness-center", color: "#FF3B31" },
  { name: "Cardio", icon: "directions-run", color: "#34C760" },
  { name: "Yoga", icon: "self-improvement", color: "#AF51DE" },
  { name: "Pilates", icon: "accessibility", color: "#107AFF" },
  { name: "Functional", icon: "sports-gymnastics", color: "#FF9501" },
  { name: "Flexibility", icon: "stretch", color: "#00C7BF" },
] as const;

// Exercise types for different workouts
const EXERCISE_TYPES = [
  { name: "Compound Movements", examples: "Squats, Deadlifts, Bench Press" },
  { name: "Isolation Exercises", examples: "Bicep Curls, Tricep Extensions" },
  { name: "Bodyweight", examples: "Push-ups, Pull-ups, Planks" },
  { name: "Cardio", examples: "Running, Cycling, Jump Rope" },
  { name: "Stretching", examples: "Dynamic, Static, PNF" },
  { name: "Core", examples: "Crunches, Planks, Russian Twists" },
] as const;

// Meal types for nutrition tracking
const MEAL_TYPES = [
  { name: "Breakfast", icon: "wb-sunny", time: "6-9 AM" },
  { name: "Lunch", icon: "wb-sunny", time: "12-2 PM" },
  { name: "Dinner", icon: "nightlight", time: "6-8 PM" },
  { name: "Snack", icon: "restaurant", time: "Throughout day" },
] as const;

// Fitness goals for user profiles
const FITNESS_GOALS = [
  { name: "Lose Weight", icon: "trending-down", description: "Reduce body fat" },
  { name: "Gain Weight", icon: "trending-up", description: "Build muscle mass" },
  { name: "Maintain", icon: "trending-flat", description: "Stay current weight" },
  { name: "Build Muscle", icon: "fitness-center", description: "Increase strength" },
  { name: "Improve Fitness", icon: "directions-run", description: "General fitness" },
] as const;

export function WorkoutMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root>
      <Menu.Trigger
        asChild={Platform.OS !== "web"}
        className="flex flex-1 outline-none items-center justify-center"
        style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
      >
        {children}
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Label>Workout Options</Menu.Label>
        <Menu.Separator />
        
        <Menu.Sub key="workout-categories">
          <Menu.SubTrigger key="categories-trigger">
            <Menu.ItemIcon ios={{ name: "dumbbell" }}>
              <MaterialIcons name="fitness-center" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Workout Categories</Menu.ItemTitle>
          </Menu.SubTrigger>

          <Menu.SubContent>
            <Menu.Group>
              {WORKOUT_CATEGORIES.map((category) => (
                <Menu.Item key={category.name}>
                  <Menu.ItemIcon
                    ios={{
                      name: "circle.fill",
                      hierarchicalColor: category.color,
                    }}
                  >
                    <MaterialIcons
                      name={category.icon as any}
                      color={category.color}
                      size={16}
                    />
                  </Menu.ItemIcon>
                  <Menu.ItemTitle>{category.name}</Menu.ItemTitle>
                </Menu.Item>
              ))}
            </Menu.Group>
            <Menu.Item key="new-category">
              <Menu.ItemIcon ios={{ name: "plus" }}>
                <Ionicons name="add" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>New Category</Menu.ItemTitle>
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>

        <Menu.Sub key="exercise-types">
          <Menu.SubTrigger key="exercise-trigger">
            <Menu.ItemIcon ios={{ name: "figure.strengthtraining.traditional" }}>
              <MaterialIcons name="sports" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Exercise Types</Menu.ItemTitle>
          </Menu.SubTrigger>

          <Menu.SubContent>
            <Menu.Group>
              {EXERCISE_TYPES.map((exercise) => (
                <Menu.Item key={exercise.name}>
                  <Menu.ItemTitle>{exercise.name}</Menu.ItemTitle>
                  <Menu.ItemSubtitle>{exercise.examples}</Menu.ItemSubtitle>
                </Menu.Item>
              ))}
            </Menu.Group>
            <Menu.Item key="new-exercise">
              <Menu.ItemIcon ios={{ name: "plus" }}>
                <Ionicons name="add" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>New Exercise</Menu.ItemTitle>
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>

        <Menu.Sub key="workout-templates">
          <Menu.SubTrigger key="templates-trigger">
            <Menu.ItemIcon ios={{ name: "doc.text" }}>
              <MaterialIcons name="article" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Workout Templates</Menu.ItemTitle>
          </Menu.SubTrigger>
          <Menu.SubContent>
            <Menu.Group>
              <Menu.Item key="strength-template">
                <Menu.ItemIcon ios={{ name: "dumbbell" }}>
                  <MaterialIcons name="fitness-center" size={16} />
                </Menu.ItemIcon>
                <Menu.ItemTitle>Strength Training</Menu.ItemTitle>
                <Menu.ItemSubtitle>5x5, Push/Pull/Legs</Menu.ItemSubtitle>
              </Menu.Item>
              <Menu.Item key="cardio-template">
                <Menu.ItemIcon ios={{ name: "figure.run" }}>
                  <MaterialIcons name="directions-run" size={16} />
                </Menu.ItemIcon>
                <Menu.ItemTitle>Cardio Workout</Menu.ItemTitle>
                <Menu.ItemSubtitle>HIIT, Steady State</Menu.ItemSubtitle>
              </Menu.Item>
              <Menu.Item key="yoga-template">
                <Menu.ItemIcon ios={{ name: "figure.mind.and.body" }}>
                  <MaterialIcons name="self-improvement" size={16} />
                </Menu.ItemIcon>
                <Menu.ItemTitle>Yoga Flow</Menu.ItemTitle>
                <Menu.ItemSubtitle>Vinyasa, Hatha, Restorative</Menu.ItemSubtitle>
              </Menu.Item>
            </Menu.Group>
            <Menu.Item key="new-template">
              <Menu.ItemIcon ios={{ name: "plus" }}>
                <Ionicons name="add" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>Create Template</Menu.ItemTitle>
            </Menu.Item>
          </Menu.SubContent>
        </Menu.Sub>
      </Menu.Content>
    </Menu.Root>
  );
}

export function NutritionMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root>
      <Menu.Trigger className="flex justify-center align-center outline-none">
        {children}
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Label>Nutrition Options</Menu.Label>
        <Menu.Separator />
        
        <Menu.Group>
          <Menu.Sub key="meal-types">
            <Menu.SubTrigger key="meal-trigger">
              <Menu.ItemIcon ios={{ name: "fork.knife" }}>
                <MaterialIcons name="restaurant" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>Meal Types</Menu.ItemTitle>
            </Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Group>
                {MEAL_TYPES.map((meal) => (
                  <Menu.Item key={meal.name}>
                    <Menu.ItemIcon ios={{ name: meal.icon }}>
                      <MaterialIcons name={meal.icon as any} size={16} />
                    </Menu.ItemIcon>
                    <Menu.ItemTitle>{meal.name}</Menu.ItemTitle>
                    <Menu.ItemSubtitle>{meal.time}</Menu.ItemSubtitle>
                  </Menu.Item>
                ))}
              </Menu.Group>
            </Menu.SubContent>
          </Menu.Sub>

          <Menu.Sub key="nutrition-tracking">
            <Menu.SubTrigger key="tracking-trigger">
              <Menu.ItemIcon ios={{ name: "chart.bar" }}>
                <MaterialIcons name="bar-chart" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>Nutrition Tracking</Menu.ItemTitle>
            </Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item key="calories">
                <Menu.ItemIcon ios={{ name: "flame" }}>
                  <MaterialIcons name="whatshot" size={16} />
                </Menu.ItemIcon>
                <Menu.ItemTitle>Calories</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item key="macros">
                <Menu.ItemIcon ios={{ name: "chart.pie" }}>
                  <MaterialIcons name="pie-chart" size={16} />
                </Menu.ItemIcon>
                <Menu.ItemTitle>Macronutrients</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item key="water">
                <Menu.ItemIcon ios={{ name: "drop" }}>
                  <MaterialIcons name="water-drop" size={16} />
                </Menu.ItemIcon>
                <Menu.ItemTitle>Water Intake</Menu.ItemTitle>
              </Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>
        </Menu.Group>

        <Menu.Group>
          <Menu.Item key="add-meal">
            <Menu.ItemIcon ios={{ name: "plus" }}>
              <Ionicons name="add" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Add Meal</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="meal-plan">
            <Menu.ItemIcon ios={{ name: "calendar" }}>
              <MaterialIcons name="event" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Generate Meal Plan</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}

export function ProgressMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root>
      <Menu.Trigger
        asChild={Platform.OS !== "web"}
        className="flex flex-1 outline-none items-center justify-center"
        style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
      >
        {children}
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Label>Progress Tracking</Menu.Label>
        <Menu.Separator />
        
        <Menu.Group>
          <Menu.Item key="weight-tracking">
            <Menu.ItemIcon ios={{ name: "scalemass" }}>
              <MaterialIcons name="monitor-weight" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Weight Tracking</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="body-measurements">
            <Menu.ItemIcon ios={{ name: "ruler" }}>
              <MaterialIcons name="straighten" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Body Measurements</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="progress-photos">
            <Menu.ItemIcon ios={{ name: "camera" }}>
              <MaterialIcons name="camera-alt" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Progress Photos</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>

        <Menu.Group>
          <Menu.Sub key="fitness-goals">
            <Menu.SubTrigger key="goals-trigger">
              <Menu.ItemIcon ios={{ name: "target" }}>
                <MaterialIcons name="flag" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>Fitness Goals</Menu.ItemTitle>
            </Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Group>
                {FITNESS_GOALS.map((goal) => (
                  <Menu.Item key={goal.name}>
                    <Menu.ItemIcon ios={{ name: goal.icon }}>
                      <MaterialIcons name={goal.icon as any} size={16} />
                    </Menu.ItemIcon>
                    <Menu.ItemTitle>{goal.name}</Menu.ItemTitle>
                    <Menu.ItemSubtitle>{goal.description}</Menu.ItemSubtitle>
                  </Menu.Item>
                ))}
              </Menu.Group>
            </Menu.SubContent>
          </Menu.Sub>

          <Menu.Item key="workout-stats">
            <Menu.ItemIcon ios={{ name: "chart.line.uptrend.xyaxis" }}>
              <MaterialIcons name="trending-up" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Workout Statistics</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}

export function SettingsMenu({ children }: { children?: React.ReactElement }) {
  const isDark = useColorScheme() === "dark";

  return (
    <Menu.Root>
      <Menu.Trigger className="flex justify-center align-center outline-none">
        {children}
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Label>App Settings</Menu.Label>
        <Menu.Separator />
        
        <Menu.Group>
          <Menu.Item key="profile">
            <Menu.ItemIcon ios={{ name: "person" }}>
              <MaterialIcons name="person" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Profile Settings</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="notifications">
            <Menu.ItemIcon ios={{ name: "bell" }}>
              <MaterialIcons name="notifications" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Notifications</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="privacy">
            <Menu.ItemIcon ios={{ name: "lock" }}>
              <MaterialIcons name="security" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Privacy & Security</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>

        <Menu.Group>
          <Menu.Item key="units">
            <Menu.ItemIcon ios={{ name: "ruler" }}>
              <MaterialIcons name="straighten" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Units (Metric/Imperial)</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="sync">
            <Menu.ItemIcon ios={{ name: "icloud" }}>
              <MaterialIcons name="cloud-sync" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Sync Settings</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>

        <Menu.Group horizontal>
          <Menu.Item
            key="light-mode"
            textValue="light"
            shouldDismissMenuOnSelect={false}
          >
            <Menu.ItemIcon
              ios={{
                name: "sun.max",
                hierarchicalColor: !isDark ? "black" : "rgba(0,0,0,0.3)",
              }}
            >
              <MaterialIcons name="wb-sunny" size={16} />
            </Menu.ItemIcon>
          </Menu.Item>
          <Menu.Item
            key="dark-mode"
            textValue="dark"
            shouldDismissMenuOnSelect={false}
          >
            <Menu.ItemIcon
              ios={{
                name: "moon",
                hierarchicalColor: isDark ? "white" : "rgba(0,0,0,0.3)",
              }}
            >
              <MaterialIcons name="nightlight" size={16} />
            </Menu.ItemIcon>
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}

export function ShareMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root>
      <Menu.Trigger
        asChild={Platform.OS !== "web"}
        className="flex flex-1 outline-none items-center justify-center"
        style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
      >
        {children}
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Label>Share</Menu.Label>
        <Menu.Separator />
        {getShareOptions()}
      </Menu.Content>
    </Menu.Root>
  );
}

export function getShareOptions() {
  return (
    <>
      <Menu.Group>
        <Menu.Item key="share-workout" onSelect={() => launchApp()}>
          <Menu.ItemIcon ios={{ name: "dumbbell" }}>
            <MaterialIcons name="fitness-center" size={16} />
          </Menu.ItemIcon>
          <Menu.ItemTitle>Share Workout</Menu.ItemTitle>
          <Menu.ItemSubtitle>Share your workout routine</Menu.ItemSubtitle>
        </Menu.Item>
      </Menu.Group>

      <Menu.Group>
        <Menu.Item key="share-progress">
          <Menu.ItemIcon ios={{ name: "chart.line.uptrend.xyaxis" }}>
            <MaterialIcons name="trending-up" size={16} />
          </Menu.ItemIcon>
          <Menu.ItemTitle>Share Progress</Menu.ItemTitle>
          <Menu.ItemSubtitle>Share your fitness journey</Menu.ItemSubtitle>
        </Menu.Item>
      </Menu.Group>

      <Menu.Group>
        <Menu.Item
          key="share-app"
          onSelect={() => {
            Share.share({
              message: "Check out this amazing fitness app!",
              url: "https://expo.dev",
            });
          }}
        >
          <Menu.ItemIcon ios={{ name: "square.and.arrow.up" }}>
            <MaterialIcons name="share" size={16} />
          </Menu.ItemIcon>
          <Menu.ItemTitle>Share App</Menu.ItemTitle>
        </Menu.Item>

        <Menu.Item
          key="invite-friends"
          onSelect={() => {
            router.push("sms://?body=Join me on this fitness journey! https://expo.dev");
          }}
        >
          <Menu.ItemIcon ios={{ name: "person.2" }}>
            <MaterialIcons name="group-add" size={16} />
          </Menu.ItemIcon>
          <Menu.ItemTitle>Invite Friends</Menu.ItemTitle>
          <Menu.ItemSubtitle>Send with Messages</Menu.ItemSubtitle>
        </Menu.Item>
      </Menu.Group>
    </>
  );
}

export function WorkoutHistoryMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root>
      <Menu.Trigger className="outline-none">
        <View className="flex flex-row gap-2 items-center justify-end">
          <MaterialIcons name="history" size={24} />
          <Text className="font-bold text-black dark:text-white">
            Workout History
          </Text>
        </View>
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Label>Filter Workouts</Menu.Label>
        <Menu.Separator />
        
        <Menu.Group>
          <Menu.Item key="all-workouts">
            <Menu.ItemIcon ios={{ name: "list.bullet" }}>
              <MaterialIcons name="list" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>All Workouts</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="completed-workouts">
            <Menu.ItemIcon ios={{ name: "checkmark.circle" }}>
              <MaterialIcons name="check-circle" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Completed</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="incomplete-workouts">
            <Menu.ItemIcon ios={{ name: "circle" }}>
              <MaterialIcons name="radio-button-unchecked" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Incomplete</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>

        <Menu.Group>
          <Menu.Sub key="sort-by">
            <Menu.SubTrigger key="sort-trigger">
              <Menu.ItemIcon ios={{ name: "arrow.up.arrow.down" }}>
                <MaterialIcons name="sort" size={16} />
              </Menu.ItemIcon>
              <Menu.ItemTitle>Sort By</Menu.ItemTitle>
            </Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item key="date">
                <Menu.ItemTitle>Date</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item key="duration">
                <Menu.ItemTitle>Duration</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item key="calories">
                <Menu.ItemTitle>Calories Burned</Menu.ItemTitle>
              </Menu.Item>
              <Menu.Item key="category">
                <Menu.ItemTitle>Category</Menu.ItemTitle>
              </Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>

          <Menu.Item key="export-data">
            <Menu.ItemIcon ios={{ name: "square.and.arrow.up" }}>
              <MaterialIcons name="file-download" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Export Data</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}

export function QuickActionsMenu({ children }: { children?: React.ReactElement }) {
  return (
    <Menu.Root>
      <Menu.Trigger className="flex justify-center align-center outline-none">
        {children}
      </Menu.Trigger>

      <Menu.Content>
        <Menu.Label>Quick Actions</Menu.Label>
        <Menu.Separator />
        
        <Menu.Group>
          <Menu.Item key="start-workout">
            <Menu.ItemIcon ios={{ name: "play.circle" }}>
              <MaterialIcons name="play-arrow" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Start Workout</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="add-weight">
            <Menu.ItemIcon ios={{ name: "scalemass" }}>
              <MaterialIcons name="monitor-weight" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Log Weight</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="add-water">
            <Menu.ItemIcon ios={{ name: "drop" }}>
              <MaterialIcons name="water-drop" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Log Water</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>

        <Menu.Group>
          <Menu.Item key="add-meal">
            <Menu.ItemIcon ios={{ name: "restaurant" }}>
              <MaterialIcons name="restaurant" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Log Meal</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="take-photo">
            <Menu.ItemIcon ios={{ name: "camera" }}>
              <MaterialIcons name="camera-alt" size={16} />
            </Menu.ItemIcon>
            <Menu.ItemTitle>Take Progress Photo</Menu.ItemTitle>
          </Menu.Item>
        </Menu.Group>
      </Menu.Content>
    </Menu.Root>
  );
}