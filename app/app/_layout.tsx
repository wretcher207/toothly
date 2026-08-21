import "../global.css";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
import {
  InterTight_400Regular,
  InterTight_500Medium,
  InterTight_600SemiBold,
  InterTight_800ExtraBold,
} from "@expo-google-fonts/inter-tight";
import { JetBrainsMono_500Medium } from "@expo-google-fonts/jetbrains-mono";
import { PlayfairDisplay_600SemiBold_Italic } from "@expo-google-fonts/playfair-display";
import { View } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { colors } from "@/lib/tokens";

export const unstable_settings = {
  anchor: "(tabs)",
};

const ToothlyLight = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.coral,
    background: colors.paper,
    card: colors.bone,
    text: colors.ink[900],
    border: colors.line,
    notification: colors.coral,
  },
};

const ToothlyDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.paper,
    background: colors.ink[900],
    card: colors.ink[800],
    text: colors.paper,
    border: colors.ink[700],
    notification: colors.coral,
  },
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    InterTight_400Regular,
    InterTight_500Medium,
    InterTight_600SemiBold,
    InterTight_800ExtraBold,
    JetBrainsMono_500Medium,
    PlayfairDisplay_600SemiBold_Italic,
  });

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: colors.paper }} />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? ToothlyDark : ToothlyLight}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="study/session" options={{ headerShown: false }} />
        <Stack.Screen name="mock-exam" options={{ headerShown: false }} />
        <Stack.Screen name="paywall" options={{ headerShown: false }} />
        <Stack.Screen name="reference/[slug]" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
      </Stack>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}
