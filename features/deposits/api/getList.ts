import axiosInstance from '@/configurations/axios';
import { useQuery } from '@tanstack/react-query';

export interface DepositList {
  id: number;
  accountId: number;
  productId: number;
  productName: string;
  ccy: string;
  amount: number;
}

interface DepositResponse {
  status: number;
  statusDescription: string;
  data: DepositList[];
}

export const getList = async () => {
  const response = await axiosInstance.get<DepositResponse>('/DashBoard/Deposites');

  return response.data;
};

export const useDepositList = () => {
  return useQuery({
    queryKey: ['depositList'],
    queryFn: getList,
  });
};
