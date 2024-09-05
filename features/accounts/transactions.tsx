import { FlatList, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReText from '@/common/shared/ReText';
import { ColorPick } from '@/color-theme';
import { GetCurrencyEnum, getMoneyAmount } from '@/features/accounts/helper/money';
import { useTransactionList } from '@/features/accounts/api/transactionList';
import { getTransactions } from '@/common/helper/getTransactions';
import moment from 'moment';

// TODO change data when transfer api is done

const AccountTransactions = () => {
  const color = ColorPick();
  const rawTransactions = useTransactionList();

  const getAmount = ({ amount, direction }: { amount: number; direction: number }) => {
    return `${direction <= 0 ? '-' : ''}${getMoneyAmount(Math.abs(amount))}${GetCurrencyEnum.GEL}`;
  };

  // TODO add skeleton

  if (rawTransactions.isLoading) {
    return <ReText>Loading...</ReText>;
  }

  if (rawTransactions.isError) {
    return <ReText>Error</ReText>;
  }

  const groupedTransactions = getTransactions(rawTransactions.data);

  return (
    <View className="w-full bg-rebankBgGrey rounded-lg p-4">
      <ReText className="font-bold text-lg mb-2">Transactions</ReText>
      <FlatList
        scrollEnabled={false}
        data={Object.values(groupedTransactions)}
        renderItem={({ item, index }) => (
          <View>
            <ReText className="font-semibold opacity-60 text-sm">
              {moment(Object.keys(groupedTransactions)[index]).fromNow()}
            </ReText>
            <FlatList
              scrollEnabled={false}
              className="flex py-3 gap-6"
              data={Object.values(item)}
              renderItem={({ item: o }) => (
                <View className="flex-row w-full justify-between gap-2">
                  <View className="flex-row items-center gap-2 flex-1">
                    <View className="p-2 rounded-full bg-rebankDimGrey">
                      <Ionicons
                        name={o.direction <= 0 ? 'arrow-up' : 'arrow-down'}
                        size={20}
                        color={o.direction <= 0 ? '#F54F4F' : '#3ABE70'}
                      />
                    </View>
                    <View className="flex-shrink w-full gap-1">
                      <ReText
                        numberOfLines={1}
                        className="font-semibold"
                      >
                        {o.title}
                      </ReText>
                      <ReText
                        numberOfLines={1}
                        className="text-rebankGrey text-xs"
                      >
                        {o.description}
                      </ReText>
                    </View>
                  </View>
                  <Text
                    className="font-bold w-fit min-w-16 text-right"
                    numberOfLines={1}
                    style={{ color: o.direction <= 0 ? color['--color-rebankPrimary'] : '#3ABE70' }}
                  >
                    {getAmount({ amount: o.amount, direction: o.direction })}
                  </Text>
                </View>
              )}
              keyExtractor={(_, i) => i.toString()}
            />
          </View>
        )}
        keyExtractor={(_, i) => i.toString()}
      />
    </View>
  );
};

export default AccountTransactions;
