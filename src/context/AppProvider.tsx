import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import { v4 as uuidv4 } from "uuid";
import { OopsEvent, Category } from "./types";
import { ACHIEVEMENTS, Achievement } from "../data/achievements";

type Settings = {
  haptics: boolean;
  sound: boolean;
  theme: "dark" | "light" | "system";
};

type AppState = {
  events: OopsEvent[];
  xp: number;
  level: number;
  streak: number;
  settings: Settings;
  addOops: (category: Category) => Promise<OopsEvent>;
  resetData: () => Promise<void>;
  toggleHaptics: () => void;
  unlocked: string[];
  recentAchievement: Achievement | null;
  clearRecentAchievement: () => void;
};

const initialSettings: Settings = {
  haptics: true,
  sound: false,
  theme: "dark"
};

const STORAGE_KEY = "oops:v1";

const AppContext = createContext<AppState | undefined>(undefined);

function calculateLevel(xp: number) {
  // simple leveling curve
  const thresholds = [0, 10, 30, 60, 100, 160, 240, 340, 460, 600];
  let level = 1;
  for (let i = 0; i < thresholds.length; i++) {
    if (xp >= thresholds[i]) level = i + 1;
  }
  return level;
}

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<OopsEvent[]>([]);
  const [xp, setXp] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [streak, setStreak] = useState<number>(0);
  const [settings, setSettings] = useState<Settings>(initialSettings);
  const [loaded, setLoaded] = useState(false);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [recentAchievement, setRecentAchievement] = useState<Achievement | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          setEvents(parsed.events || []);
          setXp(parsed.xp || 0);
          setLevel(calculateLevel(parsed.xp || 0));
          setStreak(parsed.streak || 0);
          setSettings(parsed.settings || initialSettings);
          setUnlocked(parsed.unlocked || []);
        }
      } catch (e) {
        console.warn("Failed to load storage", e);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ events, xp, streak, settings, unlocked }));
      } catch (e) {
        console.warn("Failed to save storage", e);
      }
    })();
  }, [events, xp, streak, settings, unlocked]);

  useEffect(() => {
    setLevel(calculateLevel(xp));
  }, [xp]);

  const addOops = async (category: Category) => {
    const event: OopsEvent = {
      id: uuidv4(),
      category,
      ts: Date.now(),
      xp: 1
    };
    // Haptics
    if (settings.haptics) {
      try {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {}
    }
    setEvents((s) => [event, ...s]);
    setXp((x) => x + event.xp);
    // TODO: update streak logic; simple placeholder
    setStreak((s) => {
      // if same day as last, increment else reset to 1
      const last = events[0];
      if (!last) return 1;
      const lastDay = new Date(last.ts).toDateString();
      const today = new Date().toDateString();
      return lastDay === today ? s + 1 : 1;
    });

    // Check achievements
    try {
      const total = events.length + 1; // after adding
      const newlyUnlocked = ACHIEVEMENTS.filter(a => a.condition(total, [event, ...events]) && !unlocked.includes(a.id));
      if (newlyUnlocked.length) {
        setUnlocked(s => [...s, ...newlyUnlocked.map(n => n.id)]);
        setRecentAchievement(newlyUnlocked[0]);
        setXp(x => x + newlyUnlocked[0].xp);
      }
    } catch (e) {
      console.warn("achievement check failed", e);
    }

    return event;
  };

  const resetData = async () => {
    setEvents([]);
    setXp(0);
    setLevel(1);
    setStreak(0);
    setSettings(initialSettings);
    setUnlocked([]);
    setRecentAchievement(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const toggleHaptics = () => {
    setSettings((s) => ({ ...s, haptics: !s.haptics }));
  };

  const clearRecentAchievement = () => setRecentAchievement(null);

  if (!loaded) return null;

  return (
    <AppContext.Provider value={{ events, xp, level, streak, settings, addOops, resetData, toggleHaptics, unlocked, recentAchievement, clearRecentAchievement }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
