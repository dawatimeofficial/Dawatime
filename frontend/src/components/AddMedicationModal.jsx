import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AddMedicationModal.css';

export default function AddMedicationModal({ familyMembers = [], onAdd, onClose }) {
  const { t } = useTranslation();
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
        <h3 className="modal-title">{t('modals.addMedicine')}</h3>

        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label className="modal-label">{t('modals.medName')}</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder={t('modals.medNamePh')}
              required
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">{t('modals.dosage')}</label>
            <input
              type="text"
              value={formData.dosage}
              onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
              placeholder={t('modals.dosagePh')}
              required
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">{t('modals.scheduleTime')}</label>
            <input
              type="time"
              value={formData.scheduleTime}
              onChange={(e) => setFormData({ ...formData, scheduleTime: e.target.value })}
              required
            />
          </div>

          <div className="modal-field">
            <label className="modal-label">{t('modals.howOften')}</label>
            <select
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
            >
              <option value="4">{t('modals.every4')}</option>
              <option value="6">{t('modals.every6')}</option>
              <option value="8">{t('modals.every8')}</option>
              <option value="12">{t('modals.every12')}</option>
              <option value="24">{t('modals.onceDaily')}</option>
            </select>
          </div>
          
          {familyMembers.length > 0 && (
            <div className="modal-field">
              <label className="modal-label">{t('modals.assignFamily')}</label>
              <div className="checkbox-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {familyMembers.map((member) => (
                  <label key={member.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.familyMemberIds.includes(member.id)}
                      onChange={() => handleCheckboxChange(member.id)}
                    />
                    {member.name} ({member.phone})
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="modal-field modal-field-last">
            <label className="modal-label">{t('modals.notes')}</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder={t('modals.notesPh')}
              rows="2"
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              {t('modals.addMedicine')}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              {t('modals.cancel')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
