import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { Platform, useColorScheme } from 'react-native';

import { paletteFor } from '@/constants/theme';

// Keeps the grid mounted underneath when /menu is opened directly from a deep link.
export const unstable_settings = {
  anchor: 'index',
};

export default function RootLayout() {
  const scheme = useColorScheme();
  const colors = paletteFor(scheme);
  const navigationTheme = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const theme = {
    ...navigationTheme,
    colors: {
      ...navigationTheme.colors,
      background: colors.background,
      card: colors.background,
      text: colors.text,
    },
  };

  useEffect(() => {
    // The native root view sits behind the React tree (modals, overscroll, first paint).
    void SystemUI.setBackgroundColorAsync(colors.background);
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.documentElement.style.colorScheme = scheme === 'dark' ? 'dark' : 'light';
    }
  }, [colors.background, scheme]);

  return (
    <ThemeProvider value={theme}>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="menu" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
