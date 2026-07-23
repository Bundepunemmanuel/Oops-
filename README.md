# Oops — Next.js Web App

This repo now contains a Next.js web-first implementation of Oops 😅. The application is built with:
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion (for animations)
- @lottiefiles/react-lottie-player (web Lottie)
- react-confetti for celebration
- localforage for persistent storage

Quick start
1. Install dependencies
   npm install
2. Run dev
   npm run dev
3. Build for production
   npm run build
   npm run start

Deploy on Vercel
- Vercel detects Next.js automatically. Connect the repo and deploy the main branch.
- Add a Lottie JSON file at public/animations/achievement.json for the achievement animation.

Notes
- The original React Native / Expo code was replaced by a web-first Next.js app in main. If you need the native app preserved, let me know and I can restore it in a separate branch.
- The app stores data locally in the browser using localforage. Switching to a remote backend (Supabase) is straightforward: replace the storage adapter.
