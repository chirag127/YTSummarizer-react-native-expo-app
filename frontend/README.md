# VidSummify Frontend

This is the frontend for the VidSummify application, built with React Native Expo.

## Features

- Cross-platform (iOS, Android, Web PWA)
- User authentication with Supabase
- YouTube video summarization
- Text-to-speech functionality
- Summary history management
- Customizable summary types and lengths

## Project Structure

```
frontend/
├── assets/             # App assets (icons, splash screen)
├── scripts/            # Utility scripts
├── src/
│   ├── components/     # Reusable UI components
│   ├── screens/        # App screens
│   │   ├── auth/       # Authentication screens
│   │   └── main/       # Main app screens
│   ├── navigation/     # Navigation configuration
│   ├── services/       # API and service integrations
│   ├── store/          # State management (Zustand)
│   ├── utils/          # Utility functions
│   └── hooks/          # Custom React hooks
├── App.js              # Main app component
├── app.json            # Expo configuration
└── package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Expo CLI

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   API_URL=http://localhost:5000/api
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Running the App

1. Start the development server:
   ```
   npm start
   ```

2. Follow the Expo CLI instructions to run the app on your preferred platform (iOS, Android, or web).

### Building Icons

The app includes custom icons. To regenerate them:

1. Edit the SVG file in `assets/icon.svg`
2. Run the icon generation script:
   ```
   npm run generate-icons
   ```

## Dependencies

- React Native Expo
- React Navigation
- Supabase JS Client
- Expo Speech (TTS)
- React Native Paper (UI)
- Zustand (State Management)
- React Native Markdown Display

## Scripts

- `npm start`: Start the Expo development server
- `npm run android`: Start the app on Android
- `npm run ios`: Start the app on iOS
- `npm run web`: Start the app on web
- `npm run generate-icons`: Generate app icons from SVG
