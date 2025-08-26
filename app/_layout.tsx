import "@/global.css";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ToastProvider } from "react-native-toast-notifications";

import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ToastProvider
        swipeEnabled={true}
        placement="bottom" // Imposta la posizione predefinita in basso
        duration={3000} // Durata predefinita
        style={{ borderRadius: 10, paddingHorizontal: 15, paddingVertical: 10 }}
        textStyle={{ fontSize: 16 }}
      >
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="screens/MusicDetailScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/editProfile"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/forgotPassword"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/Objectives"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="screens/musicSound"
            options={{ headerShown: false }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
      </ToastProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
