import { Currency } from '@/features/dashboard/money';

// ! DELETE

export const data = [
  { id: 1, title: 'Aivee', reason: 'eleifend donec ut dolor', date: '1716906830000', amount: 792.66 },
  { id: 2, title: 'Oyondu', reason: 'diam erat fermentum', date: '1716906830000', amount: 784.55 },
  { id: 3, title: 'Voonyx', reason: 'eget tincidunt eget tempus', date: '1715512182000', amount: -620.04 },
  { id: 4, title: 'Tagpad', reason: 'fermentum justo nec condimentum', date: '1718216750000', amount: 127.67 },
  { id: 5, title: 'Dabfeed', reason: 'neque sapien', date: '1708287412000', amount: -637.31 },
  { id: 6, title: 'Vidoo', reason: 'aliquet maecenas leo odio', date: '1715512182000', amount: 314.59 },
  { id: 7, title: 'Feedmix', reason: 'donec quis', date: '1721443552000', amount: -886.39 },
  { id: 8, title: 'Abata', reason: 'curabitur in libero ut', date: '1712152905000', amount: -679.94 },
  { id: 9, title: 'Photojam', reason: 'ligula pellentesque', date: '1713379176000', amount: 94.71 },
  { id: 10, title: 'Camimbo', reason: 'augue vel accumsan tellus', date: '1712152905000', amount: 654.84 },
  { id: 11, title: 'Kare', reason: 'quis libero', date: '1712905045000', amount: -362.89 },
  { id: 12, title: 'Flashdog', reason: 'fringilla rhoncus mauris', date: '1712905045000', amount: -134.61 },
];

export const getImage = (type: number) => {
  switch (type) {
    case 100:
      return require('@/assets/images/dashboard/cards/2.png');
    case 200:
      return require('@/assets/images/dashboard/cards/3.png');
    default:
      return require('@/assets/images/dashboard/cards/2.png');
  }
};

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
