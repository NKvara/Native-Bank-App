import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import ReScrollView from '@/features/shared/ReScrollView';
import { ParamListBase } from '@react-navigation/routers';
import { RouteProp } from '@/node_modules/@react-navigation/core/src/types';
import ReText from '@/common/shared/ReText';
import { useProductList } from '@/features/payments/api/productList';
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
    return <ReText>Loading...</ReText>;
  }

  if (productList.isError) {
    return <ReText>Error</ReText>;
  }

  if (!productList.data?.data.length) {
    return <ReText>No data</ReText>;
  }

  return (
    <ReScrollView>
      <ReText className="font-bold text-lg">{route.params.paymentGroupTitle}</ReText>
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
                <ReText>{item.nameLat}</ReText>
                <FontAwesome6
                  name="angle-right"
                  size={16}
                  color={color['--color-rebankPrimary']}
                />
              </View>
            </TouchableOpacity>
            {index !== productList.data?.data.length - 1 && <View className="w-full h-0.5 bg-rebankDimGrey" />}
          </View>
        )}
      />
    </ReScrollView>
  );
};

export default PaymentProducts;
