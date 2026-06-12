import express from 'express';
import { getDailyDiaries, saveDailyDiary } from '../controllers/dailyDiaryController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(protect, getDailyDiaries)
  .post(protect, authorize('Admin', 'Teacher', 'SuperAdmin'), saveDailyDiary);

export default router;
