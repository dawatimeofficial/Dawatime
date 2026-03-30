import { Heart, Plus, Trash2 } from 'lucide-react';
import AddFamilyMemberModal from './AddFamilyMemberModal';
import { useTranslation } from 'react-i18next';
import './FamilyTab.css';

export default function FamilyTab({
  familyMembers,
  medications,
  deleteFamilyMember,
  showAddMember,
  setShowAddMember,
  addFamilyMember,
}) {
  const { t } = useTranslation();
  return (
    <div className="card">
      <div className="family-header">
        <h2 className="family-title">{t('family.title')}</h2>
        <button className="btn btn-primary" onClick={() => setShowAddMember(true)}>
          <Plus size={18} className="family-btn-icon" />
          {t('family.add')}
        </button>
      </div>

      {familyMembers.length === 0 ? (
        <div className="family-empty">
          <div className="family-empty-icon-wrap">
            <Heart size={40} color="#FFB199" strokeWidth={2} />
          </div>
          <p className="family-empty-title">{t('family.emptyTitle')}</p>
          <p className="family-empty-desc">{t('family.emptyDesc')}</p>
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
                      {member.phone} • {memberMeds.length} {memberMeds.length !== 1 ? t('family.medication_other') : t('family.medication_one')}
                    </p>
                  </div>
                  <button
                    className="family-btn-delete"
                    onClick={() => {
                      if (confirm(`${t('family.removeConfirm')} ${member.name}?`)) {
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
