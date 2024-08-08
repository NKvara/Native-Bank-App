import React, { createContext, ReactNode, useContext } from 'react';
import { ScaDataForTrastedDevice, ScaResponseWithoutTrustedDevice, useSca } from '@/features/login/api/sca';
import { useStorageState } from './useStorageState';
import { router } from 'expo-router';
import { useVerify } from '@/features/login/api/verify';

// TODO

export enum ScaResponseStatus {
  success = '0',
  otpRequired = '1',
}

interface SignInProps {
  username: string;
  deviceId: string;
  password: string;
  otpSessionId: string;
  otpCode: string;
  setOtpSessionId: (otpSessionId: string) => void;
}

interface AuthContextType {
  signIn: ({ username, deviceId, password, otpSessionId }: SignInProps) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}

const isNotTrastedDevice = (
  data: ScaResponseWithoutTrustedDevice | ScaDataForTrastedDevice
): data is ScaResponseWithoutTrustedDevice => {
  return (data as ScaResponseWithoutTrustedDevice).otpSessionId !== undefined;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  session: null,
  isLoading: true,
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [[isLoading, session], setSession] = useStorageState('session');

  const mutateSca = useSca();
  const mutateVerify = useVerify();

  return (
    <AuthContext.Provider
      value={{
        signIn: ({ username, deviceId, password, setOtpSessionId, otpSessionId, otpCode }) => {
          if (otpSessionId) {
            return mutateVerify.mutate(
              { username, otpCode, otpSessionId },
              {
                onSuccess: (data) => {
                  setSession(data.data);
                  router.replace('/(tabs)');
                },
              }
            );
          }
          return mutateSca.mutate(
            { username, deviceId, password },
            {
              onSuccess: (data) => {
                if (data.status === ScaResponseStatus.success || !isNotTrastedDevice(data.data)) {
                  setSession(data.data as string);
                  router.replace('/(tabs)');
                } else {
                  setOtpSessionId(data.data.otpSessionId);
                }
              },
            }
          );
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
};
