import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { ThemeProvider } from '@/theme';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('@expo-google-fonts/inter/Inter_400Regular.ttf'),
    'Inter-Medium': require('@expo-google-fonts/inter/Inter_500Medium.ttf'),
    'Inter-Bold': require('@expo-google-fonts/inter/Inter_700Bold.ttf'),
    'NotoSansJP-Regular': require('@expo-google-fonts/noto-sans-jp/NotoSansJP_400Regular.ttf'),
    'NotoSansJP-Medium': require('@expo-google-fonts/noto-sans-jp/NotoSansJP_500Medium.ttf'),
    'NotoSansJP-Bold': require('@expo-google-fonts/noto-sans-jp/NotoSansJP_700Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <GestureHandlerRootView style={styles.root}>
          <StatusBar style="light" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
            <Stack.Screen
              name="lock-in"
              options={{ animation: 'fade', presentation: 'fullScreenModal' }}
            />
            <Stack.Screen
              name="history"
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="prs"
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="measurements"
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="settings"
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="templates"
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="battle-cry"
              options={{ animation: 'fade', presentation: 'fullScreenModal' }}
            />
            <Stack.Screen
              name="forge"
              options={{ animation: 'slide_from_bottom', presentation: 'modal' }}
            />
            <Stack.Screen
              name="warrior-oath"
              options={{ animation: 'fade', presentation: 'fullScreenModal' }}
            />
            <Stack.Screen
              name="pact/[id]"
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="exercise/index"
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="exercise/[id]"
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="program/index"
              options={{ animation: 'slide_from_right' }}
            />
            <Stack.Screen
              name="program/[id]"
              options={{ animation: 'slide_from_right' }}
            />
          </Stack>
        </GestureHandlerRootView>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});