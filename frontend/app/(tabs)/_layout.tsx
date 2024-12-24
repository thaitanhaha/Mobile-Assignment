import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import HomeSVG from '../../assets/icons/tabs/home.svg';
import WalletsSVG from '../../assets/icons/tabs/wallets.svg';
import AddSVG from '../../assets/icons/tabs/add.svg';
import NotificationsSVG from '../../assets/icons/tabs/notifications.svg';
import SettingsSVG from '../../assets/icons/tabs/settings.svg';

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
          tabBarIcon: ({ color }: { color: string }) => (
            <HomeSVG style={{ width: '60%', height: '60%' }} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallets"
        options={{
          title: 'Wallets',
          tabBarIcon: ({ color }) => (
            <WalletsSVG style={{ width: '50%', height: '50%' }} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ color }) => (
            <AddSVG style={{ width: '100%', height: '100%' }} />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color }) => (
            <NotificationsSVG style={{ width: '60%', height: '60%' }} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <SettingsSVG style={{ width: '60%', height: '60%' }} />
          ),
        }}
      />
    </Tabs>
  );
}
