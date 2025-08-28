import React from 'react';
import { View, Image } from 'react-native';

import { Button } from '@/components/Button';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import ThemedScroller from '@/components/ThemeScroller';
import ThemedText from '@/components/ThemedText';

export default function DevicesScreen() {
  return (
    <>
      <View className="flex-1">
        <Header className="bg-secondary" title="Connected devices" showBackButton />
        <ThemedScroller className="!px-0">
          <View className="items-center justify-center bg-secondary p-global">
            <Image
              style={{ objectFit: 'cover' }}
              source={require('@/assets/img/smartwatch.png')}
              className="h-72 w-2/3 "
            />
          </View>

          <View className="p-global">
            <DeviceCard title="Garmin" description="Vivoactive 5" isActive />
            <DeviceCard title="Apple Watch" description="Not connected" isActive={false} />
            <DeviceCard title="Pixel Watch" description="Not connected" isActive={false} />
            <DeviceCard title="Fitbit" description="Not connected" isActive={false} />
          </View>
        </ThemedScroller>
      </View>
    </>
  );
}

const DeviceCard = (props: any) => {
  return (
    <View className="mb-3 flex flex-row items-center justify-start rounded-2xl bg-secondary p-5">
      <Icon name="Watch" size={20} className="mr-4 h-12 w-12 rounded-full bg-background" />
      <View>
        <ThemedText className="text-base font-semibold ">{props.title}</ThemedText>
        <ThemedText className="text-lxsg font-light">{props.description}</ThemedText>
      </View>
      <View className="ml-auto">
        {props.isActive ? (
          <Button title="Disconnect" size="small" />
        ) : (
          <Button title="Connect" variant="outline" size="small" />
        )}
      </View>
    </View>
  );
};
