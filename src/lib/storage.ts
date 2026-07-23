import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * simple AsyncStorage wrapper with JSON helpers and basic migration idea.
 */

export async function loadJSON<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export async function saveJSON<T>(key: string, value: T) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn("saveJSON error", e);
  }
}

export async function removeKey(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.warn("removeKey error", e);
  }
}
