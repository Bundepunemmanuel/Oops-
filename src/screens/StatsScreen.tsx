import React from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import { useApp } from "../context/AppProvider";
import { LineChart, BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import StatCard from "../components/StatCard";

const screenWidth = Dimensions.get("window").width - 48;

export default function StatsScreen() {
  const { events } = useApp();

  const monthly = new Array(12).fill(0);
  events.forEach(e => {
    const d = new Date(e.ts);
    monthly[d.getMonth()]++;
  });

  return (
    <SafeAreaView className="flex-1 bg-bg px-6">
      <ScrollView contentContainerStyle={{ paddingBottom: 48 }}>
        <Text className="text-3xl text-white font-semibold my-6">Insights</Text>
        <StatCard label="Lifetime Oops" value={`${events.length}`} />
        <View className="mt-6">
          <Text className="text-white text-lg mb-2">Monthly Oops</Text>
          <BarChart
            data={{ labels: ["J","F","M","A","M","J","J","A","S","O","N","D"], datasets: [{ data: monthly }] }}
            width={screenWidth}
            height={200}
            chartConfig={{
              backgroundGradientFrom: "#0b1020",
              backgroundGradientTo: "#0b1020",
              decimalPlaces: 0,
              color: () => `rgba(124,58,237,1)`,
              labelColor: () => `rgba(255,255,255,0.6)`
            }}
            withInnerLines={false}
            style={{ borderRadius: 12 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
