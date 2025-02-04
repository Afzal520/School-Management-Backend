import teacherModel from "../models/teacher.js";
import upload from "../helper/multer.js";
import cloudinary from "../helper/cloudinary.js";
import { transporter } from "../helper/sendMail.js";
import { v4 as uuidv4 } from "uuid";
export const registerTeacher = async (req, res) => {
  upload.single("profilePhoto")(req, res, async (err) => {
    if (err) {
      return res
        .status(500)
        .json({
          success: false,
          message: "File upload failed",
          error: err.message,
        });
    }
    const {
      fullName,
      teacherEmail,
      contact,
      address,
      subject,
      gender,
      age,
      salary,
      degree,
      experience,
    } = req.body;

    try {
      // Check if all required fields are provided
      if (
        !fullName ||
        !teacherEmail ||
        !contact ||
        !subject ||
        !address ||
        !gender ||
        !age ||
        !salary ||
        !degree ||
        !experience
      ) {
        return res
          .status(400)
          .json({ success: false, message: "All fields are required" });
      }
      const uniqueId = uuidv4().slice(0, 8);
      // Check if the teacher already exists
      const existingTeacher = await teacherModel.findOne({ uniqueId });
      if (existingTeacher) {
        return res
          .status(409)
          .json({ success: false, message: "Teacher already exists" });
      }
      // Send email with unique student ID
      const mailOptions = {
        from: process.env.SENDER_EMAIL,
        to: teacherEmail,
        subject: "Registration Successful - Thank You!",
        text: `Dear ${fullName},\n\n
                Congratulations on successfully registering with us! 🎉\n\n
                We are pleased to inform you that your registration has been completed. Your unique Teacher ID is: ${uniqueId}. Thank you for choosing our School Management System. We're excited to have you on board! 🙌\n\n
                Best regards,\n
                School Management Team \n
                visit link for first you Register Your Own Information using  TeacherId then you try To Login
                ${process.env.SEND_MAIL_LOGIN_LINK}
                `,
      };

      // Create a new teacher
      const teacherSave = new teacherModel({
        fullName,

        contact,
        registerId: uniqueId,
        address,
       teacherEmail,
        subject,

        gender,
        age,
        salary,
        degree,
        experience,
      });
      await transporter.sendMail(mailOptions);
      // Save the teacher to the database
      await teacherSave.save();
  
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "profile_photos",
        });
        console.log(req.file);
        // Update the student record with the profile photo URL
        teacherSave.profilePhoto = result.secure_url;
        await teacherSave.save();
      }
      res
        .status(201)
        .json({ success: true, message: "Teacher registered successfully" });
    } catch (error) {
      res
        .status(500)
        .json({
          success: false,
          message: "Internal Server Error",
          error: error.message,
        });
    }
  });
};

export const getAllTeacher = async (req, res) => {
  try {
    const getTeacher = await teacherModel.find({});
    if (!getTeacher) {
      return res
        .status(400)
        .json({ success: false, mesaage: "Teacher not Found" });
    }
    res
      .status(200)
      .json({
        success: true,
        message: "Teachers details here",
        teacherData: getTeacher,
      });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Enternal Server Error", error });
  }
};
