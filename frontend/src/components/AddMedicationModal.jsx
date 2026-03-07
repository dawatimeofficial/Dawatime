import { useState } from 'react';
import './AddMedicationModal.css';

export default function AddMedicationModal({ onAdd, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '8',
    notes: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.dosage) {
      onAdd(formData);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3 className="modal-title">Add Medicine</h3>

        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label className="modal-label">Medicine Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Paracetamol"
              required
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">Dosage *</label>
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              placeholder="e.g., 500mg, 2 tablets"
              required
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">How Often</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            >
              <option value="4">Every 4 hours</option>
              <option value="6">Every 6 hours</option>
              <option value="8">Every 8 hours</option>
              <option value="12">Every 12 hours</option>
              <option value="24">Once daily</option>
            </select>
          </div>

          <div className="modal-field modal-field-last">
            <label className="modal-label">Notes (optional)</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g., Take with food, after meals"
              rows="2"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              Add Medicine
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
