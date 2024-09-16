import { View, TouchableOpacity, Switch } from 'react-native';
import PashText from '@/common/shared/PashText';
import PashScrollView from '@/features/shared/PashScrollView';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ColorPick } from '@/color-theme';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useSession } from '@/context/ctx';
import Entypo from '@expo/vector-icons/Entypo';
// import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'nativewind';

const Settings = [
  {
    id: 0,
    title: 'Change Password',
    Link: 'Change-password',
    icon: (color?: string) => (
      <Ionicons
        name="key-outline"
        size={24}
        color={color}
      />
    ),
  },
  {
    id: 1,
    title: 'Change Username',
    link: 'Change-username',
    icon: (color?: string) => (
      <FontAwesome5
        name="user"
        size={24}
        color={color}
      />
    ),
  },
  {
    id: 2,
    title: '2F Authentication',
    link: '2F-authentication',
    icon: (color?: string) => (
      <MaterialCommunityIcons
        name="two-factor-authentication"
        size={24}
        color={color}
      />
    ),
  },
  {
    id: 3,
    title: 'Delete Account',
    link: 'Delete-account',
    icon: (color?: string) => (
      <AntDesign
        name="deleteuser"
        size={24}
        color={color}
      />
    ),
  },
  {
    id: 4,
    title: 'Sign Out',
    signOut: true,
    icon: () => (
      <Entypo
        name="log-out"
        size={20}
        color="red"
      />
    ),
  },
];

enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export default function TabThreeScreen() {
  const { setColorScheme, colorScheme } = useColorScheme();
  const [isEnabled, setIsEnabled] = useState(colorScheme === 'dark');
  const { signOut } = useSession();
  const color = ColorPick();
  // const navigate = useNavigation();

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  useEffect(() => {
    setColorScheme(isEnabled ? Theme.Dark : Theme.Light);
  }, [isEnabled, setColorScheme]);

  return (
    <PashScrollView>
      {Settings.map((o) => (
        <View key={o.id}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              if (o.signOut) {
                return signOut();
              }
              // return navigate.navigate(o.link as never);
            }}
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row gap-2 items-center pb-2">
                <View className="bg-pashaDimGrey w-10 rounded-full aspect-square justify-center items-center">
                  {o.icon(color['--color-pashaPrimary'])}
                </View>
                <PashText className={`${o.signOut && 'text-red-600'}`}>{o.title}</PashText>
              </View>
              <FontAwesome6
                name="angle-right"
                size={16}
                color={o.signOut ? 'red' : color['--color-pashaPrimary']}
              />
            </View>
          </TouchableOpacity>
          {!o.signOut && <View className="w-full h-0.5 bg-pashaDimGrey" />}
        </View>
      ))}
      <View className="gap-2 flex-row items-center justify-between mt-4 rounded-lg bg-pashaBgGrey px-2 h-14">
        <PashText className="font-semibold">Change Theme</PashText>
        <Switch
          trackColor={{ false: '#000000', true: '#f4f3f4' }}
          thumbColor={isEnabled ? '#000000' : '#f4f3f4'}
          ios_backgroundColor="#f4f3f4"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </PashScrollView>
  );
}
