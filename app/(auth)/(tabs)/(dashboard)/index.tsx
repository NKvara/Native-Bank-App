import {Button, View} from "react-native";

import {useSession} from "../../../../ctx/ctx";
import {SafeAreaView} from "react-native-safe-area-context";
import DashboardHeader from "@/components/dashboard/header";
// import DashboardCards from "@/components/dashboard/cards";

export default function DashboardScreen() {
  const {signOut} = useSession();
  return (
    <View className="bg-rebankBackground h-screen">
      <SafeAreaView>
        <View className="px-4">
          <DashboardHeader />
          {/* <DashboardCards /> */}
          <View>
            <Button
              title="Sign Out"
              onPress={() => {
                signOut();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
