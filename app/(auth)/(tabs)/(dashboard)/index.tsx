import { Button, View } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import DashboardHeader from '@/features/dashboard/header';
import { useSession } from '@/context/ctx';
import DashboardCards from '@/features/dashboard/cards';
import ReText from '@/common/shared/ReText';
import { Currency, getMoneyAmount } from '@/features/dashboard/money';
import { total } from '@/features/dashboard/helper';

export default function DashboardScreen() {
  const { signOut } = useSession();
  return (
    <View className="bg-rebankBackground h-screen">
      <SafeAreaView>
        <View className="px-4 gap-2">
          <DashboardHeader />
          <View>
            <ReText>Total Balance</ReText>
            <ReText className='font-semibold text-xl'>{getMoneyAmount(total, '-', Currency.GEL)}</ReText>
          </View>
          <DashboardCards />
          <View>
            <Button
              title="Sign Out"
              onPress={() => {
                signOut();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
