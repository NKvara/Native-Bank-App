import { useSession } from '@/context/ctx';
import { Redirect } from 'expo-router';
import { ReactNode } from 'react';
import { Text } from 'react-native';

const GetProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>loading...</Text>;
  }

  return session ? children : <Redirect href="/login" />;
};

export default GetProtectedRoute;
