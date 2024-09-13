import { View, Image, TouchableHighlight } from 'react-native';
import React from 'react';
import PashText from '@/common/shared/PashText';
import { useColorScheme } from 'nativewind';

const LoginHeader = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View
      className="min-h-[30vh] h-1/3 w-full"
      style={{ opacity: colorScheme === 'light' ? 0.9 : 1 }}
    >
      <Image
        source={require('@/assets/images/login/topimage.png')}
        className="h-full absolute top-0"
        resizeMode="stretch"
        blurRadius={100}
      />
      <TouchableHighlight onPress={toggleColorScheme}>
        <View className="absolute flex-row items-center justify-center top-20 right-8 gap-1.5">
          <Image className='aspect-square w-8' source={require('@/assets/images/pasha.png')} />
          <PashText className="font-bold text-white text-2xl">Pasha Bank</PashText>
        </View>
      </TouchableHighlight>
      <View className="absolute bottom-0 p-8">
        <PashText className="text-5xl font-bold text-white">Sign in to your Account</PashText>
      </View>
    </View>
  );
};

export default LoginHeader;
