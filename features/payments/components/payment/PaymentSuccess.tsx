import { ColorPick } from '@/color-theme';
import PashButton from '@/common/shared/PashButton';
import PashText from '@/common/shared/PashText';
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
        <View className="bg-pashaBgGrey p-6 rounded-full">
          <FontAwesome5
            name="check"
            size={28}
            color={color['--color-pashaPrimary']}
          />
        </View>
        <PashText className="font-bold text-lg">Transaction was successful</PashText>
        <PashButton
          name="Home"
          className="bg-pashaPrimary"
          textColor={color['--color-pashaBackground']}
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
