import { Text, TouchableOpacity, TouchableOpacityProps, ActivityIndicator } from 'react-native';
import React from 'react';

interface ButtonProps extends TouchableOpacityProps {
  name: string;
  isLoading?: boolean;
  className?: string;
  textColor?: string;
}

const ReButton = ({ name, isLoading, className = '', textColor, ...props }: ButtonProps) => {
  return (
    <TouchableOpacity
      className={`flex justify-center flex-row gap-4 items-center w-full h-14 rounded-xl bg-rebankBrightPurple disabled:opacity-20 disabled:bg-rebankPurple ${className}`}
      {...props}
    >
      {isLoading && <ActivityIndicator color={textColor ? textColor : 'black'} />}
      <Text
        style={{ color: textColor ? textColor : 'black' }}
        className="font-bold"
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
};

export default ReButton;
