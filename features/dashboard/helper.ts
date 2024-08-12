import { Currency } from '@/features/dashboard/money';

enum GetCardIssuer {
  VISA = 'cc-visa',
  MASTERCARD = 'cc-mastercard',
}

export const cards = [
  {
    Image: require('@/assets/images/dashboard/cards/1.png'),
    Title: 'Main Card',
    Credit_Card_Number: '5232469783800200',
    Balance: 10000.5,
    GEL_Balance: 10000.5,
    Currency: Currency.GEL,
    Issuer: GetCardIssuer.VISA,
    Expiry_Date: '11/25',
    cvv: '337',
  },
  {
    Image: require('@/assets/images/dashboard/cards/2.png'),
    Title: 'Temporary Card',
    Credit_Card_Number: '5470453580213263',
    Balance: 21,
    GEL_Balance: 56.49,
    Currency: Currency.USD,
    Issuer: GetCardIssuer.MASTERCARD,
    Expiry_Date: '03/29',
    cvv: '797',
  },
  {
    Image: require('@/assets/images/dashboard/cards/3.png'),
    Title: 'Greatest Card',
    Credit_Card_Number: '5519359674145068',
    Balance: 500.64,
    GEL_Balance: 1471.54,
    Currency: Currency.EUR,
    Issuer: GetCardIssuer.VISA,
    Expiry_Date: '10/25',
    cvv: '412',
  },
];

export const total = cards.reduce((acc, card) => acc + card.Balance, 0);
