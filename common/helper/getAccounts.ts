import { Currency } from '@/features/dashboard/money';
import { Account } from '@/features/dashboard/api/accountList';
import { groupBy } from 'lodash';
import getProp from '@/common/helper/getProp';

export const getAccounts = (accountList?: Account[]) => {
  const rawAccounts = accountList || [];

  const groupedAccounts = groupBy(
    rawAccounts.filter((acc) => acc),
    'accountIban'
  );

  const accounts = Object.values(groupedAccounts).map((acc) => {
    return {
      allAccounts: acc,
      mainAccount: getProp(() => acc.find((account) => account.currency === Currency.GEL), acc[0])!,
      // TODO consolidated amount
      summedAmount: acc.reduce((prev, cur) => prev + cur.balance, 0),
    };
  });

  return accounts;
};
