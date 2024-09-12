import { Currency } from '@/features/accounts/helper/money';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from '@/context/ctx';

export interface Account {
  id: number;
  accountIban: string;
  accountName: string;
  accountCcy: Currency;
  balance: number;
  balanceEquivalent: number;
  availableBalance: number;
  availableBalanceEquivalent: number;
  accountType: number;
  accountSubType: number | null;
  accountCards: AccountCard[] | null;
}

export interface AccountCard {
  id: number;
  holder: string;
  cardNumber: string;
  designId: string;
  productId: number;
}

export interface AccountList {
  data: Account[];
}

const fetchAccountList = async ({ session }: { session: string | null | undefined }) => {
  const { data } = await axios.get<AccountList>('/Payments/Accounts', {
    baseURL: 'http://172.30.12.26:10000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
};

export const usePaymentAccountList = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ['PaymentAccountList', session],
    queryFn: () => fetchAccountList({ session }),
  });
};
