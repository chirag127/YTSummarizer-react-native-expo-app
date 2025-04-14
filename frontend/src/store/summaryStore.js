import { create } from 'zustand';
import apiService from '../services/api';

const useSummaryStore = create((set, get) => ({
  // State
  summaries: [],
  currentSummary: null,
  isLoading: false,
  error: null,

  // Actions
  fetchSummaries: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.getUserSummaries();
      set({ 
        summaries: response.data.summaries,
        isLoading: false
      });
    } catch (error) {
      console.error('Fetch summaries error:', error.message);
      set({ 
        isLoading: false,
        error: error.message
      });
    }
  },

  fetchSummaryById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.getSummaryById(id);
      set({ 
        currentSummary: response.data.summary,
        isLoading: false
      });
      return response.data.summary;
    } catch (error) {
      console.error('Fetch summary error:', error.message);
      set({ 
        isLoading: false,
        error: error.message
      });
      return null;
    }
  },

  generateSummary: async (videoUrl, summaryType, summaryLength) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.generateSummary({
        videoUrl,
        summaryType,
        summaryLength
      });
      
      const newSummary = response.data.summary;
      
      // Update the summaries list and set current summary
      set((state) => ({ 
        summaries: [newSummary, ...state.summaries],
        currentSummary: newSummary,
        isLoading: false
      }));
      
      return newSummary;
    } catch (error) {
      console.error('Generate summary error:', error.message);
      set({ 
        isLoading: false,
        error: error.message
      });
      return null;
    }
  },

  updateSummary: async (id, videoUrl, summaryType, summaryLength) => {
    set({ isLoading: true, error: null });
    try {
      const response = await apiService.updateSummary(id, {
        videoUrl,
        summaryType,
        summaryLength
      });
      
      const updatedSummary = response.data.summary;
      
      // Update the summaries list and current summary
      set((state) => ({ 
        summaries: state.summaries.map(summary => 
          summary.id === id ? updatedSummary : summary
        ),
        currentSummary: state.currentSummary?.id === id ? updatedSummary : state.currentSummary,
        isLoading: false
      }));
      
      return updatedSummary;
    } catch (error) {
      console.error('Update summary error:', error.message);
      set({ 
        isLoading: false,
        error: error.message
      });
      return null;
    }
  },

  deleteSummary: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await apiService.deleteSummary(id);
      
      // Remove the summary from the list and clear current summary if it's the deleted one
      set((state) => ({ 
        summaries: state.summaries.filter(summary => summary.id !== id),
        currentSummary: state.currentSummary?.id === id ? null : state.currentSummary,
        isLoading: false
      }));
      
      return true;
    } catch (error) {
      console.error('Delete summary error:', error.message);
      set({ 
        isLoading: false,
        error: error.message
      });
      return false;
    }
  },

  setCurrentSummary: (summary) => {
    set({ currentSummary: summary });
  },

  clearCurrentSummary: () => {
    set({ currentSummary: null });
  },

  clearError: () => {
    set({ error: null });
  }
}));

export default useSummaryStore;
