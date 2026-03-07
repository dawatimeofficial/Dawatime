import express from 'express';
import {
  getMedicationReminders,
  getMedicationReminderById,
  createMedicationReminder,
  updateMedicationReminder,
  deleteMedicationReminder,
} from '../controllers/medicationReminderController.js';

const router = express.Router();

router.route('/').get(getMedicationReminders).post(createMedicationReminder);
router
  .route('/:id')
  .get(getMedicationReminderById)
  .put(updateMedicationReminder)
  .delete(deleteMedicationReminder);

export default router;
