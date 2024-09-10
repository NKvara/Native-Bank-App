import { FlatList, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReText from '@/common/shared/ReText';
import { ColorPick } from '@/color-theme';
import { GetCurrencyEnum, getMoneyAmount } from '@/features/accounts/helper/money';
import { useTransactionList } from '@/features/accounts/api/transactionList';
import { getTransactions } from '@/common/helper/getTransactions';
import moment from 'moment';

const AccountTransactions = () => {
  const color = ColorPick();
  const rawTransactions = useTransactionList();

  const getAmount = ({ amount, direction }: { amount: number; direction: number }) => {
    return `${direction <= 0 ? '-' : ''}${getMoneyAmount(Math.abs(amount))}${GetCurrencyEnum.GEL}`;
  };

  if (rawTransactions.isLoading) {
    return (
      <View className="w-full bg-rebankBgGrey p-4 rounded-lg">
        <View className="bg-white w-16 h-4 mb-2 rounded-md" />
        {Array.from({ length: 7 }, (_, i) => (
          <View
            key={i}
            className="flex-row
          justify-between
          items-center
          py-3
          "
          >
            <View className="gap-4 flex-row items-center">
              <View className="size-12 rounded-full bg-white" />
              <View className="gap-2">
                <View className="h-2 w-12 bg-white rounded-sm" />
                <View className="h-4 w-28 bg-white rounded-sm" />
              </View>
            </View>
            <View className="h-4 w-28 bg-white rounded-sm" />
          </View>
        ))}
      </View>
    );
  }

  if (rawTransactions.isError) {
    return <ReText>Error</ReText>;
  }

  const groupedTransactions = getTransactions(rawTransactions.data);

  return (
    <View className="w-full bg-rebankBgGrey rounded-lg p-4">
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
