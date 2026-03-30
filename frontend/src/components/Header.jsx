import { Pill, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { Capacitor } from '@capacitor/core';
import ThemeToggle from './ThemeToggle';
import './Header.css';

export default function Header() {
  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const isNative = Capacitor.isNativePlatform();

  return (
    <div className="header">

      {/* 🔥 Download button (ONLY on website) */}
      {!isNative && (
        <a
          href="https://drive.google.com/file/d/1mu5bjaXd34sq4kbcCSLt8sCn-m6rcZzv/view?usp=sharing" // 🔁 replace this
          className="download-btn"
        >
          ⬇ {t('header.getApp')}
        </a>
      )}

      <div className="header-brand">
        <div className="header-logo">
          <Pill size={28} color="white" strokeWidth={2.5} />
        </div>
        <h1 className="header-title">DawaTime</h1>
      </div>

      <div className="header-theme-toggle">
        <ThemeToggle variant="icon" />
      </div>

      <p className="header-tagline">{t('header.tagline')}</p>

      <p className="header-support">
        {t('header.support')}:{' '}
        <a href="mailto:dawatime.official@gmail.com">
          dawatime.official@gmail.com
        </a>
      </p>

      {user && (
        <div className="header-user">
          <span className="header-user-name">{user.name}</span>
          <button
            type="button"
            className="header-logout btn btn-secondary"
            onClick={logout}
            title={t('header.signOut')}
          >
            <LogOut size={18} />
            {t('header.signOut')}
          </button>
        </div>
      )}
    </div>
  );
}