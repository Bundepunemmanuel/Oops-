import React from "react";
import { View, Text } from "react-native";

export default function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <View className="bg-card rounded-2xl p-4 shadow-sm">
      <Text className="text-neutral-300">{label}</Text>
      <Text className="text-white text-2xl font-semibold mt-2">{value}</Text>
    </View>
  );
}
