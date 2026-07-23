# Deploying Oops to Vercel (Web)

This repo is an Expo-managed React Native app that supports web via Expo's web build. Below are the recommended options to host the web version on Vercel.

Important: Some native-only libraries (lottie-react-native, react-native-confetti-cannon, certain haptics) are not available on web. The app currently falls back to simple web-friendly UI when native modules aren't available. For a fully-featured native build (iOS/Android), use EAS and a custom native build.

Quick deploy (static web build)
1. In the project root you'll find `vercel.json` which configures Vercel to serve the `web-build` output.
2. Build command: `npm run build` (maps to `expo build:web`) — Vercel will run the `build` script automatically.
3. Output directory: `web-build` (configured in vercel.json)

Steps to connect repo to Vercel
1. Go to https://vercel.com and sign in.
2. Import Project -> GitHub -> select `Bundepunemmanuel/Oops-`.
3. Set Build Command: `npm run build` and Output Directory: `web-build` (Vercel may auto-detect). Environment variables: none required for static build.
4. Deploy. Vercel will run `npm run build` and publish the `web-build` folder.

Notes & Troubleshooting
- If `expo build:web` isn't available in Vercel environment, ensure `expo-cli` is installed as a devDependency or use `npx expo build:web` in the `build` script.
- Native modules: The Achievement modal dynamically requires `lottie-react-native` and confetti only on native platforms; on web it uses a fallback emoji view so the web build won't fail.
- If you prefer a Next.js web experience (better SEO, Image optimization, server rendering), consider migrating the web portion to Next.js + Expo router integration. I can help with that migration.

Recommended follow-ups
- Add a web-optimized Lottie player for browser (e.g., `@lottiefiles/react-lottie-player`) to show same Lottie animation on web.
- Configure a CI step to produce the `web-build` locally via EAS for deterministic builds.
- Add analytics and environment variables to Vercel if you want personalization.
