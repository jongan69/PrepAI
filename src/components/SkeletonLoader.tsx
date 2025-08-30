import React from 'react';
import { View, Animated, Easing, Dimensions } from 'react-native';

import useThemeColors from '@/contexts/ThemeColors';

const windowWidth = Dimensions.get('window').width;

type SkeletonVariant = 'list' | 'grid' | 'article' | 'chat';

interface SkeletonLoaderProps {
  variant: SkeletonVariant;
  count?: number;
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ variant, count = 1, className = '' }) => {
  const colors = useThemeColors();
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          easing: Easing.ease,
          useNativeDriver: false,
        }),
      ])
    ).start();

    return () => {
      animatedValue.stopAnimation();
    };
  }, [animatedValue]);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  const renderListItem = () => (
    <View className="flex-row items-center py-4 ">
      <Animated.View
        className="h-16 w-16 rounded-lg"
        style={[{ opacity, backgroundColor: colors.secondary }]}
      />
      <View className="ml-3 flex-1">
        <Animated.View
          className="mb-2 h-5 w-3/4 rounded-md"
          style={[{ opacity, backgroundColor: colors.secondary }]}
        />
        <Animated.View
          className="h-4 w-1/2 rounded-md"
          style={[{ opacity, backgroundColor: colors.secondary }]}
        />
      </View>
    </View>
  );

  const renderGridItem = () => (
    <View className="w-1/2 p-2">
      <Animated.View
        className="mb-2 aspect-square rounded-lg"
        style={[{ opacity, backgroundColor: colors.secondary }]}
      />
      <Animated.View
        className="mb-1 h-4 w-3/4 rounded-md"
        style={[{ opacity, backgroundColor: colors.secondary }]}
      />
      <Animated.View
        className="h-4 w-1/2 rounded-md"
        style={[{ opacity, backgroundColor: colors.secondary }]}
      />
    </View>
  );

  const renderArticle = () => (
    <View className="flex-1">
      <Animated.View
        style={[{ opacity, backgroundColor: colors.secondary, width: windowWidth, height: windowWidth }]}
      />
      <View className="flex-1 p-4">
        <Animated.View
          className="mb-4 h-8 w-3/4 rounded-md"
          style={[{ opacity, backgroundColor: colors.secondary }]}
        />
        <Animated.View
          className="mb-4 h-6 w-1/2 rounded-md"
          style={[{ opacity, backgroundColor: colors.secondary }]}
        />
        <Animated.View
          className="mb-2 h-4 w-full rounded-md"
          style={[{ opacity, backgroundColor: colors.secondary }]}
        />
        <Animated.View
          className="mb-2 h-4 w-full rounded-md"
          style={[{ opacity, backgroundColor: colors.secondary }]}
        />
        <Animated.View
          className="h-4 w-3/4 rounded-md"
          style={[{ opacity, backgroundColor: colors.secondary }]}
        />
      </View>
    </View>
  );

  const renderChat = () => (
    <View className="p-4">
      <View className="mb-4 flex-row justify-start">
        <View className="w-3/4">
          <Animated.View
            className="h-12 rounded-2xl"
            style={[{ opacity, backgroundColor: colors.secondary }]}
          />
        </View>
      </View>
      <View className="mb-4 flex-row justify-end">
        <View className="w-3/4">
          <Animated.View
            className="h-16 rounded-2xl"
            style={[{ opacity, backgroundColor: colors.secondary }]}
          />
        </View>
      </View>
      <View className="flex-row justify-start">
        <View className="w-2/4">
          <Animated.View
            className="h-12 rounded-2xl"
            style={[{ opacity, backgroundColor: colors.secondary }]}
          />
        </View>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (variant) {
      case 'list':
        return Array(count)
          .fill(null)
          .map((_, index) => <React.Fragment key={index}>{renderListItem()}</React.Fragment>);
      case 'grid':
        return (
          <View className="flex-row flex-wrap">
            {Array(count)
              .fill(null)
              .map((_, index) => (
                <React.Fragment key={index}>{renderGridItem()}</React.Fragment>
              ))}
          </View>
        );
      case 'article':
        return renderArticle();
      case 'chat':
        return renderChat();
      default:
        return null;
    }
  };

  return <View className={`dark:bg-dark-primary flex-1 bg-background ${className}`}>{renderContent()}</View>;
};

export default SkeletonLoader;
