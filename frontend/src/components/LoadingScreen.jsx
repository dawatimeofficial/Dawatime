import { Pill } from 'lucide-react';
import './LoadingScreen.css';

export default function LoadingScreen() {
  return (
    <div className="loading-root">
      <div className="loading-inner">
        <div className="loading-icon-wrap">
          <Pill size={28} color="white" strokeWidth={2.5} />
        </div>
        <div className="loading-text">Loading DawaTime...</div>
      </div>
    </div>
  );
}
