import React from "react";
import { Modal, View, Text, Pressable, Image } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import ConfettiCannon from "react-native-confetti-cannon";
import LottieView from "lottie-react-native";
import { Achievement } from "../data/achievements";

export default function AchievementModal({ visible, achievement, onClose }: { visible: boolean; achievement: Achievement | null; onClose: () => void }) {
  if (!visible || !achievement) return null;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/40">
        <Animated.View entering={FadeIn.duration(300)} className="bg-bg p-6 rounded-3xl items-center w-[320px]">
          <LottieView
            source={require("../../assets/animations/achievement.json")}
            autoPlay
            loop={false}
            style={{ width: 160, height: 160 }}
          />
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
        <ConfettiCannon count={80} origin={{ x: -10, y: 0 }} fadeOut />
      </View>
    </Modal>
  );
}
