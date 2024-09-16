import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentCategories from '@/features/transfer/components/payment/PaymentCategories';
import PaymentProducts from '@/features/transfer/components/payment/PaymentProducts';
import PaymentVerify from '@/features/transfer/components/payment/PaymentVerify';
import PaymentTemplates from '@/features/transfer/components/payment/PaymentTemplates';
import PaymentPay from '@/features/transfer/components/payment/PaymentPay';
import PaymentAccounts from '@/features/transfer/components/payment/PaymentAccounts';
import PaymentSuccess from '@/features/transfer/components/payment/PaymentSuccess';

const PaymentListStack = createStackNavigator();

export default function PaymentLayout() {
  return (
    <PaymentListStack.Navigator
      initialRouteName="Payment Templates"
      screenOptions={{ headerShown: false }}
    >
      <PaymentListStack.Screen
        name="Payment Templates"
        component={PaymentTemplates}
      />
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
      <PaymentListStack.Screen
        name="Payment Pay"
        component={PaymentPay}
      />
      <PaymentListStack.Screen
        name="Payment Accounts"
        component={PaymentAccounts}
        options={{ presentation: 'transparentModal' }}
      />
      <PaymentListStack.Screen
        name="Payment Success"
        component={PaymentSuccess}
      />
    </PaymentListStack.Navigator>
  );
}
