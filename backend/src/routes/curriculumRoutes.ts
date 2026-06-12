import express from 'express';
import { getCurriculums, createCurriculum } from '../controllers/curriculumController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.get('/', protect, getCurriculums);
router.post('/', protect, authorize('Admin', 'Teacher', 'SuperAdmin'), createCurriculum);

export default router;
