import React from 'react';
import { View, ViewStyle } from 'react-native';

import Avatar from './Avatar';
import Icon from './Icon';
import ThemedText from './ThemedText';

import useThemeColors from '@/contexts/ThemeColors';

interface ReviewProps {
  rating: number;
  description: string;
  date: string;
  username?: string;
  avatar?: string;
  className?: string;
  style?: ViewStyle;
}

const Review: React.FC<ReviewProps> = ({
  rating,
  description,
  date,
  username,
  avatar,
  className = '',
  style,
}) => {
  const colors = useThemeColors();

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="Star"
          size={16}
          fill={i < rating ? colors.text : 'none'}
          color={i < rating ? colors.text : colors.text}
          strokeWidth={1.5}
          className="mr-1"
        />
      );
    }

    return (
      <View className="flex-row items-center">
        {stars}
        <ThemedText className="ml-1 text-sm">{rating}.0</ThemedText>
      </View>
    );
  };

  return (
    <View className={` ${className}`} style={style}>
      <View className="flex-row">
        {(avatar || username) && <Avatar src={avatar} name={username} size="xs" className="mr-3" />}
        <View className="flex-1">
          {username && <ThemedText className="mb-1 font-bold">{username}</ThemedText>}
          <View className="mb-2 flex-row items-center justify-between">
            {renderStars()}
            <ThemedText className="text-light-subtext dark:text-dark-subtext text-sm">
              {date}
            </ThemedText>
          </View>
          <ThemedText className="text-sm">{description}</ThemedText>
        </View>
      </View>
    </View>
  );
};

export default Review;
