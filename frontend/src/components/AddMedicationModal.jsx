import { useState } from 'react';
import './AddMedicationModal.css';

export default function AddMedicationModal({ familyMembers = [], onAdd, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    frequency: '8',
    scheduleTime: '08:00',
    notes: '',
    familyMemberIds: [],
  });

  const handleCheckboxChange = (id) => {
    setFormData((prev) => {
      if (prev.familyMemberIds.includes(id)) {
        return { ...prev, familyMemberIds: prev.familyMemberIds.filter((m) => m !== id) };
      }
      return { ...prev, familyMemberIds: [...prev.familyMemberIds, id] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.dosage && formData.scheduleTime) {
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
            <label className="modal-label">Schedule Time * (HH:mm)</label>
            <input
              type="time"
              value={formData.scheduleTime}
              onChange={(e) => setFormData({ ...formData, scheduleTime: e.target.value })}
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
          
          {familyMembers.length > 0 && (
            <div className="modal-field">
              <label className="modal-label">Assign to Family Members</label>
              <div className="checkbox-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {familyMembers.map((member) => (
                  <label key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.familyMemberIds.includes(member.id)}
                      onChange={() => handleCheckboxChange(member.id)}
                    />
                    {member.name} ({member.relation})
                  </label>
                ))}
              </div>
            </div>
          )}

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
