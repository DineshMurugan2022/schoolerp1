import express from 'express';
import { getClasses, createClass, getSections, createSection } from '../controllers/classController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(authorize('SuperAdmin', 'Admin', 'Principal', 'Teacher'), getClasses)
  .post(authorize('SuperAdmin', 'Admin', 'Principal'), createClass);

router.route('/:classId/sections')
  .get(authorize('SuperAdmin', 'Admin', 'Principal', 'Teacher'), getSections)
  .post(authorize('SuperAdmin', 'Admin', 'Principal'), createSection);

export default router;
