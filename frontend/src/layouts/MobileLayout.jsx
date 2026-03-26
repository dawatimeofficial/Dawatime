import BottomNav from '../components/mobile/BottomNav';
import MobileFAB from '../components/mobile/MobileFAB';
import '../components/mobile/mobile-motion.css';
import './MobileLayout.css';

export default function MobileLayout({
  children,
  activeTab,
  setActiveTab,
  onAddClick
}) {
  const handleFabClick = () => {
    if (onAddClick) {
      onAddClick(activeTab);
    }
  };

  return (
    <div className="mobile-layout">
      <main className="mobile-content">
        {children}
      </main>
      {activeTab !== 'profile' && <MobileFAB onClick={handleFabClick} />}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
