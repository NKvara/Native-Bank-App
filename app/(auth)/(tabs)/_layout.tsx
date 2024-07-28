import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {Link, Tabs} from "expo-router";
import {useColorScheme} from "nativewind";
import {colors, colorPick} from "@/color-theme";
import {Text, View} from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
  focused: boolean;
}) {
  const color = colorPick();

  return (
    <View className="items-center">
      <FontAwesome size={32} {...props} />
      <FontAwesome
        size={5}
        name="circle"
        color={props.focused ? props.color : color["--color-inputBackground"]}
      />
    </View>
  );
}

export default function TabLayout() {
  const color = colorPick();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: color["--color-rebankYellow"],
        headerShown: false,
        tabBarStyle: {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: 16,
          marginHorizontal: 12,
          borderTopWidth: 0,
          borderRadius: 32,
          height: 64,
          backgroundColor: color["--color-inputBackground"]
        },
        tabBarItemStyle: {
          height: 64
        }
      }}
    >
      <Tabs.Screen
        name="(dashboard)/index"
        options={{
          title: "Home",
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name="home" color={color} focused={focused} />
          )
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Tab Two",
          tabBarIcon: ({color, focused}) => (
            <TabBarIcon name="cog" color={color} focused={focused} />
          )
        }}
      />
    </Tabs>
  );
}
