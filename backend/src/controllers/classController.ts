import { Request, Response } from 'express';
import Class from '../models/Class';
import Section from '../models/Section';

// Get all classes
export const getClasses = async (req: Request, res: Response): Promise<void> => {
  try {
    const classes = await Class.find()
      .populate('classTeacher', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json(classes);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching classes' });
  }
};

// Create a class
export const createClass = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, classTeacher } = req.body;
    const newClass = await Class.create({ name, description, classTeacher });
    res.status(201).json(newClass);
  } catch (error) {
    res.status(400).json({ message: 'Invalid class data or duplicate name' });
  }
};

// Get sections for a class
export const getSections = async (req: Request, res: Response): Promise<void> => {
  try {
    const { classId } = req.params;
    const sections = await Section.find({ classId }).populate('teacherId', 'firstName lastName email').sort({ name: 1 });
    res.json(sections);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching sections' });
  }
};

// Create a section
export const createSection = async (req: Request, res: Response): Promise<void> => {
  try {
    const { classId } = req.params;
    const { name, teacherId, capacity } = req.body;
    const section = await Section.create({
      name,
      classId: classId as string,
      teacherId: teacherId || undefined,
      capacity: capacity || 30
    });
    res.status(201).json(section);
  } catch (error) {
    res.status(400).json({ message: 'Invalid section data or duplicate name in class' });
  }
};
