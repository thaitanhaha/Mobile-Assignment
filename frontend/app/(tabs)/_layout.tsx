import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['dark'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          default: {
            height: 60,
          },
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/tabs/home.svg')}
              style={{ width: '60%', height: '60%', tintColor: color, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallets"
        options={{
          title: 'Wallets',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/tabs/wallets.svg')}
              style={{ width: '50%', height: '50%', tintColor: color, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/tabs/add.svg')}
              style={{ width: '100%', height: '100%', resizeMode: 'stretch' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/tabs/notifications.svg')}
              style={{ width: '60%', height: '60%', tintColor: color, resizeMode: 'contain' }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/tabs/settings.svg')}
              style={{ width: '60%', height: '60%', tintColor: color, resizeMode: 'contain' }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
