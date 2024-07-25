import {Text, TouchableOpacity} from "react-native";
import React from "react";

const ReButton = ({
  name,
  isLoading = false,
  isDisabled = false,
  onPress
}: {
  name?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      className="flex justify-center items-center w-full h-14 rounded-xl bg-rebankYellow disabled:opacity-20 disabled:bg-rebankPurple"
      disabled={isLoading || isDisabled}
      onPress={onPress}
    >
      <Text className="font-bold">{name}</Text>
    </TouchableOpacity>
  );
};

export default ReButton;
