import { useState } from 'react';
import './AddFamilyMemberModal.css';

export default function AddFamilyMemberModal({ onAdd, onClose }) {
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && relation) {
      onAdd(name, relation);
      setName('');
      setRelation('');
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

          <div className="modal-field modal-field-last">
            <label className="modal-label">Relation</label>
            <input
              type="text"
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              placeholder="e.g., Mother, Father, Grandmother"
              required
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
