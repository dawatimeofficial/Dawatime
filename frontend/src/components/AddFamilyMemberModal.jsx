import { useState } from 'react';
import './AddFamilyMemberModal.css';

export default function AddFamilyMemberModal({ onAdd, onClose }) {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && relation && phone) {
      onAdd(name, relation, phone);
      setName('');
      setRelation('');
      setPhone('');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">Add Family Member</h3>

        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label className="modal-label">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Mom, Dad, Grandma"
              required
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">Relation</label>
            <input
              type="text"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              placeholder="e.g., Mother, Father, Grandmother"
              required
            />
          </div>

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
            <button type="submit" className="btn btn-primary">
              Add Member
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
