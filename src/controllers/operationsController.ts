import { Request, Response } from 'express';
import Transport from '../models/Transport';
import HealthLog from '../models/HealthLog';
import { getIO } from '../socket';

// @desc    Get all transport logs
// @route   GET /api/operations/transport
export const getTransportLogs = async (req: Request, res: Response) => {
  try {
    const logs = await Transport.find()
      .sort({ date: -1 })
      .populate('studentId', 'firstName lastName')
      .populate('loggedBy', 'firstName lastName');
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Log a transport/pickup event
// @route   POST /api/operations/transport
export const createTransportLog = async (req: Request, res: Response) => {
  try {
    const loggedBy = req.user?.id;
    if (!loggedBy) return res.status(401).json({ message: 'User not authenticated' });
    const log = await Transport.create({ ...req.body, loggedBy });
    
    // Emit notification
    const io = getIO();
    io.emit('notification', {
      title: 'Pickup Update',
      message: `A transport event was logged for student ${log.studentId} (${log.status})`,
      type: 'transport',
      timestamp: new Date()
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

// @desc    Get all health logs
// @route   GET /api/operations/health
export const getHealthLogs = async (req: Request, res: Response) => {
  try {
    const logs = await HealthLog.find()
      .sort({ date: -1 })
      .populate('studentId', 'firstName lastName')
      .populate('loggedBy', 'firstName lastName');
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Create a health log
// @route   POST /api/operations/health
export const createHealthLog = async (req: Request, res: Response) => {
  try {
    const loggedBy = req.user?.id;
    if (!loggedBy) return res.status(401).json({ message: 'User not authenticated' });
    const log = await HealthLog.create({ ...req.body, loggedBy });
    
    // Emit notification if feverish or allergy alert
    if (log.temperature >= 99 || log.allergiesAlert) {
      const io = getIO();
      io.emit('notification', {
        title: 'Health Alert ⚠️',
        message: `Health update for student ${log.studentId}: ${log.temperature >= 99 ? 'Fever detected.' : 'Allergy alert.'}`,
        type: 'health',
        timestamp: new Date()
      });
    }

    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};
