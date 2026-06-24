import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Parent from '../models/Parent';

// Get all parents
export const getParents = async (req: Request, res: Response): Promise<void> => {
  try {
    const parents = await Parent.aggregate([
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'parentId',
          as: 'students'
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);
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
    const parentId = new mongoose.Types.ObjectId(req.params.id as string);
    const parents = await Parent.aggregate([
      { $match: { _id: parentId } },
      {
        $lookup: {
          from: 'students',
          localField: '_id',
          foreignField: 'parentId',
          as: 'students'
        }
      }
    ]);
    
    if (!parents || parents.length === 0) {
      res.status(404).json({ message: 'Parent not found' });
      return;
    }
    res.json(parents[0]);
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
