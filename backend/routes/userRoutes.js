import express from 'express';
import { saveFcmToken, addFamily, getFamily, removeFamily } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/save-token', protect, saveFcmToken);
router.post('/add-family', protect, addFamily);
router.get('/family', protect, getFamily);
router.delete('/family/:id', protect, removeFamily);

export default router;
