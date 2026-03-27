import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle({ variant = 'full' }) {
  const { theme, effectiveTheme, toggleTheme, setTheme } = useTheme();

  const cycleTheme = () => {
    const next = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
    setTheme(next);
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        className="theme-toggle-icon"
        onClick={cycleTheme}
        aria-label="Toggle theme"
      >
        {effectiveTheme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    );
  }

  return (
    <div className="theme-toggle">
      <button
        type="button"
        className={`theme-option ${theme === 'light' ? 'active' : ''}`}
        onClick={() => setTheme('light')}
        aria-label="Light mode"
      >
        <Sun size={16} />
        <span>Light</span>
      </button>
      <button
        type="button"
        className={`theme-option ${theme === 'system' ? 'active' : ''}`}
        onClick={() => setTheme('system')}
        aria-label="System mode"
      >
        <Monitor size={16} />
        <span>System</span>
      </button>
      <button
        type="button"
        className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
        onClick={() => setTheme('dark')}
        aria-label="Dark mode"
      >
        <Moon size={16} />
        <span>Dark</span>
      </button>
    </div>
  );
}