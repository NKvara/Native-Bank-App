import {Button, StyleSheet, Text, View} from "react-native";

import {useSession} from "../../../../ctx/ctx";
import {SafeAreaView} from "react-native-safe-area-context";
import DashboardHeader from "@/components/dashboard/header";

export default function DashboardScreen() {
  const {signOut} = useSession();
  return (
    <SafeAreaView>
      <View className="px-4">
        <DashboardHeader />
        <Button
          title="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    </SafeAreaView>
  );
}
