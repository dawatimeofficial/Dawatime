import { useState } from 'react';
import { Pill, Check, Trash2, Clock } from 'lucide-react';
import AddMedicationModal from '../../components/AddMedicationModal';
import './MobileRemindersTab.css';

export default function MobileRemindersTab({
  todaysMeds,
  getUpcomingDose,
  isDueNow,
  markTaken,
  deleteMedication,
  showAddMed,
  setShowAddMed,
  addMedication,
}) {
  const [takingId, setTakingId] = useState(null);

  const handleTake = (medId) => {
    setTakingId(medId);
    setTimeout(() => {
      markTaken(medId);
      setTakingId(null);
    }, 300);
  };

  return (
    <div className="mobile-reminders">
      {todaysMeds.length === 0 ? (
        <div className="mobile-empty fade-in">
          <div className="mobile-empty-icon">
            <Pill size={48} color="#FF9800" strokeWidth={1.5} />
          </div>
          <p className="mobile-empty-title">No medications yet</p>
          <p className="mobile-empty-desc">Tap + to add your first medicine</p>
        </div>
      ) : (
        <div className="mobile-med-list">
          {todaysMeds.map((med, index) => {
            const due = isDueNow(med);
            const nextDose = getUpcomingDose(med);
            const isTaking = takingId === med.id;
            
            return (
              <div 
                key={med.id} 
                className={`mobile-med-card ${due ? 'due' : ''} ${isTaking ? 'med-success' : ''}`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="mobile-med-info">
                  <h3 className="mobile-med-name">{med.name}</h3>
                  <p className="mobile-med-dosage">{med.dosage} • Every {med.frequency}h</p>
                  <div className="mobile-med-time">
                    <Clock size={14} />
                    <span>{nextDose}</span>
                  </div>
                </div>
                <div className="mobile-med-actions">
                  <button
                    type="button"
                    className="mobile-med-btn-take mobile-scale-click"
                    onClick={() => handleTake(med.id)}
                    disabled={isTaking}
                  >
                    <Check size={20} />
                    {isTaking ? 'Taken!' : 'Take'}
                  </button>
                  <button
                    type="button"
                    className="mobile-med-btn-delete mobile-scale-click"
                    onClick={() => {
                      if (confirm('Delete this medication?')) {
                        deleteMedication(med.id);
                      }
                    }}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            );
          })}
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
