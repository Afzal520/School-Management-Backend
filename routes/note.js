import express from "express";
const router = express.Router();
import { upload } from "../middleware/upload.js";
import { noteController } from "../controller/note.js";
// import { Checkuser } from "../middleware/checkUser.js";

router.post("/upload-pdf",  upload.single("pdf"), noteController);

export default router;