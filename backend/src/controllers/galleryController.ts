import { Request, Response } from 'express';
import Album from '../models/Album';

export const getAll = async (req: Request, res: Response) => {
  try {
    const items = await Album.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};

export const create = async (req: Request, res: Response) => {
  try {
    const item = await Album.create(req.body);
    res.status(201).json(item);
  } catch (error) { res.status(400).json({ message: 'Invalid data', error }); }
};

export const update = async (req: Request, res: Response) => {
  try {
    const item = await Album.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(item);
  } catch (error) { res.status(400).json({ message: 'Invalid data' }); }
};

export const remove = async (req: Request, res: Response) => {
  try {
    await Album.findByIdAndDelete(req.params.id);
    res.json({ message: 'Removed successfully' });
  } catch (error) { res.status(500).json({ message: 'Server error' }); }
};
