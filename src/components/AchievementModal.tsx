import React from "react";
import { Modal, View, Text, Pressable, Platform } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Achievement } from "../data/achievements";

let LottieView: any = null;
let ConfettiCannon: any = null;
try {
  if (Platform.OS !== "web") {
    // native-only modules
    // require dynamically so web build doesn't attempt to bundle them
    // lottie-react-native and react-native-confetti-cannon are native
    LottieView = require("lottie-react-native").default;
    ConfettiCannon = require("react-native-confetti-cannon").default;
  }
} catch (e) {
  // ignore
}

export default function AchievementModal({ visible, achievement, onClose }: { visible: boolean; achievement: Achievement | null; onClose: () => void }) {
  if (!visible || !achievement) return null;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40">
        <Animated.View entering={FadeIn.duration(300)} className="bg-bg p-6 rounded-3xl items-center w-[320px]">
          {LottieView ? (
            <LottieView
              source={require("../../assets/animations/achievement.json")}
              autoPlay
              loop={false}
              style={{ width: 160, height: 160 }}
            />
          ) : (
            <View className="w-40 h-40 rounded-full bg-white/6 items-center justify-center">
              <Text className="text-5xl">{achievement.icon ?? "🎉"}</Text>
            </View>
          )}

          <Text className="text-white text-xl font-semibold mt-2">{achievement.title}</Text>
          <Text className="text-neutral-300 mt-1 text-center">{achievement.description}</Text>
          <View className="flex-row space-x-3 mt-4">
            <Pressable onPress={onClose} className="px-4 py-2 rounded-full bg-white/8">
              <Text className="text-white">Nice</Text>
            </Pressable>
            <Pressable onPress={() => { /* share placeholder */ }} className="px-4 py-2 rounded-full bg-violet-600">
              <Text className="text-white">Share</Text>
            </Pressable>
          </View>
        </Animated.View>
        {ConfettiCannon ? <ConfettiCannon count={80} origin={{ x: -10, y: 0 }} fadeOut /> : null}
      </View>
    </Modal>
  );
}
