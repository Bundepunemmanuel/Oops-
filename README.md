# Oops 😅 - Expo React Native App (TypeScript)

A tiny, delight-first app for logging little mistakes — polished like a top App Store app.

Quick start
1. Install dependencies:
   - npm install
   - or yarn
2. Start dev server:
   - npx expo start
   - or yarn start
3. Open on device/emulator via Expo Go or simulator.

Tech
- Expo SDK (managed)
- Expo Router
- React Native + TypeScript
- NativeWind (Tailwind)
- Reanimated + Gesture Handler
- Expo Haptics
- AsyncStorage for local persistence
- react-native-confetti-cannon for celebration
- lottie-react-native for achievement animations

Architecture
- src/
  - screens/ — app routes
  - components/ — reusable UI pieces
  - context/ — AppProvider, settings, XP system
  - hooks/ — useStats, useDailySummary
  - lib/ — storage and utils
  - design/ — theme, constants

Notes
- Dark mode is the default UI. Settings allow toggling.
- Data stored locally in AsyncStorage; can be replaced with remote storage by swapping the storage adapter in src/lib/storage.ts.
- Replace placeholder assets in /assets to customize branding.
