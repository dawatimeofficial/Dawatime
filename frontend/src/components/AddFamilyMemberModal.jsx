import { useState } from 'react';
import './AddFamilyMemberModal.css';

export default function AddFamilyMemberModal({ onAdd, onClose }) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setError('');
    setSubmitting(true);
    try {
      await onAdd(phone.trim());
    } catch (err) {
      setError(err.message || 'Failed to add family member');
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">Add Family Member</h3>
        <p style={{ color: '#aaa', fontSize: '0.85rem', marginBottom: '16px' }}>
          Enter the phone number of a registered DawaTime user.
        </p>

        <form onSubmit={handleSubmit}>
          {error && <div className="auth-error" style={{ marginBottom: '12px' }}>{error}</div>}

          <div className="modal-field modal-field-last">
            <label className="modal-label">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g., +91XXXXXXXXXX"
              required
              autoComplete="tel"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Member'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
