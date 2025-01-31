import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "authentication" },
  pdf: { type: String }, // Path to the uploaded PDF file
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("note", noteSchema);
export default Note;
