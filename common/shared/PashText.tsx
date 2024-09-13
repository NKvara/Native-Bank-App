import { Text, TextProps } from 'react-native';
import { ReactNode } from 'react';

interface props extends TextProps {
  children: ReactNode;
  className?: string;
}

const PashText = ({ children, className, ...props }: props) => {
  return (
    <Text
      className={`text-pashaPrimary ${className}`}
      {...props}
    >
      {children}
    </Text>
  );
};

export default PashText;
