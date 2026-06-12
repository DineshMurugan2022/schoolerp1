import express from 'express';
import { getStudents, createStudent, updateStudent, deleteStudent } from '../controllers/studentController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

router.route('/')
  .get(protect, getStudents)
  .post(protect, authorize('Admin', 'SuperAdmin'), createStudent);

router.route('/:id')
  .put(protect, authorize('Admin', 'SuperAdmin'), updateStudent)
  .delete(protect, authorize('Admin', 'SuperAdmin'), deleteStudent);

export default router;
