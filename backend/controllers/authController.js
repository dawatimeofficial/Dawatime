import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import Otp from '../models/Otp.js';
import { generateOtp, otpExpiresAt } from '../utils/otp.js';
import { sendOtpEmail } from '../utils/email.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES = process.env.JWT_EXPIRES || '7d';

const ensureJwtSecret = () => {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not set');
  }
};

const signToken = (id) => {
  ensureJwtSecret();
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });
};

const normalizePhone = (phone) => phone?.toString().trim();
const normalizeEmail = (email) => email?.toString().trim().toLowerCase();

export const sendOtp = async (req, res) => {
  try {
    const phone = normalizePhone(req.body.phone);
    if (!phone) return res.status(400).json({ error: 'Phone is required' });

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ error: 'No account found for this phone. Please register.' });

    // rate limit: 1 per 30s per user
    if (user.lastOtpSentAt && Date.now() - user.lastOtpSentAt.getTime() < 30_000) {
      return res.status(429).json({ error: 'Please wait before requesting another OTP' });
    }

    const otp = generateOtp();
    const expiresAt = otpExpiresAt(5);

    await Otp.deleteMany({ email: user.email });
    await Otp.create({ email: user.email, otp, expiresAt });
    user.lastOtpSentAt = new Date();
    await user.save();

    await sendOtpEmail({ to: user.email, otp });
    console.log(`[EMAIL OTP] Sent OTP to ${user.email} for phone ${phone}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const phone = normalizePhone(req.body.phone);
    const otp = req.body.otp?.toString().trim();
    if (!phone || !otp) return res.status(400).json({ error: 'Phone and OTP are required' });

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ error: 'No account found for this phone. Please register.' });

    const record = await Otp.findOne({ email: user.email, otp });
    if (!record) return res.status(400).json({ error: 'Invalid OTP' });
    if (record.expiresAt < new Date()) return res.status(400).json({ error: 'OTP expired' });

    // one-time use
    await Otp.deleteMany({ email: user.email });

    ensureJwtSecret();
    const token = signToken(user._id);
    res.json({ token, user: { id: user._id.toString(), phone: user.phone, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const register = async (req, res) => {
  try {
    const phone = normalizePhone(req.body.phone);
    const email = normalizeEmail(req.body.email);
    if (!phone || !email) return res.status(400).json({ error: 'Phone and email are required' });

    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ error: 'Email already registered' });
    const existingPhone = await User.findOne({ phone });
    if (existingPhone) return res.status(400).json({ error: 'Phone already registered' });

    const user = await User.create({ phone, email });
    res.status(201).json({ user: { id: user._id.toString(), phone: user.phone, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      id: user._id.toString(),
      email: user.email,
      phone: user.phone,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { register, sendOtp, verifyOtp, me };
