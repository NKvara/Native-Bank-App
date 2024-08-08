import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface ScaParams {
  username: string;
  password: string;
  deviceId: string;
}

export type ScaDataForTrastedDevice = string;

export interface ScaResponseWithoutTrustedDevice {
  status: string;
  otpSessionId: string;
}

interface ScaResponse<T> {
  status: number;
  statusDescription: string;
  data: T;
}

export const PostSca = async (data: ScaParams) => {
  const response = await axios.post<ScaResponse<ScaResponseWithoutTrustedDevice | ScaDataForTrastedDevice>>(
    'http://172.30.12.26:5001/api/SCA',
    data
  );

  return response.data;
};

export const useSca = () => {
  return useMutation({
    mutationFn: PostSca,
  });
};
