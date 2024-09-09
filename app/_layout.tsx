import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { SessionProvider } from '../context/ctx';
import '../gesture-handler.native';
import '../global.css';
import { Slot } from 'expo-router';
import { ThemeProvider } from '@/common/ThemeProviders';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosProvider } from '@/configurations/axios';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

export const RootLayout = () => {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        retryOnMount: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AxiosProvider>
          <ThemeProvider>
            <Slot />
          </ThemeProvider>
        </AxiosProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default RootLayout;
