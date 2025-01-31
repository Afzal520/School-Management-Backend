import express from "express"
import { addMarks } from "../../controller/student/marks.js"
const router = express.Router()

router.post("/marks",addMarks)
export default router