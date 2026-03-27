import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Capacitor } from '@capacitor/core';
import { updateThemePreference, getToken } from '../api';

const THEME_KEY = 'dawatime_theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // ✅ Get effective theme
  const getEffectiveTheme = useCallback((themePreference) => {
    if (themePreference === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return themePreference;
  }, []);

  // ✅ Apply theme safely (NO direct Capacitor import)
  const applyTheme = useCallback(async (effectiveTheme) => {
    document.documentElement.setAttribute('data-theme', effectiveTheme);

    // 🔥 SAFE Capacitor usage (fixes Vercel crash)
    if (Capacitor.isNativePlatform()) {
      try {
        const { StatusBar, Style } = await import('@capacitor/status-bar');

        await StatusBar.setStyle({
          style: effectiveTheme === 'dark' ? Style.Dark : Style.Light,
        });

        await StatusBar.setBackgroundColor({
          color: effectiveTheme === 'dark' ? '#121212' : '#ffffff',
        });
      } catch (err) {
        console.warn('StatusBar not available:', err);
      }
    }
  }, []);

  // ✅ Sync with backend
  const syncToBackend = useCallback(async (themePreference) => {
    try {
      if (getToken()) {
        await updateThemePreference(themePreference);
      }
    } catch (error) {
      console.warn('Failed to sync theme to backend:', error);
    }
  }, []);

  // ✅ Initial load
  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    const initialTheme = stored || 'system';

    setTheme(initialTheme);
    applyTheme(getEffectiveTheme(initialTheme));
    setIsLoaded(true);
  }, [applyTheme, getEffectiveTheme]);

  // ✅ On theme change
  useEffect(() => {
    if (!isLoaded) return;

    document.documentElement.classList.remove('no-transition');
    localStorage.setItem(THEME_KEY, theme);

    applyTheme(getEffectiveTheme(theme));
    syncToBackend(theme);
  }, [theme, isLoaded, applyTheme, getEffectiveTheme, syncToBackend]);

  // ✅ System theme listener (FIXED bug here)
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handler = (e) => {
      applyTheme(e.matches ? 'dark' : 'light'); // 🔥 FIXED (was always dark)
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme, applyTheme]);

  // ✅ Toggle theme
  const toggleTheme = useCallback((newTheme) => {
    if (newTheme) {
      setTheme(newTheme);
    } else {
      setTheme((prev) => {
        const current = prev === 'system'
          ? getEffectiveTheme(prev)
          : prev;

        return current === 'dark' ? 'light' : 'dark';
      });
    }
  }, [getEffectiveTheme]);

  const value = {
    theme,
    effectiveTheme: getEffectiveTheme(theme),
    toggleTheme,
    setTheme,
    isLoaded,
  };

  return (
    <ThemeContext.Provider value={value}>
      <div className={isLoaded ? '' : 'no-transition'}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}