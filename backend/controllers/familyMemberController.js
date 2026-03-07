import FamilyMember from '../models/FamilyMember.js';

export const getFamilyMembers = async (req, res) => {
  try {
    const members = await FamilyMember.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFamilyMemberById = async (req, res) => {
  try {
    const member = await FamilyMember.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Family member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createFamilyMember = async (req, res) => {
  try {
    const member = new FamilyMember(req.body);
    await member.save();
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFamilyMember = async (req, res) => {
  try {
    const member = await FamilyMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!member) {
      return res.status(404).json({ message: 'Family member not found' });
    }
    res.json(member);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFamilyMember = async (req, res) => {
  try {
    const member = await FamilyMember.findByIdAndDelete(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Family member not found' });
    }
    res.json({ message: 'Family member deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
