import express from 'express';
import {
  getFamilyMembers,
  getFamilyMemberById,
  createFamilyMember,
  updateFamilyMember,
  deleteFamilyMember,
} from '../controllers/familyMemberController.js';

const router = express.Router();

router.route('/').get(getFamilyMembers).post(createFamilyMember);
router
  .route('/:id')
  .get(getFamilyMemberById)
  .put(updateFamilyMember)
  .delete(deleteFamilyMember);

export default router;
