// Filepath: /c:/e-commerce-new/backend/controller/student.js
import Student from "../models/student.js";
import upload from "../helper/multer.js";
import cloudinary from "../helper/cloudinary.js";
import { transporter } from "../helper/sendMail.js";
import { v4 as uuidv4 } from "uuid";

export const createStudent = async (req, res) => {
    try {
        // Use multer to handle file upload
        upload.single("profilePhoto")(req, res, async (err) => {
            if (err) {
                console.error("Multer error:", err);
                return res.status(400).json({ success: false, message: "File upload failed", error: err.message });
            }

            const { fullName, gender, semester, contact, subject, studentEmail, course, dob, fee } = req.body;

            // Validate all fields
            if (!fullName || !gender || !semester || !subject || !studentEmail || !course || !dob || !fee) {
                return res.status(400).json({ success: false, message: "All fields are required" });
            }

            // Validate date format
            if (isNaN(Date.parse(dob))) {
                return res.status(400).json({ success: false, message: "Invalid date format" });
            }

            // Generate unique student ID
            const uniqueId = uuidv4().slice(0, 8);

            // Check if student already exists by email
            const existingStudent = await Student.findOne({ uniqueId });
            if (existingStudent) {
                return res.status(400).json({ success: false, message: "Student already exists" });
            }

            // Send email with unique student ID
            const mailOptions = {
                from: process.env.SENDER_EMAIL,
                to: studentEmail,
                subject: "Registration Successful - Thank You!",
                text: `Dear ${fullName},\n\n
                Congratulations on successfully registering with us! 🎉\n\n
                We are pleased to inform you that your registration has been completed. Your unique student ID is: ${uniqueId}. Thank you for choosing our School Management System. We're excited to have you on board! 🙌\n\n
                Best regards,\n
                School Management Team \n
                visit link for first you Register Your Own Information using StudentId then you try To Login
                ${process.env.SEND_MAIL_LOGIN_LINK}
                `
            };

            await transporter.sendMail(mailOptions);

            // Save student data in database
            const studentSave = new Student({
                fullName,
                gender,
                semester,
                subject,
                registerId: uniqueId,
                studentEmail,
                course,
                dob,
                contact,
                fee,
            });

            await studentSave.save();

            // Upload profile photo to Cloudinary if available
            if (req.file) {
                try {
                    const result = await cloudinary.uploader.upload(req.file.path, {
                        folder: "profile_photos",
                    });

                    studentSave.profilePhoto = result.secure_url;
                    await studentSave.save();
                } catch (cloudinaryError) {
                    console.error("Cloudinary upload error:", cloudinaryError);
                    return res.status(500).json({ success: false, message: "Cloudinary upload failed", error: cloudinaryError.message });
                }
            }

            res.status(201).json({
                success: true,
                message: "Student created successfully",
                student: studentSave,
            });
        });
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ success: false, message: "Internal server error", error: error.message });
    }
};

export const getAllStudent = async (req, res) => {
    try {
        const students = await Student.find({});
        if (!students.length) {
            return res.status(404).json({ success: false, message: "No students found" });
        }
        res.status(200).json({ success: true, message: "Students retrieved successfully", studentList: students });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};

export const editStudent = async (req, res) => {
    const { id } = req.params;
    
    
    const updates = req.body;

    try {
        const updatedStudent = await Student.findOneAndUpdate({registerId :id}, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedStudent) {
            return res.status(404).json({ success: false, message: "Student not found" });
        }

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            updatedStudent,
        });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
};
