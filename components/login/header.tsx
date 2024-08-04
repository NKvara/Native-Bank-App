import {View, Image, TouchableHighlight} from "react-native";
import React from "react";
import {Ionicons} from "@expo/vector-icons";
import ReText from "@/components/shared/ReText";
import {useColorScheme} from "nativewind";

const LoginHeader = () => {
  const {colorScheme, toggleColorScheme} = useColorScheme();

  return (
    <View
      className="min-h-[30vh] h-1/3 w-full"
      style={{opacity: colorScheme === "light" ? 0.6 : 1}}
    >
      <Image
        source={require("@/assets/images/login/topimage.png")}
        className="h-full absolute top-0"
        resizeMode="stretch"
        blurRadius={100}
      />
      <TouchableHighlight onPress={toggleColorScheme}>
        <View className="absolute flex-row items-center top-20 right-8">
          <Ionicons name="rose" color="white" size={22} />
          <ReText className="font-bold text-white text-2xl">Bank</ReText>
        </View>
      </TouchableHighlight>
      <View className="absolute bottom-0 p-8">
        <ReText className="text-5xl font-bold text-white">
          Sign in to your Account
        </ReText>
      </View>
    </View>
  );
};

export default LoginHeader;
