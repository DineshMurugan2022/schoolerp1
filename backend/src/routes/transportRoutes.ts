import express from 'express';
import { getRoutes, createRoute, updateRoute, deleteRoute, getRouteStudents } from '../controllers/transportController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);

router.route('/')
  .get(getRoutes)
  .post(createRoute);

router.route('/:id')
  .put(updateRoute)
  .delete(deleteRoute);

router.route('/:id/students')
  .get(getRouteStudents);

export default router;
