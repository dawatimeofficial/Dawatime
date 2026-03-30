import { useState } from 'react';
import { AlertCircle, Search, Sparkles } from 'lucide-react';
import SymptomGuide from './SymptomGuide';
import AIHealthGuide from './AIHealthGuide';
import { useTranslation } from 'react-i18next';
import './SymptomsTab.css';

export default function SymptomsTab({ searchSymptom, setSearchSymptom }) {
  const { t } = useTranslation();
  const [activeMode, setActiveMode] = useState('manual');

  return (
    <div className="card">
      <div className="warning-banner">
        <AlertCircle size={22} className="warning-banner-icon" />
        <div className="warning-banner-text">
          {t('symptoms.disclaimer')}
        </div>
      </div>

      <div className="symptoms-mode-toggle">
        <button
          type="button"
          className={`symptoms-mode-btn ${activeMode === 'manual' ? 'active' : ''}`}
          onClick={() => setActiveMode('manual')}
        >
          <Search size={16} />
          {t('symptoms.manualMode')}
        </button>
        <button
          type="button"
          className={`symptoms-mode-btn ${activeMode === 'ai' ? 'active' : ''}`}
          onClick={() => setActiveMode('ai')}
        >
          <Sparkles size={16} />
          {t('symptoms.aiMode')}
        </button>
      </div>

      {activeMode === 'manual' && (
        <>
          <h2 className="symptoms-title">{t('symptoms.title')}</h2>
          <div className="symptoms-search-wrap">
            <div className="symptoms-search-inner">
              <Search size={20} className="symptoms-search-icon" />
              <input
                type="text"
                placeholder={t('symptoms.searchPlaceholder')}
                value={searchSymptom}
                onChange={(e) => setSearchSymptom(e.target.value)}
                className="symptoms-search-input"
              />
            </div>
          </div>
          <SymptomGuide searchTerm={searchSymptom} />
        </>
      )}

      {activeMode === 'ai' && <AIHealthGuide />}
    </div>
  );
}