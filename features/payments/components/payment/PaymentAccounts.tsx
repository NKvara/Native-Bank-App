import { View, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import ReScrollView from '@/features/shared/ReScrollView';
import { useNavigation, useRoute } from '@react-navigation/native';
import { paymentRouteType } from '@/features/payments/components/payment/PaymentProducts';
import { usePaymentAccountList } from '@/features/payments/api/accountsList';
import ReText from '@/common/shared/ReText';
import { Card } from '@/features/payments/components/payment/PaymentPay';

const PaymentAccounts = () => {
  const navigate = useNavigation();
  const route = useRoute<paymentRouteType>();

  const rawAccounts = usePaymentAccountList();

  if (rawAccounts.isLoading) {
    return <ReText>Loading...</ReText>;
  }

  if (rawAccounts.isError) {
    return <ReText>Error</ReText>;
  }

  if (!rawAccounts.data?.data.length) {
    return <ReText>No data</ReText>;
  }

  return (
    <ReScrollView scroll={false}>
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
    </ReScrollView>
  );
};

export default PaymentAccounts;
