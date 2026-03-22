import { Pill, Plus } from 'lucide-react';
import MedicationCard from './MedicationCard';
import AddMedicationModal from './AddMedicationModal';
import './RemindersTab.css';

export default function RemindersTab({
  selectedMember,
  setSelectedMember,
  familyMembers,
  todaysMeds,
  getUpcomingDose,
  isDueNow,
  markTaken,
  deleteMedication,
  showAddMed,
  setShowAddMed,
  addMedication,
}) {
  return (
    <div className="card">
      <div className="member-row">
        <button
          onClick={() => setSelectedMember('me')}
          className={`member-chip ${selectedMember === 'me' ? 'active' : ''}`}
        >
          You
        </button>
        {familyMembers.map((member) => (
          <button
            key={member.id}
            onClick={() => setSelectedMember(member.id)}
            className={`member-chip ${selectedMember === member.id ? 'active' : ''}`}
          >
            {member.name}
          </button>
        ))}
      </div>

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
          <p className="empty-title">No medications yet</p>
          <p className="empty-desc">Add your first medicine to start tracking</p>
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
          familyMembers={familyMembers}
          onAdd={addMedication}
          onClose={() => setShowAddMed(false)}
        />
      )}
    </div>
  );
}
