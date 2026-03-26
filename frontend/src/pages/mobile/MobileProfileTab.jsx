import { User, Phone, LogOut, Heart, Phone as PhoneIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import MobileEmergency from '../../components/mobile/MobileEmergency';
import './MobileProfileTab.css';

export default function MobileProfileTab() {
  const { user, logout } = useAuth();

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
            <span>Phone Number</span>
            <span className="mobile-profile-value">{user?.phone}</span>
          </div>
        </div>
      </div>

      <div className="mobile-profile-section">
        <h3 className="mobile-profile-section-title">About</h3>
        <div className="mobile-profile-card">
          <div className="mobile-profile-item about">
            <Heart size={20} />
            <div>
              <p className="mobile-profile-about-title">DawaTime</p>
              <p className="mobile-profile-about-desc">Medicine reminders made simple</p>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mobile-logout-btn"
        onClick={logout}
      >
        <LogOut size={20} />
        Sign Out
      </button>

      <MobileEmergency onClick={() => {
        window.location.href = 'tel:108';
      }} />
    </div>
  );
}
