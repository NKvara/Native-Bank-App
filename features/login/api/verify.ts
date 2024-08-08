import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface verifyParams {
  username: string;
  otpCode: string;
  otpSessionId: string;
}

export interface verifyResponseWithoutTrustedDevice {
  status: string;
  otpSessionId: string;
}

interface verifyResponse {
  status: number;
  statusDescription: string;
  data: string;
}

export const postVerify = async (data: verifyParams) => {
  const response = await axios.post<verifyResponse>('http://172.30.12.26:5001/api/SCA/Verify', data, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const useVerify = () => {
  return useMutation({
    mutationFn: postVerify,
  });
};
