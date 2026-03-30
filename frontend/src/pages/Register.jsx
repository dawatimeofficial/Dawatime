import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Pill } from 'lucide-react';
import { register } from '../api/index.js';
import '../App.css';
import './Auth.css';

export default function Register() {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register({ name, email, phone, password });
      navigate('/login', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed');
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
          <p className="auth-tagline">{t('auth.createAccount')}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          <div className="modal-field">
            <label className="modal-label">{t('auth.name')}</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>

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

          <div className="modal-field">
            <label className="modal-label">{t('auth.phone')}</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g., +91XXXXXXXXXX"
              required
              autoComplete="tel"
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
              {submitting ? t('auth.creatingAccount') : t('auth.register')}
            </button>
          </div>
        </form>

        <p className="auth-switch">
          {t('auth.haveAccount')} <Link to="/login">{t('auth.login')}</Link>
        </p>
      </div>
    </div>
  );
}
