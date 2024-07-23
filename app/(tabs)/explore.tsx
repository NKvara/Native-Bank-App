import {StyleSheet, View, Text} from "react-native";

export default function TabTwoScreen() {
  return (
    <View className="flex justify-center items-center h-full p-8">
      <Text className="h-8 text-red-500">Welcome!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute"
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8
  }
});
