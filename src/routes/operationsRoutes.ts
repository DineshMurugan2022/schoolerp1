import express from 'express';
import { getTransportLogs, createTransportLog, getHealthLogs, createHealthLog } from '../controllers/operationsController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

const staffAuth = [protect, authorize('Admin', 'Teacher', 'SuperAdmin')];

router.get('/transport', staffAuth, getTransportLogs);
router.post('/transport', staffAuth, createTransportLog);

router.get('/health', staffAuth, getHealthLogs);
router.post('/health', staffAuth, createHealthLog);

export default router;
