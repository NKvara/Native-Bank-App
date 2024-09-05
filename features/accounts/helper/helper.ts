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