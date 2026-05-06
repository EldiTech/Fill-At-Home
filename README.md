# Fill At Home

Mobile app built with Expo and React Native for customer and admin workflows.

## Overview

This project includes:
- Customer login and app flow
- Admin login and dashboard flow
- Menu browsing and order-related screens
- Settings and profile-related screens

## Tech Stack

- Expo SDK 54
- React 19
- React Native 0.81
- TypeScript
- react-native-svg
- expo-linear-gradient
- expo-video

## Project Structure

- `Admin/` - Admin panel screens, modules, and shared admin components
- `LogIn/` - Role select and login screens
- `User/` - Customer screens, settings, and shared user components
- `assets/` - Images, icons, and media
- `App.tsx` - Main app entry and route flow

## Prerequisites

- Node.js 18+
- npm
- Expo Go app (for mobile testing) or Android/iOS simulator

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run start
```

3. Run on a platform:

```bash
npm run android
npm run ios
npm run web
```

## Scripts

- `npm run start` - Start Expo dev server
- `npm run android` - Open Android target
- `npm run ios` - Open iOS target
- `npm run web` - Open web target

## Notes

- Expo config is in `app.json`.
- TypeScript config is in `tsconfig.json`.
- Main branch tracks `origin/master`.
