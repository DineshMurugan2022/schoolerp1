import express from 'express';
import { getFees, createFee, updateFee, getExpenses, createExpense } from '../controllers/financeController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Only Admins can manage finance
const adminAuth = [protect, authorize('Admin', 'SuperAdmin')];

router.get('/fees', adminAuth, getFees);
router.post('/fees', adminAuth, createFee);
router.put('/fees/:id', adminAuth, updateFee);

router.get('/expenses', adminAuth, getExpenses);
router.post('/expenses', adminAuth, createExpense);

export default router;
