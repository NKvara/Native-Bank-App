import Ionicons from '@expo/vector-icons/Ionicons';
import { View, TextInput, TextInputProps, TouchableHighlight } from 'react-native';
import { ColorPick } from '@/color-theme';

interface Props extends TextInputProps {
  startAdornment?: keyof typeof Ionicons.glyphMap;
  endAdornment?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
  };
}

const Input = ({ endAdornment, startAdornment, ...props }: Props) => {
  const color = ColorPick();

  return (
    <View className="flex-row items-center h-16 bg-inputBackground w-full px-6 rounded-xl">
      {startAdornment && (
        <Ionicons
          className="pr-4"
          name={startAdornment}
          size={20}
        />
      )}
      <TextInput
        {...props}
        className="text-rebankPrimary h-full flex-1"
        placeholderTextColor={color['--color-rebankGrey']}
        textAlignVertical="center"
        autoCapitalize="none"
      />
      {endAdornment && (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={endAdornment.onPress}
        >
          <Ionicons
            className="pl-4"
            name={endAdornment.icon}
            size={20}
          />
        </TouchableHighlight>
      )}
    </View>
  );
};

export default Input;
