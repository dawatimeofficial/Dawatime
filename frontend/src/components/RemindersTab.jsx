import { Pill, Plus } from 'lucide-react';
import MedicationCard from './MedicationCard';
import AddMedicationModal from './AddMedicationModal';
import { useTranslation } from 'react-i18next';
import './RemindersTab.css';

export default function RemindersTab({
  todaysMeds,
  getUpcomingDose,
  isDueNow,
  markTaken,
  deleteMedication,
  showAddMed,
  setShowAddMed,
  addMedication,
}) {
  const { t } = useTranslation();
  return (
    <div className="card">

      <div className="schedule-header">
        <h2 className="schedule-title">Today's Schedule</h2>
        <button className="btn btn-primary" onClick={() => setShowAddMed(true)}>
          <Plus size={18} className="btn-icon" />
          Add
        </button>
      </div>

      {todaysMeds.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon-wrap">
            <Pill size={40} color="#FFB199" strokeWidth={2} />
          </div>
          <p className="empty-title">{t('reminders.emptyTitle')}</p>
          <p className="empty-desc">{t('reminders.emptyDesc')}</p>
        </div>
      ) : (
        <div className="med-list">
          {todaysMeds.map((med) => (
            <MedicationCard
              key={med.id}
              med={med}
              due={isDueNow(med)}
              nextDose={getUpcomingDose(med)}
              onMarkTaken={markTaken}
              onDelete={deleteMedication}
            />
          ))}
        </div>
      )}

      {showAddMed && (
        <AddMedicationModal
          onAdd={addMedication}
          onClose={() => setShowAddMed(false)}
        />
      )}
    </div>
  );
}