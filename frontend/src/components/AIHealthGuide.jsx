import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Search, AlertTriangle, Home, Pill, AlertCircle, Loader2 } from 'lucide-react';
import { getHealthGuide } from '../api';
import './AIHealthGuide.css';

export default function AIHealthGuide() {
  const { t } = useTranslation();
  const [symptoms, setSymptoms] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim() || symptoms.trim().length < 5) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await getHealthGuide(symptoms.trim(), i18n.language);
      setResult(data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="ai-health-guide">
      <div className="ai-guide-header">
        <h2 className="ai-guide-title">{t('healthGuide.aiTitle')}</h2>
        <p className="ai-guide-subtitle">
          {t('healthGuide.aiSubtitle')}
        </p>
      </div>

      {!result && !loading && (
        <form onSubmit={handleSubmit} className="ai-guide-form">
          <textarea
            className="ai-guide-input"
            placeholder={t('healthGuide.aiPlaceholder')}
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={4}
          />
          
          <button
            type="submit"
            className="ai-guide-btn"
            disabled={symptoms.trim().length < 5}
          >
            <Search size={18} />
            {t('healthGuide.analyze')}
          </button>
        </form>
      )}

      {loading && (
        <div className="ai-guide-loading">
          <div className="ai-guide-loading-spinner">
            <Loader2 size={32} className="spinner" />
          </div>
          <p className="ai-guide-loading-text">{t('healthGuide.analyzing')}</p>
          <p className="ai-guide-loading-subtext">{t('healthGuide.analyzingSub')}</p>
        </div>
      )}

      {error && (
        <div className="ai-guide-error">
          <AlertTriangle size={24} />
          <p>{error}</p>
          <button type="button" className="ai-guide-btn-retry" onClick={() => setError(null)}>
            {t('healthGuide.tryAgain')}
          </button>
        </div>
      )}

      {result && (
        <div className="ai-guide-result">
          <button type="button" className="ai-guide-btn-new" onClick={handleReset}>
            {t('healthGuide.analyzeNew')}
          </button>

          <div className="ai-disclaimer">
            <AlertTriangle size={16} />
            <span>
              {t('healthGuide.aiDisclaimer')}
            </span>
          </div>

          <div className="ai-result-card conditions">
            <div className="ai-result-header">
              <Search size={20} />
              <h3>{t('healthGuide.conditions')}</h3>
            </div>
            <ul className="ai-result-list">
              {result.possibleConditions?.map((condition, index) => (
                <li key={index}>{condition}</li>
              ))}
            </ul>
          </div>

          <div className="ai-result-card care">
            <div className="ai-result-header">
              <Home size={20} />
              <h3>{t('healthGuide.selfCare')}</h3>
            </div>
            <ul className="ai-result-list">
              {result.suggestedCare?.map((care, index) => (
                <li key={index}>{care}</li>
              ))}
            </ul>
          </div>

          <div className="ai-result-card medicines">
            <div className="ai-result-header">
              <Pill size={20} />
              <h3>{t('healthGuide.otc')}</h3>
            </div>
            {result.safeOtcMedicines?.length > 0 ? (
              <ul className="ai-result-list">
                {result.safeOtcMedicines?.map((medicine, index) => (
                  <li key={index}>{medicine}</li>
                ))}
              </ul>
            ) : (
              <p className="ai-result-empty">{t('healthGuide.noOtc')}</p>
            )}
          </div>

          <div className="ai-result-card warnings">
            <div className="ai-result-header">
              <AlertCircle size={20} />
              <h3>{t('healthGuide.warnings')}</h3>
            </div>
            <ul className="ai-result-list">
              {result.warningSigns?.map((warning, index) => (
                <li key={index}>{warning}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}