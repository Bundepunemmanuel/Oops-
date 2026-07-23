import React, { useCallback, useState } from "react";
import { View, Text, SafeAreaView, ImageBackground } from "react-native";
import { useApp } from "../context/AppProvider";
import OopsButton from "../components/OopsButton";
import XPBar from "../components/XPBar";
import StatCard from "../components/StatCard";
import FloatingEmojis from "../components/FloatingEmojis";
import BottomSheetCategories from "../components/BottomSheetCategories";
import AnimatedMessage from "../components/AnimatedMessage";
import AchievementModal from "../components/AchievementModal";

export default function HomeScreen() {
  const { events, xp, level, streak, recentAchievement, clearRecentAchievement } = useApp();
  const [sheetVisible, setSheetVisible] = useState(false);
  const [floating, setFloating] = useState<{emoji:string, message:string} | null>(null);

  const todaysCount = events.filter(e => {
    const d = new Date(e.ts);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }).length;

  const lifetime = events.length;

  const onOops = useCallback(() => {
    setSheetVisible(true);
    setFloating({
      emoji: ["😂","😅","😭","💀"][Math.floor(Math.random()*4)],
      message: ["Character development +1","Nobody saw that.","You survived.","Another lesson unlocked."][Math.floor(Math.random()*4)]
    });
    setTimeout(()=>setFloating(null), 2500);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-bg px-6">
      <View className="flex-1 items-center justify-center">
        <Text className="text-5xl font-display text-white mb-6">Oops 😅</Text>
        <OopsButton onPress={onOops} />
        <FloatingEmojis visible={!!floating} emoji={floating?.emoji ?? ""} />
        <AnimatedMessage message={floating?.message ?? ""} visible={!!floating} />
        <View className="mt-8 w-full space-y-3">
          <StatCard label="Today's Oops" value={String(todaysCount)} />
          <StatCard label="Current Check-in Streak" value={`${streak} days`} />
          <StatCard label="Lifetime Oops" value={String(lifetime)} />
          <StatCard label="Current Level" value={`Level ${level}`} />
          <XPBar xp={xp} />
        </View>
        <View className="mt-6 items-center">
          <Text className="text-neutral-300">"{[
            "Character development is expensive.",
            "Congratulations. You unlocked another life lesson.",
            "You survived another tiny catastrophe."
          ][Math.floor(Math.random()*3)]}"</Text>
        </View>
      </View>

      <BottomSheetCategories visible={sheetVisible} onClose={() => setSheetVisible(false)} />

      <AchievementModal visible={!!recentAchievement} achievement={recentAchievement} onClose={() => clearRecentAchievement()} />
    </SafeAreaView>
  );
}
