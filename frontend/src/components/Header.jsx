import { Pill, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <div className="header">
      <div className="header-brand">
        <div className="header-logo">
          <Pill size={28} color="white" strokeWidth={2.5} />
        </div>
        <h1 className="header-title">DawaTime</h1>
      </div>
      <p className="header-tagline">Medicine reminders made simple 💊</p>
      <p className="header-support">
        Support:{' '}
        <a href="mailto:dawatime.official@gmail.com">dawatime.official@gmail.com</a>
      </p>
      {user && (
        <div className="header-user">
          <span className="header-user-name">{user.name}</span>
          <button
            type="button"
            className="header-logout btn btn-secondary"
            onClick={logout}
            title="Sign out"
          >
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
