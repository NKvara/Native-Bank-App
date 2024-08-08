import { Stack } from 'expo-router';
import GetProtectedRoute from '@/common/helper/getProtectedRoute';

export default function AppLayout() {
  return (
    <GetProtectedRoute>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="modal"
          options={{ presentation: 'modal' }}
        />
      </Stack>
    </GetProtectedRoute>
  );
}
