import React, { createContext, ReactNode, useCallback, useContext } from 'react';
import { ScaDataForTrustedDevice, ScaResponseWithoutTrustedDevice, useSca } from '@/features/login/api/sca';
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
  mutateSca: any;
  mutateVerify: any;
}

const isNotTrustedDevice = (
  data: ScaResponseWithoutTrustedDevice | ScaDataForTrustedDevice
): data is ScaResponseWithoutTrustedDevice => {
  return (data as ScaResponseWithoutTrustedDevice).otpSessionId !== undefined;
};

const AuthContext = createContext<AuthContextType>({
  signIn: () => {},
  signOut: () => {},
  session: null,
  isLoading: true,
  mutateSca: null,
  mutateVerify: null,
});

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [[isLoading, session], setSession] = useStorageState('session');

  const mutateSca = useSca();
  const mutateVerify = useVerify();

  const signIn = useCallback(
    ({ username, deviceId, password, setOtpSessionId, otpSessionId, otpCode }: SignInProps) => {
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
            if (data.status === ScaResponseStatus.success || !isNotTrustedDevice(data.data)) {
              setSession(data.data as string);
              router.replace('/(tabs)');
            } else {
              setOtpSessionId(data.data.otpSessionId);
            }
          },
          onError: () => {},
        }
      );
    },
    [mutateSca, mutateVerify, setSession]
  );

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        mutateSca: mutateSca,
        mutateVerify: mutateVerify,
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
