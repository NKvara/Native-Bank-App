import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from '@/context/ctx';

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

export const getList = async ({ session }: { session: string | null | undefined }) => {
  const response = await axios.get<DepositResponse>('/DashBoard/Deposites', {
    baseURL: 'http://172.30.12.26:10000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
  });

  return response.data;
};

export const useDepositList = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ['depositList', session],
    queryFn: () => getList({ session }),
  });
};
