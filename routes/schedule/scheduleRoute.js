import express from "express"
import { updateScheduleTime } from "../../controller/timeSchedule/updateSchedule.js"
const router = express.Router()

router.post("/updateSchedule",updateScheduleTime)
export default router