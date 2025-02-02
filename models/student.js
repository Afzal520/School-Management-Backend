import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  registerId: {
    type: String,
    required: true,
    unique:true
  },
  studentEmail:{
    type:String,
    required:true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  fee: {
    type:String,
    required: true,
  },
  role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
  profilePhoto: {
    type: String, // Assuming you store the URL of the uploaded photo
    // required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Student = mongoose.model("createstudent", studentSchema);

export default Student;