import { Request, Response } from 'express';
import Fee from '../models/Fee';
import Expense from '../models/Expense';

// @desc    Get all fees
// @route   GET /api/finance/fees
export const getFees = async (req: Request, res: Response) => {
  try {
    const fees = await Fee.find().sort({ dueDate: 1 }).populate('studentId', 'firstName lastName');
    res.status(200).json(fees);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Create a fee record
// @route   POST /api/finance/fees
export const createFee = async (req: Request, res: Response) => {
  try {
    const fee = await Fee.create(req.body);
    res.status(201).json(fee);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

// @desc    Get all expenses
// @route   GET /api/finance/expenses
export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Record an expense
// @route   POST /api/finance/expenses
export const createExpense = async (req: Request, res: Response) => {
  try {
    const recordedBy = req.user?.id;
    if (!recordedBy) {
      return res.status(401).json({ message: 'User not authenticated' });
    }
    const expense = await Expense.create({ ...req.body, recordedBy });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

// @desc    Update a fee record
// @route   PUT /api/finance/fees/:id
export const updateFee = async (req: Request, res: Response) => {
  try {
    const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!fee) return res.status(404).json({ message: 'Fee record not found' });
    res.status(200).json(fee);
  } catch (error) {
    res.status(400).json({ message: 'Error updating fee', error });
  }
};
