import React, { createContext, ReactNode, useContext } from 'react';
import { ScaDataForTrastedDevice, ScaResponseWithoutTrustedDevice, useSca } from '@/features/login/api/sca';
import { useStorageState } from './useStorageState';
import { router } from 'expo-router';

interface SignInProps {
  username: string;
  deviceId: string;
  password: string;
  setOtpSessionId: (otpSessionId: string) => void;
}

interface AuthContextType {
  signIn: ({ username, deviceId, password }: SignInProps) => void;
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

  return (
    <AuthContext.Provider
      value={{
        signIn: ({ username, deviceId = '7AA76B98-0547-4168-99B3-8B10A2C25B8F', password, setOtpSessionId }) => {
          mutateSca.mutate(
            { username, deviceId, password },
            {
              onSuccess: (data) => {
                if (isNotTrastedDevice(data.data)) {
                  setOtpSessionId(data.data.otpSessionId);
                } else {
                  setSession(data.data);
                  router.replace('/(tabs)');
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
