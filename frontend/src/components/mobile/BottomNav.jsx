import { Bell, Search, Users, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './BottomNav.css';

export default function BottomNav({ activeTab, setActiveTab }) {
  const { t } = useTranslation();
  const tabs = [
    { id: 'reminders', icon: Bell, label: t('tabs.reminders') },
    { id: 'symptoms', icon: Search, label: t('tabs.healthGuide') },
    { id: 'family', icon: Users, label: t('tabs.family') },
    { id: 'profile', icon: User, label: t('tabs.profile') },
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
