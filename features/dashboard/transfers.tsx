import { FlatList, Text, View } from 'react-native';
import { data } from '@/features/dashboard/helper';
import { Ionicons } from '@expo/vector-icons';
import ReText from '@/common/shared/ReText';
import { ColorPick } from '@/color-theme';
import { GetCurrencyEnum } from '@/features/dashboard/money';
import { groupBy } from 'lodash';

// TODO change data when transfer api is done

const DashboardTransfers = () => {
  const color = ColorPick();

  const getFilteredData = () => {
    const sortedData = data.sort(function (a, b) {
      return Number(b.date) - Number(a.date);
    });

    return groupBy(
      sortedData.filter((date) => date),
      'date'
    );
  };

  const filteredData = getFilteredData();

  console.log(Object.values(Object.values(filteredData)[0]));

  const getAmount = (amount: number) => {
    const flatAmount = Math.abs(amount);
    return `${amount < 0 ? '' : '+'}${GetCurrencyEnum.GEL}${flatAmount}`;
  };

  return (
    <View className="w-full bg-rebankBgGrey rounded-lg p-4">
      <ReText className="font-bold text-lg mb-2">Transactions</ReText>
      <FlatList
        data={Object.values(filteredData)}
        renderItem={({ item, index }) => (
          <View>
            <ReText className="font-semibold opacity-60 text-sm">
              {new Date(Number(Object.keys(filteredData)[index])).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </ReText>
            <FlatList
              className="flex py-3 gap-2.5"
              data={Object.values(item)}
              renderItem={({ item: o }) => (
                <View className="flex-row w-full justify-between items-center">
                  <View className="flex-row items-center gap-2">
                    <View className="bg-rebankDimGrey p-2 rounded-full">
                      <Ionicons
                        name={o.amount < 0 ? 'arrow-up' : 'arrow-down'}
                        size={24}
                        color={o.amount < 0 ? '#F54F4F' : '#3ABE70'}
                      />
                    </View>
                    <View>
                      <ReText className="font-semibold">{o.title}</ReText>
                      <ReText className="text-rebankGrey">{o.reason}</ReText>
                    </View>
                  </View>
                  <Text
                    className="font-bold"
                    style={{ color: o.amount < 0 ? color['--color-rebankPrimary'] : '#3ABE70' }}
                  >
                    {getAmount(o.amount)}
                  </Text>
                </View>
              )}
              keyExtractor={(i) => i.toString()}
            />
          </View>
        )}
        keyExtractor={(i) => i.toString()}
      />
    </View>
  );
};

export default DashboardTransfers;
