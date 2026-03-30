import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesPath = path.join(__dirname, 'src', 'i18n', 'locales');

// Fix hi.json
const hiPath = path.join(localesPath, 'hi.json');
let hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));
hi.family.medication_one = "दवा";
hi.family.medication_other = "दवाएं";
hi.reminders.emptyTitle = "अभी कोई दवा नहीं";
hi.reminders.emptyDesc = "अपनी पहली दवा जोड़ने के लिए + पर टैप करें";
hi.reminders.deleteConfirm = "क्या आप इस दवा को हटाना चाहते हैं?";
hi.reminders.delete = "दवा हटाएं";
hi.modals.addMedicine = "दवा जोड़ें";
hi.modals.medName = "दवा का नाम *";
hi.modals.medNamePh = "उदा., Paracetamol";
hi.modals.dosage = "खुराक *";
hi.modals.dosagePh = "उदा., 500mg, 2 गोलियां";

// Fix OTC medicine names in hi.json
hi.symptomsDb.headache.otc = "Paracetamol या Ibuprofen";
hi.symptomsDb.fever.otc = "Paracetamol या Ibuprofen";
hi.symptomsDb.cough.otc = "Cough Syrup";
hi.symptomsDb.soreThroat.otc = "Pain relievers, Lozenges";
hi.symptomsDb.nausea.otc = "Anti-nausea दवाएं (डॉक्टर से पूछें)";
hi.symptomsDb.diarrhea.otc = "Anti-diarrheal दवाएं (बुखार हो तो बचें)";
hi.symptomsDb.cold.otc = "Decongestants, Antihistamines";
hi.symptomsDb.allergies.otc = "Antihistamines (Zyrtec, Claritin)";
hi.symptomsDb.backPain.otc = "Ibuprofen या Acetaminophen";

fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2));


// Fix mr.json
const mrPath = path.join(localesPath, 'mr.json');
let mr = JSON.parse(fs.readFileSync(mrPath, 'utf8'));
mr.family.medication_one = "औषध";
mr.family.medication_other = "औषधे";
mr.reminders.emptyTitle = "अद्याप कोणतीही औषधे नाहीत";
mr.reminders.emptyDesc = "पहिले औषध जोडण्यासाठी + दाबा";
mr.reminders.deleteConfirm = "हे औषध डिलीट करायचे?";
mr.reminders.delete = "औषध काढा";
mr.modals.addMedicine = "औषध जोडा";
mr.modals.medName = "औषधाचे नाव *";
mr.modals.medNamePh = "उद., Paracetamol";
mr.modals.dosage = "डोस *";
mr.modals.dosagePh = "उद., 500mg, 2 गोळ्या";

// Fix OTC medicine names in mr.json
mr.symptomsDb.headache.otc = "Paracetamol किंवा Ibuprofen";
mr.symptomsDb.fever.otc = "Paracetamol किंवा Ibuprofen";
mr.symptomsDb.cough.otc = "Cough Syrup";
mr.symptomsDb.soreThroat.otc = "Pain relievers, Lozenges";
mr.symptomsDb.nausea.otc = "Anti-nausea औषधे (डॉक्टरांना विचारा)";
mr.symptomsDb.diarrhea.otc = "Anti-diarrheal औषधे (ताप असल्यास टाळा)";
mr.symptomsDb.cold.otc = "Decongestants, Antihistamines";
mr.symptomsDb.allergies.otc = "Antihistamines (Zyrtec, Claritin)";
mr.symptomsDb.backPain.otc = "Ibuprofen किंवा Acetaminophen";

fs.writeFileSync(mrPath, JSON.stringify(mr, null, 2));

console.log("JSON reverted and OTCs set to English!");
