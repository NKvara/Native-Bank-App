import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PaymentCategories from '@/features/payments/components/payment/PaymentCategories';
import PaymentProducts from '@/features/payments/components/payment/PaymentProducts';
import PaymentVerify from '@/features/payments/components/payment/PaymentVerify';
import PaymentTemplates from '@/features/payments/components/payment/PaymentTemplates';
import PaymentPay from '@/features/payments/components/payment/PaymentPay';
import PaymentAccounts from '@/features/payments/components/payment/PaymentAccounts';
import PaymentSuccess from '@/features/payments/components/payment/PaymentSuccess';

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
        options={{ presentation: 'modal' }}
      />
      <PaymentListStack.Screen
        name="Payment Success"
        component={PaymentSuccess}
      />
    </PaymentListStack.Navigator>
  );
}
