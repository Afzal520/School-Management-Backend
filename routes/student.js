import express from "express"
import { createStudent, editStudent, getAllStudent } from "../controller/student.js"

const router = express.Router()

router.post("/createstudent",createStudent)
router.get("/getstudent",getAllStudent)
router.put("/editstudent/:id",editStudent)


export default router