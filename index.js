import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import { Register } from "./controller/auth.js";
import { connectDB } from "./config/connectDB.js";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js"
import studentRouter from "./routes/student.js"
import teacherRouter from "./routes/teacher.js"
import markRouter from "./routes/student/mark.js"

import cors from "cors"
const corsOptions = {
    origin: '*', // Allow requests from a specific origin
    methods: 'GET,POST,PUT,DELETE', // Allow specific HTTP methods
    allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
};
dotenv.config()
const app = express();
app.use(cors(corsOptions))
console.log(process.env.CLOUDINARY_CLOUD_NAME)
connectDB()
// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/post", noteRouter)
app.use("/register",studentRouter)
app.use("/api/teacher",teacherRouter)
app.use("/api/student",markRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});