import { View } from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ColorPick } from '@/color-theme';
import Constants from 'expo-constants';

const DashboardHeader = () => {
  const color = ColorPick();
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <View
      className="bg-pashaBgGrey pb-2 border-b-2 border-b-pashaDimGrey"
      style={{ paddingTop: statusBarHeight }}
    >
      <View className="flex-row justify-between items-center h-12 px-4">
        <View />
        <View className="flex-row gap-4">
          <Ionicons
            color={color['--color-pashaPrimary']}
            name="qr-code"
            size={20}
          />
          <Ionicons
            color={color['--color-pashaPrimary']}
            name="notifications-outline"
            size={20}
          />
        </View>
      </View>
    </View>
  );
};

export default DashboardHeader;
