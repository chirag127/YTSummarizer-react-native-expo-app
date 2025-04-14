# VidSummify Backend

This is the backend API for the VidSummify application, built with Node.js and Express.js.

## Features

- YouTube video processing with ytdlp-nodejs
- AI-powered summarization with Google's Gemini 2.0 Flash-Lite model
- User authentication with Supabase
- RESTful API endpoints for summary generation and management

## Project Structure

```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Express middleware
│   ├── routes/         # API routes
│   ├── services/       # Business logic
│   ├── utils/          # Utility functions
│   └── index.js        # Main application file
├── .env                # Environment variables
└── package.json        # Dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Supabase account
- Google AI API key (for Gemini)

### Installation

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_key
   SUPABASE_SERVICE_KEY=your_supabase_service_key
   GEMINI_API_KEY=your_gemini_api_key
   CORS_ORIGIN=http://localhost:19006
   ```

### Running the Server

1. Start the development server:
   ```
   npm run dev
   ```

2. For production:
   ```
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `POST /api/auth/logout`: Logout a user
- `POST /api/auth/reset-password`: Send password reset email

### Summaries

- `POST /api/summaries`: Generate a new summary
- `GET /api/summaries`: Get all summaries for the current user
- `GET /api/summaries/:id`: Get a specific summary by ID
- `PUT /api/summaries/:id`: Update a summary
- `DELETE /api/summaries/:id`: Delete a summary

## Dependencies

- Express.js
- ytdlp-nodejs
- Google Generative AI SDK
- Supabase JS Client
- CORS, dotenv, helmet, morgan

## Scripts

- `npm start`: Start the server
- `npm run dev`: Start the server with nodemon for development
