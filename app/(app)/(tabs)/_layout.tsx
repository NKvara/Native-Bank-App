import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ColorPick } from '@/color-theme';
import { View } from 'react-native';
import ReText from '@/common/shared/ReText';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '@/app/(app)/(tabs)/(dashboard)';
import TabTwoScreen from '@/app/(app)/(tabs)/two';
import TabThreeScreen from '@/app/(app)/(tabs)/three';
import TabFourScreen from '@/app/(app)/(tabs)/four';
import TabFiveScreen from '@/app/(app)/(tabs)/five';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused: boolean;
}) {
  return (
    <View className="items-center">
      <FontAwesome
        size={24}
        {...props}
      />
    </View>
  );
}

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
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="home"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tab Two"
        component={TabTwoScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="bug"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Tab Three"
        component={TabThreeScreen}
        options={{
          title: 'Tab Three',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="grav"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="four"
        component={TabFourScreen}
        options={{
          title: 'Tab Four',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="play"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="five"
        component={TabFiveScreen}
        options={{
          title: 'Tab Five',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="cog"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
