import axios, { InternalAxiosRequestConfig } from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { useStorageState } from '@/context/useStorageState';

const axiosInstance = axios.create();

export const AxiosProvider = ({ children }: { children: ReactElement }) => {
  const [[isLoading, session]] = useStorageState('session');
  const [tokenIsSet, setTokenIsSet] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    const beforeRequest = (config: InternalAxiosRequestConfig) => {
      if (session) {
        config.baseURL = 'http://172.30.12.26:10000/api';
        config.headers.set('Content-Type', 'application/json');
        config.headers.set('Authorization', `Bearer ${session}`);
      }
      return config;
    };

    const request = axiosInstance.interceptors.request.use(beforeRequest);

    setTokenIsSet(true);

    return () => {
      axiosInstance.interceptors.response.eject(request);
    };
  }, [session, isLoading]);

  // TODO add skeleton

  return !tokenIsSet ? (
    <View>
      <Text>loading</Text>
    </View>
  ) : (
    children
  );
};

export default axiosInstance;
