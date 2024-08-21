import { Image, View, Button } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ColorPick } from '@/color-theme';
import { useSession } from '@/context/ctx';
import Constants from 'expo-constants';

const DashboardHeader = () => {
  const color = ColorPick();
  const { signOut } = useSession();
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <View className='bg-rebankBgGrey pb-2' style={{ paddingTop: statusBarHeight }}>
      <View className="flex-row justify-between items-center h-12 px-4">
        <Image
          source={require('@/assets/images/shared/person.png')}
          className="w-12 h-12 rounded-full bg-white border border-solid border-rebankBackground"
        />
        <Button
          title="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
        <View className="flex-row gap-4">
          <Ionicons
            color={color['--color-rebankPrimary']}
            name="qr-code"
            size={20}
          />
          <Ionicons
            color={color['--color-rebankPrimary']}
            name="notifications-outline"
            size={20}
          />
        </View>
      </View>
    </View>
  );
};

export default DashboardHeader;
