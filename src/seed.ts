import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User';
import Role from './models/Role';

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/preschool-erp';
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected...');

    let adminRole = await Role.findOne({ name: 'Admin' });
    if (!adminRole) {
      adminRole = await Role.create({ name: 'Admin', permissions: ['all'] });
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@gardenguru.com' });
    if (existingAdmin) {
      console.log('Admin user already exists! You can log in with:');
      console.log('Email: admin@gardenguru.com');
      console.log('Password: password123');
      process.exit();
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create Admin
    await User.create({
      firstName: 'System',
      lastName: 'Admin',
      email: 'admin@gardenguru.com',
      passwordHash: hashedPassword,
      role: adminRole._id,
    });

    console.log('SUCCESS! Admin user seeded successfully.');
    console.log('You can now log in at http://localhost:3000/login with:');
    console.log('Email: admin@gardenguru.com');
    console.log('Password: password123');
    process.exit();
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
};

seedAdmin();
