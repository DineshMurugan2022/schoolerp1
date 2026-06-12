import express from 'express';
import { 
  getTransportLogs, createTransportLog, updateTransportLog, deleteTransportLog,
  getHealthLogs, createHealthLog, updateHealthLog, deleteHealthLog 
} from '../controllers/operationsController';
import { protect, authorize } from '../middleware/auth';

const router = express.Router();

const staffAuth = [protect, authorize('Admin', 'Teacher', 'SuperAdmin')];

router.get('/transport', staffAuth, getTransportLogs);
router.post('/transport', staffAuth, createTransportLog);
router.put('/transport/:id', staffAuth, updateTransportLog);
router.delete('/transport/:id', staffAuth, deleteTransportLog);

router.get('/health', staffAuth, getHealthLogs);
router.post('/health', staffAuth, createHealthLog);
router.put('/health/:id', staffAuth, updateHealthLog);
router.delete('/health/:id', staffAuth, deleteHealthLog);

export default router;
