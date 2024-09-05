import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/configurations/axios';
import { Currency } from '@/features/accounts/helper/money';

export interface Loan {
  id: number;
  productId: number;
  productName: string;
  initAmount: number;
  initAmount_Equialent: number;
  remainingAmount: number;
  remainingAmount_Equialent: number;
  nextPaymentDate: string;
  ccy: Currency;
  interestRate: number;
}

export interface LoanList {
  data: Loan[];
}

const fetchLoanList = async () => {
  const { data } = await axiosInstance.get<LoanList>('/DashBoard/Loans');
  return data;
};

export const useLoanList = () => {
  return useQuery({
    queryKey: ['LoanList'],
    queryFn: () => fetchLoanList(),
    staleTime: 1000,
  });
};
