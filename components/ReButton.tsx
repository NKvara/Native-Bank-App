import {Text, TouchableOpacity} from "react-native";
import React from "react";

const ReButton = ({
  isLoading = false,
  isDisabled = false
}: {
  isLoading?: boolean;
  isDisabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      className="flex justify-center items-center w-full h-12 rounded-xl bg-yellow-300 disabled:opacity-20 disabled:bg-purple-400"
      disabled={isLoading || isDisabled}
      onPress={() => console.log("greg")}
    >
      <Text className="font-bold">შესვლა</Text>
    </TouchableOpacity>
  );
};

export default ReButton;
