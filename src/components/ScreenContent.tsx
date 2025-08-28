import { Text, View } from 'react-native';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className="justify-cente flex-1 items-center">
      <Text className="text-xl font-bold">{title}</Text>
      <View className="my-7 h-[1px] w-4/5 bg-gray-200" />
      {children}
    </View>
  );
};
