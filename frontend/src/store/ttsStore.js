import { create } from 'zustand';
import ttsService from '../services/tts';

const useTTSStore = create((set, get) => ({
  // State
  speed: 1.0,
  pitch: 1.0,
  voice: null,
  availableVoices: [],
  isSpeaking: false,
  currentText: null,

  // Actions
  initialize: async () => {
    try {
      // Load settings from TTS service
      await ttsService.loadSettings();
      const settings = ttsService.getSettings();
      
      // Get available voices
      const voices = await ttsService.getAvailableVoices();
      
      set({ 
        speed: settings.speed,
        pitch: settings.pitch,
        voice: settings.voice,
        availableVoices: voices
      });
    } catch (error) {
      console.error('TTS initialization error:', error.message);
    }
  },

  setSpeed: async (speed) => {
    try {
      await ttsService.setSpeed(speed);
      set({ speed });
    } catch (error) {
      console.error('Set speed error:', error.message);
    }
  },

  setPitch: async (pitch) => {
    try {
      await ttsService.setPitch(pitch);
      set({ pitch });
    } catch (error) {
      console.error('Set pitch error:', error.message);
    }
  },

  setVoice: async (voice) => {
    try {
      await ttsService.setVoice(voice);
      set({ voice });
    } catch (error) {
      console.error('Set voice error:', error.message);
    }
  },

  speak: async (text) => {
    try {
      set({ isSpeaking: true, currentText: text });
      await ttsService.speak(text);
    } catch (error) {
      console.error('Speak error:', error.message);
      set({ isSpeaking: false });
    }
  },

  stop: async () => {
    try {
      await ttsService.stop();
      set({ isSpeaking: false, currentText: null });
    } catch (error) {
      console.error('Stop speaking error:', error.message);
    }
  },

  refreshVoices: async () => {
    try {
      const voices = await ttsService.getAvailableVoices();
      set({ availableVoices: voices });
      return voices;
    } catch (error) {
      console.error('Refresh voices error:', error.message);
      return [];
    }
  }
}));

export default useTTSStore;
