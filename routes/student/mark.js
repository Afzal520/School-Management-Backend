import express from "express"
import { addMarks, GetStudentResult } from "../../controller/student/marks.js"
const router = express.Router()

router.post("/marks",addMarks)
router.get("/getmark/:id",GetStudentResult)
export default router