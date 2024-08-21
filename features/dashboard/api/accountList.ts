import { Currency } from '@/features/dashboard/money';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import axiosInstance from '@/configurations/axios';

export const ACCOUNT_LIST_QUERY = 'AccountList';

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
  accountIban: string;
  accountName: string;
  actionTypes: ActionType[];
  currency: Currency;
  consolidatedAmount: number;
  availableAmount: number;
  balance: number;
  accountCards: Card[];
}

export interface AccountList {
  data: Account[];
}

const fetchAccountList = async () => {
  const { data } = await axiosInstance.get<AccountList>('/DashBoard/Account');
  return data;
};

export type AccountListOptions = UseQueryOptions<AccountList, Error, AccountList, string[]>;
export const useAccountList = (options?: AccountListOptions) => {
  return useQuery({
    queryKey: [ACCOUNT_LIST_QUERY],
    queryFn: () => fetchAccountList(),
    staleTime: 1000,
    ...options,
  });
};
