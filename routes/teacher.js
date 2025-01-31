import express from "express"
import { getAllTeacher, registerTeacher } from "../controller/teacher.js"

const router = express.Router()
router.post("/register",registerTeacher)
router.get("/get-teacher",getAllTeacher)

export default router