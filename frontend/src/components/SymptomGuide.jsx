import { AlertCircle, Info, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './SymptomGuide.css';

export default function SymptomGuide({ searchTerm }) {
  const { t } = useTranslation();

  const SYMPTOMS_DATA = [
    {
      symptom: t('symptomsDb.headache.name'),
      severity: t('sg.common'),
      selfCare: t('symptomsDb.headache.selfCare'),
      otc: t('symptomsDb.headache.otc'),
      seeDoctor: t('symptomsDb.headache.seeDoctor'),
      emergency: t('symptomsDb.headache.emergency'),
      severityRaw: 'Common',
    },
    {
      symptom: t('symptomsDb.fever.name'),
      severity: t('sg.common'),
      selfCare: t('symptomsDb.fever.selfCare'),
      otc: t('symptomsDb.fever.otc'),
      seeDoctor: t('symptomsDb.fever.seeDoctor'),
      emergency: t('symptomsDb.fever.emergency'),
      severityRaw: 'Common',
    },
    {
      symptom: t('symptomsDb.cough.name'),
      severity: t('sg.common'),
      selfCare: t('symptomsDb.cough.selfCare'),
      otc: t('symptomsDb.cough.otc'),
      seeDoctor: t('symptomsDb.cough.seeDoctor'),
      emergency: t('symptomsDb.cough.emergency'),
      severityRaw: 'Common',
    },
    {
      symptom: t('symptomsDb.soreThroat.name'),
      severity: t('sg.common'),
      selfCare: t('symptomsDb.soreThroat.selfCare'),
      otc: t('symptomsDb.soreThroat.otc'),
      seeDoctor: t('symptomsDb.soreThroat.seeDoctor'),
      emergency: t('symptomsDb.soreThroat.emergency'),
      severityRaw: 'Common',
    },
    {
      symptom: t('symptomsDb.nausea.name'),
      severity: t('sg.common'),
      selfCare: t('symptomsDb.nausea.selfCare'),
      otc: t('symptomsDb.nausea.otc'),
      seeDoctor: t('symptomsDb.nausea.seeDoctor'),
      emergency: t('symptomsDb.nausea.emergency'),
      severityRaw: 'Common',
    },
    {
      symptom: t('symptomsDb.diarrhea.name'),
      severity: t('sg.common'),
      selfCare: t('symptomsDb.diarrhea.selfCare'),
      otc: t('symptomsDb.diarrhea.otc'),
      seeDoctor: t('symptomsDb.diarrhea.seeDoctor'),
      emergency: t('symptomsDb.diarrhea.emergency'),
      severityRaw: 'Common',
    },
    {
      symptom: t('symptomsDb.cold.name'),
      severity: t('sg.common'),
      selfCare: t('symptomsDb.cold.selfCare'),
      otc: t('symptomsDb.cold.otc'),
      seeDoctor: t('symptomsDb.cold.seeDoctor'),
      emergency: t('symptomsDb.cold.emergency'),
      severityRaw: 'Common',
    },
    {
      symptom: t('symptomsDb.allergies.name'),
      severity: t('sg.common'),
      selfCare: t('symptomsDb.allergies.selfCare'),
      otc: t('symptomsDb.allergies.otc'),
      seeDoctor: t('symptomsDb.allergies.seeDoctor'),
      emergency: t('symptomsDb.allergies.emergency'),
      severityRaw: 'Common',
    },
    {
      symptom: t('symptomsDb.backPain.name'),
      severity: t('sg.common'),
      selfCare: t('symptomsDb.backPain.selfCare'),
      otc: t('symptomsDb.backPain.otc'),
      seeDoctor: t('symptomsDb.backPain.seeDoctor'),
      emergency: t('symptomsDb.backPain.emergency'),
      severityRaw: 'Common',
    },
    {
      symptom: t('symptomsDb.chestPain.name'),
      severity: t('sg.serious'),
      selfCare: t('symptomsDb.chestPain.selfCare'),
      otc: t('symptomsDb.chestPain.otc'),
      seeDoctor: t('symptomsDb.chestPain.seeDoctor'),
      emergency: t('symptomsDb.chestPain.emergency'),
      severityRaw: 'Serious',
    },
  ];

  const filteredSymptoms = SYMPTOMS_DATA.filter(
    (s) =>
      searchTerm === '' || s.symptom.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="symptom-guide-list">
      {filteredSymptoms.map((item, index) => (
        <div key={index} className="symptom-card">
          <div className="symptom-card-header">
            <h3 className="symptom-card-title">{item.symptom}</h3>
            <span
              className={`symptom-severity ${item.severityRaw === 'Serious' ? 'serious' : 'common'}`}
            >
              {item.severity}
            </span>
          </div>

          <div className="symptom-card-body">
            <div className="symptom-section">
              <strong>{t('sg.selfCare')}</strong>
              <p>{item.selfCare}</p>
            </div>

            <div className="symptom-section">
              <strong>{t('sg.otc')}</strong>
              <p>{item.otc}</p>
            </div>

            <div className="symptom-doctor-box">
              <strong>
                <Info size={16} />
                {t('sg.seeDoctor')}
              </strong>
              <p>{item.seeDoctor}</p>
            </div>

            {item.emergency && (
              <div className="symptom-emergency-box">
                <strong>
                  <AlertCircle size={16} />
                  {t('sg.emergency')}
                </strong>
                <p>{item.emergency}</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {filteredSymptoms.length === 0 && (
        <div className="symptom-empty">
          <Search size={48} className="symptom-empty-icon" />
          <p className="symptom-empty-title">{t('sg.noSymptoms')}</p>
          <p className="symptom-empty-desc">{t('sg.trySearch')}</p>
        </div>
      )}

      <div className="symptom-remember">
        <p>
          <strong>{t('sg.remember')}</strong> {t('sg.rememberDesc')}
        </p>
      </div>
    </div>
  );
}
