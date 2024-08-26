import {TransactionList} from '@/features/dashboard/api/transactionList';
import { groupBy} from 'lodash';

export const getTransactions = (transactionList?: TransactionList) => {
  const rawTransactions = transactionList!.data || [];

  const transactions = groupBy(
    rawTransactions.filter((ob) => ob),
    'date',
  );

  return transactions;
};
