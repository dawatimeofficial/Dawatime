import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { StatusBar, Style } from '@capacitor/status-bar';
import { updateThemePreference, getToken } from '../api';

const THEME_KEY = 'dawatime_theme';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('system');
  const [isLoaded, setIsLoaded] = useState(false);

  const getEffectiveTheme = useCallback((themePreference) => {
    if (themePreference === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return themePreference;
  }, []);

  const applyTheme = useCallback((effectiveTheme) => {
    document.documentElement.setAttribute('data-theme', effectiveTheme);

    if (window.Capacitor?.isNativePlatform) {
      StatusBar.setStyle({
        style: effectiveTheme === 'dark' ? Style.Dark : Style.Light,
      });
      StatusBar.setBackgroundColor({
        color: effectiveTheme === 'dark' ? '#121212' : '#ffffff',
      });
    }
  }, []);

  const syncToBackend = useCallback(async (themePreference) => {
    try {
      if (getToken()) {
        await updateThemePreference(themePreference);
      }
    } catch (error) {
      console.warn('Failed to sync theme to backend:', error);
    }
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    const initialTheme = stored || 'system';
    setTheme(initialTheme);
    applyTheme(getEffectiveTheme(initialTheme));
    setIsLoaded(true);
  }, [applyTheme, getEffectiveTheme]);

  useEffect(() => {
    if (!isLoaded) return;

    document.documentElement.classList.remove('no-transition');
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(getEffectiveTheme(theme));
    syncToBackend(theme);
  }, [theme, isLoaded, applyTheme, getEffectiveTheme, syncToBackend]);

  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e) => {
      applyTheme('dark');
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme, applyTheme]);

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