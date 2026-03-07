import MedicationReminder from '../models/MedicationReminder.js';

export const getMedicationReminders = async (req, res) => {
  try {
    const { familyMemberId, isActive } = req.query;
    const filter = {};
    if (familyMemberId) filter.familyMemberId = familyMemberId;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const reminders = await MedicationReminder.find(filter)
      .populate('familyMemberId', 'name relationship')
      .sort({ createdAt: -1 });
    res.json(reminders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMedicationReminderById = async (req, res) => {
  try {
    const reminder = await MedicationReminder.findById(req.params.id).populate(
      'familyMemberId',
      'name relationship'
    );
    if (!reminder) {
      return res.status(404).json({ message: 'Medication reminder not found' });
    }
    res.json(reminder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createMedicationReminder = async (req, res) => {
  try {
    const reminder = new MedicationReminder(req.body);
    await reminder.save();
    const populated = await MedicationReminder.findById(reminder._id).populate(
      'familyMemberId',
      'name relationship'
    );
    res.status(201).json(populated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateMedicationReminder = async (req, res) => {
  try {
    const reminder = await MedicationReminder.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('familyMemberId', 'name relationship');

    if (!reminder) {
      return res.status(404).json({ message: 'Medication reminder not found' });
    }
    res.json(reminder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMedicationReminder = async (req, res) => {
  try {
    const reminder = await MedicationReminder.findByIdAndDelete(req.params.id);
    if (!reminder) {
      return res.status(404).json({ message: 'Medication reminder not found' });
    }
    res.json({ message: 'Medication reminder deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
