import PashText from '@/common/shared/PashText';
import { useLoanList } from '@/features/loans/api/loanList';
import { View, FlatList } from 'react-native';
import { ColorPick } from '@/color-theme';
import { GetCurrencyEnum, Currency, getMoneyAmount } from '@/features/accounts/helper/money';
import { LinearGradient } from 'expo-linear-gradient';

const ScrollList = () => {
  const loans = useLoanList();
  const color = ColorPick();
  const totalData = loans.data?.data.reduce(
    (acc, curr) => acc + (curr.remainingAmount_Equialent - curr.initAmount_Equialent),
    0
  );

  if (loans.isLoading) {
    return (
      <View className='gap-4'>
        <View className="items-center gap-2">
          <View className="h-4 w-32 bg-pashaDimGrey rounded-xl" />
          <View className="h-8 w-60 bg-pashaDimGrey rounded-xl" />
        </View>
        <FlatList
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View className="h-6" />}
          data={Array.from({ length: 4 })}
          renderItem={() => (
            <View className="bg-pashaBgGrey rounded-2xl border border-pashaDimGrey p-2 gap-4">
              <View className="mb-2">
                <View className="w-12 h-2 bg-pashaBgGrey rounded-sm" />
              </View>
              <View className="bg-pashaDimGrey h-4 flex-row rounded-full">
                <View className="w-full h-2 bg-pashaDimGrey rounded-sm" />
              </View>
              <View className="flex-row">
                <View>
                  <View className="w-12 h-2 bg-pashaDimGrey rounded-sm" />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  if (loans.isError) {
    return <PashText>Error</PashText>;
  }

  return (
    <View className='gap-4'>
      <View>
        <PashText className="opacity-70 text-center">Total Balance</PashText>
        <PashText className="font-bold text-4xl text-center">
          {getMoneyAmount(Math.abs(totalData!), '-', Currency.GEL)}
        </PashText>
      </View>
      <FlatList
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View className="h-6" />}
        data={loans.data?.data}
        renderItem={({ item }) => (
          <View className="bg-pashaBgGrey rounded-2xl border border-pashaDimGrey p-2 gap-4">
            <View className="mb-2">
              <PashText numberOfLines={2}>{item.productName}</PashText>
            </View>
            <View className="bg-pashaDimGrey h-4 flex-row rounded-full">
              <LinearGradient
                // Background Linear Gradient
                start={{ x: 0.2, y: 0.4 }}
                colors={[color['--color-pashaBrightPurple'], color['--color-pashaPurple']]}
                style={{
                  width: `${100 - (item.remainingAmount_Equialent / item.initAmount_Equialent) * 100}%`,
                  borderRadius: 100,
                }}
              />
            </View>
            <View className="flex-row">
              <View>
                <PashText className="font-bold">
                  {Math.abs(item.remainingAmount_Equialent - item.initAmount_Equialent)}
                  {GetCurrencyEnum[item.ccy]} <PashText className="font-medium">of</PashText>{' '}
                  {item.initAmount_Equialent}
                  {GetCurrencyEnum[item.ccy]}
                </PashText>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ScrollList;
