import React from "react";
import { SafeAreaView, View, Text, Pressable } from "react-native";
import { useApp } from "../context/AppProvider";

export default function SettingsScreen() {
  const { settings, toggleHaptics, resetData } = useApp();
  return (
    <SafeAreaView className="flex-1 bg-bg px-6">
      <Text className="text-2xl text-white my-6">Settings</Text>
      <View className="space-y-4">
        <View className="flex-row justify-between items-center">
          <Text className="text-white">Haptics</Text>
          <Pressable onPress={toggleHaptics}>
            <Text className="text-neutral-300">{settings.haptics ? "On" : "Off"}</Text>
          </Pressable>
        </View>
        <Pressable onPress={resetData} className="py-3">
          <Text className="text-rose-400">Reset Data</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
