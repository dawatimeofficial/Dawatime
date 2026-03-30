import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pill } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../api/index.js';
import { registerPushNotifications } from '../utils/pushNotifications.js';
import '../App.css';
import './Auth.css';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const { token, user: userData } = await apiLogin(email, password);

      // Save auth first
      login(token, userData);

      // 🔥 IMPORTANT: wait for push setup
      await registerPushNotifications();

      // Navigate after everything is ready
      navigate('/', { replace: true });

    } catch (err) {
      console.error('LOGIN ERROR:', err);
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-root auth-page">
      <div className="auth-card card">
        <div className="auth-header">
          <div className="auth-logo">
            <Pill size={32} color="white" strokeWidth={2.5} />
          </div>
          <h1 className="auth-title">DawaTime</h1>
          <p className="auth-tagline">{t('auth.signInTagline')}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="modal-field">
            <label className="modal-label">{t('auth.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="modal-field modal-field-last">
            <label className="modal-label">{t('auth.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <div className="modal-actions auth-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? t('auth.signingIn') : t('auth.signIn')}
            </button>
          </div>
        </form>

        <p className="auth-switch">
          {t('auth.noAccount')} <Link to="/register">{t('auth.register')}</Link>
        </p>
      </div>
    </div>
  );
}