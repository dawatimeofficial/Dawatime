import { Bell, Search, Users } from 'lucide-react';
import './Tabs.css';

export default function Tabs({ activeTab, setActiveTab }) {
  return (
    <div className="tabs-wrap">
      <button
        className={`tab ${activeTab === 'reminders' ? 'active' : ''}`}
        onClick={() => setActiveTab('reminders')}
      >
        <Bell size={18} className="tab-icon" />
        Reminders
      </button>
      <button
        className={`tab ${activeTab === 'symptoms' ? 'active' : ''}`}
        onClick={() => setActiveTab('symptoms')}
      >
        <Search size={18} className="tab-icon" />
        Health Guide
      </button>
      <button
        className={`tab ${activeTab === 'family' ? 'active' : ''}`}
        onClick={() => setActiveTab('family')}
      >
        <Users size={18} className="tab-icon" />
        Family
      </button>
    </div>
  );
}
