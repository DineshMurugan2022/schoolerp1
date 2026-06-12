import mongoose, { Schema, Document } from 'mongoose';

export interface IDailyDiary extends Document {
  studentId: mongoose.Types.ObjectId;
  date: Date;
  mood: 'Happy' | 'Quiet' | 'Fussy';
  meals: {
    type: string;
    status: string;
  }[];
  napTime: {
    duration: string;
  };
  activities: string[];
  notes: string;
  teacherId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const DailyDiarySchema: Schema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Student',
      required: true,
    },
    date: { type: Date, required: true, default: Date.now },
    mood: {
      type: String,
      enum: ['Happy', 'Quiet', 'Fussy'],
      default: 'Happy',
    },
    meals: [
      {
        type: { type: String },
        status: { type: String },
      },
    ],
    napTime: {
      duration: { type: String, default: '' },
    },
    activities: [{ type: String }],
    notes: { type: String, default: '' },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

// Compound index: one diary entry per student per day
DailyDiarySchema.index({ studentId: 1, date: 1 }, { unique: true });

export default mongoose.model<IDailyDiary>('DailyDiary', DailyDiarySchema);
