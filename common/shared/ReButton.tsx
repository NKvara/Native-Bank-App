import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  name: string;
  isLoading?: boolean;
}

const ReButton = ({ name, isLoading, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      className="flex justify-center flex-row gap-4 items-center w-full h-14 rounded-xl bg-rebankYellow disabled:opacity-20 disabled:bg-rebankPurple"
      {...props}
    >
      {isLoading && <ActivityIndicator color="black" />}
      <Text className="font-bold">{name}</Text>
    </TouchableOpacity>
  );
};

export default ReButton;
