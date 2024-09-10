import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  name: string;
  isLoading?: boolean;
  className: string;
}

const ReButton = ({ name, isLoading, className, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`flex justify-center flex-row gap-4 items-center w-full h-14 rounded-xl bg-rebankBrightPurple disabled:opacity-20 disabled:bg-rebankPurple ${className}`}
      {...props}
    >
      {isLoading && <ActivityIndicator color="black" />}
      <Text className="font-bold">{name}</Text>
    </TouchableOpacity>
  );
};

export default ReButton;
