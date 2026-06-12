import { Request, Response } from 'express';
import Fee from '../models/Fee';
import Admission from '../models/Admission';
import Attendance from '../models/Attendance';
import Student from '../models/Student';

// @desc    Get Fee Defaulters Report
// @route   GET /api/reports/fee-defaulters
export const getFeeDefaulters = async (req: Request, res: Response) => {
  try {
    const fees = await Fee.find({ status: { $in: ['Overdue', 'Pending', 'Partial'] } })
      .populate('studentId', 'firstName lastName admissionNumber parentId')
      .sort({ dueDate: 1 });
      
    res.json(fees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching fee defaulters', error });
  }
};

// @desc    Get Admission Analytics
// @route   GET /api/reports/admissions
export const getAdmissionAnalytics = async (req: Request, res: Response) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ];
    const analytics = await Admission.aggregate(pipeline);
    const result: Record<string, number> = {};
    analytics.forEach((item) => {
      result[item._id] = item.count;
    });

    const recentAdmissions = await Admission.find()
      .sort({ applicationDate: -1 })
      .limit(10);

    res.json({ counts: result, recent: recentAdmissions });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching admission analytics', error });
  }
};

// @desc    Get Student Attendance Summary
// @route   GET /api/reports/attendance
export const getAttendanceSummary = async (req: Request, res: Response) => {
  try {
    // Quick overall summary: count present vs absent for students
    const pipeline = [
      { $match: { entityType: 'Student' } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
        },
      },
    ];
    const summary = await Attendance.aggregate(pipeline);
    const result: Record<string, number> = { Present: 0, Absent: 0, Late: 0, 'Half-day': 0 };
    summary.forEach((item) => {
      result[item._id] = item.count;
    });

    res.json({ counts: result });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance summary', error });
  }
};
