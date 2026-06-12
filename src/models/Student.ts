import mongoose, { Schema, Document } from 'mongoose';

export interface IStudent extends Document {
  firstName: string;
  lastName: string;
  grade: string;
  bloodGroup?: string;
  parentId?: mongoose.Types.ObjectId;
  enrollmentDate: Date;
  status: 'Active' | 'Inactive' | 'Graduated';
  createdAt: Date;
  updatedAt: Date;
}

const StudentSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    grade: {
      type: String,
      required: true,
      enum: ['Pre-KG', 'LKG', 'UKG'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    enrollmentDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Graduated'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStudent>('Student', StudentSchema);
