import { ScrollView, View } from 'react-native';
import DashboardHeader from '@/features/dashboard/header';
import DashboardCards from '@/features/dashboard/cards';
import DashboardTransactions from '@/features/dashboard/transactions';
import DashboardAmount from '@/features/dashboard/amount';

export default function DashboardScreen() {
  return (
    <View className="bg-rebankBackground h-screen">
      <DashboardHeader />
      <ScrollView className="px-4 pt-8">
        <View className='gap-4 mb-32'>
          <DashboardAmount />
          {/* <DashboardTransfer /> */}
          <DashboardCards />
          <DashboardTransactions />
        </View>
      </ScrollView>
    </View>
  );
}
