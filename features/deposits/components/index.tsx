import { FlatList, View } from 'react-native';
import { useDepositList } from '@/features/deposits/api/getList';
import Card from './helper/card';
import { Currency, getMoneyAmount } from '@/features/accounts/helper/money';
import PashText from '@/common/shared/PashText';

const Deposits = () => {
  const deposit = useDepositList();

  const totalData = deposit.data?.data.reduce((acc, curr) => acc + curr.amount, 0);

  if (deposit.isLoading)
    return (
      <View className="gap-4 mt-2">
        <View className="items-center gap-2">
          <View className="h-4 w-32 bg-pashaDimGrey rounded-xl" />
          <View className="h-8 w-60 bg-pashaDimGrey rounded-xl" />
        </View>
        <FlatList
          scrollEnabled={false}
          data={[{}, {}, {}]}
          renderItem={() => <View className="bg-pashaDimGrey h-36 mb-4 rounded-2xl" />}
        />
      </View>
    );

  return (
    <View className="gap-4 mt-2 mb-56">
      <View>
        <PashText className="opacity-70 text-center">Total Balance</PashText>
        <PashText className="font-bold text-4xl text-center">{getMoneyAmount(totalData, '-', Currency.GEL)}</PashText>
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
