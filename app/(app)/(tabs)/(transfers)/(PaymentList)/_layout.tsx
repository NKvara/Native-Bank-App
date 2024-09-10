import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentCategories from '@/features/payments/components/payment/PaymentCategories';
import PaymentProducts from '@/features/payments/components/payment/PaymentProducts';
import PaymentVerify from '@/features/payments/components/payment/PaymentVerify';

const PaymentListStack = createStackNavigator();

export default function PaymentLayout() {
  return (
    <PaymentListStack.Navigator
      initialRouteName="Payment Categories"
      screenOptions={{ headerShown: false }}
    >
      <PaymentListStack.Screen
        name="Payment Categories"
        component={PaymentCategories}
      />
      <PaymentListStack.Screen
        name="Payment Products"
        component={PaymentProducts}
      />
      <PaymentListStack.Screen
        name="Payment Verify"
        component={PaymentVerify}
      />
    </PaymentListStack.Navigator>
  );
}
