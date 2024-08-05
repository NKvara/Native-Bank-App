import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View>
        <Text>oops!</Text>
        <Link href="/login">
          <Text>leave</Text>
        </Link>
      </View>
    </>
  );
}
