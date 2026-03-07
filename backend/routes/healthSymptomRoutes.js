import express from 'express';
import {
  getHealthSymptoms,
  getHealthSymptomById,
  createHealthSymptom,
  updateHealthSymptom,
  deleteHealthSymptom,
} from '../controllers/healthSymptomController.js';

const router = express.Router();

router.route('/').get(getHealthSymptoms).post(createHealthSymptom);
router
  .route('/:id')
  .get(getHealthSymptomById)
  .put(updateHealthSymptom)
  .delete(deleteHealthSymptom);

export default router;
