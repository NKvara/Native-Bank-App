import { View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import PashScrollView from '@/features/shared/PashScrollView';
import { useNavigation, useRoute } from '@react-navigation/native';
import PashText from '@/common/shared/PashText';
import { paymentRouteType } from '@/features/transfer/components/payment/PaymentProducts';
import { usePaymentAccountList } from '@/features/transfer/api/accountsList';
import { Card } from '@/features/transfer/components/payment/PaymentPay';

const PaymentAccounts = () => {
  const navigate = useNavigation();
  const route = useRoute<paymentRouteType>();

  const rawAccounts = usePaymentAccountList();

  if (rawAccounts.isLoading) {
    return <PashText>Loading...</PashText>;
  }

  if (rawAccounts.isError) {
    return <PashText>Error</PashText>;
  }

  if (!rawAccounts.data?.data.length) {
    return <PashText>No data</PashText>;
  }

  return (
    <PashScrollView scroll={false}>
      <PashText>From Account</PashText>
      <FlatList
        data={rawAccounts.data.data}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigate.navigate({
                name: 'Payment Pay',
                params: { ...route.params, paymentAccountID: item.id },
              } as never);
            }}
          >
            <Card CurrentCard={item} />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </PashScrollView>
  );
};

export default PaymentAccounts;
