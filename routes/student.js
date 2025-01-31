import express from "express"
import { createStudent, editStudent, getAllStudent } from "../controller/student.js"

const router = express.Router()

router.post("/stud",createStudent)
router.get("/getstud",getAllStudent)
router.put("/edit/:id",editStudent)


export default router