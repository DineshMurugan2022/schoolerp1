import mongoose, { Schema, Document } from 'mongoose';

export interface IRole extends Document {
  name: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

const RoleSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      enum: ['Admin', 'Teacher', 'Parent', 'Receptionist', 'SuperAdmin'],
    },
    permissions: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IRole>('Role', RoleSchema);
