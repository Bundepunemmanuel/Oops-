import React from "react";
import { Slot, SplashScreen, Router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppProvider } from "../src/context/AppProvider";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <Slot />
      </AppProvider>
    </SafeAreaProvider>
  );
}
