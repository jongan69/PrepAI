import { View, StyleProp, ViewStyle } from 'react-native';

import { Button } from '@/components/Button';
import Icon, { IconName } from '@/components/Icon';
import ThemedText from '@/components/ThemedText';

interface PlaceholderProps {
  title: string;
  subtitle?: string;
  button?: string;
  href?: string;
  icon?: IconName;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export function Placeholder({
  title,
  subtitle,
  button,
  href,
  icon = 'Inbox',
  className = '',
  style,
}: PlaceholderProps) {
  return (
    <View
      className={`dark:bg-dark-primary items-center justify-center bg-background p-4 ${className}`}
      style={style}>
      <View className="border-light-secondary dark:border-dark-secondary mb-4 h-20 w-20 items-center justify-center rounded-full border">
        <Icon
          name={icon}
          size={30}
          className="text-light-tertiary dark:text-dark-tertiary"
        />
      </View>

      <ThemedText className="text-center text-xl font-bold">{title}</ThemedText>

      {subtitle && (
        <ThemedText className="text-light-subtext dark:text-dark-subtext mb-4 text-center">{subtitle}</ThemedText>
      )}

      {button && href && (
        <Button
          className="mt-4"
          title={button}
          variant="outline"
          href={href}
          rounded="full"
        />
      )}
    </View>
  );
}
