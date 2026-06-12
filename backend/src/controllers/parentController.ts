import { Request, Response } from 'express';
import Parent from '../models/Parent';

// Get all parents
export const getParents = async (req: Request, res: Response): Promise<void> => {
  try {
    const parents = await Parent.find().sort({ createdAt: -1 });
    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching parents' });
  }
};

// Create a parent
export const createParent = async (req: Request, res: Response): Promise<void> => {
  try {
    const parentData = req.body;
    const newParent = await Parent.create(parentData);
    res.status(201).json(newParent);
  } catch (error) {
    res.status(400).json({ message: 'Invalid parent data' });
  }
};

// Get a single parent
export const getParentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const parent = await Parent.findById(req.params.id);
    if (!parent) {
      res.status(404).json({ message: 'Parent not found' });
      return;
    }
    res.json(parent);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching parent' });
  }
};

// Update a parent
export const updateParent = async (req: Request, res: Response): Promise<void> => {
  try {
    const parent = await Parent.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!parent) {
      res.status(404).json({ message: 'Parent not found' });
      return;
    }
    res.json(parent);
  } catch (error) {
    res.status(400).json({ message: 'Invalid parent data' });
  }
};
