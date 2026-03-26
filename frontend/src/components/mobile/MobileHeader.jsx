import { Pill, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './MobileHeader.css';

export default function MobileHeader() {
  const { user, logout } = useAuth();

  return (
    <header className="mobile-header">
      <div className="mobile-header-brand">
        <Pill size={24} color="white" strokeWidth={2.5} />
        <span className="mobile-header-title">DawaTime</span>
      </div>
      <div className="mobile-header-actions">
        {user && (
          <>
            <span className="mobile-header-user">{user.name}</span>
            <button
              type="button"
              className="mobile-header-btn"
              onClick={logout}
              title="Sign out"
            >
              <LogOut size={20} />
            </button>
          </>
        )}
      </div>
    </header>
  );
}
