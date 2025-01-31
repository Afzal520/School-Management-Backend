import multer from "multer"

const storage = multer.memoryStorage(); // Store file in memory as a buffer
export const upload = multer({
 
  storage,
  fileFilter: (req, file, cb) => {

    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are allowed!"), false);
    }
  },
});


