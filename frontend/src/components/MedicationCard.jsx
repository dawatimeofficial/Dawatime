import { Check, Clock, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './MedicationCard.css';

export default function MedicationCard({ med, due, nextDose, onMarkTaken, onDelete }) {
  const { t } = useTranslation();
  return (
    <div className={`med-card ${due ? 'due' : ''}`}>
      <div className="med-card-row">
        <div className="med-card-main">
          <div className="med-card-title-row">
            <h3 className="med-card-title">{med.name}</h3>
            {due && <span className="med-card-due-badge">{t('reminders.dueNow')}</span>}
          </div>
          <p className="med-card-dosage">
            {med.dosage} • {t('time.everyHours', { hours: med.frequency })}
          </p>
          <div className={`med-card-next ${due ? 'due' : 'normal'}`}>
            <Clock size={15} />
            {nextDose}
          </div>
        </div>
        <div className="med-card-actions">
          <button
            onClick={() => onMarkTaken(med.id)}
            className={`btn-mark ${due ? 'due' : 'normal'}`}
            title={t('reminders.markAsTaken')}
          >
            <Check size={20} strokeWidth={3} />
          </button>
          <button
            onClick={() => onDelete(med.id)}
            className="btn-delete"
            title={t('reminders.delete')}
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
      {med.notes && (
        <p className="med-card-notes">💡 {med.notes}</p>
      )}
    </div>
  );
}
