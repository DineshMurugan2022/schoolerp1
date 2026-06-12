import mongoose, { Schema, Document } from 'mongoose';

export interface IAssessment extends Document {
  childId: mongoose.Types.ObjectId;
  term: 'Term 1' | 'Term 2' | 'Term 3';
  rubrics: {
    category: string; // e.g., "Motor Skills", "Social Skills", "Cognitive"
    skill: string;    // e.g., "Holds pencil correctly", "Shares toys"
    score: 'Mastered' | 'Developing' | 'Beginning';
  }[];
  teacherComments: string;
  date: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const AssessmentSchema: Schema = new Schema(
  {
    childId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // In a full system, ref 'Student'
    },
    term: {
      type: String,
      enum: ['Term 1', 'Term 2', 'Term 3'],
      required: true,
    },
    rubrics: [
      {
        category: { type: String, required: true },
        skill: { type: String, required: true },
        score: {
          type: String,
          enum: ['Mastered', 'Developing', 'Beginning'],
          required: true,
        },
      },
    ],
    teacherComments: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IAssessment>('Assessment', AssessmentSchema);
