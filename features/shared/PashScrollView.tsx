import { View, ScrollView } from 'react-native';
import React from 'react';

const PashScrollView = ({ children, scroll = true }: { children: React.ReactNode; scroll?: boolean }) => {
  if (!scroll) {
    return (
      <View className="bg-pashaBackground h-screen">
        <View className="px-4 pt-4 gap-4">{children}</View>
      </View>
    );
  }

  return (
    <View className="bg-pashaBackground h-screen">
      <ScrollView className="px-4 pt-4">
        <View className="mb-52 gap-4">{children}</View>
      </ScrollView>
    </View>
  );
};

export default PashScrollView;
