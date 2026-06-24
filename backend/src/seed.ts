import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

// Load models
import Role from './models/Role';
import User from './models/User';
import Parent from './models/Parent';
import Student from './models/Student';
import Assessment from './models/Assessment';
import Payroll from './models/Payroll';

dotenv.config();

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected.');

    // Find or create roles
    const adminRole = await Role.findOneAndUpdate({ name: 'SuperAdmin' }, { name: 'SuperAdmin', permissions: ['all'] }, { upsert: true, new: true });
    const teacherRole = await Role.findOneAndUpdate({ name: 'Teacher' }, { name: 'Teacher', permissions: ['read', 'write'] }, { upsert: true, new: true });
    const parentRole = await Role.findOneAndUpdate({ name: 'Parent' }, { name: 'Parent', permissions: ['read'] }, { upsert: true, new: true });

    // Hash a default password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // 1. Create a Staff/SuperAdmin
    const staff = await User.findOneAndUpdate(
      { email: 'admin@easacademy.com' },
      {
        email: 'admin@easacademy.com',
        firstName: 'System',
        lastName: 'Admin',
        password: hashedPassword,
        role: adminRole._id,
        status: 'Active',
        contactNumber: '1234567890'
      },
      { upsert: true, new: true }
    );
    console.log('Admin created: admin@easacademy.com / password123');

    // 2. Create a Teacher
    const teacher = await User.findOneAndUpdate(
      { email: 'teacher@school.com' },
      {
        firstName: 'Tom',
        lastName: 'Teacher',
        email: 'teacher@school.com',
        password: hashedPassword,
        role: teacherRole._id,
        status: 'Active',
        contactNumber: '0987654321',
        designation: 'Lead Instructor',
        salary: 4000
      },
      { upsert: true, new: true }
    );
    console.log('Teacher created: teacher@school.com / password123');

    // 3. Create a Parent User
    const parentUser = await User.findOneAndUpdate(
      { email: 'parent@school.com' },
      {
        firstName: 'Patty',
        lastName: 'Parent',
        email: 'parent@school.com',
        password: hashedPassword,
        role: parentRole._id,
        status: 'Active',
        contactNumber: '5551234567'
      },
      { upsert: true, new: true }
    );

    // Create the detailed Parent profile
    const parentProfile = await Parent.findOneAndUpdate(
      { userId: parentUser._id },
      {
        userId: parentUser._id,
        fatherName: 'Paul Parent',
        motherName: 'Patty Parent',
        primaryEmail: 'parent@school.com',
        fatherContact: '5551234567',
        whatsappNumber: '+15551234567',
        address: '123 Family Lane'
      },
      { upsert: true, new: true }
    );
    console.log('Parent created: parent@school.com / password123');

    // 4. Create a Student
    const student = await Student.findOneAndUpdate(
      { admissionNumber: 'SEED-001' },
      {
        firstName: 'Sammy',
        lastName: 'Student',
        admissionNumber: 'SEED-001',
        grade: 'LKG',
        parentId: parentProfile._id,
        status: 'Active',
        bloodGroup: 'O+',
        medicalNotes: 'No allergies.'
      },
      { upsert: true, new: true }
    );
    console.log('Student created: Sammy Student');

    // 5. Create an Assessment for the Student
    await Assessment.deleteMany({ childId: student._id }); // Clear old ones to avoid duplicates on re-run
    await Assessment.create({
      childId: student._id,
      term: 'Term 1',
      rubrics: [
        { category: 'Motor Skills', skill: 'Holds pencil correctly', score: 'Mastered' },
        { category: 'Social Skills', skill: 'Shares toys with others', score: 'Developing' },
        { category: 'Cognitive', skill: 'Recognizes colors', score: 'Mastered' }
      ],
      teacherComments: 'Sammy is doing excellent work and is very friendly in class.',
      createdBy: teacher._id
    });
    console.log('Assessment created for Sammy.');

    // 6. Create a Payroll record for the Teacher
    await Payroll.deleteMany({ staffId: teacher._id, month: 'June 2026' });
    await Payroll.create({
      staffId: teacher._id,
      month: 'June 2026',
      baseSalary: 4000,
      attendanceDays: 30,
      deductions: 0,
      bonuses: 200,
      netSalary: 4200,
      status: 'Paid',
      paymentDate: new Date()
    });
    console.log('Payroll created for Tom Teacher.');

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedDB();
