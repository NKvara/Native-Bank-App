import React from 'react';
import { ColorPick } from '@/color-theme';
import { View } from 'react-native';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '@/app/(app)/(tabs)/(dashboard)';
import TabThreeScreen from '@/app/(app)/(tabs)/three';
import TransferLayout from '@/app/(app)/(tabs)/(transfers)/_layout';
import Header from '@/features/shared/header';

// const DashboardStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function TabLayout() {
  const ColorPicker = ColorPick();

  return (
    <Tab.Navigator
      screenOptions={{
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
        tabBarActiveTintColor: ColorPicker['--color-pashaPrimary'],
        tabBarItemStyle: {
          height: 52,
        },
        header: (props) => {
          return (
            <Header
              title={props.route.name}
              goBack={false}
              endAdornment={
                <View className="flex-row gap-4">
                  <Ionicons
                    color={ColorPicker['--color-pashaPrimary']}
                    name="qr-code"
                    size={20}
                  />
                  <Ionicons
                    color={ColorPicker['--color-pashaPrimary']}
                    name="notifications-outline"
                    size={20}
                  />
                </View>
              }
            />
          );
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
