import express from 'express';
import { getLeaves, createLeave, updateLeaveStatus } from '../controllers/leaveController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getLeaves)
  .post(createLeave);

router.route('/:id')
  .put(updateLeaveStatus);

export default router;
