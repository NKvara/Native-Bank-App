import {Text} from "react-native";
import {ReactNode} from "react";

const ReText = ({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) => {
  return <Text className={`text-rebankPrimary ${className}`}>{children}</Text>;
};

export default ReText;