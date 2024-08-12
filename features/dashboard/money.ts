export enum Currency {
  GEL = 'GEL',
  USD = 'USD',
  EUR = 'EUR',
  GBP = 'GBP',
  CHF = 'CHF',
  AZN = 'AZN',
  TRY = 'TRY',
  CNY = 'CNY',
  RUB = 'RUB',
}

export enum GetCurrencyEnum {
  GEL = '₾',
  USD = '$',
  EUR = '€',
  GBP = '£',
  CHF = '₣',
  AZN = '₼',
  TRY = '₺',
  CNY = '¥',
  RUB = '₽',
}

export const getMoneySign = (currency?: Currency) => {
  if (!currency) return '';
  return GetCurrencyEnum[currency];
};

export const getMoneyString = (currency: Currency) => {
  return `shared.currency.${currency}` as const;
};

// formats the money
const formatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// returns the formatted money with possible currency sign
export const getMoneyAmount = (amount?: number, defaultValue?: string, currency?: Currency): string => {
  if (typeof amount !== 'number') return defaultValue || '';
  return `${formatter.format(amount)} ${getMoneySign(currency)}`;
};

// splits the money amount into an array of main and coins
export const splitMoneyAmount = (amount: number): string[] => getMoneyAmount(amount).split('.');
