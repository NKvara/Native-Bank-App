import { Currency } from '@/features/accounts/helper/money';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSession } from '@/context/ctx';

export interface Card {
  id: number;
  holder: string;
  cardNumber: string;
  designId: number;
  productId: number;
}

export enum ActionType {
  Transfer = 'Transfer',
  Statement = 'Statement',
  Cards = 'Cards',
  Details = 'Details',
  TopUpTopCard = 'TopUpTopCard',
  ChangeTerm = 'ChangeTerm',
  ResetPin = 'ResetPin',
  Wallet = 'Wallet',
  Installments = 'Installments',
}

export interface Account {
  id: number;
  accountType: number;
  accountSubType: number;
  accountIban: string;
  accountName: string;
  actionTypes: ActionType[];
  currency: Currency;
  balance: number;
  balanceEquivalent: number;
  availableBalance: number;
  availableBalanceEquivalent: number;
  accountCards: Card[];
}

export interface AccountList {
  data: Account[];
}

const fetchAccountList = async ({ session }: { session: string | null | undefined }) => {
  const { data } = await axios.get<AccountList>('/DashBoard/Accounts', {
    baseURL: 'http://172.30.12.26:10000/api',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session}`,
    },
  });
  return data;
};

export const useAccountList = () => {
  const { session } = useSession();
  return useQuery({
    queryKey: ['AccountList', session],
    queryFn: () => fetchAccountList({ session }),
  });
};
