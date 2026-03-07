import HealthSymptom from '../models/HealthSymptom.js';

export const getHealthSymptoms = async (req, res) => {
  try {
    const { familyMemberId } = req.query;
    const filter = familyMemberId ? { familyMemberId } : {};

    const symptoms = await HealthSymptom.find(filter)
      .populate('familyMemberId', 'name relationship')
      .sort({ occurredAt: -1 });
    res.json(symptoms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getHealthSymptomById = async (req, res) => {
  try {
    const symptom = await HealthSymptom.findById(req.params.id).populate(
      'familyMemberId',
      'name relationship'
    );
    if (!symptom) {
      return res.status(404).json({ message: 'Health symptom not found' });
    }
    res.json(symptom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHealthSymptom = async (req, res) => {
  try {
    const symptom = new HealthSymptom(req.body);
    await symptom.save();
    const populated = await HealthSymptom.findById(symptom._id).populate(
      'familyMemberId',
      'name relationship'
    );
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateHealthSymptom = async (req, res) => {
  try {
    const symptom = await HealthSymptom.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('familyMemberId', 'name relationship');

    if (!symptom) {
      return res.status(404).json({ message: 'Health symptom not found' });
    }
    res.json(symptom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteHealthSymptom = async (req, res) => {
  try {
    const symptom = await HealthSymptom.findByIdAndDelete(req.params.id);
    if (!symptom) {
      return res.status(404).json({ message: 'Health symptom not found' });
    }
    res.json({ message: 'Health symptom deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
