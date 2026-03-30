import { Heart, Plus, Trash2, User } from 'lucide-react';
import AddFamilyMemberModal from '../../components/AddFamilyMemberModal';
import { useTranslation } from 'react-i18next';
import './MobileFamilyTab.css';

export default function MobileFamilyTab({
  familyMembers,
  medications,
  deleteFamilyMember,
  showAddMember,
  setShowAddMember,
  addFamilyMember,
}) {
  const { t } = useTranslation();
  return (
    <div className="mobile-family">
      <div className="mobile-section-header">
        <h2 className="mobile-section-title">{t('family.title')}</h2>
      </div>

      {familyMembers.length === 0 ? (
        <div className="mobile-empty">
          <div className="mobile-empty-icon">
            <Heart size={48} color="#FFB199" strokeWidth={1.5} />
          </div>
          <p className="mobile-empty-title">{t('family.emptyTitle')}</p>
          <p className="mobile-empty-desc">{t('family.emptyDesc')}</p>
          <button
            type="button"
            className="mobile-add-btn"
            onClick={() => setShowAddMember(true)}
          >
            <Plus size={20} />
            {t('family.addMember')}
          </button>
        </div>
      ) : (
        <>
          <div className="mobile-family-list">
            {familyMembers.map((member) => {
              const memberMeds = medications.filter(
                (m) => Array.isArray(m.memberIds) && m.memberIds.includes(member.id)
              );
              return (
                <div key={member.id} className="mobile-family-card">
                  <div className="mobile-family-avatar">
                    <User size={24} />
                  </div>
                  <div className="mobile-family-info">
                    <h3 className="mobile-family-name">{member.name}</h3>
                    <p className="mobile-family-meta">
                      {member.phone} • {memberMeds.length} {memberMeds.length !== 1 ? t('family.medication_other') : t('family.medication_one')}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mobile-family-delete"
                    onClick={() => {
                      if (confirm(`${t('family.removeConfirm')} ${member.name}?`)) {
                        deleteFamilyMember(member.id);
                      }
                    }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            className="mobile-add-card"
            onClick={() => setShowAddMember(true)}
          >
            <Plus size={24} />
            {t('family.addMember')}
          </button>
        </>
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
