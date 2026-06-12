import mongoose, { Schema, Document } from 'mongoose';

export interface IFee extends Document {
  studentId: mongoose.Types.ObjectId;
  grade: 'Pre-KG' | 'LKG' | 'UKG';
  totalAmount: number;
  amountPaid: number;
  dueDate: Date;
  status: 'Paid' | 'Partial' | 'Overdue' | 'Pending';
  createdAt: Date;
  updatedAt: Date;
}

const FeeSchema: Schema = new Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    grade: {
      type: String,
      enum: ['Pre-KG', 'LKG', 'UKG'],
      required: true,
    },
    totalAmount: { type: Number, required: true },
    amountPaid: { type: Number, default: 0 },
    dueDate: { type: Date, required: true },
    status: {
      type: String,
      enum: ['Paid', 'Partial', 'Overdue', 'Pending'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IFee>('Fee', FeeSchema);
