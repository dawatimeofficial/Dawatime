import User from '../models/User.js';

export const saveFcmToken = async (req, res) => {
  try {
    const { fcmToken } = req.body;
    if (!fcmToken) return res.status(400).json({ error: 'Token is required' });

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { fcmToken },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.json({ success: true, fcmToken: user.fcmToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addFamily = async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ error: 'Phone number is required' });

    // Find the user to add by phone
    const memberToAdd = await User.findOne({ phone: phone.trim() });
    if (!memberToAdd) {
      return res.status(404).json({ error: 'No registered user found with that phone number' });
    }

    // Prevent self-add
    if (memberToAdd._id.toString() === req.user.id) {
      return res.status(400).json({ error: 'You cannot add yourself as a family member' });
    }

    // Prevent duplicates
    const currentUser = await User.findById(req.user.id);
    if (currentUser.familyMembers.some((id) => id.toString() === memberToAdd._id.toString())) {
      return res.status(400).json({ error: 'This person is already in your family list' });
    }

    currentUser.familyMembers.push(memberToAdd._id);
    await currentUser.save();

    // Return the added member's public info
    res.status(201).json({
      id: memberToAdd._id.toString(),
      name: memberToAdd.name,
      phone: memberToAdd.phone,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getFamily = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate('familyMembers', 'name phone email');
    const family = user.familyMembers.map((m) => ({
      id: m._id.toString(),
      name: m.name,
      phone: m.phone,
      email: m.email,
    }));
    res.json(family);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeFamily = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const memberId = req.params.id;

    const index = user.familyMembers.findIndex((id) => id.toString() === memberId);
    if (index === -1) {
      return res.status(404).json({ error: 'Family member not found' });
    }

    user.familyMembers.splice(index, 1);
    await user.save();

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
