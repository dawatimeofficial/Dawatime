import { User, Phone, LogOut, Heart, Phone as PhoneIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import MobileEmergency from '../../components/mobile/MobileEmergency';
import ThemeToggle from '../../components/ThemeToggle';
import './MobileProfileTab.css';

export default function MobileProfileTab() {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();

  return (
    <div className="mobile-profile">
      <div className="mobile-profile-header">
        <div className="mobile-profile-avatar">
          <User size={40} />
        </div>
        <h2 className="mobile-profile-name">{user?.name}</h2>
        <p className="mobile-profile-phone">{user?.phone}</p>
      </div>

      <div className="mobile-profile-section">
        <div className="mobile-profile-card">
          <div className="mobile-profile-item">
            <Phone size={20} />
            <span>{t('auth.phone')}</span>
            <span className="mobile-profile-value">{user?.phone}</span>
          </div>
        </div>
      </div>

      <div className="mobile-profile-section">
        <h3 className="mobile-profile-section-title">{t('profile.about')}</h3>
        <div className="mobile-profile-card">
          <div className="mobile-profile-item about">
            <Heart size={20} />
            <div>
              <p className="mobile-profile-about-title">DawaTime</p>
              <p className="mobile-profile-about-desc">{t('header.tagline')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mobile-profile-section">
        <h3 className="mobile-profile-section-title">{t('profile.appearance')}</h3>
        <div className="mobile-profile-card">
          <ThemeToggle />
        </div>
        
        <div className="mobile-profile-card" style={{ marginTop: '10px' }}>
          <div className="mobile-profile-item">
            <span style={{ fontWeight: '500' }}>🌍 Language</span>
            <select 
              onChange={(e) => i18n.changeLanguage(e.target.value)}
              value={i18n.language || localStorage.getItem('i18nextLng') || 'en'}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-color)',
                fontSize: '16px',
                fontWeight: '600',
                outline: 'none',
              }}
            >
              <option value="en" style={{ color: '#000' }}>English</option>
              <option value="hi" style={{ color: '#000' }}>हिन्दी (Hindi)</option>
              <option value="mr" style={{ color: '#000' }}>मराठी (Marathi)</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mobile-logout-btn"
        onClick={logout}
      >
        <LogOut size={20} />
        {t('header.signOut')}
      </button>

      <MobileEmergency onClick={() => {
        window.location.href = 'tel:108';
      }} />
    </div>
  );
}
