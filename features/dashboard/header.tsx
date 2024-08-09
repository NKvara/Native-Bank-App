import { Image, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { ColorPick } from '@/color-theme';

const DashboardHeader = () => {
  const color = ColorPick();

  return (
    <View className="flex-row justify-between items-center h-16">
      <View className="flex-row gap-3 items-center">
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1.05 }}
          colors={[color['--color-rebankYellow'], color['--color-rebankBackground']]}
          style={{
            borderRadius: 16,
            height: 54,
            width: 54,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 2,
          }}
        >
          <Image
            source={require('@/assets/images/shared/person.png')}
            className="w-full h-full rounded-2xl bg-white border border-solid border-rebankBackground"
          />
        </LinearGradient>
        {/* <ReText className="text-lg font-bold">{session}</ReText> */}
        <FontAwesome
          name="chevron-right"
          color={color['--color-rebankYellow']}
        />
      </View>
      <View className="bg-rebankDimGrey rounded-xl">
        <Ionicons
          className="m-4"
          color={color['--color-rebankPrimary']}
          name="qr-code"
          size={20}
        />
      </View>
    </View>
  );
};

export default DashboardHeader;
