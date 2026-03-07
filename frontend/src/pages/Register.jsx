import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pill } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { register as apiRegister } from '../api';
import '../App.css';
import './Auth.css';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateName(name) {
  const t = name.trim();
  if (!t) return 'Name is required';
  if (t.length < 3) return 'Name must be at least 3 characters';
  return '';
}

function validateEmail(email) {
  const t = email.trim();
  if (!t) return 'Email is required';
  if (!EMAIL_REGEX.test(t)) return 'Invalid email format';
  return '';
}

function validatePassword(password) {
  if (!password) return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  if (!/\d/.test(password)) return 'Password must contain at least one number';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  return '';
}

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });
  const [generalError, setGeneralError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const runValidation = () => {
    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setErrors({ name: nameErr, email: emailErr, password: passwordErr });
    return !nameErr && !emailErr && !passwordErr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGeneralError('');
    setErrors({ name: '', email: '', password: '' });

    if (!runValidation()) return;

    setSubmitting(true);
    try {
      const { token, user: userData } = await apiRegister({ name: name.trim(), email: email.trim(), password });
      login(token, userData);
      navigate('/', { replace: true });
    } catch (err) {
      if (err.errors && typeof err.errors === 'object') {
        setErrors({
          name: err.errors.name || '',
          email: err.errors.email || '',
          password: err.errors.password || '',
        });
        setGeneralError('');
      } else if (err.message === 'Email already registered') {
        setErrors((prev) => ({ ...prev, email: 'Email already registered' }));
        setGeneralError('');
      } else {
        setGeneralError(err.message || 'Registration failed');
      }
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
          <p className="auth-tagline">Create your account</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {generalError && <div className="auth-error">{generalError}</div>}
          <div className="modal-field">
            <label className="modal-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors((prev) => ({ ...prev, name: validateName(e.target.value) }));
              }}
              placeholder="Your name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <span id="name-error" className="auth-field-error">{errors.name}</span>}
          </div>
          <div className="modal-field">
            <label className="modal-label">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
              }}
              placeholder="you@example.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <span id="email-error" className="auth-field-error">{errors.email}</span>}
          </div>
          <div className="modal-field modal-field-last">
            <label className="modal-label">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errors.password) setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
              }}
              placeholder="At least 8 characters, one number, one uppercase"
              autoComplete="new-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
            />
            {errors.password && <span id="password-error" className="auth-field-error">{errors.password}</span>}
          </div>
          <div className="modal-actions auth-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Creating account...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
