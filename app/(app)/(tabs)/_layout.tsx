import React from 'react';
import { ColorPick } from '@/color-theme';
import { View } from 'react-native';
import ReText from '@/common/shared/ReText';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '@/app/(app)/(tabs)/(dashboard)';
import TabThreeScreen from '@/app/(app)/(tabs)/three';
import TransferLayout from '@/app/(app)/(tabs)/(transfers)/_layout';

// const DashboardStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const ColorPicker = ColorPick();
  const statusBarHeight = Constants.statusBarHeight;

  return (
    <Tab.Navigator
      screenOptions={{
        header: (props) => {
          return (
            <View
              className="bg-rebankBgGrey pb-2 border-b-2 border-b-rebankDimGrey"
              style={{ paddingTop: statusBarHeight }}
            >
              <View className="flex-row justify-between items-center h-12 px-4">
                <ReText className="font-bold capitalize text-lg">{props.route.name}</ReText>
                <View className="flex-row gap-4">
                  <Ionicons
                    color={ColorPicker['--color-rebankPrimary']}
                    name="qr-code"
                    size={20}
                  />
                  <Ionicons
                    color={ColorPicker['--color-rebankPrimary']}
                    name="notifications-outline"
                    size={20}
                  />
                </View>
              </View>
            </View>
          );
        },
        tabBarStyle: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: 16,
          paddingHorizontal: 12,
          marginHorizontal: 64,
          borderTopWidth: 0,
          borderRadius: 32,
          height: 52,
          backgroundColor: ColorPicker['--color-inputBackground'],
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: ColorPicker['--color-rebankPrimary'],
        tabBarItemStyle: {
          height: 52,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="home-sharp"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Transfers"
        component={TransferLayout}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                borderRadius: 100,
                height: 40,
                width: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: focused ? color : ColorPicker['--color-inputBackground'],
              }}
            >
              <AntDesign
                name="retweet"
                size={24}
                color={focused ? ColorPicker['--color-inputBackground'] : color}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Parameters"
        component={TabThreeScreen}
        options={{
          title: 'Tab Three',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="view-grid-plus-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
