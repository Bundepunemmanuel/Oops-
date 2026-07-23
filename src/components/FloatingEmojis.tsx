import React from "react";
import { View, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";

export default function FloatingEmojis({ visible, emoji }: { visible: boolean; emoji: string }) {
  const y = useSharedValue(0);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      y.value = withTiming(-120, { duration: 900, easing: Easing.out(Easing.exp) });
      opacity.value = withTiming(1, { duration: 200 });
      const t = setTimeout(() => {
        opacity.value = withTiming(0, { duration: 400 });
      }, 1600);
      return () => clearTimeout(t);
    } else {
      y.value = withTiming(0);
      opacity.value = withTiming(0);
    }
  }, [visible]);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[{ position: "absolute", top: "38%" }, style]}>
      <View className="w-20 h-20 rounded-full items-center justify-center bg-white/10">
        <Text className="text-2xl">{emoji}</Text>
      </View>
    </Animated.View>
  );
}
