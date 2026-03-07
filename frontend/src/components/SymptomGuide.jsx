import { AlertCircle, Info, Search } from 'lucide-react';
import './SymptomGuide.css';

const SYMPTOMS_DATA = [
  {
    symptom: 'Headache',
    severity: 'Common',
    selfCare: 'Rest in a quiet, dark room. Stay hydrated. Apply a cold or warm compress to your head or neck.',
    otc: 'Acetaminophen (Tylenol) or Ibuprofen (Advil) may help',
    seeDoctor: 'If headache is severe, sudden, or accompanied by fever, stiff neck, confusion, vision changes, or difficulty speaking',
    emergency: 'Sudden, severe "thunderclap" headache, headache after head injury, or with high fever and stiff neck',
  },
  {
    symptom: 'Fever',
    severity: 'Common',
    selfCare: 'Rest and drink plenty of fluids. Dress in light clothing. Take lukewarm baths.',
    otc: 'Acetaminophen or Ibuprofen can reduce fever',
    seeDoctor: 'Fever above 103°F (39.4°C), lasts more than 3 days, or accompanied by severe symptoms',
    emergency: 'Fever with severe headache, stiff neck, difficulty breathing, chest pain, or confusion',
  },
  {
    symptom: 'Cough',
    severity: 'Common',
    selfCare: 'Stay hydrated. Use honey (for adults). Humidify the air. Avoid irritants.',
    otc: 'Cough suppressants or expectorants may help, but consult a pharmacist first',
    seeDoctor: 'Cough lasting more than 3 weeks, coughing up blood, difficulty breathing, or high fever',
    emergency: 'Severe difficulty breathing, blue lips or face, or chest pain with cough',
  },
  {
    symptom: 'Sore Throat',
    severity: 'Common',
    selfCare: 'Gargle with warm salt water. Stay hydrated. Use throat lozenges. Rest your voice.',
    otc: 'Throat lozenges, pain relievers like acetaminophen or ibuprofen',
    seeDoctor: 'Sore throat lasting more than a week, difficulty swallowing, or swollen glands',
    emergency: 'Severe difficulty swallowing, breathing difficulty, or drooling',
  },
  {
    symptom: 'Nausea/Vomiting',
    severity: 'Common',
    selfCare: 'Sip clear fluids slowly. Eat bland foods (crackers, toast). Rest. Avoid strong smells.',
    otc: 'Anti-nausea medications like bismuth subsalicylate (Pepto-Bismol), but consult pharmacist',
    seeDoctor: 'Persistent vomiting for more than 24 hours, signs of dehydration, or severe abdominal pain',
    emergency: 'Vomiting blood, severe dehydration, or chest pain with vomiting',
  },
  {
    symptom: 'Diarrhea',
    severity: 'Common',
    selfCare: 'Stay hydrated with water and electrolyte solutions. Eat bland foods (BRAT diet: bananas, rice, applesauce, toast).',
    otc: 'Anti-diarrheal medications like loperamide (Imodium), but avoid if you have fever or bloody stool',
    seeDoctor: 'Diarrhea lasting more than 2 days, signs of dehydration, bloody or black stool, or high fever',
    emergency: 'Severe dehydration, bloody diarrhea with high fever, or severe abdominal pain',
  },
  {
    symptom: 'Cold/Runny Nose',
    severity: 'Common',
    selfCare: 'Rest, stay hydrated, use saline nasal spray, humidify the air.',
    otc: 'Decongestants, antihistamines, or combination cold medications',
    seeDoctor: 'Symptoms lasting more than 10 days, high fever, or severe facial pain',
    emergency: 'Difficulty breathing or severe allergic reaction',
  },
  {
    symptom: 'Allergies',
    severity: 'Common',
    selfCare: 'Avoid triggers, keep windows closed during high pollen days, shower after being outdoors.',
    otc: 'Antihistamines like cetirizine (Zyrtec) or loratadine (Claritin)',
    seeDoctor: 'Symptoms not controlled by OTC medications or interfering with daily life',
    emergency: 'Difficulty breathing, swelling of face/throat, or signs of anaphylaxis',
  },
  {
    symptom: 'Back Pain',
    severity: 'Common',
    selfCare: 'Apply heat or ice. Gentle stretching. Stay active with light exercise. Maintain good posture.',
    otc: 'Pain relievers like ibuprofen or acetaminophen',
    seeDoctor: 'Pain lasting more than 2 weeks, pain radiating down legs, numbness, or loss of bladder control',
    emergency: 'Sudden severe pain, trauma, fever with back pain, or loss of bladder/bowel control',
  },
  {
    symptom: 'Chest Pain',
    severity: 'Serious',
    selfCare: 'This requires immediate medical attention - do not attempt self-care',
    otc: 'Do not self-medicate for chest pain',
    seeDoctor: 'ANY chest pain should be evaluated by a doctor',
    emergency:
      'Severe chest pain, pressure, tightness, pain spreading to arm/jaw/back, shortness of breath, sweating, nausea - CALL EMERGENCY SERVICES IMMEDIATELY',
  },
];

export default function SymptomGuide({ searchTerm }) {
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
              className={`symptom-severity ${item.severity === 'Serious' ? 'serious' : 'common'}`}
            >
              {item.severity}
            </span>
          </div>

          <div className="symptom-card-body">
            <div className="symptom-section">
              <strong>Self-Care:</strong>
              <p>{item.selfCare}</p>
            </div>

            <div className="symptom-section">
              <strong>Over-the-Counter:</strong>
              <p>{item.otc}</p>
            </div>

            <div className="symptom-doctor-box">
              <strong>
                <Info size={16} />
                See a Doctor If:
              </strong>
              <p>{item.seeDoctor}</p>
            </div>

            {item.emergency && (
              <div className="symptom-emergency-box">
                <strong>
                  <AlertCircle size={16} />
                  Emergency - Call 911:
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
          <p className="symptom-empty-title">No symptoms found</p>
          <p className="symptom-empty-desc">Try searching for something else</p>
        </div>
      )}

      <div className="symptom-remember">
        <p>
          <strong>Remember:</strong> This guide provides general information only. Always
          consult a healthcare professional for personalized advice, diagnosis, or treatment.
        </p>
      </div>
    </div>
  );
}
