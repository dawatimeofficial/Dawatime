import FamilyMember from '../models/FamilyMember.js';
import Medication from '../models/Medication.js';

export const getFamily = async (req, res) => {
  try {
    const family = await FamilyMember.find({ userId: req.user.id }).sort({ createdAt: 1 });
    res.json(family);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createFamilyMember = async (req, res) => {
  try {
    const member = await FamilyMember.create({ ...req.body, userId: req.user.id });
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteFamilyMember = async (req, res) => {
  try {
    const member = await FamilyMember.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!member) return res.status(404).json({ error: 'Family member not found' });
    await Medication.updateMany(
      { userId: req.user.id },
      { $pull: { familyMemberIds: req.params.id } }
    );
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
