import teacherModel from "../models/teacher.js";
import upload from "../helper/multer.js";
import cloudinary from "../helper/cloudinary.js";
export const registerTeacher = async (req, res) => {

  upload.single('profilePhoto')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: "File upload failed", error: err.message });
    }
    const { fullName, aadharCard, email,registerId, contact, address, qualification, subject, categories, gender, age, salary, degree, experience } = req.body;


    try {
      // Check if all required fields are provided
      if (!fullName || !aadharCard || !email || !contact || !registerId || !subject || !address || !qualification || !categories || !gender || !age || !salary || !degree || !experience) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      // Check if the teacher already exists
      const existingTeacher = await teacherModel.findOne({ registerId });
      if (existingTeacher) {
        return res.status(409).json({ success: false, message: "Teacher already exists" });
      }

      // Create a new teacher
      const teacherSave = new teacherModel({
        fullName,
        aadharCard,
        email,
        contact,
        registerId,
        address,
        qualification,
        subject,
        categories,
        gender,
        age,
        salary,
        degree,
        experience,
      });

      // Save the teacher to the database
      await teacherSave.save();
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: 'profile_photos',
        });
        console.log(req.file)
        // Update the student record with the profile photo URL
        teacherSave.profilePhoto = result.secure_url;
        await teacherSave.save();
      }
      res.status(201).json({ success: true, message: "Teacher registered successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
  })

};

export const getAllTeacher = async (req, res) => {
  try {
    const getTeacher = await teacherModel.find({})
    if (!getTeacher) {
      return res.status(400).json({ success: false, mesaage: "Teacher not Found" })
    }
    res.status(200).json({ success: true, message: "Teachers details here", teacherData: getTeacher })
  } catch (error) {
    res.status(500).json({ success: false, message: "Enternal Server Error", error })
  }
}