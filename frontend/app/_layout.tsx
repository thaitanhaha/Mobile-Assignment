import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://59d3f7bec707b2c948b272820a95eca7@o4508525007667200.ingest.de.sentry.io/4508525009829968',

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // enableSpotlight: __DEV__,
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Check if this is the first launch of the app
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasOnboarded = await AsyncStorage.getItem('hasOnboarded');
      setIsFirstLaunch(hasOnboarded === null);
    };
    checkFirstLaunch();
  }, []);

  // Check if the user is logged in
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = await AsyncStorage.getItem('authToken'); // Replace with your auth logic
      setIsAuthenticated(!!token); // Set true if token exists, otherwise false
    };
    checkAuthentication();
  }, []);

  // Hide splash screen once fonts and other assets are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); 
    }
  }, [loaded]);

  if (!loaded || isFirstLaunch === null || isAuthenticated === null) {
    return null; // Wait until everything is loaded and state is determined
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {isFirstLaunch ? (
          <Stack.Screen name="(onboarding)" />
        ) : isAuthenticated ? (
          <Stack.Screen name="(tabs)" />
        ) : (
          <Stack.Screen name="(login)" />
        )}
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default Sentry.wrap(RootLayout);