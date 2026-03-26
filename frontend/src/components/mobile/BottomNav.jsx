import { Bell, Search, Users, User } from 'lucide-react';
import './BottomNav.css';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'reminders', icon: Bell, label: 'Home' },
    { id: 'symptoms', icon: Search, label: 'Health Guide' },
    { id: 'family', icon: Users, label: 'Family' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`bottom-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <Icon size={24} />
            <span className="bottom-nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
