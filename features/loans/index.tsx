import { View } from 'react-native';
import ScrollList from '@/features/loans/ScrollList';

export default function Loans() {
  return (
    <View>
      <View className="gap-4">
        <ScrollList />
      </View>
    </View>
  );
}
