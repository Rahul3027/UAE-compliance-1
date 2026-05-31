'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';

export type ThemePreference = 'light' | 'dark' | 'system';
export type LayoutDensityPreference = 'comfortable' | 'compact';
export type MotionPreference = 'default' | 'reduced';
export type FontSizePreference = 'sm' | 'md' | 'lg' | 'xl';

export interface UserPreferences {
  theme: ThemePreference;
  density: LayoutDensityPreference;
  motion: MotionPreference;
  fontSize: FontSizePreference;
}

export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  density: 'comfortable',
  motion: 'default',
  fontSize: 'md',
};

const STORAGE_KEY = 'uae-compliance-preferences';

interface PreferencesContextType {
  preferences: UserPreferences;
  updatePreference: <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => void;
  resetPreferences: () => void;
  isPreferencesOpen: boolean;
  setIsPreferencesOpen: (open: boolean) => void;
  openPreferences: () => void;
  closePreferences: () => void;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load preferences from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setPreferences({
          theme: parsed.theme || DEFAULT_PREFERENCES.theme,
          density: parsed.density || DEFAULT_PREFERENCES.density,
          motion: parsed.motion || DEFAULT_PREFERENCES.motion,
          fontSize: parsed.fontSize || DEFAULT_PREFERENCES.fontSize,
        });
      }
    } catch (e) {
      console.error('Error loading preferences from localStorage:', e);
    }
  }, []);

  // Update DOM attributes when preferences change
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    // Apply Theme
    const applyTheme = (theme: ThemePreference) => {
      let isDark = false;
      if (theme === 'system') {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      } else {
        isDark = theme === 'dark';
      }
      root.classList.toggle('dark', isDark);
      root.setAttribute('data-theme', theme);
    };

    applyTheme(preferences.theme);
    root.setAttribute('data-density', preferences.density);
    root.setAttribute('data-motion', preferences.motion);
    root.setAttribute('data-font-size', preferences.fontSize);

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    } catch (e) {
      console.error('Error saving preferences to localStorage:', e);
    }

    // Listener for system theme changes if theme is set to 'system'
    if (preferences.theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => {
        root.classList.toggle('dark', mediaQuery.matches);
      };
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      };
    }
  }, [preferences, mounted]);

  const updatePreference = <K extends keyof UserPreferences>(key: K, value: UserPreferences[K]) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
  };

  const openPreferences = () => setIsPreferencesOpen(true);
  const closePreferences = () => setIsPreferencesOpen(false);

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        updatePreference,
        resetPreferences,
        isPreferencesOpen,
        setIsPreferencesOpen,
        openPreferences,
        closePreferences,
      }}
    >
      <MotionConfig transition={preferences.motion === 'reduced' ? { duration: 0 } : undefined}>
        {children}
      </MotionConfig>
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
}

