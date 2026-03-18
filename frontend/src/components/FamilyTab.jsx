import { Heart, Plus, Trash2 } from 'lucide-react';
import AddFamilyMemberModal from './AddFamilyMemberModal';
import './FamilyTab.css';

export default function FamilyTab({
  familyMembers,
  medications,
  deleteFamilyMember,
  showAddMember,
  setShowAddMember,
  addFamilyMember,
}) {
  return (
    <div className="card">
      <div className="family-header">
        <h2 className="family-title">Family Members</h2>
        <button className="btn btn-primary" onClick={() => setShowAddMember(true)}>
          <Plus size={18} className="family-btn-icon" />
          Add
        </button>
      </div>

      {familyMembers.length === 0 ? (
        <div className="family-empty">
          <div className="family-empty-icon-wrap">
            <Heart size={40} color="#FFB199" strokeWidth={2} />
          </div>
          <p className="family-empty-title">No family members yet</p>
          <p className="family-empty-desc">Add family to manage their medications</p>
        </div>
      ) : (
        <div className="family-list">
          {familyMembers.map((member) => {
            const memberMeds = medications.filter((m) => Array.isArray(m.memberIds) && m.memberIds.includes(member.id));
            return (
              <div key={member.id} className="med-card">
                <div className="family-member-row">
                  <div>
                    <h3 className="family-member-name">{member.name}</h3>
                    <p className="family-member-meta">
                      {member.relation} • {memberMeds.length} medication
                      {memberMeds.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <button
                    className="family-btn-delete"
                    onClick={() => {
                      if (confirm(`Remove ${member.name}?`)) {
                        deleteFamilyMember(member.id);
                      }
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAddMember && (
        <AddFamilyMemberModal
          onAdd={addFamilyMember}
          onClose={() => setShowAddMember(false)}
        />
      )}
    </div>
  );
}
