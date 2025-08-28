import { Link } from 'expo-router';
import { ScrollView, View, ViewStyle } from 'react-native';

import ThemedText from './ThemedText';

// Define prop types
interface CardScrollerProps {
  title?: string;
  img?: string;
  allUrl?: string;
  children: React.ReactNode;
  enableSnapping?: boolean;
  snapInterval?: number;
  className?: string;
  style?: ViewStyle;
  space?: number;
}

export const CardScroller = ({
  title,
  img,
  allUrl,
  children,
  enableSnapping = false,
  snapInterval = 0,
  className,
  style,
  space = 10,
}: CardScrollerProps) => {
  return (
    <View
      className={`flex w-full flex-col  ${title ? 'pt-global' : 'pt-0'} ${className}`}
      style={style}>
      <View className={`flex w-full flex-row items-center justify-between ${title ? 'mb-2' : 'mb-0'}`}>
        {title && <ThemedText className="text-base font-bold dark:text-white">{title}</ThemedText>}
        {allUrl && (
          <View className="flex flex-col">
            <Link
              href={allUrl}
              className="dark:text-white">
              See all
            </Link>
            <View className="mt-[1px] h-px w-full bg-black dark:bg-white" />
          </View>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate={enableSnapping ? 0.85 : 'normal'}
        snapToInterval={enableSnapping ? snapInterval : undefined}
        className="-mx-global px-global"
        contentContainerStyle={{ columnGap: space }}
        style={style}>
        {children}
        <View className="h-px w-4" />
      </ScrollView>
    </View>
  );
};
