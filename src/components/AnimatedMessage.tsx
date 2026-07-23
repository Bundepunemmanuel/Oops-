import React from "react";
import { View, Text } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";

export default function AnimatedMessage({ message, visible }: { message: string; visible: boolean }) {
  const y = useSharedValue(30);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    if (visible) {
      y.value = withTiming(0, { duration: 500, easing: Easing.out(Easing.exp) });
      opacity.value = withTiming(1, { duration: 300 });
      const t = setTimeout(() => {
        y.value = withTiming(30, { duration: 400 });
        opacity.value = withTiming(0, { duration: 300 });
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const style = useAnimatedStyle(() => ({ transform: [{ translateY: y.value }], opacity: opacity.value }));

  if (!visible) return null;

  return (
    <Animated.View style={style} className="absolute bottom-32 left-0 right-0 items-center">
      <View className="bg-white/6 px-4 py-2 rounded-full">
        <Text className="text-white">{message}</Text>
      </View>
    </Animated.View>
  );
}
