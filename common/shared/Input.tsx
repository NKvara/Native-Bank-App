import Ionicons from '@expo/vector-icons/Ionicons';
import { View, TextInput, TextInputProps, TouchableHighlight } from 'react-native';
import { ColorPick } from '@/color-theme';
import { useController } from 'react-hook-form';

interface Props extends TextInputProps {
  // TODO
  control: any;
  name: string;
  startAdornment?: keyof typeof Ionicons.glyphMap;
  endAdornment?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
  };
}

const Input = ({ control, name, endAdornment, startAdornment, ...props }: Props) => {
  const {
    field: { onChange, onBlur, value, ref },
  } = useController({ control, name });
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
        className="text-rebankPrimary h-full flex-1"
        placeholderTextColor={color['--color-rebankGrey']}
        textAlignVertical="center"
        autoCapitalize="none"
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        ref={ref}
        {...props}
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
