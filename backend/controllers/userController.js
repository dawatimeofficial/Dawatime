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
