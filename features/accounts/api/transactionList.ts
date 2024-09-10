import { useQuery } from '@tanstack/react-query';
import { useSession } from '@/context/ctx';
import axios from 'axios';

export interface Transaction {
  id: number;
  date: string;
  iconType: any;
  direction: number;
  amount: number;
  description: string;
  extraDescription: string;
  title: string;
  titleLat: string;
}

export interface TransactionList {
  data: Transaction[];
}
const fetchTransactionList = async ({ session }: { session: string | null | undefined }) => {
  const { data } = await axios.get<TransactionList>('/DashBoard/Transfers', {
    baseURL: 'http://172.30.12.26:10000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
};

export const useTransactionList = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ['Transactions', session],
    queryFn: () => fetchTransactionList({ session }),
  });
};
