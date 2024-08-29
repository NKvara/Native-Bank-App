import { FlatList, View, Text } from 'react-native';
import { useDepositList } from '@/features/deposits/api/getList';
import Card from './helper/card';
import { Currency, getMoneyAmount } from '@/features/dashboard/helper/money';
import ReText from '@/common/shared/ReText';

const Deposits = () => {
  const deposit = useDepositList();

  const totalData = deposit.data?.data.reduce((acc, curr) => acc + curr.amount, 0);

  if (deposit.isLoading) return <Text>Loading...</Text>;

  return (
    <View className="gap-4 mt-2">
      <View>
        <ReText className="opacity-70 text-center">Total Balance</ReText>
        <ReText className="font-bold text-4xl text-center">{getMoneyAmount(totalData, '-', Currency.GEL)}</ReText>
      </View>
      <FlatList
        scrollEnabled={false}
        data={deposit.data?.data}
        renderItem={({ item }) => <Card {...item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Deposits;
