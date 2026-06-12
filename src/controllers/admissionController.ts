import { Request, Response } from 'express';
import Admission from '../models/Admission';

// @desc    Get all admissions
// @route   GET /api/admissions
// @access  Private/Admin/Receptionist
export const getAdmissions = async (req: Request, res: Response) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Create an enquiry/admission
// @route   POST /api/admissions
// @access  Public (or Private depending on flow)
export const createAdmission = async (req: Request, res: Response) => {
  try {
    const admission = await Admission.create(req.body);
    res.status(201).json(admission);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

// @desc    Update admission status/details
// @route   PUT /api/admissions/:id
// @access  Private/Admin/Receptionist
export const updateAdmission = async (req: Request, res: Response) => {
  try {
    const admission = await Admission.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    
    res.status(200).json(admission);
  } catch (error) {
    res.status(400).json({ message: 'Invalid update data', error });
  }
};
