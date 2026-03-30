import { useState, useEffect } from 'react';
import LoadingScreen from './LoadingScreen';
import WebLayout from '../layouts/WebLayout';
import MobileLayout from '../layouts/MobileLayout';
import RemindersTab from './RemindersTab';
import SymptomsTab from './SymptomsTab';
import FamilyTab from './FamilyTab';
import MobileRemindersTab from '../pages/mobile/MobileRemindersTab';
import MobileFamilyTab from '../pages/mobile/MobileFamilyTab';
import MobileProfileTab from '../pages/mobile/MobileProfileTab';
import { isMobileApp } from '../utils/platform';
import useAndroidBackButton from '../hooks/useAndroidBackButton';
import {
  fetchMedications,
  fetchFamily,
  createMedication,
  deleteMedication as apiDeleteMedication,
  addFamilyMember as apiAddFamilyMember,
  removeFamilyMember as apiRemoveFamilyMember,
  markMedicationTaken,
} from '../api/index.js';
import { useTranslation } from 'react-i18next';
import '../App.css';

export default function DawaTimeApp() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('reminders');
  const [medications, setMedications] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('me');
  const [showAddMed, setShowAddMed] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [searchSymptom, setSearchSymptom] = useState('');
  const [loading, setLoading] = useState(true);

  useAndroidBackButton({
    activeTab,
    setActiveTab,
    modals: {
      showAddMed,
      setShowAddMed,
      showAddMember,
      setShowAddMember,
    },
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [meds, members] = await Promise.all([fetchMedications(), fetchFamily()]);
      setMedications(meds);
      setFamilyMembers(members);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addMedication = async (med) => {
    try {
      const newMed = await createMedication(med);
      setMedications((prev) => [...prev, newMed]);
      setShowAddMed(false);
    } catch (error) {
      console.error('Failed to save medication:', error);
    }
  };

  const deleteMedication = async (id) => {
    try {
      await apiDeleteMedication(id);
      setMedications((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Failed to delete medication:', error);
    }
  };

  const markTaken = async (medId) => {
    try {
      const updated = await markMedicationTaken(medId);
      setMedications((prev) => prev.map((m) => (m.id === medId ? updated : m)));
    } catch (error) {
      console.error('Failed to update medication:', error);
    }
  };

  const addFamilyMember = async (phone) => {
    const newMember = await apiAddFamilyMember(phone);
    setFamilyMembers((prev) => [...prev, newMember]);
    setShowAddMember(false);
  };

  const deleteFamilyMember = async (id) => {
    try {
      await apiRemoveFamilyMember(id);
      await loadData();
    } catch (error) {
      console.error('Failed to remove family member:', error);
    }
  };

  const getTodaysMeds = () => {
    if (selectedMember === 'me') {
      return medications.filter((m) => !m.memberIds || m.memberIds.length === 0);
    }
    return medications.filter((m) => Array.isArray(m.memberIds) && m.memberIds.includes(selectedMember));
  };

  const getUpcomingDose = (med) => {
    const lastTaken = med.history?.[med.history.length - 1];
    if (!lastTaken) return t('time.takeNow');

    const lastTime = new Date(lastTaken.timestamp);
    const hours = parseInt(med.frequency) || 24;
    const nextTime = new Date(lastTime.getTime() + hours * 60 * 60 * 1000);
    const now = new Date();

    if (nextTime <= now) return t('time.takeNow');

    const diff = nextTime - now;
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minsLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hoursLeft > 0) return t('time.inHoursMins', { hours: hoursLeft, mins: minsLeft });
    return t('time.inMins', { mins: minsLeft });
  };

  const isDueNow = (med) => {
    return getUpcomingDose(med) === t('time.takeNow');
  };

  if (loading) {
    return <LoadingScreen />;
  }

  const renderWebContent = () => (
    <>
      {activeTab === 'reminders' && (
        <RemindersTab
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
          familyMembers={familyMembers}
          todaysMeds={getTodaysMeds()}
          getUpcomingDose={getUpcomingDose}
          isDueNow={isDueNow}
          markTaken={markTaken}
          deleteMedication={deleteMedication}
          showAddMed={showAddMed}
          setShowAddMed={setShowAddMed}
          addMedication={addMedication}
        />
      )}

      {activeTab === 'symptoms' && (
        <SymptomsTab searchSymptom={searchSymptom} setSearchSymptom={setSearchSymptom} />
      )}

      {activeTab === 'family' && (
        <FamilyTab
          familyMembers={familyMembers}
          medications={medications}
          deleteFamilyMember={deleteFamilyMember}
          showAddMember={showAddMember}
          setShowAddMember={setShowAddMember}
          addFamilyMember={addFamilyMember}
        />
      )}
    </>
  );

  const renderMobileContent = () => (
    <>
      {activeTab === 'reminders' && (
        <MobileRemindersTab
          selectedMember={selectedMember}
          setSelectedMember={setSelectedMember}
          familyMembers={familyMembers}
          todaysMeds={getTodaysMeds()}
          getUpcomingDose={getUpcomingDose}
          isDueNow={isDueNow}
          markTaken={markTaken}
          deleteMedication={deleteMedication}
          showAddMed={showAddMed}
          setShowAddMed={setShowAddMed}
          addMedication={addMedication}
        />
      )}

      {activeTab === 'symptoms' && (
        <SymptomsTab 
          searchSymptom={searchSymptom} 
          setSearchSymptom={setSearchSymptom} 
        />
      )}

      {activeTab === 'family' && (
        <MobileFamilyTab
          familyMembers={familyMembers}
          medications={medications}
          deleteFamilyMember={deleteFamilyMember}
          showAddMember={showAddMember}
          setShowAddMember={setShowAddMember}
          addFamilyMember={addFamilyMember}
        />
      )}

      {activeTab === 'profile' && <MobileProfileTab />}
    </>
  );

  if (isMobileApp) {
    return (
      <MobileLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onAddClick={(tab) => {
          if (tab === 'reminders') setShowAddMed(true);
          if (tab === 'family') setShowAddMember(true);
        }}
      >
        {renderMobileContent()}
      </MobileLayout>
    );
  }

  return (
    <WebLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderWebContent()}
      <button
        type="button"
        className="emergency-button"
        onClick={() => {
          window.location.href = 'tel:108';
        }}
      >
        {t('common.emergencyCall')}
      </button>
    </WebLayout>
  );
}
