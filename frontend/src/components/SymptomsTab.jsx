import { AlertCircle, Search } from 'lucide-react';
import SymptomGuide from './SymptomGuide';
import './SymptomsTab.css';

export default function SymptomsTab({ searchSymptom, setSearchSymptom }) {
  return (
    <div className="card">
      <div className="warning-banner">
        <AlertCircle size={22} className="warning-banner-icon" />
        <div className="warning-banner-text">
          <strong>Disclaimer:</strong> This is general information only. Always consult a
          healthcare professional for diagnosis and treatment. For emergencies, call local
          emergency services immediately.
        </div>
      </div>

      <h2 className="symptoms-title">Common Health Issues</h2>

      <div className="symptoms-search-wrap">
        <div className="symptoms-search-inner">
          <Search size={20} className="symptoms-search-icon" />
          <input
            type="text"
            placeholder="Search symptoms..."
            value={searchSymptom}
            onChange={(e) => setSearchSymptom(e.target.value)}
            className="symptoms-search-input"
          />
        </div>
      </div>

      <SymptomGuide searchTerm={searchSymptom} />
    </div>
  );
}
