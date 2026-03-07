import Medication from '../models/Medication.js';

export const getMedications = async (req, res) => {
  try {
    const medications = await Medication.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(medications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createMedication = async (req, res) => {
  try {
    const medication = await Medication.create({ ...req.body, userId: req.user.id });
    res.status(201).json(medication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteMedication = async (req, res) => {
  try {
    const deleted = await Medication.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ error: 'Medication not found' });
    res.json(deleted);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateMedication = async (req, res) => {
  try {
    const medication = await Medication.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!medication) return res.status(404).json({ error: 'Medication not found' });
    res.json(medication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
