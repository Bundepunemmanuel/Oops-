import React from "react";
import { Modal, View, Text, Pressable, FlatList } from "react-native";
import { useApp } from "../context/AppProvider";
import { Category } from "../context/types";
import Animated, { FadeInUp } from "react-native-reanimated";

const CATEGORIES: Category[] = [
  "🤦 Forgot Something",
  "📱 Tech Fail",
  "💸 Money Mistake",
  "💬 Awkward Moment",
  "🚗 Driving",
  "📚 School/Work",
  "❤️ Relationship",
  "🏠 Home",
  "🛒 Shopping",
  "😂 Other"
];

export default function BottomSheetCategories({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { addOops } = useApp();

  const handleSelect = async (cat: Category) => {
    await addOops(cat);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent statusBarTranslucent>
      <View className="flex-1 justify-end bg-black/30">
        <Animated.View entering={FadeInUp.duration(300)} className="bg-bg rounded-t-3xl p-6">
          <View className="w-full items-center">
            <View className="w-16 h-1.5 bg-white/10 rounded-full mb-3" />
          </View>
          <Text className="text-xl text-white font-semibold mb-4">What kind of Oops?</Text>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(i) => i}
            renderItem={({ item }) => (
              <Pressable onPress={() => handleSelect(item as Category)} className="py-3">
                <Text className="text-white text-lg">{item}</Text>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View className="h-[1px] bg-white/5 my-1" />}
          />
          <View className="mt-4">
            <Pressable onPress={onClose} className="py-3 items-center">
              <Text className="text-neutral-400">Cancel</Text>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
