import { Request, Response } from 'express';
import Curriculum from '../models/Curriculum';

// @desc    Get all curriculums
// @route   GET /api/curriculum
// @access  Private
export const getCurriculums = async (req: Request, res: Response) => {
  try {
    const curriculums = await Curriculum.find().sort({ weekStartDate: -1 }).populate('createdBy', 'firstName lastName');
    res.status(200).json(curriculums);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Create a curriculum plan
// @route   POST /api/curriculum
// @access  Private (Teacher/Admin)
export const createCurriculum = async (req: Request, res: Response) => {
  try {
    const createdBy = req.user?.id; 
    if (!createdBy) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const curriculum = await Curriculum.create({ ...req.body, createdBy });
    res.status(201).json(curriculum);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};
