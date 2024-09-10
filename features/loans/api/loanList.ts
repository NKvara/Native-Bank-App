import { useQuery } from '@tanstack/react-query';
import { Currency } from '@/features/accounts/helper/money';
import axios from 'axios';
import { useSession } from '@/context/ctx';

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

const fetchLoanList = async ({ session }: { session: string | null | undefined }) => {
  const { data } = await axios.get<LoanList>('/DashBoard/Loans', {
    baseURL: 'http://172.30.12.26:10000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
};

export const useLoanList = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ['LoanList', session],
    queryFn: () => fetchLoanList({ session }),
    staleTime: 1000,
  });
};
