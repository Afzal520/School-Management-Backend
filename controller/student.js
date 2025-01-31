// filepath: /c:/e-commerce-new/backend/controller/student.js
import Student from "../models/student.js";
import upload from "../helper/multer.js";
import cloudinary from "../helper/cloudinary.js";

export const createStudent = async (req, res) => {
    upload.single('profilePhoto')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "File upload failed", error: err.message });
        }

        const { fullName, gender, semester, subject, studentId, course, dob, fee } = req.body;

        try {
            if (!fullName || !gender || !semester || !subject || !studentId || !course || !dob || !fee) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            const existingStudent = await Student.findOne({ studentId });
            if (existingStudent) {
                return res.status(400).json({ success: false, message: "Student already exists" });
            }
            // Save the student to the database without the profile photo

            const studentSave = new Student({
                fullName,
                gender,
                semester,
                subject,
               studentId,
                course,
                dob,
                fee,
            });

            await studentSave.save();

            // Upload the profile photo to Cloudinary
            if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: 'profile_photos',
                });

                // Update the student record with the profile photo URL
                studentSave.profilePhoto = result.secure_url;
                await studentSave.save();
            }

            res.status(201).json({ success: true, message: "Student created successfully", student: studentSave });
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error", error });
        }
    });
};

export const getAllStudent = async (req, res) => {

    try {
        const GetStudent = await Student.find({})
        if (!GetStudent) return res.status(404).json({ success: false, message: "NOT Found Any Student please Add" })
        res.status(200).json({ success: true, message: "Student Found", studentList: GetStudent })
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" })
    }
}



export const editStudent = async (req, res) => {
    const { id } = req.params;
    const updates = req.body; // Data to update the student
    console.log(updates)
    console.log(id)
    try {
      // Find the student by ID and update with new data
      const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
     console.log(updatedStudent)
      if (!updatedStudent) {
        return res.status(404).json({ success: false, message: "Student not found" });
      }
  
      res.status(200).json({ success: true, message: "Student updated successfully", updatedStudent });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
  };
  