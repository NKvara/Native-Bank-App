import { View } from 'react-native';
import ReText from '@/common/shared/ReText';
import { Currency, getMoneyAmount } from '@/features/dashboard/helper/money';
import { total } from '@/features/dashboard/helper/helper';

const DashboardAmount = () => {
  return (
    <View className="justify-center items-center gap-1">
      <ReText className="opacity-70">Total Balance</ReText>
      <ReText className="font-bold text-4xl">{getMoneyAmount(total, '-', Currency.GEL)}</ReText>
    </View>
  );
};

export default DashboardAmount;
