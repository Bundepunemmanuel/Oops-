# Vercel web branch

This branch (feat/vercel-web) prepares the project for a web-first deployment on Vercel.

What's changed in this branch:
- package.json: removed native-only packages (lottie-react-native, react-native-confetti-cannon) and added web-friendly alternatives (@lottiefiles/react-lottie-player, react-confetti)
- src/components/AchievementModal.tsx: uses web Lottie + web confetti on Platform.OS === 'web', with native fallback emoji
- Build script uses `npx expo export:web --output-dir web-build` for a static export compatible with Vercel
- vercel.json (already present) points Vercel to web-build directory

How to test locally:
1. git checkout feat/vercel-web
2. npm install
3. npm run build:prod
4. Serve the web-build folder locally: `npx serve web-build` or open web-build/index.html

After you verify locally push/merge to main and connect to Vercel.
