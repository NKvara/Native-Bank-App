import ReText from '@/common/shared/ReText';
import { useLoanList } from '@/features/loans/api/loanList';
import { View, FlatList } from 'react-native';
import { ColorPick } from '@/color-theme';
import { GetCurrencyEnum } from '@/features/accounts/helper/money';
import { LinearGradient } from 'expo-linear-gradient';

const ScrollList = () => {
  const loans = useLoanList();
  const color = ColorPick();
  // TODO Skeleton

  if (loans.isLoading || loans.isFetching) {
    return <ReText>Loading...</ReText>;
  }

  if (loans.isError) {
    return <ReText>Error</ReText>;
  }

  return (
    <View>
      <FlatList
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View className="h-6" />}
        data={loans.data?.data}
        renderItem={({ item }) => (
          <View className="bg-rebankBgGrey rounded-2xl border border-rebankDimGrey p-2 gap-4">
            <View className="mb-2">
              <ReText numberOfLines={2}>{item.productName}</ReText>
            </View>
            <View className="bg-rebankDimGrey h-4 flex-row rounded-full">
              <LinearGradient
                // Background Linear Gradient
                start={{ x: 0.2, y: 0.4 }}
                colors={[color['--color-rebankBrightPurple'], color['--color-rebankPurple']]}
                style={{
                  width: `${100 - (item.remainingAmount_Equialent / item.initAmount_Equialent) * 100}%`,
                  borderRadius: 100,
                }}
              />
            </View>
            <View className="flex-row">
              <View>
                <ReText className="font-bold">
                  {Math.abs(item.remainingAmount_Equialent - item.initAmount_Equialent)}
                  {GetCurrencyEnum[item.ccy]} <ReText className="font-medium">of</ReText> {item.initAmount_Equialent}
                  {GetCurrencyEnum[item.ccy]}
                </ReText>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ScrollList;
