import React from "react";
import { View, Text } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from "react-native-reanimated";

export default function XPBar({ xp }: { xp: number }) {
  // simple curve: next level at xp + 10
  const cur = useSharedValue(0);

  React.useEffect(() => {
    cur.value = withTiming((xp % 10) / 10, { duration: 600 });
  }, [xp]);

  const style = useAnimatedStyle(() => ({
    width: `${Math.min(100, cur.value * 100)}%`
  }));

  return (
    <View>
      <Text className="text-neutral-400 mb-2">XP</Text>
      <View className="h-3 bg-white/8 rounded-full overflow-hidden">
        <Animated.View style={[{ height: 12, backgroundColor: "#7c3aed", borderRadius: 8 }, style]} />
      </View>
      <Text className="text-neutral-400 mt-1">Level progress</Text>
    </View>
  );
}
