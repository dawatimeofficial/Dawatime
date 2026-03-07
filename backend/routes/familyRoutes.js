import express from 'express';
import {
  getFamily,
  createFamilyMember,
  deleteFamilyMember,
} from '../controllers/familyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);
router.get('/', getFamily);
router.post('/', createFamilyMember);
router.delete('/:id', deleteFamilyMember);

export default router;
