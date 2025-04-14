import { create } from 'zustand';
import { supabase } from '../services/supabase';

const useAuthStore = create((set, get) => ({
  // State
  user: null,
  session: null,
  isLoading: true,
  error: null,

  // Actions
  initialize: async () => {
    set({ isLoading: true, error: null });
    try {
      // Get the current session
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }

      if (data?.session) {
        set({ 
          user: data.session.user,
          session: data.session,
          isLoading: false
        });
      } else {
        set({ 
          user: null,
          session: null,
          isLoading: false
        });
      }

      // Set up auth state change listener
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          set({ 
            user: session.user,
            session: session,
            isLoading: false
          });
        } else if (event === 'SIGNED_OUT') {
          set({ 
            user: null,
            session: null,
            isLoading: false
          });
        }
      });
    } catch (error) {
      console.error('Auth initialization error:', error.message);
      set({ 
        user: null,
        session: null,
        isLoading: false,
        error: error.message
      });
    }
  },

  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      set({ 
        isLoading: false,
        user: data.user,
        session: data.session
      });
      
      return { success: true };
    } catch (error) {
      console.error('Sign up error:', error.message);
      set({ 
        isLoading: false,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  },

  signIn: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      set({ 
        isLoading: false,
        user: data.user,
        session: data.session
      });
      
      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error.message);
      set({ 
        isLoading: false,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  },

  signInWithGoogle: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      });

      if (error) {
        throw error;
      }

      // Note: The actual user and session will be set by the onAuthStateChange listener
      set({ isLoading: false });
      
      return { success: true };
    } catch (error) {
      console.error('Google sign in error:', error.message);
      set({ 
        isLoading: false,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      set({ 
        isLoading: false,
        user: null,
        session: null
      });
      
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error.message);
      set({ 
        isLoading: false,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  },

  resetPassword: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'yourapp://reset-password',
      });

      if (error) {
        throw error;
      }

      set({ isLoading: false });
      
      return { success: true };
    } catch (error) {
      console.error('Reset password error:', error.message);
      set({ 
        isLoading: false,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  },

  updatePassword: async (password) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      set({ isLoading: false });
      
      return { success: true };
    } catch (error) {
      console.error('Update password error:', error.message);
      set({ 
        isLoading: false,
        error: error.message
      });
      return { success: false, error: error.message };
    }
  },

  // Getters
  isAuthenticated: () => !!get().user,
  getUser: () => get().user,
  getSession: () => get().session,
}));

export default useAuthStore;
