# VidSummify - YouTube Video Summarizer

VidSummify is a cross-platform application (iOS, Android, Web PWA) built with React Native Expo. Its primary purpose is to allow users to generate concise summaries of YouTube videos using Google's Gemini 2.0 Flash-Lite model. Users can input video links via pasting or sharing directly from the YouTube app. Summaries are stored securely using Supabase, which also handles user authentication. The app features integrated text-to-speech (TTS) functionality with customizable speed, pitch, and voice settings, allowing users to listen to summaries.

## Features

- **AI-Powered Summaries**: Generate concise summaries of YouTube videos using Google's Gemini 2.0 Flash-Lite model.
- **Multiple Summary Types**: Choose between Brief, Detailed, or Key Point summaries.
- **Customizable Length**: Select Short, Medium, or Long summary lengths.
- **Text-to-Speech**: Listen to summaries with adjustable speed (up to 16x), pitch, and voice selection.
- **Secure Authentication**: Sign in with email/password or Google OAuth via Supabase.
- **History Management**: View, filter, and manage your summary history.
- **Share Summaries**: Easily share summaries with others.
- **Cross-Platform**: Works on iOS, Android, and Web (as a PWA).

## Project Structure

The project is organized into two main directories:

```
/
├── frontend/  (React Native Expo App)
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── navigation/
│   │   ├── services/
│   │   ├── store/
│   │   ├── utils/
│   │   └── hooks/
│   ├── assets/
│   ├── scripts/
│   ├── app.json
│   └── package.json
├── backend/   (Express.js API)
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── utils/
│   ├── .env
│   └── package.json
└── README.md
```

## Technologies Used

### Frontend
- React Native Expo
- React Navigation
- Supabase JS Client
- Expo Speech (TTS)
- React Native Paper (UI)
- Zustand (State Management)

### Backend
- Node.js + Express.js
- ytdlp-nodejs (YouTube processing)
- Google Generative AI SDK (Gemini)
- Supabase JS Client

### Database & Authentication
- Supabase (PostgreSQL + Auth)

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Expo CLI
- Supabase account
- Google AI API key (for Gemini)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/chirag127/YTSummarizer-react-native-expo-app.git
   cd YTSummarizer-react-native-expo-app
   ```

2. Set up the backend:
   ```
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   GEMINI_API_KEY=your_gemini_api_key
   CORS_ORIGIN=http://localhost:19006
   ```

4. Set up the frontend:
   ```
   cd ../frontend
   npm install
   ```

5. Create a `.env` file in the frontend directory with the following variables:
   ```
   API_URL=http://localhost:5000/api
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend:
   ```
   cd frontend
   npm start
   ```

3. Follow the Expo CLI instructions to run the app on your preferred platform (iOS, Android, or web).

## Supabase Setup

1. Create a new Supabase project.
2. Set up authentication (email/password and Google OAuth).
3. Create the following table:

```sql
CREATE TABLE summaries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  video_url TEXT NOT NULL,
  video_title TEXT,
  video_thumbnail_url TEXT,
  summary_text TEXT NOT NULL,
  summary_type TEXT CHECK (summary_type IN ('Brief', 'Detailed', 'Key Point')) NOT NULL,
  summary_length TEXT CHECK (summary_length IN ('Short', 'Medium', 'Long')) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE summaries ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own summaries" 
  ON summaries FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own summaries" 
  ON summaries FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own summaries" 
  ON summaries FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own summaries" 
  ON summaries FOR DELETE 
  USING (auth.uid() = user_id);
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini AI for the summarization capabilities
- Supabase for authentication and database services
- Expo team for the amazing React Native development experience
