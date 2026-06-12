import { Request, Response } from 'express';
import LeaveRequest from '../models/LeaveRequest';

// @desc    Get all leave requests
// @route   GET /api/leaves
export const getLeaves = async (req: Request, res: Response) => {
  try {
    const leaves = await LeaveRequest.find()
      .populate('userId', 'firstName lastName email designation')
      .sort({ createdAt: -1 });
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Create a leave request
// @route   POST /api/leaves
export const createLeave = async (req: Request, res: Response) => {
  try {
    const { userId, startDate, endDate, reason } = req.body;
    
    // Fallback to logged-in user if userId not provided
    const requestedUserId = userId || req.user?.id;
    
    if (!requestedUserId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const leave = await LeaveRequest.create({
      userId: requestedUserId,
      startDate,
      endDate,
      reason,
      status: 'Pending'
    });
    
    res.status(201).json(leave);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

// @desc    Update leave request status
// @route   PUT /api/leaves/:id
export const updateLeaveStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const isAdmin = req.user?.role === 'Admin' || req.user?.role === 'SuperAdmin';
    
    if (!isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update leave status' });
    }

    const leave = await LeaveRequest.findByIdAndUpdate(
      req.params.id, 
      { status }, 
      { new: true }
    ).populate('userId', 'firstName lastName');
    
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });
    
    res.json(leave);
  } catch (error) {
    res.status(400).json({ message: 'Error updating leave', error });
  }
};
