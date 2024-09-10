import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TransferSelection from '@/features/payments/components/TransferSelection';
import Unfinished from '@/app/(app)/(tabs)/(transfers)/unfinished';
import PaymentLayout from '@/app/(app)/(tabs)/(transfers)/(PaymentList)/_layout';

const TransferStack = createStackNavigator();

export default function TransferLayout() {
  return (
    <TransferStack.Navigator
      initialRouteName="Transfer Selection"
      screenOptions={{ headerShown: false }}
    >
      <TransferStack.Screen
        name="Transfer Selection"
        component={TransferSelection}
      />
      <TransferStack.Screen
        name="Payment"
        component={PaymentLayout}
      />
      <TransferStack.Screen
        name="Transfer"
        component={Unfinished}
      />
      <TransferStack.Screen
        name="Tranfer To Self"
        component={Unfinished}
      />
      <TransferStack.Screen
        name="Top Up"
        component={Unfinished}
      />
    </TransferStack.Navigator>
  );
}
