import { useSession } from '@/context/ctx';
import { View, Button } from 'react-native';

export default function TabTwoScreen() {
  const { signOut } = useSession();

  return (
    <View className="w-full h-full justify-center items-center">
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}
