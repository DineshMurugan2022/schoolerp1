import mongoose, { Schema, Document } from 'mongoose';

export interface IAdmission extends Document {
  childFirstName: string;
  childLastName: string;
  dateOfBirth: Date;
  gender: 'Male' | 'Female' | 'Other';
  parentName: string;
  contactNumber: string;
  email: string;
  address: string;
  gradeAppliedFor: 'Pre-KG' | 'LKG' | 'UKG';
  status: 'New Inquiry' | 'Follow-up Pending' | 'Demo Class Scheduled' | 'Interested' | 'Admission Confirmed' | 'Not Interested';
  notes?: string;
  documents?: { name: string; url: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const AdmissionSchema: Schema = new Schema(
  {
    childFirstName: { type: String, required: true },
    childLastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    parentName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    gradeAppliedFor: { type: String, enum: ['Pre-KG', 'LKG', 'UKG'], required: true },
    status: {
      type: String,
      enum: ['New Inquiry', 'Follow-up Pending', 'Demo Class Scheduled', 'Interested', 'Admission Confirmed', 'Not Interested'],
      default: 'New Inquiry',
    },
    notes: { type: String },
    documents: [
      {
        name: { type: String },
        url: { type: String },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IAdmission>('Admission', AdmissionSchema);
