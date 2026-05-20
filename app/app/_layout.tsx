import "../global.css";

import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from "@expo-google-fonts/inter";
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
    primary: colors.petrol,
    background: colors.sand,
    card: colors.bone,
    text: colors.ink[900],
    border: colors.ink[200],
    notification: colors.coral,
  },
};

const ToothlyDark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.coral,
    background: colors.petrolDeep,
    card: colors.petrol,
    text: colors.sand,
    border: "#1B2126",
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
  });

  if (!loaded) {
    return <View style={{ flex: 1, backgroundColor: colors.sand }} />;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? ToothlyDark : ToothlyLight}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "Modal" }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
