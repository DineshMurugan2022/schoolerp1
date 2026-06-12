import { Request, Response } from 'express';
import DayCareLog from '../models/DayCareLog';

export const getAll = async (req: Request, res: Response) => {
  try {
    const items = await DayCareLog.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};

export const create = async (req: Request, res: Response) => {
  try {
    const item = await DayCareLog.create(req.body);
    res.status(201).json(item);
  } catch (error) { res.status(400).json({ message: 'Invalid data', error }); }
};

export const update = async (req: Request, res: Response) => {
  try {
    const item = await DayCareLog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) { res.status(400).json({ message: 'Invalid data' }); }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await DayCareLog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed successfully' });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};
