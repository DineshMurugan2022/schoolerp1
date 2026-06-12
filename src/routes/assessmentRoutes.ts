import express from 'express';
import { getAssessments, createAssessment } from '../controllers/assessmentController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', protect, getAssessments);
router.post('/', protect, authorize('Admin', 'Teacher', 'SuperAdmin'), createAssessment);

export default router;
