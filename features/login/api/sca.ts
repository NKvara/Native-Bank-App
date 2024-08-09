import { ScaResponseStatus } from '@/context/ctx';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ScaParams {
  username: string;
  password: string;
  deviceId: string;
}

export type ScaDataForTrustedDevice = string;

export interface ScaResponseWithoutTrustedDevice {
  status: ScaResponseStatus;
  otpSessionId: string;
}

interface ScaResponse<T> {
  status: ScaResponseStatus;
  statusDescription: string;
  data: T;
}

export const PostSca = async (data: ScaParams) => {
  const response = await axios.post<ScaResponse<ScaResponseWithoutTrustedDevice | ScaDataForTrustedDevice>>(
    'http://172.30.12.26:5001/api/SCA',
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data;
};

export const useSca = () => {
  return useMutation({
    mutationFn: PostSca,
  });
};
