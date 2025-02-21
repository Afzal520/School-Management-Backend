// filepath: /c:/School-Management/backend/index.js
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { scheduleTask } from "./controller/timeSchedule/schedule.controller.js";
import { Server } from "socket.io";
import { createServer } from "http";

// Import your modules
import { Register } from "./controller/auth.js";
import { connectDB } from "./config/connectDB.js";
import authRouter from "./routes/auth.js";
import noteRouter from "./routes/note.js";
import studentRouter from "./routes/student.js";
import teacherRouter from "./routes/teacher.js";
import markRouter from "./routes/student/mark.js";
import scheduleRouter from "./routes/schedule/scheduleRoute.js"
import  attendanceRouter from "./routes/studentAttendance.js"

dotenv.config();
const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Set up CORS
const corsOptions = {
  origin: "*", // Allow requests from all origins
  methods: "GET,POST,PUT,DELETE", // Allow specific HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allow specific headers
};
app.use(cors(corsOptions));

// Connect to the database
connectDB();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize the scheduler
scheduleTask(io);

io.on("connection", (socket) => {
  console.log("A user connected");
});

// Define your routes
app.use("/api/auth", authRouter);
app.use("/api/post", noteRouter);
app.use("/api/student", studentRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/studentmark", markRouter);
app.use("/api/student",attendanceRouter)
app.use("/api/student",attendanceRouter)
app.use("/api/time",scheduleRouter)

// Start the server and store the server instance
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});