import express from 'express';
import { register, login, me } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';
import { registerValidation, handleValidationErrors } from '../middleware/validateRegister.js';

const router = express.Router();

router.post('/register', registerValidation, handleValidationErrors, register);
router.post('/login', login);
router.get('/me', protect, me);

export default router;
