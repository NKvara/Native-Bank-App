import { ScrollView, View } from 'react-native';
import DashboardHeader from '@/features/dashboard/header';
import DashboardCards from '@/features/dashboard/cards';
import ReText from '@/common/shared/ReText';
import { Currency, getMoneyAmount } from '@/features/dashboard/money';
import { total } from '@/features/dashboard/helper';
import DashboardTransfers from '@/features/dashboard/transfers';

export default function DashboardScreen() {
  return (
    <View className="bg-rebankBackground h-screen">
      <DashboardHeader />
      <ScrollView className="px-4 pt-2 gap-2">
        <View>
          <ReText>Total Balance</ReText>
          <ReText className="font-semibold text-xl">{getMoneyAmount(total, '-', Currency.GEL)}</ReText>
        </View>
        <DashboardCards />
        <DashboardTransfers />
        <View className='h-32' />
      </ScrollView>
    </View>
  );
}
