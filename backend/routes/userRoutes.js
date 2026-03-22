import express from 'express';
import { saveFcmToken } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/save-token', protect, saveFcmToken);

export default router;
