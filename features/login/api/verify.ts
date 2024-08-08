import { ScaResponseStatus } from '@/context/ctx';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

interface verifyParams {
  username: string;
  otpCode: string;
  otpSessionId: string;
}

export interface verifyResponseWithoutTrustedDevice {
  status: ScaResponseStatus;
  otpSessionId: string;
}

interface verifyResponse {
  status: ScaResponseStatus;
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
