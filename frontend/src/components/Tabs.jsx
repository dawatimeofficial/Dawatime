import { Bell, Search, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Tabs.css';

export default function Tabs({ activeTab, setActiveTab }) {
  const { t } = useTranslation();
  return (
    <div className="tabs-wrap">
      <button
        className={`tab ${activeTab === 'reminders' ? 'active' : ''}`}
        onClick={() => setActiveTab('reminders')}
      >
        <Bell size={18} className="tab-icon" />
        {t('tabs.reminders')}
      </button>
      <button
        className={`tab ${activeTab === 'symptoms' ? 'active' : ''}`}
        onClick={() => setActiveTab('symptoms')}
      >
        <Search size={18} className="tab-icon" />
        {t('tabs.healthGuide')}
      </button>
      <button
        className={`tab ${activeTab === 'family' ? 'active' : ''}`}
        onClick={() => setActiveTab('family')}
      >
        <Users size={18} className="tab-icon" />
        {t('tabs.family')}
      </button>
    </div>
  );
}
