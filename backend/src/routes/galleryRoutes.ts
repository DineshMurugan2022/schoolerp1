import express from 'express';
import { getAll, create, update, remove } from '../controllers/galleryController';
import { protect } from '../middleware/auth';

const router = express.Router();

router.use(protect);
router.route('/').get(getAll).post(create);
router.route('/:id').put(update).delete(remove);

export default router;
