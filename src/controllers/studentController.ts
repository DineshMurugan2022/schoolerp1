import { Request, Response } from 'express';
import Student from '../models/Student';

// @desc    Get all students
// @route   GET /api/students
export const getStudents = async (req: Request, res: Response) => {
  try {
    let query: any = {};
    if (req.user?.role === 'Parent') {
      query.parentId = req.user.id;
    }
    const students = await Student.find(query).populate('parentId', 'firstName lastName email');
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a student
// @route   POST /api/students
export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: 'Invalid student data', error });
  }
};

// @desc    Update a student
// @route   PUT /api/students/:id
export const updateStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

// @desc    Delete a student
// @route   DELETE /api/students/:id
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }
    res.json({ message: 'Student removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
