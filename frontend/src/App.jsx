import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import Header from './components/Header';
import Tabs from './components/Tabs';
import RemindersTab from './components/RemindersTab';
import SymptomsTab from './components/SymptomsTab';
import FamilyTab from './components/FamilyTab';
import {
  fetchMedications,
  fetchFamily,
  createMedication,
  deleteMedication as apiDeleteMedication,
  updateMedication,
  createFamilyMember as apiCreateFamilyMember,
  deleteFamilyMember as apiDeleteFamilyMember,
} from './api';
import './App.css';

export default function DawaTimeApp() {
  const [activeTab, setActiveTab] = useState('reminders');
  const [medications, setMedications] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState('me');
  const [showAddMed, setShowAddMed] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [searchSymptom, setSearchSymptom] = useState('');
  const [loading, setLoading] = useState(true);

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
      const newMed = await createMedication({
        ...med,
        member: selectedMember,
        history: [],
      });
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
    const med = medications.find((m) => m.id === medId);
    if (!med) return;
    const updatedHistory = [...(med.history || []), { timestamp: new Date().toISOString(), taken: true }];
    try {
      const updated = await updateMedication(medId, { history: updatedHistory });
      setMedications((prev) => prev.map((m) => (m.id === medId ? updated : m)));
    } catch (error) {
      console.error('Failed to update medication:', error);
    }
  };

  const addFamilyMember = async (name, relation) => {
    try {
      const newMember = await apiCreateFamilyMember({ name, relation });
      setFamilyMembers((prev) => [...prev, newMember]);
      setShowAddMember(false);
    } catch (error) {
      console.error('Failed to add family member:', error);
    }
  };

  const deleteFamilyMember = async (id) => {
    try {
      await apiDeleteFamilyMember(id);
      await loadData();
    } catch (error) {
      console.error('Failed to delete family member:', error);
    }
  };

  const getTodaysMeds = () => {
    return medications.filter((m) => m.member === selectedMember);
  };

  const getUpcomingDose = (med) => {
    const lastTaken = med.history?.[med.history.length - 1];
    if (!lastTaken) return 'Take now';

    const lastTime = new Date(lastTaken.timestamp);
    const hours = parseInt(med.frequency) || 24;
    const nextTime = new Date(lastTime.getTime() + hours * 60 * 60 * 1000);
    const now = new Date();

    if (nextTime <= now) return 'Take now';

    const diff = nextTime - now;
    const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
    const minsLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hoursLeft > 0) return `In ${hoursLeft}h ${minsLeft}m`;
    return `In ${minsLeft}m`;
  };

  const isDueNow = (med) => {
    return getUpcomingDose(med) === 'Take now';
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="app-root">
      <div className="app-inner">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

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
      </div>
    </div>
  );
}
