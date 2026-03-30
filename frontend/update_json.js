import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localesPath = path.join(__dirname, 'src', 'i18n', 'locales');

const symptomData = {
  en: {
    sg: {
      selfCare: "Self-Care:",
      otc: "Over-the-Counter:",
      seeDoctor: "See a Doctor If:",
      emergency: "Emergency - Call 108:",
      noSymptoms: "No symptoms found",
      trySearch: "Try searching for something else",
      remember: "Remember:",
      rememberDesc: "This guide provides general information only. Always consult a healthcare professional.",
      common: "Common",
      serious: "Serious"
    },
    symptomsDb: {
      headache: { name: "Headache", selfCare: "Rest in a quiet, dark room. Stay hydrated.", otc: "Paracetamol or Ibuprofen", seeDoctor: "If severe, sudden, or with fever/stiff neck", emergency: "Sudden thunderclap headache, or after head injury" },
      fever: { name: "Fever", selfCare: "Rest and drink fluids. Light clothing.", otc: "Paracetamol or Ibuprofen", seeDoctor: "Fever above 103°F or lasts >3 days", emergency: "Fever with severe headache, breathing difficulty" },
      cough: { name: "Cough", selfCare: "Stay hydrated. Use honey. Humidify air.", otc: "Cough suppressants", seeDoctor: "Lasts >3 weeks, coughing blood", emergency: "Severe breathing difficulty, chest pain" },
      soreThroat: { name: "Sore Throat", selfCare: "Gargle salt water. Throat lozenges.", otc: "Pain relievers, lozenges", seeDoctor: "Lasts >1 week, difficulty swallowing", emergency: "Severe difficulty swallowing or breathing" },
      nausea: { name: "Nausea/Vomiting", selfCare: "Sip clear fluids. Bland foods. Rest.", otc: "Anti-nausea meds (consult doctor)", seeDoctor: "Persistent >24hrs, dehydration", emergency: "Vomiting blood, severe chest pain" },
      diarrhea: { name: "Diarrhea", selfCare: "Stay hydrated. BRAT diet.", otc: "Anti-diarrheal meds (avoid if fever)", seeDoctor: "Lasts >2 days, bloody stool, fever", emergency: "Severe dehydration, bloody diarrhea" },
      cold: { name: "Cold/Runny Nose", selfCare: "Rest, stay hydrated, saline spray.", otc: "Decongestants, antihistamines", seeDoctor: "Lasts >10 days, high fever", emergency: "Difficulty breathing" },
      allergies: { name: "Allergies", selfCare: "Avoid triggers, shower after outdoors.", otc: "Antihistamines (Zyrtec, Claritin)", seeDoctor: "Not controlled by meds", emergency: "Difficulty breathing, face swelling" },
      backPain: { name: "Back Pain", selfCare: "Apply heat/ice. Gentle stretches.", otc: "Ibuprofen or acetaminophen", seeDoctor: "Lasts >2 weeks, pain radiating down legs", emergency: "Sudden severe pain, loss of bladder control" },
      chestPain: { name: "Chest Pain", selfCare: "Do NOT attempt self-care", otc: "Do not self-medicate", seeDoctor: "ANY chest pain must be evaluated", emergency: "Severe pressure, pain spreading to arm/jaw -> CALL 108" }
    }
  },
  hi: {
    sg: {
      selfCare: "स्व-देखभाल:",
      otc: "ओटीसी (OTC) दवाएं:",
      seeDoctor: "डॉक्टर को दिखाएं यदि:",
      emergency: "आपातकाल - 108 कॉल करें:",
      noSymptoms: "कोई लक्षण नहीं मिला",
      trySearch: "कुछ और खोजने का प्रयास करें",
      remember: "याद रखें:",
      rememberDesc: "यह मार्गदर्शिका केवल सामान्य जानकारी देती है। हमेशा डॉक्टर से सलाह लें।",
      common: "सामान्य",
      serious: "गंभीर"
    },
    symptomsDb: {
      headache: { name: "सिरदर्द", selfCare: "शांत, अंधेरे कमरे में आराम करें। हाइड्रेटेड रहें।", otc: "पैरासिटामोल या इबुप्रोफेन", seeDoctor: "यदि गंभीर, अचानक, या बुखार/अकड़न के साथ हो", emergency: "अचानक भयानक सिरदर्द, या सिर की चोट के बाद" },
      fever: { name: "बुखार", selfCare: "आराम करें और तरल पदार्थ पिएं। हल्के कपड़े पहनें।", otc: "पैरासिटामोल या इबुप्रोफेन", seeDoctor: "103°F से अधिक बुखार या >3 दिन तक रहे", emergency: "गंभीर सिरदर्द, सांस लेने में कठिनाई के साथ बुखार" },
      cough: { name: "खांसी", selfCare: "हाइड्रेटेड रहें। शहद का प्रयोग करें।", otc: "खांसी सिरप", seeDoctor: ">3 सप्ताह तक रहे, खून के साथ खांसी", emergency: "सांस लेने में भारी कठिनाई, सीने में दर्द" },
      soreThroat: { name: "गले में खराश", selfCare: "नमक के पानी से गरारे करें।", otc: "दर्द निवारक, लोजेंजेस", seeDoctor: ">1 सप्ताह तक रहे, निगलने में कठिनाई", emergency: "निगलने या सांस लेने में भारी कठिनाई" },
      nausea: { name: "मतली/उल्टी", selfCare: "तरल पदार्थ घूंट-घूंट पिएं। हल्का भोजन। आराम करें।", otc: "उल्टी-रोधी दवाएं (डॉक्टर से पूछें)", seeDoctor: ">24 घंटे तक लगातार उल्टी, निर्जलीकरण", emergency: "खून की उल्टी, गंभीर सीने में दर्द" },
      diarrhea: { name: "दस्त", selfCare: "हाइड्रेटेड रहें। हल्का भोजन करें।", otc: "दस्त-रोधी दवाएं (बुखार हो तो बचें)", seeDoctor: ">2 दिन तक रहे, मल में खून, बुखार", emergency: "गंभीर निर्जलीकरण, खूनी दस्त" },
      cold: { name: "सर्दी/बहती नाक", selfCare: "आराम, पानी पिएं, सलाइन स्प्रे।", otc: "डिकन्जेस्टेंट्स, एंटीहिस्टामाइन्स", seeDoctor: ">10 दिन तक रहे, तेज बुखार", emergency: "सांस लेने में कठिनाई" },
      allergies: { name: "एलर्जी", selfCare: "एलर्जन से बचें, बाहर के बाद नहाएं।", otc: "एंटीहिस्टामाइन्स (ज़िर्टेक, क्लैरिटिन)", seeDoctor: "दवाओं से नियंत्रित न हो", emergency: "सांस लेने में कठिनाई, चेहरे पर सूजन" },
      backPain: { name: "पीठ दर्द", selfCare: "गर्म/ठंडा सेक लगाएं। हल्का स्ट्रेच।", otc: "इबुप्रोफेन या एसिटामिनोफेन", seeDoctor: ">2 सप्ताह तक रहे, पैरों में दर्द", emergency: "अचानक भयंकर दर्द, मूत्राशय नियंत्रण खोना" },
      chestPain: { name: "सीने में दर्द", selfCare: "स्वयं-उपचार न करें", otc: "स्वयं-दवा न करें", seeDoctor: "किसी भी सीने के दर्द की जांच होनी चाहिए", emergency: "गंभीर दबाव, बांह/जबड़े तक दर्द -> तुरंत 108 कॉल करें" }
    }
  },
  mr: {
    sg: {
      selfCare: "स्वतःची काळजी:",
      otc: "ओटीसी (OTC) औषधे:",
      seeDoctor: "डॉक्टरांचा सल्ला घ्या जर:",
      emergency: "आणीबाणी - १०८ वर कॉल करा:",
      noSymptoms: "कोणतीही लक्षणे आढळली नाहीत",
      trySearch: "काहीतरी वेगळे शोधण्याचा प्रयत्न करा",
      remember: "लक्षात ठेवा:",
      rememberDesc: "हे मार्गदर्शक केवळ सामान्य माहिती प्रदान करते. नेहमी डॉक्टरांचा सल्ला घ्या.",
      common: "सामान्य",
      serious: "गंभीर"
    },
    symptomsDb: {
      headache: { name: "डोकेदुखी", selfCare: "शांत, अंधाऱ्या खोलीत विश्रांती घ्या. भरपूर पाणी प्या.", otc: "पॅरासिटामोल किंवा इबुप्रोफेन", seeDoctor: "जर तीव्र, अचानक, किंवा तापासोबत असेल", emergency: "अचानक भयंकर डोकेदुखी, किंवा डोक्याच्या दुखापतीनंतर" },
      fever: { name: "ताप", selfCare: "विश्रांती घ्या आणि द्रव पदार्थ प्या. हलके कपडे घाला.", otc: "पॅरासिटामोल किंवा इबुप्रोफेन", seeDoctor: "४०°C (१०३°F) पेक्षा जास्त ताप किंवा >३ दिवस राहिल्यास", emergency: "तीव्र डोकेदुखी, श्वास घेण्यास त्रास यासह ताप" },
      cough: { name: "खोकला", selfCare: "भरपूर पाणी प्या. मधाचा वापर करा.", otc: "खोकल्याची औषधे", seeDoctor: ">३ आठवडे राहिल्यास, खोकल्यातून रक्त आल्यास", emergency: "श्वास घेण्यास तीव्र त्रास, छातीत दुखणे" },
      soreThroat: { name: "घसा खवखवणे", selfCare: "मिठाच्या पाण्याने गुळण्या करा.", otc: "वेदना निवारक", seeDoctor: ">१ आठवडा राहिल्यास, गिळण्यास त्रास", emergency: "गिळण्यास किंवा श्वास घेण्यास तीव्र त्रास" },
      nausea: { name: "मळमळ/उलट्या", selfCare: "थोडे-थोडे द्रव प्या. हलका आहार. विश्रांती.", otc: "उलट्यांवरील औषधे (डॉक्टरांना विचारा)", seeDoctor: "सतत >२४ तास उलट्या, निर्जलीकरण", emergency: "रक्ताची उलटी, छातीत तीव्र वेदना" },
      diarrhea: { name: "जुलाब", selfCare: "भरपूर पाणी प्या. हलका आहार घ्या.", otc: "जुलाबावरील औषधे (ताप असल्यास टाळा)", seeDoctor: ">२ दिवस राहिल्यास, रक्तरंजित शौच, ताप", emergency: "तीव्र निर्जलीकरण, रक्तरंजित जुलाब" },
      cold: { name: "सर्दी/वाहते नाक", selfCare: "विश्रांती, पाणी पिणे.", otc: "डीकंजेस्टंट्स, ऍन्टीहिस्टामाइन्स", seeDoctor: ">१० दिवस राहिल्यास, तीव्र ताप", emergency: "श्वास घेण्यास त्रास" },
      allergies: { name: "ऍलर्जी", selfCare: "कारणे टाळा, बाहेरून आल्यावर आंघोळ करा.", otc: "ऍन्टीहिस्टामाइन्स", seeDoctor: "औषधांनी नियंत्रित न झाल्यास", emergency: "श्वास घेण्यास त्रास, चेहऱ्याला सूज" },
      backPain: { name: "पाठदुखी", selfCare: "गरम/थंड शेक द्या. हलके व्यायाम.", otc: "इबुप्रोफेन किंवा ऍसिटामिनोफेन", seeDoctor: ">२ आठवडे राहिल्यास, पायात वेदना", emergency: "अचानक भयंकर वेदना, मूत्राशयावर नियंत्रण नसणे" },
      chestPain: { name: "छातीत दुखणे", selfCare: "स्वतः उपचार करू नका", otc: "स्वतः औषध घेऊ नका", seeDoctor: "कोणत्याही छातीतील वेदना तपासल्या पाहिजेत", emergency: "तीव्र दाब, हात/जबड्यापर्यंत वेदना -> लगेच १०८ वर कॉल करा" }
    }
  }
};

['en', 'hi', 'mr'].forEach(lang => {
  const filePath = path.join(localesPath, `${lang}.json`);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  content.sg = symptomData[lang].sg;
  content.symptomsDb = symptomData[lang].symptomsDb;
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
});
console.log('JSON updated successfully');
