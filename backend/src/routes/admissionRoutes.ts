import express from 'express';
import { getAdmissions, createAdmission, updateAdmission } from '../controllers/admissionController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

// Public route for parents submitting enquiries online
router.post('/', createAdmission);

// Protected routes for staff — any authenticated user can view and update admissions
const staffAuth = [protect, authorize('Admin', 'Receptionist', 'SuperAdmin')];

router.get('/', staffAuth, getAdmissions);
router.put('/:id', staffAuth, updateAdmission);

export default router;
