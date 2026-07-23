import React from "react";
import { Pressable, Text } from "react-native";
import Animated, { useSharedValue, withSpring, useAnimatedStyle, withTiming } from "react-native-reanimated";
import * as Haptics from "expo-haptics";

const SIZE = 220;

export default function OopsButton({ onPress }: { onPress: () => void }) {
  const scale = useSharedValue(1);
  const pressed = useSharedValue(false);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(scale.value, { damping: 8, stiffness: 200 }) }]
  }));

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        onPressIn={() => {
          scale.value = 0.92;
          pressed.value = true;
          try { Haptics.selectionAsync(); } catch {}
        }}
        onPressOut={() => {
          scale.value = 1;
          pressed.value = false;
        }}
        onPress={() => {
          // small push animation
          scale.value = 0.98;
          setTimeout(()=> (scale.value = 1), 120);
          onPress();
        }}
        className="w-[220px] h-[220px] rounded-full items-center justify-center bg-gradient-to-b from-purple-500 to-pink-500 shadow-lg"
      >
        <Text className="text-3xl text-white font-bold">Oops 😅</Text>
      </Pressable>
    </Animated.View>
  );
}
