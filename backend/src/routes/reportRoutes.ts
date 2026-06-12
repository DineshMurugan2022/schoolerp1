import express from 'express';
import { getFeeDefaulters, getAdmissionAnalytics, getAttendanceSummary } from '../controllers/reportController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.get('/fee-defaulters', getFeeDefaulters);
router.get('/admissions', getAdmissionAnalytics);
router.get('/attendance', getAttendanceSummary);

export default router;
