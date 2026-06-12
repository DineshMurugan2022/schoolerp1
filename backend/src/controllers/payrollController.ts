import { Request, Response } from 'express';
import Payroll from '../models/Payroll';

export const getAll = async (req: Request, res: Response) => {
  try {
    const items = await Payroll.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};

export const create = async (req: Request, res: Response) => {
  try {
    const item = await Payroll.create(req.body);
    res.status(201).json(item);
  } catch (error) { res.status(400).json({ message: 'Invalid data', error }); }
};

export const update = async (req: Request, res: Response) => {
  try {
    const item = await Payroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) { res.status(400).json({ message: 'Invalid data' }); }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await Payroll.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed successfully' });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};

import { generatePayslipPDF } from '../utils/pdfGenerator';
import User from '../models/User'; // Assuming staff are Users

export const downloadPayslip = async (req: Request, res: Response) => {
  try {
    // Populate the staffId so we have their name
    const payrollItem = await Payroll.findById(req.params.id);
    if (!payrollItem) {
      return res.status(404).json({ message: 'Payroll record not found' });
    }

    // Attempt to manually fetch user data to pass to PDF
    const user = await User.findById(payrollItem.staffId);
    const enrichedData = {
      ...payrollItem.toObject(),
      staffId: user ? { firstName: user.firstName, lastName: user.lastName } : { firstName: 'Unknown', lastName: 'Staff' }
    };

    // The utility will pipe directly to `res`
    generatePayslipPDF(res, enrichedData);
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
};
