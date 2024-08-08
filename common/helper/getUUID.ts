import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import * as crypto from 'expo-crypto';

export const useGetDeviceId = () => {
  const [uuid, setUUID] = useState<string | null>(null);

  useEffect(() => {
    const fetchUUID = async () => {
      let id = await SecureStore.getItemAsync('deviceId');
      if (!id) {
        id = crypto.randomUUID();
        await SecureStore.setItemAsync('deviceId', id);
      }
      setUUID(id);
    };

    fetchUUID();
  }, []);

  return uuid;
};
