import { useEffect } from 'react';
import { App } from '@capacitor/app';
import { isMobileApp } from '../utils/platform';

export default function useAndroidBackButton({ 
  activeTab, 
  setActiveTab,
  modals = {} 
}) {
  useEffect(() => {
    if (!isMobileApp) return;

    const handleBackButton = async () => {
      const hasOpenModal = modals.showAddMed || modals.showAddMember;
      
      if (hasOpenModal) {
        if (modals.setShowAddMed) modals.setShowAddMed(false);
        if (modals.setShowAddMember) modals.setShowAddMember(false);
        return;
      }

      if (activeTab !== 'reminders') {
        setActiveTab('reminders');
        return;
      }

      await App.exitApp();
    };

    const backButtonListener = App.addListener('backButton', handleBackButton);

    return () => {
      backButtonListener.remove();
    };
  }, [activeTab, setActiveTab, modals]);
}
