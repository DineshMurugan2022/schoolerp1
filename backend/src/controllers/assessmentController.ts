import { Request, Response } from 'express';
import Assessment from '../models/Assessment';

// @desc    Get all assessments
// @route   GET /api/assessments
// @access  Private
export const getAssessments = async (req: Request, res: Response) => {
  try {
    const assessments = await Assessment.find()
      .sort({ date: -1 })
      .populate('childId', 'firstName lastName grade')
      .populate('createdBy', 'firstName lastName');
    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Create an assessment
// @route   POST /api/assessments
// @access  Private (Teacher/Admin)
export const createAssessment = async (req: Request, res: Response) => {
  try {
    const createdBy = req.user?.id;
    if (!createdBy) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const assessment = await Assessment.create({ ...req.body, createdBy });
    res.status(201).json(assessment);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};
