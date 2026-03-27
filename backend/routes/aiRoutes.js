import express from 'express';
import { healthGuide } from '../controllers/aiController.js';

const router = express.Router();

router.post('/health-guide', healthGuide);

export default router;