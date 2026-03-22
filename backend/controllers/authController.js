import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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

export const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'Name, email, phone, and password are required' });
    }

    const normalizedEmail = normalizeEmail(email);
    const normalizedPhone = normalizePhone(phone);

    const existingEmail = await User.findOne({ email: normalizedEmail });
    if (existingEmail) return res.status(400).json({ error: 'Email already registered' });
    
    const existingPhone = await User.findOne({ phone: normalizedPhone });
    if (existingPhone) return res.status(400).json({ error: 'Phone already registered' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email: normalizedEmail,
      phone: normalizedPhone,
      password: hashedPassword,
    });

    ensureJwtSecret();
    const token = signToken(user._id);

    res.status(201).json({ token, user: { id: user._id.toString(), name: user.name, phone: user.phone, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const normalizedEmail = normalizeEmail(email);

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return res.status(404).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    ensureJwtSecret();
    const token = signToken(user._id);
    
    res.json({ token, user: { id: user._id.toString(), name: user.name, phone: user.phone, email: user.email, fcmToken: user.fcmToken } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone,
      fcmToken: user.fcmToken,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { register, login, me };
