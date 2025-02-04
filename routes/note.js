import express from "express";
const router = express.Router();
import { upload } from "../middleware/upload.js";
import { fetchNotes, noteController } from "../controller/note.js";
// import { Checkuser } from "../middleware/checkUser.js";

router.post("/upload-pdf",  upload.single("pdf"), noteController);
router.get("/fetchpdf",fetchNotes)

export default router;