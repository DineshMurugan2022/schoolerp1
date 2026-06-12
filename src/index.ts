import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import connectDB from './config/db';
import { initSocket } from './socket';
import admissionRoutes from './routes/admissionRoutes';
import curriculumRoutes from './routes/curriculumRoutes';
import assessmentRoutes from './routes/assessmentRoutes';
import financeRoutes from './routes/financeRoutes';
import authRoutes from './routes/authRoutes';
import operationsRoutes from './routes/operationsRoutes';
import userRoutes from './routes/userRoutes';
import studentRoutes from './routes/studentRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import dailyDiaryRoutes from './routes/dailyDiaryRoutes';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Pre-school ERP API is running...');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/operations', operationsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/daily-diary', dailyDiaryRoutes);

const PORT = process.env.PORT || 5000;

// Create HTTP server instead of listening directly on Express app
const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
