import { Ionicons } from '@expo/vector-icons';
import { View, TextInput, KeyboardTypeOptions, TextInputProps, TouchableHighlight } from 'react-native';
import { colorPick } from '@/color-theme';

interface Props extends TextInputProps {
  icon?: keyof typeof Ionicons.glyphMap;
  placeholder: string;
  isPassword?: boolean;
  keyboard: KeyboardTypeOptions;
  props?: TextInputProps;
  rightIcon?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
  };
}

const Input = ({
  placeholder,
  icon,
  isPassword = false,
  keyboard,
  value,
  onChangeText,
  onBlur,
  props,
  rightIcon,
}: Props) => {
  const color = colorPick();

  return (
    <View className="flex-row items-center h-16 bg-inputBackground w-full px-6 rounded-xl">
      {icon && (
        <Ionicons
          className="pr-4"
          name={icon}
          size={20}
        />
      )}
      <TextInput
        {...props}
        className="text-rebankPrimary h-full flex-1"
        placeholderTextColor={color['--color-rebankGrey']}
        placeholder={placeholder}
        keyboardType={keyboard}
        textAlignVertical="center"
        autoCapitalize="none"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={isPassword}
      />
      {rightIcon && (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={rightIcon.onPress}
        >
          <Ionicons
            className="pl-4"
            name={rightIcon.icon}
            size={20}
          />
        </TouchableHighlight>
      )}
    </View>
  );
};

export default Input;
