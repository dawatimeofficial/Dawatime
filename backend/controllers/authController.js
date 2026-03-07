import User from '../models/User.js';
import jwt from 'jsonwebtoken';

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

export const register = async (req, res) => {
  try {
    ensureJwtSecret();
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res
        .status(400)
        .json({ error: 'Email already registered', errors: { email: 'Email already registered' } });
    }
    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    res.status(201).json({ token, user: { id: user._id.toString(), name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    ensureJwtSecret();
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    const user = await User.findOne({ email }).select('+password');
    if (!user) return res.status(401).json({ error: 'Invalid email or password' });
    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ error: 'Invalid email or password' });
    const token = signToken(user._id);
    res.json({ token, user: { id: user._id.toString(), name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ id: user._id.toString(), name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default { register, login, me };
