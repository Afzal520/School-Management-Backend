import express from "express";
import { fetchAuth, Login, Register } from "../controller/auth.js";

const router = express.Router();

router.post("/register", Register);
router.post("/login", Login);
router.get("/get/auth/:id",fetchAuth)

export default router;