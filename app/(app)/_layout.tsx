import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSession } from '@/context/ctx';
import Login from '@/app/(app)/(auth)/login';
import React from 'react';
import TabLayout from '@/app/(app)/(tabs)/_layout';

const Stack = createNativeStackNavigator();

export default function AppLayout() {
  const { session } = useSession();

  if (!session) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false, animation: 'flip' }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={TabLayout}
        options={{ headerShown: false, animation: 'flip' }}
      />
    </Stack.Navigator>
  );
}
