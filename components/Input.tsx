import {Ionicons} from "@expo/vector-icons";
import {View, TextInput, KeyboardTypeOptions} from "react-native";

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
  icon,
  type,
  keyboard,
  value
}: {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  type: textContentType;
  keyboard: KeyboardTypeOptions;
  value: string;
}) => {
  return (
    <View className="flex-row items-center h-16 bg-zinc-100 w-full px-6 rounded-xl">
      <Ionicons className="pr-4" name={icon} size={20} />
      <TextInput
        className="placeholder:text-zinc-400 h-full flex-1"
        placeholder={name}
        textContentType={type}
        keyboardType={keyboard}
        textAlignVertical="center"
        autoCapitalize="none"
        value={value}
      />
    </View>
  );
};

export default Input;
