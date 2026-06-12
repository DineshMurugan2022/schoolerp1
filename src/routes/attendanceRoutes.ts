import express from 'express';
import { getAttendance, markAttendance } from '../controllers/attendanceController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

const staffAuth = [protect, authorize('Admin', 'Teacher', 'SuperAdmin')];

router.route('/')
  .get(protect, getAttendance)
  .post(staffAuth, markAttendance);

export default router;
