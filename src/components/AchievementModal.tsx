import React from "react";
import { Modal, View, Text, Pressable, Platform, Dimensions } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { Achievement } from "../data/achievements";

// Web Lottie + Confetti
let WebLottie: any = null;
let ReactConfetti: any = null;
if (Platform.OS === "web") {
  try {
    // @ts-ignore
    WebLottie = require("@lottiefiles/react-lottie-player").Player;
    // @ts-ignore
    ReactConfetti = require("react-confetti").default;
  } catch (e) {
    WebLottie = null;
    ReactConfetti = null;
  }
}

export default function AchievementModal({ visible, achievement, onClose }: { visible: boolean; achievement: Achievement | null; onClose: () => void }) {
  if (!visible || !achievement) return null;
  const { width, height } = Dimensions.get("window");
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40">
        <Animated.View entering={FadeIn.duration(300)} className="bg-bg p-6 rounded-3xl items-center w-[320px]">
          {Platform.OS === "web" && WebLottie ? (
            <>
              {/* @ts-ignore */}
              <WebLottie autoplay loop={false} src={require("../../assets/animations/achievement.json")} style={{ width: 160, height: 160 }} />
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
              {/* @ts-ignore */}
              {ReactConfetti ? <ReactConfetti numberOfPieces={80} recycle={false} width={width} height={height} /> : null}
            </>
          ) : (
            // Native fallback - still try dynamic native Lottie/confetti if available
            <>
              <View className="w-40 h-40 rounded-full bg-white/6 items-center justify-center">
                <Text className="text-5xl">{achievement.icon ?? "🎉"}</Text>
              </View>
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
            </>
          )}
        </Animated.View>
      </View>
    </Modal>
  );
}
