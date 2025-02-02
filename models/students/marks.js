

import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
  },
  boardName: {
    type: String,
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  registerId: {
    type: String,
    required: true,
  },
  studentEmail: {
    type: String,
  },
  subjects: [
    {
      name: {
        type: String,
        required: true,
      },
      marks: {
        type: Number,
        required: true,
      },
      obtainedMarks: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      grade: {
        type: String,
        required: true,
      },
    },
  ],
  // defaultStudentId: { type: mongoose.Schema.Types.ObjectId, ref: 'createstudent' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Marks = mongoose.model("Marks", marksSchema);

export default Marks;