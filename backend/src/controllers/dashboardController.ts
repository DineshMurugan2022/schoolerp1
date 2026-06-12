import { Request, Response } from 'express';
import Student from '../models/Student';
import Admission from '../models/Admission';
import Fee from '../models/Fee';
import Attendance from '../models/Attendance';
import Event from '../models/Event';
import User from '../models/User';
import Parent from '../models/Parent';
import DayCareLog from '../models/DayCareLog';
import Album from '../models/Album';

export const getDashboardStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    // PARENT PORTAL LOGIC
    if (req.user?.role === 'Parent') {
      const parent = await Parent.findOne({ userId: req.user.id });
      if (!parent) {
        res.json({ isParentPortal: true, error: 'Parent profile not linked to this account.' });
        return;
      }

      const myChildren = await Student.find({ parentId: parent._id });
      const childrenIds = myChildren.map(c => c._id);

      const [
        feesDue,
        recentAttendance,
        upcomingEvents,
        recentDaycareLogs,
        recentAlbums
      ] = await Promise.all([
        Fee.find({ studentId: { $in: childrenIds }, status: { $in: ['Pending', 'Overdue', 'Partial'] } }).sort({ dueDate: 1 }),
        Attendance.find({ studentId: { $in: childrenIds } }).sort({ date: -1 }).limit(10),
        Event.find({ date: { $gte: today }, audience: { $in: ['All', 'Parents', 'Students'] } }).limit(5).sort({ date: 1 }),
        DayCareLog.find({ studentId: { $in: childrenIds } }).sort({ date: -1 }).limit(5),
        Album.find({ visibility: { $in: ['All', 'Parents'] } }).sort({ date: -1 }).limit(3)
      ]);

      res.json({
        isParentPortal: true,
        myChildren,
        feesDue,
        recentAttendance,
        upcomingEvents,
        recentDaycareLogs,
        recentAlbums
      });
      return;
    }

    // ADMIN/STAFF PORTAL LOGIC
    const [
      totalStudents,
      pendingAdmissions,
      newAdmissions,
      feesCollectedThisMonth,
      feesDue,
      studentAttendanceToday,
      staffAttendanceToday,
      upcomingEvents,
      allStudents // For birthday calculation
    ] = await Promise.all([
      Student.countDocuments({ status: 'Active' }),
      Admission.countDocuments({ status: { $in: ['New Inquiry', 'Follow-up Pending', 'Demo Class Scheduled', 'Interested'] } }),
      Admission.countDocuments({ status: 'Admission Confirmed' }),
      Fee.aggregate([
        { $match: { status: { $in: ['Paid', 'Partial'] }, paymentDate: { $gte: firstDayOfMonth } } },
        { $group: { _id: null, total: { $sum: '$amountPaid' } } }
      ]),
      Fee.find({ status: { $in: ['Pending', 'Overdue'] } }).populate('studentId', 'firstName lastName').limit(5).sort({ dueDate: 1 }),
      Attendance.countDocuments({ entityType: 'Student', date: { $gte: today, $lt: tomorrow }, status: 'Present' }),
      Attendance.countDocuments({ entityType: 'User', date: { $gte: today, $lt: tomorrow }, status: 'Present' }),
      Event.find({ date: { $gte: today } }).limit(5).sort({ date: 1 }),
      Student.find({ status: 'Active' }, 'firstName lastName dateOfBirth')
    ]);

    // Calculate birthdays in the current month
    const currentMonth = today.getMonth();
    const birthdays = allStudents.filter(s => {
      // @ts-ignore
      if (!s.dateOfBirth) return false;
      // @ts-ignore
      const dob = new Date(s.dateOfBirth);
      return dob.getMonth() === currentMonth;
    }).map(s => ({
      _id: s._id,
      name: `${s.firstName} ${s.lastName}`,
      // @ts-ignore
      date: s.dateOfBirth
    })).sort((a, b) => {
      const dayA = new Date(a.date).getDate();
      const dayB = new Date(b.date).getDate();
      return dayA - dayB;
    });

    res.json({
      isParentPortal: false,
      totalStudents,
      pendingAdmissions,
      newAdmissions,
      feeCollectionSummary: feesCollectedThisMonth.length > 0 ? feesCollectedThisMonth[0].total : 0,
      feesDue,
      attendanceSummary: {
        studentsPresent: studentAttendanceToday,
        staffPresent: staffAttendanceToday
      },
      upcomingEvents,
      birthdays
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard stats' });
  }
};
