import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env vars FIRST before anything else
dotenv.config();

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
import classRoutes from './routes/classRoutes';
import parentRoutes from './routes/parentRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import leaveRoutes from './routes/leaveRoutes';
import academicRoutes from './routes/academicRoutes';
import transportRoutes from './routes/transportRoutes';
import announcementRoutes from './routes/announcementRoutes';
import reportRoutes from './routes/reportRoutes';
import eventsRoutes from './routes/eventsRoutes';
import daycareRoutes from './routes/daycareRoutes';
import galleryRoutes from './routes/galleryRoutes';
import payrollRoutes from './routes/payrollRoutes';

// Connect to database
connectDB();

const app = express();

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://schoolerp-livid.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

// Middleware - CORS
app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS: origin '${origin}' not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Handle OPTIONS preflight for all routes explicitly
app.options(/.*/, cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS: origin '${origin}' not allowed`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

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
app.use('/api/classes', classRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/academic', academicRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/daycare', daycareRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/payroll', payrollRoutes);

const PORT = process.env.PORT || 5000;

// Create HTTP server instead of listening directly on Express app
const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
