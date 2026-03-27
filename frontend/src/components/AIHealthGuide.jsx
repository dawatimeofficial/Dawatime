import { useState } from 'react';
import { Search, AlertTriangle, Home, Pill, AlertCircle, Loader2 } from 'lucide-react';
import { getHealthGuide } from '../api';
import './AIHealthGuide.css';

export default function AIHealthGuide() {
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
      const data = await getHealthGuide(symptoms.trim());
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
        <h2 className="ai-guide-title">AI Health Guide</h2>
        <p className="ai-guide-subtitle">
          Describe your symptoms for personalized health guidance
        </p>
      </div>

      {!result && !loading && (
        <form onSubmit={handleSubmit} className="ai-guide-form">
          <textarea
            className="ai-guide-input"
            placeholder="e.g., I have a headache and feel tired since morning..."
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
            Analyze Symptoms
          </button>
        </form>
      )}

      {loading && (
        <div className="ai-guide-loading">
          <div className="ai-guide-loading-spinner">
            <Loader2 size={32} className="spinner" />
          </div>
          <p className="ai-guide-loading-text">Analyzing your symptoms...</p>
          <p className="ai-guide-loading-subtext">This may take a few seconds</p>
        </div>
      )}

      {error && (
        <div className="ai-guide-error">
          <AlertTriangle size={24} />
          <p>{error}</p>
          <button type="button" className="ai-guide-btn-retry" onClick={() => setError(null)}>
            Try Again
          </button>
        </div>
      )}

      {result && (
        <div className="ai-guide-result">
          <button type="button" className="ai-guide-btn-new" onClick={handleReset}>
            Analyze New Symptoms
          </button>

          <div className="ai-disclaimer">
            <AlertTriangle size={16} />
            <span>
              This is AI-generated guidance, not medical advice. Always consult a healthcare 
              professional for serious or worsening symptoms.
            </span>
          </div>

          <div className="ai-result-card conditions">
            <div className="ai-result-header">
              <Search size={20} />
              <h3>Possible Conditions</h3>
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
              <h3>Suggested Self-Care</h3>
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
              <h3>Safe OTC Medicines</h3>
            </div>
            {result.safeOtcMedicines?.length > 0 ? (
              <ul className="ai-result-list">
                {result.safeOtcMedicines?.map((medicine, index) => (
                  <li key={index}>{medicine}</li>
                ))}
              </ul>
            ) : (
              <p className="ai-result-empty">No OTC recommendations for these symptoms</p>
            )}
          </div>

          <div className="ai-result-card warnings">
            <div className="ai-result-header">
              <AlertCircle size={20} />
              <h3>Warning Signs</h3>
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