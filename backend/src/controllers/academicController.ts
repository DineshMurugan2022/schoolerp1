import { Request, Response } from 'express';
import Subject from '../models/Subject';
import TimeTable from '../models/TimeTable';

// --- SUBJECTS ---

// @desc    Get all subjects
// @route   GET /api/academic/subjects
export const getSubjects = async (req: Request, res: Response) => {
  try {
    const subjects = await Subject.find().sort({ name: 1 });
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Create a subject
// @route   POST /api/academic/subjects
export const createSubject = async (req: Request, res: Response) => {
  try {
    const { name, description, colorCode } = req.body;
    const subject = await Subject.create({ name, description, colorCode });
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data or duplicate subject name', error });
  }
};

// @desc    Delete a subject
// @route   DELETE /api/academic/subjects/:id
export const deleteSubject = async (req: Request, res: Response) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) return res.status(404).json({ message: 'Subject not found' });
    res.json({ message: 'Subject removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// --- TIMETABLES ---

// @desc    Get timetables for a specific class
// @route   GET /api/academic/timetables/:classId
export const getTimeTables = async (req: Request, res: Response) => {
  try {
    const timetables = await TimeTable.find({ classId: req.params.classId })
      .populate('periods.subjectId')
      .populate('periods.teacherId', 'firstName lastName');
    res.json(timetables);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Save/Update timetable for a specific class and day
// @route   POST /api/academic/timetables
export const saveTimeTable = async (req: Request, res: Response) => {
  try {
    const { classId, dayOfWeek, periods } = req.body;

    let timetable = await TimeTable.findOne({ classId, dayOfWeek });

    if (timetable) {
      timetable.periods = periods;
      await timetable.save();
    } else {
      timetable = await TimeTable.create({ classId, dayOfWeek, periods });
    }

    // Return populated
    const populated = await TimeTable.findById(timetable._id)
      .populate('periods.subjectId')
      .populate('periods.teacherId', 'firstName lastName');

    res.status(200).json(populated);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};
