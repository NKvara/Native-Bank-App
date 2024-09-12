import { ColorPick } from '@/color-theme';
import ReButton from '@/common/shared/ReButton';
import ReText from '@/common/shared/ReText';
import ReScrollView from '@/features/shared/ReScrollView';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

const PaymentSuccess = () => {
  const color = ColorPick();
  const navigate = useNavigation();

  return (
    <ReScrollView scroll={false}>
      <View className="mt-56 items-center gap-4">
        <View className="bg-rebankBgGrey p-6 rounded-full">
          <FontAwesome5
            name="check"
            size={28}
            color={color['--color-rebankPrimary']}
          />
        </View>
        <ReText className="font-bold text-lg">Transaction was successful</ReText>
        <ReButton
          name="Home"
          className="bg-rebankPrimary"
          textColor={color['--color-rebankBackground']}
          onPress={() => {
            navigate.navigate({ name: 'Transfer Selection' } as never);
            navigate.navigate({ name: 'Dashboard' } as never);
          }}
        />
      </View>
    </ReScrollView>
  );
};

export default PaymentSuccess;
