import express from 'express';
import {
  getMedications,
  createMedication,
  deleteMedication,
  updateMedication,
} from '../controllers/medicationController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.get('/', getMedications);
router.post('/', createMedication);
router.delete('/:id', deleteMedication);
router.patch('/:id', updateMedication);

export default router;
