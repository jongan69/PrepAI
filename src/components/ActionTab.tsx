import { Link } from 'expo-router';
import React, { useRef } from 'react';
import { Pressable, View } from 'react-native';
import { ActionSheetRef } from 'react-native-actions-sheet';

import ActionSheetThemed from './ActionSheetThemed';
import Icon from './Icon';
import ThemedText from './ThemedText';
import Grid from './layout/Grid';

const ActionTab = () => {
  const actionSheetRef = useRef<ActionSheetRef>(null);

  const handlePress = () => {
    actionSheetRef.current?.show();
  };

  return (
    <>
      <View className="relative flex flex-col items-center justify-center">
        <Pressable
          onPress={handlePress}
          className="flex h-16  w-16  -translate-y-2 items-center justify-center rounded-full bg-highlight">
          <Icon
            name="Plus"
            size={20}
            strokeWidth={2}
            color="white"
          />
        </Pressable>
      </View>
      <ActionSheetThemed
        ref={actionSheetRef}
        gestureEnabled
        containerStyle={{
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 10,
        }}>
        <View className="p-global">
          <Grid
            columns={2}
            spacing={10}>
            <ActionItem
              onPress={() => actionSheetRef.current?.hide()}
              href="/(mobile)/(modals)/add-workout"
              label="Workout"
              icon="BicepsFlexed"
            />
            <ActionItem
              onPress={() => actionSheetRef.current?.hide()}
              href="/(mobile)/(modals)/add-meal"
              label="Meal"
              icon="Apple"
            />
            <ActionItem
              onPress={() => actionSheetRef.current?.hide()}
              href="/(mobile)/(modals)/add-water"
              label="Water"
              icon="Droplet"
            />
            <ActionItem
              onPress={() => actionSheetRef.current?.hide()}
              href="/(mobile)/(modals)/add-weight"
              label="Weight"
              icon="Scale"
            />
          </Grid>
        </View>
      </ActionSheetThemed>
    </>
  );
};

const ActionItem = (props: any) => {
  return (
    <Link
      asChild
      href={props.href}>
      <Pressable
        onPress={props.onPress}
        className="flex flex-col items-center justify-start rounded-2xl bg-background py-10">
        <Icon
          name={props.icon}
          size={20}
          strokeWidth={2}
          color="white"
          className="mb-2 h-14 w-14 rounded-full bg-highlight"
        />
        <ThemedText className="text-base">{props.label}</ThemedText>
      </Pressable>
    </Link>
  );
};

export default ActionTab;
