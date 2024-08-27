import { View } from 'react-native';
import DashboardCards from '@/features/dashboard/cards';
import DashboardTransactions from '@/features/dashboard/transactions';
import DashboardAmount from '@/features/dashboard/amount';

export default function Dashboard() {
  return (
    <View>
        <View className='gap-4 mb-32'>
          <DashboardAmount />
          {/* <DashboardTransfer /> */}
          <DashboardCards />
          <DashboardTransactions />
        </View>
    </View>
  );
}
