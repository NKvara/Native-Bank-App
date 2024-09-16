import { FlatList, TouchableOpacity, View } from 'react-native';
import React from 'react';
import PashText from '@/common/shared/PashText';
import PashScrollView from '@/features/shared/PashScrollView';
import { ColorPick } from '@/color-theme';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useGroupList } from '@/features/transfer/api/groupList';
import { paymentCategoriesID } from '@/features/transfer/helper/paymentCategoriesID';

const PaymentCategories = () => {
  const groupList = useGroupList();
  const color = ColorPick();
  const navigate = useNavigation();

  if (groupList.isLoading) {
    return (
      <PashScrollView scroll={false}>
        <FlatList
          scrollEnabled={false}
          data={[{}, {}, {}, {}, {}, {}]}
          renderItem={({ index }) => {
            return (
              <View>
                <View className="flex-row justify-between items-center">
                  <View className="flex-row gap-2 items-center py-2">
                    <View className="bg-pashaDimGrey w-10 rounded-full aspect-square justify-center items-center" />
                  </View>
                  <FontAwesome6
                    name="angle-right"
                    size={16}
                    color={color['--color-pashaPrimary']}
                  />
                </View>
                {index !== 5 && <View className="w-full h-0.5 bg-pashaDimGrey" />}
              </View>
            );
          }}
        />
      </PashScrollView>
    );
  }

  if (groupList.isError) {
    return <PashText>Error</PashText>;
  }

  if (!groupList.data?.data.length) {
    return <PashText>No data</PashText>;
  }

  return (
    <PashScrollView>
      <FlatList
        initialNumToRender={50}
        scrollEnabled={false}
        data={groupList.data?.data}
        renderItem={({ item, index }) => {
          const iconIndex = paymentCategoriesID.findIndex((obj) => obj.paymentGroupId === item.paymentGroupId);

          if (iconIndex < 0) return null;

          return (
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigate.navigate({
                    name: 'Payment Products',
                    params: {
                      paymentGroupId: item.paymentGroupId,
                      paymentGroupTitle: item.descriptionLat,
                      paymentGroupIconIndex: iconIndex,
                    },
                    merge: true,
                  } as never);
                }}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-row gap-2 items-center py-2">
                    <View className="bg-pashaDimGrey w-10 rounded-full aspect-square justify-center items-center">
                      {paymentCategoriesID[iconIndex].icon(color['--color-pashaPrimary'])}
                    </View>
                    <PashText>{item.descriptionLat}</PashText>
                  </View>
                  <FontAwesome6
                    name="angle-right"
                    size={16}
                    color={color['--color-pashaPrimary']}
                  />
                </View>
              </TouchableOpacity>
              {index !== groupList.data?.data.length - 1 && <View className="w-full h-0.5 bg-pashaDimGrey" />}
            </View>
          );
        }}
        keyExtractor={(item) => item.paymentGroupId.toString()}
      />
    </PashScrollView>
  );
};

export default PaymentCategories;
