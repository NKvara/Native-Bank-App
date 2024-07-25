import {Image, Text, View} from "react-native";
import React from "react";
import {LinearGradient} from "expo-linear-gradient";
import {useSession} from '@/ctx/ctx';
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const DashboardHeader = () => {
  const {session} = useSession();

  return (
    <View className="flex-row justify-between h-12">
      <View className="flex-row gap-3 items-center">
        <LinearGradient
          start={{x: 0.5, y: 1}}
          end={{x: 0, y: 0}}
          colors={["#501ea7", "#7f4dd7"]}
          style={{
            borderRadius: 16,
            height: 48,
            width: 48,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 3
          }}
        >
          <Image
            source={require("@/assets/images/shared/person.png")}
            className="w-full h-full rounded-xl bg-white"
          />
        </LinearGradient>
        <Text className="text-rebankPrimary font-bold">{session}</Text>
        <FontAwesome name="chevron-right" color="#7f4dd7" />
      </View>
    </View>
  );
};

export default DashboardHeader;
