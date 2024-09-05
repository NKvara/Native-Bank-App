import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/configurations/axios';

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
const fetchTransactionList = async () => {
  const { data } = await axiosInstance.get<TransactionList>('/DashBoard/Transfers');
  return data;
};

export const useTransactionList = () => {
  return useQuery({
    queryKey: ['Transactions'],
    queryFn: () => fetchTransactionList(),
  });
};
