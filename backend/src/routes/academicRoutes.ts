import express from 'express';
import { getSubjects, createSubject, deleteSubject, getTimeTables, saveTimeTable } from '../controllers/academicController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.route('/subjects')
  .get(getSubjects)
  .post(createSubject);

router.route('/subjects/:id')
  .delete(deleteSubject);

router.route('/timetables')
  .post(saveTimeTable);

router.route('/timetables/:classId')
  .get(getTimeTables);

export default router;
