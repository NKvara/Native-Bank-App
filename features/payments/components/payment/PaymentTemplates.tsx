import React from 'react';
import ReScrollView from '@/features/shared/ReScrollView';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import PashText from '@/common/shared/PashText';
import { ColorPick } from '@/color-theme';
import { useNavigation } from '@react-navigation/native';

const PaymentTemplates = () => {
  const color = ColorPick();
  const navigate = useNavigation();

  return (
    <ReScrollView scroll={false}>
      <View className="flex-row items-center justify-between">
        <PashText className="font-bold text-xl">Templates</PashText>
        <TouchableWithoutFeedback onPress={() => navigate.navigate("Payment Categories" as never)}>
          <Entypo
            name="plus"
            size={28}
            color={color['--color-pashaPrimary']}
          />
        </TouchableWithoutFeedback>
      </View>
      <View className="w-full justify-center items-center mt-60 gap-4">
        <View className="bg-pashaBgGrey p-6 rounded-full">
          <MaterialCommunityIcons
            name="clipboard-search-outline"
            size={48}
            color={color['--color-pashaPrimary']}
          />
        </View>
        <PashText className="font-bold text-lg">You don't have any templates yet</PashText>
        <PashText className="">Click "+" to add your first payment</PashText>
      </View>
    </ReScrollView>
  );
};

export default PaymentTemplates;
