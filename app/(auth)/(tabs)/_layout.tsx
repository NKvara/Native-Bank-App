import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { ColorPick } from '@/color-theme';
import { View } from 'react-native';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
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

export default function TabLayout() {
  const ColorPicker = ColorPick();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: ColorPicker['--color-rebankPrimary'],
        headerShown: false,
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
        tabBarItemStyle: {
          height: 52,
        },
      }}
    >
      <Tabs.Screen
        name="(dashboard)/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="home"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name="bug"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="three"
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
      <Tabs.Screen
        name="four"
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
      <Tabs.Screen
        name="five"
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
    </Tabs>
  );
}
