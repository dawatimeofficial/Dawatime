import Header from '../components/Header';
import Tabs from '../components/Tabs';
import '../App.css';

export default function WebLayout({ children, activeTab, setActiveTab }) {
  return (
    <div className="app-root">
      <div className="app-inner">
        <Header />
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {children}
      </div>
    </div>
  );
}
