import { TouchableOpacity, View } from 'react-native';
import { ColorPick } from '@/color-theme';
import ReText from '@/common/shared/ReText';
import React from 'react';
import { Feather } from '@expo/vector-icons';

const TouchButton = ({
  icon,
  text,
  onPress,
  color,
}: {
  icon: React.ComponentProps<typeof Feather>['name'];
  text: string;
  onPress: () => void;
  color: string;
}) => {
  return (
    <TouchableOpacity
      className="flex-1 flex-row bg-rebankBgGrey justify-center items-center py-4 rounded-xl"
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Feather
        name={icon}
        size={24}
        color={color}
      />
      <ReText>{text}</ReText>
    </TouchableOpacity>
  );
};

const DashboardTransfer = () => {
  const color = ColorPick();

  return (
    <View className="flex-row w-full gap-2">
      <TouchButton
        icon="arrow-up-right"
        text="Transfer"
        onPress={() => {}}
        color={color['--color-rebankPrimary']}
      />
      <TouchButton
        icon="arrow-down-left"
        text="Recieve"
        onPress={() => {}}
        color={color['--color-rebankPrimary']}
      />
    </View>
  );
};

export default DashboardTransfer;
