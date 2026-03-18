import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pill } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { sendOtp, verifyOtp } from '../api/index.js';
import '../App.css';
import './Auth.css';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // phone | otp
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (step === 'phone') {
        await sendOtp(phone);
        setStep('otp');
        return;
      }
      const { token, user: userData } = await verifyOtp(phone, otp);
      login(token, userData);
      navigate('/', { replace: true });
    } catch (err) {
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
          <p className="auth-tagline">
            {step === 'phone' ? 'Sign in with your phone number' : 'Enter the OTP sent to your email'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="auth-error">{error}</div>}

          {step === 'phone' ? (
            <div className="modal-field modal-field-last">
              <label className="modal-label">Mobile Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g., +91XXXXXXXXXX"
                required
                autoComplete="tel"
              />
            </div>
          ) : (
            <>
              <div className="modal-field">
                <label className="modal-label">Mobile Number</label>
                <input type="tel" value={phone} disabled />
              </div>
              <div className="modal-field modal-field-last">
                <label className="modal-label">OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  required
                  inputMode="numeric"
                />
              </div>
            </>
          )}

          <div className="modal-actions auth-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting
                ? step === 'phone'
                  ? 'Sending...'
                  : 'Verifying...'
                : step === 'phone'
                ? 'Send OTP'
                : 'Verify OTP'}
            </button>
          </div>
        </form>

        {step === 'otp' ? (
          <p className="auth-switch">
            Wrong number?{' '}
            <Link
              to="#"
              onClick={(e) => {
                e.preventDefault();
                setStep('phone');
                setOtp('');
                setError('');
              }}
            >
              Change phone
            </Link>
          </p>
        ) : (
          <p className="auth-switch">
            Don&apos;t have an account? <Link to="/register">Register</Link>
          </p>
        )}
      </div>
    </div>
  );
}
