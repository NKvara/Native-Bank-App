import React from 'react';
import ReText from '@/common/shared/ReText';
import ReScrollView from '@/features/shared/ReScrollView';
import { Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { ColorPick } from '@/color-theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const LinkList = [
  {
    name: 'Transfer To Other',
    link: 'Transfer',
    icon: (color: string) => (
      <FontAwesome6
        name="money-bill-transfer"
        size={24}
        color={color}
      />
    ),
  },
  {
    name: 'Transfer To Self',
    link: 'Tranfer To Self',
    icon: (color: string) => (
      <Entypo
        name="cycle"
        size={24}
        color={color}
      />
    ),
  },
  {
    name: 'Payments',
    link: 'Payment',
    icon: (color: string) => (
      <MaterialCommunityIcons
        name="bank-outline"
        size={24}
        color={color}
      />
    ),
  },
  {
    name: 'Top Up',
    link: 'Top Up',
    icon: (color: string) => (
      <MaterialCommunityIcons
        className="rotate-180"
        name="cellphone-arrow-down"
        size={24}
        color={color}
      />
    ),
  },
];

const TransferSelection = () => {
  const color = ColorPick();
  const navigate = useNavigation();

  return (
    <ReScrollView>
      <View className="gap-4 bg-rebankBgGrey p-4 rounded-xl">
        <ReText className="font-bold text-lg">Categories</ReText>
        <View className="flex-row">
          {LinkList.map((item, index) => (
            <View
              key={index}
              className="w-1/4"
            >
              <TouchableOpacity
                onPress={() => navigate.navigate(item.link as never)}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 4 }}
              >
                <View className="bg-rebankDimGrey justify-center items-center p-4 rounded-full aspect-square h-16">
                  {item.icon(color['--color-rebankPrimary'])}
                </View>
                <ReText className="text-sm text-center h-10">{item.name}</ReText>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ReScrollView>
  );
};

export default TransferSelection;
