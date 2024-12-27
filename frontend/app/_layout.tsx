import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
      setIsFirstLaunch(hasOnboarded === null);
    };
    checkFirstLaunch();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); 
    }
  }, [loaded]);

  if (!loaded || isFirstLaunch === null) {
    return null;
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {isFirstLaunch ? (
          <Stack.Screen name="(onboarding)" />
        ) : (
          <Stack.Screen name="(tabs)"/>
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}