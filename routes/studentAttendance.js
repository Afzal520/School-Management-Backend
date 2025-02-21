import express from "express"
import { getAttendanceDetails, StudentAttendance } from "../controller/student/attendance.js"
const router = express.Router()

router.post("/attendance",StudentAttendance)
router.get("/getattendance",getAttendanceDetails)

export default router