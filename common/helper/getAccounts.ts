import { Currency } from '@/features/accounts/helper/money';
import { Account } from '@/features/accounts/api/accountList';
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
      summedAmount: acc.reduce((prev, cur) => prev + cur.availableBalanceEquivalent, 0),
    };
  });

  return accounts;
};

export const getSummedAmount = (accountList?: Account[]) => {
  const rawAccounts = accountList || [];

  const sum = rawAccounts.reduce((prev, cur) => prev + cur.availableBalanceEquivalent, 0);

  return sum;
};
