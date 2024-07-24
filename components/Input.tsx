import {Ionicons} from "@expo/vector-icons";
import {
  View,
  TextInput,
  KeyboardTypeOptions,
  TextInputProps,
  TouchableHighlight
} from "react-native";

type textContentType =
  | "none"
  | "URL"
  | "addressCity"
  | "addressCityAndState"
  | "addressState"
  | "countryName"
  | "creditCardNumber"
  | "creditCardExpiration"
  | "creditCardExpirationMonth"
  | "creditCardExpirationYear"
  | "creditCardSecurityCode"
  | "creditCardType"
  | "creditCardName"
  | "creditCardGivenName"
  | "creditCardMiddleName"
  | "creditCardFamilyName"
  | "emailAddress"
  | "familyName"
  | "fullStreetAddress"
  | "givenName"
  | "jobTitle"
  | "location"
  | "middleName"
  | "name"
  | "namePrefix"
  | "nameSuffix"
  | "nickname"
  | "organizationName"
  | "postalCode"
  | "streetAddressLine1"
  | "streetAddressLine2"
  | "sublocality"
  | "telephoneNumber"
  | "username"
  | "password"
  | "newPassword"
  | "oneTimeCode"
  | "birthdate"
  | "birthdateDay"
  | "birthdateMonth"
  | "birthdateYear"
  | undefined;

const Input = ({
  name,
  placeholder,
  icon,
  type,
  isPassword = false,
  keyboard,
  value,
  onChangeText,
  onBlur,
  props,
  rightIcon
}: {
  name?: string;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  type?: textContentType;
  isPassword?: boolean;
  keyboard?: KeyboardTypeOptions;
  value?: string;
  onChangeText?: (e: string) => void;
  onBlur?: () => void;
  props?: TextInputProps;
  rightIcon?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress?: () => void;
  };
}) => {
  return (
    <View className="flex-row items-center h-16 bg-white w-full px-6 rounded-xl">
      {icon && <Ionicons className="pr-4" name={icon} size={20} />}
      <TextInput
        {...props}
        id={name}
        className="placeholder:text-zinc-400 h-full flex-1"
        placeholder={placeholder}
        textContentType={type}
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
          <Ionicons className="pl-4" name={rightIcon.icon} size={20} />
        </TouchableHighlight>
      )}
    </View>
  );
};

export default Input;
