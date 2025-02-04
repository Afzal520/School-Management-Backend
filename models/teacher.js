import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
  
    gender: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    registerId:{
        type:String,
        required:true,
        unique:true
    },
    degree: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    teacherEmail: {
        type: String,
        required: true,
  
    },
    address: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
  
    role: { type: String, enum: ["student", "teacher", "admin"], default: "teacher" },
    profilePhoto:{
     type:String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const teacherModel = mongoose.model("Teacher", teacherSchema);
export default teacherModel;