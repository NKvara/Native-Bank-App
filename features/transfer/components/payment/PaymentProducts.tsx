import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import PashScrollView from '@/features/shared/PashScrollView';
import { ParamListBase } from '@react-navigation/routers';
import { RouteProp } from '@/node_modules/@react-navigation/core/src/types';
import PashText from '@/common/shared/PashText';
import { useProductList } from '@/features/transfer/api/productList';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { ColorPick } from '@/color-theme';

export interface paymentRouteType extends RouteProp<ParamListBase> {
  params: {
    paymentGroupId?: number;
    paymentGroupTitle?: string;
    paymentGroupIconIndex?: number;
    paymentProductTitle?: string;
    paymentProductId?: string;
    paymentProductCustomer?: string;
    paymentProductDebt?: number;
    paymentIdentifier?: number;
    paymentAccountID?: number;
  };
}

const PaymentProducts = () => {
  const route = useRoute<paymentRouteType>();
  const productList = useProductList(route.params.paymentGroupId!);
  const color = ColorPick();
  const navigate = useNavigation();

  if (productList.isLoading) {
    return (
      <PashScrollView scroll={false}>
        <View className="h-8 w-52 rounded-xl bg-pashaBgGrey" />
        <FlatList
          scrollEnabled={false}
          data={new Array(10).fill({})}
          renderItem={() => (
            <View>
              <View className="flex-row justify-between items-center py-4">
                <View className="w-full h-8 rounded-xl mb-2 bg-pashaBgGrey" />
              </View>
            </View>
          )}
        />
      </PashScrollView>
    );
  }

  if (productList.isError) {
    return <PashText>Error</PashText>;
  }

  if (!productList.data?.data.length) {
    return <PashText>No data</PashText>;
  }

  return (
    <PashScrollView>
      <PashText className="font-bold text-lg">{route.params.paymentGroupTitle}</PashText>
      <FlatList
        scrollEnabled={false}
        data={productList.data.data}
        renderItem={({ item, index }) => (
          <View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigate.navigate({
                  name: 'Payment Verify',
                  params: {
                    paymentGroupTitle: route.params.paymentGroupTitle,
                    paymentGroupIconIndex: route.params.paymentGroupIconIndex,
                    paymentProductTitle: item.nameLat,
                    paymentProductId: item.productId,
                  },
                  merge: true,
                } as never);
              }}
            >
              <View className="flex-row justify-between items-center py-4">
                <PashText>{item.nameLat}</PashText>
                <FontAwesome6
                  name="angle-right"
                  size={16}
                  color={color['--color-pashaPrimary']}
                />
              </View>
            </TouchableOpacity>
            {index !== productList.data?.data.length - 1 && <View className="w-full h-0.5 bg-pashaDimGrey" />}
          </View>
        )}
      />
    </PashScrollView>
  );
};

export default PaymentProducts;
