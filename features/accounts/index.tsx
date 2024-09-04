import { View } from 'react-native';
import AccountCards from '@/features/accounts/cards';
import AccountTransactions from '@/features/accounts/transactions';

export default function Accounts() {
  return (
    <View>
      <View className="gap-4 mb-32">
        <AccountCards />
        <AccountTransactions />
      </View>
    </View>
  );
}
