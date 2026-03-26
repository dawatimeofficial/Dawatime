import { Plus } from 'lucide-react';
import './MobileFAB.css';

export default function MobileFAB({ onClick }) {
  return (
    <button type="button" className="mobile-fab" onClick={onClick}>
      <Plus size={28} />
    </button>
  );
}
