import { Phone } from 'lucide-react';
import './MobileEmergency.css';

export default function MobileEmergency({ onClick }) {
  return (
    <button type="button" className="mobile-emergency" onClick={onClick}>
      <Phone size={18} />
      <span>Emergency – Call 108</span>
    </button>
  );
}
