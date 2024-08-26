import { Text, TextProps } from 'react-native';
import { ReactNode } from 'react';

interface props extends TextProps {
  children: ReactNode;
  className?: string;
}

const ReText = ({ children, className, ...props }: props) => {
  return (
    <Text
      className={`text-rebankPrimary ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};

export default ReText;
